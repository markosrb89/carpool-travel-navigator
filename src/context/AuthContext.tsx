import React, { createContext, useContext, ReactNode } from "react";
import { useAuth } from "../hooks/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuth();

  const value: AuthContextType = {
    isAuthenticated: auth.isAuthenticated,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
