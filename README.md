# ☕️ Gusto Coffee — Telegram Bot & HTML Widgets

Gusto Coffee Bar uchun ishlab chiqilgan zamonaviy, gibrid arxitekturadagi Telegram Bot.
Ushbu bot **Telegram Mini App (TMA)** va **Telegram Bot API 10.4 HTML Widgets (HTMLBubbles)** imkoniyatlarini birlashtiradi.

---

## 🌟 Ekotizim Imkoniyatlari

1. **Telegram Mini App (TMA):**
   - Vercel'da joylashgan to'liq `gustowebpage` React 19 ilovasi bilan bog'langan.
   - 70+ xil qahva va ichimliklar katalogi, fotosuratlar, ta'm notalari.
   - Stol band qilish formasi va Telegram haptic tebranishlari (`impactOccurred`).
   - Telegram foydalanuvchi ma'lumotlarini (ism, ID) avtomatik to'ldirish.

2. **Telegram HTML Widgets (Bot API 10.4):**
   - Chatdan chiqmasdan, to'g'ridan-to'g'ri xabar pufakchasida ochiluvchi interaktiv stol band qilish vidjeti (`reservation_widget.html`).
   - Sodiqlik kartasi vidjeti (`loyalty_widget.html`) — 6 ta qahva muhrini jonli kuzatish.
   - Qat'iy 32 KB limitga to'liq moslangan, siqilgan hajmi ~3 KB bo'lgan ultra-yengil vanila kod.

3. **Xavfsiz va Ishonchli Fallback:**
   - Agar foydalanuvchi Telegram ilovasi eski bo'lsa yoki vidjetlarni qo'llab-quvvatlamasa, bot avtomatik ravishda chiroyli WebApp tugmali xabar yuboradi.

4. **Baristalar / Admin Guruhiga Xabarnomalar:**
   - Har qanday stol band qilinganda yoki buyurtma tushganda baristalar guruhiga (`ADMIN_CHAT_ID`) to'liq ma'lumotlar bilan xabar boradi.

---

## 🚀 O'rnatish va Ishga Tushirish

### 1. Bot yaratish (@BotFather)
1. Telegramda [@BotFather](https://t.me/BotFather) ga kiring va `/newbot` buyrug'ini yuboring.
2. Bot nomi va username (masalan: `gustocoffeebot`) ni tanlang va **Bot Token**ni saqlab oling.
3. Botga Menu Button ulash:
   - `/setmenubutton` buyrug'ini yuboring.
   - Botni tanlang va Mini App URL'ingizni kiriting: `https://gustocoffee.uz` (yoki Vercel havolangiz).
   - Tugma matni: `☕️ Menyuni ochish`.

### 2. Sozlamalarni kiritish
```bash
cp .env.example .env
nano .env
```
`.env` faylida quyidagi ma'lumotlarni to'ldiring:
```ini
BOT_TOKEN=123456789:ABCDEF...
ADMIN_CHAT_ID=-5392092158
MINI_APP_URL=https://gustocoffee.uz
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ROLE=your-supabase-service-role-key
SUPABASE_ANON=your-supabase-anon-key
```

### 3. Baristalar / Admin Buyruqlari
- `/stamp <telegram_id> [soni]` — Mijozga muhr qo'shish yoki ayirish (masalan: `/stamp 8440689118 1`). Agar 6 ta bo'lsa, mijozga bepul qahva tabriknomasi boradi.
- `/user <telegram_id>` — Mijozning sodiqlik kartasi va muhrlarini tekshirish.
- `/tables` — Supabase'dagi barcha stollar holatini ko'rish.

### 3. Mahalliy rejimda ishga tushirish (Polling)
```bash
# Virtual muhitni faollashtirish
source venv/bin/activate

# Bog'liqliklarni o'rnatish
pip install -r requirements.txt

# Botni ishga tushirish
python main.py
```

---

## 🖥 VPS Serverga Joylashtirish (Ubuntu / Debian)

### Usul 1: Systemd Service (Tavsiya etiladi)

1. Loyihani VPS serverga nusxalang (masalan: `/var/www/gusto-telegram-bot`).
2. Serverda virtual muhit yaratib paketlarni o'rnating:
   ```bash
   cd /var/www/gusto-telegram-bot
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. `gusto_bot.service` faylini tizimga ko'chiring:
   ```bash
   sudo cp gusto_bot.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable gusto_bot
   sudo systemctl start gusto_bot
   ```
4. Holatni tekshirish:
   ```bash
   sudo systemctl status gusto_bot
   # Loglarni ko'rish
   sudo journalctl -u gusto_bot -f
   ```

### Usul 2: Docker & Docker Compose
```bash
docker compose up -d --build
docker compose logs -f
```

---

## 📁 Loyiha Strukturasi

```
gusto-telegram-bot/
├── config.py             # Pydantic sozlamalar
├── main.py               # aiogram 3 Dispatcher & Middleware
├── requirements.txt      # aiogram 3.17+, aiohttp, pydantic
├── .env.example          # Namuna konfiguratsiya
├── Dockerfile            # Docker obraz
├── docker-compose.yml    # Docker xizmatlar
├── gusto_bot.service     # VPS systemd servisi
├── handlers/
│   ├── start.py          # /start, /menu, menyu tugmalari, WebApp data
│   └── widgets.py        # sendWidget, widget_query qabul qiluvchi
├── utils/
│   └── widget_sender.py  # Bot API 10.4 sendWidget va fallback servisi
└── widgets/
    ├── reservation_widget.html  # Stol band qilish chat vidjeti (<32 KB)
    └── loyalty_widget.html      # Sodiqlik kartasi chat vidjeti (<32 KB)
```
