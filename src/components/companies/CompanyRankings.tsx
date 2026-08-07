import React, { useState } from 'react';
import { MOCK_COMPANIES } from '../../data/mockCompanies';
import { Trophy } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompanyRankings: React.FC = () => {
  const [tab, setTab] = useState<'profitable' | 'growing' | 'risk' | 'recommended'>('profitable');
  const { setSelectedCompany } = useApp();

  const getSortedData = () => {
    switch (tab) {
      case 'profitable':
        return [...MOCK_COMPANIES].sort((a, b) => b.profitValue - a.profitValue).slice(0, 10);
      case 'growing':
        return [...MOCK_COMPANIES].sort((a, b) => b.growthRate - a.growthRate).slice(0, 10);
      case 'risk':
        return [...MOCK_COMPANIES].sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
      case 'recommended':
        return [...MOCK_COMPANIES].filter(c => c.aiRecommendation === 'STRONG BUY' || c.aiRecommendation === 'BUY').slice(0, 10);
    }
  };

  const sortedList = getSortedData();

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4 text-neon-cyan" />
            Sovereign Rankings
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Top Global Enterprise Leaderboards
          </h3>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 p-1 bg-space-800 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setTab('profitable')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'profitable' ? 'bg-cyan-500/20 text-neon-cyan border border-cyan-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Top Profitable
          </button>
          <button
            onClick={() => setTab('growing')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'growing' ? 'bg-emerald-500/20 text-neon-emerald border border-emerald-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fastest Growing
          </button>
          <button
            onClick={() => setTab('risk')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'risk' ? 'bg-rose-500/20 text-neon-rose border border-rose-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Highest Risk
          </button>
          <button
            onClick={() => setTab('recommended')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              tab === 'recommended' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Recommended
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Country</th>
              <th className="py-3 px-4">Est. Revenue</th>
              <th className="py-3 px-4">Est. Profit</th>
              <th className="py-3 px-4">Growth %</th>
              <th className="py-3 px-4">AI Rec</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedList.map((c, index) => (
              <tr
                key={c.id}
                onClick={() => setSelectedCompany(c)}
                className="hover:bg-space-800/80 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-bold text-neon-cyan">#{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-7 h-7 rounded-lg object-cover" />
                  <span className="font-bold text-white font-sans">{c.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-300">{c.countryCode}</td>
                <td className="py-3 px-4 text-slate-200">{c.estimatedRevenue}</td>
                <td className="py-3 px-4 font-bold text-neon-emerald">{c.estimatedProfit}</td>
                <td className={c.growthRate >= 0 ? 'py-3 px-4 text-neon-emerald' : 'py-3 px-4 text-neon-rose'}>
                  {c.growthRate >= 0 ? `+${c.growthRate}%` : `${c.growthRate}%`}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    {c.aiRecommendation}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
