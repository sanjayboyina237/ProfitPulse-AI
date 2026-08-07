import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { PROFIT_REASONS_CATALOG, LOSS_REASONS_CATALOG } from '../../data/mockAIInsights';

export const AIExplanationPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profit' | 'loss'>('profit');

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4 text-neon-cyan" />
            AI Root Cause Reasoning Model
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Contextual AI Financial Driver Explanations
          </h3>
        </div>

        <div className="flex p-1 bg-space-800 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('profit')}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
              activeTab === 'profit' 
                ? 'bg-emerald-500/20 text-neon-emerald border border-emerald-500/40 shadow-glow-emerald/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" /> Profit Drivers ({PROFIT_REASONS_CATALOG.length})
          </button>
          <button
            onClick={() => setActiveTab('loss')}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
              activeTab === 'loss' 
                ? 'bg-rose-500/20 text-neon-rose border border-rose-500/40 shadow-glow-rose/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Loss Factors ({LOSS_REASONS_CATALOG.length})
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-300 mb-6">
        Whenever a business displays positive operating margins or losses, ProfitPulse AI classifies the primary underlying macroeconomic and operational triggers:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activeTab === 'profit' 
          ? PROFIT_REASONS_CATALOG.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-space-800/80 border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-neon-emerald flex items-center justify-center text-xs font-bold font-mono shrink-0">
                  #{idx + 1}
                </div>
                <span className="text-xs font-semibold text-slate-200">{item}</span>
              </div>
            ))
          : LOSS_REASONS_CATALOG.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-space-800/80 border border-rose-500/30 hover:border-rose-400 transition-all flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-neon-rose flex items-center justify-center text-xs font-bold font-mono shrink-0">
                  #{idx + 1}
                </div>
                <span className="text-xs font-semibold text-slate-200">{item}</span>
              </div>
            ))
        }
      </div>
    </div>
  );
};
