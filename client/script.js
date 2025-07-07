const bookBtn = document.getElementById('bookBtn');
const formContainer = document.getElementById('formContainer');
const appointmentForm = document.getElementById('appointmentForm');
const returningChk = document.getElementById('returning');
const phoneLabel = document.getElementById('phoneLabel');
const reasonContainer = document.getElementById('reasonContainer');
const reasonForm = document.getElementById('reasonForm');
const thankyou = document.getElementById('thankyou');
let appointmentId = null;

bookBtn.addEventListener('click', () => {
  formContainer.classList.remove('hidden');
  bookBtn.style.display = 'none';
});

returningChk.addEventListener('change', () => {
  phoneLabel.classList.toggle('hidden', !returningChk.checked);
});

appointmentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(appointmentForm);
  const data = Object.fromEntries(formData.entries());
  data.returning = formData.has('returning');
  const res = await fetch('/api/appointment', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  const json = await res.json();
  appointmentId = json.appointment_id;
  formContainer.classList.add('hidden');
  reasonContainer.classList.remove('hidden');
});

reasonForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const reason = reasonForm.reason.value;
  await fetch('/api/triage', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ appointment_id: appointmentId, reason_for_visit: reason })
  });
  reasonContainer.classList.add('hidden');
  thankyou.classList.remove('hidden');
});
