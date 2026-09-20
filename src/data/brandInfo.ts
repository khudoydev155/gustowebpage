export const BRAND_CONTACTS = {
  name: 'Gusto Coffee Bar',
  city: 'Xonqa',
  region: 'Xorazm viloyati',
  address: "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3",
  hours: 'Har kuni 8:00 AM — 2:00 AM',
  phone: '+998 93 287 54 84',
  phoneClean: '+998932875484',
  email: 'info@gustocoffee.uz',
  
  // Official Maps
  googleMapsUrl: 'https://maps.app.goo.gl/9XygkJ35KZSzZzg88',
  yandexMapsUrl: 'https://yandex.com/maps/org/gusto_coffee/24379307243?si=r00h1pdwv6vrdvjmgc3dfejjgg',
  
  // Telegram Bot & Group Details
  telegramBotName: '@gustobronbot',
  telegramBotUsername: 'gustobronbot',
  telegramBotUrl: 'https://t.me/gustobronbot',
  telegramBotId: '8440689118',
  telegramGroupId: '-5392092158',

  // Social
  instagramUrl: 'https://instagram.com',
};

export interface TelegramReservationPayload {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  experience: string;
  locationName: string;
}

export function generateTelegramBookingText(payload: TelegramReservationPayload): string {
  return [
    `☕️ *Yangi stol band qilish | Gusto Coffee*`,
    ``,
    `👤 *Mehmon:* ${payload.name || 'Mehmon'}`,
    `📞 *Telefon:* ${payload.phone}`,
    `📅 *Sana:* ${payload.date}`,
    `⏰ *Vaqt:* ${payload.time}`,
    `👥 *Mehmonlar:* ${payload.guests} kishi`,
    `✨ *Tashrif maqsadi:* ${payload.experience}`,
    `📍 *Manzil:* ${payload.locationName}`,
    ``,
    `_@gustobronbot orqali yuborildi_`,
  ].join('\n');
}

/**
 * Sends the reservation to the cafe's Telegram group via the secure
 * server-side /api/order endpoint (see api/order.ts) — the bot token
 * never reaches the browser. The UI's "open in Telegram" buttons
 * remain as a manual backup if this call fails.
 */
export async function sendReservationToTelegram(
  payload: TelegramReservationPayload
): Promise<{ success: boolean; message?: string }> {
  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return { success: false, message: data.error || 'Telegram xatosi' };
    }

    return { success: true };
  } catch (err) {
    console.warn('Telegram API send failed:', err);
    return { success: false, message: 'Tarmoq xatosi' };
  }
}
