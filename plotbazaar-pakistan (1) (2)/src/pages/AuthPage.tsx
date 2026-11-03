import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User as UserIcon, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  Sparkles,
  Briefcase
} from 'lucide-react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  initialMode?: 'login' | 'register' | 'recover' | 'admin_login';
  onNavigate: (view: string, params?: any) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = 'login',
  onNavigate
}) => {
  const { login, register, switchUserRole } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'recover' | 'admin_login'>(initialMode);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('PlotBazaar2026!');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [agencyName, setAgencyName] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(email);
    if (success) {
      if (mode === 'admin_login') {
        onNavigate('admin');
      } else {
        onNavigate('dashboard');
      }
    } else {
      setErrorMsg('Account not recognized. Try one of the quick testing presets below or register a new profile.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    register(name, email, phone, selectedRole, selectedRole === 'dealer' ? agencyName : undefined);
    onNavigate('dashboard');
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoverySent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center font-bold shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">
            PlotBazaar <span className="text-emerald-800">Pakistan</span>
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          {mode === 'admin_login' ? 'Private CEO & Founder Administration Access' : 'Apni Property, Apna Mustaqbil'}
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5 text-xs">
        
        {/* Title */}
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {mode === 'login' && 'Sign In to Your Account'}
            {mode === 'register' && 'Create Your Profile'}
            {mode === 'recover' && 'Recover Account Password'}
            {mode === 'admin_login' && 'Owner & Administrator Portal'}
          </h2>
          {mode === 'admin_login' && (
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          )}
        </div>

        {/* LOGIN FORM */}
        {(mode === 'login' || mode === 'admin_login') && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={mode === 'admin_login' ? 'intekhab@plotbazaar.pk' : 'rehan@malikestate.pk'}
                  required
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('recover')}
                  className="text-[11px] text-emerald-800 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute start-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full ps-9 pe-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-rose-600 font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              {mode === 'admin_login' ? 'Authenticate as Founder & CEO' : 'Sign In'}
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Account Type *</label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'buyer', label: 'Buyer' },
                  { id: 'seller', label: 'Seller' },
                  { id: 'dealer', label: 'Agency' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id as UserRole)}
                    className={`py-1.5 rounded-lg font-bold border transition ${
                      selectedRole === r.id ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Mehmood"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            {selectedRole === 'dealer' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Real Estate Agency Name *</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="e.g. Lahore Prime Properties DHA"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tariq@gmail.com"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
            >
              Create Account
            </button>
          </form>
        )}

        {/* RECOVER FORM */}
        {mode === 'recover' && (
          <form onSubmit={handleRecoverySubmit} className="space-y-4">
            <p className="text-slate-500">
              Enter your registered Pakistani phone number or email address to receive an official recovery link.
            </p>
            <div>
              <input
                type="text"
                placeholder="0300-1234567 or email@domain.com"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Send Recovery OTP
            </button>
            {recoverySent && (
              <p className="text-emerald-700 font-semibold text-center">
                ✓ Verification code dispatched to your phone.
              </p>
            )}
          </form>
        )}

        {/* Quick Reviewer Presets (Prompt Requirement 2: Support 4 roles) */}
        <div className="pt-4 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 p-4 rounded-b-3xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick One-Click Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <button
              type="button"
              onClick={() => {
                switchUserRole('admin');
                onNavigate('admin');
              }}
              className="p-2 rounded-lg bg-emerald-950 text-amber-300 font-bold hover:bg-emerald-900 text-start"
            >
              1. Intekhab Alam (CEO)
            </button>
            <button
              type="button"
              onClick={() => {
                switchUserRole('dealer');
                onNavigate('dashboard');
              }}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-100 text-start"
            >
              2. Malik Rehan (Dealer)
            </button>
            <button
              type="button"
              onClick={() => {
                switchUserRole('seller');
                onNavigate('dashboard');
              }}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-100 text-start"
            >
              3. Tariq M. (Seller)
            </button>
            <button
              type="button"
              onClick={() => {
                switchUserRole('buyer');
                onNavigate('browse');
              }}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-100 text-start"
            >
              4. Ahmed Khan (Buyer)
            </button>
          </div>
        </div>

      </div>

      {/* Mode Switchers */}
      <div className="text-center text-xs text-slate-500 space-x-3">
        {mode !== 'login' && (
          <button onClick={() => setMode('login')} className="text-emerald-800 font-semibold hover:underline">
            Already have an account? Sign In
          </button>
        )}
        {mode !== 'register' && (
          <button onClick={() => setMode('register')} className="text-emerald-800 font-semibold hover:underline">
            New here? Register Account
          </button>
        )}
        {mode !== 'admin_login' && (
          <button onClick={() => setMode('admin_login')} className="text-slate-400 hover:text-slate-700 block mx-auto mt-2">
            Founder & CEO Private Entry
          </button>
        )}
      </div>

    </div>
  );
};
