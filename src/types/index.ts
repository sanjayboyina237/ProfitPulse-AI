export type ViewType = 
  | 'landing' 
  | 'dashboard' 
  | 'companies' 
  | 'categories' 
  | 'globe' 
  | 'ai-prediction' 
  | 'charts' 
  | 'profile' 
  | 'admin';

export interface Company {
  id: string;
  name: string;
  logo: string;
  country: string;
  countryCode: string;
  industry: string;
  estimatedRevenue: string; // e.g. "$383.3B"
  revenueValue: number; // e.g. 383300000000 for sorting
  estimatedProfit: string;
  profitValue: number;
  estimatedLoss: string;
  lossValue: number;
  marketCap: string;
  marketCapValue: number;
  employees: string;
  yearsInBusiness: number;
  growthRate: number; // percentage e.g. +14.2%
  stockSymbol?: string;
  stockTrend?: number[]; // array of 7 points for mini sparkline
  healthScore: number; // 0-100
  riskScore: number; // 0-100 (lower is better or higher is risky)
  aiRecommendation: 'STRONG BUY' | 'BUY' | 'HOLD' | 'HIGH RISK' | 'RESTRUCTURE';
  profitReasons: string[];
  lossReasons: string[];
  summary: string;
  isVerified: boolean;
}

export interface ShopCategory {
  id: string;
  name: string;
  icon: string;
  estimatedDailyRevenue: string;
  estimatedDailyRevenueValue: number;
  estimatedProfitMargin: number; // e.g. 24.5%
  estimatedProfit: string;
  estimatedLoss: string;
  growthRate: number;
  demandIndex: number; // 0-100
  businessHealthScore: number;
  aiAnalysis: string;
  reasonsForGrowth: string[];
  reasonsForDecline: string[];
}

export interface CountryData {
  id: string;
  name: string;
  code: string; // e.g. "USA", "IND", "DEU"
  lat: number;
  lng: number;
  businessHealthScore: number; // 0-100
  gdpGrowth: number; // %
  companiesStartedToday: number;
  companiesClosedToday: number;
  shopsOpenedToday: number;
  shopsClosedToday: number;
  highestGrowthIndustry: string;
  highestLossIndustry: string;
  topCompanies: string[];
  investmentScore: number; // 0-100
  innovationScore: number; // 0-100
  employmentGrowth: number; // %
  economicStability: 'HIGH' | 'MODERATE' | 'VOLATILE' | 'CRITICAL';
  statusColor: 'Dark Green' | 'Light Green' | 'Yellow' | 'Orange' | 'Red';
  aiPrediction: string;
}

export interface AIInsight {
  id: string;
  type: 'GROWTH' | 'RISK' | 'INDUSTRY' | 'COUNTRY' | 'TREND' | 'EMPLOYMENT';
  title: string;
  description: string;
  impactScore: number; // 0-100
  recommendedAction: string;
  confidence: number; // %
  relatedSectors: string[];
}

export interface FilterState {
  searchQuery: string;
  country: string;
  industry: string;
  minRevenue: number;
  maxRiskScore: number;
  sortBy: 'revenue' | 'profit' | 'growth' | 'health' | 'risk' | 'marketCap';
  sortOrder: 'asc' | 'desc';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'news' | 'ai' | 'market';
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Enterprise Pro' | 'Administrator' | 'Analyst';
  watchlist: string[]; // company IDs
  favoriteCountries: string[]; // country codes
  twoFactorEnabled: boolean;
  theme: 'dark' | 'neon';
  language: string;
}
