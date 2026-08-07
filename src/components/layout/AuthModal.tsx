import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        login(email || 'demo.executive@profitpulse.ai', 'Email');
        setIsSuccess(false);
      }, 1000);
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      login(`executive.${provider.toLowerCase()}@profitpulse.ai`, provider);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-900/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-slate-700/80 p-8 shadow-2xl overflow-hidden">
        
        {/* Neon Glow Accents */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-neon-cyan mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {authMode === 'login' && 'Sign In to ProfitPulse'}
            {authMode === 'signup' && 'Create Enterprise Account'}
            {authMode === 'forgot' && 'Reset Password'}
            {authMode === 'verify' && 'Verify Email Address'}
            {authMode === '2fa' && 'Two-Factor Authentication'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Access real-time AI business metrics & global 3D spatial intelligence
          </p>
        </div>

        {/* Success Splash */}
        {isSuccess ? (
          <div className="py-12 text-center animate-in zoom-in-95">
            <CheckCircle2 className="w-16 h-16 text-neon-emerald mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-white">Authenticated Successfully!</h4>
            <p className="text-xs text-slate-400 mt-1">Redirecting to Global Command Dashboard...</p>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode !== '2fa' && authMode !== 'verify' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.mercer@enterprise.com"
                      className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

              {authMode !== 'forgot' && authMode !== 'verify' && authMode !== '2fa' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] text-neon-cyan hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs"
                    />
                  </div>
                </div>
              )}

              {authMode === '2fa' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    6-Digit Security Code
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      placeholder="123 456"
                      className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono text-center tracking-widest text-lg"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-space-900 font-extrabold text-xs uppercase tracking-wider shadow-glow-cyan flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-space-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {authMode === 'login' && 'Sign In'}
                    {authMode === 'signup' && 'Create Account'}
                    {authMode === 'forgot' && 'Send Reset Link'}
                    {authMode === '2fa' && 'Verify & Enter'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Social Logins */}
            {(authMode === 'login' || authMode === 'signup') && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-mono mb-4">
                  Or Continue With SSO
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="py-2.5 px-3 rounded-xl glass-panel hover:bg-slate-800/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all border border-slate-700"
                  >
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Microsoft')}
                    className="py-2.5 px-3 rounded-xl glass-panel hover:bg-slate-800/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all border border-slate-700"
                  >
                    Microsoft
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Apple')}
                    className="py-2.5 px-3 rounded-xl glass-panel hover:bg-slate-800/80 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all border border-slate-700"
                  >
                    Apple
                  </button>
                </div>
              </div>
            )}

            {/* Mode Switch Footers */}
            <div className="mt-6 text-center text-xs text-slate-400">
              {authMode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-neon-cyan font-bold hover:underline"
                  >
                    Register Now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-neon-cyan font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
