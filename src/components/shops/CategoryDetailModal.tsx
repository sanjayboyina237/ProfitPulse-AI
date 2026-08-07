import React from 'react';
import { X, Store, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryDetailModal: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  if (!selectedCategory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-800">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-neon-purple">
            <Store className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">{selectedCategory.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Retail Sector & Local Business Intelligence
            </p>
          </div>
        </div>

        {/* Key Daily Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Daily Est. Revenue</span>
            <span className="text-base font-bold text-slate-100">{selectedCategory.estimatedDailyRevenue}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Profit Margin</span>
            <span className="text-base font-bold text-neon-emerald">+{selectedCategory.estimatedProfitMargin}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Daily Est. Profit</span>
            <span className="text-base font-bold text-neon-emerald">{selectedCategory.estimatedProfit}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Daily Est. Loss</span>
            <span className="text-base font-bold text-neon-rose">{selectedCategory.estimatedLoss}</span>
          </div>
        </div>

        {/* AI Sector Outlook */}
        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-neon-purple" />
            AI Retail Sector Intelligence
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            {selectedCategory.aiAnalysis}
          </p>
        </div>

        {/* Growth vs Decline Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <h4 className="text-xs font-bold text-neon-emerald uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-neon-emerald" /> Growth Drivers & Tailwinds
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {selectedCategory.reasonsForGrowth.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-emerald mt-1.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30">
            <h4 className="text-xs font-bold text-neon-rose uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-neon-rose" /> Risks & Causes for Margin Decline
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              {selectedCategory.reasonsForDecline.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-rose mt-1.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
