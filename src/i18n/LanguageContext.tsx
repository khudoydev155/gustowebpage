import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Language, LocalizedString } from './types';
import { translations } from './translations';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
  localize: (value?: LocalizedString | string) => string;
}

const STORAGE_KEY = 'gusto-language';
const VALID_LANGUAGES: Language[] = ['uz', 'ru', 'en'];

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      // A ?lang= URL parameter takes priority so a shared/indexed link
      // (see public/sitemap.xml's hreflang alternates) actually opens
      // in that language, not just the stored preference.
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get('lang');
      if (fromUrl && VALID_LANGUAGES.includes(fromUrl as Language)) {
        return fromUrl as Language;
      }
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_LANGUAGES.includes(stored as Language)) {
        return stored as Language;
      }
    } catch {
      // localStorage/URL access may fail in restricted environments
    }
    return 'uz';
  });

  const setLanguage = useCallback((newLang: Language) => {
    if (!VALID_LANGUAGES.includes(newLang)) return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Handle storage quota or access errors safely
    }
  }, []);

  // Synchronize HTML lang, title, and SEO meta tags (description, Open
  // Graph, Twitter Card) so crawlers and link-preview bots that read
  // the DOM after hydration see the active language's copy.
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      const dict = translations[language] || translations.uz;

      const setMeta = (selector: string, content?: string) => {
        if (!content) return;
        let el = document.querySelector(selector);
        if (!el) {
          el = document.createElement('meta');
          const match = selector.match(/\[(\w+)="([^"]+)"\]/);
          if (match) el.setAttribute(match[1], match[2]);
          document.head.appendChild(el);
        }
        el.setAttribute('content', content);
      };

      if (dict?.meta?.title) {
        document.title = dict.meta.title;
      }

      const ogLocaleMap: Record<Language, string> = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' };

      setMeta('meta[name="description"]', dict?.meta?.description);
      setMeta('meta[property="og:title"]', dict?.meta?.title);
      setMeta('meta[property="og:description"]', dict?.meta?.description);
      setMeta('meta[property="og:locale"]', ogLocaleMap[language]);
      setMeta('meta[name="twitter:title"]', dict?.meta?.title);
      setMeta('meta[name="twitter:description"]', dict?.meta?.description);
    } catch {
      // DOM access safety
    }
  }, [language]);

  // Dot-notation translation resolver with fallback to Uzbek
  const t = useCallback(
    (path: string, fallback?: string): string => {
      const getNested = (obj: unknown, keys: string[]): string | undefined => {
        let current: unknown = obj;
        for (const key of keys) {
          if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
            current = (current as Record<string, unknown>)[key];
          } else {
            return undefined;
          }
        }
        return typeof current === 'string' ? current : undefined;
      };

      const keys = path.split('.');
      // 1. Try current language
      const currentVal = getNested(translations[language], keys);
      if (currentVal !== undefined) return currentVal;

      // 2. Fall back to Uzbek
      const fallbackVal = getNested(translations.uz, keys);
      if (fallbackVal !== undefined) return fallbackVal;

      // 3. Fall back to provided default or key
      return fallback !== undefined ? fallback : path;
    },
    [language]
  );

  // Helper to resolve a LocalizedString ({ uz, ru, en })
  const localize = useCallback(
    (value?: LocalizedString | string): string => {
      if (!value) return '';
      if (typeof value === 'string') return value;
      return value[language] || value.uz || value.en || value.ru || '';
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      localize,
    }),
    [language, setLanguage, t, localize]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
