import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isUrdu: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    siteName: 'PlotBazaar Pakistan',
    tagline: 'Apni Property, Apna Mustaqbil',
    founderTitle: 'Intekhab Alam — Founder & CEO',
    home: 'Home',
    browseProperties: 'Browse Properties',
    sellProperty: 'Sell Property',
    pricingPackages: 'Packages & Pricing',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    dashboard: 'Dashboard',
    adminPanel: 'Admin Panel',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    allCategories: 'All Categories',
    residentialPlots: 'Residential Plots',
    commercialPlots: 'Commercial Plots',
    houses: 'Houses & Villas',
    apartments: 'Apartments & Flats',
    shops: 'Shops & Plazas',
    agricultural: 'Agricultural Land',
    farmhouses: 'Farmhouses',
    searchPlaceholder: 'Search city, society (e.g. DHA Phase 6, Bahria Town)...',
    price: 'Price',
    size: 'Size',
    location: 'Location',
    cash: 'Cash Purchase',
    installment: 'Easy Installment Plan',
    verified: 'Verified by PlotBazaar Desk',
    contactSeller: 'Contact Seller',
    callNow: 'Call Now',
    whatsappChat: 'WhatsApp Inquiry',
    featured: 'Featured',
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold',
    singleAdHighlight: 'Single Ad: Rs. 1,500 (30 Days Validity)',
    monthlyAdHighlight: 'Monthly Advertising: Rs. 30,000 / Month',
    installApp: 'Install App (PWA)',
    offlineNotice: 'You are currently offline. Displaying cached property listings.',
    quickLinks: 'Quick Links',
    officialHelpline: 'Official Helpline',
    karachiOffice: 'PlotBazaar Tower, Shahrah-e-Faisal, Karachi, Pakistan',
    copyright: '© 2026 PlotBazaar Pakistan. All rights reserved. Directed by Intekhab Alam (Founder & CEO).'
  },
  ur: {
    siteName: 'پلاٹ بازار پاکستان',
    tagline: 'اپنی پراپرٹی، اپنا مستقبل',
    founderTitle: 'انتخاب عالم — بانی اور چیف ایگزیکٹو',
    home: 'ہوم',
    browseProperties: 'پراپرٹیز تلاش کریں',
    sellProperty: 'پراپرٹی بیچیں',
    pricingPackages: 'پیکجز اور قیمتیں',
    aboutUs: 'ہمارے بارے میں',
    contactUs: 'رابطہ کریں',
    dashboard: 'ڈیش بورڈ',
    adminPanel: 'ایڈمن پینل',
    login: 'لاگ ان',
    register: 'اکاؤنٹ بنائیں',
    logout: 'لاگ آؤٹ',
    allCategories: 'تمام کیٹیگریز',
    residentialPlots: 'رہائشی پلاٹس',
    commercialPlots: 'کمرشل پلاٹس',
    houses: 'مکانات اور کوٹھیاں',
    apartments: 'فلیٹس اور اپارٹمنٹس',
    shops: 'دکانیں اور پلازے',
    agricultural: 'زرعی اراضی',
    farmhouses: 'فارم ہاؤسز',
    searchPlaceholder: 'شہر یا سوسائٹی تلاش کریں (مثلاً ڈی ایچ اے، بحریہ ٹاؤن)...',
    price: 'قیمت',
    size: 'رقبہ',
    location: 'مقام',
    cash: 'نقد خریداری',
    installment: 'آسان اقساط پر',
    verified: 'تصدیق شدہ برائے پلاٹ بازار',
    contactSeller: 'ڈیلر سے رابطہ کریں',
    callNow: 'کال کریں',
    whatsappChat: 'واٹس ایپ رابطہ',
    featured: 'نمایاں پراپرٹی',
    available: 'دستیاب',
    reserved: 'بُک شدہ',
    sold: 'فروخت شدہ',
    singleAdHighlight: 'سنگل اشتہار: 1,500 روپے (30 دن کی میعاد)',
    monthlyAdHighlight: 'ماہانہ ایڈورٹائزنگ: 30,000 روپے / ماہ',
    installApp: 'ایپ انسٹال کریں',
    offlineNotice: 'آپ آف لائن ہیں۔ محفوظ شدہ ڈیٹا دکھایا جا رہا ہے۔',
    quickLinks: 'فوری لنکس',
    officialHelpline: 'آفیشل ہیلپ لائن',
    karachiOffice: 'پلاٹ بازار ٹاور، شاہراہ فیصل، کراچی، پاکستان',
    copyright: '© 2026 پلاٹ بازار پاکستان۔ جملہ حقوق محفوظ ہیں۔ زیرِ قیادت انتخاب عالم (بانی و سی ای او)۔'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('plotbazaar_lang') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('plotbazaar_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    if (language === 'ur') {
      document.body.classList.add('font-urdu');
    } else {
      document.body.classList.remove('font-urdu');
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isUrdu: language === 'ur' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
