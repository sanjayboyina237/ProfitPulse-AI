import React from 'react';
import { Sparkles, Globe, ArrowRight, ShieldCheck, TrendingUp, Cpu, Zap, Activity, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export const HeroSection: React.FC = () => {
  const { setActiveView, liveStats } = useApp();
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <div className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 via-purple-600/20 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-neon-cyan text-xs font-semibold shadow-glow-cyan/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Next-Gen Autonomous BI & 3D Spatial Intelligence</span>
          </div>
        </div>

        {/* Hero Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Global Business Intelligence Powered by <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">
              Autonomous AI Models
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Analyze 20+ top global corporations, 20+ retail shop sectors, estimated daily P&L streams, and macroeconomic health indexes across an interactive 3D spatial globe.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => setActiveView('globe')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-space-900 font-extrabold text-sm uppercase tracking-wider shadow-glow-cyan flex items-center justify-center gap-3 transition-all hover:scale-105"
              >
                <Globe className="w-5 h-5" />
                Launch 3D World Globe
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-400 text-space-900 font-extrabold text-sm uppercase tracking-wider shadow-glow-cyan flex items-center justify-center gap-3 transition-all hover:scale-105"
              >
                <Lock className="w-5 h-5" />
                Sign In to Unlock P&L Intelligence
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => isAuthenticated ? setActiveView('dashboard') : openAuthModal('login')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-slate-800/80 text-white font-extrabold text-sm uppercase tracking-wider border border-slate-700 hover:border-cyan-500/50 flex items-center justify-center gap-3 transition-all"
            >
              <TrendingUp className="w-5 h-5 text-neon-cyan" />
              Open BI Dashboard
            </button>
          </div>
        </div>

        {/* Floating Stat Counters Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <Zap className="w-4 h-4 text-neon-cyan" />
              Est. Today's Global Profit
            </div>
            {isAuthenticated ? (
              <p className="text-2xl font-extrabold text-neon-emerald font-mono tracking-tight">
                ₹{(liveStats.estimatedGlobalProfit / 100000000000).toFixed(2)} Lakh Cr
              </p>
            ) : (
              <button onClick={() => openAuthModal('login')} className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold hover:underline py-1">
                <Lock className="w-3.5 h-3.5" /> Login to View
              </button>
            )}
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <Activity className="w-3 h-3 animate-pulse" /> Live Dynamic Simulation
            </span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-rose-500/30 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <Zap className="w-4 h-4 text-rose-400" />
              Est. Today's Global Loss
            </div>
            {isAuthenticated ? (
              <p className="text-2xl font-extrabold text-neon-rose font-mono tracking-tight">
                ₹{(liveStats.estimatedGlobalLoss / 10000000000).toFixed(2)} Thousand Cr
              </p>
            ) : (
              <button onClick={() => openAuthModal('login')} className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold hover:underline py-1">
                <Lock className="w-3.5 h-3.5" /> Login to View
              </button>
            )}
            <span className="text-[10px] text-slate-400 mt-1 font-mono">Macroeconomic Hedging</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <Cpu className="w-4 h-4 text-purple-400" />
              Companies Created Today
            </div>
            <p className="text-2xl font-extrabold text-neon-purple font-mono tracking-tight">
              {liveStats.companiesStartedToday.toLocaleString()}
            </p>
            <span className="text-[10px] text-purple-400 mt-1 font-mono">+12.4% vs Yesterday</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-mono mb-1">
              <ShieldCheck className="w-4 h-4 text-neon-cyan" />
              Economic Health Score
            </div>
            <p className="text-2xl font-extrabold text-neon-cyan font-mono tracking-tight">
              {liveStats.economicHealthIndex}/100
            </p>
            <span className="text-[10px] text-cyan-400 mt-1 font-mono">Strong Growth Index</span>
          </div>

        </div>

      </div>
    </div>
  );
};
