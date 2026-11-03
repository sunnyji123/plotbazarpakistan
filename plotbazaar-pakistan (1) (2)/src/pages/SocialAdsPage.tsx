import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Smartphone, 
  Target, 
  Clock, 
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SocialMediaCampaign, Property } from '../types';
import { store, formatPKR } from '../services/store';
import { useAuth } from '../context/AuthContext';

interface SocialAdsPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const SocialAdsPage: React.FC<SocialAdsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const properties = store.getProperties().filter((p) => p.moderationStatus === 'approved');
  const existingCampaigns = store.getSocialCampaigns();

  const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0]?.id || '');
  const [platform, setPlatform] = useState<'meta' | 'tiktok' | 'both'>('meta');
  const [mediaBudgetPKR, setMediaBudgetPKR] = useState<number>(10000);
  const [durationDays, setDurationDays] = useState<number>(7);
  const [targetCities, setTargetCities] = useState<string[]>(['Karachi', 'Lahore']);
  const [objective, setObjective] = useState<'lead_generation' | 'whatsapp_chats' | 'brand_reach'>('whatsapp_chats');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  // Agency management fee: 15% transparent surcharge
  const agencyFeePKR = Math.round(mediaBudgetPKR * 0.15);
  const totalCampaignCostPKR = mediaBudgetPKR + agencyFeePKR;

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = properties.find((p) => p.id === selectedPropertyId);
    if (!prop) return;

    setIsSubmitting(true);
    store.createSocialCampaign({
      userId: user?.id || 'guest',
      propertyId: prop.id,
      propertyTitle: prop.title,
      platform,
      targetCities,
      durationDays,
      mediaBudgetPKR,
      agencyFeePKR,
      totalAmountPKR: totalCampaignCostPKR,
      objective,
      status: 'pending_approval',
      platformStatusNotes: 'Campaign submitted for Meta/TikTok Sandbox review. Live delivery requires platform credential handshake.'
    });

    setIsSubmitting(false);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Meta & TikTok Digital Advertising Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Social Media Property Promotion
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Boost your high-value plots, commercial plazas, and homes directly on Facebook, Instagram, and TikTok to reach local and overseas Pakistani property investors.
        </p>
      </div>

      {/* Transparency & Anti-Fabrication Notice (Section 9 Requirement) */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
        <p className="font-bold flex items-center gap-1.5 text-sm">
          <ShieldCheck className="w-4 h-4 text-amber-800" />
          PlotBazaar Ethical Advertising Disclosure:
        </p>
        <p className="leading-relaxed text-amber-800">
          Per PlotBazaar governance: We do <strong>not</strong> fabricate impressions, fake clicks, or artificial leads. Social ad spend is explicitly separated into <strong>Direct Platform Media Spend (100% paid to Meta/TikTok)</strong> and a transparent <strong>15% PlotBazaar Creative & Management Fee</strong>. Social media advertising is an optional add-on and is not bundled automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Campaign Builder Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Configure Property Ad Campaign
          </h2>

          <form onSubmit={handleCreateCampaign} className="space-y-5">
            {/* 1. Property to promote */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Select Property *</label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium bg-white"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({formatPKR(p.pricePKR)}) - {p.city}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Platform */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Target Advertising Platform *</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'meta', label: 'Meta (FB & IG)' },
                  { id: 'tiktok', label: 'TikTok For Business' },
                  { id: 'both', label: 'Both (Cross-Platform)' }
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.id as any)}
                    className={`py-2 px-3 rounded-xl font-bold border transition text-center ${
                      platform === p.id 
                        ? 'bg-emerald-800 text-white border-emerald-800' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Campaign Objective */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Campaign Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
              >
                <option value="whatsapp_chats">Direct WhatsApp Inquiries (Best for Serious Buyers)</option>
                <option value="lead_generation">Lead Contact Form (Collect Phone & City)</option>
                <option value="brand_reach">Maximum Pakistani Investor Reach</option>
              </select>
            </div>

            {/* 4. Media Budget Slider */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Platform Media Budget (Direct Ad Spend)</span>
                <span className="font-bold text-emerald-800">Rs. {mediaBudgetPKR.toLocaleString('en-PK')}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="2500"
                value={mediaBudgetPKR}
                onChange={(e) => setMediaBudgetPKR(Number(e.target.value))}
                className="w-full accent-emerald-800"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Rs. 5,000 (Min)</span>
                <span>Rs. 25,000</span>
                <span>Rs. 50,000 (Max)</span>
              </div>
            </div>

            {/* 5. Campaign Duration */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 7, 14, 30].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`py-1.5 rounded-lg font-bold border transition text-center ${
                      durationDays === days 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Transparent Cost Breakdown Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2.5">
              <div className="flex justify-between text-slate-300">
                <span>Platform Ad Spend (Meta / TikTok):</span>
                <span className="font-semibold text-white">Rs. {mediaBudgetPKR.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>PlotBazaar Management Fee (15%):</span>
                <span className="font-semibold text-amber-400">Rs. {agencyFeePKR.toLocaleString('en-PK')}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-bold text-sm">Total Campaign Investment:</span>
                <span className="text-xl font-black text-amber-400">
                  Rs. {totalCampaignCostPKR.toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
            >
              <span>Submit Campaign Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {successNotice && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-center">
                ✓ Campaign created and submitted for platform review.
              </div>
            )}
          </form>
        </div>

        {/* Existing Campaigns & Live Status */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
              <span>Active Social Media Campaigns</span>
              <span className="text-xs text-slate-400">{existingCampaigns.length} Total</span>
            </h3>

            <div className="space-y-3 text-xs">
              {existingCampaigns.map((camp) => (
                <div key={camp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{camp.propertyTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Platform: <strong className="uppercase">{camp.platform}</strong></p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                      {camp.status}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-900">Platform Status:</p>
                    <p className="text-[11px] leading-relaxed">{camp.platformStatusNotes}</p>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span>Spend: <strong>Rs. {camp.totalAmountPKR.toLocaleString('en-PK')}</strong></span>
                    <span>Duration: <strong>{camp.durationDays} Days</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
