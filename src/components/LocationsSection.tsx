import React, { useState } from 'react';
import { CAFE_LOCATIONS } from '../data/coffeeData';
import { CafeLocation } from '../types';
import { MapPin, Phone, Clock, Compass, Calendar, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n';

interface LocationsSectionProps {
  onReserveTable: (locationId?: string) => void;
}

export const LocationsSection: React.FC<LocationsSectionProps> = ({ onReserveTable }) => {
  const [selectedLocation, setSelectedLocation] = useState<CafeLocation>(CAFE_LOCATIONS[0]);
  const [showMapModal, setShowMapModal] = useState(false);
  const { language, t, localize } = useLanguage();

  const getFeatures = (loc: CafeLocation): string[] => {
    return loc.features[language] || loc.features.uz || loc.features.en || [];
  };

  return (
    <section
      id="locations"
      className="relative py-20 sm:py-36 bg-[#0E0C09] text-[#F5F1EA] overflow-hidden border-t border-[#1C1713]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-4">
              <span className="w-5 h-[1px] bg-[#C59853]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#C59853] font-medium font-sans">
                {t('locations.eyebrow', "Mehmondo'stlik makoni")}
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FCFAF7] font-normal leading-tight">
              {t('locations.headline', 'Gusto')}{' '}
              <span className="italic text-[#DDB475]">
                {t('locations.headlineHighlight', 'manzili.')}
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#D5C9B3]/80 font-light leading-relaxed">
              {t('locations.description', "Xonqa tumani, Xalqlar do'stligi ko'chasi, 3. Har kuni 8:00 AM — 2:00 AM.")}
            </p>
          </div>
        </div>

        {/* Location Selection Cards */}
        <div
          className={`grid grid-cols-1 ${
            CAFE_LOCATIONS.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'
          } gap-6 sm:gap-8 mb-10 sm:mb-12`}
        >
          {CAFE_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            const features = getFeatures(loc);
            return (
              <div
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                id={`location-card-${loc.id}`}
                className={`cursor-pointer rounded-sm border transition-all duration-400 p-5 sm:p-10 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#14110E] border-[#C59853] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                    : 'bg-[#100D0A] border-[#29231D] hover:border-[#3E362D]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] font-sans block mb-1">
                        {localize(loc.type)}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#FCFAF7] font-normal">
                        {loc.name}
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-sans bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {localize(loc.status)}
                    </span>
                  </div>

                  <div className="space-y-3 my-5 sm:my-6 text-sm text-[#D5C9B3]/80 font-light">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C59853] shrink-0 mt-0.5" />
                      <span>{loc.district}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#C59853] shrink-0" />
                      <span>{localize(loc.hoursWeekday)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#C59853] shrink-0" />
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                        className="hover:text-[#DDB475] transition-colors py-1"
                      >
                        {loc.phone}
                      </a>
                    </div>
                    {loc.telegramBot && (
                      <div className="flex items-center gap-3">
                        <span className="w-4 text-center text-xs text-[#C59853] font-semibold">TG</span>
                        <a
                          href="https://t.me/gustobronbot"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DDB475] text-[#DDB475]/90 transition-colors py-1 flex items-center gap-1.5"
                        >
                          <span>{loc.telegramBot}</span>
                          <span className="text-[10px] text-[#C59853] px-2 py-0.5 rounded-full bg-[#C59853]/10 border border-[#C59853]/30">Bron boti</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[#29231D]/80">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/50 block mb-2 font-sans">
                      {t('locations.featuresLabel', 'Qulayliklar')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-[#EAE3D5]/80">
                          <Check className="w-3 h-3 text-[#C59853] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#29231D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReserveTable(loc.id);
                    }}
                    id={`reserve-btn-${loc.id}`}
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#DDB475] transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t('locations.reserveBtn', 'Joy band qilish')}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setShowMapModal(true);
                    }}
                    id={`map-btn-${loc.id}`}
                    className="min-h-[44px] text-xs uppercase tracking-[0.16em] text-[#DDB475] hover:text-[#FCFAF7] transition-colors flex items-center justify-center gap-1.5 py-2 sm:py-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t('locations.mapDirectionsBtn', "Xaritada ko'rish")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Location Architectural View */}
        <div className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden rounded-sm bg-[#14110E] border border-[#29231D]">
          <img
            src={selectedLocation.image}
            alt={selectedLocation.name}
            className="w-full h-full object-cover object-center brightness-[0.82] contrast-[1.08]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-black/30" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block font-sans">
                {t('locations.previewSpace', 'Tanlangan makon')}
              </span>
              <h4 className="font-serif text-xl sm:text-3xl text-[#FCFAF7]">
                {selectedLocation.name}
              </h4>
            </div>

            <button
              onClick={() => setShowMapModal(true)}
              className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full bg-[#0C0A08]/85 backdrop-blur-md border border-[#C59853]/60 text-[#DDB475] text-[11px] sm:text-xs uppercase tracking-[0.16em] hover:bg-[#C59853] hover:text-[#0C0A08] transition-all flex items-center gap-2"
            >
              <span>{t('locations.exploreMapBtn', 'Interaktiv xaritani ochish')}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map & Directions Modal */}
      {showMapModal && (
        <div
          id="location-map-modal"
          className="fixed inset-0 z-50 bg-[#0C0A08]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowMapModal(false)}
        >
          <div
            className="relative bg-[#13100D] border border-[#29231D] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm p-5 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block">
                  {t('locations.transitGuide', "Manzil va yo'nalishlar")}
                </span>
                <h3 className="font-serif text-xl sm:text-3xl text-[#FCFAF7]">
                  {selectedLocation.name}
                </h3>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="min-h-[40px] px-3 py-1.5 text-xs uppercase tracking-wider text-[#D5C9B3]/60 hover:text-[#FCFAF7] border border-[#29231D] rounded-sm shrink-0 flex items-center justify-center"
              >
                {t('locations.closeMap', 'Yopish ✕')}
              </button>
            </div>

            {/* Stylized Dark Architectural Map Canvas */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#0A0908] border border-[#29231D] flex items-center justify-center p-4 sm:p-6 text-center">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C59853_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C59853]/20 border border-[#C59853] flex items-center justify-center mb-2.5 sm:mb-3 animate-pulse">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#DDB475]" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-[#FCFAF7] mb-1">
                  {selectedLocation.address}
                </h4>
                <p className="text-[11px] sm:text-xs text-[#D5C9B3]/80 font-sans max-w-sm mb-4">
                  {t('locations.coordinatesLabel', 'Koordinatalar')}: {selectedLocation.mapCoordinates.lat}° N,{' '}
                  {selectedLocation.mapCoordinates.lng}° E
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 w-full max-w-md">
                  <a
                    href={selectedLocation.googleMapsUrl || "https://maps.app.goo.gl/9XygkJ35KZSzZzg88"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#DDB475] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <a
                    href={selectedLocation.yandexMapsUrl || "https://yandex.com/maps/org/gusto_coffee/24379307243?si=r00h1pdwv6vrdvjmgc3dfejjgg"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#181410] border border-[#C59853]/60 text-[#DDB475] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#C59853] hover:text-[#0C0A08] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Yandex Xarita</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 space-y-2 text-xs text-[#D5C9B3]/80">
              <p>• {t('hero.locationLabel', 'Manzil')}: {selectedLocation.district}</p>
              <p>• {t('hero.currentLotLabel', 'Ish tartibi')}: {localize(selectedLocation.hoursWeekday)}</p>
              <p>
                • {t('footer.directLine', 'Telefon')}:{' '}
                <a
                  href={`tel:${selectedLocation.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#DDB475] py-1 inline-block"
                >
                  {selectedLocation.phone}
                </a>
              </p>
              <p>
                • Telegram bron: <a href="https://t.me/gustobronbot" target="_blank" rel="noopener noreferrer" className="text-[#DDB475] hover:underline font-medium">@gustobronbot</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
