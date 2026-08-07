import React, { useState } from 'react';
import { Search, Mic, X, Building2, Store, Globe2, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_COMPANIES } from '../../data/mockCompanies';
import { MOCK_CATEGORIES } from '../../data/mockCategories';
import { MOCK_COUNTRIES } from '../../data/mockCountries';

export const SmartSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setSelectedCompany, setSelectedCategory, setSelectedCountry, setActiveView } = useApp();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  if (!isSearchModalOpen) return null;

  const filteredCompanies = MOCK_COMPANIES.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.industry.toLowerCase().includes(query.toLowerCase()) ||
    c.country.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredCategories = MOCK_CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(query.toLowerCase()) ||
    cat.aiAnalysis.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 4);

  const filteredCountries = MOCK_COUNTRIES.filter(co =>
    co.name.toLowerCase().includes(query.toLowerCase()) ||
    co.code.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQuery('NVIDIA AI Semiconductors');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-space-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-slate-700/80 p-6 shadow-2xl overflow-hidden animate-in slide-in-from-top-4">
        
        {/* Search Header Input */}
        <div className="relative flex items-center mb-6">
          <Search className="absolute left-4 w-5 h-5 text-neon-cyan" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, countries, shop categories, AI insights..."
            className="glass-input w-full pl-12 pr-24 py-3.5 rounded-2xl text-sm"
          />

          <div className="absolute right-3 flex items-center gap-2">
            <button
              onClick={handleVoiceSearch}
              className={`p-2 rounded-xl border transition-all ${
                isListening 
                  ? 'bg-rose-500/20 text-neon-rose border-rose-500/40 animate-pulse' 
                  : 'bg-space-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Voice Search Simulation"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isListening && (
          <p className="text-xs text-neon-rose font-mono mb-4 text-center animate-pulse">
            Listening to voice input... Speak now.
          </p>
        )}

        {/* Results Sections */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
          
          {/* Companies */}
          {filteredCompanies.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-neon-cyan" /> Enterprises ({filteredCompanies.length})
              </h4>
              <div className="space-y-2">
                {filteredCompanies.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCompany(c);
                      setActiveView('companies');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl bg-space-800/80 border border-slate-800 hover:border-cyan-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <span className="font-bold text-white text-xs">{c.name}</span>
                        <span className="text-[11px] text-slate-400 block">{c.industry} • {c.country}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-neon-emerald">{c.estimatedRevenue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shop Categories */}
          {filteredCategories.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Store className="w-3.5 h-3.5 text-neon-purple" /> Shop Sectors ({filteredCategories.length})
              </h4>
              <div className="space-y-2">
                {filteredCategories.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveView('categories');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl bg-space-800/80 border border-slate-800 hover:border-purple-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-neon-purple flex items-center justify-center">
                        <Store className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white text-xs">{cat.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-neon-purple">Daily {cat.estimatedDailyRevenue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Countries */}
          {filteredCountries.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" /> Sovereign Nations ({filteredCountries.length})
              </h4>
              <div className="space-y-2">
                {filteredCountries.map(co => (
                  <div
                    key={co.id}
                    onClick={() => {
                      setSelectedCountry(co);
                      setActiveView('globe');
                      setIsSearchModalOpen(false);
                    }}
                    className="p-3 rounded-xl bg-space-800/80 border border-slate-800 hover:border-emerald-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <span className="font-bold text-white text-xs">{co.name} ({co.code})</span>
                    <span className="text-xs font-mono text-neon-emerald">GDP +{co.gdpGrowth}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
