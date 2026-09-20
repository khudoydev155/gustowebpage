import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { useLanguage } from '../i18n';

interface CTASectionProps {
  onFindCafe: () => void;
  onExploreMenu: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onFindCafe, onExploreMenu }) => {
  const { t } = useLanguage();

  return (
    <section
      id="cta-section"
      className="relative py-20 sm:py-44 bg-[#0A0908] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=85&w=2000&auto=format&fit=crop"
          alt="Warm tactile coffee atmosphere"
          className="w-full h-full object-cover object-center brightness-[0.25] contrast-[1.15]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/70 to-[#0A0908]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
          <span className="w-6 sm:w-8 h-[1px] bg-[#C59853]" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#DDB475] font-medium font-sans">
            {t('cta.eyebrow', 'GUSTO COFFEE • TAKLIF')}
          </p>
          <span className="w-6 sm:w-8 h-[1px] bg-[#C59853]" />
        </div>

        <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-[#FCFAF7] font-normal leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-8">
          {t('cta.headline', 'Qahva uchun keling.')} <br />
          <span className="italic text-[#DDB475]">
            {t('cta.headlineHighlight', 'Tuyg‘u uchun qoling.')}
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-[#D5C9B3]/85 font-light leading-relaxed max-w-xl mx-auto mb-8 sm:mb-12">
          {t(
            'cta.description',
            "Haqiqiy qahva taftini his eting — shoshilmasdan, mehr bilan tayyorlangan ichimliklar. Bizni Xonqa tumani, Xalqlar do'stligi ko'chasi, 3-uyda ziyorat qiling."
          )}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-6 max-w-sm sm:max-w-none mx-auto">
          <button
            onClick={onFindCafe}
            id="cta-find-cafe-btn"
            className="min-h-[48px] px-6 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#DDB475] transition-all duration-300 shadow-[0_8px_24px_rgba(245,241,234,0.12)] active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <MapPin className="w-4 h-4 text-[#0C0A08] shrink-0" />
            <span>{t('cta.findCafeBtn', 'Manzilni ko‘rish')}</span>
          </button>

          <button
            onClick={onExploreMenu}
            id="cta-explore-menu-btn"
            className="min-h-[48px] px-6 sm:px-9 py-3.5 sm:py-4 rounded-full border border-[#D5C9B3]/40 text-[#F5F1EA] text-xs uppercase tracking-[0.2em] font-medium hover:border-[#DDB475] hover:bg-[#1C1713]/70 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2.5"
          >
            <Compass className="w-4 h-4 text-[#C59853] shrink-0" />
            <span>{t('cta.exploreMenuBtn', 'Menyuni ko‘rish')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
