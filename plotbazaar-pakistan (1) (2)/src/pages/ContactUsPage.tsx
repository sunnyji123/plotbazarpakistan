import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { store } from '../services/store';

interface ContactUsPageProps {
  onNavigate: (view: string, params?: any) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Karachi');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Official Helpdesk
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact PlotBazaar Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Our verification team, customer support, and Founder's office are ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5 text-xs">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Send an Official Inquiry
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tariq@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
                >
                  {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Gwadar', 'Overseas Pakistani'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message or Query *</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with advertising, verification, or agency packages?"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Message to Support</span>
            </button>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Thank you! Your inquiry has been routed to our Karachi helpdesk.</span>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {/* Executive Contact Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>PlotBazaar Pakistan Leadership</span>
            </div>
            <p className="text-slate-700 font-semibold">
              Intekhab Alam — Founder & CEO
            </p>
            <p className="text-slate-500 text-[11px] italic">
              "Apni Property, Apna Mustaqbil"
            </p>
            <div className="pt-2 border-t border-slate-100 space-y-2 text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="tel:+923363144097" className="font-bold text-emerald-800 hover:underline">
                  03363144097 (Direct Customer Helpline)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <a href="mailto:sunnyjiansari456@gmail.com" className="font-bold text-emerald-800 hover:underline break-all">
                  sunnyjiansari456@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Official WhatsApp Support Card & Button */}
          <div className="p-5 rounded-2xl bg-emerald-950 text-white space-y-3 text-xs shadow-md border border-emerald-900">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                Official WhatsApp Support
              </span>
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
                03363144097
              </span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Connect directly with our customer support desk for property verification, advertising package inquiries, and payment verification assistance.
            </p>
            <a
              href={store.getWhatsAppLink('Assalam-o-Alaikum, I would like support regarding PlotBazaar Pakistan.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-sm"
              title="Official WhatsApp: 03363144097"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Support (03363144097)</span>
            </a>
          </div>

          {/* Payment Helpdesk Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2.5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">
              Manual Payment Support Desk
            </h3>
            <p className="text-slate-500 text-[11px]">
              For JazzCash & Easypaisa manual transaction verification:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 space-y-1 text-[11px] font-medium text-slate-700 border border-slate-100">
              <p>JazzCash Number: <strong className="text-slate-900">03701220965</strong></p>
              <p>Easypaisa Number: <strong className="text-slate-900">03489704473</strong></p>
              <p>Account Title: <strong className="text-emerald-800">PlotBazaar Pakistan - Intekhab Alam</strong></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Karachi Head Office</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              PlotBazaar Pakistan Tower, Shahrah-e-Faisal, Block 6, PECHS, Karachi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

