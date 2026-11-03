import React, { useState } from 'react';
import { 
  Building2, 
  PlusCircle, 
  Heart, 
  MessageCircle, 
  Phone, 
  Receipt
} from 'lucide-react';
import { Property, Order, Inquiry } from '../types';
import { store } from '../services/store';
import { useAuth } from '../context/AuthContext';
import { PropertyCard } from '../components/PropertyCard';

interface DashboardPageProps {
  onNavigate: (view: string, params?: any) => void;
  onSelectProperty: (property: Property) => void;
  onViewOrderReceipt: (order: Order) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onSelectProperty,
  onViewOrderReceipt
}) => {
  const { user, role, isDealer, isSeller } = useAuth();
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'orders' | 'favorites'>('listings');

  const allProperties = store.getProperties();
  const myListings = allProperties.filter((p) => p.sellerId === user?.id || (isDealer && p.agencyName === user?.agencyName));
  const myOrders = store.getOrders().filter((o) => o.userId === user?.id || o.userPhone === user?.phone);
  const myFavorites = store.getFavorites().map((id) => store.getPropertyById(id)).filter(Boolean) as Property[];
  const myInquiries = store.getInquiries().filter((inq) => inq.sellerId === user?.id);

  const sub = user?.subscription;
  const remainingQuota = sub ? Math.max(0, sub.listingAllowance - sub.listingsUsed) : 0;
  const remainingBoosts = sub ? Math.max(0, sub.featuredBoostsAllowance - sub.featuredBoostsUsed) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Dashboard Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl">
            {user?.name ? user.name[0] : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {user?.name}
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                {role === 'dealer' ? 'Authorized Dealer' : role === 'seller' ? 'Property Seller' : 'Buyer Profile'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {user?.agencyName ? `${user.agencyName} · ` : ''}{user?.phone} · {user?.city}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={store.getWhatsAppLink(`Assalam-o-Alaikum, I am ${user?.name || 'a user'} (${role}) and need assistance with my PlotBazaar dashboard/listings.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
            title="Chat with Customer Support on WhatsApp: 03363144097"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support (03363144097)</span>
          </a>
          <button
            onClick={() => onNavigate('sell')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Listing</span>
          </button>
          <button
            onClick={() => onNavigate('packages')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
          >
            Upgrade / Renew Package
          </button>
        </div>
      </div>

      {/* Subscription Status Card */}
      {(isDealer || isSeller) && sub && (
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 shadow-lg border border-emerald-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Active Monthly Plan
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">{sub.packageName}</h2>
              <p className="text-xs text-emerald-300">
                Valid until: <strong>{new Date(sub.expiresAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
              </p>
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
            >
              Extend Subscription
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-400">Total Listing Allowance</span>
              <p className="text-xl font-black text-white mt-0.5">{sub.listingAllowance} Listings</p>
            </div>
            <div>
              <span className="text-slate-400">Listings Used</span>
              <p className="text-xl font-black text-white mt-0.5">{sub.listingsUsed} Active</p>
            </div>
            <div>
              <span className="text-slate-400">Remaining Quota</span>
              <p className="text-xl font-black text-amber-400 mt-0.5">{remainingQuota} Slots</p>
            </div>
            <div>
              <span className="text-slate-400">Featured Boosts</span>
              <p className="text-xl font-black text-emerald-300 mt-0.5">{remainingBoosts} Available</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
        {(isDealer || isSeller) && (
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'listings' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            My Property Listings ({myListings.length})
          </button>
        )}

        {(isDealer || isSeller) && (
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2.5 rounded-xl transition ${
              activeTab === 'inquiries' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Leads & Inquiries ({myInquiries.length})
          </button>
        )}

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl transition ${
            activeTab === 'orders' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Payment History & Receipts ({myOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2.5 rounded-xl transition ${
            activeTab === 'favorites' ? 'bg-emerald-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Saved Favorites ({myFavorites.length})
        </button>
      </div>

      {/* TAB: My Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <p>You have published <strong>{myListings.length}</strong> property advertisements.</p>
            <button onClick={() => onNavigate('sell')} className="text-emerald-800 font-bold hover:underline">
              + Post Another Property
            </button>
          </div>

          {myListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((prop) => (
                <div key={prop.id} className="relative">
                  <PropertyCard property={prop} onSelect={onSelectProperty} />
                  <div className="mt-2 flex items-center justify-between text-xs px-2">
                    <span className={`font-semibold ${prop.moderationStatus === 'approved' ? 'text-emerald-700' : 'text-amber-600'}`}>
                      Status: {prop.moderationStatus.toUpperCase()}
                    </span>
                    <button
                      onClick={() => onSelectProperty(prop)}
                      className="text-slate-600 hover:text-emerald-800 underline"
                    >
                      View Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-sm">No Property Listings Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Post your plot, house, or commercial investment to reach thousands of Pakistani buyers.
              </p>
              <button
                onClick={() => onNavigate('sell')}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Post First Property
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB: Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Buyer Lead Inquiries Received</h3>
          
          <div className="space-y-3 text-xs">
            {myInquiries.map((inq) => (
              <div key={inq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{inq.buyerName}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Regarding: <strong>{inq.propertyTitle}</strong></p>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">
                    {new Date(inq.createdAt).toLocaleDateString('en-PK')}
                  </span>
                </div>

                <p className="p-2.5 rounded-lg bg-white border border-slate-200 text-slate-700">
                  "{inq.message}"
                </p>

                <div className="flex gap-2 pt-1">
                  <a
                    href={`https://wa.me/${inq.buyerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Buyer ({inq.buyerPhone})</span>
                  </a>
                  <a
                    href={`tel:${inq.buyerPhone}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Directly</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Official Invoices & Payment History</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and print official vouchers issued by PlotBazaar Pakistan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4 text-start">Order Ref</th>
                  <th className="py-3 px-4 text-start">Date</th>
                  <th className="py-3 px-4 text-start">Package / Item</th>
                  <th className="py-3 px-4 text-end">Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-end">Official Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{order.id}</td>
                    <td className="py-3 px-4 text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString('en-PK')}
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">
                      {order.items[0]?.packageName || 'Package'}
                    </td>
                    <td className="py-3 px-4 text-end font-bold text-emerald-950">
                      Rs. {order.totalAmountPKR.toLocaleString('en-PK')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        order.paymentStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.paymentStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => onViewOrderReceipt(order)}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 ms-auto"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Print Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: Favorites */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Your Saved Properties</h3>
          {myFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myFavorites.map((prop) => (
                <PropertyCard key={prop.id} property={prop} onSelect={onSelectProperty} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-900 text-sm">No Saved Properties</h3>
              <p className="text-xs text-slate-500">
                Tap the heart icon on any property to save it here for quick access.
              </p>
              <button
                onClick={() => onNavigate('browse')}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs"
              >
                Browse Listings
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
