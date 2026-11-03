import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Eye, 
  Calendar,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Property } from '../types';
import { formatPKR, store } from '../services/store';
import { useLanguage } from '../context/LanguageContext';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
  onFavoriteToggle?: (isFav: boolean) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  onSelect,
  onFavoriteToggle 
}) => {
  const { t, isUrdu } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(() => store.getFavorites().includes(property.id));
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = store.toggleFavorite(property.id);
    setIsFavorite(updated);
    if (onFavoriteToggle) onFavoriteToggle(updated);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `${property.title} for ${formatPKR(property.pricePKR)} on PlotBazaar Pakistan.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#property-${property.id}`);
      alert('Property link copied to clipboard!');
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = property.sellerWhatsApp.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Assalam-o-Alaikum, I found your property listing on PlotBazaar Pakistan: "${property.title}" (${formatPKR(property.pricePKR)}). Is it still available?`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${property.sellerPhone}`;
  };

  const categoryLabels: Record<string, string> = {
    residential_plot: isUrdu ? 'رہائشی پلاٹ' : 'Residential Plot',
    commercial_plot: isUrdu ? 'کمرشل پلاٹ' : 'Commercial Plot',
    house: isUrdu ? 'مکان' : 'House / Villa',
    apartment: isUrdu ? 'فلیٹ' : 'Apartment',
    shop: isUrdu ? 'دکان' : 'Commercial Shop',
    agricultural: isUrdu ? 'زرعی اراضی' : 'Agricultural Land',
    farmhouse: isUrdu ? 'فارم ہاؤس' : 'Farmhouse',
    warehouse: isUrdu ? 'گودام' : 'Warehouse',
    office: isUrdu ? 'دفتر' : 'Office Space',
    other: isUrdu ? 'پراپرٹی' : 'Property',
  };

  return (
    <>
      <div 
        onClick={() => onSelect(property)}
        className="group relative bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-700/50 transition-all duration-300 flex flex-col cursor-pointer"
      >
        {/* Image Container with subtle overlays */}
        <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
          <img
            src={property.images[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Top Floating Controls */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
            {/* Status indicators */}
            <div className="pointer-events-auto flex items-center gap-1.5">
              {property.isFeatured && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 shadow-sm">
                  ★ FEATURED
                </span>
              )}
              {property.isInstallment && (
                <span className="text-[11px] font-semibold px-2 py-1 rounded-md bg-emerald-900/90 backdrop-blur-xs text-emerald-100 shadow-sm">
                  {isUrdu ? 'اقساط پر' : 'Installment'}
                </span>
              )}
              {property.availability === 'sold' && (
                <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-rose-600 text-white shadow-sm">
                  SOLD
                </span>
              )}
            </div>

            {/* Quick Actions (Favorite & Share) */}
            <div className="pointer-events-auto flex items-center gap-1.5">
              <button
                onClick={handleShare}
                aria-label="Share property"
                className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white text-slate-700 flex items-center justify-center transition shadow-sm active:scale-90"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleFavorite}
                aria-label="Save to favorites"
                className={`w-8 h-8 rounded-full backdrop-blur-xs flex items-center justify-center transition shadow-sm active:scale-90 ${
                  isFavorite ? 'bg-rose-50 text-rose-600' : 'bg-white/90 hover:bg-white text-slate-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Bar on Image: Area Size & City */}
          <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-white drop-shadow-md">
            <span className="font-bold bg-slate-950/70 backdrop-blur-xs px-2.5 py-1 rounded-md">
              {property.size} {property.unit}
            </span>
            <span className="flex items-center gap-1 bg-slate-950/70 backdrop-blur-xs px-2 py-1 rounded-md text-[11px]">
              <Eye className="w-3 h-3 text-slate-300" />
              {property.views}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Clean Unboxed Metadata per Frontend Design Skill */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-semibold text-emerald-800">
                {categoryLabels[property.category] || property.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-slate-600 truncate">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {property.city}
              </span>
              <span aria-hidden="true">·</span>
              <span>{property.society}</span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
              {isUrdu && property.titleUrdu ? property.titleUrdu : property.title}
            </h3>

            {/* Location & Address */}
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">
              {property.address}
            </p>

            {/* Price section */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Asking Demand</p>
                <p className="text-xl font-extrabold text-slate-900 tracking-tight text-emerald-950">
                  {formatPKR(property.pricePKR)}
                </p>
              </div>

              {property.isInstallment && property.installmentDetails && (
                <div className="text-end">
                  <p className="text-[10px] text-slate-400">Advance / Down Payment</p>
                  <p className="text-xs font-bold text-emerald-800">
                    {formatPKR(property.installmentDetails.advancePKR)}
                  </p>
                </div>
              )}
            </div>

            {/* Verification Badge with info click */}
            {property.isVerified && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowVerificationModal(true);
                }}
                className="mt-2 text-start flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 transition"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('verified')}</span>
                <span className="text-[10px] underline text-slate-400 hover:text-slate-600">
                  (Check notes)
                </span>
              </button>
            )}
          </div>

          {/* Seller / Dealer Info & Direct Contact CTA Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {property.sellerName}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {property.agencyName || (property.sellerRole === 'dealer' ? 'Verified Agency' : 'Direct Owner')}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleWhatsApp}
                title="Chat on WhatsApp"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <button
                onClick={handleCall}
                title="Call Seller Directly"
                className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
              >
                <Phone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Transparency Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-emerald-800 mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h4 className="font-bold text-slate-900">PlotBazaar Verification Review</h4>
                <p className="text-xs text-slate-500">Documentary audit record</p>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-3.5 text-xs text-emerald-950 mb-4">
              <p className="font-semibold mb-1">Audit Findings:</p>
              <p className="text-emerald-900 leading-relaxed">
                {property.verificationReport || 'Our legal review desk inspected land registry/allotment letter and verified seller authorization.'}
              </p>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              Disclaimer: Paid verification is a documentary review service, not an absolute guarantee against third-party litigation or encumbrances. Buyers must conduct customary due diligence before final token payment.
            </p>

            <button
              onClick={() => setShowVerificationModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
