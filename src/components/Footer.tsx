import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../i18n';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { t } = useLanguage();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      id="brand-footer"
      className="bg-[#080706] text-[#F5F1EA] pt-10 sm:pt-20 pb-8 sm:pb-12 border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 pb-8 sm:pb-16 border-b border-[#1C1713]">
          {/* Brand Identity (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(197,160,89,0.25)]">
                  <img
                    src="/logo-mark.svg"
                    alt="Gusto Coffee Medallion"
                    className="w-full h-full object-contain"
                    width="44"
                    height="44"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="font-serif text-lg sm:text-3xl tracking-[0.14em] sm:tracking-[0.16em] text-[#FCFAF7] font-semibold block leading-tight">
                    GUSTO COFFEE
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-sans">
                    Coffee Bar • Xonqa
                  </span>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#DDB475]/90 font-sans mb-3 sm:mb-5">
                {t('footer.tagline', 'Shoshilmaslikka arziydigan qahva.')}
              </p>
              <p className="text-[11px] sm:text-sm text-[#D5C9B3]/70 font-light max-w-sm leading-relaxed mb-4 sm:mb-6">
                {t(
                  'footer.brandDescription',
                  'Sifatli donlar, professional qahva tayyorlash va mehmondo‘stlikka bag‘ishlangan qahvaxona.'
                )}
              </p>
            </div>

            <div className="text-[11px] sm:text-xs text-[#D5C9B3]/75 font-sans space-y-1 sm:space-y-1.5 pt-1">
              <p>
                <span className="text-[#C59853]">{t('hero.locationLabel', 'Manzil')}:</span> Xonqa tumani, Xalqlar do'stligi ko'chasi, 3.
              </p>
              <p>
                <span className="text-[#C59853]">{t('hero.currentLotLabel', 'Ish tartibi')}:</span> {t('hero.hoursValue', 'Har kuni 8:00 AM — 2:00 AM')}
              </p>
              <p>
                <span className="text-[#C59853]">{t('footer.directLine', 'Aloqa')}:</span>{' '}
                <a href="tel:+998932875484" className="text-[#DDB475] hover:underline py-0.5 inline-block font-medium">
                  +998 93 287 54 84
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links (col-span-3) - Compact 2-column grid on mobile */}
          <div className="lg:col-span-3 pt-2 sm:pt-0">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C59853] block mb-3 sm:mb-6 font-sans">
              {t('footer.showroomIndex', 'Bo‘limlar')}
            </span>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-3.5 text-[11px] sm:text-xs font-sans tracking-wider uppercase">
              <li>
                <a
                  href="#signature"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.coffee', 'Saralangan qahvalar')}
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.story', 'Bizning hikoya')}
                </a>
              </li>
              <li>
                <a
                  href="#craft"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.craft', 'Mahorat va usul')}
                </a>
              </li>
              <li>
                <a
                  href="#atmosphere"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.atmosphere', 'Muhit va galereya')}
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.menu', 'Menyu')}
                </a>
              </li>
              <li>
                <a
                  href="#locations"
                  className="text-[#D5C9B3]/80 hover:text-[#DDB475] transition-colors py-0.5 inline-block"
                >
                  {t('nav.locations', 'Manzil va aloqa')}
                </a>
              </li>
            </ul>
          </div>

          {/* Slow Coffee Journal Dispatch & Social (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-2 sm:pt-0">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C59853] block mb-2 sm:mb-3 font-sans">
                {t('footer.journalTitle', 'Gusto Yangiliklari')}
              </span>
              <p className="text-[11px] sm:text-xs text-[#D5C9B3]/75 font-light leading-relaxed mb-3 sm:mb-4">
                {t(
                  'footer.journalDesc',
                  'Yangi ta’mlar, mavsumiy takliflar va qahvaxona yangiliklaridan birinchilardan bo‘lib xabardor bo‘ling.'
                )}
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.journalPlaceholder', 'Email manzilingizni kiriting')}
                    className="w-full min-h-[40px] sm:min-h-[44px] bg-[#110E0B] border border-[#29231D] rounded-full pl-3.5 sm:pl-4 pr-11 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#F5F1EA] placeholder-[#D5C9B3]/40 focus:outline-none focus:border-[#C59853]"
                    required
                  />
                  <button
                    type="submit"
                    aria-label={t('footer.journalSubscribeAria', 'Obuna bo‘lish')}
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5F1EA] text-[#0C0A08] hover:bg-[#DDB475] flex items-center justify-center transition-colors shrink-0"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#DDB475] py-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t('footer.journalSuccess', 'Rahmat! Yangiliklarimizga muvaffaqiyatli obuna bo‘ldingiz.')}</span>
                </div>
              )}
            </div>

            {/* Social & Contact */}
            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-[#1C1713]">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C59853] block mb-2 sm:mb-3 font-sans">
                {t('footer.connect', 'Ijtimoiy tarmoqlar')}
              </span>
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-6 text-[11px] sm:text-xs text-[#D5C9B3]/80 font-sans tracking-wider">
                <a
                  href="https://t.me/gustobronbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DDB475] text-[#DDB475]/95 transition-colors py-0.5 font-medium flex items-center gap-1"
                >
                  <span>TG: @gustobronbot</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/9XygkJ35KZSzZzg88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DDB475] transition-colors py-0.5"
                >
                  Google Maps
                </a>
                <a
                  href="https://yandex.com/maps/org/gusto_coffee/24379307243?si=r00h1pdwv6vrdvjmgc3dfejjgg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DDB475] transition-colors py-0.5"
                >
                  Yandex Maps
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DDB475] transition-colors py-0.5"
                >
                  Instagram
                </a>
                <a
                  href="tel:+998932875484"
                  className="hover:text-[#DDB475] transition-colors py-0.5 whitespace-nowrap"
                >
                  +998 93 287 54 84
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-[10px] sm:text-xs text-[#D5C9B3]/50 font-sans text-center sm:text-left">
          <p>© {new Date().getFullYear()} GUSTO COFFEE. {t('footer.rights', 'Barcha huquqlar himoyalangan.')}</p>
          <div className="flex items-center gap-3 sm:gap-6">
            <span>Xonqa tumani</span>
            <span>•</span>
            <span>Gusto Coffee Bar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
