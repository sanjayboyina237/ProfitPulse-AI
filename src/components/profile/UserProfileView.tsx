import React from 'react';
import { BookmarkCheck, KeyRound, LogOut, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_COMPANIES } from '../../data/mockCompanies';
import { useApp } from '../../context/AppContext';

export const UserProfileView: React.FC = () => {
  const { user, logout, toggle2FA } = useAuth();
  const { setSelectedCompany, setActiveView } = useApp();

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-sm">Please sign in to view your executive profile and saved watchlist.</p>
      </div>
    );
  }

  const savedCompanies = MOCK_COMPANIES.filter(c => user.watchlist.includes(c.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-6">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-cyan-500/40 shadow-glow-cyan"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{user.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-neon-cyan border border-cyan-500/30">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            <p className="text-[11px] text-slate-500 font-mono mt-0.5">Account ID: {user.id}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-neon-rose border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Security & Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 2FA Security Box */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
              <KeyRound className="w-4 h-4 text-neon-cyan" /> Two-Factor Authentication (2FA)
            </div>
            <p className="text-xs text-slate-400">Enforce biometrics & authenticator app access</p>
          </div>
          <button
            onClick={toggle2FA}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              user.twoFactorEnabled 
                ? 'bg-emerald-500/20 text-neon-emerald border-emerald-500/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {user.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Saved Preferences */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
              <Moon className="w-4 h-4 text-purple-400" /> UI Theme Preference
            </div>
            <p className="text-xs text-slate-400">Glassmorphism Dark Space Mode Active</p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
            NEON DARK
          </span>
        </div>

      </div>

      {/* Saved Watchlist Companies */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl">
        <h3 className="text-xl font-extrabold text-white mb-4 flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-neon-cyan" /> Saved Watchlist Corporations ({savedCompanies.length})
        </h3>

        {savedCompanies.length === 0 ? (
          <p className="text-xs text-slate-400">No saved companies in your watchlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedCompanies.map(c => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedCompany(c);
                  setActiveView('companies');
                }}
                className="p-4 rounded-2xl bg-space-800/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-xs">{c.name}</h4>
                    <span className="text-[11px] text-slate-400">{c.industry}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-neon-emerald">{c.estimatedRevenue}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
