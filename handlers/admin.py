import logging
from aiogram import Router, Bot, F
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from config import settings
from services.supabase_service import supabase_service

logger = logging.getLogger(__name__)
router = Router(name="admin")

@router.callback_query(F.data.startswith("quick_stamp:"))
async def handle_quick_stamp(call: CallbackQuery, bot: Bot):
    parts = call.data.split(":")
    target_user_id = int(parts[1])
    count = int(parts[2])

    try:
        new_stamps, free_awarded, card = await supabase_service.add_loyalty_stamps(
            telegram_id=target_user_id,
            count=count
        )
        sign = f"+{count}" if count > 0 else str(count)
        text = (
            f"✅ <b>Muhr o'zgartirildi ({sign}):</b>\n\n"
            f"👤 <b>Mijoz ID:</b> <code>{target_user_id}</code>\n"
            f"☕️ <b>Yangi balans:</b> {new_stamps} / 6 muhr\n"
        )
        if free_awarded:
            text += "\n🎁 <b>Mijoz 6 ta muhr to'pladi va BEPUL QAHVA yutdi!</b>"

        kb = InlineKeyboardMarkup(inline_keyboard=[
            [
                InlineKeyboardButton(text="➕ Yana +1 qo'shish", callback_data=f"quick_stamp:{target_user_id}:1"),
                InlineKeyboardButton(text="➖ -1 ayirish", callback_data=f"quick_stamp:{target_user_id}:-1")
            ]
        ])
        await call.message.edit_text(text=text, parse_mode="HTML", reply_markup=kb)
        await call.answer(f"{sign} muhr saqlandi!")

        # Notify user
        try:
            if free_awarded:
                user_msg = (
                    "🎉 <b>TABRIKLAYMIZ!</b>\n\n"
                    "Siz Gusto Coffee Club'da <b>6 ta muhr</b> yig'dingiz va <b>BEPUL QAHVA</b> yutib oldingiz! ☕️🎁\n\n"
                    "Baristadan bepul qahvangizni qabul qiling!"
                )
            else:
                user_msg = (
                    f"☕️ <b>Gusto Coffee Club:</b>\n\n"
                    f"Kartangizga <b>{sign} muhr</b> qo'shildi!\n"
                    f"Joriy balansingiz: <b>{new_stamps}/6 muhr</b>."
                )
            await bot.send_message(chat_id=target_user_id, text=user_msg, parse_mode="HTML")
        except Exception:
            pass

    except Exception as e:
        logger.error(f"Error handling quick_stamp: {e}")
        await call.answer(f"Xatolik: {e}", show_alert=True)


@router.message(Command("stamp"))
async def handle_stamp_command(message: Message, bot: Bot):
    """
    Usage: /stamp <telegram_id> [count]
    Example: /stamp 8440689118 1
    Used by baristas to add or remove loyalty stamps.
    """
    args = message.text.split()[1:] if message.text else []
    if not args:
        await message.reply(
            "⚠️ <b>Foydalanish tartibi:</b>\n"
            "<code>/stamp &lt;telegram_id&gt; [soni]</code>\n\n"
            "Masalan: <code>/stamp 8440689118 1</code> (1 ta muhr qo'shish)\n"
            "yoki: <code>/stamp 8440689118 -1</code> (1 ta muhr ayirish)",
            parse_mode="HTML"
        )
        return

    try:
        target_user_id = int(args[0])
    except ValueError:
        await message.reply("❌ Telegram ID raqam bo'lishi kerak!")
        return

    count = 1
    if len(args) > 1:
        try:
            count = int(args[1])
        except ValueError:
            count = 1

    try:
        new_stamps, free_awarded, card = await supabase_service.add_loyalty_stamps(
            telegram_id=target_user_id,
            count=count
        )

        sign = f"+{count}" if count > 0 else str(count)
        admin_reply = (
            f"✅ <b>Muhr muvaffaqiyatli o'zgartirildi ({sign}):</b>\n\n"
            f"👤 <b>Mijoz ID:</b> <code>{target_user_id}</code>\n"
            f"☕️ <b>Yangi balans:</b> {new_stamps} / 6 muhr\n"
        )
        if free_awarded:
            admin_reply += "\n🎁 <b>Mijoz 6 ta muhr yig'di va BEPUL QAHVA yutdi!</b>"

        await message.reply(admin_reply, parse_mode="HTML")

        # Notify the user directly in Telegram
        try:
            if free_awarded:
                user_msg = (
                    "🎉 <b>TABRIKLAYMIZ!</b>\n\n"
                    "Siz Gusto Coffee Club'da <b>6 ta muhr</b> yig'dingiz va <b>BEPUL QAHVA</b> sovg'asini qo'lga kiritdingiz! ☕️🎁\n\n"
                    "Baristaga ushbu xabarni yoki Sodiqlik kartangizni ko'rsatib, sovg'angizni qabul qiling!"
                )
            else:
                user_msg = (
                    f"☕️ <b>Gusto Coffee Club:</b>\n\n"
                    f"Sizning kartangizga <b>{sign} muhr</b> qo'shildi!\n"
                    f"Joriy balansingiz: <b>{new_stamps}/6 muhr</b>.\n"
                    f"Yana <b>{6 - new_stamps} ta</b> qahvadan so'ng sovg'angiz tayyor!"
                )
            await bot.send_message(chat_id=target_user_id, text=user_msg, parse_mode="HTML")
        except Exception as e:
            logger.info(f"Could not deliver direct notification to user {target_user_id}: {e}")

    except Exception as ex:
        logger.error(f"Error executing /stamp command: {ex}")
        await message.reply(f"❌ Xatolik yuz berdi: {ex}")

@router.message(Command("user"))
async def handle_user_command(message: Message):
    """
    Usage: /user <telegram_id>
    Checks customer's loyalty profile.
    """
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

    info = (
        "📋 <b>Gusto Sodiqlik Kartasi:</b>\n\n"
        f"👤 <b>Ism:</b> {fullname}\n"
        f"💬 <b>Username:</b> @{username}\n"
        f"🆔 <b>Telegram ID:</b> <code>{target_user_id}</code>\n"
        f"☕️ <b>Joriy muhrlar:</b> {stamps} / 6\n"
        f"🎁 <b>Yutilgan bepul qahvalar:</b> {rewards} ta"
    )
    await message.reply(info, parse_mode="HTML")

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

