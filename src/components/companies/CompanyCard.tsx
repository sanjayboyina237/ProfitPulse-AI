import React from 'react';
import type { Company } from '../../types';
import { Bookmark, BookmarkCheck, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
  const { user, isAuthenticated, toggleWatchlist, openAuthModal } = useAuth();
  const { setSelectedCompany } = useApp();

  const isBookmarked = user?.watchlist.includes(company.id);

  const getRecommendationBadge = (rec: Company['aiRecommendation']) => {
    switch (rec) {
      case 'STRONG BUY': return 'bg-emerald-500/20 text-neon-emerald border-emerald-500/40';
      case 'BUY': return 'bg-cyan-500/20 text-neon-cyan border-cyan-500/40';
      case 'HOLD': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'HIGH RISK': return 'bg-rose-500/20 text-neon-rose border-rose-500/40';
      default: return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  const handleClick = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
    } else {
      setSelectedCompany(company);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 glass-panel-hover cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={company.logo} 
              alt={company.name} 
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-700/80 group-hover:ring-cyan-500/50 transition-all"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base text-white group-hover:text-neon-cyan transition-colors">
                  {company.name}
                </h3>
                {company.stockSymbol && (
                  <span className="text-[10px] font-mono text-slate-400">({company.stockSymbol})</span>
                )}
              </div>
              <p className="text-xs text-slate-400">{company.country} • {company.industry}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(company.id);
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5 text-neon-cyan fill-cyan-500/20" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* AI Rec Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${getRecommendationBadge(company.aiRecommendation)}`}>
            AI Rec: {company.aiRecommendation}
          </span>
          <span className="text-xs font-mono text-slate-400">
            Health: <span className="font-bold text-neon-cyan">{company.healthScore}/100</span>
          </span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-space-800/80 border border-slate-800 text-xs font-mono mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Est. Revenue</span>
            <span className="font-bold text-slate-100">{company.estimatedRevenue}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Est. Profit</span>
            {isAuthenticated ? (
              <span className="font-bold text-neon-emerald">{company.estimatedProfit}</span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Market Cap</span>
            <span className="font-bold text-slate-200">{company.marketCap}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Growth %</span>
            <span className={company.growthRate >= 0 ? 'font-bold text-neon-emerald' : 'font-bold text-neon-rose'}>
              {company.growthRate >= 0 ? `+${company.growthRate}%` : `${company.growthRate}%`}
            </span>
          </div>
        </div>

        {/* Primary Profit Driver snippet */}
        <div className="text-xs text-slate-300 space-y-1">
          <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Key Growth Reason:
          </p>
          <p className="text-[11px] text-slate-300 italic line-clamp-1">
            "{company.profitReasons[0]}"
          </p>
        </div>
      </div>

      {/* Footer Details */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>{company.employees} Employees</span>
        <span>{company.yearsInBusiness} Yrs in Business</span>
      </div>

    </div>
  );
};
