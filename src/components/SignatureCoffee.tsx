import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SIGNATURE_PRODUCTS } from '../data/coffeeData';
import { SignatureProduct } from '../types';
import { useLanguage } from '../i18n';

interface SignatureCoffeeProps {
  onSelectProduct: (product: SignatureProduct) => void;
  onExploreFullMenu: () => void;
}

export const SignatureCoffee: React.FC<SignatureCoffeeProps> = ({
  onSelectProduct,
  onExploreFullMenu,
}) => {
  const { language, t, localize } = useLanguage();
  const [featuredProduct, ...secondaryProducts] = SIGNATURE_PRODUCTS;

  const getNotes = (product: SignatureProduct): string[] => {
    return product.notes[language] || product.notes.uz || product.notes.en || [];
  };

  return (
    <section
      id="signature"
      className="relative py-20 sm:py-36 bg-[#0C0A08] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-5 h-[1px] bg-[#C59853]" />
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
                {t('signature.eyebrow', 'Saralangan ichimliklar')}
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-[1.1] sm:leading-[1.08] max-w-xl">
              {t('signature.headline', "Gusto'ning")} <br />
              <span className="italic text-[#DDB475]">
                {t('signature.headlineHighlight', 'saralangan ifori.')}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#D5C9B3]/80 leading-relaxed font-light mb-4">
              {t(
                'signature.description',
                "Har bir ta'm o'ziga xos mehnat va baristalarimiz mahoratining ifodasidir."
              )}
            </p>
            <button
              onClick={onExploreFullMenu}
              id="view-full-carte-btn"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#DDB475] hover:text-[#FCFAF7] transition-colors py-1 group min-h-[44px]"
            >
              <span>{t('signature.viewFullMenu', "To'liq menyuni ko'rish")}</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Asymmetric Editorial Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Featured Large Hero Product (col-span-7) */}
          <div
            onClick={() => onSelectProduct(featuredProduct)}
            id={`product-card-${featuredProduct.id}`}
            className="lg:col-span-7 group cursor-pointer relative bg-[#13100D] border border-[#29231D] hover:border-[#C59853]/60 transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Image Container with 35mm warmth */}
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0A0908]">
              <img
                src={featuredProduct.image}
                alt={localize(featuredProduct.name)}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13100D] via-transparent to-black/20" />

              {/* Harvest / Signature Badge */}
              {featuredProduct.badge && (
                <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0C0A08]/85 backdrop-blur-md border border-[#C59853]/50 text-[#DDB475] text-[10px] font-sans uppercase tracking-[0.2em]">
                    <Sparkles className="w-3 h-3" />
                    {localize(featuredProduct.badge)}
                  </span>
                </div>
              )}

              {/* Price Tag */}
              <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5">
                <span className="font-serif text-base sm:text-lg text-[#F5F1EA] bg-[#0C0A08]/80 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 border border-[#29231D]">
                  {featuredProduct.price}
                </span>
              </div>
            </div>

            {/* Content & Sensory Notes */}
            <div className="p-5 sm:p-10 flex flex-col justify-between flex-1">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase tracking-[0.25em] text-[#C59853] font-medium font-sans">
                    {localize(featuredProduct.subtitle)}
                  </span>
                  <span className="text-xs font-sans text-[#D5C9B3]/60">
                    {localize(featuredProduct.origin)}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl text-[#FCFAF7] font-normal mb-3 sm:mb-4 group-hover:text-[#DDB475] transition-colors">
                  {localize(featuredProduct.name)}
                </h3>

                <p className="text-sm text-[#D5C9B3]/80 leading-relaxed font-light mb-5 sm:mb-6">
                  {localize(featuredProduct.description)}
                </p>
              </div>

              <div>
                {/* Tasting Notes Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#29231D]/80">
                  {getNotes(featuredProduct).map((note) => (
                    <span
                      key={note}
                      className="text-[11px] font-sans px-2.5 py-1 rounded-sm bg-[#1C1713] text-[#EAE3D5] border border-[#29231D]"
                    >
                      {note}
                    </span>
                  ))}
                  <span className="text-[11px] font-sans px-2.5 py-1 rounded-sm bg-[#C59853]/10 text-[#DDB475] border border-[#C59853]/30 w-full sm:w-auto sm:ml-auto text-center mt-1 sm:mt-0 group-hover:bg-[#C59853] group-hover:text-[#0C0A08] transition-colors">
                    {t('signature.inspectProfile', 'Inspect Profile →')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Products Column (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
            {secondaryProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                id={`product-card-${product.id}`}
                className="group cursor-pointer bg-[#13100D] border border-[#29231D] hover:border-[#C59853]/50 transition-all duration-400 p-4 sm:p-7 rounded-sm flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center"
              >
                {/* Product Thumbnail */}
                <div className="relative w-full sm:w-36 h-44 sm:h-36 shrink-0 overflow-hidden bg-[#0A0908] rounded-sm">
                  <img
                    src={product.image}
                    alt={localize(product.name)}
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 ease-out brightness-[0.9]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                </div>

                {/* Product Meta */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853]">
                      {localize(product.subtitle)}
                    </span>
                    <span className="font-serif text-sm text-[#DDB475]">
                      {product.price}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl text-[#FCFAF7] group-hover:text-[#DDB475] transition-colors font-normal mb-2">
                    {localize(product.name)}
                  </h4>

                  <p className="text-xs text-[#D5C9B3]/75 line-clamp-2 leading-relaxed font-light mb-3">
                    {localize(product.description)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    {getNotes(product).slice(0, 3).map((note) => (
                      <span
                        key={note}
                        className="text-[10px] font-sans px-2 py-0.5 bg-[#1C1713] text-[#D5C9B3] rounded-sm border border-[#29231D]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
