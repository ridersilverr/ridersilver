"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import { getLocalOrders, getAllProducts } from "@/lib/store";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Store, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  ExternalLink,
  Bell,
  ChevronRight,
  TrendingUp,
  Activity
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, loginAsAdmin, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Canlı İstatistik ve Bekleyen Havale Kontrolü
    const orders = getLocalOrders();
    const pending = orders.filter((o) => o.paymentMethod === "havale_eft" && o.orderStatus === "processing").length;
    setPendingOrdersCount(pending);

    getAllProducts().then((prods) => {
      setTotalProductsCount(prods.length);
    });

    // Saat & Tarih formatı
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("tr-TR", {
          day: "numeric",
          month: "long",
          weekday: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [pathname]);

  const navItems = [
    { 
      name: "Genel Bakış", 
      href: "/admin", 
      icon: LayoutDashboard,
      badge: null 
    },
    { 
      name: "Ürün Yönetimi", 
      href: "/admin/urunler", 
      icon: Package,
      badge: totalProductsCount > 0 ? `${totalProductsCount}` : null
    },
    { 
      name: "Siparişler", 
      href: "/admin/siparisler", 
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Yeni` : null,
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-500/40"
    },
  ];

  const currentPageTitle = navItems.find((n) => n.href === pathname)?.name || "Yönetim Paneli";

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-neutral-900 flex flex-col md:flex-row relative">
      
      {/* 1. Sol Sidebar (Ultra Modern Obsidian & Altın Auralı) */}
      <aside className="w-full md:w-72 bg-gradient-to-b from-[#0D0F14] via-[#11141D] to-[#0A0C10] text-white flex flex-col justify-between shrink-0 border-r border-white/10 relative z-30 shadow-2xl">
        
        {/* Arka Plan Hafif Altın Parıltısı */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          {/* Üst Logo ve Başlık */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="relative w-12 h-9 rounded-xl overflow-hidden bg-neutral-950 border border-gold-500/30 shadow-lg shadow-gold-500/10 shrink-0 group-hover:scale-105 transition-transform duration-300 p-1">
                <Image
                  src="/images/logo-icon.png"
                  alt="RIDER SILVER"
                  fill
                  className="object-contain object-center"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.18em] text-white uppercase block leading-none">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-gold-400/90 uppercase font-semibold mt-1 block">
                  Rider Suite v2.4
                </span>
              </div>
            </Link>

            {/* Mobil Aç/Kapa Butonu */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Canlı Sistem Durumu Rozeti */}
          <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-mono font-medium text-neutral-300">Canlı Sistem</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              %99.9 Aktif
            </span>
          </div>

          {/* Menü Linkleri */}
          <nav className={`p-4 space-y-2 ${mobileNavOpen ? "block" : "hidden md:block"}`}>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-3 py-1 font-semibold">
              Yönetim Menüsü
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`group relative flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-neutral-950 shadow-lg shadow-gold-500/25 font-bold scale-[1.02]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.06] hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-neutral-950" : "text-neutral-400 group-hover:text-gold-400 group-hover:scale-110"}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? "bg-neutral-950/80 text-gold-300" 
                        : (item.badgeColor || "bg-white/10 text-neutral-300")
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Alt Bilgi & Hızlı Eylemler */}
        <div className={`p-4 border-t border-white/10 space-y-3 bg-[#08090D]/80 ${mobileNavOpen ? "block" : "hidden md:block"}`}>
          
          {/* Canlı Mağaza Önizleme Butonu */}
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between w-full py-3 px-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-gold-400/60 text-xs font-semibold text-neutral-200 hover:text-white transition-all duration-300 shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-gold-400 group-hover:scale-110 transition-transform" />
              <span>Mağazayı Önizle</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {!isAdmin && (
            <button
              onClick={loginAsAdmin}
              className="w-full py-2 px-3 bg-gold-900/50 border border-gold-500/40 text-gold-300 rounded-xl text-[11px] font-semibold hover:bg-gold-800/80 transition"
            >
              Yönetici Modunu Etkinleştir
            </button>
          )}

          {/* Admin Profil Kartı */}
          <div className="pt-2 flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-500 to-amber-400 text-neutral-950 font-bold flex items-center justify-center text-xs shadow-xs">
                SY
              </div>
              <div>
                <span className="text-xs font-semibold text-white block leading-tight">
                  {user?.fullName || "Sistem Yöneticisi"}
                </span>
                <span className="text-[10px] text-neutral-500 font-mono block">
                  Atölye Admin
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              aria-label="Çıkış Yap"
              className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* 2. Ana İçerik ve Üst Modern Header */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Üst Hareketli Başlık Çubuğu (Header Bar) */}
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-neutral-200/90 px-6 sm:px-10 py-4 flex items-center justify-between shadow-xs">
          
          {/* Sol Breadcrumb & Başlık */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <Link href="/admin" className="hover:text-gold-700 transition">Yönetim</Link>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-2">
              <span>{currentPageTitle}</span>
              <Sparkles className="w-4 h-4 text-gold-600 animate-pulse" />
            </h2>
          </div>

          {/* Sağ Aksiyonlar & Saat */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Canlı Tarih */}
            {currentTime && (
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-mono font-medium">
                <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>{currentTime}</span>
              </div>
            )}

            {/* Hızlı Sipariş Uyarısı */}
            <Link
              href="/admin/siparisler"
              className={`relative p-2 rounded-xl transition ${
                pendingOrdersCount > 0 
                  ? "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200" 
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
              title={pendingOrdersCount > 0 ? `${pendingOrdersCount} Havale Onayı Bekliyor` : "Siparişler"}
            >
              <Bell className="w-4 h-4" />
              {pendingOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {pendingOrdersCount}
                </span>
              )}
            </Link>

            {/* Mağazaya Dön Butonu */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-gold-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              <Store className="w-3.5 h-3.5 text-gold-400" />
              <span>Mağazayı Gör</span>
            </Link>
          </div>

        </header>

        {/* Dinamik Sayfa İçeriği & Yumuşak Geçiş Animasyonu */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          <div key={pathname} className="max-w-7xl mx-auto animate-admin-fade">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}
