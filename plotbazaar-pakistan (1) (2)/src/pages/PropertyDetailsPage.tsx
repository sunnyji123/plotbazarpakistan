import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Share2, 
  AlertTriangle, 
  Eye, 
  Building2, 
  CheckCircle2, 
  Calculator,
  User as UserIcon,
  Send,
  X
} from 'lucide-react';
import { Property, Inquiry } from '../types';
import { formatPKR, store } from '../services/store';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { InstallmentCalculator } from '../components/InstallmentCalculator';

interface PropertyDetailsPageProps {
  property: Property;
  onNavigate: (view: string, params?: any) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  property,
  onNavigate,
  onSelectProperty
}) => {
  const { user } = useAuth();
  const { t, isUrdu } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(() => store.getFavorites().includes(property.id));
  
  // Inquiry form
  const [buyerName, setBuyerName] = useState(user?.name || '');
  const [buyerPhone, setBuyerPhone] = useState(user?.phone || '');
  const [inquiryMessage, setInquiryMessage] = useState(
    `Assalam-o-Alaikum, I am interested in your property "${property.title}". Please contact me with more details.`
  );
  const [inquirySuccess, setInquirySuccess] = useState(false);

  // Report modal
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState<any>('incorrect_price');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // EMI Calculator modal
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const handleFavoriteToggle = () => {
    const updated = store.toggleFavorite(property.id);
    setIsFavorite(updated);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} for ${formatPKR(property.pricePKR)} on PlotBazaar Pakistan`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    store.sendInquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      sellerId: property.sellerId,
      buyerName,
      buyerPhone,
      message: inquiryMessage
    });

    setInquirySuccess(true);
    setTimeout(() => setInquirySuccess(false), 5000);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.addReport({
      propertyId: property.id,
      propertyTitle: property.title,
      reportedBy: user?.name || buyerName || 'Concerned Citizen',
      reportedEmail: user?.email,
      reason: reportReason,
      details: reportDetails || 'Reported via listing details page'
    });
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportModalOpen(false);
    }, 2000);
  };

  const cleanWhatsApp = property.sellerWhatsApp.replace(/[^0-9]/g, '');

  const similarProperties = store.getProperties()
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Navigation & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('browse')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Properties</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={handleFavoriteToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition text-xs font-semibold ${
              isFavorite 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-600' : ''}`} />
            <span>{isFavorite ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery + Details vs Sticky Inquiry / Seller Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Images, specs, description, amenities, verification) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Photo Gallery */}
          <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs space-y-3 p-3">
            <div className="relative aspect-16/10 bg-slate-900 rounded-2xl overflow-hidden">
              <img
                src={property.images[activeImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 start-3 flex gap-2">
                {property.isFeatured && (
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-500 text-slate-950 shadow-md">
                    ★ FEATURED
                  </span>
                )}
                {property.isInstallment && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-emerald-900/90 text-white backdrop-blur-xs">
                    Easy Installments Available
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-emerald-700' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-xs">
            {/* Metadata breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider">{property.category.replace('_', ' ')}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700 font-medium">{property.city}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-700">{property.society}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Eye className="w-3.5 h-3.5" />
                {property.views} views
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {property.title}
            </h1>

            {property.titleUrdu && (
              <h2 className="font-urdu text-xl text-emerald-900 font-bold">
                {property.titleUrdu}
              </h2>
            )}

            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{property.address}</span>
            </p>

            {/* Price & Primary Specs Strip */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Asking Demand</p>
                <p className="text-xl sm:text-2xl font-black text-emerald-950">
                  {formatPKR(property.pricePKR)}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Plot / Property Size</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {property.size} {property.unit}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Purchase Mode</p>
                <p className="text-base sm:text-lg font-bold text-slate-900">
                  {property.isInstallment ? 'Installment Plan' : 'Cash Purchase'}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">Availability</p>
                <p className="text-base sm:text-lg font-bold text-emerald-800 capitalize">
                  {property.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Installment Plan Breakdown (if applicable) */}
          {property.isInstallment && property.installmentDetails && (
            <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Payment Schedule
                  </span>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Easy Installment Details
                  </h3>
                </div>
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1 text-emerald-200"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Custom EMI Calc
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-900 text-xs">
                <div>
                  <p className="text-emerald-300">Down Payment (Booking)</p>
                  <p className="text-base font-bold text-amber-400 mt-0.5">
                    {formatPKR(property.installmentDetails.advancePKR)}
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300">Monthly Installment</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {formatPKR(property.installmentDetails.monthlyInstallmentPKR)} / mo
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300">Duration / Tenure</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {property.installmentDetails.durationMonths} Months ({property.installmentDetails.durationMonths / 12} Yrs)
                  </p>
                </div>
                <div>
                  <p className="text-emerald-300">Total Installments</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {property.installmentDetails.totalInstallments} Quotas
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              Property Description & Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
            {property.descriptionUrdu && (
              <p className="font-urdu text-sm text-slate-800 leading-relaxed pt-2 border-t border-slate-100">
                {property.descriptionUrdu}
              </p>
            )}
          </div>

          {/* Verification Audit Desk Report */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  PlotBazaar Document & Seller Verification Desk
                </h3>
                <p className="text-xs text-slate-500">
                  Documentary scrutiny conducted under PlotBazaar marketplace standards
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
              <p className="text-slate-800 font-medium">
                {property.isVerified 
                  ? property.verificationReport || 'Seller verified with land registry papers and official society records.'
                  : 'Standard advertisement. Seller contact is direct. Buyers are advised to conduct regular on-site due diligence before advance payments.'}
              </p>
              <p className="text-[11px] text-slate-400">
                Reviewed under the guidance of Intekhab Alam (Founder & CEO). Verification is a documented audit service and does not replace lawful conveyancing by your legal counsel.
              </p>
            </div>
          </div>

          {/* Report Listing Trigger */}
          <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
            <span>Listing Ref: #{property.id}</span>
            <button
              onClick={() => setReportModalOpen(true)}
              className="text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Report this property
            </button>
          </div>

        </div>

        {/* Right Sticky Sidebar (Seller Contact & Inquiry Form) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Seller / Agency Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-24">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg">
                {property.sellerName ? property.sellerName[0] : 'S'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{property.sellerName}</h3>
                  {property.isVerified && (
                    <span title="Verified Seller">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate">
                  {property.agencyName || (property.sellerRole === 'dealer' ? 'Authorized Dealer' : 'Individual Owner')}
                </p>
              </div>
            </div>

            {/* Direct Contact Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Assalam-o-Alaikum, I am inquiring about "${property.title}" (${formatPKR(property.pricePKR)}) listed on PlotBazaar Pakistan.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${property.sellerPhone}`}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {property.sellerPhone}</span>
              </a>
            </div>

            {/* Quick Inquiry Form */}
            <form onSubmit={handleSendInquiry} className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Send Direct Message
              </h4>

              <div>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  placeholder="Your Phone / WhatsApp"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>

              {inquirySuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold text-center">
                  ✓ Inquiry sent directly to seller!
                </div>
              )}
            </form>

            <div className="text-[10px] text-slate-400 text-center leading-relaxed">
              Safe Dealing: Always meet in person at the society office or bank before handing over token money.
            </div>

          </div>

        </aside>

      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Report Suspicious Listing
              </h3>
              <button onClick={() => setReportModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Report</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                >
                  <option value="incorrect_price">Incorrect Price / Demand Mismatch</option>
                  <option value="fake_photos">Fake or Stolen Photographs</option>
                  <option value="already_sold">Property Already Sold / Unavailable</option>
                  <option value="unreachable_seller">Unreachable / Invalid Phone Number</option>
                  <option value="fraud_scam">Suspected Fraud or Bogus Files</option>
                  <option value="other">Other Violation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Explain the Issue</label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  placeholder="Provide specific notes for the PlotBazaar moderation desk..."
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold"
                >
                  Submit Report
                </button>
              </div>

              {reportSuccess && (
                <p className="text-emerald-700 font-bold text-center mt-2">
                  ✓ Report submitted. Moderation desk notified.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* EMI Calculator */}
      <InstallmentCalculator
        initialPrice={property.pricePKR}
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

    </div>
  );
};
