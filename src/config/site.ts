export interface BankAccount {
  id: string;
  bankName: string;
  accountHolder: string;
  iban: string;
  branch: string;
  accountNumber?: string;
  logoUrl?: string;
}

export const siteConfig = {
  // Marka İsmi (Tek bir yerden değiştirilebilir)
  name: "RIDER SILVER",
  legalName: "Rider Silver Takı & Mücevherat San. Tic. Ltd. Şti.",
  slogan: "Senin Sürüşün, Senin Hikayen.",
  description: "925 ayar has gümüş motorcu kask kolyeleri, özel araç amblemleri ve zamansız mücevher koleksiyonları. Senin Sürüşün, Senin Hikayen.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Mağaza ve Alışveriş Politikaları
  currency: "₺",
  freeShippingThreshold: 1000, // 1000 TL üzeri ücretsiz kargo
  havaleDiscountRate: 0.05,    // Havale ile %5 ek indirim
  standardShippingCost: 89,    // Sabit kargo ücreti
  
  // İletişim Bilgileri
  contact: {
    phone: "+90 (212) 555 01 99",
    whatsapp: "+90 532 555 01 99",
    email: "destek@ridersilver.com",
    address: "Abdi İpekçi Cad. No: 42, Nişantaşı / İstanbul",
    workingHours: "Pazartesi - Cumartesi: 09:30 - 19:30",
  },

  // Sosyal Medya
  socials: {
    instagram: "https://instagram.com/ridersilver.tr",
    facebook: "https://facebook.com/ridersilver",
    pinterest: "https://pinterest.com/ridersilver",
  },

  // Havale / EFT Banka Hesapları
  bankAccounts: [
    {
      id: "garanti",
      bankName: "Garanti BBVA",
      accountHolder: "Rider Silver Ltd. Şti.",
      iban: "TR45 0006 2000 1234 5678 9012 34",
      branch: "Nişantaşı Şubesi (1234)",
    },
    {
      id: "isbankasi",
      bankName: "Türkiye İş Bankası",
      accountHolder: "Rider Silver Ltd. Şti.",
      iban: "TR12 0006 4000 9876 5432 1098 76",
      branch: "Karaköy Şubesi (4567)",
    },
    {
      id: "ziraat",
      bankName: "Ziraat Bankası",
      accountHolder: "Rider Silver Ltd. Şti.",
      iban: "TR88 0001 0000 3456 7890 1234 56",
      branch: "Kapalıçarşı Şubesi (102)",
    },
  ] as BankAccount[],

  // Duyuru Bandı Metinleri
  announcements: [
    "Tüm siparişlerde Havale & EFT ile anında %5 ek indirim!",
    "1.000 TL ve üzeri alışverişlerde Sigortalı Ücretsiz Kargo",
    "Özel kadife mücevher kutusu ve sertifikasıyla gönderim",
  ],
};
