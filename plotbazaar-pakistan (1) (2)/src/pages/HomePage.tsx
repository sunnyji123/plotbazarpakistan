import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Calculator,
  ChevronRight,
  TrendingUp,
  Tag,
  Users
} from 'lucide-react';
import { Property, PropertyCategory } from '../types';
import { store, formatPKR } from '../services/store';
import { PropertyCard } from '../components/PropertyCard';
import { useLanguage } from '../context/LanguageContext';
import { InstallmentCalculator } from '../components/InstallmentCalculator';

interface HomePageProps {
  onNavigate: (view: string, params?: any) => void;
  onSelectProperty: (property: Property) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProperty }) => {
  const { t, isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'plots' | 'houses' | 'commercial'>('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const properties = store.getProperties().filter((p) => p.moderationStatus === 'approved');
  const featuredProperties = properties.filter((p) => p.isFeatured || p.isHomepageFeatured);
  const recentProperties = properties.slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('browse', {
      search: searchQuery,
      city: selectedCity,
      tab: activeTab
    });
  };

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Gwadar', 'Faisalabad', 'Peshawar'];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Subtle decorative architectural background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          
          {/* Founder Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>PlotBazaar Pakistan · Directed by Intekhab Alam (Founder & CEO)</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {isUrdu ? 'اپنی پراپرٹی، اپنا مستقبل' : 'Apni Property, Apna Mustaqbil'}
            </h1>
            <p className="text-base sm:text-xl text-emerald-200/90 max-w-2xl mx-auto font-normal">
              Pakistan's trusted property marketplace for residential plots, commercial shops, houses, and verified dealer listings.
            </p>
          </div>

          {/* Interactive Multi-Tab Property Search Engine */}
          <div className="mt-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3 sm:p-4 text-slate-800 text-start">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 border-b border-slate-100 pb-3 mb-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'all' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                All Properties
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('plots')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'plots' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Plots & Land
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('houses')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'houses' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Houses & Villas
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('commercial')}
                className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'commercial' ? 'bg-emerald-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                Commercial
              </button>
            </div>

            {/* Search Input Form */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Society, Sector, DHA, Bahria, Gulberg..."
                  className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
                />
              </div>

              <div className="relative w-full sm:w-44">
                <MapPin className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full ps-9 pe-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white font-medium"
                >
                  <option value="">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm transition shadow-sm shrink-0 flex items-center justify-center gap-2"
              >
                <span>Find Property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Popular:</span>
                {['DHA Lahore', 'DHA Karachi', 'Bahria Islamabad', 'Gwadar Sangar'].map((pop) => (
                  <button
                    key={pop}
                    type="button"
                    onClick={() => {
                      setSearchQuery(pop);
                      onNavigate('browse', { search: pop });
                    }}
                    className="hover:text-emerald-800 transition underline underline-offset-2"
                  >
                    {pop}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsCalculatorOpen(true)}
                className="text-emerald-800 font-semibold hover:underline flex items-center gap-1"
              >
                <Calculator className="w-3.5 h-3.5" />
                Plot Installment Calculator
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-300">Direct Contact Details</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-black text-white">Rs. 1,500</p>
              <p className="text-xs text-slate-300">Single Ad Flat Rate</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-black text-emerald-400">Rs. 30,000</p>
              <p className="text-xs text-slate-300">Monthly Agency Quota</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <p className="text-xl sm:text-2xl font-black text-amber-400">0% Hidden</p>
              <p className="text-xs text-slate-300">Transparent Billing</p>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {isUrdu ? 'مقبول ترین پراپرٹی کیٹیگریز' : 'Explore Property Categories'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse plots, commercial spaces, and houses across Pakistan's major cities
            </p>
          </div>
          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            { id: 'residential_plot', label: 'Residential Plots', count: '1,450+ Plots', icon: Layers },
            { id: 'commercial_plot', label: 'Commercial Plots', count: '380+ Plots', icon: Building2 },
            { id: 'house', label: 'Houses & Villas', count: '920+ Homes', icon: Tag },
            { id: 'apartment', label: 'Apartments & Flats', count: '640+ Flats', icon: Building2 },
            { id: 'agricultural', label: 'Agricultural Land', count: '190+ Farms', icon: TrendingUp },
            { id: 'shop', label: 'Shops & Plazas', count: '410+ Units', icon: Users },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('browse', { category: cat.id })}
                className="group p-4 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-700 hover:shadow-md transition-all cursor-pointer text-start flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-emerald-800 group-hover:text-white transition">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition">
                    {cat.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{cat.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Verified Properties Section */}
      {featuredProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ★ Verified Selection
                </span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Featured Property Opportunities
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Handpicked plots and commercial properties reviewed by the PlotBazaar team
              </p>
            </div>

            <button
              onClick={() => onNavigate('browse', { featured: true })}
              className="text-xs font-semibold text-emerald-800 hover:underline self-start sm:self-auto"
            >
              See all featured ({featuredProperties.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        </section>
      )}

      {/* Dedicated Transparent Pricing Teaser Banner (Prompt Requirement 4) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 text-white p-6 sm:p-10 border border-emerald-800 shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              Transparent Pricing · Zero Hidden Charges
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
              Honest Advertising for Individual Sellers & Real Estate Agencies
            </h2>
            <p className="text-sm text-emerald-200 mt-2 leading-relaxed">
              Every price on PlotBazaar is strictly defined. No auto-charges without consent, no double billing for subscription allowances, and genuine sandbox-verified checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box A: Single Ad */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Individual Listing</p>
                <h3 className="text-xl font-black text-white mt-1">Single Ad</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-white">Rs. 1,500</span>
                  <span className="text-xs text-emerald-300">/ 30 Days</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>1 Property Advertisement</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Up to 10 photos & contact options</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>5 ads = Rs. 7,500 | 10 ads = Rs. 15,000</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('packages')}
                className="mt-6 w-full py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition"
              >
                Choose Single Ad
              </button>
            </div>

            {/* Box B: Monthly Package */}
            <div className="relative rounded-2xl bg-amber-500 text-slate-950 p-5 shadow-2xl flex flex-col justify-between">
              <span className="absolute -top-3 end-4 text-[10px] font-extrabold uppercase tracking-wider bg-slate-950 text-amber-300 px-3 py-1 rounded-full shadow-md">
                Agency Choice
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Monthly Subscription</p>
                <h3 className="text-xl font-black text-slate-950 mt-1">Advertising Package</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950">Rs. 30,000</span>
                  <span className="text-xs text-slate-800 font-semibold">/ Month</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-900 font-medium">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                    <span><strong>50 Included Listings</strong> (Owner Configurable)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                    <span>4 Featured boost promotions</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                    <span>No separate per-ad fees for included quota</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('packages')}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-950 text-amber-400 font-bold text-xs hover:bg-slate-900 transition"
              >
                Select Monthly Package
              </button>
            </div>

            {/* Box C: Dealer Tiers */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/15 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Agency Tiers</p>
                <h3 className="text-xl font-black text-white mt-1">Dealer Subscriptions</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-xs text-slate-300">From</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">Rs. 2,000</span>
                  <span className="text-xs text-emerald-300">/ mo</span>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-200">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Starter Dealer: Rs. 2,000 (5 Listings)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Pro Dealer: Rs. 5,000 (25 Listings)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Business Dealer: Rs. 10,000 (100 Listings)</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('packages')}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-600 transition"
              >
                Compare All Packages
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Message Section: Intekhab Alam (Founder & CEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-100 border border-slate-200/90 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
            <Building2 className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>

          <div className="space-y-3 flex-1 text-start">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                Founder's Pledge
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                PlotBazaar Pakistan
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              "We built PlotBazaar to bring honor and accountability to Pakistan's property transactions."
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              "Every Pakistani citizen dreams of owning their piece of motherland — whether an overseas laborer remitting hard-earned riyals or a local family building their first home. PlotBazaar Pakistan guarantees transparent ad pricing, verified documentation reviews, direct dealer access, and zero fabricated claims."
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              <div>
                <p className="font-bold text-slate-900 text-sm">Intekhab Alam</p>
                <p className="text-xs text-emerald-800 font-medium">Founder & CEO — PlotBazaar Pakistan</p>
              </div>
              <p className="font-urdu text-sm text-emerald-900 font-bold">
                اپنی پراپرٹی، اپنا مستقبل
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Properties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Latest Property Listings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fresh plots, houses, and commercial opportunities posted today
            </p>
          </div>
          <button
            onClick={() => onNavigate('browse')}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>View All ({properties.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* Installment Calculator Modal */}
      <InstallmentCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

    </div>
  );
};
