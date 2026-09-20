export type LocalizedText = {
  uz: string;
  ru: string;
  en: string;
};

export interface SignatureProduct {
  id: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  origin: LocalizedText;
  process: LocalizedText;
  elevation: string;
  notes: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  description: LocalizedText;
  roastLevel: 'Light-Medium' | 'Medium' | 'Medium-Dark';
  price: string;
  image: string;
  cupVolume?: string;
  pairing?: LocalizedText;
  badge?: LocalizedText;
}

export interface CraftStep {
  number: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  detailPoints: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  metricLabel: LocalizedText;
  metricValue: string;
  image: string;
}

export type MenuCategoryId =
  | 'molochniy'
  | 'moxito'
  | 'muzli-kofe'
  | 'issiq-kofe'
  | 'ne-kofe'
  | 'sharbatlar'
  | 'mevali-choy'
  | 'oddiy-choy'
  | 'qoshimchalar'
  | 'hot-dog';

export interface MenuCategoryMeta {
  id: MenuCategoryId;
  name: LocalizedText;
  shortLabel: LocalizedText;
}

export interface MenuItem {
  id: string;
  name: LocalizedText;
  category: MenuCategoryId;
  description: LocalizedText;
  tastingNotes?: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  price: string;
  originOrStyle?: LocalizedText;
  dietary?: LocalizedText;
}

export interface CafeLocation {
  id: string;
  name: string;
  type: LocalizedText;
  address: string;
  city: string;
  district: string;
  hoursWeekday: LocalizedText;
  hoursWeekend: LocalizedText;
  status: LocalizedText;
  isOpenNow: boolean;
  phone: string;
  email: string;
  features: {
    uz: string[];
    ru: string[];
    en: string[];
  };
  image: string;
  mapCoordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
  yandexMapsUrl?: string;
  telegramGroup?: string;
  telegramBot?: string;
}

export interface GalleryImage {
  id: string;
  title: LocalizedText;
  caption: LocalizedText;
  category: string;
  aspect: string;
  image: string;
}
