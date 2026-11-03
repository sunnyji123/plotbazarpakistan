import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  Calculator, 
  Info
} from 'lucide-react';
import { Package } from '../types';
import { store } from '../services/store';
import { useLanguage } from '../context/LanguageContext';

interface PackagesPageProps {
  onSelectPackageForCheckout: (pkg: Package, quantity: number) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ 
  onSelectPackageForCheckout,
  onNavigate 
}) => {
  const { isUrdu } = useLanguage();
  const packages = store.getPackages();

  const [singleAdQuantity, setSingleAdQuantity] = useState<number>(1);

  const singleAdPkg = packages.find((p) => p.id === 'single_ad') || packages[0];
  const monthlyPkg = packages.find((p) => p.id === 'monthly_ad_30k') || packages[1];
  const dealerTiers = packages.filter((p) => p.category === 'dealer_tier');
  const addOnServices = packages.filter((p) => p.category === 'addon');

  const singleAdTotal = singleAdQuantity * singleAdPkg.pricePKR;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Official PlotBazaar Rate Card · Founder Supervised</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Transparent Advertising Packages & Pricing
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Select individual property advertisements, monthly advertising quotas, or agency subscriptions. All amounts are in Pakistani Rupees (PKR) with zero hidden fees.
        </p>
      </div>

      {/* SECTION A: Single Property Advertisement & Interactive Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Package A
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Single Property Advertisement
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              For individual plot or home sellers who want dedicated visibility without a recurring commitment.
            </p>
          </div>

          <div className="text-start lg:text-end">
            <span className="text-xs text-slate-400">Fixed rate per advertisement</span>
            <p className="text-3xl font-extrabold text-emerald-900">
              Rs. {singleAdPkg.pricePKR.toLocaleString('en-PK')}
              <span className="text-xs text-slate-500 font-normal"> / 30 Days</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included Features</h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              {singleAdPkg.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-700" />
                Transparent Pricing Guarantee:
              </p>
              <p>• 1 Property Advertisement = <strong>Rs. 1,500</strong></p>
              <p>• 5 Property Advertisements = <strong>Rs. 7,500</strong></p>
              <p>• 10 Property Advertisements = <strong>Rs. 15,000</strong></p>
            </div>
          </div>

          {/* Interactive Calculator Box */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" />
                  Quantity Calculator
                </span>
                <span className="text-xs text-slate-300">
                  {singleAdQuantity} Ad{singleAdQuantity > 1 ? 's' : ''} Selected
                </span>
              </div>

              <div className="mt-4">
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  How many property advertisements do you need?
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={singleAdQuantity}
                    onChange={(e) => setSingleAdQuantity(Number(e.target.value))}
                    className="flex-1 accent-amber-400"
                  />
                  <div className="w-12 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-white text-base">
                    {singleAdQuantity}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  {[1, 3, 5, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSingleAdQuantity(num)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                        singleAdQuantity === num
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-white/10 hover:bg-white/20 text-slate-200'
                      }`}
                    >
                      {num} {num === 1 ? 'Ad' : 'Ads'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Unit Price:</span>
                  <span>Rs. {singleAdPkg.pricePKR.toLocaleString('en-PK')} / ad</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-200">Final Payable Amount:</span>
                  <span className="text-2xl font-black text-amber-400">
                    Rs. {singleAdTotal.toLocaleString('en-PK')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPackageForCheckout(singleAdPkg, singleAdQuantity)}
              className="mt-6 w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION B: Monthly Property Advertising Package */}
      <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 border border-emerald-800 shadow-xl">
        <span className="absolute top-6 end-6 text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-3 py-1 rounded-full shadow-md">
          {monthlyPkg.badge || 'Agency Monthly Solution'}
        </span>

        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Package B · High Volume
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Monthly Property Advertising Package
          </h2>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white">
              Rs. {monthlyPkg.pricePKR.toLocaleString('en-PK')}
            </span>
            <span className="text-sm text-emerald-300">/ Month</span>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {monthlyPkg.description}
          </p>
        </div>

        <div className="my-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-sm">
              Strict Listing Limit Policy:
            </p>
            <p className="mt-0.5 leading-relaxed">
              This package includes an authorized allowance of <strong>{monthlyPkg.listingAllowance} active property advertisements</strong>. As required by PlotBazaar rules, we do not claim "unlimited listings" without admin configuration. Advertisements covered under this allowance will <strong>never</strong> be double-charged Rs. 1,500 individually.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {monthlyPkg.benefits.map((b, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
              <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            <span>Duration: <strong>30 days from activation</strong></span>
            <span className="mx-2">·</span>
            <span>Extra listings: <strong>Rs. 300 / ad</strong></span>
          </div>

          <button
            onClick={() => onSelectPackageForCheckout(monthlyPkg, 1)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
          >
            <span>Activate Monthly Package (Rs. 30,000)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION C: Dealer Subscription Packages */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Package C · Dealer Tiers
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Dealer Subscription Packages
          </h2>
          <p className="text-xs text-slate-500">
            Separate optional subscriptions tailored for agency scale, directory branding, and client inquiry dashboards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealerTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-200 ${
                tier.badge
                  ? 'bg-emerald-950 text-white border-emerald-800 shadow-lg'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div>
                {tier.badge && (
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full mb-3">
                    {tier.badge}
                  </span>
                )}
                <h3 className={`text-base font-bold ${tier.badge ? 'text-white' : 'text-slate-900'}`}>
                  {tier.title}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-2xl font-black ${tier.badge ? 'text-amber-400' : 'text-slate-900'}`}>
                    {tier.id === 'dealer_enterprise' ? 'Custom' : `Rs. ${tier.pricePKR.toLocaleString('en-PK')}`}
                  </span>
                  <span className={`text-xs ${tier.badge ? 'text-slate-400' : 'text-slate-500'}`}>
                    / month
                  </span>
                </div>
                <p className={`text-xs mt-2 ${tier.badge ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>

                <div className={`my-4 py-2 px-3 rounded-lg text-xs font-semibold ${tier.badge ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'}`}>
                  Allowance: {tier.listingAllowance} Active Listings
                </div>

                <ul className="space-y-2 text-xs">
                  {tier.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.badge ? 'text-amber-400' : 'text-emerald-700'}`} />
                      <span className={tier.badge ? 'text-slate-200' : 'text-slate-700'}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPackageForCheckout(tier, 1)}
                className={`mt-6 w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition ${
                  tier.badge
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                }`}
              >
                {tier.id === 'dealer_enterprise' ? 'Request Custom Tier' : `Select ${tier.title.split(' ')[0]}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION D: Additional Paid Services */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            Package D · Add-on Services
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Optional Paid Visibility Boosts & Reviews
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Boost individual listings to the top or obtain a verified agency review from our legal desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addOnServices.map((addon) => (
            <div key={addon.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-sm text-slate-900">{addon.title}</h4>
                  <span className="text-xs font-black text-emerald-800 shrink-0">
                    Rs. {addon.pricePKR.toLocaleString('en-PK')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{addon.description}</p>
                <p className="text-[11px] text-slate-400 mt-2">Duration: {addon.durationDays} Days</p>
              </div>

              <button
                onClick={() => onSelectPackageForCheckout(addon, 1)}
                className="mt-4 w-full py-2 rounded-lg bg-slate-100 hover:bg-emerald-800 hover:text-white text-slate-800 font-semibold text-xs transition"
              >
                Order Addon
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION E: Free Basic Account */}
      <div className="rounded-2xl border border-slate-200 p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Package E · Free Account
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Free Buyer & Basic Account (Rs. 0)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse all properties, save favorites, contact sellers, submit reports, and use any owner-enabled free listing allowance.
          </p>
        </div>

        <button
          onClick={() => onNavigate('browse')}
          className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shrink-0"
        >
          Browse Free Properties
        </button>
      </div>

    </div>
  );
};
