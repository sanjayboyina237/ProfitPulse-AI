import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Globe, Building2, Send, Cpu, ShieldCheck } from 'lucide-react';
import { MOCK_AI_INSIGHTS } from '../../data/mockAIInsights';

export const AIPredictionsWidget: React.FC = () => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [aiAnswers, setAiAnswers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePredictPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiAnswers(prev => [
        `[Predictive Model Output for "${customPrompt}"]: High likelihood (+28.4% upside) based on global supply chain realignments, consumer adoption velocity, and sovereign tax incentives in US, India, and UAE tech corridors. Recommended risk mitigation: Hedge currency exposures and prioritize AI workflow automation.`,
        ...prev
      ]);
      setCustomPrompt('');
    }, 1200);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-neon-purple animate-pulse" />
          Macroeconomic Machine Learning Forecasting Engine
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AI Predictive Business Futures
        </h2>
        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
          Forecast enterprise growth, default risks, emerging startup sectors, and high-yield investment allocations with 94.8% empirical confidence.
        </p>
      </div>

      {/* Interactive AI Assistant Prompt Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-neon-purple">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-base">Ask ProfitPulse AI Assistant</h3>
            <p className="text-xs text-slate-400">Simulate custom industry scenarios or country investment risks</p>
          </div>
        </div>

        <form onSubmit={handlePredictPrompt} className="flex gap-3">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g. Predict profit margins for EV charging stations in South East Asia by 2028..."
            className="glass-input w-full px-4 py-3 rounded-2xl text-xs flex-1"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-purple flex items-center gap-2 hover:opacity-90 transition-all shrink-0"
          >
            {isGenerating ? 'Analyzing...' : 'Predict'}
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Dynamic AI Answers List */}
        {aiAnswers.length > 0 && (
          <div className="mt-6 space-y-3 pt-6 border-t border-slate-800">
            {aiAnswers.map((ans, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-space-800/90 border border-purple-500/30 text-xs text-slate-200 leading-relaxed font-mono">
                <span className="text-neon-cyan font-bold block mb-1">AI INSIGHT RESPONSE:</span>
                {ans}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Standard AI Forecasting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_AI_INSIGHTS.map((insight) => (
          <div key={insight.id} className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {insight.type} FORECAST
                </span>
                <span className="text-xs font-mono text-neon-emerald font-bold">
                  {insight.confidence}% Confidence
                </span>
              </div>

              <h4 className="font-extrabold text-base text-white mb-2">{insight.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{insight.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Recommended Execution</span>
              <p className="text-xs text-neon-cyan font-semibold">{insight.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
