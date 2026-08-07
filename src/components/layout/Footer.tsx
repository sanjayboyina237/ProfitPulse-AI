import React from 'react';
import { Zap, ShieldCheck, Cpu, Globe, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-space-900/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-neon-cyan" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                ProfitPulse <span className="text-neon-cyan text-xs">AI</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Billion-dollar startup grade global business intelligence platform. Autonomous market modeling, real-time macroeconomic indicators, and interactive 3D spatial analytics.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-neon-emerald font-mono text-[10px]">
                System Online: 99.99% SLA
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Platform Modules</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => setActiveView('dashboard')} className="hover:text-neon-cyan transition-colors">Global Business Dashboard</button></li>
              <li><button onClick={() => setActiveView('companies')} className="hover:text-neon-cyan transition-colors">20+ Top Global Corporations</button></li>
              <li><button onClick={() => setActiveView('categories')} className="hover:text-neon-cyan transition-colors">20+ Retail Shop Sectors</button></li>
              <li><button onClick={() => setActiveView('globe')} className="hover:text-neon-cyan transition-colors">Interactive 3D World Globe</button></li>
              <li><button onClick={() => setActiveView('ai-prediction')} className="hover:text-neon-cyan transition-colors">AI Predictive Engine</button></li>
            </ul>
          </div>

          {/* Col 3: Data & Compliance */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Enterprise Governance</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SEC & Public Financial Filings</li>
              <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /> Gemini & OpenAI Market Models</li>
              <li className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-cyan-400" /> 190+ Sovereign Economic Data</li>
              <li className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-rose-400" /> SOC2 Type II Certified Pipeline</li>
            </ul>
          </div>

          {/* Col 4: Newsletter / API */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-4">Stay Ahead of Markets</h4>
            <p className="text-slate-400 mb-3">Get daily AI-generated macroeconomic briefs straight to your inbox.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="enterprise@domain.com" 
                className="glass-input px-3 py-2 rounded-xl text-xs flex-1" 
              />
              <button className="px-3.5 py-2 rounded-xl bg-neon-cyan text-space-900 font-bold hover:bg-cyan-300 transition-all">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-400 text-center sm:text-left">
            © 2026 ProfitPulse Global AI Technologies Inc. All public ticker data is ingested from live APIs. Private sector and shop metrics are estimated via proprietary ML models.
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px]">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
