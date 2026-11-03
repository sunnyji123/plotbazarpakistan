/**
 * PlotBazaar Pakistan
 * Owner: Intekhab Alam (Founder & CEO)
 * Tagline: Apni Property, Apna Mustaqbil
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrowsePropertiesPage } from './pages/BrowsePropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { PackagesPage } from './pages/PackagesPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PaymentReceiptPage } from './pages/PaymentReceiptPage';
import { SellPropertyPage } from './pages/SellPropertyPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { SocialAdsPage } from './pages/SocialAdsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { LegalPoliciesPage } from './pages/LegalPoliciesPage';
import { AuthPage } from './pages/AuthPage';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { Property, Package, Order } from './types';
import { store } from './services/store';

function MainApp() {
  const { user, isAdmin } = useAuth();
  const { t } = useLanguage();
  const isOnline = useOnlineStatus();

  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  // Checkout flow state
  const [checkoutPackage, setCheckoutPackage] = useState<Package | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState<number>(1);
  const [currentReceiptOrder, setCurrentReceiptOrder] = useState<Order | null>(null);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigate = (view: string, params: any = {}) => {
    setViewParams(params);
    setCurrentView(view);
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property_details');
  };

  const handleSelectPackageForCheckout = (pkg: Package, quantity: number = 1) => {
    setCheckoutPackage(pkg);
    setCheckoutQuantity(quantity);
    setCurrentView('checkout');
  };

  const handleCheckoutSuccess = (order: Order) => {
    setCurrentReceiptOrder(order);
    setCurrentView('receipt');
  };

  const handlePostSuccess = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property_details');
  };

  const defaultPackage = store.getPackages()[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Offline Mode Indicator (PWA Skill standard) */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-semibold sticky top-0 z-50">
          ⚠️ {t('offlineNotice')}
        </div>
      )}

      {/* Main Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'browse' && (
          <BrowsePropertiesPage
            initialFilter={viewParams}
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'property_details' && selectedProperty && (
          <PropertyDetailsPage
            property={selectedProperty}
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentView === 'packages' && (
          <PackagesPage
            onSelectPackageForCheckout={handleSelectPackageForCheckout}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            selectedPackage={checkoutPackage || defaultPackage}
            quantity={checkoutQuantity}
            onNavigate={handleNavigate}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {currentView === 'receipt' && currentReceiptOrder && (
          <PaymentReceiptPage
            order={currentReceiptOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'sell' && (
          <SellPropertyPage
            onNavigate={handleNavigate}
            onPostSuccess={handlePostSuccess}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            onViewOrderReceipt={(order) => {
              setCurrentReceiptOrder(order);
              setCurrentView('receipt');
            }}
          />
        )}

        {currentView === 'orders' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onSelectProperty={handleSelectProperty}
            onViewOrderReceipt={(order) => {
              setCurrentReceiptOrder(order);
              setCurrentView('receipt');
            }}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanelPage
            onNavigate={handleNavigate}
            onViewOrderReceipt={(order) => {
              setCurrentReceiptOrder(order);
              setCurrentView('receipt');
            }}
          />
        )}

        {currentView === 'social_ads' && (
          <SocialAdsPage onNavigate={handleNavigate} />
        )}

        {currentView === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactUsPage onNavigate={handleNavigate} />
        )}

        {(currentView === 'terms' || currentView === 'privacy' || currentView === 'refunds' || currentView === 'faq') && (
          <LegalPoliciesPage
            initialPolicy={currentView as any}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            initialMode={viewParams.mode || 'login'}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </LanguageProvider>
  );
}
