import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { INDUSTRY_COMPARISON_DATA } from '../../data/mockCharts';
import { Building2 } from 'lucide-react';

export const IndustryComparisonChart: React.FC = () => {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold text-neon-purple uppercase tracking-wider mb-1">
        <Building2 className="w-4 h-4 text-neon-purple" />
        Cross-Industry Yield Comparison
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6">
        Est. Industry Revenue & Net Margin Comparison (₹ Trillion)
      </h3>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={INDUSTRY_COMPARISON_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="revenue" fill="#7000ff" radius={[6, 6, 0, 0]} name="Total Revenue (₹ Trillion)" />
            <Bar dataKey="profit" fill="#00f0ff" radius={[6, 6, 0, 0]} name="Net Profit (₹ Trillion)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
