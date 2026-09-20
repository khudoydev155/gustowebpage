import {
  SignatureProduct,
  CraftStep,
  MenuItem,
  MenuCategoryMeta,
  CafeLocation,
  GalleryImage,
} from '../types';

export const SIGNATURE_PRODUCTS: SignatureProduct[] = [
  {
    id: 'halva-raf',
    name: {
      uz: 'Xolvali Raf',
      ru: 'Раф с халвой',
      en: 'Halva Raf Coffee',
    },
    subtitle: {
      uz: 'Sharqona shirinlik va nozik qaymoq uyg‘unligi',
      ru: 'Восточная сладость и нежные взбитые сливки',
      en: 'Velvety cream spun with artisanal halva',
    },
    origin: {
      uz: 'Gusto Roasters',
      ru: 'Обжарка Gusto',
      en: 'Gusto Roasters',
    },
    process: {
      uz: 'Klassik qaymoqli ekstraksiya',
      ru: 'Сливочная экстракция',
      en: 'Cream steam extraction',
    },
    elevation: '1,950 MASL',
    notes: {
      uz: ['Tabiiy holva', 'Issiq qaymoq', 'Vanil', 'Yong‘oq'],
      ru: ['Натуральная халва', 'Горячие сливки', 'Ваниль', 'Орех'],
      en: ['Artisanal Halva', 'Warm Cream', 'Vanilla', 'Sweet Nut'],
    },
    description: {
      uz: 'Espresso bilan birga bir vaqtda ko‘pirtirilgan issiq qaymoq va nozik maydalangan tabiiy holva bo‘lakchalari. Boy, to‘yimli va unutilmas shirin ta’m.',
      ru: 'Эспрессо, взбитый одновременно с горячими сливками и тонко измельчённой восточной халвой. Густой, насыщенный и неповторимый десертный вкус.',
      en: 'A signature creation of double espresso steamed together with fresh light cream and delicate crushed artisanal halva for an unforgettable silky finish.',
    },
    roastLevel: 'Medium',
    price: "35 000 so'm",
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=1200&q=85',
    cupVolume: '320 ml',
    pairing: {
      uz: 'Shokoladli pishiriqlar yoki issiq qatlama pechenye',
      ru: 'Шоколадная выпечка или хрустящее печенье',
      en: 'Warm chocolate pastry or crisp shortbread',
    },
    badge: {
      uz: 'Eng mashhur',
      ru: 'Хит продаж',
      en: 'House Signature',
    },
  },
  {
    id: 'flat-white',
    name: {
      uz: 'Flat White',
      ru: 'Флэт Уайт',
      en: 'Artisan Flat White',
    },
    subtitle: {
      uz: 'Ikki hissa kuchli espresso va yupqa mikro-ko‘pik',
      ru: 'Двойной шот эспрессо и тонкая микропенка',
      en: 'Double espresso with glossy micro-textured milk',
    },
    origin: {
      uz: 'Efiopiya Guji & Kolumbiya Huila',
      ru: 'Эфиопия Гуджи и Колумбия Уила',
      en: 'Ethiopia Guji & Colombia Huila',
    },
    process: {
      uz: 'Yuvilgan usul / Toza profil',
      ru: 'Мытая обработка / Чистый профиль',
      en: 'Fully Washed / Clean Profile',
    },
    elevation: '2,100 MASL',
    notes: {
      uz: ['Qora shokolad', 'Qovurilgan finduq', 'Sutli karamel'],
      ru: ['Тёмный шоколад', 'Жареный фундук', 'Сливочная карамель'],
      en: ['Dark Cocoa', 'Roasted Hazelnut', 'Caramel Milk'],
    },
    description: {
      uz: 'Toza ikki hissa espresso ekstraksiyasi ustiga nozik ipakday silliq mikro-ko‘pikli barra sut quyiladi. Kuchli qahva ta’mi va baxmalsifat mayinlik.',
      ru: 'Плотный двойной эспрессо с тонким глянцевым слоем микропенки цельного молока. Яркий кофейный баланс с бархатной мягкостью.',
      en: 'A double ristretto folded into velvety steamed milk with a minimalist micro-foam top, emphasizing full bean character and gentle sweetness.',
    },
    roastLevel: 'Medium',
    price: "25 000 so'm",
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1200&q=85',
    cupVolume: '220 ml',
    pairing: {
      uz: 'Klassik kruassan yoki bodomli desert',
      ru: 'Французский круассан или миндальный десерт',
      en: 'Fresh butter croissant or almond cake',
    },
    badge: {
      uz: 'Barista tavsiyasi',
      ru: 'Выбор бариста',
      en: 'Barista Choice',
    },
  },
  {
    id: 'ice-latte',
    name: {
      uz: 'Ice Латте',
      ru: 'Айс Латте',
      en: 'Craft Iced Latte',
    },
    subtitle: {
      uz: 'Muzli barra sut ustiga sekin quyilgan espresso',
      ru: 'Охлаждённое молоко с мягким слоем свежего эспрессо',
      en: 'Chilled milk crowned with slow-dripped espresso',
    },
    origin: {
      uz: 'Markaziy Amerika & Sharqiy Afrika',
      ru: 'Центральная Америка и Восточная Африка',
      en: 'Central America & East Africa',
    },
    process: {
      uz: 'Muzli sekin quyish usuli',
      ru: 'Холодное медленное наливание',
      en: 'Layered Ice Pour',
    },
    elevation: '1,800 MASL',
    notes: {
      uz: ['Muzdek sut', 'Espresso qatlami', 'Karamel', 'Yengil vanil'],
      ru: ['Холодное молоко', 'Слой эспрессо', 'Карамель', 'Ваниль'],
      en: ['Cold Whole Milk', 'Floating Espresso', 'Creamy Toffee', 'Vanilla'],
    },
    description: {
      uz: 'Kristall toza muz va sovuq barra sut ustiga yangi tortilgan espresso sekin quyiladi. Qatlamli ko‘rinish va tetiklashtiruvchi yengil qahva lazzati.',
      ru: 'Очищенный кристальный лёд, охлаждённое цельное молоко и тонкий слой свежего ароматного эспрессо. Идеально освежающий кофейный баланс.',
      en: 'Slowly poured double espresso over ice cubes and chilled whole milk, giving a serene gradient layer and refreshing summer balance.',
    },
    roastLevel: 'Medium',
    price: "30 000 so'm",
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=85',
    cupVolume: '350 ml',
    pairing: {
      uz: 'Yengil mevali pishiriq yoki mini hot-dog',
      ru: 'Легкий десерт или мини хот-дог',
      en: 'Light fruit tart or warm savory snack',
    },
    badge: {
      uz: 'Muzli tanlov',
      ru: 'Летний хит',
      en: 'Iced Specialty',
    },
  },
  {
    id: 'strawberry-mojito',
    name: {
      uz: 'Qulupnayli Moxito',
      ru: 'Клубничный мохито',
      en: 'Strawberry Mojito Refresher',
    },
    subtitle: {
      uz: 'Yangi qulupnay, yalpiz, laym va muzdek salqinlik',
      ru: 'Свежая клубника, мята, лайм и содовая со льдом',
      en: 'Garden strawberry, fresh mint, lime & sparkling soda',
    },
    origin: {
      uz: 'Tabiiy mevali bar',
      ru: 'Натуральный фруктовый бар',
      en: 'Fresh Artisan Bar',
    },
    process: {
      uz: 'Yangi ezilgan mevalar va yalpiz ekstrakti',
      ru: 'Свежевыжатые ягоды с листьями мяты',
      en: 'Hand-Muddled Fruit & Herb',
    },
    elevation: 'Showroom Fresh',
    notes: {
      uz: ['Shirin qulupnay', 'Yangi yalpiz', 'Laym nordonligi', 'Muz'],
      ru: ['Спелая клубника', 'Свежая мята', 'Цитрусовый лайм', 'Лёд'],
      en: ['Garden Berry', 'Crushed Mint', 'Citrus Lime', 'Sparkling Chill'],
    },
    description: {
      uz: 'Yangi uzilgan shirin qulupnay, barra yalpiz barglari va yangi laym sharbati bilan tayyorlanadigan tetiklashtiruvchi salqin ichimlik.',
      ru: 'Сочные ягоды клубники, свежесорванная перечная мята и дольки лайма со льдом и содовой. Настоящая ягодная свежесть.',
      en: 'Freshly muddled fragrant strawberries, fresh mint leaves, tart citrus lime wheels, and sparkling chilled mineral water poured over crushed ice.',
    },
    roastLevel: 'Light-Medium',
    price: "35 000 so'm",
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=85',
    cupVolume: '400 ml',
    pairing: {
      uz: 'Shirin pishiriqlar yoki qarsildoq mini hot-dog',
      ru: 'Выпечка или горячий хот-дог',
      en: 'Savory hot-dog or afternoon snack',
    },
    badge: {
      uz: 'Salqin mevali',
      ru: 'Освежающий',
      en: 'Chilled Refresher',
    },
  },
];

export const CRAFT_STEPS: CraftStep[] = [
  {
    number: '01',
    title: {
      uz: 'Saralash',
      ru: 'Отбор',
      en: 'Ingredient Selection',
    },
    subtitle: {
      uz: 'Faqat toza va sifatli ingredientlar',
      ru: 'Только свежие натуральные продукты',
      en: 'Pure origin & pristine farm supply',
    },
    description: {
      uz: 'Biz har bir ichimlik uchun faqat toza va sinalgan xomashyolardan foydalanamiz: barra sut, yangi mevalar, tabiiy asal va sifatli qahva donlari.',
      ru: 'Для каждого напитка мы используем только свежее молоко, натуральный мёд, отборные фрукты и проверенные кофейные зерна.',
      en: 'We source verified single-origin beans, fresh farm milk, golden unfiltered honey, and market-fresh berries and herbs every single morning.',
    },
    detailPoints: {
      uz: [
        'Har kuni yangi keltirilgan barra sut',
        'Tabiiy asal va toza siroplar',
        'Yangi uzilgan meva va sabzavotlar',
      ],
      ru: [
        'Ежедневные поставки свежего молока',
        'Натуральный горный мёд и сиропы',
        'Свежие фрукты и ягоды для фрешей',
      ],
      en: [
        'Daily fresh cold-chain whole milk delivery',
        'Wildflower honey & pure fruit purees',
        'Hand-inspected orchard fruits and fresh herbs',
      ],
    },
    metricLabel: {
      uz: 'Sifat nazorati',
      ru: 'Контроль свежести',
      en: 'Quality Standard',
    },
    metricValue: '100% Tabiiy',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=85',
  },
  {
    number: '02',
    title: {
      uz: 'Tayyorlash',
      ru: 'Приготовление',
      en: 'Artisan Extraction',
    },
    subtitle: {
      uz: 'Aniq me’yor va professional uskunalar',
      ru: 'Точная калибровка и баланс',
      en: 'Calibrated weight and water thermodynamics',
    },
    description: {
      uz: 'Espresso mashinamiz bosimi va harorati qat’iy kalibrlanadi. Har bir finjon uchun qahva grammi va suv oqimi soniyagacha hisoblanadi.',
      ru: 'Температура и давление оборудования выверены до десятых долей. Каждая порция эспрессо готовится по строгим стандартам бариста.',
      en: 'Extraction parameters are dialed in continuously across the day, ensuring consistent crema, aromatic depth, and balance across all coffee drinks.',
    },
    detailPoints: {
      uz: [
        'Har bir porsiya uchun yangi maydalash',
        '92.5°C barqaror suv harorati',
        'Baxmalsifat silliq mikro-ko‘pik',
      ],
      ru: [
        'Свежий помол перед каждым приготовлением',
        'Стабильная температура воды 92.5°C',
        'Глянцевая микропенка цельного молока',
      ],
      en: [
        'Dosed and ground on demand per order',
        'Stable 92.5°C multi-boiler temperature',
        'Dense, micro-textured glossy foam',
      ],
    },
    metricLabel: {
      uz: 'Ekstraksiya harorati',
      ru: 'Температура заваривания',
      en: 'Extraction Temp',
    },
    metricValue: '92.5 °C',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    number: '03',
    title: {
      uz: 'Mehmondo‘stlik',
      ru: 'Гостеприимство',
      en: 'Warm Hospitality',
    },
    subtitle: {
      uz: 'Shinam muhit va iliq munosabat',
      ru: 'Уютная атмосфера и забота',
      en: 'Generous service and tactile comfort',
    },
    description: {
      uz: 'Bizda har bir mehmon qadrlidir. Shoshilmasdan sokin suhbat qurish, do‘stlar davrasida o‘tirish yoki sevimli kitob mutolaasi uchun eng ma’qul joy.',
      ru: 'В Gusto важен каждый гость. Здесь созданы все условия для спокойной беседы, продуктивной работы или душевного отдыха за любимым напитком.',
      en: 'Our showroom is designed as a peaceful sanctuary where guests can pause, connect, and enjoy coffee and food prepared with care and respect.',
    },
    detailPoints: {
      uz: [
        'Yorug‘ va keng o‘tirish joylari',
        'Tez va samimiy xizmat ko‘rsatish',
        'Har kuni tungi soat 2:00 gacha ochiq',
      ],
      ru: [
        'Просторный зал и удобные столики',
        'Быстрое и внимательное обслуживание',
        'Открыты ежедневно до 2:00 ночи',
      ],
      en: [
        'Spacious seating with natural textures',
        'Attentive, unhurried table service',
        'Open daily until 2:00 AM',
      ],
    },
    metricLabel: {
      uz: 'Ish vaqti',
      ru: 'Режим работы',
      en: 'Daily Hours',
    },
    metricValue: '8:00 — 02:00',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85',
  },
  {
    number: '04',
    title: {
      uz: 'Turfa ta’mlar',
      ru: 'Разнообразие',
      en: 'Diverse Carte',
    },
    subtitle: {
      uz: '10 toifadagi boy menyu',
      ru: '10 категорий изысканных напитков',
      en: '10 categories of handcrafted beverages',
    },
    description: {
      uz: 'Issiq va sovuq qahvalardan tortib, mevali choylar, to‘yimli kokteyllar, yangi siqilgan sharbatlar va issiq hot-doglargacha boy tanlov.',
      ru: 'От классического горячего кофе до натуральных фрешей, ягодных чаев, сытных молочных коктейлей и хрустящих горячих хот-догов.',
      en: 'From velvety hot and iced espressos to natural fresh-pressed juices, therapeutic fruit and herbal infusions, shakes, and warm hot dogs.',
    },
    detailPoints: {
      uz: [
        '45 xil original taom va ichimlik',
        'Bolalar va kattalar uchun keng tanlov',
        'Mavsumiy yangi reseptlar',
      ],
      ru: [
        '45 позиций меню для любого настроения',
        'Напитки для детей и взрослых',
        'Свежие сезонные авторские вкусы',
      ],
      en: [
        '45 distinct drinks and bites',
        'Non-coffee, fruity, and savory choices',
        'Consistent pricing in local currency',
      ],
    },
    metricLabel: {
      uz: 'Menyu pozitsiyalari',
      ru: 'Позиций в меню',
      en: 'Total Menu Items',
    },
    metricValue: '45 Taom',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=85',
  },
];

export const MENU_CATEGORIES: MenuCategoryMeta[] = [
  {
    id: 'molochniy',
    name: {
      uz: 'Molochniy kokteyllar',
      ru: 'Молочные коктейли',
      en: 'Milkshakes & Smoothies',
    },
    shortLabel: {
      uz: 'Kokteyllar',
      ru: 'Коктейли',
      en: 'Shakes',
    },
  },
  {
    id: 'moxito',
    name: {
      uz: 'Moxito va salqin ichimliklar',
      ru: 'Мохито и прохладительные',
      en: 'Mojitos & Refreshers',
    },
    shortLabel: {
      uz: 'Moxito',
      ru: 'Мохито',
      en: 'Mojitos',
    },
  },
  {
    id: 'muzli-kofe',
    name: {
      uz: 'Muzli kofe',
      ru: 'Холодный кофе',
      en: 'Iced Coffee',
    },
    shortLabel: {
      uz: 'Muzli kofe',
      ru: 'Айс кофе',
      en: 'Iced Coffee',
    },
  },
  {
    id: 'issiq-kofe',
    name: {
      uz: 'Issiq kofe',
      ru: 'Горячий кофе',
      en: 'Hot Coffee',
    },
    shortLabel: {
      uz: 'Issiq kofe',
      ru: 'Горячий кофе',
      en: 'Hot Coffee',
    },
  },
  {
    id: 'ne-kofe',
    name: {
      uz: 'Kofe bo‘lmagan issiq ichimliklar',
      ru: 'Не кофе (Горячие)',
      en: 'Non-Coffee Warm Drinks',
    },
    shortLabel: {
      uz: 'Ne kofe',
      ru: 'Не кофе',
      en: 'Non-Coffee',
    },
  },
  {
    id: 'sharbatlar',
    name: {
      uz: 'Meva va sabzavot sharbatlari (Fresh)',
      ru: 'Натуральные соки / Фреш',
      en: 'Fresh Squeezed Juices',
    },
    shortLabel: {
      uz: 'Sharbatlar',
      ru: 'Фреши',
      en: 'Fresh Juices',
    },
  },
  {
    id: 'mevali-choy',
    name: {
      uz: 'Meva va o‘tli choylar',
      ru: 'Фруктовые и травяные чаи',
      en: 'Fruit & Herbal Teas',
    },
    shortLabel: {
      uz: 'Mevali choy',
      ru: 'Фруктовый чай',
      en: 'Fruit Teas',
    },
  },
  {
    id: 'oddiy-choy',
    name: {
      uz: 'Oddiy choy',
      ru: 'Традиционные чаи',
      en: 'Traditional Teas',
    },
    shortLabel: {
      uz: 'Choy',
      ru: 'Чай',
      en: 'Teas',
    },
  },
  {
    id: 'qoshimchalar',
    name: {
      uz: 'Qo‘shimchalar',
      ru: 'Добавки и топпинги',
      en: 'Additions & Syrups',
    },
    shortLabel: {
      uz: 'Qo‘shimchalar',
      ru: 'Добавки',
      en: 'Add-ons',
    },
  },
  {
    id: 'hot-dog',
    name: {
      uz: 'Hot-dog',
      ru: 'Хот-доги',
      en: 'Artisan Hot Dogs',
    },
    shortLabel: {
      uz: 'Hot-dog',
      ru: 'Хот-доги',
      en: 'Hot Dogs',
    },
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // 1. MOLOCHNIY KOKTEYLLAR (6 items)
  {
    id: 'banan-med',
    name: {
      uz: 'Banan + asal',
      ru: 'Банан + мёд',
      en: 'Banana & Honey',
    },
    category: 'molochniy',
    description: {
      uz: 'Yangi banan, tabiiy tog‘ asali va sovuq sutli quyuq to‘yimli kokteyl',
      ru: 'Свежий банан, натуральный горный мёд и густое цельное молоко',
      en: 'Ripe sweet banana blended with raw mountain honey and fresh creamy milk',
    },
    price: "35 000 so'm",
  },
  {
    id: 'banan',
    name: {
      uz: 'Banan',
      ru: 'Банан',
      en: 'Banana Shake',
    },
    category: 'molochniy',
    description: {
      uz: 'Klassik yangi banan va nozik qaymoqli sutli kokteyl',
      ru: 'Классический коктейль из спелых бананов и сливочного молока',
      en: 'Classic ripe banana whip with velvety chilled fresh milk',
    },
    price: "30 000 so'm",
  },
  {
    id: 'klubnika',
    name: {
      uz: 'Qulupnay',
      ru: 'Клубника',
      en: 'Strawberry Shake',
    },
    category: 'molochniy',
    description: {
      uz: 'Xushbo‘y qulupnay mevalari va muzdek barra sut uyg‘unligi',
      ru: 'Ароматная спелая клубника и охлаждённое свежее молоко',
      en: 'Fragrant sweet strawberries whipped with chilled fresh milk',
    },
    price: "35 000 so'm",
  },
  {
    id: 'snikers',
    name: {
      uz: 'Snikers',
      ru: 'Сникерс',
      en: 'Snickers Shake',
    },
    category: 'molochniy',
    description: {
      uz: 'Shokolad, qovurilgan yeryong‘oq va karamel bilan boyitilgan shirin kokteyl',
      ru: 'Насыщенный коктейль с молочным шоколадом, арахисом и карамелью',
      en: 'Decadent milkshake spun with milk chocolate, roasted peanuts, and caramel',
    },
    price: "35 000 so'm",
  },
  {
    id: 'oreo',
    name: {
      uz: 'Oreo',
      ru: 'Орео',
      en: 'Oreo Shake',
    },
    category: 'molochniy',
    description: {
      uz: 'Mashhur Oreo pechenyelari va vanilli kremli sut aralashmasi',
      ru: 'Хрустящее печенье Oreo со сливочно-ванильным молоком',
      en: 'Crushed Oreo cookies whipped into smooth vanilla cream milk',
    },
    price: "30 000 so'm",
  },
  {
    id: 'nutella',
    name: {
      uz: 'Nutella',
      ru: 'Нутелла',
      en: 'Nutella Shake',
    },
    category: 'molochniy',
    description: {
      uz: 'Haqiqiy Nutella shokolad-funduq pastasi bilan boyitilgan nozik kokteyl',
      ru: 'Нежный коктейль с оригинальной шоколадно-ореховой пастой Nutella',
      en: 'Silky milkshake infused with authentic hazelnut cocoa Nutella cream',
    },
    price: "40 000 so'm",
  },

  // 2. MOXITO (2 items)
  {
    id: 'klubnika-moxito',
    name: {
      uz: 'Qulupnayli moxito',
      ru: 'Клубничный мохито',
      en: 'Strawberry Mojito',
    },
    category: 'moxito',
    description: {
      uz: 'Yangi qulupnay, barra yalpiz barglari, laym sharbati va gazlangan muzdek salqinlik',
      ru: 'Свежая клубника, листья мяты, сок лайма и искрящаяся содовая со льдом',
      en: 'Fresh strawberries, crushed mint, fresh lime, and crisp sparkling soda',
    },
    price: "35 000 so'm",
  },
  {
    id: 'klassicheskiy-moxito',
    name: {
      uz: 'Klassik moxito',
      ru: 'Классический мохито',
      en: 'Classic Mojito',
    },
    category: 'moxito',
    description: {
      uz: 'Yangi yalpiz, laym bo‘laklari, shakar qiyomi va kolotiy muz',
      ru: 'Свежая перечная мята, лайм, тростниковый сироп и колотый лёд',
      en: 'Fresh garden mint sprigs, pressed lime, cane syrup, and crushed ice',
    },
    price: "35 000 so'm",
  },

  // 3. MUZLI KOFE (3 items)
  {
    id: 'ice-amerikano',
    name: {
      uz: 'Ice Americano',
      ru: 'Айс Американо',
      en: 'Iced Americano',
    },
    category: 'muzli-kofe',
    description: {
      uz: 'Yangi tortilgan boy espresso va toza muzli filtrlangan suv',
      ru: 'Двойной эспрессо со свежей очищенной водой со льдом',
      en: 'Fresh double shot espresso over cold filtered water and ice',
    },
    price: "25 000 so'm",
  },
  {
    id: 'ice-latte-item',
    name: {
      uz: 'Ice Latte',
      ru: 'Айс Латте',
      en: 'Iced Latte',
    },
    category: 'muzli-kofe',
    description: {
      uz: 'Muzli barra sut ustiga sekin quyilgan nozik espresso qatlami',
      ru: 'Охлаждённое свежее молоко с мягким слоем свежего эспрессо',
      en: 'Chilled whole milk poured over ice with a rich floating espresso crown',
    },
    price: "30 000 so'm",
  },
  {
    id: 'ice-kapuchino',
    name: {
      uz: 'Ice Cappuccino',
      ru: 'Айс Капучино',
      en: 'Iced Cappuccino',
    },
    category: 'muzli-kofe',
    description: {
      uz: 'Muzdek barra sut, boy espresso va nozik qalin sovuq ko‘pik',
      ru: 'Освежающий эспрессо с холодным молоком и плотной бархатной пенкой',
      en: 'Cold espresso blended with chilled milk and a dense, velvety cool foam',
    },
    price: "30 000 so'm",
  },

  // 4. ISSIQ KOFE (7 items)
  {
    id: 'amerikano',
    name: {
      uz: 'Americano',
      ru: 'Американо',
      en: 'Americano',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Klassik qaynoq suv va yangi tayyorlangan boy espresso ekstraksiyasi',
      ru: 'Классический горячий эспрессо с очищенной горячей водой',
      en: 'Bold espresso extraction stretched with hot filtered water',
    },
    price: "15 000 so'm",
  },
  {
    id: 'kapuchino',
    name: {
      uz: 'Cappuccino',
      ru: 'Капучино',
      en: 'Cappuccino',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Klassik espresso va ipakday silliq ko‘pirtirilgan issiq sut',
      ru: 'Классический эспрессо с шелковистой микропенкой цельного молока',
      en: 'Harmonious espresso topped with micro-textured steamed whole milk',
    },
    price: "25 000 so'm",
  },
  {
    id: 'latte-makiato',
    name: {
      uz: 'Latte Macchiato',
      ru: 'Латте Макиато',
      en: 'Latte Macchiato',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Ko‘p miqdordagi issiq barra sut va ustiga quyilgan nozik espresso qatlamlari',
      ru: 'Нежное горячее молоко с деликатным верхним слоем эспрессо',
      en: 'Steamed milk layered gently with an aromatic golden espresso pour',
    },
    price: "25 000 so'm",
  },
  {
    id: 'flet-uayt',
    name: {
      uz: 'Flat White',
      ru: 'Флэт Уайт',
      en: 'Flat White',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Ikki hissa kuchli espresso va yupqa baxmalsifat mikro-ko‘pikli sut',
      ru: 'Двойной шот эспрессо с тонким слоем бархатистого молока',
      en: 'Double ristretto topped with glossy, velvety thin micro-foam',
    },
    price: "25 000 so'm",
  },
  {
    id: 'mokkachino',
    name: {
      uz: 'Mochaccino',
      ru: 'Моккачино',
      en: 'Mochaccino',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Espresso, issiq quyuq shokolad va ko‘pirtirilgan sut uyg‘unligi',
      ru: 'Гармония эспрессо, горячего шоколада и нежного молока',
      en: 'Espresso layered with dark drinking chocolate and warm textured milk',
    },
    price: "25 000 so'm",
  },
  {
    id: 'raf',
    name: {
      uz: 'Raf',
      ru: 'Раф',
      en: 'Raf Coffee',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Espresso bilan birga bir vaqtda ko‘pirtirilgan issiq qaymoq va vanil',
      ru: 'Эспрессо, взбитый с горячими сливками и натуральной ванилью',
      en: 'Espresso steamed together with fresh light cream and bourbon vanilla',
    },
    price: "30 000 so'm",
  },
  {
    id: 'raf-s-xalvoy',
    name: {
      uz: 'Xolvali Raf',
      ru: 'Раф с халвой',
      en: 'Halva Raf',
    },
    category: 'issiq-kofe',
    description: {
      uz: 'Klassik qaymoqli raf va maydalangan sharqona holva bo‘lakchalari',
      ru: 'Нежнейший сливочный раф с натуральной восточной халвой',
      en: 'Velvety cream raf blended with delicate artisanal Eastern halva',
    },
    price: "35 000 so'm",
  },

  // 5. NE KOFE (1 item)
  {
    id: 'goryachiy-shokolad',
    name: {
      uz: 'Qaynoq shokolad',
      ru: 'Горячий шоколад',
      en: 'Hot Chocolate',
    },
    category: 'ne-kofe',
    description: {
      uz: 'Quyuq, issiq va lazzatli haqiqiy shokolad ichimligi',
      ru: 'Густой, согревающий и ароматный десертный шоколад',
      en: 'Rich, velvety melted European chocolate with deep cacao notes',
    },
    price: "25 000 so'm",
  },

  // 6. SHARBATLAR (FRESH) (6 items)
  {
    id: 'yabloko',
    name: {
      uz: 'Olma sharbati (Fresh)',
      ru: 'Свежевыжатый яблочный сок',
      en: 'Fresh Apple Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Yangi siqilgan tabiiy shirin va nordon olma sharbati',
      ru: 'Натуральный фреш из отборных сочных яблок',
      en: 'Freshly cold-pressed juice from crisp sweet and tart apples',
    },
    price: "25 000 so'm",
  },
  {
    id: 'morkov',
    name: {
      uz: 'Sabzi sharbati (Fresh)',
      ru: 'Свежевыжатый морковный сок',
      en: 'Fresh Carrot Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Yangi siqilgan shirin va vitaminli sabzi sharbati',
      ru: 'Свежий витаминный фреш из сладкой моркови',
      en: 'Cold-pressed natural sweet carrot juice packed with vitality',
    },
    price: "20 000 so'm",
  },
  {
    id: 'yabloko-morkov',
    name: {
      uz: 'Olma + Sabzi sharbati',
      ru: 'Яблоко - Морковь (Фреш)',
      en: 'Apple & Carrot Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Yangi olma va sabzi sharbatlarining muvozanatli tetiklantiruvchi miksi',
      ru: 'Сбалансированный свежевыжатый яблочно-морковный микс',
      en: 'Harmonious blend of freshly pressed crisp apple and sweet carrot',
    },
    price: "25 000 so'm",
  },
  {
    id: 'apelsin',
    name: {
      uz: 'Apelsin sharbati (Fresh)',
      ru: 'Свежевыжатый апельсиновый сок',
      en: 'Fresh Orange Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Yangi siqilgan quyoshli apelsin fresh sharbati',
      ru: 'Насыщенный цитрусовый фреш из спелых апельсинов',
      en: 'Sun-ripened oranges freshly squeezed to order with citrus aroma',
    },
    price: "35 000 so'm",
  },
  {
    id: 'apelsin-yabloko',
    name: {
      uz: 'Apelsin + Olma sharbati',
      ru: 'Апельсин - Яблоко (Фреш)',
      en: 'Orange & Apple Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Shirin olma va tetiklashtiruvchi apelsin yangi sharbatlari uyg‘unligi',
      ru: 'Освежающий цитрусово-яблочный свежевыжатый фреш',
      en: 'Vibrant freshly pressed duo of sunny citrus orange and sweet orchard apple',
    },
    price: "35 000 so'm",
  },
  {
    id: 'arbuz',
    name: {
      uz: 'Tarvuz sharbati (Fresh)',
      ru: 'Арбузный сок (Фреш)',
      en: 'Fresh Watermelon Juice',
    },
    category: 'sharbatlar',
    description: {
      uz: 'Muzdek va shirin tabiiy tarvuz sharbati',
      ru: 'Прохладный натуральный фреш из сладкого спелого арбуза',
      en: 'Chilled, naturally sweet watermelon nectar served over ice',
    },
    price: "20 000 so'm",
  },

  // 7. MEVALI CHOY (5 items)
  {
    id: 'imbirno-apelsinoviy',
    name: {
      uz: 'Zanjabil va apelsinli choy',
      ru: 'Имбирно-апельсиновый чай',
      en: 'Ginger & Orange Infusion',
    },
    category: 'mevali-choy',
    description: {
      uz: 'Yangi zanjabil, apelsin bo‘laklari va asal bilan damlangan issiq choy',
      ru: 'Согревающий сбор со свежим имбирём, апельсином и мёдом',
      en: 'Warming infusion of fresh ginger root, orange wheels, and wildflower honey',
    },
    price: "35 000 so'm",
  },
  {
    id: 'oblepixa-med',
    name: {
      uz: 'Oblepixa va asalli choy',
      ru: 'Облепиховый чай с мёдом',
      en: 'Sea Buckthorn & Honey',
    },
    category: 'mevali-choy',
    description: {
      uz: 'Tabiiy oblepixa mevalari va toza asal bilan damlangan xushbo‘y choy',
      ru: 'Натуральная облепиха с цветочным мёдом и пряностями',
      en: 'Golden sea buckthorn berries steeped with wildflower honey and spices',
    },
    price: "23 000 so'm",
  },
  {
    id: 'yagodniy',
    name: {
      uz: 'Rezavor mevali choy',
      ru: 'Ягодный чай',
      en: 'Wild Berry Infusion',
    },
    category: 'mevali-choy',
    description: {
      uz: 'O‘rmon rezavor mevalari bilan damlangan yoqimli nordon xushbo‘y choy',
      ru: 'Душистый сбор из лесных ягод с мягкой кислинкой',
      en: 'Fragrant blend of forest berries with a gentle tart floral note',
    },
    price: "23 000 so'm",
  },
  {
    id: 'blagorodniy-chabrec',
    name: {
      uz: 'Tog‘ chabresi choyi',
      ru: 'Благородный чабрец',
      en: 'Mountain Thyme Tea',
    },
    category: 'mevali-choy',
    description: {
      uz: 'Tog‘ chabresi (timyan) bilan damlangan sokinlashtiruvchi o‘tli choy',
      ru: 'Успокаивающий горный чабрец с глубоким травяным ароматом',
      en: 'Calming high-altitude mountain thyme and delicate herbal botanicals',
    },
    price: "23 000 so'm",
  },
  {
    id: 'yabloko-rozmarin',
    name: {
      uz: 'Olma va rozmarinli choy',
      ru: 'Яблоко с розмарином',
      en: 'Apple & Rosemary Tea',
    },
    category: 'mevali-choy',
    description: {
      uz: 'Yangi olma bo‘laklari va xushbo‘y rozmarin novdasi bilan damlangan choy',
      ru: 'Сочные яблоки, веточка розмарина и пряный травяной букет',
      en: 'Crisp apple slices infused with a fragrant sprig of fresh garden rosemary',
    },
    price: "23 000 so'm",
  },

  // 8. ODDIY CHOY (5 items)
  {
    id: 'cherniy-chay',
    name: {
      uz: 'Qora choy',
      ru: 'Чёрный чай',
      en: 'Classic Black Tea',
    },
    category: 'oddiy-choy',
    description: {
      uz: 'Klassik bargli qora choy, choynakda damlab tortiladi',
      ru: 'Классический листовой чёрный чай в чайнике',
      en: 'Full-bodied traditional loose-leaf black tea steeped in a ceramic pot',
    },
    price: "5 000 so'm",
  },
  {
    id: 'zeleniy-chay',
    name: {
      uz: 'Ko‘k choy',
      ru: 'Зелёный чай',
      en: 'Traditional Green Tea',
    },
    category: 'oddiy-choy',
    description: {
      uz: 'An’anaviy ko‘k choy, xushbo‘y va yengil ta’mli',
      ru: 'Традиционный освежающий зелёный чай мягкого вкуса',
      en: 'Delicate, fragrant loose green tea with a refreshing crisp profile',
    },
    price: "5 000 so'm",
  },
  {
    id: 'zhasmin-chay',
    name: {
      uz: 'Yasminli ko‘k choy',
      ru: 'Жасминовый чай',
      en: 'Jasmine Green Tea',
    },
    category: 'oddiy-choy',
    description: {
      uz: 'Yasmin gullari ifori bilan to‘yingan nozik ko‘k choy',
      ru: 'Отборный зелёный чай с лепестками ароматного жасмина',
      en: 'Tender green tea blossoms perfumed with real aromatic jasmine petals',
    },
    price: "10 000 so'm",
  },
  {
    id: 'chay-s-limonom',
    name: {
      uz: 'Limonli choy (ko‘k / qora)',
      ru: 'Чай с лимоном (зелёный / чёрный)',
      en: 'Lemon Tea (Green / Black)',
    },
    category: 'oddiy-choy',
    description: {
      uz: 'Yangi limon bo‘laklari bilan damlangan ko‘k yoki qora choy',
      ru: 'Чёрный или зелёный чай со свежими ломтиками лимона',
      en: 'Freshly brewed black or green tea with hand-cut citrus lemon wheels',
    },
    price: "15 000 so'm",
  },
  {
    id: 'bardak-chay',
    name: {
      uz: 'Bardak choy',
      ru: 'Бардак чай',
      en: 'Bardak Glass Tea',
    },
    category: 'oddiy-choy',
    description: {
      uz: 'Sharqona shisha bardak stakanda tortiladigan qaynoq quyuq qora choy',
      ru: 'Крепкий восточный чёрный чай в традиционном стеклянном стакане армуд',
      en: 'Robust Turkish-style hot black tea served in a traditional curved glass',
    },
    price: "7 000 so'm",
  },

  // 9. QO'SHIMCHALAR (5 items)
  {
    id: 'sirop',
    name: {
      uz: 'Sirop',
      ru: 'Сироп',
      en: 'Flavor Syrup',
    },
    category: 'qoshimchalar',
    description: {
      uz: 'Qahva va ichimliklar uchun xilma-xil ta’mdagi sifatli siroplar',
      ru: 'Ароматные сиропы на выбор (карамель, ваниль, лесной орех)',
      en: 'Artisanal syrup shot (caramel, vanilla, or roasted hazelnut)',
    },
    price: "5 000 so'm",
  },
  {
    id: 'moloko',
    name: {
      uz: 'Sut',
      ru: 'Молоко',
      en: 'Extra Milk',
    },
    category: 'qoshimchalar',
    description: {
      uz: 'Ichimliklarga qo‘shimcha barra sut porsiyasi',
      ru: 'Дополнительная порция свежего цельного молока',
      en: 'Generous side portion of fresh whole steamed or chilled milk',
    },
    price: "5 000 so'm",
  },
  {
    id: 'limon',
    name: {
      uz: 'Limon',
      ru: 'Лимон',
      en: 'Fresh Lemon Slices',
    },
    category: 'qoshimchalar',
    description: {
      uz: 'Choy va ichimliklar uchun yangi kesilgan limon bo‘laklari',
      ru: 'Свежие сочные дольки лимона к чаю и напиткам',
      en: 'Freshly sliced fragrant citrus lemon wedges',
    },
    price: "5 000 so'm",
  },
  {
    id: 'myata',
    name: {
      uz: 'Yalpiz',
      ru: 'Мята',
      en: 'Fresh Mint',
    },
    category: 'qoshimchalar',
    description: {
      uz: 'Yangi terilgan xushbo‘y yalpiz barglari',
      ru: 'Свежие ароматные листочки садовой мяты',
      en: 'Hand-picked fragrant sprigs of garden fresh mint',
    },
    price: "5 000 so'm",
  },
  {
    id: 'med',
    name: {
      uz: 'Asal',
      ru: 'Мёд',
      en: 'Pure Honey',
    },
    category: 'qoshimchalar',
    description: {
      uz: 'Tabiiy toza tog‘ asali porsiyasi',
      ru: 'Порция натурального чистого горного мёда',
      en: 'Portion of pure unfiltered golden mountain honey',
    },
    price: "5 000 so'm",
  },

  // 10. HOT-DOG (5 items)
  {
    id: 'hot-dog-2x',
    name: {
      uz: 'Hot-dog (2x sosiska)',
      ru: 'Хот-дог (2x сосиски)',
      en: 'Hot Dog (2x Sausage)',
    },
    category: 'hot-dog',
    description: {
      uz: 'Ikkita sosiskali klassik issiq hot-dog, maxsus souslar va barra bulochka',
      ru: 'Классический горячий хот-дог с двумя сосисками и фирменными соусами',
      en: 'Classic warm hot dog with double sausage, toasted bun, and signature dressings',
    },
    price: "22 000 so'm",
  },
  {
    id: 'hot-dog-3x',
    name: {
      uz: 'Hot-dog (3x sosiska)',
      ru: 'Хот-дог (3x сосиски)',
      en: 'Hot Dog (3x Sausage)',
    },
    category: 'hot-dog',
    description: {
      uz: 'Uchta sosiskali to‘yimli issiq hot-dog, souslar va barra non bilan',
      ru: 'Сытный хот-дог с тремя сосисками, горчицей и фирменным соусом',
      en: 'Hearty hot dog loaded with triple sausage, savory mustard, and house relish',
    },
    price: "25 000 so'm",
  },
  {
    id: 'hot-dog-4x',
    name: {
      uz: 'Hot-dog (4x sosiska)',
      ru: 'Хот-дог (4x сосиски)',
      en: 'Mega Hot Dog (4x Sausage)',
    },
    category: 'hot-dog',
    description: {
      uz: 'To‘rtta sosiskali katta o‘lchamli to‘yimli mega hot-dog',
      ru: 'Большой сытный хот-дог с четырьмя сосисками для плотного перекуса',
      en: 'Oversized mega hot dog loaded with four sausages and savory toppings',
    },
    price: "28 000 so'm",
  },
  {
    id: 'hot-dog-mini',
    name: {
      uz: 'Hot-dog mini',
      ru: 'Хот-дог мини',
      en: 'Mini Hot Dog',
    },
    category: 'hot-dog',
    description: {
      uz: 'Kichik o‘lchamdagi yengil va mazali issiq mini hot-dog',
      ru: 'Компактный и лёгкий мини хот-дог для быстрого перекуса',
      en: 'Compact and light snack-sized mini hot dog served warm',
    },
    price: "15 000 so'm",
  },
  {
    id: 'hot-dog-mini-2x',
    name: {
      uz: 'Hot-dog mini (2x)',
      ru: 'Хот-дог мини (2x)',
      en: 'Mini Hot Dog (2x Sausage)',
    },
    category: 'hot-dog',
    description: {
      uz: 'Ikkita sosiskali ixcham va mazali mini hot-dog',
      ru: 'Небольшой хот-дог с двумя сосисками и соусом',
      en: 'Twin sausage mini hot dog with signature sauce on a soft bun',
    },
    price: "18 000 so'm",
  },
];

export const CAFE_LOCATIONS: CafeLocation[] = [
  {
    id: 'gusto-xonqa',
    name: 'Gusto Coffee Bar',
    type: {
      uz: 'Qahvaxona & Showroom',
      ru: 'Кофейня & Шоурум',
      en: 'Showroom & Coffee Bar',
    },
    address: "Xalqlar do'stligi ko'chasi, 3",
    city: 'Xonqa',
    district: "Jannatmakon MFY, Xalqlar do'stligi ko'chasi, 3, Xonqa tumani",
    hoursWeekday: {
      uz: 'Har kuni 8:00 AM — 2:00 AM',
      ru: 'Каждый день 8:00 AM — 2:00 AM',
      en: 'Every day 8:00 AM — 2:00 AM',
    },
    hoursWeekend: {
      uz: 'Har kuni 8:00 AM — 2:00 AM',
      ru: 'Каждый день 8:00 AM — 2:00 AM',
      en: 'Every day 8:00 AM — 2:00 AM',
    },
    status: {
      uz: 'Har kuni ochiq',
      ru: 'Открыто ежедневно',
      en: 'Open Daily',
    },
    isOpenNow: true,
    phone: '+998 93 287 54 84',
    email: 'info@gustocoffee.uz',
    features: {
      uz: [
        'Issiq va sovuq qahvalar',
        'Shinam va yorug‘ zallar',
        'Yangi tayyorlangan hot-doglar',
        'Meva va o‘tli choylar',
        'Tezkor xizmat ko‘rsatish',
      ],
      ru: [
        'Горячий и холодный кофе',
        'Уютный светлый зал',
        'Горячие свежие хот-доги',
        'Фруктовые и ягодные чаи',
        'Быстрое вежливое обслуживание',
      ],
      en: [
        'Artisanal Hot & Iced Coffee',
        'Comfortable Welcoming Seating',
        'Freshly Prepared Hot Dogs',
        'Herbal & Fruit Infusions',
        'Fast & Attentive Service',
      ],
    },
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    mapCoordinates: {
      lat: 41.4733533,
      lng: 60.7801969,
    },
    googleMapsUrl: 'https://maps.app.goo.gl/9XygkJ35KZSzZzg88',
    yandexMapsUrl: 'https://yandex.com/maps/org/gusto_coffee/24379307243?si=r00h1pdwv6vrdvjmgc3dfejjgg',
    telegramGroup: '-5392092158',
    telegramBot: '@gustobronbot',
  },
];

export const ATMOSPHERE_IMAGES: GalleryImage[] = [
  {
    id: 'espresso-focus',
    title: {
      uz: 'Ekstraksiya san’ati',
      ru: 'Искусство экстракции',
      en: 'Precision Extraction',
    },
    caption: {
      uz: 'Qora oltin oqimi, aniq harorat va baxmalsifat ko‘pik',
      ru: 'Поток черного золота, правильная температура и шелковистая пенка',
      en: 'Pouring dense extraction under balanced pressure and temperature',
    },
    category: 'craft',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'quiet-corner',
    title: {
      uz: 'Sokin suhbat burchagi',
      ru: 'Уголок для спокойной беседы',
      en: 'Quiet Conversation Alcove',
    },
    caption: {
      uz: 'Do‘stlar bilan dildan suhbatlashish uchun qulay va shinam makon',
      ru: 'Уютное пространство для теплого общения с близкими',
      en: 'Low acoustic resonance, natural textures, and warm ambient light',
    },
    category: 'space',
    aspect: 'landscape',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'artisan-milk',
    title: {
      uz: 'Ipakday sutli ko‘pik',
      ru: 'Шелковистая текстура молока',
      en: 'Micro-Textured Milk',
    },
    caption: {
      uz: 'Kapuchino va latte uchun ideal haroratda ko‘pirtirilgan yangi sut',
      ru: 'Взбитое свежее молоко идеальной температуры для латте и капучино',
      en: 'Steamed whole milk folded gently into double espresso shots',
    },
    category: 'craft',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'refreshing-mojito',
    title: {
      uz: 'Yozgi salqinlik',
      ru: 'Летняя свежесть',
      en: 'Chilled Summer Drinks',
    },
    caption: {
      uz: 'Yangi yalpiz, qulupnay va muzdek gazlangan moxito',
      ru: 'Свежая мята, спелая клубника и охлаждённый мохито',
      en: 'Handcrafted iced refreshers muddled with garden mint and berries',
    },
    category: 'lifestyle',
    aspect: 'portrait',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tea-ceremony',
    title: {
      uz: 'Mevali choy damlash',
      ru: 'Заваривание чая',
      en: 'Infusion Ritual',
    },
    caption: {
      uz: 'Tabiiy mevalar, oblepixa va asal bilan damlangan issiq choy',
      ru: 'Ароматный горячий чай с облепихой, травами и горным мёдом',
      en: 'Fruit, herbal and berry botanicals steeped to order',
    },
    category: 'process',
    aspect: 'landscape',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hot-dog-prep',
    title: {
      uz: 'Qaynoq hot-doglar',
      ru: 'Горячие хот-доги',
      en: 'Warm Artisan Hot Dogs',
    },
    caption: {
      uz: 'Qarsildoq non va sershira sosiskalar bilan issiq tayyorlangan hot-dog',
      ru: 'Свежая хрустящая булочка и аппетитные сосиски с фирменным соусом',
      en: 'Freshly toasted buns with savory sausages and signature condiments',
    },
    category: 'lifestyle',
    aspect: 'square',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1000&q=85',
  },
];
