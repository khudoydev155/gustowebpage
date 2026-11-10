import json
import logging
from pathlib import Path
from typing import Optional, Dict, Any
from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import aiohttp

logger = logging.getLogger(__name__)

WIDGETS_DIR = Path(__file__).resolve().parent.parent / "widgets"

class WidgetService:
    def __init__(self, bot: Bot):
        self.bot = bot
        self._cache: Dict[str, str] = {}

    def get_widget_html(self, filename: str) -> str:
        """Loads and caches widget HTML from file."""
        if filename in self._cache:
            return self._cache[filename]

        file_path = WIDGETS_DIR / filename
        if not file_path.exists():
            raise FileNotFoundError(f"Widget file not found: {file_path}")

        content = file_path.read_text(encoding="utf-8")
        self._cache[filename] = content
        return content

    async def send_widget(
        self,
        chat_id: int | str,
        widget_filename: str,
        initial_chat_data: Optional[Dict[str, Any]] = None,
        reply_markup: Optional[InlineKeyboardMarkup] = None,
        fallback_text: Optional[str] = None,
        mini_app_url: Optional[str] = None
    ) -> Optional[int]:
        """
        Sends an HTML Widget using Telegram Bot API 10.4 'sendWidget' method.
        If the client or Bot API throws an error (e.g., unsupported client),
        falls back gracefully to a message with an Inline Mini App button.
        """
        html = self.get_widget_html(widget_filename)

        if "loyalty" in widget_filename:
            try:
                import segno
                qr_data = f"https://t.me/gustobronbot?start=s_{chat_id}"
                qr = segno.make(qr_data, error="l")
                # omitsize=True produces viewBox without fixed width/height for responsive scaling
                qr_svg = qr.svg_inline(omitsize=True, border=1, dark="#000")
                html = html.replace("<!-- QR_SVG_PLACEHOLDER -->", qr_svg)
            except Exception as ex:
                logger.warning(f"Error generating dynamic QR SVG: {ex}")

        chat_data_str = json.dumps(initial_chat_data or {})

        payload: Dict[str, Any] = {
            "chat_id": chat_id,
            "html": html,
            "allow_queries": True,
            "chat_data": chat_data_str
        }

        if reply_markup:
            payload["reply_markup"] = reply_markup.model_dump(exclude_none=True)

        url = f"https://api.telegram.org/bot{self.bot.token}/sendWidget"

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=payload) as resp:
                    data = await resp.json()
                    if data.get("ok"):
                        message_id = data.get("result", {}).get("message_id")
                        logger.info(f"Widget '{widget_filename}' sent successfully: msg_id={message_id}")
                        return message_id
                    else:
                        logger.warning(f"Telegram Bot API sendWidget returned error: {data}")
        except Exception as e:
            logger.error(f"Failed to send HTML widget via sendWidget API: {e}")

        # Graceful Fallback if sendWidget fails or is not supported on client
        logger.info("Executing graceful fallback message with WebApp button...")
        markup = InlineKeyboardMarkup(inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="☕️ Mini App'da ochish",
                    web_app=WebAppInfo(url=mini_app_url or "https://gustocoffee.uz/#table-reservation")
                )
            ]
        ])
        fallback = fallback_text or (
            "☕️ <b>Gusto Coffee — Stol band qilish</b>\n\n"
            "Telegram ilovangiz yangi chat vidjetlarini qo'llab-quvvatlamasa, "
            "quyidagi tugma orqali to'g'ridan-to'g'ri Mini App'da ochishingiz mumkin:"
        )
        msg = await self.bot.send_message(
            chat_id=chat_id,
            text=fallback,
            parse_mode="HTML",
            reply_markup=markup
        )
        return msg.message_id

    async def answer_widget_query(
        self,
        widget_query_id: str,
        data: Optional[str] = None
    ) -> bool:
        """Answers an interactive trigger from TelegramWidget.request()."""
        url = f"https://api.telegram.org/bot{self.bot.token}/answerWidgetQuery"
        payload: Dict[str, Any] = {
            "widget_query_id": widget_query_id
        }
        if data is not None:
            payload["data"] = str(data)

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=payload) as resp:
                    res = await resp.json()
                    logger.debug(f"answerWidgetQuery response: {res}")
                    return bool(res.get("ok"))
        except Exception as e:
            logger.error(f"Error answering widget query: {e}")
            return False

    async def edit_widget_data(
        self,
        chat_id: int | str,
        message_id: int,
        new_data: Dict[str, Any]
    ) -> bool:
        """Updates chatData for an existing widget to trigger UI re-renders."""
        url = f"https://api.telegram.org/bot{self.bot.token}/editMessageWidgetData"
        payload = {
            "chat_id": chat_id,
            "message_id": message_id,
            "data": json.dumps(new_data)
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=payload) as resp:
                    res = await resp.json()
                    return bool(res.get("ok"))
        except Exception as e:
            logger.error(f"Error editing widget data: {e}")
            return False
