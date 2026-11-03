import React, { useState } from 'react';
import { ShieldCheck, FileText, HelpCircle, RefreshCw, Lock, Building2, MessageCircle, Phone, Mail } from 'lucide-react';
import { store } from '../services/store';

interface LegalPoliciesPageProps {
  initialPolicy?: 'terms' | 'privacy' | 'refunds' | 'faq';
  onNavigate: (view: string, params?: any) => void;
}

export const LegalPoliciesPage: React.FC<LegalPoliciesPageProps> = ({
  initialPolicy = 'terms',
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'refunds' | 'faq'>(initialPolicy);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Governance & Trust
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          PlotBazaar Pakistan Policies & Legal Code
        </h1>
        <p className="text-xs text-slate-500">
          Supervised by Intekhab Alam, Founder & CEO. Last revised October 2026.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-semibold">
        {[
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          { id: 'privacy', label: 'Privacy Policy', icon: Lock },
          { id: 'refunds', label: 'Refund & Cancellation Policy', icon: RefreshCw },
          { id: 'faq', label: 'Frequently Asked Questions', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Policy Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-xs text-slate-700 leading-relaxed">
        
        {/* TERMS */}
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">1. Terms & Conditions of Marketplace Use</h2>
            <p>
              Welcome to PlotBazaar Pakistan. By accessing our public HTTPS web portal or Progressive Web App (PWA), you agree to comply with our Terms of Service. PlotBazaar Pakistan is operated under the leadership of <strong>Intekhab Alam (Founder & CEO)</strong>.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Listing Ownership & Accuracy</h3>
            <p>
              Sellers and dealers must possess lawful ownership or written authorization from the title holder before posting any plot, home, commercial shop, or agricultural parcel. Providing forged documents, bogus file numbers, or deceptive demands will result in immediate permanent listing termination and forfeiture of paid advertising fees.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Transparent Pricing & No Guarantee of Sale</h3>
            <p>
              An advertisement purchase on PlotBazaar guarantees dedicated digital display and lead routing for the configured duration (e.g. 30 days for a single Rs. 1,500 ad). <strong>An advertisement purchase does not guarantee a property sale or a predetermined quantity of inquiries.</strong>
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">No Automatic Billing Without Consent</h3>
            <p>
              PlotBazaar Pakistan does not silently re-bill users' cards or mobile wallets without affirmative consent. Subscriptions expire upon completion of their validity term unless manually renewed by the account holder.
            </p>
          </div>
        )}

        {/* PRIVACY */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">2. Privacy & Data Protection Policy</h2>
            <p>
              PlotBazaar Pakistan values the confidentiality and trust of Pakistani citizens and overseas buyers. We adhere to the strictest security benchmarks for personal and transactional data.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Information We Collect</h3>
            <p>
              We collect contact information (Full name, mobile telephone, WhatsApp number, and city) solely for displaying on user-authorized property advertisements and issuing verified payment receipts.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Zero Payment Secret Storage</h3>
            <p>
              <strong>We never store card CVV, PIN numbers, OTPs, or banking passwords.</strong> Online payments run through certified provider sandbox and live gateways. Manual Raast / bank transfer proofs are strictly stored in an access-restricted verification vault supervised by authorized administration.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">No Third-Party Data Sale</h3>
            <p>
              Your personal telephone number and email address will never be sold, rented, or distributed to third-party telemarketing firms.
            </p>
          </div>
        )}

        {/* REFUNDS */}
        {activeTab === 'refunds' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">3. Refund & Cancellation Policy</h2>
            <p>
              PlotBazaar Pakistan provides fair, transparent financial handling for all paid packages, boosts, and dealer subscriptions.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Manual Payment Rejections</h3>
            <p>
              If a user submits a manual bank transfer or Raast transaction and the administration rejects the payment due to a mismatch, duplicate entry, or inability to verify with the recipient bank, no package will be activated and the transaction is marked "Rejected" with a transparent audit log.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Pre-Approval Cancellation</h3>
            <p>
              If an advertisement is submitted for review and rejected by PlotBazaar moderation for non-compliance prior to publication, the user is entitled to a full replacement listing credit or payment reversal within 5 to 7 banking days.
            </p>

            <h3 className="font-bold text-slate-900 text-sm pt-2">Post-Activation Policy</h3>
            <p>
              Once a listing has been published or a monthly advertising package activated, digital advertising services are considered fulfilled. If an ad is voluntarily deleted by the seller before the 30-day term ends (e.g. because the property was successfully sold), remaining days cannot be refunded for cash.
            </p>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-100 gap-2">
              <h2 className="text-lg font-bold text-slate-900">4. Frequently Asked Questions (FAQs)</h2>
              <a
                href={store.getWhatsAppLink('Assalam-o-Alaikum, I have a question about PlotBazaar Pakistan policies/packages.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs self-start sm:self-auto"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp: 03363144097</span>
              </a>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">What is the cost of posting a single property ad?</h4>
                <p className="text-slate-600 mt-1">
                  A single property advertisement costs exactly Rs. 1,500 with a standard duration of 30 days. You can upload up to 10 high-resolution photos, describe amenities, and receive direct phone and WhatsApp calls. Transparent multi-ad pricing: 1 ad = Rs. 1,500; 5 ads = Rs. 7,500; 10 ads = Rs. 15,000.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">What is included in the Rs. 30,000 Monthly Advertising Package?</h4>
                <p className="text-slate-600 mt-1">
                  The monthly package includes an authorized allowance of 50 active property listings, 4 featured boosts, and a comprehensive listing and inquiry management dashboard. Listings under this allowance are not charged Rs. 1,500 individually.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">How do I pay using JazzCash, Easypaisa, or Raast?</h4>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  We support authentic manual mobile wallet and bank payments:
                  <br />• <strong>JazzCash Number:</strong> 03701220965 (Title: PlotBazaar Pakistan - Intekhab Alam)
                  <br />• <strong>Easypaisa Number:</strong> 03489704473 (Title: PlotBazaar Pakistan - Intekhab Alam)
                  <br />• <strong>Raast ID:</strong> 03363144097 (Meezan Bank Limited / HBL)
                  <br />After transferring, submit your TID / Transaction ID at checkout. The administration reviews and activates your package.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">Why are card payments labeled "Live gateway not configured"?</h4>
                <p className="text-slate-600 mt-1">
                  PlotBazaar Pakistan strictly refuses to simulate fake credit/debit card transactions. Our formal merchant acquiring onboarding with PayFast/1Link is in progress. Until official merchant integration is completed, users can pay conveniently via JazzCash, Easypaisa, or Bank/Raast.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900">What does the Property Verification badge represent?</h4>
                <p className="text-slate-600 mt-1">
                  Our verification desk reviews land allotment papers, transfer orders, or NDC documents to confirm seller authorization. <strong>Property verification must never be presented as a guarantee of legal ownership, authenticity, or freedom from disputes.</strong> Buyers must always conduct regular on-site due diligence.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Official Support & Helpdesk Information</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• Founder & CEO: <strong>Intekhab Alam</strong></p>
                  <p>• Customer Support Helpline: <a href="tel:+923363144097" className="text-amber-300 underline">03363144097</a></p>
                  <p>• Official Support Email: <a href="mailto:sunnyjiansari456@gmail.com" className="text-amber-300 underline">sunnyjiansari456@gmail.com</a></p>
                  <p>• Official WhatsApp: <strong>03363144097</strong></p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
