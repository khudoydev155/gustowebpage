import logging
from typing import Tuple, Optional, Dict, Any
from aiogram import Router, Bot, F
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from config import settings
from services.supabase_service import supabase_service

logger = logging.getLogger(__name__)
router = Router(name="admin")

async def is_employee(bot: Bot, user_id: int) -> bool:
    """
    Checks if the user is an authorized Gusto employee/barista.
    Any member or admin of the Barista group (-5392092158) is authorized.
    """
    if not user_id:
        return False
    try:
        chat_id = int(settings.ADMIN_CHAT_ID) if str(settings.ADMIN_CHAT_ID).lstrip("-").isdigit() else settings.ADMIN_CHAT_ID
        member = await bot.get_chat_member(chat_id=chat_id, user_id=user_id)
        if member.status in ("creator", "administrator", "member"):
            return True
    except Exception as e:
        logger.debug(f"is_employee check failed for {user_id}: {e}")
    return False

def render_visual_cups(stamps: int, total: int = 6) -> str:
    """Renders visual status bar e.g. [☕️][☕️][☕️][☕️][⚪️][🎁] with ASCII progress bar."""
    stamps = max(0, min(total, stamps))
    cups = []
    for i in range(1, total + 1):
        if i == total:
            cups.append("🎁" if stamps >= total else "⭐️")
        else:
            cups.append("☕️" if i <= stamps else "⚪️")
    cups_str = " ".join([f"[{c}]" for c in cups])

    filled = int(round((stamps / total) * 8))
    pbar = "█" * filled + "░" * (8 - filled)
    percent = int((stamps / total) * 100)

    return f"{cups_str}\n<code>[{pbar}] {stamps}/{total} ({percent}%)</code>"

def get_barista_panel_keyboard(target_user_id: int, stamps: int) -> InlineKeyboardMarkup:
    """Builds inline action buttons for Barista QR Scanner."""
    buttons = []

    if stamps >= 6:
        buttons.append([
            InlineKeyboardButton(
                text="🎁 BEPUL QAHVA BERILDI (0/6 qilish)",
                callback_data=f"redeem_gift:{target_user_id}"
            )
        ])

    buttons.append([
        InlineKeyboardButton(text="☕️ +1 Qahva muhri", callback_data=f"quick_stamp:{target_user_id}:1"),
        InlineKeyboardButton(text="☕️☕️ +2 Qahva muhri", callback_data=f"quick_stamp:{target_user_id}:2")
    ])

    buttons.append([
        InlineKeyboardButton(text="➖ -1 Bekor qilish", callback_data=f"quick_stamp:{target_user_id}:-1"),
        InlineKeyboardButton(text="🔄 Yangilash", callback_data=f"refresh_client:{target_user_id}")
    ])

    return InlineKeyboardMarkup(inline_keyboard=buttons)

def format_barista_panel(name: str, username: str, target_id: int, stamps: int, rewards: int) -> str:
    """Formats the Barista Control Panel message with rich luxury coffee UI."""
    visual = render_visual_cups(stamps)
    member_code = f"GC-{str(target_id)[-6:]}"
    user_tag = f" (@{username})" if username else ""

    if stamps >= 6:
        banner = (
            "━━━━━━━━━━━━━━━━━━━━\n"
            "🎉 <b>DIQQAT: MIJOZ 6 TA MUHR YIG'DI!</b>\n"
            "🎁 <b>Ushbu qahva mijoz uchun MUTLAQO BEPUL!</b>\n"
            "<i>(Sovg'ani topshirgach, yuqoridagi oltin tugmani bosing)</i>\n"
            "━━━━━━━━━━━━━━━━━━━━"
        )
    elif stamps == 5:
        banner = (
            "━━━━━━━━━━━━━━━━━━━━\n"
            "🔥 <b>Keyingi 1 ta qahvadan so'ng sovg'a BEPUL QAHVA!</b>\n"
            "━━━━━━━━━━━━━━━━━━━━"
        )
    else:
        banner = f"⏳ Bepul qahvagacha: yana <b>{6 - stamps} ta</b> muhr qoldi."

    return (
        "━━━━━━━━━━━━━━━━━━━━\n"
        "☕️ <b>GUSTO COFFEE BAR | BARISTA PANELI</b>\n"
        "━━━━━━━━━━━━━━━━━━━━\n\n"
        f"👤 <b>Mijoz:</b> <b>{name}</b>{user_tag}\n"
        f"🔖 <b>Karta kodi:</b> <code>{member_code}</code>\n"
        f"🆔 <b>Telegram ID:</b> <code>{target_id}</code>\n\n"
        f"📊 <b>Sodiqlik balansi:</b>\n"
        f"{visual}\n\n"
        f"{banner}\n\n"
        f"🏆 <b>Avval berilgan sovg'alar:</b> {rewards} ta bepul qahva\n"
        "━━━━━━━━━━━━━━━━━━━━\n"
        "👇 <b>Barista tezkor amalini tanlang:</b>"
    )

@router.callback_query(F.data.startswith("quick_stamp:"))
async def handle_quick_stamp(call: CallbackQuery, bot: Bot):
    """Barista clicks +1 or +2 stamps on customer profile."""
    # 1. Authorization check
    if not await is_employee(bot, call.from_user.id):
        await call.answer("⚠️ Ushbu amal faqat Gusto xodimlari uchun ruxsat etilgan!", show_alert=True)
        return

    parts = call.data.split(":")
    target_user_id = int(parts[1])
    count = int(parts[2])

    try:
        new_stamps, free_awarded, card = await supabase_service.add_loyalty_stamps(
            telegram_id=target_user_id,
            count=count
        )
        rewards = card.get("free_coffees_earned", 0) if card else 0
        name = card.get("fullname", "Mehmon") if card else "Mehmon"
        username = card.get("username", "") if card else ""

        # Update Barista message
        updated_text = format_barista_panel(name, username, target_user_id, new_stamps, rewards)
        sign = f"+{count}" if count > 0 else str(count)
        sign_header = f"✅ <b>Muhr o'zgartirildi ({sign}):</b>\n\n"
        kb = get_barista_panel_keyboard(target_user_id, new_stamps)

        await call.message.edit_text(text=sign_header + updated_text, parse_mode="HTML", reply_markup=kb)
        if free_awarded or new_stamps >= 6:
            await call.answer("🎉 TABRIKLAYMIZ! Mijoz 6 ta muhr to'pladi va bepul qahva yutdi!", show_alert=True)
        else:
            await call.answer(f"✅ {sign} muhr saqlandi! ({new_stamps}/6)")

        # Notify Customer in private Telegram chat
        try:
            if free_awarded or new_stamps >= 6:
                user_msg = (
                    "🎉 <b>TABRIKLAYMIZ! BEPUL QAHVA!</b>\n\n"
                    "Siz Gusto Coffee Club'da <b>6 ta muhr</b> yig'dingiz va <b>BEPUL QAHVA</b> yutib oldingiz! ☕️🎁\n\n"
                    "Baristaga ushbu xabarni ko'rsatib, bepul qahvangizni qabul qiling!"
                )
            else:
                user_msg = (
                    f"☕️ <b>Gusto Coffee Club:</b>\n\n"
                    f"Kartangizga <b>{sign} muhr</b> qo'shildi! ☕️\n"
                    f"Joriy balansingiz: <b>{new_stamps} / 6 muhr</b>.\n"
                    f"Yana <b>{6 - new_stamps} ta</b> qahvadan so'ng sovg'angiz tayyor!"
                )
            await bot.send_message(chat_id=target_user_id, text=user_msg, parse_mode="HTML")
        except Exception as e:
            logger.debug(f"Could not deliver direct notification to user {target_user_id}: {e}")

        # Audit notification to Admin/Barista group
        if settings.ADMIN_CHAT_ID:
            try:
                target_chat = int(settings.ADMIN_CHAT_ID) if str(settings.ADMIN_CHAT_ID).lstrip("-").isdigit() else settings.ADMIN_CHAT_ID
                barista_name = call.from_user.full_name
                group_alert = (
                    "☕️ <b>SODIQLIK MUHRI BERILDI</b>\n\n"
                    f"👤 <b>Barista:</b> {barista_name} (@{call.from_user.username or '-'})\n"
                    f"🎯 <b>Mijoz:</b> {name} (<code>GC-{str(target_user_id)[-6:]}</code>)\n"
                    f"⚡️ <b>Amal:</b> {sign} muhr\n"
                    f"📊 <b>Yangi balans:</b> {new_stamps} / 6 muhr"
                )
                await bot.send_message(chat_id=target_chat, text=group_alert, parse_mode="HTML")
            except Exception as e:
                logger.warning(f"Error logging stamp action to group: {e}")

    except Exception as e:
        logger.error(f"Error handling quick_stamp: {e}")
        await call.answer(f"Xatolik: {e}", show_alert=True)

@router.callback_query(F.data.startswith("redeem_gift:"))
async def handle_redeem_gift(call: CallbackQuery, bot: Bot):
    """Barista hands over free coffee and resets customer stamps modulo 6."""
    if not await is_employee(bot, call.from_user.id):
        await call.answer("⚠️ Ushbu amal faqat Gusto xodimlari uchun ruxsat etilgan!", show_alert=True)
        return

    parts = call.data.split(":")
    target_user_id = int(parts[1])

    try:
        # Reset stamps to 0 (or subtract 6)
        card = await supabase_service.get_loyalty_card(target_user_id)
        current_stamps = card.get("stamps", 0) if card else 0
        current_rewards = card.get("free_coffees_earned", 0) if card else 0
        name = card.get("fullname", "Mehmon") if card else "Mehmon"
        username = card.get("username", "") if card else ""

        new_stamps = max(0, current_stamps - 6)
        new_rewards = current_rewards + 1

        url = f"{supabase_service.base_url}/rest/v1/loyalty_cards?telegram_id=eq.{target_user_id}"
        payload = {"stamps": new_stamps, "free_coffees_earned": new_rewards}
        import aiohttp
        async with aiohttp.ClientSession() as session:
            await session.patch(url, headers=supabase_service._headers(), json=payload)

        # Update Barista message
        updated_text = format_barista_panel(name, username, target_user_id, new_stamps, new_rewards)
        kb = get_barista_panel_keyboard(target_user_id, new_stamps)
        header = "🎁 <b>BEPUL QAHVA TOPSHIRILDI! Tsikl yangilandi (0/6):</b>\n\n"
        await call.message.edit_text(text=header + updated_text, parse_mode="HTML", reply_markup=kb)
        await call.answer("🎁 Bepul qahva muvaffaqiyatli topshirildi!", show_alert=True)

        # Notify Customer
        try:
            user_msg = (
                "🎁 <b>Bepul qahvangizdan bahramand bo'ling!</b> ☕️✨\n\n"
                "Gusto Coffee Club'da sovg'angiz topshirildi. Yangi sodiqlik tsikli boshlandi (0/6 muhr).\n"
                "Har gal qahva xarid qilganingizda yana muhr yig'ishda davom eting!"
            )
            await bot.send_message(chat_id=target_user_id, text=user_msg, parse_mode="HTML")
        except Exception:
            pass

        # Audit notification to Barista group
        if settings.ADMIN_CHAT_ID:
            try:
                target_chat = int(settings.ADMIN_CHAT_ID) if str(settings.ADMIN_CHAT_ID).lstrip("-").isdigit() else settings.ADMIN_CHAT_ID
                barista_name = call.from_user.full_name
                group_alert = (
                    "🎁 <b>BEPUL QAHVA TOPSHIRILDI</b>\n\n"
                    f"👤 <b>Barista:</b> {barista_name} (@{call.from_user.username or '-'})\n"
                    f"🎯 <b>Mijoz:</b> {name} (<code>GC-{str(target_user_id)[-6:]}</code>)\n"
                    "🎉 <b>Sovg'a:</b> 6-chi bepul qahva muvaffaqiyatli berildi!"
                )
                await bot.send_message(chat_id=target_chat, text=group_alert, parse_mode="HTML")
            except Exception as e:
                logger.warning(f"Error logging gift redemption to group: {e}")

    except Exception as e:
        logger.error(f"Error handling redeem_gift: {e}")
        await call.answer(f"Xatolik: {e}", show_alert=True)

@router.callback_query(F.data.startswith("refresh_client:"))
async def handle_refresh_client(call: CallbackQuery, bot: Bot):
    """Refreshes customer panel data."""
    parts = call.data.split(":")
    target_user_id = int(parts[1])

    card = await supabase_service.get_loyalty_card(target_user_id)
    if not card:
        await call.answer("Mijoz topilmadi!", show_alert=True)
        return

    stamps = card.get("stamps", 0)
    rewards = card.get("free_coffees_earned", 0)
    name = card.get("fullname", "Mehmon")
    username = card.get("username", "")

    panel_text = format_barista_panel(name, username, target_user_id, stamps, rewards)
    kb = get_barista_panel_keyboard(target_user_id, stamps)
    try:
        await call.message.edit_text(text=panel_text, parse_mode="HTML", reply_markup=kb)
        await call.answer("Ma'lumotlar yangilandi!")
    except Exception:
        await call.answer("Eng so'nggi ma'lumotlar ko'rsatilmoqda.")

@router.message(Command("stamp"))
async def handle_stamp_command(message: Message, bot: Bot):
    """
    Usage: /stamp <telegram_id> [count]
    Manually award stamps via text command.
    """
    if not await is_employee(bot, message.from_user.id):
        await message.reply("⚠️ Ushbu buyruq faqat Gusto xodimlari uchun!")
        return

    args = message.text.split()[1:] if message.text else []
    if not args:
        await message.reply(
            "⚠️ <b>Foydalanish tartibi:</b>\n"
            "<code>/stamp &lt;telegram_id&gt; [soni]</code>\n\n"
            "Masalan: <code>/stamp 1161063594 1</code> (+1 muhr qo'shish)",
            parse_mode="HTML"
        )
        return

    try:
        target_user_id = int(args[0])
    except ValueError:
        await message.reply("❌ Telegram ID raqam bo'lishi kerak!")
        return

    count = int(args[1]) if len(args) > 1 and args[1].lstrip("-").isdigit() else 1

    try:
        new_stamps, free_awarded, card = await supabase_service.add_loyalty_stamps(
            telegram_id=target_user_id,
            count=count
        )
        rewards = card.get("free_coffees_earned", 0) if card else 0
        name = card.get("fullname", "Mehmon") if card else "Mehmon"
        username = card.get("username", "") if card else ""

        panel = format_barista_panel(name, username, target_user_id, new_stamps, rewards)
        kb = get_barista_panel_keyboard(target_user_id, new_stamps)
        await message.reply(panel, parse_mode="HTML", reply_markup=kb)
    except Exception as ex:
        await message.reply(f"❌ Xatolik yuz berdi: {ex}")

@router.message(Command("user"))
async def handle_user_command(message: Message, bot: Bot):
    """Usage: /user <telegram_id>"""
    if not await is_employee(bot, message.from_user.id):
        await message.reply("⚠️ Ushbu buyruq faqat Gusto xodimlari uchun!")
        return

    args = message.text.split()[1:] if message.text else []
    if not args:
        await message.reply("Foydalanish: <code>/user &lt;telegram_id&gt;</code>", parse_mode="HTML")
        return

    try:
        target_user_id = int(args[0])
    except ValueError:
        await message.reply("Telegram ID raqam bo'lishi kerak!")
        return

    card = await supabase_service.get_loyalty_card(target_user_id)
    if not card:
        await message.reply("Ushbu foydalanuvchi bazada topilmadi.")
        return

    stamps = card.get("stamps", 0)
    rewards = card.get("free_coffees_earned", 0)
    fullname = card.get("fullname", "Noma'lum")
    username = card.get("username", "-")

    panel = format_barista_panel(fullname, username, target_user_id, stamps, rewards)
    kb = get_barista_panel_keyboard(target_user_id, stamps)
    await message.reply(panel, parse_mode="HTML", reply_markup=kb)

@router.message(Command("tables"))
async def handle_tables_command(message: Message):
    """Lists current tables and their status from Supabase."""
    tables = await supabase_service.get_tables()
    if not tables:
        await message.reply("Hozirda faol stollar ro'yxati mavjud emas.")
        return

    text = "🍽 <b>Gusto Coffee Bar stollari holati:</b>\n\n"
    for t in tables:
        status_icon = "🟢" if t.get("status") == "free" else "🔴"
        text += f"{status_icon} <b>{t.get('name')}</b> — holati: <code>{t.get('status')}</code>\n"

    await message.reply(text, parse_mode="HTML")
