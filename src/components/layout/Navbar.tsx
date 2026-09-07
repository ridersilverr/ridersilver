"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  LayoutDashboard,
  MessageCircle
} from "lucide-react";

export function Navbar() {
  const { 
    totalItems, 
    setIsCartOpen, 
    cartBounce, 
    lastAddedProduct, 
    toastVisible, 
    setToastVisible 
  } = useCart();

  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { name: string; href: string; highlight?: boolean }[] = [
    { name: "Kolyeler", href: "/katalog?kategori=kolyeler" },
    { name: "Bileklikler", href: "/katalog?kategori=bileklikler" },
    { name: "Yüzükler", href: "/katalog?kategori=yuzukler" },
    { name: "Küpeler", href: "/katalog?kategori=kupeler" },
    { name: "Tüm Koleksiyon", href: "/katalog" },
  ];

  return (
    <>
      {/* Üst Ferah Duyuru Bandı */}
      <div className="bg-gradient-to-r from-amber-50 via-gold-50 to-amber-50 border-b border-amber-200/60 text-[11px] text-amber-950 py-2 px-4 text-center tracking-wider font-medium flex items-center justify-center gap-2 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
        <span>Havale & EFT ile Anında <strong>%5 İndirim</strong> • 1.000 TL Üzeri <strong>Sigortalı Ücretsiz Kargo</strong></span>
        <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse hidden sm:inline" />
      </div>

      {/* Yüzen Ada Beyaz-Cam Navigasyon */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
        <div className={`rounded-full px-5 py-3 transition-all duration-300 flex items-center justify-between border ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-xl border-neutral-200/70 shadow-sm"
        }`}>
          
          {/* Mobil Menü Butonu */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-neutral-800 hover:text-gold-600 transition"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Marka Başlığı & Slogan */}
          <div className="flex items-center">
            <Link href="/" className="group flex flex-col">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.18em] text-neutral-900 group-hover:text-gold-600 transition-colors uppercase leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-gold-700 uppercase mt-1 hidden sm:block font-semibold">
                {siteConfig.slogan}
              </span>
            </Link>
          </div>

          {/* Masaüstü Menü Linkleri */}
          <nav className="hidden lg:flex items-center space-x-1 bg-neutral-50 border border-neutral-200/80 px-4 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1 text-xs tracking-wider font-semibold rounded-full transition-all duration-200 uppercase ${
                  link.highlight
                    ? "bg-gradient-to-r from-gold-500 to-amber-600 text-neutral-950 font-bold shadow-xs hover:from-gold-600 hover:to-amber-700"
                    : "text-neutral-700 hover:text-gold-700 hover:bg-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sağ Aksiyonlar */}
          <div className="flex items-center space-x-2 sm:space-x-3.5">
            
            {/* Arama Butonu */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-neutral-700 hover:text-gold-600 hover:bg-neutral-100 rounded-full transition"
              title="Ürün Ara"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Kullanıcı / Admin */}
            <div className="relative">
              {user ? (
                <div className="flex items-center space-x-1.5">
                  <Link
                    href={isAdmin ? "/admin" : "/hesabim"}
                    className="flex items-center gap-1.5 py-1 px-3 rounded-full border border-gold-300 bg-gold-50 text-xs font-semibold text-gold-900 hover:bg-gold-100 transition"
                  >
                    {isAdmin ? <LayoutDashboard className="w-3.5 h-3.5 text-gold-700" /> : <User className="w-3.5 h-3.5 text-gold-700" />}
                    <span className="hidden sm:inline">{isAdmin ? "Yönetim" : user.fullName.split(" ")[0]}</span>
                  </Link>
                  <button
                    onClick={logout}
                    title="Çıkış Yap"
                    className="p-1.5 text-neutral-400 hover:text-rose-600 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/giris"
                  className="p-2 text-neutral-700 hover:text-gold-600 hover:bg-neutral-100 rounded-full transition inline-flex items-center gap-1.5"
                  title="Giriş Yap"
                >
                  <User className="w-4 h-4" />
                  <span className="text-xs font-medium hidden md:inline">Giriş</span>
                </Link>
              )}
            </div>

            {/* Sepet Butonu & Animasyonu */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2.5 rounded-full font-bold transition-all duration-300 shadow-md flex items-center justify-center group ${
                  cartBounce
                    ? "bg-gold-500 text-neutral-950 scale-125 ring-4 ring-gold-300/80 shadow-[0_0_30px_rgba(212,175,55,0.8)] animate-bounce"
                    : "bg-neutral-900 hover:bg-gold-600 text-white"
                }`}
                aria-label="Sepeti Görüntüle"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow transition-transform ${
                    cartBounce ? "bg-emerald-600 text-white scale-125" : "bg-gold-500 text-neutral-950"
                  }`}>
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Sağ Üst Yüzen "Sepete Eklendi" Toast Bildirimi (Alışveriş Kesintiye Uğramaz) */}
              {toastVisible && lastAddedProduct && (
                <div className="absolute right-0 top-14 w-72 p-3.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gold-400 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-neutral-900">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-gold-600" />
                      Sepete Eklendi ✓
                    </span>
                    <button
                      onClick={() => setToastVisible(false)}
                      className="text-neutral-400 hover:text-neutral-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                      <Image
                        src={lastAddedProduct.product.images[0]}
                        alt={lastAddedProduct.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-xs font-bold text-neutral-900 truncate">
                        {lastAddedProduct.product.title}
                      </h4>
                      <div className="flex items-center justify-between mt-0.5 text-[11px] font-mono">
                        <span className="text-neutral-500">Adet: {lastAddedProduct.quantity}</span>
                        <span className="font-bold text-gold-700">
                          {((lastAddedProduct.product.salePrice ?? lastAddedProduct.product.price) * lastAddedProduct.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setToastVisible(false);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-1.5 px-3 bg-neutral-900 hover:bg-gold-600 text-white rounded-xl text-[10px] font-mono uppercase font-bold tracking-wider transition text-center shadow-xs"
                    >
                      Çantayı Aç
                    </button>
                    <button
                      onClick={() => setToastVisible(false)}
                      className="py-1.5 px-3 border border-neutral-200 hover:bg-neutral-100 text-neutral-700 rounded-xl text-[10px] font-mono uppercase font-semibold transition"
                    >
                      Devam Et
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Canlı Arama Açılır Paneli */}
        {searchOpen && (
          <div className="mt-2 rounded-2xl bg-white/95 backdrop-blur-2xl border border-gold-400/40 p-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/katalog?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-gold-600 shrink-0 ml-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Baget kolye, su yolu bileklik, pırlanta, tektaş ara..."
                className="w-full bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="text-[11px] font-semibold uppercase tracking-wider text-white bg-gold-600 hover:bg-gold-700 px-4 py-1.5 rounded-full transition shrink-0"
              >
                Ara
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobil Menü (Lüks Akıcı Çekmece) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 rounded-3xl bg-white/95 backdrop-blur-2xl border border-neutral-200 p-5 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold px-1 pb-1 border-b border-neutral-100 flex items-center justify-between">
              <span>Mücevher Koleksiyonları</span>
              <Sparkles className="w-3 h-3 text-gold-600" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-neutral-50 hover:bg-gold-50 border border-neutral-200/80 text-xs font-semibold text-neutral-800 hover:text-gold-800 transition text-center uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2 font-mono">
              <a
                href={getWhatsAppUrl("Merhaba Rider Silver, stil danışmanınızla görüşmek, koleksiyon ve özel sipariş süreçleri hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noreferrer"
                className="text-xs uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-2.5 px-3 rounded-xl text-center flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp VIP Stil Danışmanı</span>
              </a>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-wider font-semibold text-gold-900 bg-gold-50 border border-gold-200 py-2.5 px-3 rounded-xl text-center"
              >
                Satıcı / Yönetici Paneli
              </Link>
              {!user && (
                <Link
                  href="/giris"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs uppercase tracking-wider font-semibold text-neutral-900 border border-neutral-300 py-2.5 px-3 rounded-xl text-center"
                >
                  Müşteri Girişi / Kayıt Ol
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
