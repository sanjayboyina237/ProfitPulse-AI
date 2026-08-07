import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Store, 
  Globe2, 
  PlusCircle, 
  MinusCircle,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const StatsGrid: React.FC = () => {
  const { liveStats } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const stats = [
    {
      title: "Today's Est. Global Profit",
      value: isAuthenticated ? `₹${(liveStats.estimatedGlobalProfit / 100000000000).toFixed(2)} Lakh Cr` : '🔒 Login Required',
      subtitle: 'Dynamic simulated revenue tick',
      icon: DollarSign,
      color: 'text-neon-emerald',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      badge: '+14.2% Net Margin',
      isProtected: true,
    },
    {
      title: "Today's Est. Global Loss",
      value: isAuthenticated ? `₹${(liveStats.estimatedGlobalLoss / 10000000000).toFixed(2)} Thousand Cr` : '🔒 Login Required',
      subtitle: 'Raw material & overhead costs',
      icon: TrendingDown,
      color: 'text-neon-rose',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
      badge: 'Hedging Active',
      isProtected: true,
    },
    {
      title: 'Companies Started Today',
      value: liveStats.companiesStartedToday.toLocaleString(),
      subtitle: 'Incorporation registry filings',
      icon: PlusCircle,
      color: 'text-neon-cyan',
      bgColor: 'bg-cyan-500/10 border-cyan-500/30',
      badge: 'New Entities',
      isProtected: false,
    },
    {
      title: 'Companies Closed Today',
      value: liveStats.companiesClosedToday.toLocaleString(),
      subtitle: 'Bankruptcy & liquidation files',
      icon: MinusCircle,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      badge: 'Normal Rate',
      isProtected: false,
    },
    {
      title: 'Shops Opened Today',
      value: liveStats.shopsOpenedToday.toLocaleString(),
      subtitle: 'Retail & storefront launches',
      icon: Store,
      color: 'text-neon-purple',
      bgColor: 'bg-purple-500/10 border-purple-500/30',
      badge: 'High Footfall',
      isProtected: false,
    },
    {
      title: 'Shops Closed Today',
      value: liveStats.shopsClosedToday.toLocaleString(),
      subtitle: 'Store lease consolidations',
      icon: Store,
      color: 'text-slate-400',
      bgColor: 'bg-slate-800/80 border-slate-700',
      badge: 'Consolidating',
      isProtected: false,
    },
    {
      title: 'Growing Sovereign Economies',
      value: '142 Countries',
      subtitle: 'Positive GDP quarterly trends',
      icon: Globe2,
      color: 'text-neon-emerald',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      badge: 'Dark/Light Green',
      isProtected: false,
    },
    {
      title: 'Declining Economies',
      value: '18 Countries',
      subtitle: 'Structural contraction risks',
      icon: Globe2,
      color: 'text-neon-rose',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
      badge: 'Red Warning',
      isProtected: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            onClick={() => item.isProtected && !isAuthenticated && openAuthModal('login')}
            className={`glass-panel p-6 rounded-2xl border border-slate-800 hover:border-slate-600 glass-panel-hover transition-all relative overflow-hidden ${
              item.isProtected && !isAuthenticated ? 'cursor-pointer hover:border-amber-500/40' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl border ${item.bgColor} ${item.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-space-800 border border-slate-700 text-slate-300">
                {item.badge}
              </span>
            </div>
            
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {item.title}
            </h4>

            {item.isProtected && !isAuthenticated ? (
              <div className="flex items-center gap-2 mt-2 text-amber-400 font-mono font-bold text-sm">
                <Lock className="w-4 h-4 animate-pulse" /> Login to Reveal P&L
              </div>
            ) : (
              <p className={`text-2xl font-extrabold font-mono mt-1 ${item.color}`}>
                {item.value}
              </p>
            )}

            <p className="text-[11px] text-slate-400 mt-2">
              {item.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};
