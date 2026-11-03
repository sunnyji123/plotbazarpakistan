import React from 'react';
import { Building2, ShieldCheck, Target, Heart, CheckCircle2, Award, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutUsPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  const { t, isUrdu } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Apni Property, Apna Mustaqbil</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          About PlotBazaar Pakistan
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded and directed by <strong>Intekhab Alam (Founder & CEO)</strong>, PlotBazaar Pakistan is built on the belief that acquiring real estate should be honest, transparent, and accessible to every Pakistani.
        </p>
      </div>

      {/* Founder Spotlight */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 text-white p-8 sm:p-12 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-center gap-8">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-4xl shrink-0 shadow-lg">
          IA
        </div>

        <div className="space-y-3 text-start flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Executive Leadership
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">
            Intekhab Alam — Founder & CEO
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed italic">
            "We envisioned PlotBazaar Pakistan to eradicate the uncertainty, hidden costs, and unverified promises that plagued property buyers. By offering fixed Rs. 1,500 transparent ads, owner-configured monthly agency quotas, and documentary scrutiny, we ensure that every rupee spent delivers genuine value."
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
            <span>• Karachi Head Office</span>
            <span>• Nationwide Allotments</span>
            <span>• SECP & NTN Registered</span>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Documentary Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every verified listing on PlotBazaar undergoes documentary inspection by our legal desk. We check allocation letters, NDCs, and society permissions.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Award className="w-5 h-5 text-amber-700" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Zero Hidden Charges</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All prices are stated transparently in PKR. Single ads cost exactly Rs. 1,500; monthly advertising is Rs. 30,000 for 50 listings with no double-billing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-700" />
          </div>
          <h3 className="font-bold text-base text-slate-900">Direct Contact</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Connect directly with verified owners and agencies through WhatsApp and direct phone calls with zero intermediaries holding back information.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 rounded-3xl bg-slate-100 border border-slate-200/80 space-y-4">
        <h3 className="text-xl font-bold text-slate-900">Ready to find your ideal plot in Pakistan?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Explore hundreds of verified residential plots, commercial shops, and installment plans across Lahore, Karachi, Islamabad, and Gwadar.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onNavigate('browse')}
            className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition"
          >
            Browse Properties
          </button>
          <button
            onClick={() => onNavigate('packages')}
            className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition"
          >
            View Pricing
          </button>
        </div>
      </div>

    </div>
  );
};
