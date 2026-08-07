import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/layout/AuthModal';

import { HeroSection } from './components/landing/HeroSection';
import { LiveTicker } from './components/landing/LiveTicker';
import { MarketSummary } from './components/landing/MarketSummary';
import { TrendingSection } from './components/landing/TrendingSection';

import { GlobalScoreCard } from './components/dashboard/GlobalScoreCard';
import { StatsGrid } from './components/dashboard/StatsGrid';

import { CompanyCard } from './components/companies/CompanyCard';
import { CompanyDetailModal } from './components/companies/CompanyDetailModal';
import { CompanyRankings } from './components/companies/CompanyRankings';

import { CategoryCard } from './components/shops/CategoryCard';
import { CategoryDetailModal } from './components/shops/CategoryDetailModal';

import { Interactive3DGlobe } from './components/globe/Interactive3DGlobe';
import { CountryDetailDrawer } from './components/globe/CountryDetailDrawer';

import { AIExplanationPanel } from './components/ai/AIExplanationPanel';
import { AIPredictionsWidget } from './components/ai/AIPredictionsWidget';

import { RevenueProfitChart } from './components/charts/RevenueProfitChart';
import { IndustryComparisonChart } from './components/charts/IndustryComparisonChart';
import { CountryGrowthHeatmap } from './components/charts/CountryGrowthHeatmap';

import { SmartSearchModal } from './components/search/SmartSearchModal';
import { FilterBar } from './components/search/FilterBar';

import { UserProfileView } from './components/profile/UserProfileView';
import { AdminDashboard } from './components/admin/AdminDashboard';

import { Building2, Store } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, filters } = useApp();

  // Filtered companies logic
  const filteredCompanies = MOCK_COMPANIES.filter(c => {
    const matchesCountry = filters.country === 'ALL' || c.country === filters.country;
    const matchesIndustry = filters.industry === 'ALL' || c.industry === filters.industry;
    return matchesCountry && matchesIndustry;
  }).sort((a, b) => {
    if (filters.sortBy === 'profit') return b.profitValue - a.profitValue;
    if (filters.sortBy === 'growth') return b.growthRate - a.growthRate;
    if (filters.sortBy === 'health') return b.healthScore - a.healthScore;
    if (filters.sortBy === 'risk') return b.riskScore - a.riskScore;
    return b.revenueValue - a.revenueValue;
  });

  return (
    <main className="min-h-screen pb-12">
      
      {/* 1. Landing View */}
      {activeView === 'landing' && (
        <div className="space-y-12 animate-in fade-in">
          <HeroSection />
          <LiveTicker />
          <MarketSummary />
          <TrendingSection />
        </div>
      )}

      {/* 2. Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-neon-cyan font-bold uppercase tracking-wider">
                Command & Telemetry Center
              </span>
              <h1 className="text-3xl font-extrabold text-white">Global Business Executive Dashboard</h1>
            </div>
          </div>
          <GlobalScoreCard />
          <StatsGrid />
          <RevenueProfitChart />
          <CountryGrowthHeatmap />
        </div>
      )}

      {/* 3. Top Companies View */}
      {activeView === 'companies' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-neon-cyan" /> 20+ Global Enterprise Giants
            </div>
            <h1 className="text-3xl font-extrabold text-white">Corporate Financial Directory</h1>
          </div>

          <FilterBar />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <CompanyRankings />
        </div>
      )}

      {/* 4. Shop Categories View */}
      {activeView === 'categories' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neon-purple uppercase tracking-wider mb-1">
              <Store className="w-4 h-4 text-neon-purple" /> 20+ Retail & Local Business Sectors
            </div>
            <h1 className="text-3xl font-extrabold text-white">Global Shop Category Analytics</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* 5. 3D Globe View */}
      {activeView === 'globe' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 animate-in fade-in">
          <Interactive3DGlobe />
          <CountryGrowthHeatmap />
        </div>
      )}

      {/* 6. AI Predictions View */}
      {activeView === 'ai-prediction' && (
        <div className="space-y-10 animate-in fade-in">
          <AIPredictionsWidget />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIExplanationPanel />
          </div>
        </div>
      )}

      {/* 7. Charts & Analytics View */}
      {activeView === 'charts' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10 animate-in fade-in">
          <div>
            <span className="text-xs font-mono text-neon-purple font-bold uppercase tracking-wider">
              Data & Visual Modeling
            </span>
            <h1 className="text-3xl font-extrabold text-white">Enterprise BI Charts & Heatmaps</h1>
          </div>
          <RevenueProfitChart />
          <IndustryComparisonChart />
          <CountryGrowthHeatmap />
        </div>
      )}

      {/* 8. User Profile View */}
      {activeView === 'profile' && <UserProfileView />}

      {/* 9. Admin Panel View */}
      {activeView === 'admin' && <AdminDashboard />}

      {/* Global Modals & Drawers */}
      <CompanyDetailModal />
      <CategoryDetailModal />
      <CountryDetailDrawer />
      <SmartSearchModal />
      <AuthModal />

    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-space-900 text-slate-100">
          <Navbar />
          <MainContent />
          <Footer />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
