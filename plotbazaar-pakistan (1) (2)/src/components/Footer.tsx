import React from 'react';
import { Building2, ShieldCheck, Phone, Mail, MapPin, Heart, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { store } from '../services/store';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, isUrdu } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Founder Spotlight Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 sm:p-8 border border-emerald-800/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white tracking-tight">PlotBazaar Pakistan</h3>
                  <span className="text-[11px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                    Official Portal
                  </span>
                </div>
                <p className="text-sm text-emerald-300 font-medium mt-0.5">
                  Intekhab Alam — Founder & CEO
                </p>
                <p className="text-xs text-slate-400 mt-1 italic">
                  "{t('tagline')}" · Pakistan's premier transparent property portal.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('packages')}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-sm"
              >
                {isUrdu ? 'اشتہاری پیکیجز دیکھیں' : 'View Advertising Packages'}
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition border border-slate-700"
              >
                {t('aboutUs')}
              </button>
            </div>
          </div>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About & Vision */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-white">PlotBazaar</span>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Pakistan</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              PlotBazaar Pakistan is built to empower Pakistani buyers, individual sellers, and authorized real estate agencies with transparent pricing, strict listing verification, and zero hidden charges.
            </p>
            <div className="text-xs text-emerald-400 font-medium space-y-1">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Single Ad from Rs. 1,500 (30 Days)
              </p>
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Monthly Agency Package: Rs. 30,000
              </p>
            </div>
          </div>

          {/* Col 2: Property Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isUrdu ? 'پراپرٹی اقسام' : 'Property Categories'}
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('browse', { category: 'residential_plot' })} className="hover:text-emerald-400 transition">
                  {t('residentialPlots')} (DHA, Bahria, LDA, CDA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', { category: 'commercial_plot' })} className="hover:text-emerald-400 transition">
                  {t('commercialPlots')} & Plazas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', { category: 'house' })} className="hover:text-emerald-400 transition">
                  {t('houses')} & Designer Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', { category: 'agricultural' })} className="hover:text-emerald-400 transition">
                  {t('agricultural')} & Farmhouses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('browse', { isInstallment: true })} className="hover:text-emerald-400 transition">
                  {t('installment')} Properties
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Packages & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isUrdu ? 'پیکجز اور ڈیلر خدمات' : 'Packages & Services'}
            </h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 transition">
                  Single Property Ad (Rs. 1,500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 transition">
                  Monthly Advertising Package (Rs. 30,000)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 transition">
                  Starter Dealer Tier (Rs. 2,000/mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-emerald-400 transition">
                  Professional Dealer Tier (Rs. 5,000/mo)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('social_ads')} className="hover:text-emerald-400 transition">
                  Social Media Promotion (Meta & TikTok)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-emerald-400 transition">
                  Payment History & Official Receipts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts & Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {isUrdu ? 'رابطہ و ہیلپ لائن' : 'Official Helpdesks'}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>PlotBazaar Pakistan Tower, Shahrah-e-Faisal, Karachi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+923363144097" className="hover:text-emerald-300 transition font-medium">
                  03363144097 (Helpline)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:sunnyjiansari456@gmail.com" className="hover:text-emerald-300 transition break-all font-medium">
                  sunnyjiansari456@gmail.com
                </a>
              </div>

              {/* WhatsApp Support Button */}
              <div className="pt-2">
                <a
                  href={store.getWhatsAppLink('Assalam-o-Alaikum, I would like assistance regarding PlotBazaar Pakistan.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
                  title="Official WhatsApp Support: 03363144097"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Support: 03363144097</span>
                </a>
              </div>

              <div className="pt-1 text-[11px] text-slate-400 space-y-0.5">
                <p>JazzCash: <strong className="text-emerald-300">03701220965</strong></p>
                <p>Easypaisa: <strong className="text-emerald-300">03489704473</strong></p>
              </div>

              <div className="pt-1 flex items-center gap-2 text-slate-500 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Intekhab Alam — Founder & CEO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Policies and Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            {t('copyright')}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => onNavigate('terms')} className="hover:text-slate-300 transition">
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('privacy')} className="hover:text-slate-300 transition">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('refunds')} className="hover:text-slate-300 transition">
              Refund & Cancellation Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('faq')} className="hover:text-slate-300 transition">
              FAQs & Verification Desk
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
