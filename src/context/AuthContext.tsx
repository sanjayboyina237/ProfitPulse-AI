import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'signup' | 'forgot' | 'verify' | '2fa';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  setAuthMode: (mode: 'login' | 'signup' | 'forgot' | 'verify' | '2fa') => void;
  login: (email: string, method?: string) => void;
  logout: () => void;
  toggleWatchlist: (companyId: string) => void;
  toggleFavoriteCountry: (countryCode: string) => void;
  toggle2FA: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Require login on initial visit
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true); // Open login modal automatically at start
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | 'verify' | '2fa'>('login');

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, _method: string = 'Email') => {
    const namePart = email.split('@')[0] || 'User';
    setUser({
      id: 'usr-' + Date.now(),
      email,
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      role: 'Enterprise Pro',
      watchlist: ['c1', 'c2', 'c3', 'c8'],
      favoriteCountries: ['IND', 'USA', 'ARE'],
      twoFactorEnabled: true,
      theme: 'neon',
      language: 'English (IN)',
    });
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthModalOpen(true);
  };

  const toggleWatchlist = (companyId: string) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const exists = user.watchlist.includes(companyId);
    const updated = exists 
      ? user.watchlist.filter(id => id !== companyId)
      : [...user.watchlist, companyId];
    setUser({ ...user, watchlist: updated });
  };

  const toggleFavoriteCountry = (countryCode: string) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const exists = user.favoriteCountries.includes(countryCode);
    const updated = exists 
      ? user.favoriteCountries.filter(c => c !== countryCode)
      : [...user.favoriteCountries, countryCode];
    setUser({ ...user, favoriteCountries: updated });
  };

  const toggle2FA = () => {
    if (!user) return;
    setUser({ ...user, twoFactorEnabled: !user.twoFactorEnabled });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        setAuthMode,
        login,
        logout,
        toggleWatchlist,
        toggleFavoriteCountry,
        toggle2FA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
