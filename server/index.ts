import { createClient } from '@supabase/supabase-js';
import { parseReceipt } from 'receipt-parser';
import 'dotenv/config';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const openAiKey = process.env.OPENAI_API_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function handleImage(base64: string, userId: string) {
  const parsed = await parseReceipt(base64, openAiKey);
  const { data } = await supabase.storage
    .from('receipts')
    .upload(`${userId}/${Date.now()}.jpg`, Buffer.from(base64, 'base64'), {
      contentType: 'image/jpeg',
    });

  await supabase.from('receipts').insert({
    owner_id: userId,
    image_url: data?.path,
    parsed_json: parsed,
  });
}
