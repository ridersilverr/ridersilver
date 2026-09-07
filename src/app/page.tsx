"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLogoShowcase } from "@/components/home/BrandLogoShowcase";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { InteractiveLookbook } from "@/components/home/InteractiveLookbook";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { ReviewsTicker } from "@/components/home/ReviewsTicker";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/store";
import { Product } from "@/types";
import { Sparkles, ArrowRight, MessageCircle, Headphones } from "lucide-react";
import { getWhatsAppUrl } from "@/config/site";
import { useLiveSupport } from "@/context/LiveSupportContext";

export default function Home() {
  const { openSupport } = useLiveSupport();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew || !p.isFeatured).slice(0, 4);

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900">
      
      {/* Menü İle Site Başlangıcı Arasında Resmi Logo Vitrini */}
      <BrandLogoShowcase />

      {/* 1. Aydınlık Kinetic Hero 2.0 */}
      <HeroSection />

      {/* 2. Kesintisiz Akan Moda Şeridi (Marquee Ticker) */}
      <MarqueeTicker />

      {/* 3. Bento-Grid Kategori Vitrini */}
      <CategoryShowcase />

      {/* 4. İnteraktif Lookbook & Canlı Kombin (Hotspots) */}
      <InteractiveLookbook />

      {/* 5. Çok Satanlar & Öne Çıkan Mücevherler */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold-700 text-xs font-mono tracking-widest uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
                <span>İmza Koleksiyon</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
                En Çok Tercih Edilen <span className="font-serif italic font-normal text-gold-700">Tasarımlar</span>
              </h2>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-600 hover:text-gold-700 transition"
            >
              <span>Tümünü Gör</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Ürün Listesi */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Sim & Cila Zanaat Hikayesi */}
      <CraftsmanshipSection />

      {/* 7. Yeni Gelenler Vitrini */}
      <section className="py-24 bg-stone-50/60 relative border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="font-mono text-xs text-gold-700 tracking-widest uppercase block mb-2">
                Yeni Sezon
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
                Taze Işıltılar: <span className="font-serif italic font-normal text-gold-700">Yeni Koleksiyon</span>
              </h2>
            </div>
            <Link
              href="/katalog"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-600 hover:text-gold-700 transition"
            >
              <span>Kataloğa Git</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 8. Müşteri Deneyimleri ve Güven */}
      <ReviewsTicker />

      {/* 9. VIP WhatsApp Stil Danışmanı */}
      <section className="py-20 bg-gradient-to-b from-amber-50/50 via-white to-stone-50 border-t border-neutral-200 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Kişiye Özel Mücevher Danışmanı</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900">
            Özel Ölçü, Hediye veya Tasarım Talepleriniz İçin Yanınızdayız
          </h2>

          <p className="text-neutral-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-light">
            Kendinize veya sevdiklerinize özel bir parça seçerken ya da havale ödeme adımlarında anlık bilgi almak için WhatsApp stil danışmanımıza tek tıkla bağlanabilirsiniz.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openSupport()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 hover:bg-gold-600 text-white text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-gold-400/40 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Headphones className="w-4 h-4 text-gold-400" />
              <span>Sitede Canlı Desteğe Bağlan</span>
            </button>

            <a
              href={getWhatsAppUrl("Merhaba Rider Silver, özel tasarım ve koleksiyonlarınız hakkında stil danışmanından bilgi almak istiyorum.")}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp ile Yazın</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
