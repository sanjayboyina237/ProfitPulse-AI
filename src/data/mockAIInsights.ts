import type { AIInsight } from '../types';

export const MOCK_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ai-1',
    type: 'GROWTH',
    title: 'Generative AI Infrastructure Supercycle',
    description: 'Companies providing high-density data center GPUs, cooling tech, and cloud computing will see an estimated +38.5% YoY net revenue surge.',
    impactScore: 95,
    recommendedAction: 'Overweight allocations in semiconductor supply chain and energy grid hardware.',
    confidence: 94,
    relatedSectors: ['Semiconductors', 'Cloud Computing', 'Power Utilities'],
  },
  {
    id: 'ai-2',
    type: 'RISK',
    title: 'High Interest Rate Auto Loan Delinquency Spike',
    description: 'Automobile dealerships relying on subprime auto loans face a projected 14.2% increase in defaults over the next two quarters.',
    impactScore: 78,
    recommendedAction: 'Shift inventory towards compact hybrid vehicles and strict credit verification.',
    confidence: 88,
    relatedSectors: ['Car Dealerships', 'Consumer Finance'],
  },
  {
    id: 'ai-3',
    type: 'INDUSTRY',
    title: 'Quick-Commerce Disrupting Kirana Outlets',
    description: '10-minute instant delivery apps in urban metro hubs are reducing traditional neighborhood grocery footfalls by up to 21%.',
    impactScore: 84,
    recommendedAction: 'Integrate hyperlocal digital payment APIs and partner with hyper-fast fulfillment networks.',
    confidence: 91,
    relatedSectors: ['Kirana Stores', 'Supermarkets', 'Logistics'],
  },
  {
    id: 'ai-4',
    type: 'COUNTRY',
    title: 'India & UAE Capital Inflow Convergence',
    description: 'Bilateral trade agreements and zero-tariff corridors are boosting cross-border logistics and startup venture funding by 29.4%.',
    impactScore: 89,
    recommendedAction: 'Establish dual-headquarter tax structures in Dubai & Mumbai tech corridors.',
    confidence: 93,
    relatedSectors: ['E-Commerce', 'FinTech', 'Real Estate'],
  },
  {
    id: 'ai-5',
    type: 'EMPLOYMENT',
    title: 'AI Workforce Reskilling Premium',
    description: 'Enterprises implementing active AI copilot retraining report 2.4x higher employee retention and a 19% boost in operational profit margins.',
    impactScore: 92,
    recommendedAction: 'Allocate 5% of quarterly HR budgets to mandatory GenAI prompt engineering courses.',
    confidence: 96,
    relatedSectors: ['IT Services', 'Enterprise Software', 'Consulting'],
  }
];

export const PROFIT_REASONS_CATALOG = [
  'High customer demand',
  'Successful advertising campaign',
  'Festival season buying surge',
  'New product launch adoption',
  'Excellent customer reviews & NPS',
  'Strong export expansion',
  'Government subsidies & incentives',
  'Higher online direct-to-consumer sales',
  'Improved supply chain logistics efficiency',
  'International market expansion',
  'High-margin product mix pivot',
  'Automated self-service kiosk adoption'
];

export const LOSS_REASONS_CATALOG = [
  'Inflation in raw material costs',
  'High price competition from online platforms',
  'Poor marketing alignment',
  'Supply chain freight disruptions',
  'Low consumer discretionary spending',
  'Strict government regulatory compliance fines',
  'High commercial property rental overhead',
  'Skilled labor shortage',
  'Import tariff restrictions',
  'Macroeconomic slowdown & credit crunch',
  'High customer acquisition costs (CAC)',
  'Currency exchange rate depreciation'
];
