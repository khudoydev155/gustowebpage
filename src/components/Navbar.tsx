import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleAmbientAudio } from '../utils/ambientSound';
import { useLanguage, Language } from '../i18n';

interface NavbarProps {
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleAudioToggle = () => {
    toggleAmbientAudio((playing) => setAudioActive(playing));
  };

  const navLinks = [
    { id: 'coffee', label: t('nav.coffee', 'Coffee'), href: '#signature' },
    { id: 'story', label: t('nav.story', 'Our Story'), href: '#story' },
    { id: 'craft', label: t('nav.craft', 'The Craft'), href: '#craft' },
    { id: 'atmosphere', label: t('nav.atmosphere', 'Atmosphere'), href: '#atmosphere' },
    { id: 'menu', label: t('nav.menu', 'Menu'), href: '#menu' },
    { id: 'locations', label: t('nav.locations', 'Location'), href: '#locations' },
  ];

  const languages: { code: Language; label: string; aria: string }[] = [
    { code: 'uz', label: 'UZ', aria: "O'zbekcha" },
    { code: 'ru', label: 'RU', aria: 'Русский' },
    { code: 'en', label: 'EN', aria: 'English' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0C0A08]/92 backdrop-blur-md py-3.5 border-b border-[#29231D]/80 shadow-[0_10px_30px_rgba(0,0,0,0.4)]'
          : 'bg-gradient-to-b from-[#0C0A08]/90 via-[#0C0A08]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Identity: Official Logo Medallion + Wordmark */}
        <a
          href="#"
          id="brand-logo"
          aria-label="Gusto Coffee Home"
          className="group flex items-center gap-2.5 sm:gap-3.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C59853]"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-[#C5A059]/40 group-hover:border-[#C5A059] transition-all duration-300 shadow-[0_0_12px_rgba(197,160,89,0.15)] group-hover:shadow-[0_0_18px_rgba(197,160,89,0.3)] bg-[#0C0A08]">
            <img
              src="/logo-mark.svg"
              alt="Gusto Coffee Brand Logo"
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              width="40"
              height="40"
              loading="eager"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-serif text-lg sm:text-2xl tracking-[0.16em] text-[#F5F1EA] font-semibold transition-colors duration-300 group-hover:text-[#DDB475] leading-none">
              GUSTO
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.32em] text-[#D5C9B3]/80 font-sans uppercase font-medium mt-0.5">
              Coffee Bar • Xonqa
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label={t('nav.ariaMain', 'Asosiy navigatsiya')} className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={`nav-link-${link.id}`}
              className="text-xs uppercase tracking-[0.2em] text-[#D5C9B3]/90 hover:text-[#F5F1EA] transition-colors duration-200 py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C59853] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Language Switcher + Audio Ambience + Visit Button */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Desktop Language Switcher: UZ | RU | EN */}
          <div
            id="desktop-language-switcher"
            role="group"
            aria-label={t('nav.ariaLanguage', 'Tilni tanlash')}
            className="flex items-center text-xs font-sans tracking-wider border border-[#29231D] bg-[#14110E]/60 rounded-full p-1"
          >
            {languages.map((item, idx) => (
              <React.Fragment key={item.code}>
                {idx > 0 && <span className="text-[#29231D] select-none text-[10px] px-0.5">|</span>}
                <button
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  aria-label={`Switch language to ${item.aria}`}
                  aria-pressed={language === item.code}
                  className={`px-2.5 py-1 rounded-full text-[11px] uppercase transition-all duration-200 ${
                    language === item.code
                      ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold shadow-sm'
                      : 'text-[#D5C9B3]/70 hover:text-[#F5F1EA]'
                  }`}
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Subtle Ambient Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            id="ambient-sound-toggle"
            title={
              audioActive
                ? t('nav.atmosphereActiveTitle', 'Mute café atmosphere soundscape')
                : t('nav.atmosphereTitle', 'Play whisper-quiet café atmosphere')
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-sans tracking-wider border transition-all duration-300 ${
              audioActive
                ? 'border-[#C59853]/60 bg-[#C59853]/15 text-[#DDB475]'
                : 'border-[#29231D] text-[#D5C9B3]/70 hover:text-[#F5F1EA] hover:border-[#3E362D] bg-[#14110E]/60'
            }`}
          >
            {audioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#DDB475] animate-pulse" />
                <span>{t('nav.atmosphereLive', 'Atmosphere: Live')}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#D5C9B3]/60" />
                <span>{t('nav.atmosphereMute', 'Atmosphere')}</span>
              </>
            )}
          </button>

          {/* Visit Us CTA Button */}
          <button
            onClick={onOpenReservation}
            id="nav-visit-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.16em] bg-[#F5F1EA] text-[#0C0A08] font-medium transition-all duration-300 hover:bg-[#DDB475] hover:text-[#0C0A08] shadow-[0_2px_12px_rgba(245,241,234,0.12)] active:scale-[0.98]"
          >
            <span>{t('nav.visitUs', 'Visit Us')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile compact language buttons with min 44px touch target */}
          <div
            id="mobile-quick-language-switcher"
            role="group"
            aria-label="Language selector"
            className="flex items-center border border-[#29231D] bg-[#14110E]/70 rounded-full p-0.5 sm:hidden"
          >
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                aria-label={`Switch language to ${item.aria}`}
                aria-pressed={language === item.code}
                className={`min-h-[44px] min-w-[34px] px-1.5 flex items-center justify-center rounded-full text-[10px] uppercase font-medium transition-all ${
                  language === item.code
                    ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold'
                    : 'text-[#D5C9B3]/70 hover:text-[#F5F1EA]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleAudioToggle}
            id="mobile-ambient-toggle"
            aria-label={t('nav.ariaToggleAudio', 'Fon musiqasini yoqish/oʻchirish')}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#D5C9B3]/80 hover:text-[#F5F1EA]"
          >
            {audioActive ? (
              <Volume2 className="w-4 h-4 text-[#DDB475]" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            aria-label={t('nav.ariaToggleMenu', 'Menyuni ochish/yopish')}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-[#F5F1EA] hover:bg-[#1C1713] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[72px] h-[calc(100dvh-60px)] sm:h-[calc(100dvh-72px)] bg-[#0C0A08]/98 backdrop-blur-xl border-t border-[#29231D] px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-between overflow-y-auto"
        >
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#241E18]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A059]/50 bg-[#0C0A08] shrink-0">
                  <img src="/logo-mark.svg" alt="Gusto Logo" className="w-full h-full object-contain" width="32" height="32" />
                </div>
                <div>
                  <span className="font-serif text-sm tracking-[0.14em] text-[#FCFAF7] font-semibold block leading-none">
                    GUSTO COFFEE
                  </span>
                  <span className="text-[8px] tracking-[0.2em] text-[#C5A059] uppercase font-sans">
                    Coffee Bar • Xonqa
                  </span>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C59853]">
                {t('nav.mobileNav', 'Navigatsiya')}
              </span>
            </div>

            {/* Mobile Drawer Dedicated 44px Touch Target Language Switcher */}
            <div
              id="mobile-drawer-language-switcher"
              role="group"
              aria-label={t('nav.ariaLanguage', 'Tilni tanlash')}
              className="flex items-center gap-2 p-1 bg-[#14110E] border border-[#29231D] rounded-full"
            >
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  aria-label={`Switch language to ${item.aria}`}
                  aria-pressed={language === item.code}
                  className={`flex-1 min-h-[44px] flex items-center justify-center rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                    language === item.code
                      ? 'bg-[#F5F1EA] text-[#0C0A08] font-semibold shadow-sm'
                      : 'text-[#D5C9B3]/70 hover:text-[#F5F1EA]'
                  }`}
                >
                  {item.code === 'uz' ? "O'zbek" : item.code === 'ru' ? 'Русский' : 'English'}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 mt-1 sm:mt-2">
              {navLinks.map((link, idx) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-xl sm:text-2xl md:text-3xl text-[#F5F1EA] hover:text-[#DDB475] transition-colors py-1 flex items-center justify-between border-b border-[#1C1713]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs sm:text-sm font-sans text-[#D5C9B3]/40 tracking-wider">0{idx + 1}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#29231D] flex flex-col gap-3 sm:gap-4 mt-6">
            <div className="flex items-center justify-between text-xs text-[#D5C9B3]/80">
              <span>{t('common.district', 'Xonqa tumani')}</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {t('nav.openDaily', 'Har kuni 8:00 — 2:00')}
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              id="mobile-drawer-visit-btn"
              className="w-full min-h-[44px] py-3.5 rounded-full text-center text-xs font-sans uppercase tracking-[0.2em] bg-[#F5F1EA] text-[#0C0A08] font-semibold hover:bg-[#DDB475] transition-colors"
            >
              {t('nav.visitUs', 'Visit Us')}
            </button>
            <p className="text-[11px] text-center text-[#D5C9B3]/70">
              {t('hero.locationValue', "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3")} •{' '}
              <a href="tel:+998932875484" className="hover:text-[#DDB475]">
                +998 93 287 54 84
              </a>
            </p>
            <div className="flex items-center justify-center gap-3 text-[11px] text-[#D5C9B3]/70">
              <a
                href="https://t.me/gustobronbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DDB475] hover:underline font-medium flex items-center gap-1"
              >
                <span>TG: @gustobronbot</span>
              </a>
              <span>•</span>
              <a
                href="https://maps.app.goo.gl/9XygkJ35KZSzZzg88"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DDB475]"
              >
                Google Maps
              </a>
              <span>•</span>
              <a
                href="https://yandex.com/maps/org/gusto_coffee/24379307243?si=r00h1pdwv6vrdvjmgc3dfejjgg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#DDB475]"
              >
                Yandex
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
