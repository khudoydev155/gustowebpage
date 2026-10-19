import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function telegramOrderPlugin(): Plugin {
  const handler = async (req: any, res: any) => {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
      return;
    }

    let bodyRaw = '';
    req.on('data', (chunk: any) => {
      bodyRaw += chunk;
    });

    req.on('end', async () => {
      try {
        const body = JSON.parse(bodyRaw || '{}');
        const { name, phone, date, time, guests, experience, locationName } = body;

        if (!name || !phone) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Ism va telefon raqami majburiy' }));
          return;
        }

        const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
        const botToken = process.env.TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID || env.TELEGRAM_CHAT_ID || '-5392092158';

        if (!botToken) {
          console.error('[Vite API] TELEGRAM_BOT_TOKEN .env faylida topilmadi.');
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              error: 'Serverda Telegram sozlanmagan (TELEGRAM_BOT_TOKEN yetishmaydi)',
            })
          );
          return;
        }

        const escapeHtml = (val: string) =>
          (val || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
          console.error('[Vite API] Telegram API error:', errText);
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Telegram yuborishda xatolik', details: errText }));
          return;
        }

        const data = await telegramRes.json();
        console.log('[Vite API] Telegram reservation sent successfully! Message ID:', data.result?.message_id);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, messageId: data.result?.message_id }));
      } catch (err: any) {
        console.error('[Vite API] Order submission error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: false, error: 'Kutilmagan xatolik yuz berdi' }));
      }
    });
  };

  return {
    name: 'telegram-order-middleware',
    configureServer(server) {
      server.middlewares.use('/api/order', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/order', handler);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), telegramOrderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
  };
});
