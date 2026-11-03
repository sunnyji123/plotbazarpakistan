import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types';
import { formatPKR } from '../services/store';

interface PaymentReceiptPageProps {
  order: Order;
  onNavigate: (view: string, params?: any) => void;
}

export const PaymentReceiptPage: React.FC<PaymentReceiptPageProps> = ({
  order,
  onNavigate
}) => {
  const isCompleted = order.paymentStatus === 'completed';
  const isPending = order.paymentStatus === 'pending_verification';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(order, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${order.id}-receipt.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Action Navigation Header (Hidden in Print) */}
      <div className="no-print flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Data</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Main Printable Voucher Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-md relative overflow-hidden">
        
        {/* Subtle Watermark Stamp */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-5 rotate-[-25deg]">
          <span className="text-8xl font-black uppercase text-emerald-950">
            {isCompleted ? 'PAID' : 'PENDING'}
          </span>
        </div>

        {/* Voucher Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900">PlotBazaar</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Pakistan
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Apni Property, Apna Mustaqbil · Official Payment Voucher
              </p>
            </div>
          </div>

          <div className="text-start sm:text-end">
            <span className="text-xs text-slate-400 font-mono">Invoice Ref</span>
            <p className="text-base font-bold font-mono text-slate-900 tracking-wider">
              {order.id}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date(order.createdAt).toLocaleDateString('en-PK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Status Callout Banner */}
        <div className="my-6">
          {isCompleted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
              <div>
                <p className="font-bold text-sm">Payment Verified & Package Activated</p>
                <p className="text-xs text-emerald-800">
                  Transaction confirmed on {new Date(order.verifiedAt || order.createdAt).toLocaleDateString('en-PK')}. Listing quota and featured benefits are now active.
                </p>
              </div>
            </div>
          ) : isPending ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-900">
              <Clock className="w-6 h-6 text-amber-700 shrink-0" />
              <div>
                <p className="font-bold text-sm">Pending Verification (Manual Bank / Raast Transfer)</p>
                <p className="text-xs text-amber-800">
                  Your reference <strong>{order.transactionRef}</strong> has been logged. Admin Intekhab Alam will review and approve the transaction shortly.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-900">
              <AlertCircle className="w-6 h-6 text-rose-700 shrink-0" />
              <div>
                <p className="font-bold text-sm">Payment Status: {order.paymentStatus.toUpperCase()}</p>
                <p className="text-xs text-rose-800">{order.rejectionReason || 'Contact support for details.'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer & Transaction Meta */}
        <div className="grid grid-cols-2 gap-4 text-xs py-4 border-b border-slate-100">
          <div>
            <p className="text-slate-400 font-medium">Billed To:</p>
            <p className="font-bold text-slate-900 text-sm mt-0.5">{order.userName}</p>
            <p className="text-slate-600">{order.userEmail}</p>
            <p className="text-slate-600">{order.userPhone}</p>
          </div>

          <div className="text-end">
            <p className="text-slate-400 font-medium">Payment Channel:</p>
            <p className="font-bold text-slate-900 capitalize mt-0.5">
              {order.paymentMethod.replace('_', ' ')}
            </p>
            {order.transactionRef && (
              <p className="font-mono text-slate-600 mt-0.5">Ref: {order.transactionRef}</p>
            )}
            {order.bankName && (
              <p className="text-slate-500 text-[11px]">{order.bankName}</p>
            )}
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-start">
                <th className="pb-2 text-start font-semibold">Service Description</th>
                <th className="pb-2 text-center font-semibold">Qty</th>
                <th className="pb-2 text-end font-semibold">Unit Price</th>
                <th className="pb-2 text-end font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <tr key={idx} className="py-2.5">
                  <td className="py-3 text-slate-900 font-semibold">
                    {item.packageName}
                    {item.targetPropertyId && (
                      <span className="block text-[11px] font-normal text-slate-400">
                        Target Listing: #{item.targetPropertyId}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-3 text-end text-slate-600">Rs. {item.unitPricePKR.toLocaleString('en-PK')}</td>
                  <td className="py-3 text-end font-bold text-slate-900">Rs. {item.totalPKR.toLocaleString('en-PK')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Calculation */}
        <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-slate-900">Rs. {order.subtotalPKR.toLocaleString('en-PK')}</span>
          </div>
          {order.discountPKR > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>Voucher Discount:</span>
              <span>- Rs. {order.discountPKR.toLocaleString('en-PK')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Taxes & Gateway Surcharge:</span>
            <span className="text-slate-900">Rs. 0 (Zero)</span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
            <span className="text-base font-bold text-slate-900">Total Paid Amount (PKR):</span>
            <span className="text-2xl font-black text-emerald-950">
              Rs. {order.totalAmountPKR.toLocaleString('en-PK')}
            </span>
          </div>
        </div>

        {/* Signatures & Verification Authority Footnote */}
        <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs text-slate-500">
          <div>
            <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Verified Desk Authority</span>
            </div>
            <p className="text-[11px] text-slate-500">
              PlotBazaar Pakistan Tower, Shahrah-e-Faisal, Karachi
            </p>
            <p className="text-[11px] text-slate-400">NTN: 8492019-4 · SECP Registered</p>
          </div>

          <div className="text-end">
            <p className="font-serif italic text-base text-slate-900 font-bold">Intekhab Alam</p>
            <p className="text-[11px] text-slate-600 font-medium">Founder & CEO</p>
            <p className="text-[10px] text-slate-400">PlotBazaar Pakistan</p>
          </div>
        </div>

      </div>

    </div>
  );
};
