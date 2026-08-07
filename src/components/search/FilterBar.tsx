import React from 'react';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();

  return (
    <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-neon-cyan font-bold uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4" /> Filters:
        </div>

        {/* Country Filter */}
        <select
          value={filters.country}
          onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
          className="glass-input px-3 py-1.5 rounded-xl text-xs bg-space-800"
        >
          <option value="ALL">All Countries</option>
          <option value="United States">United States</option>
          <option value="India">India</option>
          <option value="Japan">Japan</option>
          <option value="Germany">Germany</option>
          <option value="South Korea">South Korea</option>
        </select>

        {/* Industry Filter */}
        <select
          value={filters.industry}
          onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
          className="glass-input px-3 py-1.5 rounded-xl text-xs bg-space-800"
        >
          <option value="ALL">All Industries</option>
          <option value="Consumer Electronics & Software">Electronics & Software</option>
          <option value="Cloud Computing & AI">Cloud Computing & AI</option>
          <option value="Semiconductors & AI Hardware">Semiconductors</option>
          <option value="IT Services & Consulting">IT Services</option>
          <option value="Automotive & Hybrid Mobility">Automotive</option>
        </select>

        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
          className="glass-input px-3 py-1.5 rounded-xl text-xs bg-space-800"
        >
          <option value="revenue">Sort by Est. Revenue</option>
          <option value="profit">Sort by Est. Profit</option>
          <option value="growth">Sort by Growth Rate</option>
          <option value="health">Sort by Health Score</option>
          <option value="risk">Sort by Risk Score</option>
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="px-3 py-1.5 rounded-xl glass-panel hover:bg-slate-800 text-slate-400 hover:text-white flex items-center gap-1.5 border border-slate-700 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
      </button>

    </div>
  );
};
