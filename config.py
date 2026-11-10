import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    BOT_TOKEN: str = "YOUR_BOT_TOKEN_HERE"
    ADMIN_CHAT_ID: str = "-5392092158"
    MINI_APP_URL: str = "https://gustocoffee.uz"
    USE_WEBHOOK: bool = False
    WEBHOOK_URL: str = ""
    HOST: str = "0.0.0.0"
    PORT: int = 8080

    SUPABASE_URL: str = ""
    SUPABASE_ROLE: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_ANON: str = ""

    @property
    def supabase_service_key(self) -> str:
        return self.SUPABASE_ROLE or self.SUPABASE_KEY or self.SUPABASE_ANON

settings = Settings()
