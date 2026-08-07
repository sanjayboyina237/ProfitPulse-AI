import React, { useState } from 'react';
import { ShieldCheck, Users, Building2, Store, FileText } from 'lucide-react';
import { MOCK_COMPANIES } from '../../data/mockCompanies';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import confetti from 'canvas-confetti';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'categories' | 'users' | 'reports'>('companies');
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setReportGenerated(true);
    confetti({ particleCount: 50, spread: 60 });
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-neon-cyan" />
            Superadmin Governance Console
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Enterprise BI Platform Control Panel
          </h2>
        </div>

        <button
          onClick={handleGenerateReport}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-space-900 font-extrabold text-xs uppercase tracking-wider shadow-glow-cyan flex items-center gap-2 transition-all"
        >
          <FileText className="w-4 h-4" />
          {reportGenerated ? 'Report Compiled!' : 'Generate Executive Report'}
        </button>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-space-800 rounded-2xl border border-slate-800 text-xs font-bold">
        <button
          onClick={() => setActiveTab('companies')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'companies' ? 'bg-cyan-500/20 text-neon-cyan border border-cyan-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" /> Manage Companies ({MOCK_COMPANIES.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'categories' ? 'bg-purple-500/20 text-neon-purple border border-purple-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" /> Manage Shop Categories ({MOCK_CATEGORIES.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${
            activeTab === 'users' ? 'bg-emerald-500/20 text-neon-emerald border border-emerald-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Manage Enterprise Users
        </button>
      </div>

      {/* Content Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl overflow-x-auto">
        {activeTab === 'companies' && (
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Est. Revenue</th>
                <th className="py-3 px-4">Est. Profit</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_COMPANIES.slice(0, 8).map((c) => (
                <tr key={c.id} className="hover:bg-space-800/60">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <img src={c.logo} alt={c.name} className="w-6 h-6 rounded-md object-cover" />
                    {c.name}
                  </td>
                  <td className="py-3 px-4 text-slate-300">{c.countryCode}</td>
                  <td className="py-3 px-4 text-slate-200">{c.estimatedRevenue}</td>
                  <td className="py-3 px-4 font-bold text-neon-emerald">{c.estimatedProfit}</td>
                  <td className="py-3 px-4 text-amber-400">{c.riskScore}/100</td>
                  <td className="py-3 px-4 text-neon-cyan font-bold">VERIFIED API</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'categories' && (
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Daily Rev</th>
                <th className="py-3 px-4">Profit Margin</th>
                <th className="py-3 px-4">Demand Index</th>
                <th className="py-3 px-4">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_CATEGORIES.slice(0, 8).map((cat) => (
                <tr key={cat.id} className="hover:bg-space-800/60">
                  <td className="py-3 px-4 font-bold text-white">{cat.name}</td>
                  <td className="py-3 px-4 text-slate-200">{cat.estimatedDailyRevenue}</td>
                  <td className="py-3 px-4 font-bold text-neon-emerald">+{cat.estimatedProfitMargin}%</td>
                  <td className="py-3 px-4 text-neon-purple">{cat.demandIndex}%</td>
                  <td className="py-3 px-4 text-neon-cyan">{cat.businessHealthScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'users' && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-space-800 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-white text-sm block">Alex Mercer</span>
                <span className="text-xs text-slate-400">alex.mercer@profitpulse.ai • Role: Superadmin</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-neon-emerald text-xs font-mono font-bold">
                ACTIVE
              </span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
