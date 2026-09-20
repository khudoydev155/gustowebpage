import React, { useState, useRef, useEffect } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/coffeeData';
import { MenuItem } from '../types';
import {
  FileText,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Droplets,
  Flame,
  Utensils,
  Sparkles,
  Maximize2,
  MapPin,
} from 'lucide-react';
import { useLanguage } from '../i18n';

interface MenuPreviewProps {
  onOpenFullCarte: () => void;
}

const ORDERED_CATEGORY_IDS = [
  'issiq-kofe',
  'muzli-kofe',
  'molochniy',
  'moxito',
  'mevali-choy',
  'oddiy-choy',
  'ne-kofe',
  'sharbatlar',
  'hot-dog',
  'qoshimchalar',
];

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'issiq-kofe': Coffee,
  'muzli-kofe': Droplets,
  'molochniy': Sparkles,
  'moxito': Sparkles,
  'mevali-choy': Flame,
  'oddiy-choy': Coffee,
  'ne-kofe': Flame,
  'sharbatlar': Droplets,
  'hot-dog': Utensils,
  'qoshimchalar': Sparkles,
};

const CATEGORY_IMAGES: Record<string, string> = {
  'issiq-kofe': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  'muzli-kofe': 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
  'molochniy': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
  'moxito': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
  'mevali-choy': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
  'oddiy-choy': 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
  'ne-kofe': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=800&auto=format&fit=crop',
  'sharbatlar': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
  'hot-dog': 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?q=80&w=800&auto=format&fit=crop',
  'qoshimchalar': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop',
};

export const MenuPreview: React.FC<MenuPreviewProps> = ({ onOpenFullCarte }) => {
  const { language, t, localize } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Ordered categories list with localized meta
  const orderedCategories = ORDERED_CATEGORY_IDS.map((catId) => {
    const meta = MENU_CATEGORIES.find((c) => c.id === catId);
    const items = MENU_ITEMS.filter((item) => item.category === catId);
    return {
      id: catId,
      name: meta ? localize(meta.name) : catId,
      shortLabel: meta ? localize(meta.shortLabel) : catId,
      items,
      count: items.length,
      image: CATEGORY_IMAGES[catId] || CATEGORY_IMAGES['issiq-kofe'],
    };
  });

  const updateScrollButtons = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active category card based on scroll position
    const cards = carouselRef.current.querySelectorAll<HTMLElement>('[id^="showroom-deck-"]');
    if (cards.length > 0) {
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveCategoryIndex(Math.min(closestIdx, orderedCategories.length - 1));
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('scroll', updateScrollButtons, { passive: true });
    updateScrollButtons();

    return () => {
      carousel.removeEventListener('scroll', updateScrollButtons);
    };
  }, [orderedCategories.length]);

  // Keep active category tab in view within the pill bar
  useEffect(() => {
    const activeCatId = orderedCategories[activeCategoryIndex]?.id;
    if (activeCatId) {
      const activeTabEl = document.getElementById(`showroom-cat-tab-${activeCatId}`);
      if (activeTabEl) {
        activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategoryIndex, orderedCategories]);

  // Scroll carousel to category
  const scrollToCategory = (categoryIndex: number) => {
    if (!carouselRef.current) return;
    const clamped = Math.max(0, Math.min(categoryIndex, orderedCategories.length - 1));
    const targetCard = document.getElementById(`showroom-deck-${orderedCategories[clamped].id}`);
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
      setActiveCategoryIndex(clamped);
    }
  };

  const handlePrev = () => {
    if (activeCategoryIndex > 0) {
      scrollToCategory(activeCategoryIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeCategoryIndex < orderedCategories.length - 1) {
      scrollToCategory(activeCategoryIndex + 1);
    } else {
      // Scroll to outro card
      const outroCard = document.getElementById('showroom-deck-outro');
      if (outroCard) {
        outroCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  const skipToLocations = () => {
    const el = document.getElementById('locations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNotes = (item: MenuItem): string[] => {
    if (!item.tastingNotes) return [];
    return item.tastingNotes[language] || item.tastingNotes.uz || item.tastingNotes.en || [];
  };

  const currentCategory = orderedCategories[activeCategoryIndex] || orderedCategories[0];

  return (
    <section
      id="menu"
      className="relative py-20 sm:py-32 bg-[#0C0A08] text-[#F5F1EA] border-t border-[#1C1713] overflow-hidden"
    >
      {/* Subtle Warm Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(197,152,83,0.06),transparent_70%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-5 h-[1px] bg-[#C59853]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
                {t('menu.eyebrow', 'Bizning menyu')}
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-tight mb-3">
              {t('menu.headline', 'Mavsumiy')}{' '}
              <span className="italic text-[#DDB475]">
                {t('menu.headlineHighlight', 'Menyu.')}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D5C9B3]/85 font-light max-w-xl leading-relaxed">
              {t(
                'menu.diveHintSub',
                "10 ta toifa • 70+ xil maxsus ta'm. Klassik espresso, salqin kokteyllar va nozik pishiriqlar."
              )}
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenFullCarte}
              id="menu-open-full-carte-btn"
              aria-label={t('menu.fullMenuBtn', "To'liq menyu")}
              className="min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#DDB475] transition-all flex items-center gap-2 shadow-[0_4px_16px_rgba(245,241,234,0.12)] active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-[#C59853]" />
              <span>{t('menu.fullMenuBtn', "To'liq menyuni ko'rish")}</span>
              <Maximize2 className="w-3.5 h-3.5 hidden sm:inline text-[#0C0A08]/70" />
            </button>

            <button
              onClick={skipToLocations}
              id="menu-quick-locations-btn"
              className="min-h-[44px] px-4 py-2.5 rounded-full border border-[#2E241B] hover:border-[#C59853]/60 text-[#D5C9B3] hover:text-[#FCFAF7] text-xs uppercase tracking-[0.14em] font-medium transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C59853]" />
              <span>{t('locations.titlePart1', 'Gusto')} {t('locations.titleHighlight', 'manzili')}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scrollable Tabs) */}
        <div className="mb-6 sm:mb-8 border-b border-[#241E18] pb-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-serif text-sm sm:text-base text-[#E6C387] font-medium shrink-0">
                {String(activeCategoryIndex + 1).padStart(2, '0')} /{' '}
                {String(orderedCategories.length).padStart(2, '0')}
              </span>
              <span className="w-3 h-[1px] bg-[#C59853]/60 hidden sm:block shrink-0" />
              <h3 className="font-serif text-base sm:text-xl text-[#FCFAF7] font-normal truncate">
                {currentCategory?.name}
              </h3>
              <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#18130E] border border-[#2E241B] text-[#DDB475] hidden sm:inline-block shrink-0">
                {currentCategory?.count} {t('menu.itemsCountBadge', "ta ta'm")}
              </span>
            </div>

            {/* Desktop Navigation Chevrons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={!canScrollLeft}
                aria-label="Oldingi toifa"
                className="min-w-[36px] min-h-[36px] rounded-full border border-[#2E241B] text-[#D5C9B3] hover:text-[#FCFAF7] hover:border-[#C59853] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={!canScrollRight}
                aria-label="Keyingi toifa"
                className="min-w-[36px] min-h-[36px] rounded-full border border-[#2E241B] text-[#D5C9B3] hover:text-[#FCFAF7] hover:border-[#C59853] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none scroll-smooth -mx-1 px-1">
            {orderedCategories.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              const IconComponent = CATEGORY_ICONS[cat.id] || Coffee;
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(idx)}
                  id={`showroom-cat-tab-${cat.id}`}
                  className={`min-h-[40px] whitespace-nowrap px-3.5 sm:px-4 py-1.5 text-xs tracking-[0.12em] uppercase rounded-full transition-all duration-200 flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold shadow-[0_2px_12px_rgba(245,241,234,0.18)]'
                      : 'text-[#D5C9B3]/80 hover:text-[#F5F1EA] hover:bg-[#1A1410] border border-[#241E18]'
                  }`}
                >
                  <IconComponent
                    className={`w-3.5 h-3.5 ${isActive ? 'text-[#0C0A08]' : 'text-[#C59853]'}`}
                  />
                  <span>{cat.shortLabel}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-[#0C0A08]/15 text-[#0C0A08]' : 'bg-[#120E0B] text-[#C59853]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Carte Carousel Showcase (Native smooth horizontal scroll, safe for vertical page scrolling) */}
        <div
          ref={carouselRef}
          className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-4 pt-1 touch-pan-x"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {orderedCategories.map((cat, catIdx) => {
            const IconComponent = CATEGORY_ICONS[cat.id] || Coffee;
            const displayItems = cat.items.slice(0, 3);

            return (
              <div
                key={cat.id}
                id={`showroom-deck-${cat.id}`}
                className="w-[85vw] max-w-[340px] sm:max-w-none sm:w-[420px] md:w-[440px] lg:w-[420px] shrink-0 snap-start rounded-sm bg-[#130F0C] border border-[#2E241B] hover:border-[#C59853]/80 transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between min-h-[460px] shadow-[0_12px_36px_rgba(0,0,0,0.6)] group"
              >
                <div>
                  {/* Category Image Banner */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden rounded-sm -mt-0.5 sm:-mt-1 mb-3 border border-[#2A2118]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover brightness-[0.90] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130F0C] via-[#130F0C]/20 to-transparent" />

                    {/* Banner Overlay Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0C0A08]/90 backdrop-blur-md border border-[#C59853]/70 flex items-center justify-center text-[#DDB475]">
                        <IconComponent className="w-3 h-3" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-sans px-2 py-0.5 rounded-full bg-[#0C0A08]/90 backdrop-blur-md text-[#FCFAF7] border border-[#2E241B]">
                        {String(catIdx + 1).padStart(2, '0')} • {cat.shortLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-1.5 right-2">
                      <span className="text-[10px] font-sans px-2 py-0.5 rounded-sm bg-[#130F0C]/95 text-[#DDB475] border border-[#2E241B]">
                        {cat.count} {t('menu.itemsCountBadge', "ta ta'm")}
                      </span>
                    </div>
                  </div>

                  {/* Card Header Title */}
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#241E18]">
                    <h4 className="font-serif text-lg sm:text-xl text-[#FCFAF7] font-normal truncate">
                      {cat.name}
                    </h4>
                  </div>

                  {/* Items List inside Category Card */}
                  <div className="space-y-3">
                    {displayItems.map((item) => {
                      const notes = getNotes(item);
                      return (
                        <div
                          key={item.id}
                          className="group/item pb-2.5 border-b border-[#1C1713] last:border-b-0"
                        >
                          <div className="flex items-baseline justify-between gap-3 mb-1">
                            <h5 className="font-serif text-sm sm:text-base text-[#FCFAF7] group-hover/item:text-[#DDB475] transition-colors font-medium truncate">
                              {localize(item.name)}
                            </h5>
                            <span className="font-serif text-xs sm:text-sm text-[#E6C387] shrink-0 font-semibold px-2 py-0.5 rounded-sm bg-[#1A140E] border border-[#2A2117]">
                              {item.price}
                            </span>
                          </div>

                          <p className="text-xs text-[#E0D5C1] font-normal line-clamp-1 leading-relaxed mb-1.5">
                            {localize(item.description)}
                          </p>

                          {notes.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {notes.slice(0, 3).map((note) => (
                                <span
                                  key={note}
                                  className="text-[10px] font-sans px-2 py-0.5 rounded-sm bg-[#1A1510] text-[#DDB475] border border-[#33271D]"
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

                {/* Bottom Action inside Category Card */}
                <div className="pt-3 mt-4 border-t border-[#241E18] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#D5C9B3]/70 font-light truncate">
                    Gusto Coffee Bar • Xonqa
                  </span>

                  <button
                    onClick={onOpenFullCarte}
                    id={`open-full-carte-from-${cat.id}`}
                    className="min-h-[36px] text-xs uppercase tracking-[0.14em] text-[#DDB475] hover:text-[#FCFAF7] transition-colors flex items-center gap-1 font-medium shrink-0 py-1"
                  >
                    <span>{t('menu.viewAllInCategory', "Barchasini ko'rish")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Outro Finale Card */}
          <div
            id="showroom-deck-outro"
            className="w-[85vw] max-w-[340px] sm:max-w-none sm:w-[420px] md:w-[440px] lg:w-[420px] shrink-0 snap-start rounded-sm bg-gradient-to-b from-[#18130E] to-[#120E0A] border-2 border-[#C59853] p-5 sm:p-7 flex flex-col justify-between min-h-[460px] shadow-[0_12px_45px_rgba(197,152,83,0.15)]"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1C1712] border border-[#C59853] flex items-center justify-center text-[#DDB475] mb-4 shadow-[0_0_20px_rgba(197,152,83,0.3)]">
                <Sparkles className="w-5 h-5 text-[#E6C387]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block mb-2 font-sans font-medium">
                Gusto Coffee Bar
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#FCFAF7] font-normal leading-snug mb-3">
                {t('menu.outroTitle', "Haqiqiy ta'm Gusto qahvaxonasida")}
              </h4>
              <p className="text-xs sm:text-sm text-[#E0D5C1] font-light leading-relaxed mb-6">
                {t(
                  'menu.outroSubtitle',
                  "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3. Har kuni soat 8:00 dan 2:00 gacha xizmatingizdamiz."
                )}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onOpenFullCarte}
                id="outro-open-full-carte-btn"
                className="w-full min-h-[44px] py-3 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#DDB475] transition-colors flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(245,241,234,0.15)] active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 text-[#C59853]" />
                <span>{t('menu.fullMenuBtn', "To'liq menyuni ochish")}</span>
              </button>

              <button
                onClick={skipToLocations}
                id="outro-scroll-to-locations-btn"
                className="w-full min-h-[44px] py-2.5 rounded-full border border-[#2E241B] text-[#D5C9B3] hover:text-[#FCFAF7] hover:border-[#DDB475] text-xs uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C59853]" />
                <span>{t('locations.titlePart1', 'Gusto')} {t('locations.titleHighlight', 'manzili')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Controls & Mobile Touch Indicator */}
        <div className="mt-6 pt-4 border-t border-[#241E18] flex items-center justify-between gap-4 text-xs text-[#D5C9B3]/70">
          {/* Progress Bar & Category Counter */}
          <div className="flex items-center gap-3 flex-1 max-w-xs sm:max-w-md">
            <span className="font-serif text-xs text-[#E6C387] shrink-0 font-medium">
              {String(activeCategoryIndex + 1).padStart(2, '0')} /{' '}
              {String(orderedCategories.length).padStart(2, '0')}
            </span>
            <div className="flex-1 h-[2px] bg-[#1E1914] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C59853] transition-all duration-300 rounded-full"
                style={{
                  width: `${((activeCategoryIndex + 1) / orderedCategories.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <span className="text-[11px] text-[#D5C9B3]/60 hidden sm:inline">
            ← Surish yoki tugmalar orqali ko‘ring →
          </span>

          {/* Mobile & Tablet Navigation Chevrons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Oldingi toifa"
              className="min-w-[36px] min-h-[36px] rounded-full border border-[#2E241B] text-[#D5C9B3] hover:text-[#FCFAF7] hover:border-[#C59853] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Keyingi toifa"
              className="min-w-[36px] min-h-[36px] rounded-full border border-[#2E241B] text-[#D5C9B3] hover:text-[#FCFAF7] hover:border-[#C59853] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
