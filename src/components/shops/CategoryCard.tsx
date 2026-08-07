import React from 'react';
import type { ShopCategory } from '../../types';
import { Store, CheckCircle2, ArrowUpRight, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const CategoryCard: React.FC<{ category: ShopCategory }> = ({ category }) => {
  const { setSelectedCategory } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) {
      openAuthModal('login');
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/40 glass-panel-hover cursor-pointer group flex flex-col justify-between"
    >
      <div>
        {/* Top Icon & Demand */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-neon-purple group-hover:scale-110 transition-transform">
            <Store className="w-6 h-6" />
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block uppercase">Demand Index</span>
            <span className="text-xs font-extrabold text-neon-emerald px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              {category.demandIndex}% High Demand
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base text-white group-hover:text-neon-purple transition-colors mb-1">
          {category.name}
        </h3>
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {category.aiAnalysis}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-space-800/80 border border-slate-800 text-xs font-mono mb-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Daily Revenue</span>
            <span className="font-bold text-slate-100">{category.estimatedDailyRevenue}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Profit Margin</span>
            <span className="font-bold text-neon-emerald">+{category.estimatedProfitMargin}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Est. Daily Profit</span>
            {isAuthenticated ? (
              <span className="font-bold text-neon-emerald">{category.estimatedProfit}</span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block">Growth YoY</span>
            <span className="font-bold text-neon-purple">+{category.growthRate}%</span>
          </div>
        </div>
      </div>

      {/* Footer Growth Reason */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" /> {category.reasonsForGrowth[0]}
        </span>
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-neon-purple transition-colors" />
      </div>

    </div>
  );
};
