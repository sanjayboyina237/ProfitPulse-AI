import React from 'react';
import { TrendingUp, TrendingDown, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const LiveTicker: React.FC = () => {
  const { liveStats } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const profitDisplay = isAuthenticated 
    ? `₹${(liveStats.estimatedGlobalProfit / 100000000000).toFixed(2)} Lakh Cr` 
    : '🔒 LOGIN TO REVEAL';

  const lossDisplay = isAuthenticated 
    ? `₹${(liveStats.estimatedGlobalLoss / 10000000000).toFixed(2)} Thousand Cr` 
    : '🔒 LOGIN TO REVEAL';

  const tickerItems = [
    { label: 'GLOBAL PROFIT ESTIMATE', value: profitDisplay, isUp: true },
    { label: 'NVIDIA (NVDA)', value: '₹10.4 Trillion Revenue', isUp: true },
    { label: 'APPLE (AAPL)', value: '₹8.05 Trillion Profit', isUp: true },
    { label: 'RELIANCE (RELIANCE)', value: '₹3,080 (+2.1%)', isUp: true },
    { label: 'GLOBAL LOSS ESTIMATE', value: lossDisplay, isUp: false },
    { label: 'INTEL (INTC)', value: '₹680 Billion Loss Risk', isUp: false },
    { label: 'SHOPS OPENED TODAY', value: `${liveStats.shopsOpenedToday.toLocaleString()}`, isUp: true },
    { label: 'TCS (TCS)', value: '₹4,280 (+1.4%)', isUp: true },
    { label: 'BUSINESS CONFIDENCE', value: `${liveStats.businessConfidenceIndex} pts`, isUp: true },
  ];

  return (
    <div className="w-full bg-space-800/90 border-y border-slate-800/80 py-3 overflow-hidden">
      <div className="flex items-center gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {tickerItems.concat(tickerItems).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 font-bold uppercase">{item.label}:</span>
            <span 
              onClick={() => !isAuthenticated && openAuthModal('login')}
              className={`${item.isUp ? 'text-neon-emerald font-bold' : 'text-neon-rose font-bold'} ${!isAuthenticated && item.label.includes('ESTIMATE') ? 'cursor-pointer hover:underline' : ''}`}
            >
              {item.value}
            </span>
            {item.isUp ? (
              <TrendingUp className="w-3.5 h-3.5 text-neon-emerald" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-neon-rose" />
            )}
            <span className="text-slate-700 ml-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};
