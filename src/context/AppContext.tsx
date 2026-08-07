import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ViewType, Company, ShopCategory, CountryData, FilterState, NotificationItem } from '../types';

interface AppContextType {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  selectedCategory: ShopCategory | null;
  setSelectedCategory: (category: ShopCategory | null) => void;
  selectedCountry: CountryData | null;
  setSelectedCountry: (country: CountryData | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  isSimulatingLive: boolean;
  setIsSimulatingLive: (simulating: boolean) => void;
  liveStats: {
    estimatedGlobalProfit: number;
    estimatedGlobalLoss: number;
    companiesStartedToday: number;
    companiesClosedToday: number;
    shopsOpenedToday: number;
    shopsClosedToday: number;
    globalScore: number;
    worldwideGrowth: number;
    economicHealthIndex: number;
    businessConfidenceIndex: number;
  };
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  country: 'ALL',
  industry: 'ALL',
  minRevenue: 0,
  maxRiskScore: 100,
  sortBy: 'revenue',
  sortOrder: 'desc',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewType>('landing');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSimulatingLive, setIsSimulatingLive] = useState(true);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Market Alert: NVIDIA Surge',
      message: 'AI cluster hardware demand pushes estimated Q3 revenue to ₹10.4 Trillion.',
      type: 'market',
      timestamp: '2 mins ago',
      read: false,
    },
    {
      id: 'n-2',
      title: 'AI Prediction Updated',
      message: 'Southeast Asian FinTech & Indian green energy sectors upgraded to STRONG BUY.',
      type: 'ai',
      timestamp: '15 mins ago',
      read: false,
    },
    {
      id: 'n-3',
      title: 'Global Economic Index',
      message: 'Business Confidence Index rose +1.4 points to 91.2 following Federal Reserve policy updates.',
      type: 'news',
      timestamp: '1 hour ago',
      read: false,
    },
  ]);

  const [liveStats, setLiveStats] = useState({
    estimatedGlobalProfit: 1232800000000, // ₹1,23,280 Crore
    estimatedGlobalLoss: 182100000000,   // ₹18,210 Crore
    companiesStartedToday: 18420,
    companiesClosedToday: 4120,
    shopsOpenedToday: 64900,
    shopsClosedToday: 18230,
    globalScore: 92.4,
    worldwideGrowth: 14.8,
    economicHealthIndex: 88.6,
    businessConfidenceIndex: 91.2,
  });

  // Simulated live market ticks
  useEffect(() => {
    if (!isSimulatingLive) return;

    const interval = setInterval(() => {
      setLiveStats(prev => {
        const profitTick = Math.floor(Math.random() * 15000000) + 5000000;
        const lossTick = Math.floor(Math.random() * 2500000) + 800000;
        const companyTick = Math.random() > 0.6 ? 1 : 0;
        const shopTick = Math.random() > 0.4 ? 2 : 0;

        return {
          ...prev,
          estimatedGlobalProfit: prev.estimatedGlobalProfit + profitTick,
          estimatedGlobalLoss: prev.estimatedGlobalLoss + lossTick,
          companiesStartedToday: prev.companiesStartedToday + companyTick,
          shopsOpenedToday: prev.shopsOpenedToday + shopTick,
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        selectedCompany,
        setSelectedCompany,
        selectedCategory,
        setSelectedCategory,
        selectedCountry,
        setSelectedCountry,
        filters,
        setFilters,
        resetFilters,
        isSearchModalOpen,
        setIsSearchModalOpen,
        notifications,
        markNotificationAsRead,
        isSimulatingLive,
        setIsSimulatingLive,
        liveStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
