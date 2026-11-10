import logging
import random
import uuid
from typing import Optional, Dict, Any, Tuple, List
import aiohttp
from config import settings

logger = logging.getLogger(__name__)

DEFAULT_COFFEE_BRANCH_ID = "11111111-1111-1111-1111-111111111111"
DEFAULT_EMPLOYEE_ID = "3f9c2458-93b9-4972-9bf4-0a4a9cd210d0"

class SupabaseService:
    def __init__(self):
        self.base_url = settings.SUPABASE_URL.rstrip("/")
        self.api_key = settings.supabase_service_key

    def _headers(self) -> Dict[str, str]:
        return {
            "apikey": self.api_key,
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

    async def get_or_create_loyalty_card(
        self,
        telegram_id: int,
        fullname: str = "Mehmon",
        username: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Retrieves existing loyalty card or creates a new 0-stamp card in Supabase.
        """
        existing = await self.get_loyalty_card(telegram_id)
        if existing:
            # Update name/username if changed
            if existing.get("fullname") != fullname or existing.get("username") != username:
                await self.update_user_profile(telegram_id, fullname, username)
            return existing

        # Create new card
        url = f"{self.base_url}/rest/v1/loyalty_cards"
        payload = {
            "telegram_id": telegram_id,
            "fullname": fullname or "Mehmon",
            "username": username or "",
            "stamps": 0,
            "free_coffees_earned": 0
        }
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=self._headers(), json=payload) as resp:
                    if resp.status in (200, 201):
                        data = await resp.json()
                        if data and len(data) > 0:
                            return data[0]
                    else:
                        err_text = await resp.text()
                        logger.warning(f"Error creating loyalty card: {resp.status} - {err_text}")
        except Exception as e:
            logger.error(f"Failed to create loyalty card in Supabase: {e}")

        return {
            "telegram_id": telegram_id,
            "fullname": fullname,
            "username": username,
            "stamps": 0,
            "free_coffees_earned": 0
        }

    async def get_loyalty_card(self, telegram_id: int) -> Optional[Dict[str, Any]]:
        """Queries loyalty_cards by telegram_id."""
        url = f"{self.base_url}/rest/v1/loyalty_cards?telegram_id=eq.{telegram_id}&select=*"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self._headers()) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        if data and len(data) > 0:
                            return data[0]
        except Exception as e:
            logger.error(f"Failed to fetch loyalty card for {telegram_id}: {e}")
        return None

    async def update_user_profile(self, telegram_id: int, fullname: str, username: Optional[str]) -> bool:
        """Updates user's name/username in loyalty_cards."""
        url = f"{self.base_url}/rest/v1/loyalty_cards?telegram_id=eq.{telegram_id}"
        payload = {"fullname": fullname, "username": username or ""}
        try:
            async with aiohttp.ClientSession() as session:
                async with session.patch(url, headers=self._headers(), json=payload) as resp:
                    return resp.status in (200, 204)
        except Exception as e:
            logger.error(f"Error updating user profile: {e}")
            return False

    async def add_loyalty_stamps(
        self,
        telegram_id: int,
        count: int
    ) -> Tuple[int, bool, Optional[Dict[str, Any]]]:
        """
        Adds (or removes) stamps.
        If stamps reach 6, rewards free coffee and resets progress modulo 6.
        Returns: (new_stamps, free_coffee_awarded, updated_card)
        """
        card = await self.get_or_create_loyalty_card(telegram_id)
        current_stamps = card.get("stamps", 0)
        current_rewards = card.get("free_coffees_earned", 0)

        total_stamps = current_stamps + count
        if total_stamps < 0:
            total_stamps = 0

        free_coffee_awarded = False
        new_rewards = current_rewards
        if total_stamps >= 6:
            new_rewards += (total_stamps // 6)
            new_stamps = total_stamps % 6
            free_coffee_awarded = True
        else:
            new_stamps = total_stamps

        url = f"{self.base_url}/rest/v1/loyalty_cards?telegram_id=eq.{telegram_id}"
        payload = {
            "stamps": new_stamps,
            "free_coffees_earned": new_rewards
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.patch(url, headers=self._headers(), json=payload) as resp:
                    if resp.status in (200, 204):
                        updated = await resp.json()
                        updated_card = updated[0] if updated else payload
                        return new_stamps, free_coffee_awarded, updated_card
                    else:
                        err = await resp.text()
                        logger.error(f"Failed to update stamps: {resp.status} - {err}")
        except Exception as e:
            logger.error(f"Error modifying stamps for {telegram_id}: {e}")

        return new_stamps, free_coffee_awarded, None

    async def create_table_reservation(
        self,
        telegram_id: int,
        name: str,
        day: str,
        time: str,
        guests: str | int,
        table_id: Optional[str] = None,
        phone: Optional[str] = None
    ) -> Tuple[str, Dict[str, Any]]:
        """
        Creates a reservation in the Supabase 'orders' table with status='open'.
        Returns: (booking_code, order_dict)
        """
        random_code = random.randint(1000, 9999)
        booking_code = f"GC-{random_code}"
        order_id = str(uuid.uuid4())

        day_text = "Bugun" if day == "bugun" else ("Ertaga" if day == "ertaga" else "Indinga")
        phone_text = f" | Tel: {phone}" if phone else ""
        note = (
            f"Telegram Stol Bron #{booking_code} | "
            f"Mehmon: {name}{phone_text} | "
            f"Vaqt: {day_text} {time} | "
            f"Mehmonlar: {guests} kishi | "
            f"TG_ID: {telegram_id}"
        )

        payload = {
            "id": order_id,
            "employee_id": DEFAULT_EMPLOYEE_ID,
            "branch_id": DEFAULT_COFFEE_BRANCH_ID,
            "status": "open",
            "payment_method": "cash",
            "discount": 0.0,
            "order_number": f"#{booking_code}",
            "order_type": "takeaway",
            "note": note,
            "table_id": table_id
        }

        url = f"{self.base_url}/rest/v1/orders"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, headers=self._headers(), json=payload) as resp:
                    if resp.status in (200, 201):
                        data = await resp.json()
                        logger.info(f"Reservation order created in Supabase: {booking_code}")
                        return booking_code, (data[0] if data else payload)
                    else:
                        err = await resp.text()
                        logger.warning(f"Supabase orders insert returned {resp.status}: {err}")
        except Exception as e:
            logger.error(f"Failed to insert reservation into Supabase orders: {e}")

        # Return booking code even if DB has temporary glitch
        return booking_code, payload

    async def get_user_reservations(self, telegram_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """Fetches recent reservations for a user."""
        url = f"{self.base_url}/rest/v1/orders?note=like.*TG_ID: {telegram_id}*&order=created_at.desc&limit={limit}"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self._headers()) as resp:
                    if resp.status == 200:
                        return await resp.json()
        except Exception as e:
            logger.error(f"Error fetching user reservations: {e}")
        return []

    async def get_branches(self) -> List[Dict[str, Any]]:
        """Fetches active branches."""
        url = f"{self.base_url}/rest/v1/branches?select=id,name"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self._headers()) as resp:
                    if resp.status == 200:
                        return await resp.json()
        except Exception as e:
            logger.error(f"Error fetching branches: {e}")
        return []

    async def get_tables(self, branch_id: str = DEFAULT_COFFEE_BRANCH_ID) -> List[Dict[str, Any]]:
        """Fetches available tables for a branch."""
        url = f"{self.base_url}/rest/v1/tables?branch_id=eq.{branch_id}&is_active=eq.true&select=id,name,status"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self._headers()) as resp:
                    if resp.status == 200:
                        return await resp.json()
        except Exception as e:
            logger.error(f"Error fetching tables: {e}")
        return []

supabase_service = SupabaseService()

