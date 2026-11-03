import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Plus, 
  X, 
  ShieldCheck, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { Property, PropertyCategory, PropertyUnit } from '../types';
import { store, formatPKR } from '../services/store';
import { useAuth } from '../context/AuthContext';

interface SellPropertyPageProps {
  onNavigate: (view: string, params?: any) => void;
  onPostSuccess: (property: Property) => void;
}

export const SellPropertyPage: React.FC<SellPropertyPageProps> = ({
  onNavigate,
  onPostSuccess
}) => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [titleUrdu, setTitleUrdu] = useState('');
  const [description, setDescription] = useState('');
  const [pricePKR, setPricePKR] = useState<number>(3500000);
  const [category, setCategory] = useState<PropertyCategory>('residential_plot');
  const [city, setCity] = useState('Lahore');
  const [locality, setLocality] = useState('');
  const [society, setSociety] = useState('DHA');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState<number>(10);
  const [unit, setUnit] = useState<PropertyUnit>('Marla');

  const [isInstallment, setIsInstallment] = useState(false);
  const [advancePKR, setAdvancePKR] = useState<number>(700000);
  const [monthlyInstallmentPKR, setMonthlyInstallmentPKR] = useState<number>(75000);
  const [durationMonths, setDurationMonths] = useState<number>(36);

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [sellerName, setSellerName] = useState(user?.name || '');
  const [sellerPhone, setSellerPhone] = useState(user?.phone || '+92 300 1234567');
  const [sellerWhatsApp, setSellerWhatsApp] = useState(user?.whatsapp || user?.phone || '+923001234567');
  const [agencyName, setAgencyName] = useState(user?.agencyName || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasActiveSubscription = user?.subscription?.status === 'active' && 
    (user.subscription.listingAllowance - user.subscription.listingsUsed > 0);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title || !description || !pricePKR || !address || !society) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    const propId = `prop-${Date.now().toString().slice(-4)}`;
    const newProperty: Property = {
      id: propId,
      title,
      titleUrdu: titleUrdu || undefined,
      description,
      pricePKR,
      category,
      city,
      locality: locality || society,
      society,
      address,
      size,
      unit,
      isInstallment,
      installmentDetails: isInstallment ? {
        advancePKR,
        monthlyInstallmentPKR,
        durationMonths,
        totalInstallments: durationMonths
      } : undefined,
      images: images.length ? images : ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
      sellerId: user?.id || 'guest-seller',
      sellerName,
      sellerPhone,
      sellerWhatsApp,
      sellerRole: user?.role || 'seller',
      agencyName: agencyName || undefined,
      availability: 'available',
      moderationStatus: 'approved',
      isFeatured: false,
      isHomepageFeatured: false,
      isVerified: false,
      views: 1,
      inquiriesCount: 0,
      reportsCount: 0,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    store.saveProperty(newProperty);

    if (user?.subscription && user.subscription.status === 'active') {
      user.subscription.listingsUsed = (user.subscription.listingsUsed || 0) + 1;
      store.saveUser(user);
    }

    setIsSubmitting(false);
    onPostSuccess(newProperty);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>PlotBazaar Listing Desk</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Property Advertisement
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Post your residential plot, commercial space, or house on PlotBazaar Pakistan.
        </p>
      </div>

      {hasActiveSubscription ? (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
          <div>
            <p className="font-bold">Active Subscription Quota: {user?.subscription?.packageName}</p>
            <p className="text-emerald-700 mt-0.5">
              You have <strong>{(user?.subscription?.listingAllowance || 0) - (user?.subscription?.listingsUsed || 0)}</strong> remaining listings included with zero extra ad fees.
            </p>
          </div>
          <span className="font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
            Free from Allowance
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-900">Standard Single Listing (Rs. 1,500 / 30 Days)</p>
            <p className="text-slate-500 mt-0.5">
              Or upgrade to the <strong>Rs. 30,000 Monthly Package</strong> to publish 50 advertisements!
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
          >
            View Packages
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            1. Property Identification & Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Listing Title (English) *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Marla Corner Residential Plot in DHA Phase 6"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Listing Title (Urdu - Optional)</label>
              <input
                type="text"
                value={titleUrdu}
                onChange={(e) => setTitleUrdu(e.target.value)}
                placeholder="مثلاً: 10 مرلہ رہائشی پلاٹ، ڈی ایچ اے فیز 6"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-urdu text-sm focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
              >
                <option value="residential_plot">Residential Plot</option>
                <option value="commercial_plot">Commercial Plot</option>
                <option value="house">House / Villa</option>
                <option value="apartment">Apartment / Flat</option>
                <option value="shop">Commercial Shop</option>
                <option value="agricultural">Agricultural Land</option>
                <option value="farmhouse">Farmhouse</option>
                <option value="warehouse">Warehouse</option>
                <option value="office">Office</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Demand / Price (PKR) *</label>
              <div className="relative">
                <input
                  type="number"
                  value={pricePKR}
                  onChange={(e) => setPricePKR(Number(e.target.value) || 0)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:ring-1 focus:ring-emerald-700"
                />
                <span className="absolute end-3 top-2 font-bold text-emerald-800 text-xs">
                  {formatPKR(pricePKR)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            2. Location Details & Dimensions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
              >
                {['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Gwadar', 'Faisalabad', 'Peshawar', 'Gujranwala'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Society / Housing Scheme *</label>
              <input
                type="text"
                value={society}
                onChange={(e) => setSociety(e.target.value)}
                placeholder="e.g. DHA, Bahria Town, Gulberg Greens"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sector / Phase / Block</label>
              <input
                type="text"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                placeholder="e.g. Sector C, Phase 6"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-semibold text-slate-700 mb-1">Exact Address / Plot Number *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Plot # 45, Street 12, Sector C, DHA Phase 6"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Area Size *</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value) || 0)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Area Unit *</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as PropertyUnit)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium bg-white"
              >
                <option value="Marla">Marla</option>
                <option value="Kanal">Kanal</option>
                <option value="Sq. Yds">Square Yards (Gaz)</option>
                <option value="Sq. Feet">Square Feet</option>
                <option value="Acres">Acres</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              3. Purchase Terms & Installment Option
            </h2>
            <label className="flex items-center gap-2 cursor-pointer font-bold text-emerald-800">
              <input
                type="checkbox"
                checked={isInstallment}
                onChange={(e) => setIsInstallment(e.target.checked)}
                className="accent-emerald-800"
              />
              <span>Offer Easy Installments</span>
            </label>
          </div>

          {isInstallment && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Down Payment / Advance (PKR)</label>
                <input
                  type="number"
                  value={advancePKR}
                  onChange={(e) => setAdvancePKR(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                />
                <span className="text-[10px] text-emerald-800">{formatPKR(advancePKR)}</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Monthly Installment (PKR)</label>
                <input
                  type="number"
                  value={monthlyInstallmentPKR}
                  onChange={(e) => setMonthlyInstallmentPKR(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                />
                <span className="text-[10px] text-emerald-800">{formatPKR(monthlyInstallmentPKR)} / mo</span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Duration (Months)</label>
                <input
                  type="number"
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value) || 12)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                />
                <span className="text-[10px] text-emerald-800">{durationMonths / 12} Years</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            4. Property Description & Selling Points
          </h2>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Highlight key advantages: direct allotment, NOC status, possession, carpeted road, park-facing, gas, water, sewerage connections..."
            required
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            5. Property Photographs
          </h2>

          <div className="flex gap-2">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="Paste image URL (e.g. https://...)"
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-medium"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Photo
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden aspect-16/10 border border-slate-200 group">
                <img src={img} alt="preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 end-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            6. Seller Contact Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Seller / Contact Name *</label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Calling Phone Number *</label>
              <input
                type="text"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">WhatsApp Number *</label>
              <input
                type="text"
                value={sellerWhatsApp}
                onChange={(e) => setSellerWhatsApp(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
              />
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400">
            By publishing, you confirm ownership or written agency authorization for this listing.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2"
          >
            <span>{hasActiveSubscription ? 'Publish from Subscription Quota' : 'Publish Property Advertisement'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
