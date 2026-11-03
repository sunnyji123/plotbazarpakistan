-- =====================================================================
-- PlotBazaar Pakistan - Production Relational PostgreSQL Database Schema
-- Founder & CEO: Intekhab Alam
-- Tagline: Apni Property, Apna Mustaqbil
-- Currency: Pakistani Rupees (PKR)
-- Target Platform: PostgreSQL 15+ / Cloud SQL / Supabase
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ROLES & ENUMS
CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'dealer', 'admin');
CREATE TYPE property_category AS ENUM (
  'residential_plot',
  'commercial_plot',
  'house',
  'apartment',
  'shop',
  'agricultural',
  'farmhouse',
  'warehouse',
  'office',
  'other'
);
CREATE TYPE property_unit AS ENUM ('Marla', 'Kanal', 'Sq. Yds', 'Sq. Feet', 'Acres');
CREATE TYPE property_availability AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE moderation_status AS ENUM ('pending_review', 'approved', 'rejected');
CREATE TYPE payment_method AS ENUM ('bank_raast', 'jazzcash', 'easypaisa', 'card', 'office_cash');
CREATE TYPE payment_status AS ENUM ('pending_verification', 'completed', 'rejected', 'refunded');

-- 2. USERS & PROFILES TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50),
  role user_role NOT NULL DEFAULT 'buyer',
  agency_name VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  is_verified_dealer BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- 3. PACKAGES TABLE (Owner-Configurable)
CREATE TABLE packages (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_urdu VARCHAR(255),
  description TEXT,
  price_pkr NUMERIC(12, 2) NOT NULL CHECK (price_pkr >= 0),
  duration_days INT NOT NULL DEFAULT 30,
  listing_allowance INT NOT NULL DEFAULT 1,
  is_unlimited_listings BOOLEAN DEFAULT FALSE,
  featured_boosts INT NOT NULL DEFAULT 0,
  category VARCHAR(50) NOT NULL, -- 'individual', 'monthly_advertising', 'dealer_tier', 'addon'
  benefits JSONB DEFAULT '[]'::jsonb,
  benefits_urdu JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  badge VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. DEALER / SELLER SUBSCRIPTIONS
CREATE TABLE dealer_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id VARCHAR(64) NOT NULL REFERENCES packages(id),
  package_name VARCHAR(255) NOT NULL,
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  listing_allowance INT NOT NULL,
  listings_used INT NOT NULL DEFAULT 0,
  featured_boosts_allowance INT NOT NULL DEFAULT 0,
  featured_boosts_used INT NOT NULL DEFAULT 0,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_dealer_subscriptions_user ON dealer_subscriptions(user_id);
CREATE INDEX idx_dealer_subscriptions_status ON dealer_subscriptions(status);

-- 5. ORDERS TABLE (Historical pricing preserved)
CREATE TABLE orders (
  id VARCHAR(64) PRIMARY KEY, -- format: PB-ORD-2026-XXXX
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50) NOT NULL,
  subtotal_pkr NUMERIC(12, 2) NOT NULL,
  discount_pkr NUMERIC(12, 2) NOT NULL DEFAULT 0,
  coupon_code VARCHAR(50),
  total_amount_pkr NUMERIC(12, 2) NOT NULL,
  payment_method payment_method NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'pending_verification',
  transaction_ref VARCHAR(100),
  bank_name VARCHAR(150),
  bank_account_title VARCHAR(150),
  proof_image_url TEXT,
  notes TEXT,
  rejection_reason TEXT,
  verified_by VARCHAR(255),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(payment_status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);

-- 6. ORDER ITEMS TABLE
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  package_id VARCHAR(64) NOT NULL REFERENCES packages(id),
  package_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price_pkr NUMERIC(12, 2) NOT NULL,
  total_pkr NUMERIC(12, 2) NOT NULL,
  target_property_id VARCHAR(64),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- 7. PROPERTY LISTINGS TABLE
CREATE TABLE properties (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_urdu VARCHAR(255),
  description TEXT NOT NULL,
  description_urdu TEXT,
  price_pkr NUMERIC(14, 2) NOT NULL CHECK (price_pkr > 0),
  category property_category NOT NULL,
  city VARCHAR(100) NOT NULL,
  locality VARCHAR(150) NOT NULL,
  society VARCHAR(150) NOT NULL,
  address TEXT NOT NULL,
  size NUMERIC(10, 2) NOT NULL,
  unit property_unit NOT NULL,
  is_installment BOOLEAN NOT NULL DEFAULT FALSE,
  installment_advance_pkr NUMERIC(14, 2),
  installment_monthly_pkr NUMERIC(14, 2),
  installment_months INT,
  images JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_url TEXT,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  seller_name VARCHAR(255) NOT NULL,
  seller_phone VARCHAR(50) NOT NULL,
  seller_whatsapp VARCHAR(50) NOT NULL,
  seller_role user_role NOT NULL,
  agency_name VARCHAR(255),
  availability property_availability NOT NULL DEFAULT 'available',
  moderation_status moderation_status NOT NULL DEFAULT 'pending_review',
  rejection_reason TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_homepage_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_report TEXT,
  views_count INT NOT NULL DEFAULT 0,
  inquiries_count INT NOT NULL DEFAULT 0,
  reports_count INT NOT NULL DEFAULT 0,
  order_id VARCHAR(64) REFERENCES orders(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_category ON properties(category);
CREATE INDEX idx_properties_price ON properties(price_pkr);
CREATE INDEX idx_properties_status ON properties(moderation_status, availability);
CREATE INDEX idx_properties_featured ON properties(is_featured);

-- 8. PROPERTY INQUIRIES TABLE
CREATE TABLE property_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id VARCHAR(64) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  property_title VARCHAR(255) NOT NULL,
  seller_id UUID REFERENCES users(id) ON DELETE SET NULL,
  buyer_name VARCHAR(255) NOT NULL,
  buyer_phone VARCHAR(50) NOT NULL,
  buyer_email VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_property ON property_inquiries(property_id);
CREATE INDEX idx_inquiries_seller ON property_inquiries(seller_id);

-- 9. PROPERTY REPORTS & COMPLAINTS
CREATE TABLE property_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id VARCHAR(64) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  property_title VARCHAR(255) NOT NULL,
  reported_by VARCHAR(255) NOT NULL,
  reported_email VARCHAR(255),
  reason VARCHAR(50) NOT NULL, -- 'incorrect_price', 'fake_photos', 'already_sold', 'fraud_scam', etc.
  details TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  reviewed_by VARCHAR(255),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON property_reports(status);

-- 10. SOCIAL MEDIA ADVERTISING CAMPAIGNS
CREATE TABLE social_media_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  property_id VARCHAR(64) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  property_title VARCHAR(255) NOT NULL,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('meta', 'tiktok', 'both')),
  target_cities JSONB NOT NULL DEFAULT '[]'::jsonb,
  duration_days INT NOT NULL,
  media_budget_pkr NUMERIC(12, 2) NOT NULL,
  agency_fee_pkr NUMERIC(12, 2) NOT NULL,
  total_amount_pkr NUMERIC(12, 2) NOT NULL,
  objective VARCHAR(50) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'draft',
  platform_status_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. AUDIT LOGS TABLE
CREATE TABLE audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actor VARCHAR(255) NOT NULL,
  actor_role VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50) NOT NULL,
  target_id VARCHAR(100) NOT NULL,
  details TEXT NOT NULL
);

CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- 12. WEBSITE SETTINGS & PAYMENT CONFIGURATION
CREATE TABLE website_settings (
  id INT PRIMARY KEY DEFAULT 1,
  website_name VARCHAR(150) NOT NULL DEFAULT 'PlotBazaar Pakistan',
  tagline VARCHAR(255) NOT NULL DEFAULT 'Apni Property, Apna Mustaqbil',
  founder_name VARCHAR(150) NOT NULL DEFAULT 'Intekhab Alam',
  founder_designation VARCHAR(100) NOT NULL DEFAULT 'Founder & CEO',
  support_email VARCHAR(255) NOT NULL DEFAULT 'sunnyjiansari456@gmail.com',
  support_phone VARCHAR(50) NOT NULL DEFAULT '03363144097',
  support_whatsapp_number VARCHAR(50) NOT NULL DEFAULT '03363144097',
  support_whatsapp_url TEXT NOT NULL DEFAULT 'https://whatsapp.com/dl/',
  use_direct_whatsapp_chat BOOLEAN NOT NULL DEFAULT FALSE,
  jazzcash_number VARCHAR(50) NOT NULL DEFAULT '03701220965',
  jazzcash_account_title VARCHAR(150) NOT NULL DEFAULT 'PlotBazaar Pakistan - Intekhab Alam',
  easypaisa_number VARCHAR(50) NOT NULL DEFAULT '03489704473',
  easypaisa_account_title VARCHAR(150) NOT NULL DEFAULT 'PlotBazaar Pakistan - Intekhab Alam',
  bank_name VARCHAR(150) NOT NULL DEFAULT 'Meezan Bank Limited / HBL',
  bank_account_title VARCHAR(150) NOT NULL DEFAULT 'PlotBazaar Pakistan (Pvt) Ltd',
  bank_account_number VARCHAR(50) NOT NULL DEFAULT '0102-0105829101',
  bank_iban VARCHAR(50) NOT NULL DEFAULT 'PK36MEZN0001020105829101',
  raast_id VARCHAR(50) NOT NULL DEFAULT '03363144097',
  is_jazzcash_manual_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  is_easypaisa_manual_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  is_bank_raast_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  is_card_gateway_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  free_listings_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  free_listings_limit INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed initial settings row
INSERT INTO website_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
