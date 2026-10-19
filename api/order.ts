import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OrderPayload {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
  experience?: string;
  locationName?: string;
}

function escapeHtml(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || '-5392092158';

  if (!botToken) {
    console.error('Missing TELEGRAM_BOT_TOKEN env var');
    return res.status(500).json({ ok: false, error: 'Server misconfigured (TELEGRAM_BOT_TOKEN missing)' });
  }

  const body = (req.body || {}) as OrderPayload;
  const { name, phone, date, time, guests, experience, locationName } = body;

  if (!name || !phone) {
    return res.status(400).json({ ok: false, error: 'Ism va telefon raqami majburiy' });
  }

  const lines = [
    '<b>☕️ Yangi stol band qilish — Gusto Coffee</b>',
    '',
    `<b>Mehmon:</b> ${escapeHtml(name)}`,
    `<b>Telefon:</b> ${escapeHtml(phone)}`,
    date || time ? `<b>Sana/Vaqt:</b> ${escapeHtml(date || '')} ${escapeHtml(time || '')}`.trim() : null,
    guests ? `<b>Mehmonlar soni:</b> ${escapeHtml(guests)}` : null,
    experience ? `<b>Tashrif maqsadi:</b> ${escapeHtml(experience)}` : null,
    locationName ? `<b>Manzil:</b> ${escapeHtml(locationName)}` : null,
  ].filter(Boolean);

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
      }),
    });

    if (!telegramRes.ok) {
      const errText = await telegramRes.text();
      console.error('Telegram API error:', errText);
      return res.status(502).json({ ok: false, error: 'Telegram yuborishda xatolik', details: errText });
    }

    const data = await telegramRes.json().catch(() => ({}));
    return res.status(200).json({ ok: true, messageId: data.result?.message_id });
  } catch (err: any) {
    console.error('Order submission failed:', err);
    return res.status(500).json({ ok: false, error: 'Kutilmagan xatolik' });
  }
}
