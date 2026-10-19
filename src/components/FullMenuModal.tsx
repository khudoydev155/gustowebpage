import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Search, Coffee, Utensils, Heart } from 'lucide-react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/coffeeData';
import { useLanguage } from '../i18n';
import { useFavorites } from '../utils/useFavorites';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserveTable: () => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onReserveTable,
}) => {
  const { language, t, localize } = useLanguage();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset filters when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Filter items based on search and category
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (selectedCategory === 'favorites') {
      const favItems = MENU_ITEMS.filter((item) => {
        if (!isFavorite(item.id)) return false;
        if (!query) return true;

        const name = (localize(item.name) || '').toLowerCase();
        const desc = (localize(item.description) || '').toLowerCase();
        const origin = (localize(item.originOrStyle) || '').toLowerCase();
        return name.includes(query) || desc.includes(query) || origin.includes(query);
      });

      if (favItems.length === 0) return [];

      return [
        {
          id: 'favorites' as any,
          name: {
            uz: 'Sevimli taom va ichimliklar',
            ru: 'Избранные блюда и напитки',
            en: 'Favorite Items & Beverages',
          },
          shortLabel: {
            uz: 'Sevimlilar',
            ru: 'Избранное',
            en: 'Favorites',
          },
          items: favItems,
        },
      ];
    }

    return MENU_CATEGORIES.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }

      const items = MENU_ITEMS.filter((item) => {
        if (item.category !== cat.id) return false;
        if (!query) return true;

        const name = (localize(item.name) || '').toLowerCase();
        const desc = (localize(item.description) || '').toLowerCase();
        const origin = (localize(item.originOrStyle) || '').toLowerCase();
        return name.includes(query) || desc.includes(query) || origin.includes(query);
      });

      if (items.length === 0) return null;

      return {
        ...cat,
        items,
      };
    }).filter(Boolean);
  }, [searchQuery, selectedCategory, localize, isFavorite]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="full-menu-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        >
          {/* Backdrop with fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0C0A08]/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative bg-[#110E0B] border border-[#2A231C] max-w-5xl w-full rounded-sm text-[#F5F1EA] shadow-[0_24px_70px_rgba(0,0,0,0.85)] z-10 max-h-[92dvh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-8 border-b border-[#241E18] shrink-0 bg-[#14100C]/90">
              <div className="flex items-start justify-between gap-3 mb-3.5 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#C59853]/60 shadow-[0_0_14px_rgba(197,160,89,0.2)] bg-[#0C0A08] shrink-0">
                    <img src="/logo-mark.svg" alt="Gusto Brand Medallion" className="w-full h-full object-contain" width="48" height="48" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="w-4 h-[1px] bg-[#C59853]" />
                      <span className="text-[10px] uppercase tracking-[0.3em] text-[#C59853] font-sans font-medium">
                        {t('menuModal.badge', 'Gusto Coffee • Menyu')}
                      </span>
                    </div>
                    <h2 className="font-serif text-lg sm:text-3xl text-[#FCFAF7] font-normal">
                      {t('menuModal.title', "To'liq qahvaxona menyusi")}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    aria-label={t('menuModal.printBtn', 'Chop etish')}
                    className="hidden sm:flex items-center gap-1.5 text-xs text-[#D5C9B3]/80 hover:text-[#FCFAF7] px-3.5 py-2 border border-[#2A231C] rounded-full hover:border-[#C59853]/60 transition-colors min-h-[40px]"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#C59853]" />
                    <span>{t('menuModal.printBtn', 'Chop etish')}</span>
                  </button>

                  <button
                    onClick={onClose}
                    id="close-full-menu-modal-btn"
                    aria-label={t('menuModal.closeAria', 'Menyuni yopish')}
                    className="text-[#D5C9B3]/80 hover:text-[#FCFAF7] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[#2A231C] hover:border-[#C59853] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Search Bar and Category Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#D5C9B3]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      'menuModal.searchPlaceholder',
                      "Taom yoki ichimlik qidiring..."
                    )}
                    className="w-full min-h-[42px] pl-10 pr-9 py-2 bg-[#1A1410] border border-[#2A231C] rounded-full text-xs text-[#FCFAF7] placeholder:text-[#D5C9B3]/40 focus:outline-none focus:border-[#C59853] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[32px] min-h-[32px] flex items-center justify-center text-xs text-[#D5C9B3]/50 hover:text-[#FCFAF7]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[11px] whitespace-nowrap uppercase tracking-wider transition-colors flex items-center justify-center ${
                      selectedCategory === 'all'
                        ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold'
                        : 'bg-[#18130E] text-[#D5C9B3]/70 hover:text-[#FCFAF7] border border-[#241E18]'
                    }`}
                  >
                    {t('menu.allCategories', 'Barchasi')}
                  </button>

                  <button
                    onClick={() => setSelectedCategory('favorites')}
                    className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[11px] whitespace-nowrap uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                      selectedCategory === 'favorites'
                        ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold'
                        : 'bg-[#18130E] text-[#D5C9B3]/70 hover:text-[#FCFAF7] border border-[#241E18]'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${favorites.length > 0 ? 'text-[#DDB475] fill-[#DDB475]' : ''}`} />
                    <span>{t('common.favorites', 'Sevimlilar')}</span>
                    {favorites.length > 0 && (
                      <span className="text-[10px] px-1.5 rounded-full bg-[#C59853]/20 text-[#DDB475]">
                        {favorites.length}
                      </span>
                    )}
                  </button>

                  {MENU_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[11px] whitespace-nowrap uppercase tracking-wider transition-colors flex items-center justify-center ${
                        selectedCategory === cat.id
                          ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold'
                          : 'bg-[#18130E] text-[#D5C9B3]/70 hover:text-[#FCFAF7] border border-[#241E18]'
                      }`}
                    >
                      {localize(cat.shortLabel)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Items Content Area (Scrollable) */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-8 sm:space-y-10 flex-1 scroll-smooth">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 sm:py-16">
                  {selectedCategory === 'favorites' ? (
                    <>
                      <Heart className="w-10 h-10 text-[#C59853]/40 mx-auto mb-3" />
                      <p className="text-sm text-[#D5C9B3]/70 font-light">
                        {t('common.noFavorites', "Hozircha sevimli taomlar yo'q")}
                      </p>
                    </>
                  ) : (
                    <>
                      <Coffee className="w-10 h-10 text-[#C59853]/40 mx-auto mb-3" />
                      <p className="text-sm text-[#D5C9B3]/70 font-light">
                        {t(
                          'menuModal.noResults',
                          "Kechirasiz, so'rovingiz bo'yicha hech qanday taom topilmadi."
                        )}
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 text-xs text-[#DDB475] underline hover:text-[#FCFAF7] min-h-[44px] inline-flex items-center"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              ) : (
                filteredCategories.map((cat) => {
                  if (!cat) return null;
                  const secondaryTitle =
                    language === 'uz' ? cat.name.ru : language === 'ru' ? cat.name.uz : cat.name.uz;

                  return (
                    <div key={cat.id} className="scroll-mt-6">
                      <div className="border-b border-[#241E18] pb-2 mb-4 sm:mb-5 flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#C59853]" />
                          <h3 className="font-serif text-lg sm:text-2xl text-[#DDB475] font-normal">
                            {localize(cat.name)}
                          </h3>
                        </div>
                        {secondaryTitle && (
                          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#D5C9B3]/50 font-sans">
                            {secondaryTitle}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {cat.items.map((item) => {
                          const notes =
                            item.tastingNotes?.[language] ||
                            item.tastingNotes?.uz ||
                            item.tastingNotes?.en ||
                            [];

                          return (
                            <div
                              key={item.id}
                              className="p-3.5 sm:p-4 rounded-sm bg-[#16120E] border border-[#241E18] hover:border-[#C59853]/40 transition-colors flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-baseline justify-between gap-2 mb-1">
                                  <h4 className="font-serif text-sm sm:text-base text-[#FCFAF7] font-normal">
                                    {localize(item.name)}
                                  </h4>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(item.id);
                                      }}
                                      aria-label={
                                        isFavorite(item.id)
                                          ? t('common.removeFromFavorites', "Sevimlilardan o'chirish")
                                          : t('common.addToFavorites', "Sevimlilarga qo'shish")
                                      }
                                      title={
                                        isFavorite(item.id)
                                          ? t('common.removeFromFavorites', "Sevimlilardan o'chirish")
                                          : t('common.addToFavorites', "Sevimlilarga qo'shish")
                                      }
                                      className="min-w-[28px] min-h-[28px] flex items-center justify-center rounded-full text-[#D5C9B3]/40 hover:text-[#DDB475] transition-colors focus:outline-none"
                                    >
                                      <Heart
                                        className={`w-3.5 h-3.5 ${
                                          isFavorite(item.id)
                                            ? 'text-[#DDB475] fill-[#DDB475]'
                                            : 'text-[#D5C9B3]/40'
                                        }`}
                                      />
                                    </button>
                                    <span className="font-serif text-xs sm:text-sm text-[#DDB475] font-medium">
                                      {item.price}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-[11px] text-[#D5C9B3]/75 font-light leading-relaxed mb-2 line-clamp-2">
                                  {localize(item.description)}
                                </p>
                              </div>

                              {notes.length > 0 && (
                                <div className="flex flex-wrap gap-1 pt-2 border-t border-[#1F1914] mt-1">
                                  {notes.slice(0, 3).map((note) => (
                                    <span
                                      key={note}
                                      className="text-[9px] px-1.5 py-0.2 rounded-sm bg-[#100D0A] text-[#D5C9B3]/70 border border-[#241E18]"
                                    >
                                      {note}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-[#241E18] bg-[#14100C]/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-xs text-[#D5C9B3]/60 font-light text-center sm:text-left">
                Xonqa tumani, Xalqlar do'stligi ko'chasi, 3 • Har kuni 8:00 AM — 2:00 AM • Tel: +998 93 287 54 84
              </p>
              <button
                onClick={() => {
                  onClose();
                  onReserveTable();
                }}
                id="modal-footer-reserve-btn"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#DDB475] transition-colors flex items-center justify-center shrink-0"
              >
                {t('menuModal.planVisitBtn', 'Tashrifni rejalashtirish')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
