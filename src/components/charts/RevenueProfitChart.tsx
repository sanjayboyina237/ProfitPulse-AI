import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTHLY_PROFIT_LOSS_DATA } from '../../data/mockCharts';
import { BarChart3, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RevenueProfitChart: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-neon-cyan" />
            Financial Stream Telemetry
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Global Profit vs Loss Performance (₹ Trillions)
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-neon-emerald">
            <span className="w-3 h-3 rounded-full bg-emerald-400" /> Est. Profit
          </span>
          <span className="flex items-center gap-1.5 text-neon-rose">
            <span className="w-3 h-3 rounded-full bg-rose-500" /> Est. Loss
          </span>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="absolute inset-0 bg-space-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center">
          <Lock className="w-10 h-10 text-amber-400 mb-3 animate-pulse" />
          <h4 className="text-lg font-bold text-white mb-1">Confidential P&L Chart Stream Locked</h4>
          <p className="text-xs text-slate-300 max-w-sm mb-4">Please sign in to inspect real-time monthly profit and loss telemetry.</p>
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 rounded-xl bg-neon-cyan text-space-900 font-extrabold text-xs uppercase tracking-wider shadow-glow-cyan"
          >
            Sign In to Unlock Chart
          </button>
        </div>
      )}

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_PROFIT_LOSS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00ff9d" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff2a6d" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff2a6d" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="profit" stroke="#00ff9d" strokeWidth={3} fillOpacity={1} fill="url(#profitGrad)" name="Est. Profit (₹ Trillion)" />
            <Area type="monotone" dataKey="loss" stroke="#ff2a6d" strokeWidth={3} fillOpacity={1} fill="url(#lossGrad)" name="Est. Loss (₹ Trillion)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
