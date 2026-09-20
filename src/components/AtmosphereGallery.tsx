import React from 'react';
import { ATMOSPHERE_IMAGES } from '../data/coffeeData';
import { useLanguage } from '../i18n';

export const AtmosphereGallery: React.FC = () => {
  const { t, localize } = useLanguage();

  const getColSpanClass = (index: number) => {
    switch (index) {
      case 0:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3] sm:aspect-[4/5]';
      case 1:
        return 'col-span-12 sm:col-span-6 lg:col-span-8 aspect-[16/10] sm:aspect-auto sm:h-[380px]';
      case 2:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3] sm:aspect-square';
      case 3:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3] sm:aspect-[4/5]';
      case 4:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3] sm:aspect-square';
      case 5:
        return 'col-span-12 sm:col-span-6 lg:col-span-12 aspect-[16/9] sm:aspect-[21/9]';
      default:
        return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3] sm:aspect-[4/5]';
    }
  };

  return (
    <section
      id="atmosphere"
      className="relative py-20 sm:py-36 bg-[#090807] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Atmosphere Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-5 h-[1px] bg-[#C59853]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
                {t('atmosphere.eyebrow', 'Shinam makon')}
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-tight">
              {t('atmosphere.headline', 'Huzur va')} <br />
              <span className="italic text-[#DDB475]">
                {t('atmosphere.headlineHighlight', 'xotirjamlik.')}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#D5C9B3]/80 font-light leading-relaxed">
              {t(
                'atmosphere.description',
                "Sokin qahva ichish, do'stlar bilan uchrashish va iliq suhbatlar uchun maxsus loyihalashtirilgan qulay muhit."
              )}
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Collage */}
        <div className="grid grid-cols-12 gap-4 sm:gap-8 items-start">
          {ATMOSPHERE_IMAGES.map((item, index) => (
            <div
              key={item.id}
              className={`${getColSpanClass(
                index
              )} group relative overflow-hidden bg-[#13100D] border border-[#29231D] rounded-sm`}
            >
              <img
                src={item.image}
                alt={localize(item.title)}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08]/90 via-[#0C0A08]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-8 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] font-sans mb-1.5 block">
                  {t(`atmosphere.cat.${item.category}`, item.category)}
                </span>
                <h4 className="font-serif text-lg sm:text-2xl text-[#FCFAF7] font-normal mb-1">
                  {localize(item.title)}
                </h4>
                <p className="text-xs text-[#D5C9B3]/80 font-light max-w-lg leading-relaxed line-clamp-2">
                  {localize(item.caption)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Atmospheric Detail Strip */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#29231D]/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853] block mb-1">
              {t('atmosphere.stripMaterial', 'Materiallar uyg‘unligi')}
            </span>
            <p className="font-serif text-base text-[#F5F1EA]">
              {t('atmosphere.stripMaterialVal', "Yong'oq yog'ochi va travertin")}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853] block mb-1">
              {t('atmosphere.stripAcoustics', 'Akustik qulaylik')}
            </span>
            <p className="font-serif text-base text-[#F5F1EA]">
              {t('atmosphere.stripAcousticsVal', 'Mato panellar va sokin musiqa')}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853] block mb-1">
              {t('atmosphere.stripLight', 'Yoritish darajasi')}
            </span>
            <p className="font-serif text-base text-[#F5F1EA]">
              {t('atmosphere.stripLightVal', '2700K Iliq sokin yorug‘lik')}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853] block mb-1">
              {t('atmosphere.stripMood', 'Makon kayfiyati')}
            </span>
            <p className="font-serif text-base text-[#F5F1EA]">
              {t('atmosphere.stripMoodVal', 'Sokinlik va dildan suhbat')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
