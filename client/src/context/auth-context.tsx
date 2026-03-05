"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
}

interface User {
  name: string;
  email: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeToken(token: string): User | null {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return {
      name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as "admin" | "user",
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("fitflow_token");
    if (savedToken) {
      const decoded = decodeToken(savedToken);
      if (decoded) {
        setToken(savedToken);
        setUser(decoded);
      } else {
        localStorage.removeItem("fitflow_token");
        localStorage.removeItem("fitflow_user");
      }
    }
  }, []);

  const login = useCallback((newToken: string) => {
    const decoded = decodeToken(newToken);
    if (decoded) {
      setToken(newToken);
      setUser(decoded);
      localStorage.setItem("fitflow_token", newToken);
      localStorage.setItem("fitflow_user", JSON.stringify(decoded));
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("fitflow_token");
    localStorage.removeItem("fitflow_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
