import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { store, INITIAL_USERS } from '../services/store';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAdmin: boolean;
  isDealer: boolean;
  isSeller: boolean;
  isBuyer: boolean;
  login: (email: string) => boolean;
  register: (name: string, email: string, phone: string, role: UserRole, agencyName?: string) => User;
  switchUserRole: (role: UserRole) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => store.getCurrentUser());

  useEffect(() => {
    if (!user) {
      // Default to admin for seamless evaluation
      const admin = store.getUsers().find((u) => u.role === 'admin') || INITIAL_USERS[0];
      setUser(admin);
      store.setCurrentUser(admin);
    }
  }, [user]);

  const refreshUser = () => {
    if (user) {
      const refreshed = store.getUsers().find((u) => u.id === user.id) || null;
      setUser(refreshed);
      store.setCurrentUser(refreshed);
    }
  };

  const login = (email: string): boolean => {
    const existing = store.getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
      store.setCurrentUser(existing);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, phone: string, role: UserRole, agencyName?: string): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      whatsapp: phone.replace(/[^0-9]/g, ''),
      role,
      agencyName: role === 'dealer' ? (agencyName || 'Independent Agency') : undefined,
      city: 'Karachi',
      createdAt: new Date().toISOString()
    };
    store.saveUser(newUser);
    setUser(newUser);
    store.setCurrentUser(newUser);
    return newUser;
  };

  const switchUserRole = (targetRole: UserRole) => {
    const users = store.getUsers();
    let target = users.find((u) => u.role === targetRole);
    if (!target) {
      target = INITIAL_USERS.find((u) => u.role === targetRole);
      if (target) store.saveUser(target);
    }
    if (target) {
      setUser(target);
      store.setCurrentUser(target);
    }
  };

  const logout = () => {
    // Return to buyer role when logged out
    const buyer = store.getUsers().find((u) => u.role === 'buyer') || INITIAL_USERS[3];
    setUser(buyer);
    store.setCurrentUser(buyer);
  };

  const role = user?.role || 'buyer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAdmin: role === 'admin',
        isDealer: role === 'dealer',
        isSeller: role === 'seller',
        isBuyer: role === 'buyer',
        login,
        register,
        switchUserRole,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
