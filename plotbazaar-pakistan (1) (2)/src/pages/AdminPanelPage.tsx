import React, { useState } from 'react';
import { 
  ShieldCheck, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  FileText, 
  Download, 
  TrendingUp, 
  Settings, 
  Package as PackageIcon, 
  Building2, 
  Users, 
  Sparkles,
  Eye,
  Check,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  CreditCard,
  Building
} from 'lucide-react';
import { Package, Order, Property, PropertyReport, AuditLog } from '../types';
import { store, formatPKR } from '../services/store';
import { useAuth } from '../context/AuthContext';

interface AdminPanelPageProps {
  onNavigate: (view: string, params?: any) => void;
  onViewOrderReceipt: (order: Order) => void;
}

export const AdminPanelPage: React.FC<AdminPanelPageProps> = ({
  onNavigate,
  onViewOrderReceipt
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'packages' | 'payments' | 'properties' | 'reports' | 'users' | 'audit' | 'settings'
  >('analytics');

  // Local state for live reactivity
  const [orders, setOrders] = useState<Order[]>(() => store.getOrders());
  const [packages, setPackages] = useState<Package[]>(() => store.getPackages());
  const [properties, setProperties] = useState<Property[]>(() => store.getProperties());
  const [reports, setReports] = useState<PropertyReport[]>(() => store.getReports());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => store.getAuditLogs());
  const [websiteSettings, setWebsiteSettings] = useState(() => store.getWebsiteSettings());
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Package editor state
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editAllowance, setEditAllowance] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<number>(30);
  const [editSaveSuccess, setEditSaveSuccess] = useState(false);

  // Rejection modal
  const [rejectModalOrder, setRejectModalOrder] = useState<Order | null>(null);
  const [rejectReason, setRejectReason] = useState('Transaction reference not matched in bank statement.');

  const analytics = store.getFinancialAnalytics();

  const handleApprovePayment = (orderId: string) => {
    const success = store.approveManualPayment(orderId, user?.name || 'Intekhab Alam (Founder & CEO)');
    if (success) {
      setOrders([...store.getOrders()]);
      setAuditLogs([...store.getAuditLogs()]);
      setProperties([...store.getProperties()]);
    }
  };

  const handleConfirmReject = () => {
    if (rejectModalOrder) {
      store.rejectManualPayment(rejectModalOrder.id, user?.name || 'Intekhab Alam (Founder & CEO)', rejectReason);
      setOrders([...store.getOrders()]);
      setAuditLogs([...store.getAuditLogs()]);
      setRejectModalOrder(null);
    }
  };

  const handleStartEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
    setEditPrice(pkg.pricePKR);
    setEditAllowance(pkg.listingAllowance);
    setEditDuration(pkg.durationDays);
    setEditSaveSuccess(false);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage) return;

    const updated: Package = {
      ...editingPackage,
      pricePKR: editPrice,
      listingAllowance: editAllowance,
      durationDays: editDuration
    };

    store.updatePackage(updated, user?.name || 'Intekhab Alam (Founder & CEO)');
    setPackages([...store.getPackages()]);
    setAuditLogs([...store.getAuditLogs()]);
    setEditSaveSuccess(true);
    setTimeout(() => {
      setEditingPackage(null);
      setEditSaveSuccess(false);
    }, 1500);
  };

  const handleTogglePropertyApproval = (propertyId: string, approved: boolean) => {
    const prop = store.getPropertyById(propertyId);
    if (prop) {
      prop.moderationStatus = approved ? 'approved' : 'rejected';
      store.saveProperty(prop);
      setProperties([...store.getProperties()]);
      store.addAuditLog(
        user?.name || 'Intekhab Alam',
        'admin',
        approved ? 'APPROVE_PROPERTY' : 'REJECT_PROPERTY',
        'property',
        propertyId,
        `${approved ? 'Approved' : 'Rejected'} property "${prop.title}"`
      );
      setAuditLogs([...store.getAuditLogs()]);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Package', 'Amount (PKR)', 'Payment Method', 'Status', 'Transaction Ref'];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString('en-PK'),
      `"${o.userName}"`,
      `"${o.userPhone}"`,
      `"${o.items[0]?.packageName || 'Service'}"`,
      o.totalAmountPKR,
      o.paymentMethod,
      o.paymentStatus,
      `"${o.transactionRef || 'N/A'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PlotBazaar_Revenue_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateWebsiteSettings(websiteSettings, user?.name || 'Intekhab Alam (Founder & CEO)');
    setWebsiteSettings(store.getWebsiteSettings());
    setAuditLogs([...store.getAuditLogs()]);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Admin Executive Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow-md">
            IA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-white">Intekhab Alam</span>
              <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                Founder & CEO
              </span>
            </div>
            <p className="text-xs text-emerald-300 font-medium">
              PlotBazaar Pakistan · Supreme Administrative & Financial Control Center
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Revenue CSV</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition border border-white/10"
          >
            View Live Portal
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold">
        {[
          { id: 'analytics', label: 'Financial Analytics', icon: TrendingUp },
          { id: 'payments', label: `Payment Approvals (${orders.filter(o => o.paymentStatus === 'pending_verification').length})`, icon: DollarSign },
          { id: 'packages', label: 'Packages & Pricing Config', icon: PackageIcon },
          { id: 'properties', label: `Property Moderation (${properties.length})`, icon: Building2 },
          { id: 'reports', label: `Suspicious Reports (${reports.filter(r => r.status === 'pending').length})`, icon: AlertCircle },
          { id: 'users', label: 'Users & Dealers', icon: Users },
          { id: 'audit', label: 'Audit Log Trail', icon: FileText },
          { id: 'settings', label: 'Website & Payment Settings', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Financial & Business Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Total Collected Revenue</span>
              <p className="text-2xl font-black text-emerald-950 mt-1">
                Rs. {analytics.totalCollectedPKR.toLocaleString('en-PK')}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                {analytics.completedOrdersCount} Confirmed Transactions
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Pending Manual Verification</span>
              <p className="text-2xl font-black text-amber-600 mt-1">
                Rs. {analytics.pendingPKR.toLocaleString('en-PK')}
              </p>
              <p className="text-[11px] text-amber-700 font-semibold mt-1">
                {analytics.pendingOrdersCount} Bank/Raast Transfers awaiting review
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-medium text-slate-500">Refunds & Reversals</span>
              <p className="text-2xl font-black text-rose-600 mt-1">
                Rs. {analytics.refundedPKR.toLocaleString('en-PK')}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Accurately deducted from net revenue</p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950 text-white border border-emerald-900 shadow-xs">
              <span className="text-xs font-medium text-emerald-300">Net Recorded Revenue</span>
              <p className="text-2xl font-black text-amber-400 mt-1">
                Rs. {analytics.netRevenuePKR.toLocaleString('en-PK')}
              </p>
              <p className="text-[11px] text-emerald-300 mt-1">Real-time collections audit</p>
            </div>
          </div>

          {/* Breakdown Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* By Package */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Revenue by Package</span>
                <span className="text-xs text-slate-400">Verified Orders</span>
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(analytics.byPackage).map(([pkgId, data]) => (
                  <div key={pkgId} className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-900">{data.title}</p>
                      <p className="text-[10px] text-slate-400">{data.count} units sold</p>
                    </div>
                    <span className="font-bold text-emerald-900">Rs. {data.totalPKR.toLocaleString('en-PK')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Payment Method */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Collections by Payment Channel</span>
                <span className="text-xs text-slate-400">Gateway vs Bank</span>
              </h3>
              <div className="space-y-2 text-xs">
                {Object.entries(analytics.byMethod).map(([method, amount]) => (
                  <div key={method} className="flex justify-between items-center p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-semibold text-slate-800 capitalize">{method.replace('_', ' ')}</span>
                    <span className="font-bold text-emerald-900">Rs. {amount.toLocaleString('en-PK')}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: Payment Approvals & Verification Queue */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Manual Payment Verification Desk</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted bank transfer & Raast reference numbers. Packages only activate upon confirmed approval.
              </p>
            </div>
            <button onClick={handleExportCSV} className="text-xs text-emerald-800 font-bold hover:underline">
              Download All Transactions
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4 text-start">Order ID</th>
                  <th className="py-3 px-4 text-start">Customer</th>
                  <th className="py-3 px-4 text-start">Package / Service</th>
                  <th className="py-3 px-4 text-end">Amount</th>
                  <th className="py-3 px-4 text-start">Channel & Ref</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-end">Verification Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {order.id}
                      <span className="block font-normal text-[10px] text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString('en-PK')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{order.userName}</span>
                      <span className="text-[10px] text-slate-400">{order.userPhone}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {order.items[0]?.packageName || 'Service Item'}
                    </td>
                    <td className="py-3 px-4 text-end font-bold text-slate-900">
                      Rs. {order.totalAmountPKR.toLocaleString('en-PK')}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800 capitalize block">{order.paymentMethod.replace('_', ' ')}</span>
                      {order.transactionRef ? (
                        <span className="font-mono text-[10px] text-emerald-700 font-bold">{order.transactionRef}</span>
                      ) : (
                        <span className="text-[10px] text-slate-400">No ref provided</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        order.paymentStatus === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.paymentStatus === 'pending_verification'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                      }`}>
                        {order.paymentStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => onViewOrderReceipt(order)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                        title="View Official Receipt"
                      >
                        Receipt
                      </button>

                      {order.paymentStatus === 'pending_verification' && (
                        <>
                          <button
                            onClick={() => handleApprovePayment(order.id)}
                            className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectModalOrder(order)}
                            className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Packages & Pricing Configurator */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Owner Package & Rate Card Configuration</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Intekhab Alam can update prices, listing allowances, and durations. Existing paid orders preserve original pricing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {pkg.category}
                    </span>
                    <button
                      onClick={() => handleStartEditPackage(pkg)}
                      className="p-1 rounded text-slate-400 hover:text-emerald-800 hover:bg-emerald-50"
                      title="Edit Package"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mt-2">{pkg.title}</h4>
                  <p className="text-xl font-extrabold text-emerald-950 mt-1">
                    Rs. {pkg.pricePKR.toLocaleString('en-PK')}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                    <p>• Listing Allowance: <strong>{pkg.listingAllowance} ads</strong></p>
                    <p>• Validity Duration: <strong>{pkg.durationDays} days</strong></p>
                    <p>• Included Boosts: <strong>{pkg.featuredBoosts}</strong></p>
                  </div>
                </div>

                <button
                  onClick={() => handleStartEditPackage(pkg)}
                  className="mt-4 w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  Configure Rates & Limits
                </button>
              </div>
            ))}
          </div>

          {/* Edit Package Modal */}
          {editingPackage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900">Configure {editingPackage.title}</h3>
                    <p className="text-xs text-slate-400">Founder & CEO Privilege</p>
                  </div>
                  <button onClick={() => setEditingPackage(null)}>
                    <XCircle className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleSavePackage} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price (PKR)</label>
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value) || 0)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                    />
                    <span className="text-[10px] text-emerald-800">{formatPKR(editPrice)}</span>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Included Listing Allowance (Ads)
                    </label>
                    <input
                      type="number"
                      value={editAllowance}
                      onChange={(e) => setEditAllowance(Number(e.target.value) || 0)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Prompt Rule: For the Rs. 30,000 package, default is 50 listings. Strictly finite unless explicitly enabled.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Duration (Days)</label>
                    <input
                      type="number"
                      value={editDuration}
                      onChange={(e) => setEditDuration(Number(e.target.value) || 30)}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold"
                    />
                  </div>

                  {editSaveSuccess && (
                    <div className="p-2 rounded bg-emerald-50 text-emerald-800 text-center font-bold">
                      ✓ Package updated and logged to audit trail!
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingPackage(null)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Property Moderation */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Property Moderation & Quality Control</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Review submitted property advertisements, verify legal claims, toggle featured spots.
              </p>
            </div>
            <button
              onClick={() => onNavigate('sell')}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              + Post New Property
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4 text-start">Property</th>
                  <th className="py-3 px-4 text-start">City / Society</th>
                  <th className="py-3 px-4 text-start">Seller</th>
                  <th className="py-3 px-4 text-end">Price (PKR)</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-end">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block line-clamp-1">{prop.title}</span>
                      <span className="text-[10px] text-slate-400">{prop.size} {prop.unit} · #{prop.id}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <span>{prop.city}</span>
                      <span className="block text-[10px] text-slate-400">{prop.society}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <span className="font-medium">{prop.sellerName}</span>
                      <span className="block text-[10px] text-slate-400">{prop.sellerPhone}</span>
                    </td>
                    <td className="py-3 px-4 text-end font-bold text-emerald-950">
                      {formatPKR(prop.pricePKR)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        prop.moderationStatus === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prop.moderationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end space-x-1.5 whitespace-nowrap">
                      {prop.moderationStatus !== 'approved' ? (
                        <button
                          onClick={() => handleTogglePropertyApproval(prop.id, true)}
                          className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold"
                        >
                          Approve Ad
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTogglePropertyApproval(prop.id, false)}
                          className="px-2 py-1 rounded bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-semibold"
                        >
                          Reject / Hide
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Suspicious Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">User Complaint & Suspicious Reports Queue</h3>
              <p className="text-xs text-slate-500">
                Community reports submitted against misleading prices, fake photos, or unreachable numbers.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{rep.propertyTitle}</span>
                    <span className="block text-[11px] text-slate-400">Reported by: {rep.reportedBy}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase text-[10px]">
                    {rep.reason.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/60">
                  "{rep.details}"
                </p>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => {
                      store.updateReportStatus(rep.id, 'dismissed');
                      setReports([...store.getReports()]);
                    }}
                    className="px-3 py-1 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 text-[11px] font-medium"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => {
                      store.updateReportStatus(rep.id, 'resolved');
                      setReports([...store.getReports()]);
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 text-[11px] font-bold"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: Users & Dealers Directory */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Registered Accounts & Agency Profiles</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Buyers, property owners, and real estate dealer subscriptions.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4 text-start">User / Agency</th>
                  <th className="py-3 px-4 text-start">Contact</th>
                  <th className="py-3 px-4 text-center">Role</th>
                  <th className="py-3 px-4 text-start">Subscription Status</th>
                  <th className="py-3 px-4 text-center">Remaining Quota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {store.getUsers().map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-900 block">{u.name}</span>
                      {u.agencyName && (
                        <span className="text-[10px] text-emerald-700 font-semibold">{u.agencyName}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span>{u.phone}</span>
                      <span className="block text-[10px] text-slate-400">{u.email}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold uppercase text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {u.subscription ? (
                        <div>
                          <span className="font-semibold block">{u.subscription.packageName}</span>
                          <span className="text-[10px] text-slate-400">
                            Expires {new Date(u.subscription.expiresAt).toLocaleDateString('en-PK')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Free Account</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      {u.subscription ? `${u.subscription.listingAllowance - u.subscription.listingsUsed} ads` : '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: Audit Log Trail */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Administrative & Security Audit Logs</h3>
              <p className="text-xs text-slate-500">
                Tamper-resistant audit record of payment approvals, rate updates, and moderation actions.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleString('en-PK')}</span>
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded uppercase font-semibold">
                      {log.targetType}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{log.details}</p>
                </div>
                <div className="text-start sm:text-end shrink-0">
                  <span className="font-semibold text-slate-800 text-[11px] block">{log.actor}</span>
                  <span className="text-[10px] text-slate-400">Admin Clearance</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: Website Settings & Payment Configuration */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Website Settings & Official Contact Controls
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Managed exclusively by Intekhab Alam (Founder & CEO). Changes immediately update the live public site, footers, headers, checkout, and receipts.
                </p>
              </div>

              {settingsSaved && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center gap-1.5 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Settings Saved & Audited!</span>
                </div>
              )}
            </div>

            {/* Section 1: Executive Brand & Contacts */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                1. Executive Leadership & Public Contact Information
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Founder & CEO Name</label>
                  <input
                    type="text"
                    value={websiteSettings.founderName}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, founderName: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Support Helpline (Telephone)</label>
                  <input
                    type="text"
                    value={websiteSettings.supportPhone}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, supportPhone: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Clickable link rendered as tel:+923363144097</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Support Email</label>
                  <input
                    type="email"
                    value={websiteSettings.supportEmail}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, supportEmail: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Clickable link rendered as mailto:sunnyjiansari456@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Section 2: WhatsApp Support Link & Direct Chat Routing */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-emerald-700" />
                2. WhatsApp Support & Link Routing Configuration
              </h4>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    WhatsApp Destination URL Notice
                  </span>
                  <a
                    href={store.getWhatsAppLink('Assalam-o-Alaikum, testing PlotBazaar destination link.')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-900 font-bold text-[11px] flex items-center gap-1"
                  >
                    <span>Test Current Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900">
                  The initial link provided by the owner is <strong>https://whatsapp.com/dl/</strong>. Note that this URL is a general WhatsApp application download link. You can enable <strong>"Use Direct WhatsApp Chat"</strong> below to open a direct chat conversation with <strong>+92 336 3144097</strong> with a pre-filled Pakistani property inquiry message.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Configured WhatsApp Base URL</label>
                  <input
                    type="url"
                    value={websiteSettings.supportWhatsAppUrl}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, supportWhatsAppUrl: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Default owner link: https://whatsapp.com/dl/</p>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Customer Support WhatsApp Number</label>
                  <input
                    type="text"
                    value={websiteSettings.supportWhatsAppNumber}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, supportWhatsAppNumber: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Official WhatsApp number: 03363144097</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    Enable Direct WhatsApp Chat (wa.me/923363144097)
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    When enabled, WhatsApp Support buttons open direct chat with pre-filled message instead of generic download page.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={websiteSettings.useDirectWhatsAppChat}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, useDirectWhatsAppChat: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                </label>
              </div>
            </div>

            {/* Section 3: Official Manual Payment Channels */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                3. Manual Payment Instructions & Accounts (JazzCash, Easypaisa, Raast)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* JazzCash Configuration */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">JazzCash Mobile Wallet</span>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={websiteSettings.isJazzCashManualEnabled}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, isJazzCashManualEnabled: e.target.checked })}
                        className="accent-emerald-700 rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-600">Enabled</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">JazzCash Payment Number</label>
                    <input
                      type="text"
                      value={websiteSettings.jazzCashNumber}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, jazzCashNumber: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">JazzCash Account Title</label>
                    <input
                      type="text"
                      value={websiteSettings.jazzCashAccountTitle}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, jazzCashAccountTitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-medium"
                    />
                  </div>
                </div>

                {/* Easypaisa Configuration */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Easypaisa Mobile Wallet</span>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={websiteSettings.isEasypaisaManualEnabled}
                        onChange={(e) => setWebsiteSettings({ ...websiteSettings, isEasypaisaManualEnabled: e.target.checked })}
                        className="accent-emerald-700 rounded"
                      />
                      <span className="text-[11px] font-semibold text-slate-600">Enabled</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">Easypaisa Payment Number</label>
                    <input
                      type="text"
                      value={websiteSettings.easypaisaNumber}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, easypaisaNumber: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">Easypaisa Account Title</label>
                    <input
                      type="text"
                      value={websiteSettings.easypaisaAccountTitle}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, easypaisaAccountTitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Bank & Raast Details */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Bank Transfer & Raast Details</span>
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={websiteSettings.isBankRaastEnabled}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, isBankRaastEnabled: e.target.checked })}
                      className="accent-emerald-700 rounded"
                    />
                    <span className="text-[11px] font-semibold text-slate-600">Enabled</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">Bank Name</label>
                    <input
                      type="text"
                      value={websiteSettings.bankName}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, bankName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">Account Title</label>
                    <input
                      type="text"
                      value={websiteSettings.bankAccountTitle}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, bankAccountTitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-0.5">Raast ID (Customer Helpline)</label>
                    <input
                      type="text"
                      value={websiteSettings.raastId}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, raastId: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-700 mb-0.5">IBAN</label>
                  <input
                    type="text"
                    value={websiteSettings.bankIBAN}
                    onChange={(e) => setWebsiteSettings({ ...websiteSettings, bankIBAN: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Online Debit/Credit Card Status */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-100/70 text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    Online Debit / Credit Card Gateway
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Status: <strong>Live gateway not configured</strong> (Automated merchant gateway onboarding with 1Link / PayFast in progress).
                  </span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                  Inactive / Not Configured
                </span>
              </div>
            </div>

            {/* Section 4: Basic Account Free Listings Policy */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                4. Free Basic Account Listing Policy (Owner Controlled)
              </h4>

              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Allow Free Property Advertisements</span>
                  <span className="text-[11px] text-slate-500">
                    Control whether new registered users can publish a free property listing without purchasing Rs. 1,500 ad package.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-600 font-semibold">Free Quota:</span>
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={websiteSettings.freeListingsLimit}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, freeListingsLimit: Number(e.target.value) })}
                      className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-center font-bold"
                    />
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={websiteSettings.freeListingsEnabled}
                      onChange={(e) => setWebsiteSettings({ ...websiteSettings, freeListingsEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-700"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-[11px]">
                Logged in as <strong>{user?.name} (Founder & CEO)</strong>
              </span>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Rejection Modal */}
      {rejectModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">
              Reject Payment for {rejectModalOrder.id}
            </h3>
            <p className="text-slate-500">
              Provide an official recorded reason. The user will be notified on their dashboard.
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
            />
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectModalOrder(null)}
                className="flex-1 py-2 rounded-xl border border-slate-200 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
