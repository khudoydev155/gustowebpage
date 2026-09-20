import React from 'react';
import { X, Sparkles, Droplets, Mountain, Flame, Compass } from 'lucide-react';
import { SignatureProduct } from '../types';
import { useLanguage } from '../i18n';

interface ProductDetailModalProps {
  product: SignatureProduct | null;
  onClose: () => void;
  onReserveTasting: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onReserveTasting,
}) => {
  const { language, t, localize } = useLanguage();

  if (!product) return null;

  const notes = product.notes[language] || product.notes.uz || product.notes.en || [];

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 bg-[#0C0A08]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#13100D] border border-[#29231D] max-w-2xl w-full max-h-[90dvh] overflow-y-auto rounded-sm overflow-hidden text-[#F5F1EA] shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t('productModal.closeAria', 'Close modal')}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 text-[#D5C9B3]/70 hover:text-[#FCFAF7] bg-[#0C0A08]/80 backdrop-blur-md min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-[#29231D] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#0A0908]">
          <img
            src={product.image}
            alt={localize(product.name)}
            className="w-full h-full object-cover object-center brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13100D] via-transparent to-black/30" />

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-1.5 sm:gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] font-sans block mb-0.5 sm:mb-1">
                {localize(product.subtitle)}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#FCFAF7]">
                {localize(product.name)}
              </h3>
            </div>
            <span className="font-serif text-lg sm:text-xl text-[#DDB475] bg-[#0C0A08]/80 backdrop-blur-md px-3 py-1 rounded-sm border border-[#29231D]">
              {product.price}
            </span>
          </div>
        </div>

        {/* Technical Data Content */}
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm text-[#D5C9B3]/85 font-light leading-relaxed">
            {localize(product.description)}
          </p>

          {/* Terroir & Processing Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 py-3 sm:py-4 border-y border-[#29231D]">
            <div className="p-2.5 sm:p-3 bg-[#0E0C09] rounded-sm border border-[#1C1713]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C59853] mb-1">
                <Mountain className="w-3 h-3 shrink-0" />
                <span className="truncate">{t('productModal.elevation', 'Balandlik')}</span>
              </div>
              <p className="font-serif text-xs sm:text-sm text-[#FCFAF7] truncate">
                {product.elevation}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0E0C09] rounded-sm border border-[#1C1713]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C59853] mb-1">
                <Droplets className="w-3 h-3 shrink-0" />
                <span className="truncate">{t('productModal.process', 'Qayta ishlash')}</span>
              </div>
              <p className="font-serif text-xs sm:text-sm text-[#FCFAF7] truncate">
                {localize(product.process)}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0E0C09] rounded-sm border border-[#1C1713]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C59853] mb-1">
                <Flame className="w-3 h-3 shrink-0" />
                <span className="truncate">{t('productModal.roastProfile', 'Qovurish')}</span>
              </div>
              <p className="font-serif text-xs sm:text-sm text-[#FCFAF7] truncate">
                {product.roastLevel === 'Medium' ? t('productModal.roastMedium', 'O‘rtacha (Medium)') : product.roastLevel}
              </p>
            </div>

            <div className="p-2.5 sm:p-3 bg-[#0E0C09] rounded-sm border border-[#1C1713]">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#C59853] mb-1">
                <Compass className="w-3 h-3 shrink-0" />
                <span className="truncate">{t('productModal.servingCup', 'Hajm')}</span>
              </div>
              <p className="font-serif text-xs sm:text-sm text-[#FCFAF7] truncate">
                {product.cupVolume || t('productModal.artisanCup', 'Finjon')}
              </p>
            </div>
          </div>

          {/* Tasting Notes */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/60 block mb-2 font-sans">
              {t('productModal.flavorNotes', 'Ta’m notalari')}
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {notes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] sm:text-xs font-sans px-2.5 sm:px-3 py-1 bg-[#1C1713] text-[#F5F1EA] rounded-sm border border-[#29231D]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Sommelier Pairing Suggestion */}
          {product.pairing && (
            <div className="p-3 sm:p-4 bg-[#0E0C09] border border-[#29231D] rounded-sm flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#C59853] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59853] block mb-0.5 font-sans">
                  {t('productModal.pairing', 'Tavsiya etiladigan juftlik')}
                </span>
                <p className="text-xs text-[#EAE3D5]/80 font-light">
                  {localize(product.pairing)}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-[11px] text-[#D5C9B3]/60 font-light text-center sm:text-left">
              {t(
                'productModal.freshDaily',
                "Gusto Coffeda har kuni yangi tayyorlanadi. Xonqa tumani, Xalqlar do'stligi ko'chasi, 3."
              )}
            </span>
            <button
              onClick={() => {
                onClose();
                onReserveTasting();
              }}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#DDB475] transition-colors flex items-center justify-center shrink-0"
            >
              {t('productModal.reserveBtn', 'Tatib ko‘rish uchun joy band qilish')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
