import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  ArrowUpDown, 
  Grid, 
  List, 
  X, 
  ShieldCheck, 
  Check, 
  RotateCcw,
  History,
  Bookmark,
  Trash2,
  Clock
} from 'lucide-react';
import { Property, PropertyCategory, PropertyUnit } from '../types';
import { store, formatPKR } from '../services/store';
import { PropertyCard } from '../components/PropertyCard';
import { useLanguage } from '../context/LanguageContext';

export interface SearchHistoryItem {
  id: string;
  timestamp: string;
  label: string;
  filters: {
    search?: string;
    city?: string;
    category?: string;
    minPrice?: number | '';
    maxPrice?: number | '';
    selectedUnit?: string;
    isInstallmentOnly?: boolean;
    isVerifiedOnly?: boolean;
    isFeaturedOnly?: boolean;
    availability?: string;
    sortBy?: 'newest' | 'price_asc' | 'price_desc';
  };
}

const SEARCH_HISTORY_STORAGE_KEY = 'plotbazaar_search_history_v1';

const DEFAULT_SEARCH_HISTORY: SearchHistoryItem[] = [
  {
    id: 'sh-1',
    timestamp: '2026-10-25T14:30:00Z',
    label: 'DHA Phase 6 · Lahore Cantt',
    filters: { search: 'DHA Phase 6', city: 'Lahore', category: 'residential_plot' }
  },
  {
    id: 'sh-2',
    timestamp: '2026-10-26T09:15:00Z',
    label: 'Commercial Plots · Installment',
    filters: { category: 'commercial_plot', isInstallmentOnly: true }
  },
  {
    id: 'sh-3',
    timestamp: '2026-10-26T18:00:00Z',
    label: 'Karachi · DHA Phase 8',
    filters: { city: 'Karachi', search: 'DHA Phase 8' }
  }
];

interface BrowsePropertiesPageProps {
  initialFilter?: {
    search?: string;
    city?: string;
    category?: string;
    tab?: string;
    featured?: boolean;
    isInstallment?: boolean;
  };
  onSelectProperty: (property: Property) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const BrowsePropertiesPage: React.FC<BrowsePropertiesPageProps> = ({
  initialFilter = {},
  onSelectProperty,
  onNavigate
}) => {
  const { t, isUrdu } = useLanguage();

  const [search, setSearch] = useState(initialFilter.search || '');
  const [selectedCity, setSelectedCity] = useState(initialFilter.city || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter.category || '');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [isInstallmentOnly, setIsInstallmentOnly] = useState<boolean>(initialFilter.isInstallment || false);
  const [isVerifiedOnly, setIsVerifiedOnly] = useState<boolean>(false);
  const [isFeaturedOnly, setIsFeaturedOnly] = useState<boolean>(initialFilter.featured || false);
  const [availability, setAvailability] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  // Local Storage Search History State
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_SEARCH_HISTORY;
    } catch {
      return DEFAULT_SEARCH_HISTORY;
    }
  });

  const saveHistoryToStorage = (items: SearchHistoryItem[]) => {
    setSearchHistory(items);
    try {
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save search history to localStorage', e);
    }
  };

  const generateSearchLabel = (f: SearchHistoryItem['filters']): string => {
    const parts: string[] = [];
    if (f.search) parts.push(`"${f.search}"`);
    if (f.city) parts.push(f.city);
    if (f.category) {
      const catMap: Record<string, string> = {
        residential_plot: 'Residential Plots',
        commercial_plot: 'Commercial Plots',
        house: 'Houses',
        apartment: 'Apartments',
        shop: 'Shops',
        agricultural: 'Agriculture',
        farmhouse: 'Farmhouses'
      };
      parts.push(catMap[f.category] || f.category);
    }
    if (f.isInstallmentOnly) parts.push('Installment');
    if (f.isVerifiedOnly) parts.push('Verified');
    if (f.maxPrice) parts.push(`< ${formatPKR(Number(f.maxPrice), true)}`);
    return parts.length > 0 ? parts.join(' · ') : 'All Properties';
  };

  const handleApplyHistoryItem = (item: SearchHistoryItem) => {
    const f = item.filters;
    setSearch(f.search || '');
    setSelectedCity(f.city || '');
    setSelectedCategory(f.category || '');
    setMinPrice(f.minPrice !== undefined ? f.minPrice : '');
    setMaxPrice(f.maxPrice !== undefined ? f.maxPrice : '');
    setSelectedUnit(f.selectedUnit || '');
    setIsInstallmentOnly(!!f.isInstallmentOnly);
    setIsVerifiedOnly(!!f.isVerifiedOnly);
    setIsFeaturedOnly(!!f.isFeaturedOnly);
    setAvailability(f.availability || 'all');
    if (f.sortBy) setSortBy(f.sortBy);
  };

  const handleSaveCurrentSearch = () => {
    const currentFilters: SearchHistoryItem['filters'] = {
      search: search.trim() || undefined,
      city: selectedCity || undefined,
      category: selectedCategory || undefined,
      minPrice: minPrice !== '' ? minPrice : undefined,
      maxPrice: maxPrice !== '' ? maxPrice : undefined,
      selectedUnit: selectedUnit || undefined,
      isInstallmentOnly: isInstallmentOnly ? true : undefined,
      isVerifiedOnly: isVerifiedOnly ? true : undefined,
      isFeaturedOnly: isFeaturedOnly ? true : undefined,
      availability: availability !== 'all' ? availability : undefined,
      sortBy
    };

    const label = generateSearchLabel(currentFilters);
    const newItem: SearchHistoryItem = {
      id: `sh-${Date.now()}`,
      timestamp: new Date().toISOString(),
      label,
      filters: currentFilters
    };

    // Filter out duplicates with same label
    const updated = [newItem, ...searchHistory.filter((item) => item.label !== label)].slice(0, 8);
    saveHistoryToStorage(updated);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = searchHistory.filter((item) => item.id !== id);
    saveHistoryToStorage(updated);
  };

  const handleClearAllHistory = () => {
    saveHistoryToStorage([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() || selectedCity || selectedCategory) {
      handleSaveCurrentSearch();
    }
  };

  const allProperties = store.getProperties();

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((item) => {
      // Must be approved by admin moderation
      if (item.moderationStatus !== 'approved') return false;

      // Search matching title, address, society
      if (search) {
        const q = search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchTitleUrdu = item.titleUrdu?.toLowerCase().includes(q);
        const matchAddress = item.address.toLowerCase().includes(q);
        const matchSociety = item.society.toLowerCase().includes(q);
        const matchCity = item.city.toLowerCase().includes(q);
        if (!matchTitle && !matchTitleUrdu && !matchAddress && !matchSociety && !matchCity) {
          return false;
        }
      }

      // City filter
      if (selectedCity && item.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      // Price filter
      if (minPrice !== '' && item.pricePKR < minPrice) return false;
      if (maxPrice !== '' && item.pricePKR > maxPrice) return false;

      // Unit filter
      if (selectedUnit && item.unit !== selectedUnit) return false;

      // Installment filter
      if (isInstallmentOnly && !item.isInstallment) return false;

      // Verified filter
      if (isVerifiedOnly && !item.isVerified) return false;

      // Featured filter
      if (isFeaturedOnly && !item.isFeatured) return false;

      // Availability filter
      if (availability !== 'all' && item.availability !== availability) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price_desc') return b.pricePKR - a.pricePKR;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    allProperties,
    search,
    selectedCity,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedUnit,
    isInstallmentOnly,
    isVerifiedOnly,
    isFeaturedOnly,
    availability,
    sortBy
  ]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedUnit('');
    setIsInstallmentOnly(false);
    setIsVerifiedOnly(false);
    setIsFeaturedOnly(false);
    setAvailability('all');
  };

  const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Gwadar', 'Faisalabad', 'Peshawar'];

  const categories: { id: PropertyCategory; label: string }[] = [
    { id: 'residential_plot', label: 'Residential Plots' },
    { id: 'commercial_plot', label: 'Commercial Plots' },
    { id: 'house', label: 'Houses & Villas' },
    { id: 'apartment', label: 'Apartments & Flats' },
    { id: 'shop', label: 'Shops & Plazas' },
    { id: 'agricultural', label: 'Agricultural Land' },
    { id: 'farmhouse', label: 'Farmhouses' },
    { id: 'warehouse', label: 'Warehouses' },
    { id: 'office', label: 'Offices' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Search Header Bar with Save Search & History Integration */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3.5">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search society, city, sector (e.g. DHA Phase 6, Bahria Town)..."
              className="w-full ps-10 pe-20 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute end-12 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded"
                title="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute end-1.5 top-1.5 px-3 py-1 rounded-lg bg-emerald-800 text-white font-semibold text-xs hover:bg-emerald-900 transition"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none"
            >
              <option value="newest">Sort: Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            <button
              type="button"
              onClick={handleSaveCurrentSearch}
              title="Save current search criteria to history"
              className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Save Search</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </form>

        {/* Feedback toast when user saves search */}
        {saveFeedback && (
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in duration-200">
            <Check className="w-3.5 h-3.5 text-emerald-700" />
            <span>Search criteria saved to your browser history!</span>
          </div>
        )}

        {/* Local Storage Search History Bar */}
        {searchHistory.length > 0 && (
          <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 flex-1 scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <History className="w-3.5 h-3.5 text-emerald-700" />
                Recent Searches:
              </span>

              <div className="flex items-center gap-1.5">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleApplyHistoryItem(item)}
                    className="group shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200/80 hover:border-emerald-300 transition cursor-pointer select-none"
                    title={`Applied on ${new Date(item.timestamp).toLocaleDateString('en-PK')}`}
                  >
                    <Clock className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                    <span className="truncate max-w-[150px]">{item.label}</span>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                      className="p-0.5 rounded hover:bg-slate-300 text-slate-400 hover:text-rose-600 transition"
                      title="Remove this search"
                      aria-label="Remove search"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearAllHistory}
              className="text-[11px] text-slate-400 hover:text-rose-600 font-medium shrink-0 flex items-center gap-1 self-end sm:self-auto"
              title="Clear all stored search history"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-emerald-800" />
                Filter Properties
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-slate-400 hover:text-emerald-800 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* City Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="">All Pakistan Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Price Range (PKR)</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Min PKR"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Max PKR"
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            {/* Area Unit */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Area Unit</label>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {['', 'Marla', 'Kanal', 'Sq. Yds', 'Sq. Feet', 'Acres'].map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setSelectedUnit(u)}
                    className={`py-1 rounded text-center font-medium transition ${
                      selectedUnit === u
                        ? 'bg-emerald-800 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {u || 'Any'}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInstallmentOnly}
                  onChange={(e) => setIsInstallmentOnly(e.target.checked)}
                  className="accent-emerald-800 rounded"
                />
                <span className="font-medium text-slate-700">Easy Installments Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isVerifiedOnly}
                  onChange={(e) => setIsVerifiedOnly(e.target.checked)}
                  className="accent-emerald-800 rounded"
                />
                <span className="font-medium text-slate-700">Verified by PlotBazaar Desk</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeaturedOnly}
                  onChange={(e) => setIsFeaturedOnly(e.target.checked)}
                  className="accent-emerald-800 rounded"
                />
                <span className="font-medium text-slate-700">Featured Listings Only</span>
              </label>
            </div>

            {/* Availability */}
            <div className="pt-3 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="all">All (Available & Reserved)</option>
                <option value="available">Available Only</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Property Grid Results */}
        <main className="lg:col-span-3 space-y-4">
          
          <div className="flex items-center justify-between text-xs text-slate-500">
            <p>
              Showing <strong className="text-slate-900">{filteredProperties.length}</strong> properties
            </p>
            {(selectedCity || selectedCategory || search) && (
              <button
                onClick={resetFilters}
                className="text-emerald-800 font-semibold hover:underline"
              >
                Clear all active filters
              </button>
            )}
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">No Matching Properties Found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your search criteria, widening the price range, or selecting "All Cities".
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-semibold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>

      {/* Mobile Filter Sheet Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-sm text-slate-900">Filter Properties</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
              >
                <option value="">All Pakistan Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  resetFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
