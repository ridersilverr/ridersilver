"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, BadgePercent, ChevronLeft, ChevronRight } from "lucide-react";
import { MeteorEffect } from "@/components/common/MeteorEffect";

const featuredItems = [
  {
    id: 1,
    title: "Aura Baget Kolye",
    slug: "aura-baget-kolye",
    category: "Pırlanta Kesim Zirkon Kolye",
    price: 1850,
    salePrice: 1490,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    badge: "Haftanın Tercihi",
    guarantee: "Kararmaz Cila",
  },
  {
    id: 2,
    title: "Venedik Su Yolu Kristal Bileklik",
    slug: "venedik-su-yolu-bileklik",
    category: "925 Has Gümüş Bileklik",
    price: 2450,
    salePrice: 1980,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop",
    badge: "Çok Satan Parça",
    guarantee: "Ömür Boyu Cila",
  },
  {
    id: 3,
    title: "Soleil 14K Madalyon Kolye",
    slug: "soleil-14k-madalyon-kolye",
    category: "14K Mikron Altın Kaplama",
    price: 1650,
    salePrice: 1320,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    badge: "Trend Koleksiyon",
    guarantee: "Has Altın Kaplama",
  },
  {
    id: 4,
    title: "Luna Damla Barok İnci Küpe",
    slug: "luna-damla-barok-inci-kupe",
    category: "Doğal Barok İnci & 14K",
    price: 1400,
    salePrice: 1190,
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",
    badge: "İmza Tasarım",
    guarantee: "Doğal İnci Sertifikalı",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      handleNext();
    } else if (diff < -35) {
      handlePrev();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  // Otomatik Ürün Geçiş Zamanlayıcısı (4.5 saniyede bir, üzerine gelince duraklar)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const currentProduct = featuredItems[currentIndex];

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-stone-50 text-neutral-900 pt-8 pb-16 sm:pt-12 sm:pb-24">
      
      {/* Ferah Altın Işık & Güneş Parıltısı Efektleri (Hareketli Lüks Atmosfer) */}
      <motion.div
        animate={{
          x: [0, 30, -25, 0],
          y: [0, -22, 18, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[460px] bg-gradient-to-b from-gold-300/35 via-amber-100/25 to-transparent rounded-full blur-[125px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -20, 25, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.96, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-10 right-0 w-[520px] h-[520px] bg-amber-200/25 rounded-full blur-[140px] pointer-events-none"
      />
      
      {/* İnce Zarif Arka Plan Deseni */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Kayan Altın/Gümüş Meteorlar ve Işıltılı Yıldız Tozu Arka Planı */}
      <MeteorEffect count={14} sparkleCount={18} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Sol Kolon: Başlık, Slogan, Aksiyonlar (7 Kolon) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Ferah Canlı Rozet & Işıltılar */}
            <div className="relative inline-block">
              {/* Mikro Parlayan Mücevher Yıldızı */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  scale: [0.9, 1.2, 0.9],
                  opacity: [0.4, 0.9, 0.4],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 text-gold-500 pointer-events-none hidden sm:block"
              >
                <Sparkles className="w-4 h-4 fill-gold-400/40 text-gold-500" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-neutral-950 text-white border border-gold-500/50 shadow-lg shadow-gold-950/20"
              >
                <div className="relative w-8 h-5 sm:w-10 sm:h-6 shrink-0">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Rider Silver"
                    fill
                    className="object-contain object-center drop-shadow-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-300 font-bold">
                    RIDER SILVER • 925 AYAR HAS GÜMÜŞ
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Büyük Aydınlık Tipografi */}
            <div className="space-y-3 relative">
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-neutral-900 leading-[1.12]">
                Senin Sürüşün,{" "}
                <span className="relative inline-block">
                  <span className="italic font-normal bg-gradient-to-r from-gold-600 via-amber-500 to-gold-700 bg-clip-text text-transparent font-serif drop-shadow-xs">
                    Senin Hikayen.
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-neutral-600 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Usta ellerde şekillenen 925 ayar has gümüş motorcu kask kolyeleri, yarışçı plakaları ve zamansız takılar. Yol tutkunuzu ve hikayenizi boynunuzda gururla taşıyın.
            </p>

            {/* Aksiyon Butonları */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/katalog"
                className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-white bg-gradient-to-r from-gold-600 via-amber-600 to-gold-700 hover:from-gold-700 hover:to-amber-700 shadow-xl shadow-gold-600/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {/* Gezen Işık Huzmesi */}
                <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                <span className="relative z-10">Koleksiyonu Keşfet</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/katalog?kategori=kolyeler"
                className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase text-neutral-800 hover:text-gold-700 border border-neutral-300 hover:border-gold-400 bg-white shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Özel Kolyeler</span>
              </Link>
            </div>

            {/* Lüks Güven & Avantaj Widget'ları (Vurgulu, Şık & Hareketli) */}
            <div className="pt-7 max-w-xl mx-auto lg:mx-0 border-t border-gold-300/40">
              <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                
                {/* 1. Widget: 925 & 14K Sertifikalı */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="relative group rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white via-stone-50/60 to-gold-50/25 border border-gold-300/70 hover:border-gold-500 shadow-[0_4px_16px_rgba(212,175,55,0.10)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-default"
                >
                  {/* Periyodik Altın Işıltı Dalgası */}
                  <motion.div
                    animate={{ x: ["-120%", "240%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 4, ease: "easeInOut" }}
                    className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none"
                  />

                  <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-neutral-950 to-neutral-800 text-gold-300 border border-gold-400/40 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-4 h-4 text-gold-300 stroke-[2.2]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold tracking-widest text-gold-800 uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-gold-100/90 border border-gold-300/80">
                      ORİJİNAL
                    </span>
                  </div>

                  <div className="space-y-0.5 text-left">
                    <div className="font-mono text-xs sm:text-lg lg:text-xl font-black text-neutral-950 tracking-tight">
                      925 & 14K
                    </div>
                    <div className="text-[9px] sm:text-[11px] text-neutral-600 font-medium tracking-wide">
                      Sertifikalı
                    </div>
                  </div>
                </motion.div>

                {/* 2. Widget: %5 İndirim Havale / EFT */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="relative group rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white via-emerald-50/20 to-emerald-50/40 border border-emerald-300/80 hover:border-emerald-500 shadow-[0_4px_16px_rgba(16,185,129,0.10)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-default"
                >
                  {/* Periyodik Zümrüt Işıltı Dalgası */}
                  <motion.div
                    animate={{ x: ["-120%", "240%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 4, delay: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-emerald-100/50 to-transparent skew-x-12 pointer-events-none"
                  />

                  <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-emerald-950 to-neutral-900 text-emerald-300 border border-emerald-400/40 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <BadgePercent className="w-4 h-4 text-emerald-300 stroke-[2.2]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold tracking-widest text-emerald-800 uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-100/90 border border-emerald-300/80">
                      AVANTAJ
                    </span>
                  </div>

                  <div className="space-y-0.5 text-left">
                    <div className="font-mono text-xs sm:text-lg lg:text-xl font-black text-emerald-700 tracking-tight">
                      %5 İndirim
                    </div>
                    <div className="text-[9px] sm:text-[11px] text-neutral-600 font-medium tracking-wide">
                      Havale / EFT
                    </div>
                  </div>
                </motion.div>

                {/* 3. Widget: Ömür Boyu Cila Bakımı */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="relative group rounded-2xl sm:rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white via-amber-50/20 to-gold-50/40 border border-gold-300/80 hover:border-gold-500 shadow-[0_4px_16px_rgba(212,175,55,0.10)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.22)] transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-default"
                >
                  {/* Periyodik Altın Işıltı Dalgası */}
                  <motion.div
                    animate={{ x: ["-120%", "240%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, repeatDelay: 4, delay: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-amber-100/60 to-transparent skew-x-12 pointer-events-none"
                  />

                  <div className="flex items-center justify-between gap-1 mb-2 sm:mb-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-gold-600 via-amber-600 to-gold-700 text-white border border-gold-300/60 shadow-xs flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4 text-white stroke-[2.2]" />
                    </div>
                    <span className="text-[7.5px] sm:text-[9px] font-mono font-bold tracking-widest text-amber-800 uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-amber-100/90 border border-amber-300/80">
                      GARANTİ
                    </span>
                  </div>

                  <div className="space-y-0.5 text-left">
                    <div className="font-mono text-xs sm:text-lg lg:text-xl font-black text-gold-700 tracking-tight">
                      Ömür Boyu
                    </div>
                    <div className="text-[9px] sm:text-[11px] text-neutral-600 font-medium tracking-wide">
                      Cila Bakımı
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

          {/* Sağ Kolon: Lüks Çoklu Ürün Geçişli Vitrin Kartı (5 Kolon) */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-sm sm:max-w-md select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Parlayan Altın Aura Efekti */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-r from-gold-300/50 via-amber-200/40 to-gold-400/50 blur-xl opacity-70" />

              {/* Ana Görsel Kartı (Kayarlı Slider) */}
              <div 
                className="relative rounded-[2rem] overflow-hidden border-2 border-white bg-white shadow-2xl group"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                
                {/* Sağa-Sola Kayarlı Görsel Rayı */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 cursor-grab active:cursor-grabbing">
                  <motion.div
                    className="flex w-full h-full"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  >
                    {featuredItems.map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="relative aspect-[4/5] w-full h-full shrink-0 flex-none overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          priority={idx === 0}
                          className="object-cover object-center group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Üst Sol: Sayaç ve Rozet */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] font-mono font-bold text-neutral-900 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span>0{currentIndex + 1} / 0{featuredItems.length}</span>
                  </span>
                </div>

                {/* Üst Sağ: Garanti Rozeti */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentProduct.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 flex items-center gap-1.5 text-[10px] font-semibold text-neutral-800 shadow-sm z-10"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                    <span>{currentProduct.guarantee}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Ok Butonları (Önceki / Sonraki) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 z-20 hover:scale-110 active:scale-95"
                  aria-label="Önceki Ürün"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 z-20 hover:scale-110 active:scale-95"
                  aria-label="Sonraki Ürün"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Yüzen Başlık ve Bilgi Kutusu */}
                <div className="absolute bottom-5 inset-x-4 sm:inset-x-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-gold-200 flex items-center justify-between shadow-xl z-20 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="min-w-0 flex-1 pr-2"
                    >
                      <div className="flex items-center gap-1 text-[10px] font-mono text-gold-700 font-bold uppercase tracking-widest">
                        <Sparkles className="w-3 h-3 text-gold-600 animate-spin" />
                        <span>{currentProduct.badge}</span>
                      </div>
                      <h3 className="font-serif text-xs sm:text-sm font-semibold text-neutral-900 mt-0.5 truncate">
                        {currentProduct.title}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-xs sm:text-sm font-mono font-bold text-neutral-950">
                          {currentProduct.salePrice.toLocaleString("tr-TR")} ₺
                        </span>
                        <span className="text-[10px] text-neutral-400 line-through">
                          {currentProduct.price.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <Link
                    href={`/urun/${currentProduct.slug}`}
                    className="p-3 rounded-xl bg-gradient-to-r from-gold-600 to-amber-600 hover:from-gold-700 hover:to-amber-700 text-white transition-all shadow-md transform hover:scale-105 shrink-0"
                    title="Ürünü İncele"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Alt Geçiş Çizgisi / Noktalar */}
                <div className="absolute bottom-1 inset-x-0 flex justify-center gap-1.5 z-20">
                  {featuredItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? "w-6 bg-gold-500" : "w-2 bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Ürün ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
