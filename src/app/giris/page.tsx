"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsAdmin } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      if (email.includes("admin")) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/hesabim";
      }
    } else {
      setError("Giriş yapılamadı. Lütfen e-posta veya şifrenizi kontrol ediniz.");
      setLoading(false);
    }
  };

  const handleQuickAdmin = () => {
    loginAsAdmin();
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-neutral-900 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <span className="font-serif text-3xl font-bold tracking-[0.25em] text-neutral-900 uppercase">
          {siteConfig.name}
        </span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-gold-700 font-bold">
          Müşteri & Yönetici Girişi
        </span>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6">
          
          <form className="space-y-4 text-xs font-mono" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-neutral-700 mb-1 font-semibold">E-Posta Adresiniz</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@mail.com"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-700 mb-1 font-semibold">Şifre</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-neutral-900 hover:bg-gold-600 text-white rounded-full font-mono font-bold uppercase tracking-wider transition shadow-md"
            >
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>

          {/* Test Admin Girişi */}
          <div className="pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="w-full py-3 px-4 bg-gold-50 border border-gold-300 hover:bg-gold-100 text-gold-900 rounded-full text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
            >
              <ShieldCheck className="w-4 h-4 text-gold-700" />
              <span>Yönetici (Admin) Olarak Hızlı Test Girişi</span>
            </button>
          </div>

          <div className="text-center text-xs font-mono text-neutral-500">
            <span>Henüz hesabınız yok mu? </span>
            <Link href="/kayit" className="text-gold-700 hover:underline font-bold">
              Kayıt Olun
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
