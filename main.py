import asyncio
import logging
import sys
from aiogram import Bot, Dispatcher, BaseMiddleware
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.types import Update
from config import settings
from handlers import start, widgets, admin

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger("gusto_bot")

class WidgetQueryMiddleware(BaseMiddleware):
    """
    Middleware to catch Bot API 10.4 widget_query updates before standard dispatcher routing.
    """
    async def __call__(self, handler, event: Update, data: dict):
        bot: Bot = data.get("bot")

        # Check for widget_query
        wq = getattr(event, "widget_query", None) or (event.model_extra or {}).get("widget_query")
        if not wq:
            raw_dict = event.model_dump(by_alias=True)
            wq = raw_dict.get("widget_query")

        if wq:
            logger.info(f"WidgetQueryMiddleware intercepted widget_query: {wq}")
            await widgets.process_raw_widget_query(bot, wq)
            return True

        # Check for shared_widget_query
        swq = getattr(event, "shared_widget_query", None) or (event.model_extra or {}).get("shared_widget_query")
        if not swq:
            raw_dict = event.model_dump(by_alias=True)
            swq = raw_dict.get("shared_widget_query")

        if swq:
            logger.info(f"WidgetQueryMiddleware intercepted shared_widget_query: {swq}")
            await widgets.process_raw_widget_query(bot, swq)
            return True

        return await handler(event, data)

async def main():
    if not settings.BOT_TOKEN or settings.BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        logger.warning(
            "⚠️ BOT_TOKEN o'rnatilmagan! Iltimos, /home/khudoydev/gusto-telegram-bot/.env "
            "faylida @BotFather'dan olingan tokenni kiriting."
        )

    bot = Bot(
        token=settings.BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher()

    # Register outer middleware for widget_query
    dp.update.outer_middleware(WidgetQueryMiddleware())

    # Include routers
    dp.include_router(admin.router)
    dp.include_router(start.router)
    dp.include_router(widgets.router)

    if settings.USE_WEBHOOK and settings.WEBHOOK_URL:
        from aiogram.webhook.aiohttp_server import SimpleRequestHandler, setup_application
        from aiohttp import web

        logger.info(f"Starting Gusto Bot in Webhook mode on {settings.HOST}:{settings.PORT}")
        await bot.set_webhook(settings.WEBHOOK_URL)

        app = web.Application()
        webhook_requests_handler = SimpleRequestHandler(
            dispatcher=dp,
            bot=bot,
        )
        webhook_requests_handler.register(app, path="/webhook")
        setup_application(app, dp, bot=bot)

        runner = web.AppRunner(app)
        await runner.setup()
        site = web.TCPSite(runner, settings.HOST, settings.PORT)
        await site.start()

        # Keep server running
        await asyncio.Event().wait()
    else:
        logger.info("Starting Gusto Bot in Long Polling mode...")
        # Drop pending updates on startup
        try:
            await bot.delete_webhook(drop_pending_updates=True)
        except Exception as e:
            logger.debug(f"Delete webhook error (can be ignored): {e}")

        await dp.start_polling(
            bot,
            allowed_updates=[
                "message",
                "callback_query",
                "inline_query",
                "widget_query",
                "shared_widget_query"
            ]
        )

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("Gusto Coffee Bot to'xtatildi.")
