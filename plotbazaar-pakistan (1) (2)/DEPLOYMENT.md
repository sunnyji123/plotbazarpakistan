# PlotBazaar Pakistan — Deployment & Production Architecture Guide

**Brand Name:** PlotBazaar Pakistan  
**Founder & CEO:** Intekhab Alam  
**Tagline:** Apni Property, Apna Mustaqbil  
**Official Helpline & WhatsApp:** 03363144097  
**Official Support Email:** sunnyjiansari456@gmail.com  
**Currency:** Pakistani Rupees (PKR)

---

## 1. System Architecture Overview

PlotBazaar Pakistan is built as a responsive, mobile-first marketplace and Progressive Web App (PWA) with a modular architecture:

1. **Frontend Client:**
   - React 19 + TypeScript on Vite.
   - Tailwind CSS for responsive styling across Android, iOS, Windows, and macOS.
   - Full bilingual support (English and Urdu with dynamic RTL layout).
   - Offline-capable PWA with Service Worker (`/public/sw.js`), Web App Manifest (`/public/manifest.json`), and custom install UI.

2. **Data & State Architecture:**
   - Client-side reactive persistence store with localStorage fallback for instant responsiveness.
   - Enterprise PostgreSQL relational database schema defined in `/src/db/schema.sql` (compatible with Cloud SQL, Supabase, Neon, or self-hosted PostgreSQL).
   - Enforced role-based access control (RBAC): `Buyer`, `Seller`, `Dealer`, and `Administrator`.

3. **Payments & Order Verification:**
   - **JazzCash Manual Wallet:** Payment to `03701220965` (Title: *PlotBazaar Pakistan - Intekhab Alam*).
   - **Easypaisa Manual Wallet:** Payment to `03489704473` (Title: *PlotBazaar Pakistan - Intekhab Alam*).
   - **Online Bank Transfer / Raast:** Account with Meezan Bank Limited / HBL, Raast ID `03363144097`, IBAN `PK36MEZN0001020105829101`.
   - **Online Debit/Credit Card:** Transparently labeled *"Live gateway not configured — merchant gateway onboarding in progress"* to prevent any simulated or fake transaction claims.
   - **Manual Verification Queue:** Founder & CEO Intekhab Alam audits transaction references and approves orders before service activation.

4. **WhatsApp Support Integration:**
   - Configured WhatsApp URL: `https://whatsapp.com/dl/` (owner-supplied).
   - Admin-configurable direct chat toggle to `https://wa.me/923363144097` with pre-filled property inquiries.
   - WhatsApp Support buttons present in Header, Footer, Contact Us, Dashboard, and Property Cards.

---

## 2. Environment Variables (.env)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` |
| `PORT` | Web server port | `3000` |
| `APP_URL` | Public HTTPS domain URL | `https://plotbazaar.pk` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@host:5432/plotbazaar` |
| `ADMIN_EMAIL` | Super admin user email | `sunnyjiansari456@gmail.com` |
| `HELPLINE_PHONE` | Customer support telephone | `03363144097` |
| `JAZZCASH_NUMBER` | Manual JazzCash recipient | `03701220965` |
| `EASYPAISA_NUMBER`| Manual Easypaisa recipient | `03489704473` |

---

## 3. Database Setup & Migrations

Execute the schema against your PostgreSQL instance:

```bash
# Connect and execute schema
psql -h <DB_HOST> -U <DB_USER> -d plotbazaar -f src/db/schema.sql
```

The schema creates:
- `users`, `packages`, `dealer_subscriptions`
- `orders`, `order_items`
- `properties`, `property_inquiries`, `property_reports`
- `social_media_campaigns`
- `audit_logs`
- `website_settings`

---

## 4. Manual Payment Verification SOP for Intekhab Alam (Founder & CEO)

1. **Login to Admin Portal:** Navigate to `/admin` or click "CEO Admin Portal".
2. **Review Payment Approvals:** Open the "Payment Approvals" tab.
3. **Verify Bank Statement / Wallet Notification:**
   - For JazzCash: Check SMS from `8558` on mobile `03701220965` matching the 11-digit TID.
   - For Easypaisa: Check SMS from `3737` on mobile `03489704473` matching the TRX ID.
   - For Bank / Raast: Verify recipient credit in Meezan Bank / HBL statement.
4. **Approve or Reject:**
   - Click **Approve Payment**: The order is marked `completed`, the receipt is stamped `PAID`, and listing quota or 30-day listing is immediately activated.
   - Click **Reject Payment**: Enter the recorded reason (e.g. *"Transaction ID not found in 8558 records"*). The order is marked `rejected` and recorded in the immutable audit log.

---

## 5. Security & Verification Disclaimers

- **Zero Plaintext Credentials:** Passwords use cryptographic bcrypt/argon2 hashing.
- **No Card Data Collection:** Card CVV, PINs, or banking OTPs are never collected or stored.
- **Verification Disclaimer:** Property verification is a documentary audit of allotment letters, NDC, and registry documents. It does not replace on-site physical inspection and customary legal due diligence by buyer's counsel.
