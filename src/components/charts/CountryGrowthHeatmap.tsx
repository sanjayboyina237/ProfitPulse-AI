import React from 'react';
import { COUNTRY_GROWTH_DATA } from '../../data/mockCharts';
import { Globe, TrendingUp, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_COUNTRIES } from '../../data/mockCountries';

export const CountryGrowthHeatmap: React.FC = () => {
  const { setSelectedCountry, setActiveView } = useApp();

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-neon-cyan" />
            Macroeconomic Heatmap
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Sovereign Economic & Entity Creation Leaderboard
          </h3>
        </div>

        <button
          onClick={() => setActiveView('globe')}
          className="text-xs font-bold text-neon-cyan hover:underline hidden sm:block"
        >
          View in 3D Spatial Globe →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_COUNTRIES.slice(0, 8).map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCountry(c)}
            className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 hover:border-cyan-500/40 glass-panel-hover cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-white text-sm">{c.name}</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-neon-cyan border border-cyan-500/30">
                {c.code}
              </span>
            </div>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">GDP Growth:</span>
                <span className="font-bold text-neon-emerald">+{c.gdpGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Health Index:</span>
                <span className="font-bold text-neon-cyan">{c.businessHealthScore}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Started Today:</span>
                <span className="font-bold text-slate-200">{c.companiesStartedToday}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
