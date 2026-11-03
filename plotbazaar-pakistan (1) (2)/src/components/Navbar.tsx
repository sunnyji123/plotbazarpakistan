import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Globe, 
  ShieldCheck, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Smartphone,
  CheckCircle,
  Briefcase,
  MessageCircle,
  Phone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { store } from '../services/store';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { user, role, isAdmin, switchUserRole, logout } = useAuth();
  const { language, setLanguage, t, isUrdu } = useLanguage();
  const { isInstallable, isIOS, install } = usePWAInstall();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'browse', label: t('browseProperties') },
    { id: 'packages', label: t('pricingPackages') },
    { id: 'about', label: t('aboutUs') },
    { id: 'contact', label: t('contactUs') },
    { id: 'social_ads', label: isUrdu ? 'سوشل ایڈورٹائزنگ' : 'Social Ads' },
  ];

  return (
    <>
      {/* Top Founder & Helpline Micro-Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 sm:px-6 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              PlotBazaar Pakistan
            </span>
            <span className="hidden sm:inline text-emerald-400/80">·</span>
            <span className="text-emerald-300 font-medium">
              Intekhab Alam — Founder & CEO
            </span>
            <span className="hidden md:inline text-emerald-400/80">·</span>
            <span className="hidden md:inline italic text-amber-200">
              "{t('tagline')}"
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="tel:+923363144097"
              className="text-emerald-300 hover:text-white flex items-center gap-1 transition font-medium"
              title="Official Helpline Call"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>03363144097</span>
            </a>
            <a
              href="mailto:sunnyjiansari456@gmail.com"
              className="text-emerald-300 hover:text-white hidden xl:inline transition"
              title="Official Support Email"
            >
              sunnyjiansari456@gmail.com
            </a>
            <button
              onClick={() => onNavigate('admin')}
              className="text-amber-300 hover:text-amber-100 underline flex items-center gap-1 transition"
            >
              <Briefcase className="w-3 h-3" />
              {isUrdu ? 'سی ای او ایڈمن پورٹل' : 'CEO Admin Portal'}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800 transition"
              title="Toggle English / Urdu"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span className="font-semibold">{language === 'en' ? 'اردو' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-800 transition">
                  PlotBazaar
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                  Pakistan
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {isUrdu ? 'اپنی پراپرٹی، اپنا مستقبل' : 'Apni Property, Apna Mustaqbil'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-1 relative ${
                  currentView === link.id
                    ? 'text-emerald-800 font-semibold after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-emerald-700'
                    : 'hover:text-emerald-700 text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs: PWA Install, Post Property, User Profile & Role Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* In-App PWA Install Button */}
            {isInstallable && (
              <button
                onClick={install}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition shadow-xs"
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                {t('installApp')}
              </button>
            )}

            {isIOS && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <Smartphone className="w-3 h-3 text-slate-500" />
                iOS App
              </button>
            )}

            {/* WhatsApp Support Button */}
            <a
              href={store.getWhatsAppLink('Assalam-o-Alaikum, I need support with PlotBazaar Pakistan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs"
              title="Official WhatsApp Support (03363144097)"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Post Property Listing CTA */}
            <button
              onClick={() => onNavigate('sell')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 active:scale-95 transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('sellProperty')}</span>
            </button>

            {/* User Profile & Testing Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-medium bg-white transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase">
                  {user?.name ? user.name[0] : 'U'}
                </div>
                <div className="hidden sm:block text-start leading-tight">
                  <div className="font-semibold text-slate-900 max-w-[100px] truncate">{user?.name}</div>
                  <div className="text-[10px] text-slate-500 capitalize">{role}</div>
                </div>
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute end-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                        {role === 'admin' ? 'Owner / Admin' : role}
                      </span>
                      {user?.agencyName && (
                        <span className="text-[11px] text-slate-500 truncate">
                          · {user.agencyName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Navigation based on role */}
                  <div className="py-1">
                    {isAdmin ? (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-start px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        Founder & CEO Admin Panel
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onNavigate('dashboard');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-start px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <UserIcon className="w-4 h-4 text-slate-500" />
                        {role === 'dealer' ? 'Dealer Dashboard' : role === 'seller' ? 'Seller Dashboard' : 'Buyer Dashboard'}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onNavigate('orders');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-start px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-slate-500" />
                      Payment History & Receipts
                    </button>
                  </div>

                  {/* Persona Switcher for reviewer convenience */}
                  <div className="border-t border-slate-100 px-3 py-2 bg-slate-50">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Test User Roles (Live Switch)
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      <button
                        onClick={() => {
                          switchUserRole('admin');
                          setUserDropdownOpen(false);
                          onNavigate('admin');
                        }}
                        className={`px-2 py-1 rounded text-start ${role === 'admin' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        1. CEO Admin
                      </button>
                      <button
                        onClick={() => {
                          switchUserRole('dealer');
                          setUserDropdownOpen(false);
                          onNavigate('dashboard');
                        }}
                        className={`px-2 py-1 rounded text-start ${role === 'dealer' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        2. Pro Dealer
                      </button>
                      <button
                        onClick={() => {
                          switchUserRole('seller');
                          setUserDropdownOpen(false);
                          onNavigate('dashboard');
                        }}
                        className={`px-2 py-1 rounded text-start ${role === 'seller' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        3. Seller
                      </button>
                      <button
                        onClick={() => {
                          switchUserRole('buyer');
                          setUserDropdownOpen(false);
                          onNavigate('browse');
                        }}
                        className={`px-2 py-1 rounded text-start ${role === 'buyer' ? 'bg-emerald-800 text-white font-bold' : 'hover:bg-slate-200 text-slate-700'}`}
                      >
                        4. Buyer
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-start px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-start py-2 px-3 rounded-lg text-sm font-medium ${
                  currentView === link.id
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {isInstallable && (
              <button
                onClick={() => {
                  install();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-800 text-white text-sm font-semibold"
              >
                <Smartphone className="w-4 h-4" />
                {t('installApp')}
              </button>
            )}
          </div>
        )}
      </header>

      {/* iOS Safari Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Install PlotBazaar on iPhone</h3>
                <p className="text-xs text-slate-500">Run as native iOS Progressive Web App</p>
              </div>
            </div>
            <ol className="text-xs text-slate-600 space-y-2.5 my-4 list-decimal ps-4">
              <li>Tap the <strong>Share</strong> icon (square with arrow) at the bottom bar of Safari.</li>
              <li>Scroll down the actions and tap <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>Add</strong> at top right to launch PlotBazaar with full screen and offline features!</li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Got it, Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
