import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Building, 
  Smartphone, 
  CreditCard,
  Copy, 
  Check, 
  Lock,
  AlertCircle
} from 'lucide-react';
import { Package, PaymentMethod, Order } from '../types';
import { store } from '../services/store';
import { useAuth } from '../context/AuthContext';

interface CheckoutPageProps {
  selectedPackage: Package;
  quantity?: number;
  targetPropertyId?: string;
  onNavigate: (view: string, params?: any) => void;
  onCheckoutSuccess: (order: Order) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPackage,
  quantity = 1,
  targetPropertyId,
  onNavigate,
  onCheckoutSuccess
}) => {
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_raast');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPKR: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const [transactionRef, setTransactionRef] = useState('');
  const [bankName, setBankName] = useState('Meezan Bank / Raast');
  const [notes, setNotes] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const unitPrice = selectedPackage.pricePKR;
  const subtotalPKR = unitPrice * quantity;
  const discountPKR = appliedCoupon ? appliedCoupon.discountPKR : 0;
  const totalPayablePKR = Math.max(0, subtotalPKR - discountPKR);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'PLOTBAZAAR2026' || code === 'INTEKHAB10') {
      const discount = Math.round(subtotalPKR * 0.10);
      setAppliedCoupon({ code, discountPKR: discount });
    } else if (code === 'WELCOME500' && subtotalPKR >= 1500) {
      setAppliedCoupon({ code, discountPKR: 500 });
    } else {
      setCouponError('Invalid or expired promotional voucher code.');
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !phone) {
      setErrorMsg('Please enter your full name, email address, and phone number.');
      return;
    }

    if (paymentMethod === 'card') {
      setErrorMsg('Online Debit/Credit Card gateway is currently awaiting merchant acquiring onboarding. Please choose Bank Transfer / Raast, JazzCash, or Easypaisa.');
      return;
    }

    if (!transactionRef.trim()) {
      const channelName = 
        paymentMethod === 'jazzcash' 
          ? 'JazzCash 11-digit TID (Transaction ID)' 
          : paymentMethod === 'easypaisa' 
            ? 'Easypaisa TRX ID' 
            : 'Bank Transfer / Raast Reference ID';
      setErrorMsg(`Please provide your ${channelName}.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const settings = store.getWebsiteSettings();
      const accountTitle = 
        paymentMethod === 'bank_raast' 
          ? settings.bankAccountTitle 
          : paymentMethod === 'jazzcash' 
            ? settings.jazzCashAccountTitle 
            : settings.easypaisaAccountTitle;
      
      const bName = 
        paymentMethod === 'bank_raast' 
          ? settings.bankName 
          : paymentMethod === 'jazzcash' 
            ? 'JazzCash Mobile Account (03701220965)' 
            : 'Easypaisa Mobile Account (03489704473)';

      const newOrder = store.createOrder({
        userId: user?.id || `guest-${Date.now()}`,
        userName: name,
        userEmail: email,
        userPhone: phone,
        items: [
          {
            packageId: selectedPackage.id,
            packageName: selectedPackage.title,
            quantity,
            unitPricePKR: unitPrice,
            totalPKR: subtotalPKR,
            targetPropertyId
          }
        ],
        subtotalPKR,
        discountPKR,
        couponCode: appliedCoupon?.code,
        totalAmountPKR: totalPayablePKR,
        paymentMethod,
        paymentStatus: 'pending_verification',
        transactionRef: transactionRef.trim(),
        bankAccountTitle: accountTitle,
        bankName: bName,
        notes: notes || `Manual payment submitted for ${paymentMethod}. Awaiting Admin verification by Intekhab Alam.`
      });

      onCheckoutSuccess(newOrder);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Payment submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <button
        onClick={() => onNavigate('packages')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Packages</span>
      </button>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Secure Order Checkout
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review package allowance, transparent fees, and select your verified payment channel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900">1. Purchaser Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">WhatsApp / Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-medium text-slate-700 mb-1">Email Address (For Official Receipt)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tariq@gmail.com"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">2. Select Verified Payment Channel</h2>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Encrypted & Verified
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Option 1: Bank Transfer / Raast */}
              <label 
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'bank_raast'
                    ? 'border-emerald-800 bg-emerald-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_raast"
                  checked={paymentMethod === 'bank_raast'}
                  onChange={() => setPaymentMethod('bank_raast')}
                  className="mt-1 accent-emerald-800"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building className="w-4 h-4 text-emerald-800" />
                      Online Bank Transfer / Raast (Recommended)
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                      Manual Verification
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Transfer instantly from Meezan, HBL, UBL, Alfalah or any 1Link bank via Raast ID or IBAN.
                  </p>
                </div>
              </label>

              {/* Option 2: JazzCash Manual Wallet */}
              <label 
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'jazzcash'
                    ? 'border-emerald-800 bg-emerald-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="jazzcash"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="mt-1 accent-emerald-800"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-rose-600" />
                      JazzCash Mobile Wallet (03701220965)
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                      Manual Wallet Transfer
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Send money to official JazzCash number 03701220965 and submit 11-digit TID.
                  </p>
                </div>
              </label>

              {/* Option 3: Easypaisa Manual Wallet */}
              <label 
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                  paymentMethod === 'easypaisa'
                    ? 'border-emerald-800 bg-emerald-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="easypaisa"
                  checked={paymentMethod === 'easypaisa'}
                  onChange={() => setPaymentMethod('easypaisa')}
                  className="mt-1 accent-emerald-800"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      Easypaisa Mobile Wallet (03489704473)
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                      Manual Wallet Transfer
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Send money to official Easypaisa number 03489704473 and submit TRX reference.
                  </p>
                </div>
              </label>

              {/* Option 4: Debit / Credit Card (Disabled with Live gateway not configured) */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-slate-600">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    Debit / Credit Card (Visa / Mastercard)
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                    Live gateway not configured
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Automated card gateway onboarding in progress. Please choose Bank Transfer / Raast, JazzCash, or Easypaisa above.
                </p>
              </div>
            </div>

            {/* Instruction Box 1: Bank Transfer / Raast */}
            {paymentMethod === 'bank_raast' && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400">Official PlotBazaar Bank Details</span>
                  <span className="text-[10px] text-emerald-400">Verified Account</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Bank Name:</span>
                    <span className="font-semibold text-white">Meezan Bank Limited / HBL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Account Title:</span>
                    <span className="font-semibold text-white">PlotBazaar Pakistan (Pvt) Ltd</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Raast ID (Customer Helpline):</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-amber-400">03363144097</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('03363144097', 'raast')}
                        className="text-slate-400 hover:text-white"
                        title="Copy Raast ID"
                      >
                        {copiedField === 'raast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">IBAN:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-emerald-300">PK36MEZN0001020105829101</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('PK36MEZN0001020105829101', 'iban')}
                        className="text-slate-400 hover:text-white"
                        title="Copy IBAN"
                      >
                        {copiedField === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <label className="block text-[11px] text-slate-300 font-semibold">
                    Enter Bank Transfer / Raast Reference ID *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. RAAST-20261027-10492 or Meezan Ref"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400">
                    * The order will be marked "Pending Verification" and verified by Founder & CEO Intekhab Alam before activation.
                  </p>
                </div>
              </div>
            )}

            {/* Instruction Box 2: JazzCash Manual Wallet */}
            {paymentMethod === 'jazzcash' && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400">Official JazzCash Manual Instructions</span>
                  <span className="text-[10px] text-rose-400">Mobile Wallet</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p className="text-[11px]">
                    1. Open the JazzCash App on your mobile phone or dial <strong>*786#</strong>.
                  </p>
                  <div className="p-2 rounded-lg bg-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">JazzCash Number:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-amber-400 text-sm">03701220965</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('03701220965', 'jc_num')}
                          className="text-slate-400 hover:text-white"
                          title="Copy JazzCash Number"
                        >
                          {copiedField === 'jc_num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Account Title:</span>
                      <span className="font-semibold text-white">PlotBazaar Pakistan - Intekhab Alam</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Payable Amount:</span>
                      <span className="font-bold text-emerald-400">Rs. {totalPayablePKR.toLocaleString('en-PK')}</span>
                    </div>
                  </div>
                  <p className="text-[11px]">
                    2. Complete the transfer and note the 11-digit TID (Transaction ID) received via SMS from 8558.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <label className="block text-[11px] text-slate-300 font-semibold">
                    Enter JazzCash 11-digit TID / Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. 02938472910"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400">
                    * The order status will be set to "Pending Verification" until verified by Founder & CEO Intekhab Alam.
                  </p>
                </div>
              </div>
            )}

            {/* Instruction Box 3: Easypaisa Manual Wallet */}
            {paymentMethod === 'easypaisa' && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400">Official Easypaisa Manual Instructions</span>
                  <span className="text-[10px] text-emerald-400">Mobile Wallet</span>
                </div>

                <div className="space-y-2 text-slate-300">
                  <p className="text-[11px]">
                    1. Open your Easypaisa App and choose <strong>Send Money</strong> &gt; <strong>Easypaisa Transfer</strong>.
                  </p>
                  <div className="p-2 rounded-lg bg-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Easypaisa Number:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-amber-400 text-sm">03489704473</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('03489704473', 'ep_num')}
                          className="text-slate-400 hover:text-white"
                          title="Copy Easypaisa Number"
                        >
                          {copiedField === 'ep_num' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Account Title:</span>
                      <span className="font-semibold text-white">PlotBazaar Pakistan - Intekhab Alam</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Payable Amount:</span>
                      <span className="font-bold text-emerald-400">Rs. {totalPayablePKR.toLocaleString('en-PK')}</span>
                    </div>
                  </div>
                  <p className="text-[11px]">
                    2. Complete the transfer and copy the TRX ID (Transaction Reference) from the confirmation screen or 3737 SMS.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <label className="block text-[11px] text-slate-300 font-semibold">
                    Enter Easypaisa TRX ID / Reference Number *
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. 1982736450"
                    required
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs text-white focus:outline-none"
                  />
                  <p className="text-[10px] text-slate-400">
                    * The order status will be set to "Pending Verification" until verified by Founder & CEO Intekhab Alam.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 sticky top-24 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Order Summary</h2>
              <span className="text-slate-400">PlotBazaar</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900">{selectedPackage.title}</span>
                <span className="font-black text-emerald-900">Rs. {unitPrice.toLocaleString('en-PK')}</span>
              </div>
              <p className="text-slate-500 text-[11px]">{selectedPackage.description}</p>
            </div>

            <div className="space-y-2 text-slate-600 pt-2">
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span className="font-semibold text-slate-900">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">Rs. {subtotalPKR.toLocaleString('en-PK')}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedCoupon.code}):</span>
                  <span>- Rs. {appliedCoupon.discountPKR.toLocaleString('en-PK')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-900">Total Payable Amount:</span>
                <span className="text-2xl font-black text-emerald-950">
                  Rs. {totalPayablePKR.toLocaleString('en-PK')}
                </span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-slate-100">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. PLOTBAZAAR2026"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 font-mono uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-rose-600 mt-1">{couponError}</p>}
              {appliedCoupon && <p className="text-emerald-700 font-semibold mt-1">✓ Coupon applied!</p>}
            </form>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4 text-emerald-300" />
              <span>
                {isSubmitting 
                  ? 'Submitting for Verification...' 
                  : paymentMethod === 'jazzcash'
                    ? `Submit JazzCash TID (Rs. ${totalPayablePKR.toLocaleString('en-PK')})`
                    : paymentMethod === 'easypaisa'
                      ? `Submit Easypaisa TRX (Rs. ${totalPayablePKR.toLocaleString('en-PK')})`
                      : paymentMethod === 'bank_raast'
                        ? `Submit Bank Reference (Rs. ${totalPayablePKR.toLocaleString('en-PK')})`
                        : `Live gateway not configured`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Direct confirmation by Intekhab Alam, Founder & CEO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
