import React from 'react';
import { ArrowDown, Compass, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n';

interface HeroProps {
  onExploreClick: () => void;
  onFindCafeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFindCafeClick }) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#0C0A08] pt-24 sm:pt-36 pb-8 sm:pb-12"
    >
      {/* Cinematic Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=2000&auto=format&fit=crop"
          alt="Single origin espresso extraction in ceramic cup on dark warm timber"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[4000ms] ease-out will-change-transform brightness-[0.58] contrast-[1.12]"
          loading="eager"
        />
        {/* Editorial Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/65 to-[#0C0A08]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A08]/95 via-[#0C0A08]/65 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(12,10,8,0.75),transparent_75%)] pointer-events-none" />
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full my-auto">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 h-[1px] bg-[#C59853]"></span>
            <p className="text-xs uppercase tracking-[0.35em] text-[#DDB475] font-medium font-sans drop-shadow-sm">
              {t('hero.eyebrow', 'GUSTO COFFEE • XONQA')}
            </p>
          </div>

          {/* Master Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FCFAF7] leading-[1.02] sm:leading-[0.98] font-normal mb-6 sm:mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]">
            {t('hero.headlineLine1', 'Qahva,')} <br />
            <span className="italic font-light text-[#EAE3D5]">
              {t('hero.headlineLine2', "o'ziga xos xarakter bilan.")}
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-lg lg:text-xl text-[#EAE3D5] font-light leading-relaxed max-w-xl mb-8 sm:mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
            {t(
              'hero.subtitle',
              "Qahva shoshilmaslik uchun yaratilgan. Xonqada mehr va yuksak e'tibor bilan tayyorlangan shinam qahvaxona muhiti."
            )}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
            <button
              onClick={onExploreClick}
              id="hero-primary-cta"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#DDB475] hover:shadow-[0_8px_24px_rgba(221,180,117,0.25)] active:scale-[0.98] flex items-center justify-center gap-2.5 min-h-[46px]"
            >
              <Compass className="w-4 h-4 text-[#0C0A08]" />
              <span>{t('hero.exploreBtn', 'Gusto olami')}</span>
            </button>

            <button
              onClick={onFindCafeClick}
              id="hero-secondary-cta"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#D5C9B3]/40 text-[#F5F1EA] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#DDB475] hover:bg-[#1C1713]/60 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5 min-h-[46px]"
            >
              <MapPin className="w-4 h-4 text-[#C59853]" />
              <span>{t('hero.findCafeBtn', 'Bizning manzil')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Bottom Anchor / Editorial Status Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pt-6 sm:pt-10">
        <div className="pt-4 sm:pt-6 border-t border-[#29231D]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#D5C9B3]/70 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 w-full sm:w-auto">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block mb-0.5">
                {t('hero.currentLotLabel', 'Ish tartibi')}
              </span>
              <p className="text-[#F5F1EA] font-serif text-sm sm:text-base">
                {t('hero.hoursValue', 'Har kuni 8:00 AM — 2:00 AM')}
              </p>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-[#29231D]" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block mb-0.5">
                {t('hero.locationLabel', 'Manzil')}
              </span>
              <p className="text-[#F5F1EA] font-serif text-sm sm:text-base">
                {t('hero.locationValue', "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3")}
              </p>
            </div>
          </div>

          {/* Smooth Scroll Cue */}
          <button
            onClick={onExploreClick}
            id="hero-scroll-cue"
            className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-2.5 text-[#D5C9B3]/60 hover:text-[#DDB475] transition-colors py-1 group pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1C1713]"
          >
            <span className="text-[11px] uppercase tracking-[0.2em]">
              {t('hero.scrollCue', 'Scroll to slow down')}
            </span>
            <ArrowDown className="w-3.5 h-3.5 transform group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
