import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  Bell, 
  TrendingUp, 
  Building2, 
  Store, 
  Sparkles, 
  BarChart3, 
  ShieldCheck, 
  User as UserIcon, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { ViewType } from '../../types';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setIsSearchModalOpen, notifications, isSimulatingLive, setIsSimulatingLive } = useApp();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: ViewType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Home', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'companies', label: 'Top Companies', icon: Building2 },
    { id: 'categories', label: 'Shop Sectors', icon: Store },
    { id: 'globe', label: '3D World Map', icon: Globe },
    { id: 'ai-prediction', label: 'AI Predictions', icon: Sparkles },
    { id: 'charts', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-space-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              src="/logo.jpg" 
              alt="ProfitPulse AI Logo" 
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-cyan-500/40 shadow-glow-cyan group-hover:scale-105 transition-transform" 
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  ProfitPulse
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-neon-cyan font-semibold uppercase tracking-wider">
                  AI Global
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider font-mono">Billion-Dollar Business Intelligence</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-neon-cyan border border-cyan-500/40 shadow-glow-cyan/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neon-cyan' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Bar Right */}
          <div className="flex items-center gap-3">
            {/* Live Ticker Toggle */}
            <button
              onClick={() => setIsSimulatingLive(!isSimulatingLive)}
              title="Toggle Simulated Live Telemetry"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-mono border transition-all ${
                isSimulatingLive 
                  ? 'bg-emerald-500/10 text-neon-emerald border-emerald-500/30' 
                  : 'bg-slate-800/60 text-slate-400 border-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSimulatingLive ? 'bg-neon-emerald animate-ping' : 'bg-slate-500'}`} />
              {isSimulatingLive ? 'LIVE TICKER' : 'PAUSED'}
            </button>

            {/* Smart Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 glass-panel transition-all"
              title="AI Global Search (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsDropdownOpen(!isNotificationsDropdownOpen)}
                className="relative p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-700/60 glass-panel transition-all"
              >
                <Bell className="w-4 h-4 text-purple-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-neon-cyan" />
                      Live Business Alerts
                    </h4>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                      {notifications.length} Alerts
                    </span>
                  </div>
                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.map(n => (
                      <div 
                        key={n.id}
                        className="p-3 rounded-xl bg-space-800/80 border border-slate-800 hover:border-cyan-500/30 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-300 mt-1 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth / User Profile */}
            {isAuthenticated && user ? (
              <button
                onClick={() => setActiveView('profile')}
                className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl border border-slate-700/80 glass-panel hover:border-cyan-500/40 transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-100">{user.name}</p>
                  <p className="text-[10px] text-neon-cyan font-mono">{user.role}</p>
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-cyan-500/40" 
                />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-900 font-bold text-xs shadow-glow-cyan transition-all"
              >
                <UserIcon className="w-3.5 h-3.5 text-slate-900" />
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 glass-panel"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-space-900/95 p-4 space-y-2 animate-in slide-in-from-top-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-neon-cyan border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <Icon className="w-4 h-4 text-neon-cyan" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
