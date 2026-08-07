import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const CompanyDetailModal: React.FC = () => {
  const { selectedCompany, setSelectedCompany } = useApp();
  const { toggleWatchlist, user } = useAuth();

  if (!selectedCompany) return null;

  const isBookmarked = user?.watchlist.includes(selectedCompany.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedCompany(null)}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <img 
              src={selectedCompany.logo} 
              alt={selectedCompany.name} 
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-cyan-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{selectedCompany.name}</h2>
                {selectedCompany.stockSymbol && (
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-neon-cyan font-mono text-xs border border-cyan-500/30">
                    {selectedCompany.stockSymbol}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedCompany.country} • {selectedCompany.industry} • Founded {2026 - selectedCompany.yearsInBusiness}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleWatchlist(selectedCompany.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all ${
              isBookmarked 
                ? 'bg-cyan-500/20 text-neon-cyan border-cyan-500/40'
                : 'bg-space-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {isBookmarked ? 'Saved in Watchlist' : '+ Add to Watchlist'}
          </button>
        </div>

        {/* Financial Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Est. Annual Revenue</span>
            <span className="text-lg font-bold text-slate-100 font-mono">{selectedCompany.estimatedRevenue}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Est. Annual Profit</span>
            <span className="text-lg font-bold text-neon-emerald font-mono">{selectedCompany.estimatedProfit}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Est. Annual Loss</span>
            <span className="text-lg font-bold text-neon-rose font-mono">{selectedCompany.estimatedLoss}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Market Cap</span>
            <span className="text-lg font-bold text-slate-200 font-mono">{selectedCompany.marketCap}</span>
          </div>
        </div>

        {/* AI Analysis Summary */}
        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-purple" />
              Autonomous AI Executive Recommendation
            </span>
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-mono font-bold">
              {selectedCompany.aiRecommendation}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {selectedCompany.summary}
          </p>
        </div>

        {/* Profit vs Loss Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          
          {/* Profit Drivers */}
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <h4 className="text-xs font-bold text-neon-emerald uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-neon-emerald" /> Primary Drivers of Profit
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {selectedCompany.profitReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald mt-1.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Loss Risks */}
          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30">
            <h4 className="text-xs font-bold text-neon-rose uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-rose" /> Key Causes of Loss & Headwinds
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {selectedCompany.lossReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-rose mt-1.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Scores & Sparkline */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-space-800 border border-slate-800">
            <span className="text-slate-400 block">Business Health Score</span>
            <span className="text-xl font-bold text-neon-cyan">{selectedCompany.healthScore}/100</span>
          </div>

          <div className="p-3.5 rounded-xl bg-space-800 border border-slate-800">
            <span className="text-slate-400 block">Risk Exposure Score</span>
            <span className="text-xl font-bold text-amber-400">{selectedCompany.riskScore}/100</span>
          </div>

          <div className="p-3.5 rounded-xl bg-space-800 border border-slate-800">
            <span className="text-slate-400 block">Global Workforce</span>
            <span className="text-xl font-bold text-slate-200">{selectedCompany.employees}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
