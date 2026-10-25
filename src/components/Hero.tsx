import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Calendar, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n';

interface HeroProps {
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onExploreClick?: () => void;
  onFindCafeClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenMenu,
  onOpenReservation,
}) => {
  const { t } = useLanguage();

  return (
    <section
      id="hero-section"
      aria-labelledby="hero-main-title"
      className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#0C0A08] pt-24 sm:pt-36 pb-8 sm:pb-12"
    >
      {/* Cinematic Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=2000&auto=format&fit=crop"
          alt="Single origin espresso extraction in ceramic cup on dark warm timber"
          className="w-full h-full object-cover object-center brightness-[0.52] contrast-[1.12]"
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
          {/* Status & Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181410]/90 border border-[#C59853]/40 text-[#DDB475] text-[11px] sm:text-xs font-sans tracking-wide backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-medium">
                {t('hero.statusOpen', 'Hozir ochiq • 08:00 dan 02:00 gacha')}
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#C59853]/60" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDB475]/90 font-medium font-sans">
                {t('hero.eyebrow', 'GUSTO COFFEE • XONQA')}
              </span>
            </div>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FCFAF7] leading-[1.04] sm:leading-[0.98] font-normal mb-6 sm:mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)]"
          >
            {t('hero.headlineLine1', 'Qahva,')} <br />
            <span className="italic font-light text-[#DDB475]">
              {t('hero.headlineLine2', "o'ziga xos xarakter bilan.")}
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            className="text-sm sm:text-lg lg:text-xl text-[#EAE3D5] font-sans font-light leading-relaxed max-w-xl mb-8 sm:mb-10 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]"
          >
            {t(
              'hero.subtitle',
              "Xonqa markazida sifatli qahva donlari, 70+ xil ichimliklar va sokin, shinam suhbat muhiti."
            )}
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 max-w-md sm:max-w-none"
          >
            <motion.button
              type="button"
              onClick={onOpenMenu}
              id="hero-primary-menu-cta"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#C59853] text-[#0C0A08] text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 hover:bg-[#DDB475] hover:shadow-[0_8px_24px_rgba(197,152,83,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCFAF7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A08] flex items-center justify-center gap-2.5 min-h-[48px] cursor-pointer"
            >
              <Utensils className="w-4 h-4 text-[#0C0A08]" aria-hidden="true" />
              <span>{t('hero.menuBtn', 'Menyu va narxlar')}</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={onOpenReservation}
              id="hero-secondary-reserve-cta"
              whileHover={{ scale: 1.025, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#181410]/90 border border-[#C59853]/50 text-[#F5F1EA] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#241E18] hover:border-[#DDB475] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0A08] flex items-center justify-center gap-2.5 min-h-[48px] backdrop-blur-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#C59853]" aria-hidden="true" />
              <span>{t('hero.reserveBtn', 'Stol band qilish')}</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Anchor / Micro-Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full pt-6 sm:pt-10"
      >
        <div className="pt-4 sm:pt-6 border-t border-[#29231D]/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Manzil (Xarita bilan bitta bosish) */}
            <motion.a
              href="https://maps.app.goo.gl/9XygkJ35KZSzZzg88"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Xonqa manzili, Google xaritalarida ochish"
              whileHover={{ y: -3, borderColor: 'rgba(197, 152, 83, 0.6)' }}
              transition={{ duration: 0.2 }}
              className="group p-3.5 sm:p-4 rounded-xl bg-[#14110E]/80 hover:bg-[#1C1713] border border-[#29231D] transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59853]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1C1713] flex items-center justify-center border border-[#29231D] text-[#C59853] shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D5C9B3]/70 font-sans block">
                    {t('hero.locationLabel', 'Manzil')}
                  </span>
                  <span className="text-xs sm:text-sm text-[#FCFAF7] font-medium block group-hover:text-[#DDB475] transition-colors truncate max-w-[220px] sm:max-w-none">
                    {t('hero.locationValue', "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3")}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D5C9B3]/50 group-hover:text-[#DDB475] group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
            </motion.a>

            {/* Ish tartibi */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 sm:p-4 rounded-xl bg-[#14110E]/80 border border-[#29231D] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1C1713] flex items-center justify-center border border-[#29231D] text-[#C59853] shrink-0">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#D5C9B3]/70 font-sans block">
                  {t('hero.currentLotLabel', 'Ish tartibi')}
                </span>
                <span className="text-xs sm:text-sm text-[#FCFAF7] font-medium block">
                  {t('hero.hoursValue', 'Har kuni 8:00 AM — 2:00 AM')}
                </span>
              </div>
            </motion.div>

            {/* Telefon aloqasi */}
            <motion.a
              href="tel:+998932875484"
              aria-label="Gusto Coffee telefon raqamiga qo'ng'iroq qilish: +998 93 287 54 84"
              whileHover={{ y: -3, borderColor: 'rgba(197, 152, 83, 0.6)' }}
              transition={{ duration: 0.2 }}
              className="group p-3.5 sm:p-4 rounded-xl bg-[#14110E]/80 hover:bg-[#1C1713] border border-[#29231D] transition-colors flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C59853]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1C1713] flex items-center justify-center border border-[#29231D] text-[#C59853] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D5C9B3]/70 font-sans block">
                    {t('hero.phoneLabel', 'Telefon aloqasi')}
                  </span>
                  <span className="text-xs sm:text-sm text-[#FCFAF7] font-medium block group-hover:text-[#DDB475] transition-colors">
                    +998 (93) 287-54-84
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D5C9B3]/50 group-hover:text-[#DDB475] group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
