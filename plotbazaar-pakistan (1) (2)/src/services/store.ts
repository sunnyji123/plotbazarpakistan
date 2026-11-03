import { Property, Package, Order, User, Inquiry, PropertyReport, SocialMediaCampaign, AuditLog, WebsiteSettings } from '../types';

export const INITIAL_PACKAGES: Package[] = [
  {
    id: 'single_ad',
    title: 'Single Property Advertisement',
    titleUrdu: 'سنگل پراپرٹی اشتہار',
    description: 'Perfect for individual property owners wanting high visibility for one plot or house.',
    pricePKR: 1500,
    durationDays: 30,
    listingAllowance: 1,
    isUnlimitedListings: false,
    featuredBoosts: 0,
    category: 'individual',
    benefits: [
      '1 Property Advertisement on PlotBazaar',
      'Title, detailed description & photo uploads',
      'Direct WhatsApp and phone call leads',
      'Standard 30 days active duration',
      'Dedicated Order & Listing Reference',
      'Transparent: 1 ad = Rs. 1,500 | 5 ads = Rs. 7,500 | 10 ads = Rs. 15,000'
    ],
    benefitsUrdu: [
      'پلاٹ بازار پر 1 پراپرٹی اشتہار',
      'تفصیلی عنوان، تفصیلات اور تصاویر',
      'براہ راست واٹس ایپ اور فون کال لیڈز',
      '30 دن کی معیاری میعاد'
    ],
    isActive: true,
    badge: 'Standard Seller Choice'
  },
  {
    id: 'monthly_ad_30k',
    title: 'Monthly Advertising Package',
    titleUrdu: 'ماہانہ ایڈورٹائزنگ پیکیج',
    description: 'Comprehensive monthly advertising quota for active property sellers and agencies.',
    pricePKR: 30000,
    durationDays: 30,
    listingAllowance: 50,
    isUnlimitedListings: false,
    featuredBoosts: 4,
    category: 'monthly_advertising',
    benefits: [
      'Includes 50 active property listings per month',
      'Seller & Dealer Listing Management Dashboard',
      '4 Featured boost badges included',
      'Lead inquiry manager with caller details',
      'Start & expiry date tracking with renewal reminders',
      'Transparent billing: No per-ad charge for included 50 listings'
    ],
    benefitsUrdu: [
      'ماہانہ 50 فعال پراپرٹی اشتہارات شامل',
      'ڈیلر و سیلر لسٹنگ مینجمنٹ ڈیش بورڈ',
      '4 نمایاں بوسٹ شامل'
    ],
    isActive: true,
    badge: 'Most Popular for Agencies'
  },
  {
    id: 'dealer_starter',
    title: 'Starter Dealer Subscription',
    titleUrdu: 'سٹارٹر ڈیلر سبسکرپشن',
    description: 'Designed for independent real estate agents entering the digital marketplace.',
    pricePKR: 2000,
    durationDays: 30,
    listingAllowance: 5,
    isUnlimitedListings: false,
    featuredBoosts: 0,
    category: 'dealer_tier',
    benefits: [
      'Up to 5 active property listings',
      'Verified Dealer profile page with logo & address',
      'Listing management dashboard'
    ],
    benefitsUrdu: ['5 فعال پراپرٹی لسٹنگز تک گنجائش', 'تصدیق شدہ ڈیلر پروفائل پیج'],
    isActive: true
  },
  {
    id: 'dealer_pro',
    title: 'Professional Dealer Subscription',
    titleUrdu: 'پروفیشنل ڈیلر سبسکرپشن',
    description: 'Ideal for established real estate consultants handling multiple property societies.',
    pricePKR: 5000,
    durationDays: 30,
    listingAllowance: 25,
    isUnlimitedListings: false,
    featuredBoosts: 2,
    category: 'dealer_tier',
    benefits: [
      'Up to 25 active listings concurrently',
      'Verified Dealer badge on all cards',
      '2 Featured promotions included each month',
      'Inquiry management portal with buyer notes'
    ],
    benefitsUrdu: ['25 فعال لسٹنگز بیک وقت', 'ماہانہ 2 فیچرڈ پروموشنز شامل'],
    isActive: true,
    badge: 'Best Value'
  },
  {
    id: 'dealer_business',
    title: 'Business Dealer Subscription',
    titleUrdu: 'بزنس ڈیلر سبسکرپشن',
    description: 'Full-scale solution for high-volume brokerage firms, builders, and developers.',
    pricePKR: 10000,
    durationDays: 30,
    listingAllowance: 100,
    isUnlimitedListings: false,
    featuredBoosts: 5,
    category: 'dealer_tier',
    benefits: [
      'Up to 100 active property listings',
      'Prominent agency branding and directory placement',
      '5 Featured promotions included each month'
    ],
    benefitsUrdu: ['100 فعال پراپرٹی اشتہارات تک گنجائش', 'ماہانہ 5 فیچرڈ پروموشنز شامل'],
    isActive: true
  },
  {
    id: 'dealer_enterprise',
    title: 'Enterprise Dealer Custom',
    titleUrdu: 'انٹرپرائز ڈیلر کسٹم',
    description: 'Tailored for nationwide developers, housing schemes, and corporate builders.',
    pricePKR: 25000,
    durationDays: 30,
    listingAllowance: 250,
    isUnlimitedListings: false,
    featuredBoosts: 15,
    category: 'dealer_tier',
    benefits: [
      'Listing allowance & duration custom-configured by Admin',
      'Dedicated developer profile and project showcase',
      '15 Featured promotions per month'
    ],
    benefitsUrdu: ['ایڈمن کی جانب سے کسٹم لسٹنگ کوٹہ اور میعاد'],
    isActive: true
  },
  {
    id: 'extra_listing',
    title: 'Extra Property Listing',
    titleUrdu: 'اضافی پراپرٹی لسٹنگ',
    description: 'Add an extra listing to your current active subscription.',
    pricePKR: 300,
    durationDays: 30,
    listingAllowance: 1,
    featuredBoosts: 0,
    category: 'addon',
    benefits: ['1 additional property listing slot for 30 days'],
    benefitsUrdu: ['30 دن کے لیے 1 اضافی پراپرٹی لسٹنگ سلاٹ'],
    isActive: true
  },
  {
    id: 'boost_7d',
    title: '7-Day Featured Boost',
    titleUrdu: '7 روزہ فیچرڈ بوسٹ',
    description: 'Puts your listing at the top of category and city search results.',
    pricePKR: 500,
    durationDays: 7,
    listingAllowance: 0,
    featuredBoosts: 1,
    category: 'addon',
    benefits: ['Top placement in search results for 7 days'],
    benefitsUrdu: ['7 دن کے لیے تلاش میں سب سے اوپر لسٹنگ'],
    isActive: true
  },
  {
    id: 'boost_30d',
    title: '30-Day Featured Boost',
    titleUrdu: '30 روزہ فیچرڈ بوسٹ',
    description: 'Month-long premium highlight for urgent sale properties.',
    pricePKR: 1500,
    durationDays: 30,
    listingAllowance: 0,
    featuredBoosts: 1,
    category: 'addon',
    benefits: ['30 days premium pinned spot'],
    benefitsUrdu: ['30 دن تک مسلسل ٹاپ پروموشن'],
    isActive: true
  },
  {
    id: 'dealer_verification',
    title: 'Dealer Verification Review',
    titleUrdu: 'ڈیلر تصدیقی جائزہ',
    description: 'Thorough review of business registration, NTN, and physical office by PlotBazaar desk.',
    pricePKR: 1000,
    durationDays: 365,
    listingAllowance: 0,
    featuredBoosts: 0,
    category: 'addon',
    benefits: ['Documentary review of CNIC, NTN, and Office', 'Verified Agency badge'],
    benefitsUrdu: ['شناختی کارڈ، این ٹی این اور دفتر کی جانچ پڑتال'],
    isActive: true
  },
  {
    id: 'homepage_feature_7d',
    title: 'Homepage Featured Showcase',
    titleUrdu: 'ہوم پیج فیچرڈ شوکیس',
    description: 'Prominently showcased on the PlotBazaar Pakistan homepage.',
    pricePKR: 3000,
    durationDays: 7,
    listingAllowance: 0,
    featuredBoosts: 1,
    category: 'addon',
    benefits: ['Prime featured carousel on PlotBazaar home page for 7 days'],
    benefitsUrdu: ['پلاٹ بازار ہوم پیج پر 7 دن کے لیے نمایاں جگہ'],
    isActive: true
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-101',
    title: '1 Kanal Residential Plot in DHA Phase 6, Lahore',
    titleUrdu: '1 کنال رہائشی پلاٹ، ڈی ایچ اے فیز 6، لاہور',
    description: 'Prime location plot in Sector C, DHA Phase 6 Lahore. 100% direct allotment, underground electricity, developed area with possession available. Near Main Boulevard and Commercial Broadway.',
    descriptionUrdu: 'ڈی ایچ اے فیز 6 لاہور کے سیکٹر سی میں پرائم لوکیشن پلاٹ۔ مین بلیوارڈ اور کمرشل براڈ وے کے قریب۔ قبضہ دستیاب۔',
    pricePKR: 42500000,
    category: 'residential_plot',
    city: 'Lahore',
    locality: 'Sector C, Phase 6',
    society: 'Defence Housing Authority (DHA)',
    address: 'Plot # 342, Sector C, DHA Phase 6, Lahore Cantt',
    size: 1,
    unit: 'Kanal',
    isInstallment: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-dealer-1',
    sellerName: 'Malik Rehan',
    sellerPhone: '+92 300 8472910',
    sellerWhatsApp: '+923008472910',
    sellerRole: 'dealer',
    agencyName: 'Malik Real Estate DHA',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: true,
    isHomepageFeatured: true,
    isVerified: true,
    verificationReport: 'Original DHA Allocation & NDC checked by PlotBazaar verification team.',
    views: 842,
    inquiriesCount: 19,
    reportsCount: 0,
    createdAt: '2026-10-10T11:00:00Z',
    expiresAt: '2026-11-10T11:00:00Z'
  },
  {
    id: 'prop-102',
    title: '500 Sq. Yds Corner Plot in DHA Phase 8, Karachi',
    titleUrdu: '500 گز کارنر پلاٹ، ڈی ایچ اے فیز 8، کراچی',
    description: 'Exclusive 500 Sq. Yards west open corner plot in Zone B, DHA Phase 8 Karachi. Sea breeze, high elevation, wide carpeted 60ft road. Complete clear title with sub-lease ready.',
    descriptionUrdu: 'ڈی ایچ اے فیز 8 کراچی، زون بی میں 500 گز ویسٹ اوپن کارنر پلاٹ۔ کلیئر ٹائٹل اور سب لیز تیار۔',
    pricePKR: 98000000,
    category: 'residential_plot',
    city: 'Karachi',
    locality: 'Zone B, Phase 8',
    society: 'Defence Housing Authority (DHA)',
    address: 'Street 14, Zone B, DHA Phase 8, Karachi',
    size: 500,
    unit: 'Sq. Yds',
    isInstallment: false,
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-seller-1',
    sellerName: 'Tariq Mehmood',
    sellerPhone: '+92 321 2458900',
    sellerWhatsApp: '+923212458900',
    sellerRole: 'seller',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: true,
    isHomepageFeatured: true,
    isVerified: true,
    verificationReport: 'Verified direct owner listing with military estate officer registry papers reviewed.',
    views: 1250,
    inquiriesCount: 31,
    reportsCount: 0,
    createdAt: '2026-10-12T14:30:00Z',
    expiresAt: '2026-11-12T14:30:00Z'
  },
  {
    id: 'prop-103',
    title: '10 Marla Luxury Designer House in Gulberg Greens, Islamabad',
    titleUrdu: '10 مرلہ لگژری ڈیزائنر گھر، گلبرگ گرینز، اسلام آباد',
    description: 'Brand new 5-bedroom luxury house with Italian kitchen fittings, Spanish tiles, imported sanitary ware, servant quarter, and solar system installed. Ready to move in.',
    descriptionUrdu: 'گلبرگ گرینز اسلام آباد میں 5 بیڈ رومز پر مشتمل نیا ڈیزائنر گھر۔ اطالوی کچن اور سولر سسٹم انسٹال۔',
    pricePKR: 48000000,
    category: 'house',
    city: 'Islamabad',
    locality: 'Executive Block',
    society: 'Gulberg Greens Islamabad',
    address: 'House # 78, Street 9, Executive Block, Gulberg Greens, Islamabad',
    size: 10,
    unit: 'Marla',
    isInstallment: false,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-dealer-2',
    sellerName: 'Islamabad Estate Network',
    sellerPhone: '+92 333 5192801',
    sellerWhatsApp: '+923335192801',
    sellerRole: 'dealer',
    agencyName: 'Islamabad Estate Network',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: true,
    isHomepageFeatured: false,
    isVerified: true,
    verificationReport: 'CDA / IBEHS building plan approval and completion certificate inspected.',
    views: 630,
    inquiriesCount: 14,
    reportsCount: 0,
    createdAt: '2026-10-15T09:15:00Z',
    expiresAt: '2026-11-15T09:15:00Z'
  },
  {
    id: 'prop-104',
    title: '5 Marla Commercial Plot on 3-Year Installments - New Metro City',
    titleUrdu: '5 مرلہ کمرشل پلاٹ، 3 سالہ آسان اقساط، نیو میٹرو سٹی',
    description: 'Main commercial boulevard 5 Marla plot. Booking starts with only 20% down payment. 36 monthly installments with balloting in 12 months. Excellent ROI for investors.',
    descriptionUrdu: 'مین کمرشل بلیوارڈ پر 5 مرلہ پلاٹ۔ 20 فیصد ڈاؤن پیمنٹ کے ساتھ بکنگ۔ 36 ماہانہ اقساط۔',
    pricePKR: 12500000,
    category: 'commercial_plot',
    city: 'Gujar Khan / Rawalpindi',
    locality: 'Commercial Boulevard',
    society: 'New Metro City',
    address: 'Plot C-12, Sector A Commercial, New Metro City',
    size: 5,
    unit: 'Marla',
    isInstallment: true,
    installmentDetails: {
      advancePKR: 2500000,
      monthlyInstallmentPKR: 277777,
      durationMonths: 36,
      totalInstallments: 36,
      possessionOnAdvancePercent: 50
    },
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-dealer-1',
    sellerName: 'Malik Rehan',
    sellerPhone: '+92 300 8472910',
    sellerWhatsApp: '+923008472910',
    sellerRole: 'dealer',
    agencyName: 'Malik Real Estate DHA',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: false,
    isHomepageFeatured: false,
    isVerified: true,
    verificationReport: 'Society NOC from local development authority reviewed by legal panel.',
    views: 410,
    inquiriesCount: 22,
    reportsCount: 0,
    createdAt: '2026-10-18T16:00:00Z',
    expiresAt: '2026-11-18T16:00:00Z'
  },
  {
    id: 'prop-105',
    title: '4 Acre Agricultural Farm Land with Tube Well in Multan',
    titleUrdu: '4 ایکڑ زرعی و فارم اراضی مع ٹیوب ویل، ملتان',
    description: 'Fertile canal-irrigated agricultural land on Multan-Khanewal bypass road. Operating solar tube-well, boundary wall on 2 sides, mango orchard and open land.',
    descriptionUrdu: 'ملتان بائی پاس روڈ پر 4 ایکڑ نہری زرعی زمین۔ سولر ٹیوب ویل اور آموں کا باغ۔',
    pricePKR: 32000000,
    category: 'agricultural',
    city: 'Multan',
    locality: 'Bypass Road',
    society: 'Agricultural Belt',
    address: 'Mouza Qasim Bela, Multan Bypass Road',
    size: 4,
    unit: 'Acres',
    isInstallment: false,
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-seller-2',
    sellerName: 'Haji Aslam',
    sellerPhone: '+92 301 7654321',
    sellerWhatsApp: '+923017654321',
    sellerRole: 'seller',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: false,
    isHomepageFeatured: false,
    isVerified: false,
    views: 290,
    inquiriesCount: 8,
    reportsCount: 0,
    createdAt: '2026-10-20T10:00:00Z',
    expiresAt: '2026-11-20T10:00:00Z'
  },
  {
    id: 'prop-106',
    title: '1 Kanal Residential Plot in Gwadar Sangar Housing Scheme',
    titleUrdu: '1 کنال رہائشی پلاٹ، گوادر سنگار ہاؤسنگ سکیم',
    description: 'Breathtaking sea-facing 1 Kanal plot in Phase 4 Sangar Housing Project atop Koh-e-Batil, Gwadar. Panoramic Arabian Sea views. Transfer from GDA authority.',
    descriptionUrdu: 'کوہِ باطل پر سنگار ہاؤسنگ پراجیکٹ فیز 4 میں 1 کنال سمندر کا رخ رکھنے والا پلاٹ۔ جی ڈی اے ٹرانسفر۔',
    pricePKR: 18500000,
    category: 'residential_plot',
    city: 'Gwadar',
    locality: 'Phase 4, Koh-e-Batil',
    society: 'Sangar Housing Scheme',
    address: 'Plot 89, Sector D, Phase 4, Sangar, Gwadar',
    size: 1,
    unit: 'Kanal',
    isInstallment: false,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    sellerId: 'user-dealer-1',
    sellerName: 'Malik Rehan',
    sellerPhone: '+92 300 8472910',
    sellerWhatsApp: '+923008472910',
    sellerRole: 'dealer',
    agencyName: 'Malik Real Estate DHA',
    availability: 'available',
    moderationStatus: 'approved',
    isFeatured: true,
    isHomepageFeatured: false,
    isVerified: true,
    verificationReport: 'Verified with Gwadar Development Authority (GDA) register files.',
    views: 520,
    inquiriesCount: 12,
    reportsCount: 0,
    createdAt: '2026-10-21T12:00:00Z',
    expiresAt: '2026-11-21T12:00:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'PB-ORD-2026-1049',
    userId: 'user-dealer-1',
    userName: 'Malik Rehan',
    userEmail: 'rehan@malikestate.pk',
    userPhone: '+92 300 8472910',
    items: [
      {
        packageId: 'monthly_ad_30k',
        packageName: 'Monthly Advertising Package (50 Listings Quota)',
        quantity: 1,
        unitPricePKR: 30000,
        totalPKR: 30000
      }
    ],
    subtotalPKR: 30000,
    discountPKR: 0,
    totalAmountPKR: 30000,
    paymentMethod: 'bank_raast',
    paymentStatus: 'completed',
    transactionRef: 'RAAST-20261010-98421',
    bankAccountTitle: 'PlotBazaar Pakistan (Pvt) Ltd',
    bankName: 'Meezan Bank Limited - Clifton Karachi',
    createdAt: '2026-10-10T09:00:00Z',
    verifiedAt: '2026-10-10T09:45:00Z',
    verifiedBy: 'Intekhab Alam (Founder & CEO)'
  },
  {
    id: 'PB-ORD-2026-1052',
    userId: 'user-seller-1',
    userName: 'Tariq Mehmood',
    userEmail: 'tariq@gmail.com',
    userPhone: '+92 321 2458900',
    items: [
      {
        packageId: 'single_ad',
        packageName: 'Single Property Advertisement',
        quantity: 1,
        unitPricePKR: 1500,
        totalPKR: 1500,
        targetPropertyId: 'prop-102'
      }
    ],
    subtotalPKR: 1500,
    discountPKR: 0,
    totalAmountPKR: 1500,
    paymentMethod: 'jazzcash',
    paymentStatus: 'completed',
    transactionRef: 'JC-883921029',
    createdAt: '2026-10-12T14:00:00Z',
    verifiedAt: '2026-10-12T14:05:00Z',
    verifiedBy: 'Automated Gateway Verification'
  },
  {
    id: 'PB-ORD-2026-1088',
    userId: 'user-seller-2',
    userName: 'Haji Aslam',
    userEmail: 'aslam.multan@gmail.com',
    userPhone: '+92 301 7654321',
    items: [
      {
        packageId: 'single_ad',
        packageName: 'Single Property Advertisement',
        quantity: 1,
        unitPricePKR: 1500,
        totalPKR: 1500
      }
    ],
    subtotalPKR: 1500,
    discountPKR: 0,
    totalAmountPKR: 1500,
    paymentMethod: 'bank_raast',
    paymentStatus: 'pending_verification',
    transactionRef: 'HBL-FT-492019482',
    bankAccountTitle: 'PlotBazaar Pakistan',
    bankName: 'Habib Bank Limited (HBL) - Raast',
    proofImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    notes: 'Transferred via HBL Mobile App to PlotBazaar Raast ID 03001234567',
    createdAt: '2026-10-25T17:30:00Z'
  }
];

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  websiteName: 'PlotBazaar Pakistan',
  tagline: 'Apni Property, Apna Mustaqbil',
  founderName: 'Intekhab Alam',
  founderDesignation: 'Founder & CEO',
  supportEmail: 'sunnyjiansari456@gmail.com',
  supportPhone: '03363144097',
  supportWhatsAppNumber: '03363144097',
  supportWhatsAppUrl: 'https://whatsapp.com/dl/',
  useDirectWhatsAppChat: false,
  jazzCashNumber: '03701220965',
  jazzCashAccountTitle: 'PlotBazaar Pakistan - Intekhab Alam',
  easypaisaNumber: '03489704473',
  easypaisaAccountTitle: 'PlotBazaar Pakistan - Intekhab Alam',
  bankName: 'Meezan Bank Limited / HBL',
  bankAccountTitle: 'PlotBazaar Pakistan (Pvt) Ltd',
  bankAccountNumber: '0102-0105829101',
  bankIBAN: 'PK36MEZN0001020105829101',
  raastId: '03363144097',
  isJazzCashManualEnabled: true,
  isEasypaisaManualEnabled: true,
  isBankRaastEnabled: true,
  isCardGatewayEnabled: false,
  freeListingsEnabled: false,
  freeListingsLimit: 0
};

export const INITIAL_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Intekhab Alam',
    email: 'sunnyjiansari456@gmail.com',
    phone: '03363144097',
    whatsapp: '03363144097',
    role: 'admin',
    city: 'Karachi',
    isVerifiedDealer: true,
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'user-dealer-1',
    name: 'Malik Rehan',
    email: 'rehan@malikestate.pk',
    phone: '+92 300 8472910',
    whatsapp: '+923008472910',
    role: 'dealer',
    agencyName: 'Malik Real Estate DHA',
    city: 'Lahore',
    isVerifiedDealer: true,
    subscription: {
      packageId: 'monthly_ad_30k',
      packageName: 'Monthly Advertising Package (50 Listings)',
      startDate: '2026-10-10T09:00:00Z',
      expiresAt: '2026-11-10T09:00:00Z',
      listingAllowance: 50,
      listingsUsed: 4,
      featuredBoostsAllowance: 4,
      featuredBoostsUsed: 2,
      status: 'active'
    },
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'user-seller-1',
    name: 'Tariq Mehmood',
    email: 'tariq@gmail.com',
    phone: '+92 321 2458900',
    whatsapp: '+923212458900',
    role: 'seller',
    city: 'Karachi',
    createdAt: '2026-09-01T12:00:00Z'
  },
  {
    id: 'user-buyer-1',
    name: 'Ahmed Khan',
    email: 'ahmed.k@gmail.com',
    phone: '+92 333 4567890',
    role: 'buyer',
    city: 'Islamabad',
    createdAt: '2026-09-20T14:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-10T09:45:00Z',
    actor: 'Intekhab Alam (Founder & CEO)',
    actorRole: 'admin',
    action: 'APPROVE_MANUAL_PAYMENT',
    targetType: 'order',
    targetId: 'PB-ORD-2026-1049',
    details: 'Verified Raast transfer of Rs. 30,000 from Malik Rehan. Activated 50-listing monthly package.'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-15T10:00:00Z',
    actor: 'Intekhab Alam',
    actorRole: 'admin',
    action: 'UPDATE_PACKAGE_CONFIG',
    targetType: 'package',
    targetId: 'monthly_ad_30k',
    details: 'Configured monthly package listing quota to 50 listings.'
  }
];

const STORAGE_KEYS = {
  PROPERTIES: 'pb_properties_v4',
  PACKAGES: 'pb_packages_v4',
  ORDERS: 'pb_orders_v4',
  USERS: 'pb_users_v4',
  CURRENT_USER: 'pb_current_user_v4',
  FAVORITES: 'pb_favorites_v4',
  INQUIRIES: 'pb_inquiries_v4',
  REPORTS: 'pb_reports_v4',
  SOCIAL_CAMPAIGNS: 'pb_social_campaigns_v4',
  AUDIT_LOGS: 'pb_audit_logs_v4',
  SETTINGS: 'pb_website_settings_v5'
};

class StoreService {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error', e);
    }
  }

  getProperties(): Property[] {
    const list = this.get<Property[]>(STORAGE_KEYS.PROPERTIES, []);
    if (!list.length) {
      this.set(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
      return INITIAL_PROPERTIES;
    }
    return list;
  }

  getPropertyById(id: string): Property | undefined {
    return this.getProperties().find((p) => p.id === id);
  }

  saveProperty(prop: Property): void {
    const properties = this.getProperties();
    const index = properties.findIndex((p) => p.id === prop.id);
    if (index >= 0) {
      properties[index] = prop;
    } else {
      properties.unshift(prop);
    }
    this.set(STORAGE_KEYS.PROPERTIES, properties);
  }

  deleteProperty(id: string): void {
    const properties = this.getProperties().filter((p) => p.id !== id);
    this.set(STORAGE_KEYS.PROPERTIES, properties);
  }

  getPackages(): Package[] {
    const list = this.get<Package[]>(STORAGE_KEYS.PACKAGES, []);
    if (!list.length) {
      this.set(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
      return INITIAL_PACKAGES;
    }
    return list;
  }

  updatePackage(pkg: Package, adminName: string): void {
    const packages = this.getPackages();
    const index = packages.findIndex((p) => p.id === pkg.id);
    if (index >= 0) {
      packages[index] = pkg;
      this.set(STORAGE_KEYS.PACKAGES, packages);
      this.addAuditLog(
        adminName,
        'admin',
        'UPDATE_PACKAGE',
        'package',
        pkg.id,
        `Updated package ${pkg.title}: Price Rs. ${pkg.pricePKR}, Listing limit ${pkg.listingAllowance}`
      );
    }
  }

  getOrders(): Order[] {
    const list = this.get<Order[]>(STORAGE_KEYS.ORDERS, []);
    if (!list.length) {
      this.set(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return list;
  }

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  }

  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const id = `PB-ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    this.set(STORAGE_KEYS.ORDERS, orders);

    if (newOrder.paymentStatus === 'completed') {
      this.fulfillOrder(newOrder);
    }

    return newOrder;
  }

  approveManualPayment(orderId: string, adminName: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    order.paymentStatus = 'completed';
    order.verifiedAt = new Date().toISOString();
    order.verifiedBy = adminName;
    this.set(STORAGE_KEYS.ORDERS, orders);

    this.fulfillOrder(order);

    this.addAuditLog(
      adminName,
      'admin',
      'APPROVE_MANUAL_PAYMENT',
      'order',
      orderId,
      `Approved payment of Rs. ${order.totalAmountPKR} for ${order.userName}. Ref: ${order.transactionRef || 'N/A'}`
    );
    return true;
  }

  rejectManualPayment(orderId: string, adminName: string, reason: string): boolean {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return false;

    order.paymentStatus = 'rejected';
    order.rejectionReason = reason;
    order.verifiedAt = new Date().toISOString();
    order.verifiedBy = adminName;
    this.set(STORAGE_KEYS.ORDERS, orders);

    this.addAuditLog(
      adminName,
      'admin',
      'REJECT_MANUAL_PAYMENT',
      'order',
      orderId,
      `Rejected payment of Rs. ${order.totalAmountPKR}. Reason: ${reason}`
    );
    return true;
  }

  private fulfillOrder(order: Order): void {
    const users = this.getUsers();
    const user = users.find((u) => u.id === order.userId);
    if (!user) return;

    for (const item of order.items) {
      if (item.packageId === 'monthly_ad_30k' || item.packageId.startsWith('dealer_')) {
        const pkg = this.getPackages().find((p) => p.id === item.packageId);
        const allowance = pkg ? pkg.listingAllowance : 50;
        const boosts = pkg ? pkg.featuredBoosts : 2;
        const now = new Date();
        const expiry = new Date();
        expiry.setDate(now.getDate() + 30);

        user.subscription = {
          packageId: item.packageId,
          packageName: item.packageName,
          startDate: now.toISOString(),
          expiresAt: expiry.toISOString(),
          listingAllowance: allowance,
          listingsUsed: 0,
          featuredBoostsAllowance: boosts,
          featuredBoostsUsed: 0,
          status: 'active'
        };
      } else if (item.packageId === 'single_ad' && item.targetPropertyId) {
        const prop = this.getPropertyById(item.targetPropertyId);
        if (prop) {
          prop.moderationStatus = 'approved';
          prop.orderId = order.id;
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 30);
          prop.expiresAt = expiry.toISOString();
          this.saveProperty(prop);
        }
      } else if (item.packageId === 'boost_7d' && item.targetPropertyId) {
        const prop = this.getPropertyById(item.targetPropertyId);
        if (prop) {
          prop.isFeatured = true;
          this.saveProperty(prop);
        }
      } else if (item.packageId === 'homepage_feature_7d' && item.targetPropertyId) {
        const prop = this.getPropertyById(item.targetPropertyId);
        if (prop) {
          prop.isHomepageFeatured = true;
          this.saveProperty(prop);
        }
      }
    }
    this.saveUser(user);
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === user.id) {
      this.setCurrentUser(user);
    }
  }

  getUsers(): User[] {
    const list = this.get<User[]>(STORAGE_KEYS.USERS, []);
    if (!list.length) {
      this.set(STORAGE_KEYS.USERS, INITIAL_USERS);
      return INITIAL_USERS;
    }
    return list;
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    this.set(STORAGE_KEYS.USERS, users);
  }

  getCurrentUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_USERS[0]);
  }

  setCurrentUser(user: User | null): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  getFavorites(): string[] {
    return this.get<string[]>(STORAGE_KEYS.FAVORITES, ['prop-101', 'prop-103']);
  }

  toggleFavorite(propertyId: string): boolean {
    const favs = this.getFavorites();
    const index = favs.indexOf(propertyId);
    let isFav = false;
    if (index >= 0) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(propertyId);
      isFav = true;
    }
    this.set(STORAGE_KEYS.FAVORITES, favs);
    return isFav;
  }

  getInquiries(): Inquiry[] {
    return this.get<Inquiry[]>(STORAGE_KEYS.INQUIRIES, [
      {
        id: 'inq-1',
        propertyId: 'prop-101',
        propertyTitle: '1 Kanal Residential Plot in DHA Phase 6, Lahore',
        sellerId: 'user-dealer-1',
        buyerName: 'Ahmed Khan',
        buyerPhone: '+92 333 4567890',
        message: 'Assalam-o-Alaikum, is this DHA Phase 6 plot open for negotiation?',
        createdAt: '2026-10-22T15:20:00Z'
      }
    ]);
  }

  sendInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    inquiries.unshift(newInq);
    this.set(STORAGE_KEYS.INQUIRIES, inquiries);

    const prop = this.getPropertyById(inquiry.propertyId);
    if (prop) {
      prop.inquiriesCount = (prop.inquiriesCount || 0) + 1;
      this.saveProperty(prop);
    }
    return newInq;
  }

  getReports(): PropertyReport[] {
    return this.get<PropertyReport[]>(STORAGE_KEYS.REPORTS, [
      {
        id: 'rep-1',
        propertyId: 'prop-105',
        propertyTitle: '4 Acre Agricultural Farm Land with Tube Well in Multan',
        reportedBy: 'Kashif Ali',
        reason: 'incorrect_price',
        details: 'The seller demand on phone is higher than listed on PlotBazaar.',
        status: 'pending',
        createdAt: '2026-10-24T11:00:00Z'
      }
    ]);
  }

  addReport(report: Omit<PropertyReport, 'id' | 'createdAt' | 'status'>): void {
    const reports = this.getReports();
    reports.unshift({
      ...report,
      id: `rep-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    this.set(STORAGE_KEYS.REPORTS, reports);

    const prop = this.getPropertyById(report.propertyId);
    if (prop) {
      prop.reportsCount = (prop.reportsCount || 0) + 1;
      this.saveProperty(prop);
    }
  }

  updateReportStatus(reportId: string, status: 'resolved' | 'dismissed'): void {
    const reports = this.getReports();
    const rep = reports.find((r) => r.id === reportId);
    if (rep) {
      rep.status = status;
      this.set(STORAGE_KEYS.REPORTS, reports);
    }
  }

  getSocialCampaigns(): SocialMediaCampaign[] {
    return this.get<SocialMediaCampaign[]>(STORAGE_KEYS.SOCIAL_CAMPAIGNS, [
      {
        id: 'soc-1',
        userId: 'user-dealer-1',
        propertyId: 'prop-101',
        propertyTitle: '1 Kanal Residential Plot in DHA Phase 6, Lahore',
        platform: 'meta',
        targetCities: ['Lahore', 'Overseas Pakistanis'],
        durationDays: 7,
        mediaBudgetPKR: 15000,
        agencyFeePKR: 2250,
        totalAmountPKR: 17250,
        objective: 'whatsapp_chats',
        status: 'active',
        platformStatusNotes: 'Live campaign running via Meta Marketing Sandbox API.',
        createdAt: '2026-10-22T08:00:00Z'
      }
    ]);
  }

  createSocialCampaign(campaign: Omit<SocialMediaCampaign, 'id' | 'createdAt'>): SocialMediaCampaign {
    const list = this.getSocialCampaigns();
    const newCamp: SocialMediaCampaign = {
      ...campaign,
      id: `soc-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newCamp);
    this.set(STORAGE_KEYS.SOCIAL_CAMPAIGNS, list);
    return newCamp;
  }

  getAuditLogs(): AuditLog[] {
    const list = this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, []);
    if (!list.length) {
      this.set(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
      return INITIAL_AUDIT_LOGS;
    }
    return list;
  }

  addAuditLog(
    actor: string,
    actorRole: string,
    action: string,
    targetType: AuditLog['targetType'],
    targetId: string,
    details: string
  ): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      actor,
      actorRole,
      action,
      targetType,
      targetId,
      details
    });
    this.set(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  getFinancialAnalytics() {
    const orders = this.getOrders();
    const completed = orders.filter((o) => o.paymentStatus === 'completed');
    const pending = orders.filter((o) => o.paymentStatus === 'pending_verification');
    const rejected = orders.filter((o) => o.paymentStatus === 'rejected');
    const refunded = orders.filter((o) => o.paymentStatus === 'refunded');

    const totalCollectedPKR = completed.reduce((sum, o) => sum + o.totalAmountPKR, 0);
    const pendingPKR = pending.reduce((sum, o) => sum + o.totalAmountPKR, 0);
    const refundedPKR = refunded.reduce((sum, o) => sum + o.totalAmountPKR, 0);
    const netRevenuePKR = totalCollectedPKR - refundedPKR;

    const byPackage: Record<string, { count: number; totalPKR: number; title: string }> = {};
    for (const order of completed) {
      for (const item of order.items) {
        if (!byPackage[item.packageId]) {
          byPackage[item.packageId] = {
            count: 0,
            totalPKR: 0,
            title: item.packageName
          };
        }
        byPackage[item.packageId].count += item.quantity;
        byPackage[item.packageId].totalPKR += item.totalPKR;
      }
    }

    const byMethod: Record<string, number> = {};
    for (const order of completed) {
      byMethod[order.paymentMethod] = (byMethod[order.paymentMethod] || 0) + order.totalAmountPKR;
    }

    return {
      totalCollectedPKR,
      pendingPKR,
      refundedPKR,
      netRevenuePKR,
      completedOrdersCount: completed.length,
      pendingOrdersCount: pending.length,
      rejectedOrdersCount: rejected.length,
      byPackage,
      byMethod
    };
  }

  getWebsiteSettings(): WebsiteSettings {
    return this.get<WebsiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_WEBSITE_SETTINGS);
  }

  updateWebsiteSettings(settings: Partial<WebsiteSettings>, adminName: string): void {
    const current = this.getWebsiteSettings();
    const updated = { ...current, ...settings };
    this.set(STORAGE_KEYS.SETTINGS, updated);
    this.addAuditLog(
      adminName,
      'admin',
      'UPDATE_WEBSITE_SETTINGS',
      'system',
      'settings',
      `Updated settings: WhatsApp=${updated.supportWhatsAppUrl}, JazzCash=${updated.jazzCashNumber}, Easypaisa=${updated.easypaisaNumber}, Email=${updated.supportEmail}`
    );
  }

  getWhatsAppLink(customMessage?: string): string {
    const s = this.getWebsiteSettings();
    if (s.useDirectWhatsAppChat) {
      const cleanNumber = s.supportWhatsAppNumber.replace(/[^0-9]/g, '');
      const num = cleanNumber.startsWith('0') ? cleanNumber.slice(1) : cleanNumber;
      const msg = encodeURIComponent(
        customMessage || 'Assalam-o-Alaikum, I need assistance with PlotBazaar Pakistan properties or advertising packages.'
      );
      return `https://wa.me/92${num}?text=${msg}`;
    }
    return s.supportWhatsAppUrl || 'https://whatsapp.com/dl/';
  }
}

export const store = new StoreService();

export function formatPKR(amount: number, compact: boolean = false): string {
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(compact ? 2 : 2);
    return `Rs. ${crores} Crore`;
  } else if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(compact ? 1 : 2);
    return `Rs. ${lakhs} Lakh`;
  } else {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  }
}
