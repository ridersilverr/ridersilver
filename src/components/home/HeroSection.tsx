"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  }, []);

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
      
      {/* Ferah Altın Işık & Güneş Parıltısı Efektleri (Altınbaş Tarzı) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-gold-200/30 via-amber-100/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[140px] pointer-events-none" />
      
      {/* İnce Zarif Arka Plan Deseni */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Sol Kolon: Başlık, Slogan, Aksiyonlar (7 Kolon) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Ferah Canlı Rozet */}
            <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-neutral-950 text-white border border-gold-500/40 shadow-md">
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
            </div>

            {/* Büyük Aydınlık Tipografi */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light tracking-tight text-neutral-900 leading-[1.12]">
                Senin Sürüşün,{" "}
                <span className="italic font-normal bg-gradient-to-r from-gold-600 via-amber-600 to-gold-700 bg-clip-text text-transparent font-serif">
                  Senin Hikayen.
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase text-white bg-gradient-to-r from-gold-600 via-amber-600 to-gold-700 hover:from-gold-700 hover:to-amber-700 shadow-lg shadow-gold-600/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Koleksiyonu Keşfet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/katalog?kategori=kolyeler"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-widest uppercase text-neutral-800 hover:text-gold-700 border border-neutral-300 hover:border-gold-400 bg-white shadow-xs transition-all duration-300"
              >
                <span>Özel Kolyeler</span>
              </Link>
            </div>

            {/* Ferah Metrik Hapları */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-neutral-200">
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs text-center lg:text-left">
                <span className="font-mono text-sm sm:text-2xl font-bold text-neutral-900">925 & 14K</span>
                <span className="block text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-wider uppercase mt-0.5">Sertifikalı</span>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs text-center lg:text-left">
                <span className="font-mono text-sm sm:text-2xl font-bold text-emerald-700">%5 İndirim</span>
                <span className="block text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-wider uppercase mt-0.5">Havale / EFT</span>
              </div>
              <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-neutral-200 shadow-xs text-center lg:text-left">
                <span className="font-mono text-sm sm:text-2xl font-bold text-gold-700">Ömür Boyu</span>
                <span className="block text-[9px] sm:text-[10px] text-neutral-500 font-mono tracking-wider uppercase mt-0.5">Cila Bakımı</span>
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

              {/* Ana Görsel Kartı */}
              <div className="relative rounded-[2rem] overflow-hidden border-2 border-white bg-white shadow-2xl group">
                
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <Image
                    key={currentProduct.id}
                    src={currentProduct.image}
                    alt={currentProduct.title}
                    fill
                    priority
                    className="object-cover object-center group-hover:scale-108 transition-all duration-700 ease-out animate-in fade-in zoom-in-95 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                </div>

                {/* Üst Sol: Sayaç ve Rozet */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] font-mono font-bold text-neutral-900 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span>0{currentIndex + 1} / 0{featuredItems.length}</span>
                  </span>
                </div>

                {/* Üst Sağ: Garanti Rozeti */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 flex items-center gap-1.5 text-[10px] font-semibold text-neutral-800 shadow-sm z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  <span>{currentProduct.guarantee}</span>
                </div>

                {/* Ok Butonları (Önceki / Sonraki) */}
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 z-20 hover:scale-110"
                  aria-label="Önceki Ürün"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-lg border border-neutral-200/80 flex items-center justify-center transition-all duration-200 z-20 hover:scale-110"
                  aria-label="Sonraki Ürün"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Yüzen Başlık ve Bilgi Kutusu */}
                <div className="absolute bottom-5 inset-x-4 sm:inset-x-5 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-gold-200 flex items-center justify-between shadow-xl z-20 transition-all duration-300">
                  <div className="min-w-0 flex-1 pr-2">
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
                  </div>

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
