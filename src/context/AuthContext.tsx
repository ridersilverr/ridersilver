"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "customer";
  phone?: string;
  tcKimlik?: string;
  birthDate?: string;
  address?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsAdmin: () => void;
  register: (
    fullName: string, 
    email: string, 
    password?: string, 
    extraDetails?: { phone?: string; tcKimlik?: string; birthDate?: string; address?: string }
  ) => Promise<boolean>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "simcila_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Kullanıcı okunamadı:", e);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    // Supabase bağlıysa auth kontrolü
    if (isSupabaseConfigured() && supabase && password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.user) return false;

      const profile: UserProfile = {
        id: data.user.id,
        email: data.user.email || email,
        fullName: data.user.user_metadata?.full_name || email.split("@")[0],
        role: email.includes("admin") ? "admin" : "customer",
      };
      setUser(profile);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
      return true;
    }

    // Geliştirme / Test modunda akıllı giriş
    const profile: UserProfile = {
      id: "usr-" + Date.now(),
      email,
      fullName: email.split("@")[0].toUpperCase(),
      role: email.toLowerCase().includes("admin") ? "admin" : "customer",
    };
    setUser(profile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    return true;
  };

  const loginAsAdmin = () => {
    const adminUser: UserProfile = {
      id: "admin-ridersilver",
      email: "yonetici@ridersilver.com",
      fullName: "Rider Silver Mağaza Yöneticisi",
      role: "admin",
    };
    setUser(adminUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(adminUser));
  };

  const register = async (
    fullName: string, 
    email: string, 
    password?: string,
    extraDetails?: { phone?: string; tcKimlik?: string; birthDate?: string; address?: string }
  ): Promise<boolean> => {
    if (isSupabaseConfigured() && supabase && password) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            phone: extraDetails?.phone,
            tc_kimlik: extraDetails?.tcKimlik,
          },
        },
      });
      if (error || !data.user) return false;
    }

    const profile: UserProfile = {
      id: "usr-" + Date.now(),
      email,
      fullName,
      role: "customer",
      phone: extraDetails?.phone,
      tcKimlik: extraDetails?.tcKimlik,
      birthDate: extraDetails?.birthDate,
      address: extraDetails?.address,
    };
    setUser(profile);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        login,
        loginAsAdmin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
