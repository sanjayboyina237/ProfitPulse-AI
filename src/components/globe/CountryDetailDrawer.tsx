import React from 'react';
import { X, Globe2, Building2, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CountryDetailDrawer: React.FC = () => {
  const { selectedCountry, setSelectedCountry } = useApp();

  if (!selectedCountry) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-space-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl h-full glass-panel border-l border-slate-700/80 p-6 sm:p-8 overflow-y-auto shadow-2xl relative animate-in slide-in-from-right duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedCountry(null)}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-neon-cyan">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{selectedCountry.name}</h2>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/10 text-neon-cyan border border-cyan-500/30">
                {selectedCountry.code}
              </span>
            </div>
            <p className="text-xs text-slate-400">Sovereign Business Intelligence Profile</p>
          </div>
        </div>

        {/* Status Score & Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Health Score</span>
            <span className="text-2xl font-extrabold text-neon-cyan font-mono">{selectedCountry.businessHealthScore}/100</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">GDP Growth</span>
            <span className="text-2xl font-extrabold text-neon-emerald font-mono">+{selectedCountry.gdpGrowth}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Investment Score</span>
            <span className="text-2xl font-extrabold text-neon-purple font-mono">{selectedCountry.investmentScore}</span>
          </div>

          <div className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Innovation Score</span>
            <span className="text-2xl font-extrabold text-amber-400 font-mono">{selectedCountry.innovationScore}</span>
          </div>
        </div>

        {/* AI Sovereign Prediction Box */}
        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-neon-purple" />
            AI Sovereign Outlook
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {selectedCountry.aiPrediction}
          </p>
        </div>

        {/* Daily Stats Grid */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-neon-cyan" /> Today's Entity Movements
        </h4>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-space-800/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Companies Started</span>
            <span className="text-xl font-bold text-neon-emerald font-mono">+{selectedCountry.companiesStartedToday}</span>
          </div>
          <div className="p-4 rounded-xl bg-space-800/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Companies Closed</span>
            <span className="text-xl font-bold text-neon-rose font-mono">-{selectedCountry.companiesClosedToday}</span>
          </div>
          <div className="p-4 rounded-xl bg-space-800/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Shops Opened</span>
            <span className="text-xl font-bold text-neon-purple font-mono">+{selectedCountry.shopsOpenedToday}</span>
          </div>
          <div className="p-4 rounded-xl bg-space-800/60 border border-slate-800">
            <span className="text-xs text-slate-400 block">Shops Closed</span>
            <span className="text-xl font-bold text-amber-400 font-mono">-{selectedCountry.shopsClosedToday}</span>
          </div>
        </div>

        {/* Sector Drivers */}
        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[11px] font-bold text-neon-emerald uppercase tracking-wider block mb-1">
              Top Growth Sector
            </span>
            <p className="text-sm font-bold text-white">{selectedCountry.highestGrowthIndustry}</p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <span className="text-[11px] font-bold text-neon-rose uppercase tracking-wider block mb-1">
              Highest Risk/Loss Sector
            </span>
            <p className="text-sm font-bold text-white">{selectedCountry.highestLossIndustry}</p>
          </div>
        </div>

        {/* Top Flagship Companies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Flagship Domestic Enterprises
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCountry.topCompanies.map((c, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-space-800 border border-slate-700 text-xs font-medium text-slate-200">
                {c}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
