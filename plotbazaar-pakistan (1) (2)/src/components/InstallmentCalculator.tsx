import React, { useState } from 'react';
import { Calculator, X, Calendar, DollarSign, Percent, ArrowRight } from 'lucide-react';
import { formatPKR } from '../services/store';

interface InstallmentCalculatorProps {
  initialPrice?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const InstallmentCalculator: React.FC<InstallmentCalculatorProps> = ({
  initialPrice = 12500000,
  isOpen,
  onClose
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [durationMonths, setDurationMonths] = useState<number>(36);

  if (!isOpen) return null;

  const downPaymentAmount = (totalPrice * downPaymentPercent) / 100;
  const remainingBalance = totalPrice - downPaymentAmount;
  const monthlyInstallment = Math.round(remainingBalance / durationMonths);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Plot Installment Calculator</h3>
              <p className="text-xs text-slate-500">Calculate easy monthly plan in Pakistani Rupees</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-4 text-xs">
          {/* Total Property Value Input */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Total Property Price (PKR)
            </label>
            <div className="relative">
              <input
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <span className="absolute end-3 top-2.5 font-bold text-emerald-800">
                {formatPKR(totalPrice)}
              </span>
            </div>
          </div>

          {/* Down Payment % Slider */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Down Payment (Biyana / Booking)</span>
              <span className="text-emerald-800">{downPaymentPercent}% ({formatPKR(downPaymentAmount)})</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-emerald-800"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% Minimum</span>
              <span>25% Standard</span>
              <span>50% Half</span>
            </div>
          </div>

          {/* Duration Months */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>Tenure / Plan Duration</span>
              <span className="text-emerald-800">{durationMonths} Months ({durationMonths / 12} Years)</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setDurationMonths(months)}
                  className={`py-2 rounded-lg font-bold border transition ${
                    durationMonths === months
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {months / 12} Yrs ({months}m)
                </button>
              ))}
            </div>
          </div>

          {/* Breakdown Result Box */}
          <div className="rounded-xl bg-slate-900 text-white p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Booking / Down Payment:</span>
              <span className="font-bold text-amber-400">{formatPKR(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span>Remaining Balance:</span>
              <span className="font-semibold text-white">{formatPKR(remainingBalance)}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <div>
                <span className="text-[11px] text-slate-400">Estimated Monthly Installment:</span>
                <p className="text-lg font-extrabold text-emerald-400">
                  {formatPKR(monthlyInstallment)} / month
                </p>
              </div>
              <span className="text-[10px] text-slate-400">{durationMonths} monthly installments</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition"
        >
          Close Calculator
        </button>
      </div>
    </div>
  );
};
