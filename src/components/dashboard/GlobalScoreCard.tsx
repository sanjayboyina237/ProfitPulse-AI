import React from 'react';
import { ShieldCheck, TrendingUp, Cpu, Award, Zap, Activity } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalScoreCard: React.FC = () => {
  const { liveStats } = useApp();

  return (
    <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Score Gauge */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-space-800/80 border border-slate-800 text-center relative">
          <div className="w-28 h-28 rounded-full border-4 border-cyan-500/40 p-2 flex flex-col items-center justify-center shadow-glow-cyan">
            <span className="text-3xl font-extrabold text-neon-cyan font-mono">
              {liveStats.globalScore}
            </span>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">OUT OF 100</span>
          </div>
          <h3 className="text-sm font-extrabold text-white mt-4 tracking-wide uppercase">
            Global Business Score
          </h3>
          <span className="mt-1 text-[11px] text-neon-emerald font-mono flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse" /> Strong Growth Index
          </span>
        </div>

        {/* 3 Micro Metrics */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-space-800/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4 text-neon-cyan" />
              Worldwide Growth Rate
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">
              +{liveStats.worldwideGrowth}%
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Quarter-over-quarter expansion driven by tech exports & retail consumer spending.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-space-800/60 border border-slate-800/80 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-neon-purple" />
              Economic Health Index
            </div>
            <p className="text-3xl font-extrabold text-neon-purple font-mono">
              {liveStats.economicHealthIndex}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Composite sovereign credit stability, inflation cooling, and employment growth.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-space-800/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Award className="w-4 h-4 text-neon-emerald" />
              Business Confidence
            </div>
            <p className="text-3xl font-extrabold text-neon-emerald font-mono">
              {liveStats.businessConfidenceIndex}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              High optimism among SMB founders and Fortune 500 capital expenditure plans.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
