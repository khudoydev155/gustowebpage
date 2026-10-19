import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'gusto_favorites_v1';
const EVENT_NAME = 'gusto_favorites_changed';

function getStoredFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites);

  useEffect(() => {
    const handleUpdate = () => {
      setFavorites(getStoredFavorites());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    try {
      const current = getStoredFavorites();
      const exists = current.includes(id);
      const next = exists ? current.filter((x) => x !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setFavorites(next);
      window.dispatchEvent(new CustomEvent(EVENT_NAME));
    } catch (err) {
      console.warn('Could not update favorites:', err);
    }
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    count: favorites.length,
  };
}
