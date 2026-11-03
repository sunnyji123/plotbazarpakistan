/**
 * PlotBazaar Pakistan - Core Data Types
 * Founder & CEO: Intekhab Alam
 * Tagline: Apni Property, Apna Mustaqbil
 */

export type UserRole = 'buyer' | 'seller' | 'dealer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  role: UserRole;
  agencyName?: string;
  city: string;
  avatar?: string;
  isVerifiedDealer?: boolean;
  subscription?: {
    packageId: string;
    packageName: string;
    startDate: string;
    expiresAt: string;
    listingAllowance: number;
    listingsUsed: number;
    featuredBoostsAllowance: number;
    featuredBoostsUsed: number;
    status: 'active' | 'expired';
  };
  createdAt: string;
}

export type PropertyCategory = 
  | 'residential_plot'
  | 'commercial_plot'
  | 'house'
  | 'apartment'
  | 'shop'
  | 'agricultural'
  | 'farmhouse'
  | 'warehouse'
  | 'office'
  | 'other';

export type PropertyUnit = 'Marla' | 'Kanal' | 'Sq. Yds' | 'Sq. Feet' | 'Acres';

export type PropertyAvailability = 'available' | 'reserved' | 'sold';

export type ModerationStatus = 'approved' | 'pending_review' | 'rejected';

export interface InstallmentDetails {
  advancePKR: number;
  monthlyInstallmentPKR: number;
  durationMonths: number;
  totalInstallments: number;
  possessionOnAdvancePercent?: number;
}

export interface Property {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  pricePKR: number;
  category: PropertyCategory;
  city: string;
  locality: string;
  society: string;
  address: string;
  size: number;
  unit: PropertyUnit;
  isInstallment: boolean;
  installmentDetails?: InstallmentDetails;
  images: string[];
  videoUrl?: string;
  sellerId: string;
  sellerName: string;
  sellerPhone: string;
  sellerWhatsApp: string;
  sellerRole: UserRole;
  agencyName?: string;
  availability: PropertyAvailability;
  moderationStatus: ModerationStatus;
  rejectionReason?: string;
  isFeatured: boolean;
  isHomepageFeatured: boolean;
  isVerified: boolean;
  verificationReport?: string;
  views: number;
  inquiriesCount: number;
  reportsCount: number;
  createdAt: string;
  expiresAt: string;
  orderId?: string;
}

export type PackageId =
  | 'single_ad'
  | 'monthly_ad_30k'
  | 'dealer_starter'
  | 'dealer_pro'
  | 'dealer_business'
  | 'dealer_enterprise'
  | 'extra_listing'
  | 'boost_7d'
  | 'boost_30d'
  | 'dealer_verification'
  | 'business_ad_30d'
  | 'homepage_feature_7d'
  | 'social_promo_starter';

export interface Package {
  id: PackageId | string;
  title: string;
  titleUrdu: string;
  description: string;
  pricePKR: number;
  durationDays: number;
  listingAllowance: number;
  isUnlimitedListings?: boolean;
  featuredBoosts: number;
  category: 'individual' | 'monthly_advertising' | 'dealer_tier' | 'addon';
  benefits: string[];
  benefitsUrdu: string[];
  isActive: boolean;
  badge?: string;
}

export type PaymentMethod = 
  | 'jazzcash'
  | 'easypaisa'
  | 'card'
  | 'bank_raast'
  | 'office_cash';

export type PaymentStatus = 
  | 'pending_verification'
  | 'completed'
  | 'rejected'
  | 'refunded';

export interface OrderItem {
  packageId: string;
  packageName: string;
  quantity: number;
  unitPricePKR: number;
  totalPKR: number;
  targetPropertyId?: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  items: OrderItem[];
  subtotalPKR: number;
  discountPKR: number;
  couponCode?: string;
  totalAmountPKR: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionRef?: string;
  bankAccountTitle?: string;
  bankName?: string;
  proofImageUrl?: string;
  notes?: string;
  rejectionReason?: string;
  createdAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  sellerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
  message: string;
  createdAt: string;
}

export interface PropertyReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reportedBy: string;
  reportedEmail?: string;
  reason: 'incorrect_price' | 'fake_photos' | 'already_sold' | 'unreachable_seller' | 'fraud_scam' | 'other';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface SocialMediaCampaign {
  id: string;
  userId: string;
  propertyId: string;
  propertyTitle: string;
  platform: 'meta' | 'tiktok' | 'both';
  targetCities: string[];
  durationDays: number;
  mediaBudgetPKR: number;
  agencyFeePKR: number;
  totalAmountPKR: number;
  objective: 'lead_generation' | 'whatsapp_chats' | 'brand_reach';
  status: 'draft' | 'pending_approval' | 'active' | 'completed';
  platformStatusNotes: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  targetType: 'order' | 'property' | 'package' | 'user' | 'system';
  targetId: string;
  details: string;
}

export interface WebsiteSettings {
  websiteName: string;
  tagline: string;
  founderName: string;
  founderDesignation: string;
  supportEmail: string;
  supportPhone: string;
  supportWhatsAppNumber: string;
  supportWhatsAppUrl: string; // "https://whatsapp.com/dl/"
  useDirectWhatsAppChat: boolean; // toggle between download link and direct wa.me chat
  jazzCashNumber: string; // "03701220965"
  jazzCashAccountTitle: string; // "PlotBazaar Pakistan - Intekhab Alam"
  easypaisaNumber: string; // "03489704473"
  easypaisaAccountTitle: string; // "PlotBazaar Pakistan - Intekhab Alam"
  bankName: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  bankIBAN: string;
  raastId: string;
  isJazzCashManualEnabled: boolean;
  isEasypaisaManualEnabled: boolean;
  isBankRaastEnabled: boolean;
  isCardGatewayEnabled: boolean;
  freeListingsEnabled: boolean;
  freeListingsLimit: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountFixedPKR?: number;
  minOrderPKR?: number;
  isActive: boolean;
  description: string;
}

