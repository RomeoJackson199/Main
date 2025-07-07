import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const appointments = [];

function findAppointment(id) {
  return appointments.find(a => a.id === id);
}

app.post('/api/appointment', (req, res) => {
  const { firstName, lastName, email, date, time, returning, phone } = req.body;
  if (!firstName || !lastName || !email || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id = Date.now().toString();
  const appointment = { id, firstName, lastName, email, date, time, returning: !!returning, phone };
  appointments.push(appointment);
  res.json({ appointment_id: id });
});

app.post('/api/triage', async (req, res) => {
  const { appointment_id, reason_for_visit } = req.body;
  const appointment = findAppointment(appointment_id);
  if (!appointment) {
    return res.status(400).json({ error: 'Invalid appointment_id' });
  }
  try {
    const response = await fetch('https://api.abundly.com/v1/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.ABUNDLY_API_KEY,
        agent: 'triage_agent',
        input: { appointment_id, reason: reason_for_visit }
      })
    });
    if (!response.ok) throw new Error('Abundly API error');
    const data = await response.json();
    appointment.triage = data;
    appointment.reason = reason_for_visit;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/suggestions', async (req, res) => {
  const { appointment_id } = req.body;
  const appointment = findAppointment(appointment_id);
  if (!appointment) {
    return res.status(400).json({ error: 'Invalid appointment_id' });
  }
  try {
    const response = await fetch('https://api.abundly.com/v1/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.ABUNDLY_API_KEY,
        agent: 'suggestion_agent',
        input: { appointment_id }
      })
    });
    if (!response.ok) throw new Error('Abundly API error');
    const data = await response.json();
    appointment.suggestions = data;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/dashboard', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Dashboard</title>
<style>
body { font-family: Arial, sans-serif; padding:20px; }
table { width:100%; border-collapse: collapse; margin-top:20px; }
th, td { border:1px solid #ccc; padding:8px; }
button { padding:6px 12px; }
</style>
</head>
<body>
<h1>Appointments Dashboard</h1>
<table>
<tr><th>Name</th><th>Reason</th><th>Summary</th><th>Actions</th></tr>
${appointments.map(a => `<tr>
<td>${a.firstName} ${a.lastName}</td>
<td>${a.reason || ''}</td>
<td>${a.triage ? a.triage.summary || '' : ''}</td>
<td><button onclick="suggest('${a.id}')">View suggestions</button></td>
</tr>`).join('')}
</table>
<script>
async function suggest(id){
  const res = await fetch('/api/suggestions', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({appointment_id:id})});
  const data = await res.json();
  alert(JSON.stringify(data, null, 2));
}
</script>
</body>
</html>`;
  res.send(html);
});

app.listen(PORT, () => console.log('Server running on port', PORT));
