import React, { useState } from 'react';
import { CRAFT_STEPS } from '../data/coffeeData';
import { Check } from 'lucide-react';
import { useLanguage } from '../i18n';

export const CraftSection: React.FC = () => {
  const { language, t, localize } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = CRAFT_STEPS[activeStepIndex];

  const getPoints = (step: typeof activeStep): string[] => {
    return step.detailPoints[language] || step.detailPoints.uz || step.detailPoints.en || [];
  };

  return (
    <section
      id="craft"
      className="relative py-20 sm:py-36 bg-[#0C0A08] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-5 h-[1px] bg-[#C59853]" />
            <p className="text-xs uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
              {t('craft.eyebrow', 'Sifatning 4 ustuni')}
            </p>
            <span className="w-5 h-[1px] bg-[#C59853]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-tight mb-4 sm:mb-5">
            {t('craft.headline', "Shoshilmaslik")} <span className="italic text-[#DDB475]">{t('craft.headlineHighlight', "san'ati.")}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#D5C9B3]/80 font-light leading-relaxed">
            {t(
              'craft.description',
              'Har bir finjon qahva puxta tayyorgarlik, aniq harorat va sabr mahsulidir.'
            )}
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {CRAFT_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                id={`craft-step-btn-${step.number}`}
                className={`p-3.5 sm:p-5 text-left border rounded-sm transition-all duration-300 relative ${
                  isActive
                    ? 'bg-[#181410] border-[#C59853] shadow-[0_4px_20px_rgba(197,152,83,0.15)]'
                    : 'bg-[#110E0B] border-[#29231D] hover:border-[#3E362D] text-[#D5C9B3]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span
                    className={`font-serif text-xl sm:text-3xl font-light ${
                      isActive ? 'text-[#DDB475]' : 'text-[#D5C9B3]/40'
                    }`}
                  >
                    {step.number}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DDB475]" />
                  )}
                </div>
                <h4
                  className={`font-serif text-base sm:text-xl font-normal ${
                    isActive ? 'text-[#FCFAF7]' : 'text-[#D5C9B3]/80'
                  }`}
                >
                  {localize(step.title)}
                </h4>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#C59853]/90 mt-1 font-sans truncate">
                  {localize(step.subtitle)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Layout */}
        <div className="bg-[#13100D] border border-[#29231D] rounded-sm p-5 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
          {/* Step Narrative & Detail Points (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <span className="font-serif text-3xl sm:text-4xl text-[#C59853]/60 font-light">
                  {activeStep.number}
                </span>
                <span className="w-6 sm:w-8 h-[1px] bg-[#29231D]" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#DDB475] font-sans">
                  {t('craft.stageLabel', 'Bosqich')} {activeStep.number} • {localize(activeStep.subtitle)}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-[#FCFAF7] font-normal mb-3 sm:mb-5">
                {localize(activeStep.title)}
              </h3>

              <p className="text-sm sm:text-base text-[#D5C9B3]/85 font-light leading-relaxed mb-6 sm:mb-8">
                {localize(activeStep.description)}
              </p>

              {/* Technical Craft Highlights */}
              <div className="space-y-2.5 sm:space-y-3 pt-5 sm:pt-6 border-t border-[#29231D]">
                {getPoints(activeStep).map((point) => (
                  <div key={point} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#C59853]/15 flex items-center justify-center shrink-0 mt-0.5 border border-[#C59853]/40">
                      <Check className="w-2.5 h-2.5 text-[#DDB475]" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#EAE3D5]/80 font-light">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Stamp */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#29231D] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block">
                  {localize(activeStep.metricLabel)}
                </span>
                <p className="font-serif text-lg sm:text-2xl text-[#FCFAF7] mt-0.5">
                  {activeStep.metricValue === '100% Tabiiy'
                    ? t('craft.metricNatural', '100% Tabiiy')
                    : activeStep.metricValue === '10 Toifa'
                    ? t('craft.metricCategories', '10 toifa')
                    : activeStep.metricValue}
                </p>
              </div>
              <span className="text-xs font-sans text-[#D5C9B3]/50">
                {t('craft.precisionStandard', 'Aniqlik mezonlari')}
              </span>
            </div>
          </div>

          {/* Step Visual Photography (col-span-5) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative aspect-[16/10] sm:aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#0C0A08] border border-[#29231D]">
              <img
                key={activeStep.number}
                src={activeStep.image}
                alt={`${localize(activeStep.title)} - Gusto Coffee craft process`}
                className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13100D]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
