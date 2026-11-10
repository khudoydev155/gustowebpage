import logging
from aiogram import Router, F, Bot
from aiogram.types import CallbackQuery
from config import settings
from services.supabase_service import supabase_service
from utils.widget_sender import WidgetService

logger = logging.getLogger(__name__)
router = Router(name="widgets")

@router.callback_query(F.data == "send_reservation_widget")
async def on_send_reservation_widget(call: CallbackQuery, bot: Bot):
    widget_service = WidgetService(bot)
    await call.answer()
    await widget_service.send_widget(
        chat_id=call.message.chat.id,
        widget_filename="reservation_widget.html",
        initial_chat_data={"status": "init"},
        mini_app_url=f"{settings.MINI_APP_URL}/#table-reservation"
    )

@router.callback_query(F.data == "send_loyalty_widget")
async def on_send_loyalty_widget(call: CallbackQuery, bot: Bot):
    widget_service = WidgetService(bot)
    await call.answer()

    user_id = call.from_user.id if call.from_user else 0
    full_name = call.from_user.full_name if call.from_user else "Mehmon"
    username = call.from_user.username if call.from_user else ""

    # Fetch live balance from Supabase
    card = await supabase_service.get_or_create_loyalty_card(user_id, full_name, username)
    stamps = card.get("stamps", 0)
    member_id = f"GC-{str(user_id)[-6:]}"

    await widget_service.send_widget(
        chat_id=call.message.chat.id,
        widget_filename="loyalty_widget.html",
        initial_chat_data={
            "cups": stamps,
            "total": 6,
            "member_id": member_id,
            "fullname": full_name
        },
        mini_app_url=settings.MINI_APP_URL
    )

async def process_raw_widget_query(bot: Bot, widget_query: dict):
    """
    Handles Bot API 10.4 widget_query updates received from inside the HTML widgets.
    """
    widget_service = WidgetService(bot)
    query_id = widget_query.get("id")
    data_str = widget_query.get("data", "")
    from_user = widget_query.get("from", {})
    user_id = from_user.get("id")
    user_name = from_user.get("first_name", "Mehmon")
    username = from_user.get("username", "")
    msg = widget_query.get("message", {})
    chat_id = msg.get("chat", {}).get("id") or user_id
    message_id = msg.get("message_id")

    logger.info(f"Received widget_query from user {user_id} ({user_name}): data={data_str}")

    if data_str.startswith("res:"):
        # Format: "res:day:time:guests"
        parts = data_str.split(":")
        day = parts[1] if len(parts) > 1 else "bugun"
        time_slot = parts[2] if len(parts) > 2 else "18:00"
        guests = parts[3] if len(parts) > 3 else "2"
        day_text = "Bugun" if day == "bugun" else ("Ertaga" if day == "ertaga" else "Indinga")

        # 1. Save reservation into Supabase Orders table
        booking_code, _ = await supabase_service.create_table_reservation(
            telegram_id=user_id,
            name=user_name,
            day=day,
            time=time_slot,
            guests=guests
        )

        # 2. Answer widget query with confirmation data
        res_payload = json.dumps({
            "status": "confirmed",
            "booking_code": booking_code,
            "day": day,
            "time": time_slot,
            "guests": guests
        })
        await widget_service.answer_widget_query(
            widget_query_id=query_id,
            data=res_payload
        )

        # 3. Update widget UI state in chat
        if chat_id and message_id:
            await widget_service.edit_widget_data(
                chat_id=chat_id,
                message_id=message_id,
                new_data={
                    "status": "confirmed",
                    "booking_code": booking_code,
                    "day": day,
                    "time": time_slot,
                    "guests": guests
                }
            )

        # 4. Notify Admin / Barista Group
        user_info = f"{user_name}" + (f" (@{username})" if username else "")
        admin_alert = (
            "🔔 <b>YANGI STOL BAND QILINDI (HTML Vidjet)</b>\n\n"
            f"🔖 <b>Bron kodi:</b> <code>#{booking_code}</code>\n"
            f"👤 <b>Mehmon:</b> {user_info}\n"
            f"📅 <b>Kuni:</b> {day_text}\n"
            f"⏰ <b>Vaqt:</b> {time_slot}\n"
            f"👥 <b>Mehmonlar soni:</b> {guests} kishi\n"
            f"📍 <b>Filial:</b> Gusto Coffee Xonqa\n"
            f"🆔 <b>Telegram ID:</b> <code>{user_id}</code>\n"
            f"🗄 <b>Baza holati:</b> Supabase orders (status: open)"
        )
        if settings.ADMIN_CHAT_ID:
            try:
                await bot.send_message(
                    chat_id=settings.ADMIN_CHAT_ID,
                    text=admin_alert,
                    parse_mode="HTML"
                )
                logger.info(f"Reservation #{booking_code} forwarded to admin chat {settings.ADMIN_CHAT_ID}")
            except Exception as e:
                logger.warning(f"Could not forward widget booking to admin chat: {e}")

    elif data_str == "loyalty:refresh":
        # Fetch live card from Supabase
        card = await supabase_service.get_or_create_loyalty_card(user_id, user_name, username)
        cups = card.get("stamps", 0)
        member_id = f"GC-{str(user_id)[-6:]}"

        # 1. Answer widget query
        await widget_service.answer_widget_query(
            widget_query_id=query_id,
            data=json.dumps({"cups": cups, "member_id": member_id})
        )

        # 2. Update widget UI with latest data
        if chat_id and message_id:
            await widget_service.edit_widget_data(
                chat_id=chat_id,
                message_id=message_id,
                new_data={
                    "cups": cups,
                    "total": 6,
                    "member_id": member_id,
                    "fullname": user_name
                }
            )
    else:
        await widget_service.answer_widget_query(
            widget_query_id=query_id,
            data="{}"
        )
