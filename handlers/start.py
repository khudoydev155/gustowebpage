import json
import logging
from aiogram import Router, F, Bot
from aiogram.filters import CommandStart, Command, CommandObject
from aiogram.types import (
    Message,
    CallbackQuery,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    ReplyKeyboardMarkup,
    KeyboardButton,
    WebAppInfo
)
from config import settings
from services.supabase_service import supabase_service
from utils.widget_sender import WidgetService

logger = logging.getLogger(__name__)
router = Router(name="start")

def get_reply_main_menu() -> ReplyKeyboardMarkup:
    """Builds the persistent bottom reply keyboard menu."""
    menu_url = f"{settings.MINI_APP_URL}/#menu"
    return ReplyKeyboardMarkup(
        keyboard=[
            [
                KeyboardButton(
                    text="☕️ Qahva menyusi",
                    web_app=WebAppInfo(url=menu_url)
                ),
                KeyboardButton(
                    text="🌐 Gusto vebsayt",
                    web_app=WebAppInfo(url=settings.MINI_APP_URL)
                )
            ],
            [
                KeyboardButton(text="📅 Stol band qilish"),
                KeyboardButton(text="🎁 Sodiqlik kartam")
            ],
            [
                KeyboardButton(text="📋 Bronlarim"),
                KeyboardButton(text="📍 Manzil va Ish vaqti"),
                KeyboardButton(text="📞 Aloqa")
            ]
        ],
        resize_keyboard=True,
        persistent=True
    )

def get_main_menu_keyboard() -> InlineKeyboardMarkup:
    """Builds the inline interactive action keyboard."""
    menu_url = f"{settings.MINI_APP_URL}/#menu"
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="☕️ Qahva menyusi (Mini App)",
                    web_app=WebAppInfo(url=menu_url)
                ),
                InlineKeyboardButton(
                    text="🌐 Gusto vebsayt",
                    web_app=WebAppInfo(url=settings.MINI_APP_URL)
                )
            ],
            [
                InlineKeyboardButton(
                    text="📅 Stol band qilish (Vidjet)",
                    callback_data="send_reservation_widget"
                ),
                InlineKeyboardButton(
                    text="🎁 Sodiqlik kartasi",
                    callback_data="send_loyalty_widget"
                )
            ],
            [
                InlineKeyboardButton(
                    text="📍 Manzil va Ish vaqti",
                    callback_data="info_location"
                ),
                InlineKeyboardButton(
                    text="📞 Aloqa",
                    callback_data="info_contact"
                )
            ]
        ]
    )

@router.message(CommandStart())
async def handle_start(message: Message, command: CommandObject):
    user = message.from_user
    user_name = user.first_name if user else "qadrli mehmon"
    username = user.username if user else ""
    user_id = user.id if user else 0

    # Check for barista QR scan deep links e.g. /start stamp_12345678 or /start s_12345678
    if command.args and (command.args.startswith("stamp_") or command.args.startswith("s_")):
        try:
            target_id = int(command.args.split("_")[1])
            card = await supabase_service.get_loyalty_card(target_id)
            if card:
                stamps = card.get("stamps", 0)
                name = card.get("fullname", "Mehmon")
                kb = InlineKeyboardMarkup(inline_keyboard=[
                    [
                        InlineKeyboardButton(text="➕ +1 Muhr qo'shish", callback_data=f"quick_stamp:{target_id}:1"),
                        InlineKeyboardButton(text="➖ -1 Muhr ayirish", callback_data=f"quick_stamp:{target_id}:-1")
                    ]
                ])
                await message.answer(
                    f"☕️ <b>Mijoz topildi (QR skaner):</b>\n\n"
                    f"👤 <b>Ism:</b> {name}\n"
                    f"🆔 <b>Telegram ID:</b> <code>{target_id}</code>\n"
                    f"☕️ <b>Joriy muhrlar:</b> {stamps} / 6\n\n"
                    f"Barista uchun tezkor boshqaruv:",
                    parse_mode="HTML",
                    reply_markup=kb
                )
                return
        except Exception as e:
            logger.warning(f"Error handling deep link: {e}")

    # Auto-register in Supabase loyalty system
    if user_id:
        try:
            await supabase_service.get_or_create_loyalty_card(
                telegram_id=user_id,
                fullname=user.full_name if user else user_name,
                username=username
            )
        except Exception as e:
            logger.warning(f"Error auto-registering user {user_id} in Supabase: {e}")

    welcome_text = (
        f"Assalomu alaykum, <b>{user_name}</b>!\n\n"
        "☕️ <b>Gusto Coffee Bar</b>'ga xush kelibsiz.\n"
        "<i>«Coffee worth slowing down for»</i> — Shoshilmaslikka arziydigan qahva falsafasi.\n\n"
        "Quyidagi imkoniyatlardan foydalanishingiz mumkin:\n"
        "• <b>☕️ Qahva menyusi</b> — Mini App'da barcha qahva va ichimliklarni ko'rish;\n"
        "• <b>🌐 Gusto vebsayt</b> — asosiy veb-sahifamizni tomosha qilish;\n"
        "• <b>📅 Stol band qilish</b> — chatdan chiqmasdan qulay joy bron qilish;\n"
        "• <b>🎁 Sodiqlik kartasi</b> — har 6-qahvani sovg'a sifatida bepul olish."
    )
    # Send persistent reply menu and inline welcome card
    await message.answer(
        text=welcome_text,
        parse_mode="HTML",
        reply_markup=get_reply_main_menu()
    )
    await message.answer(
        text="Quyidagi bo'limlardan birini tanlang:",
        reply_markup=get_main_menu_keyboard()
    )

@router.message(Command("menu"))
async def handle_menu_cmd(message: Message):
    menu_url = f"{settings.MINI_APP_URL}/#menu"
    await message.answer(
        text="☕️ <b>Gusto Coffee interaktiv menyusi:</b>\nIchimliklar, shirinliklar va qahvalar bilan tanishing.",
        parse_mode="HTML",
        reply_markup=InlineKeyboardMarkup(inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="☕️ Qahva menyusini ochish",
                    web_app=WebAppInfo(url=menu_url)
                ),
                InlineKeyboardButton(
                    text="🌐 Vebsayt",
                    web_app=WebAppInfo(url=settings.MINI_APP_URL)
                )
            ]
        ])
    )

@router.message(Command("reserve"))
@router.message(F.text.contains("Stol band qilish"))
async def handle_reserve_cmd(message: Message, bot: Bot):
    widget_service = WidgetService(bot)
    await widget_service.send_widget(
        chat_id=message.chat.id,
        widget_filename="reservation_widget.html",
        initial_chat_data={"status": "init"},
        mini_app_url=f"{settings.MINI_APP_URL}/#table-reservation"
    )

@router.message(F.text.contains("Sodiqlik kartam"))
async def handle_loyalty_text_cmd(message: Message, bot: Bot):
    widget_service = WidgetService(bot)
    user_id = message.from_user.id if message.from_user else 0
    full_name = message.from_user.full_name if message.from_user else "Mehmon"
    username = message.from_user.username if message.from_user else ""

    # Fetch live stamp balance from Supabase
    card = await supabase_service.get_or_create_loyalty_card(user_id, full_name, username)
    stamps = card.get("stamps", 0)
    member_id = f"GC-{str(user_id)[-6:]}"

    await widget_service.send_widget(
        chat_id=message.chat.id,
        widget_filename="loyalty_widget.html",
        initial_chat_data={
            "cups": stamps,
            "total": 6,
            "member_id": member_id,
            "fullname": full_name
        },
        mini_app_url=settings.MINI_APP_URL
    )

@router.message(Command("bookings"))
@router.message(F.text.contains("Bronlarim"))
async def handle_my_bookings(message: Message):
    user_id = message.from_user.id if message.from_user else 0
    orders = await supabase_service.get_user_reservations(user_id)
    if not orders:
        await message.answer(
            "📋 <b>Sizda hali faol stol bronlari mavjud emas.</b>\n\n"
            "Joy band qilish uchun «📅 Stol band qilish» tugmasidan foydalaning.",
            parse_mode="HTML"
        )
        return

    text = "📋 <b>Sizning so'nggi stol bronlaringiz:</b>\n\n"
    for i, ord_item in enumerate(orders, 1):
        num = ord_item.get("order_number", "GC-••••")
        note = ord_item.get("note", "")
        status = ord_item.get("status", "open")
        status_text = "🟢 Qabul qilingan" if status == "open" else f"⚪️ {status}"

        details = ""
        if "|" in note:
            parts = [p.strip() for p in note.split("|") if "Vaqt:" in p or "Mehmonlar:" in p]
            if parts:
                details = "\n" + " • ".join(parts)

        text += f"{i}. <b>{num}</b> ({status_text}){details}\n📍 Filial: Gusto Xonqa\n\n"

    await message.answer(text=text, parse_mode="HTML")

@router.callback_query(F.data == "info_location")
@router.message(F.text.contains("Manzil"))
async def handle_info_location(event: CallbackQuery | Message):
    text = (
        "📍 <b>Gusto Coffee Bar manzillari:</b>\n\n"
        "🏢 <b>Xonqa filiali:</b>\n"
        "Xorazm viloyati, Xonqa tumani, Mustaqillik ko‘chasi, 24-uy\n"
        "⏰ <b>Ish vaqti:</b>\n"
        "Dushanba – Shanba: 08:00 – 23:00\n"
        "Yakshanba: 09:00 – 23:00\n\n"
        "🚗 Mo‘ljal: Markaziy maydon, Xonqa dehqon bozori yaqinida."
    )
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🗺 Xaritada ochish (Google Maps)",
                url="https://maps.app.goo.gl/9XygkJ35KZSzZzg88"
            )
        ],
        [
            InlineKeyboardButton(
                text="⬅️ Bosh menyu",
                callback_data="back_to_menu"
            )
        ]
    ])
    if isinstance(event, CallbackQuery):
        await event.message.edit_text(text=text, parse_mode="HTML", reply_markup=kb)
        await event.answer()
    else:
        await event.answer(text=text, parse_mode="HTML", reply_markup=kb)

@router.callback_query(F.data == "info_contact")
@router.message(F.text.contains("Aloqa"))
async def handle_info_contact(event: CallbackQuery | Message):
    text = (
        "📞 <b>Gusto Coffee bilan bog‘lanish:</b>\n\n"
        "📱 <b>Telefon:</b> <code>+998932875484</code> (nusxa olish uchun bosing)\n"
        "✉️ <b>Email:</b> info@gustocoffee.uz\n"
        "💬 <b>Telegram:</b> @gustobronbot\n\n"
        "Savollaringiz yoki takliflaringiz bo‘lsa, xursandchilik bilan javob beramiz!"
    )
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="🌐 Gusto Vebsayt",
                web_app=WebAppInfo(url=settings.MINI_APP_URL)
            )
        ],
        [
            InlineKeyboardButton(
                text="⬅️ Bosh menyu",
                callback_data="back_to_menu"
            )
        ]
    ])
    if isinstance(event, CallbackQuery):
        await event.message.edit_text(text=text, parse_mode="HTML", reply_markup=kb)
        await event.answer()
    else:
        await event.answer(text=text, parse_mode="HTML", reply_markup=kb)

@router.callback_query(F.data == "back_to_menu")
async def handle_back_to_menu(call: CallbackQuery):
    await call.message.edit_text(
        text="☕️ <b>Gusto Coffee Bar</b> bosh menyusi:",
        parse_mode="HTML",
        reply_markup=get_main_menu_keyboard()
    )
    await call.answer()

# Handling incoming Telegram Mini App data (via sendData)
@router.message(F.web_app_data)
async def handle_web_app_data(message: Message, bot: Bot):
    try:
        raw_data = message.web_app_data.data
        data_json = json.loads(raw_data)
        action = data_json.get("action")
        payload = data_json.get("data", {})

        if action == "table_reservation":
            name = payload.get("name", "Noma'lum")
            phone = payload.get("phone", "Noma'lum")
            date = payload.get("date", "Bugun")
            time = payload.get("time", "18:00")
            guests = payload.get("guests", "2")
            experience = payload.get("experience", "Standard")
            location = payload.get("locationName", "Gusto Xonqa")

            # Save in Supabase Orders
            booking_code, _ = await supabase_service.create_table_reservation(
                telegram_id=message.from_user.id,
                name=name,
                day=date,
                time=time,
                guests=guests,
                phone=phone
            )

            # Reply to user
            confirmation_user = (
                "✅ <b>Stol muvaffaqiyatli band qilindi!</b>\n\n"
                f"🔖 <b>Bron kodi:</b> <code>#{booking_code}</code>\n"
                f"👤 <b>Mehmon:</b> {name}\n"
                f"📞 <b>Telefon:</b> {phone}\n"
                f"📅 <b>Sana/Vaqt:</b> {date} soat {time}\n"
                f"👥 <b>Mehmonlar:</b> {guests} kishi\n"
                f"📍 <b>Filial:</b> {location}\n\n"
                "☕️ Sizni Gusto Coffee'da intiqlik bilan kutamiz!"
            )
            await message.answer(confirmation_user, parse_mode="HTML")

            # Notify Admin / Barista Group
            admin_alert = (
                "🔔 <b>YANGI STOL BAND QILINDI (Mini App)</b>\n\n"
                f"🔖 <b>Bron kodi:</b> <code>#{booking_code}</code>\n"
                f"👤 <b>Mehmon:</b> {name}\n"
                f"📞 <b>Telefon:</b> <code>{phone}</code>\n"
                f"📅 <b>Vaqt:</b> {date} | {time}\n"
                f"👥 <b>Mehmonlar:</b> {guests} kishi\n"
                f"🎯 <b>Maqsad:</b> {experience}\n"
                f"📍 <b>Filial:</b> {location}\n"
                f"🆔 <b>Telegram ID:</b> <code>{message.from_user.id}</code>\n"
                f"🗄 <b>Baza holati:</b> Supabase orders (status: open)"
            )
            if settings.ADMIN_CHAT_ID:
                try:
                    await bot.send_message(
                        chat_id=settings.ADMIN_CHAT_ID,
                        text=admin_alert,
                        parse_mode="HTML"
                    )
                except Exception as ex:
                    logger.warning(f"Could not forward reservation to admin chat: {ex}")

    except Exception as e:
        logger.error(f"Error processing WebApp data: {e}")
        await message.answer("Ma'lumotlar qabul qilindi. Tez orada siz bilan bog'lanamiz!")

@router.message()
async def handle_default_fallback(message: Message):
    text = (
        "☕️ <b>Gusto Coffee Bot</b> xizmatidasiz!\n\n"
        "Quyidagi menyu tugmalaridan birini tanlashingiz mumkin:\n\n"
        "• ☕️ <b>Qahva menyusi</b> — Ichimliklar ro'yxati\n"
        "• 📅 <b>Stol band qilish</b> — Qulay vaqtga joy bron qilish\n"
        "• 🎁 <b>Sodiqlik kartam</b> — Muhrlaringiz va bepul kofe\n"
        "• 📋 <b>Bronlarim</b> — Faol buyurtmalaringiz\n"
        "• 📍 <b>Manzil va Ish vaqti</b> — Filial joylashuvi\n"
        "• 📞 <b>Aloqa</b> — Biz bilan bog'lanish"
    )
    await message.answer(text=text, parse_mode="HTML", reply_markup=get_reply_main_menu())
