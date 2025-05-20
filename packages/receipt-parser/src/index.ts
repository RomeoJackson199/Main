import { z } from 'zod';

export const LineItemSchema = z.object({
  name: z.string(),
  qty: z.number(),
  unit_price: z.number(),
  total_price: z.number(),
});

export const ParsedReceiptSchema = z.object({
  merchant: z.string().nullable(),
  datetime_iso: z.string().nullable(),
  currency: z.string().nullable(),
  subtotal: z.number().nullable(),
  tax: z.number().nullable(),
  tip: z.number().nullable(),
  total: z.number().nullable(),
  line_items: z.array(LineItemSchema).nullable(),
});

export type ParsedReceipt = z.infer<typeof ParsedReceiptSchema>;

/**
 * Send a receipt image to GPT-4o and return structured JSON.
 */
export async function parseReceipt(base64Image: string, apiKey: string): Promise<ParsedReceipt> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini-vision',
      messages: [
        {
          role: 'system',
          content:
            'You are a world-class data extractor. Return ONLY valid JSON that conforms to the TypeScript interface.',
        },
        { role: 'user', content: [{ type: 'image_url', image_url: `data:image/jpeg;base64,${base64Image}` }] },
      ],
    }),
  });

  const text = await response.text();
  const json = JSON.parse(text);
  return ParsedReceiptSchema.parse(json);
}
