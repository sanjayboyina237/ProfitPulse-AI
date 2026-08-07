import React from 'react';
import { Cpu, Sparkles, CheckCircle2, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MarketSummary: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
        
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4 text-neon-cyan" />
              Autonomous AI Executive Briefing
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Global Economic & Business Health Summary
            </h2>
          </div>
          <button 
            onClick={() => setActiveView('ai-prediction')}
            className="px-5 py-2.5 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/40 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            View Complete AI Predictions
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-space-800/80 border border-slate-800 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neon-emerald flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strong Growth Catalysts
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">High Impact</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Global AI chip acceleration and enterprise 5G digitization are expanding operating margins in US, India, and UAE tech corridors by an estimated +18.4%.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-space-800/80 border border-slate-800 hover:border-rose-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neon-rose flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Headwind Risks
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 font-bold">Risk Factor</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Subprime auto loan delinquencies and European energy transition costs are creating localized retail margin pressures across traditional dealerships.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-space-800/80 border border-slate-800 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-neon-purple flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Macro Confidence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300">Score 91.2</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consumer demand for jewelry, smartphones, and healthcare remains highly resilient, supporting global business startup creation rates.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
