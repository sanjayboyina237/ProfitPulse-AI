import React from 'react';
import { Building2, Store, TrendingUp, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { MOCK_COMPANIES } from '../../data/mockCompanies';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { useApp } from '../../context/AppContext';

export const TrendingSection: React.FC = () => {
  const { setActiveView, setSelectedCompany, setSelectedCategory } = useApp();

  const trendingCompanies = MOCK_COMPANIES.slice(0, 4);
  const trendingCategories = MOCK_CATEGORIES.slice(0, 4);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Trending Companies */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-neon-cyan" />
              Market Movers
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Trending Global Enterprises
            </h2>
          </div>
          <button
            onClick={() => setActiveView('companies')}
            className="flex items-center gap-2 text-xs font-bold text-neon-cyan hover:underline"
          >
            View All 20+ Companies <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCompanies.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCompany(c);
                setActiveView('companies');
              }}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 glass-panel-hover cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-700" />
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-neon-cyan border border-cyan-500/30">
                  {c.countryCode}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neon-cyan transition-colors">{c.name}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{c.industry}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Est. Revenue</span>
                  <span className="font-bold text-slate-200">{c.estimatedRevenue}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Profit</span>
                  <span className="font-bold text-neon-emerald">{c.estimatedProfit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Shop Categories */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neon-purple uppercase tracking-wider mb-1">
              <Store className="w-4 h-4 text-neon-purple" />
              Retail & Sector Analytics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              High-Demand Shop Sectors
            </h2>
          </div>
          <button
            onClick={() => setActiveView('categories')}
            className="flex items-center gap-2 text-xs font-bold text-neon-purple hover:underline"
          >
            Explore 20+ Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveView('categories');
              }}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 glass-panel-hover cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-neon-purple">
                  <Store className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-neon-emerald">
                  Demand {cat.demandIndex}%
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neon-purple transition-colors">{cat.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{cat.aiAnalysis}</p>
              
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Daily Rev</span>
                  <span className="font-bold text-slate-200">{cat.estimatedDailyRevenue}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase block">Margin</span>
                  <span className="font-bold text-neon-emerald">+{cat.estimatedProfitMargin}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
