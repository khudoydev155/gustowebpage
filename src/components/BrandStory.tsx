import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../i18n';

export const BrandStory: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="story"
      className="relative py-20 sm:py-36 bg-[#0E0C09] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photo with Architectural Frame (col-span-6) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0908] rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=85&w=1400&auto=format&fit=crop"
                alt="Slow coffee poured into bespoke ceramic cup on aged wooden counter"
                className="w-full h-full object-cover object-center brightness-[0.9] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C09]/80 via-transparent to-transparent" />

              {/* Floating Quote Stamp */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-6 bg-[#0C0A08]/90 backdrop-blur-md border border-[#29231D] rounded-sm">
                <Quote className="w-4 sm:w-5 h-4 sm:h-5 text-[#C59853] mb-1.5 sm:mb-2 opacity-80" />
                <p className="font-serif italic text-sm sm:text-lg text-[#FCFAF7] leading-snug">
                  {t(
                    'story.quote',
                    '“Biz shovqindan uzoqlashib, haqiqiy qahva ta’mi va sokinlik uyg‘unligiga quloq tutamiz.”'
                  )}
                </p>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#DDB475] mt-1.5 sm:mt-2 block font-sans">
                  {t('story.quoteAuthor', 'Gusto Coffee Falsafasi')}
                </span>
              </div>
            </div>

            {/* Subtle decorative offset outline */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 w-full h-full border border-[#29231D] -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Narrative Storytelling (col-span-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2.5 mb-4 sm:mb-5">
              <span className="w-6 h-[1px] bg-[#C59853]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
                {t('story.eyebrow', 'Bizning hikoyamiz va falsafamiz')}
              </p>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-[1.1] sm:leading-[1.08] mb-6 sm:mb-8">
              {t('story.headline', 'Yaxshi qahva')} <br />
              <span className="italic text-[#DDB475]">
                {t('story.headlineHighlight', 'yuksak diddan boshlanadi.')}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#EAE3D5]/90 font-light leading-relaxed mb-4 sm:mb-6">
              {t(
                'story.lead',
                "Gusto sokin e'tiqoddan tug'ilgan: shoshqaloq dunyoda asl hashamat — bu bir lahzaga to'xtab, dam olishga vaqt topishdir."
              )}
            </p>

            <p className="text-sm sm:text-base text-[#D5C9B3]/80 font-light leading-relaxed mb-8 sm:mb-10">
              {t(
                'story.body',
                "Biz qahvani shunchaki odatiy ichimlik deb bilmaymiz. Har bir tayyorlanayotgan ichimlikka sifatli ingredientlar, me'yordagi harorat va samimiy mehmondo'stlik bilan yondashamiz."
              )}
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-[#29231D]">
              <div>
                <span className="text-xs font-serif italic text-[#C59853] block mb-1">
                  {t('story.pillar1Num', '01 / Tanlov')}
                </span>
                <h4 className="font-serif text-lg text-[#FCFAF7] mb-1.5">
                  {t('story.pillar1Title', 'Sifatli ingredientlar')}
                </h4>
                <p className="text-xs text-[#D5C9B3]/70 font-light leading-relaxed">
                  {t(
                    'story.pillar1Desc',
                    'Har bir ichimlik faqat toza va saralangan xomashyolardan tayyorlanadi.'
                  )}
                </p>
              </div>

              <div>
                <span className="text-xs font-serif italic text-[#C59853] block mb-1">
                  {t('story.pillar2Num', '02 / Mahorat')}
                </span>
                <h4 className="font-serif text-lg text-[#FCFAF7] mb-1.5">
                  {t('story.pillar2Title', 'Professional tayyorlash')}
                </h4>
                <p className="text-xs text-[#D5C9B3]/70 font-light leading-relaxed">
                  {t(
                    'story.pillar2Desc',
                    "Qahva ekstraksiyasi va sut ko'pirtirish jarayoni aniq me'yorda bajariladi."
                  )}
                </p>
              </div>

              <div>
                <span className="text-xs font-serif italic text-[#C59853] block mb-1">
                  {t('story.pillar3Num', '03 / Muhit')}
                </span>
                <h4 className="font-serif text-lg text-[#FCFAF7] mb-1.5">
                  {t('story.pillar3Title', "Shinam mehmondo'stlik")}
                </h4>
                <p className="text-xs text-[#D5C9B3]/70 font-light leading-relaxed">
                  {t(
                    'story.pillar3Desc',
                    'Uchrashuvlar, fikr jamlash va sokin suhbatlar uchun yaratilgan qulay maskan.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
