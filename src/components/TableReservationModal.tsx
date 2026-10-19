import React, { useState } from 'react';
import { X, CheckCircle2, Send, ExternalLink, MessageSquare, Calendar, Clock, AlertCircle } from 'lucide-react';
import { CAFE_LOCATIONS } from '../data/coffeeData';
import { BRAND_CONTACTS, sendReservationToTelegram, generateTelegramBookingText } from '../data/brandInfo';
import { useLanguage } from '../i18n';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLocationId?: string;
}

const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '11:00 PM',
  '12:00 AM',
  '01:00 AM',
];

function formatUzPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '+998 ';
  let core = digits;
  if (core.startsWith('998')) {
    core = core.slice(3);
  }
  core = core.slice(0, 9);
  let formatted = '+998';
  if (core.length > 0) {
    formatted += ' (' + core.slice(0, 2);
    if (core.length >= 2) formatted += ') ';
  }
  if (core.length > 2) {
    formatted += core.slice(2, 5);
  }
  if (core.length > 5) {
    formatted += '-' + core.slice(5, 7);
  }
  if (core.length > 7) {
    formatted += '-' + core.slice(7, 9);
  }
  return formatted;
}

function isValidUzPhone(formatted: string): boolean {
  const digits = formatted.replace(/\D/g, '');
  return digits.length === 12 && digits.startsWith('998');
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  initialLocationId,
}) => {
  const { t, localize } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState(
    initialLocationId || CAFE_LOCATIONS[0].id
  );
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [phone, setPhone] = useState('+998 ');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Date selection states: 'today' | 'tomorrow' | 'custom'
  const todayObj = new Date();
  const todayIso = todayObj.toISOString().split('T')[0];
  const tomorrowObj = new Date(Date.now() + 86400000);
  const tomorrowIso = tomorrowObj.toISOString().split('T')[0];

  const [dateType, setDateType] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState(todayIso);

  const [time, setTime] = useState('11:00 AM');
  const [guests, setGuests] = useState('2');
  const [experience, setExperience] = useState('slowCoffee');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [autoDeliveryFailed, setAutoDeliveryFailed] = useState(false);

  if (!isOpen) return null;

  const experiences = [
    { id: 'slowCoffee', label: t('reserveModal.expSlow', 'Qahva tatib ko‘rish') },
    { id: 'quietWork', label: t('reserveModal.expQuiet', 'Sokin ishlash / Mutolaa') },
    { id: 'convo', label: t('reserveModal.expConvo', 'Suhbat va uchrashuv') },
  ];

  const guestOptions = [
    { value: '1', label: t('reserveModal.oneGuest', '1 kishi') },
    { value: '2', label: t('reserveModal.twoGuests', '2 kishi') },
    { value: '3-4', label: t('reserveModal.threeFourGuests', '3-4 kishi') },
    { value: '5+', label: t('reserveModal.fivePlusGuests', '5+ kishi (Katta stol)') },
  ];

  const currentExpLabel = experiences.find((e) => e.id === experience)?.label || experience;
  const currentLocationName = CAFE_LOCATIONS.find((l) => l.id === selectedLocation)?.name || BRAND_CONTACTS.name;

  const getEffectiveDate = (): string => {
    if (dateType === 'today') {
      return `${t('reserveModal.today', 'Bugun')} (${todayIso})`;
    }
    if (dateType === 'tomorrow') {
      return `${t('reserveModal.tomorrow', 'Ertaga')} (${tomorrowIso})`;
    }
    return customDate || todayIso;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPhoneValid = isValidUzPhone(phone);
    const isNameValid = name.trim().length >= 2;

    setNameTouched(true);
    setPhoneTouched(true);
    setNameError(!isNameValid);
    setPhoneError(!isPhoneValid);

    if (!isPhoneValid || !isNameValid) {
      return;
    }

    setIsSending(true);

    const bookingDate = getEffectiveDate();

    try {
      const result = await sendReservationToTelegram({
        name: name.trim(),
        phone,
        date: bookingDate,
        time,
        guests,
        experience: currentExpLabel,
        locationName: `${currentLocationName} (${BRAND_CONTACTS.address})`,
      });
      setAutoDeliveryFailed(!result.success);
    } catch {
      setAutoDeliveryFailed(true);
    } finally {
      setIsSending(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('+998 ');
    setNameTouched(false);
    setPhoneTouched(false);
    setNameError(false);
    setPhoneError(false);
    onClose();
  };

  const effectiveBookingDate = getEffectiveDate();

  const telegramShareText = generateTelegramBookingText({
    name: name.trim(),
    phone,
    date: effectiveBookingDate,
    time,
    guests,
    experience: currentExpLabel,
    locationName: `${currentLocationName} (${BRAND_CONTACTS.address})`,
  });

  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent('https://t.me/gustobronbot')}&text=${encodeURIComponent(telegramShareText)}`;

  return (
    <div
      id="reservation-modal-overlay"
      className="fixed inset-0 z-50 bg-[#0C0A08]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#13100D] border border-[#29231D] max-w-xl w-full max-h-[90dvh] overflow-y-auto rounded-sm p-5 sm:p-10 text-[#F5F1EA] shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          id="close-reservation-modal-btn"
          aria-label={t('reserveModal.closeAria', 'Muloqot oynasini yopish')}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-[#D5C9B3]/60 hover:text-[#FCFAF7] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(197,160,89,0.25)]">
                <img src="/logo-mark.svg" alt="Gusto Logo" className="w-full h-full object-contain" width="44" height="44" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-3 h-[1px] bg-[#C59853]" />
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] font-sans">
                    {t('reserveModal.conciergeBadge', 'Joy band qilish xizmati')}
                  </p>
                </div>
                <h3 className="font-serif text-xl sm:text-3xl text-[#FCFAF7] font-normal leading-tight">
                  {t('reserveModal.title', 'Stol band qilish')}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#D5C9B3]/80 font-light mb-5 sm:mb-7">
              {t(
                'reserveModal.description',
                "Qahvaxonamizda o'zingizga qulay joyni oldindan band qiling. Sokin muhit, shinam burchaklar va xushmuomala xizmat."
              )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              {/* Location Select */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-2 font-sans">
                  {t('reserveModal.selectSpaceLabel', 'Makonni tanlang')}
                </label>
                <div
                  className={`grid grid-cols-1 ${CAFE_LOCATIONS.length > 1 ? 'sm:grid-cols-2' : ''
                    } gap-2.5`}
                >
                  {CAFE_LOCATIONS.map((loc) => (
                    <button
                      type="button"
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`p-3 text-left border rounded-sm text-xs transition-all min-h-[44px] ${selectedLocation === loc.id
                        ? 'border-[#C59853] bg-[#1C1713] text-[#FCFAF7]'
                        : 'border-[#29231D] bg-[#0E0C09] text-[#D5C9B3]/60 hover:border-[#3E362D]'
                        }`}
                    >
                      <p className="font-serif text-sm font-medium">{loc.name}</p>
                      <p className="text-[10px] text-[#D5C9B3]/50 truncate">{loc.district}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Type */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-2 font-sans">
                  {t('reserveModal.intentLabel', 'Tashrif maqsadi')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {experiences.map((exp) => (
                    <button
                      type="button"
                      key={exp.id}
                      onClick={() => setExperience(exp.id)}
                      className={`p-2.5 text-center border rounded-sm text-xs sm:text-[11px] font-sans transition-all min-h-[44px] flex items-center justify-center ${experience === exp.id
                        ? 'border-[#C59853] bg-[#C59853]/15 text-[#DDB475]'
                        : 'border-[#29231D] bg-[#0E0C09] text-[#D5C9B3]/60 hover:border-[#3E362D]'
                        }`}
                    >
                      {exp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Presets and Custom Date Picker */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-2 font-sans">
                  {t('reserveModal.dateLabel', 'Sana')}
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setDateType('today')}
                    className={`py-2 px-2 text-center border rounded-sm text-xs font-sans transition-all min-h-[42px] flex items-center justify-center gap-1.5 ${
                      dateType === 'today'
                        ? 'border-[#C59853] bg-[#C59853]/15 text-[#DDB475] font-medium'
                        : 'border-[#29231D] bg-[#0E0C09] text-[#D5C9B3]/70 hover:border-[#3E362D]'
                    }`}
                  >
                    <span>{t('reserveModal.today', 'Bugun')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDateType('tomorrow')}
                    className={`py-2 px-2 text-center border rounded-sm text-xs font-sans transition-all min-h-[42px] flex items-center justify-center gap-1.5 ${
                      dateType === 'tomorrow'
                        ? 'border-[#C59853] bg-[#C59853]/15 text-[#DDB475] font-medium'
                        : 'border-[#29231D] bg-[#0E0C09] text-[#D5C9B3]/70 hover:border-[#3E362D]'
                    }`}
                  >
                    <span>{t('reserveModal.tomorrow', 'Ertaga')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDateType('custom')}
                    className={`py-2 px-2 text-center border rounded-sm text-xs font-sans transition-all min-h-[42px] flex items-center justify-center gap-1.5 ${
                      dateType === 'custom'
                        ? 'border-[#C59853] bg-[#C59853]/15 text-[#DDB475] font-medium'
                        : 'border-[#29231D] bg-[#0E0C09] text-[#D5C9B3]/70 hover:border-[#3E362D]'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{t('reserveModal.customDate', 'Boshqa')}</span>
                  </button>
                </div>

                {dateType === 'custom' && (
                  <div className="relative mt-2">
                    <input
                      type="date"
                      min={todayIso}
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      aria-label={t('reserveModal.dateLabel', 'Sana')}
                      className="w-full min-h-[44px] bg-[#0E0C09] border border-[#C59853] rounded-sm px-3.5 py-2 text-xs text-[#F5F1EA] focus:outline-none [color-scheme:dark]"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Time and Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-1.5 font-sans flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#C59853]" />
                    <span>{t('reserveModal.timeLabel', 'Vaqt')} (08:00 — 02:00)</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    aria-label={t('reserveModal.timeLabel', 'Vaqt')}
                    className="w-full min-h-[44px] bg-[#0E0C09] border border-[#29231D] rounded-sm px-3 py-2 text-xs text-[#F5F1EA] focus:outline-none focus:border-[#C59853] cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#13100D] text-[#F5F1EA]">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-1.5 font-sans">
                    {t('reserveModal.partyLabel', 'Mehmonlar soni')}
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    aria-label={t('reserveModal.partyLabel', 'Mehmonlar soni')}
                    className="w-full min-h-[44px] bg-[#0E0C09] border border-[#29231D] rounded-sm px-3 py-2 text-xs text-[#F5F1EA] focus:outline-none focus:border-[#C59853] cursor-pointer"
                  >
                    {guestOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#13100D] text-[#F5F1EA]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details with Validation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-1.5 font-sans">
                    {t('reserveModal.nameLabel', 'Ismingiz')} *
                  </label>
                  <input
                    type="text"
                    id="reservation-name-input"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (nameTouched) {
                        setNameError(e.target.value.trim().length < 2);
                      }
                    }}
                    onBlur={() => {
                      setNameTouched(true);
                      setNameError(name.trim().length < 2);
                    }}
                    placeholder={t('reserveModal.namePlaceholder', 'Masalan: Alisher')}
                    aria-invalid={nameError}
                    aria-describedby={nameError ? 'reservation-name-error' : undefined}
                    className={`w-full min-h-[44px] bg-[#0E0C09] border ${
                      nameError ? 'border-red-500/80 focus:border-red-500' : 'border-[#29231D] focus:border-[#C59853]'
                    } rounded-sm px-3.5 py-2.5 text-xs text-[#F5F1EA] placeholder-[#D5C9B3]/30 focus:outline-none transition-colors`}
                    required
                  />
                  {nameError && (
                    <p id="reservation-name-error" className="flex items-center gap-1 text-[11px] text-red-400 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{t('reserveModal.nameError', 'Ismingizni kiriting')}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D5C9B3]/70 mb-1.5 font-sans">
                    {t('reserveModal.phoneLabel', 'Telefon raqamingiz')} *
                  </label>
                  <input
                    type="tel"
                    id="reservation-phone-input"
                    value={phone}
                    onChange={(e) => {
                      const formatted = formatUzPhone(e.target.value);
                      setPhone(formatted);
                      if (phoneTouched) {
                        setPhoneError(!isValidUzPhone(formatted));
                      }
                    }}
                    onBlur={() => {
                      setPhoneTouched(true);
                      setPhoneError(!isValidUzPhone(phone));
                    }}
                    placeholder="+998 (90) 000-00-00"
                    aria-invalid={phoneError}
                    aria-describedby={phoneError ? 'reservation-phone-error' : undefined}
                    className={`w-full min-h-[44px] bg-[#0E0C09] border ${
                      phoneError ? 'border-red-500/80 focus:border-red-500' : 'border-[#29231D] focus:border-[#C59853]'
                    } rounded-sm px-3.5 py-2.5 text-xs text-[#F5F1EA] placeholder-[#D5C9B3]/30 focus:outline-none transition-colors`}
                    required
                  />
                  {phoneError && (
                    <p id="reservation-phone-error" className="flex items-center gap-1 text-[11px] text-red-400 mt-1 font-sans">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{t('reserveModal.phoneError', "Telefon raqamini to'liq kiriting (+998 XX XXX-XX-XX)")}</span>
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                id="submit-reservation-btn"
                disabled={isSending}
                className="w-full min-h-[48px] py-3.5 sm:py-4 mt-4 rounded-full bg-[#F5F1EA] text-[#0C0A08] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#DDB475] transition-colors shadow-lg active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isSending ? (
                  <span>{t('reserveModal.sending', 'Yuborilmoqda...')}</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#0C0A08]" />
                    <span>{t('reserveModal.confirmBtn', 'Band qilishni tasdiqlash')}</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-[#D5C9B3]/50 text-center font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                <span>Ariza @gustobronbot orqali qahvaxona guruhiga yo'naltiriladi</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-5 sm:py-7">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C59853]/15 border border-[#C59853] flex items-center justify-center mx-auto mb-3.5 sm:mb-4 text-[#DDB475]">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C59853] block mb-1.5 font-sans font-medium">
              {autoDeliveryFailed
                ? t('reserveModal.successBadgeManual', 'Buyurtma yozib olindi')
                : t('reserveModal.successBadge', 'Buyurtma qabul qilindi')}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#FCFAF7] mb-2.5">
              {t('reserveModal.successTitle', 'Sizni kutamiz!')}
            </h3>

            <p className="text-xs sm:text-sm text-[#D5C9B3]/80 font-light max-w-sm mx-auto mb-5 leading-relaxed">
              {t('reserveModal.thanks', 'Tashakkur')},{' '}
              <strong className="text-[#FCFAF7] font-medium">{name || t('reserveModal.guestFallback', 'Mehmon')}</strong>.{' '}
              {t('reserveModal.tableBooked', 'Joy')}{' '}
              <span className="text-[#DDB475]">{currentLocationName}</span>{' '}
              {t('reserveModal.confirmedFor', 'vaqti uchun band qilindi:')} {time}, {effectiveBookingDate} (
              {guests} {t('reserveModal.guestsCount', 'kishi')}).
            </p>

            {/* Telegram Bot Dispatch Actions */}
            <div className="bg-[#0E0C09] border border-[#29231D] p-3.5 sm:p-4 rounded-sm max-w-md mx-auto text-xs text-[#D5C9B3]/75 mb-5 text-left space-y-2">
              <div className="flex items-center justify-between border-b border-[#241E18] pb-2">
                <span className="text-[10px] uppercase tracking-wider text-[#C59853] font-semibold flex items-center gap-1.5">
                  <Send className="w-3 h-3" />
                  <span>Telegram xabarnomasi</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#C59853]/15 text-[#DDB475] border border-[#C59853]/30">
                  @gustobronbot
                </span>
              </div>
              {autoDeliveryFailed && (
                <p className="text-amber-400/90 font-medium">
                  {t(
                    'reserveModal.autoDeliveryFailed',
                    "Avtomatik yuborishda xatolik bo'ldi — pastdagi tugma orqali qo'lda yuboring yoki bizga qo'ng'iroq qiling."
                  )}
                </p>
              )}
              <p>• {t('reserveModal.intentLabel', 'Tashrif maqsadi')}: {currentExpLabel}</p>
              <p>• {t('reserveModal.smsNotice', 'Aloqa raqami')}: {phone || '+998 ** *** ** **'}</p>
              <p>• {t('hero.locationLabel', 'Manzil')}: {BRAND_CONTACTS.address}</p>
              <p>• {t('hero.currentLotLabel', 'Ish tartibi')}: {BRAND_CONTACTS.hours}</p>
            </div>

            {/* Fast Telegram Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 max-w-md mx-auto mb-6">
              <a
                href={BRAND_CONTACTS.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Botda ochish (@gustobronbot)</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2.5 rounded-full bg-[#18130E] border border-[#C59853]/60 text-[#DDB475] hover:bg-[#C59853] hover:text-[#0C0A08] text-xs uppercase tracking-[0.12em] font-medium transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Bronni Telegramda ulashish</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="min-h-[40px] px-6 py-2 rounded-full border border-[#29231D] text-[#D5C9B3]/80 text-[11px] uppercase tracking-[0.16em] hover:text-[#FCFAF7] hover:border-[#C59853] transition-colors cursor-pointer"
            >
              {t('reserveModal.returnBtn', 'Bosh sahifaga qaytish')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

