"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { Sparkles, ShoppingBag, ArrowRight, Check } from "lucide-react";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  productSlug: string;
  price: number;
  salePrice?: number;
  material: string;
  image: string;
}

export function InteractiveLookbook() {
  const { addToCart } = useCart();
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: "spot-1",
      x: 52,
      y: 46,
      title: "Aura Baget Pırlanta Görünümlü Kolye",
      productSlug: "aura-baget-kolye",
      price: 1850,
      salePrice: 1490,
      material: "925 Ayar Gümüş / 14K Kaplama",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
    },
    {
      id: "spot-2",
      x: 32,
      y: 72,
      title: "Venedik Su Yolu Kristal Bileklik",
      productSlug: "venedik-su-yolu-bileklik",
      price: 2450,
      salePrice: 1980,
      material: "925 Has Gümüş / Pırlanta Kesim",
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800",
    },
    {
      id: "spot-3",
      x: 58,
      y: 28,
      title: "Luna Damla Barok İnci Küpe",
      productSlug: "luna-damla-barok-inci-kupe",
      price: 1400,
      salePrice: 1190,
      material: "14K Altın Klips / Doğal İnci",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800",
    },
  ];

  const handleQuickAdd = (spot: Hotspot) => {
    const mockProduct: Product = {
      id: "quick-" + spot.id,
      title: spot.title,
      slug: spot.productSlug,
      description: spot.material,
      price: spot.price,
      salePrice: spot.salePrice,
      category: "kolyeler",
      images: [spot.image],
      stock: 10,
      material: spot.material,
      rating: 5,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };

    addToCart(mockProduct, 1);
    setAddedId(spot.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Bölüm Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-[11px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Etkileşimli Lookbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-neutral-900">
            Model Üzerinde Keşfet, <span className="italic font-serif font-normal text-gold-700">Kombini Tamamla</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md mx-auto">
            Görsel üzerindeki parıldayan <strong>noktalara tıklayarak</strong> takıların detaylarını inceleyebilir ve tek tıkla sepete ekleyebilirsiniz.
          </p>
        </div>

        {/* İnteraktif Lookbook Sahnesi */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100 aspect-[4/3] sm:aspect-[16/10]">
          
          {/* Editorial Model Fotoğrafı */}
          <Image
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600&auto=format&fit=crop"
            alt="Mücevherat Lookbook"
            fill
            className="object-cover object-center filter brightness-95"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          {/* Parlayan Etkileşim Noktaları (Hotspot Pins) */}
          {hotspots.map((spot) => {
            const isSelected = activeSpot?.id === spot.id;
            return (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Dış Halka */}
                <button
                  type="button"
                  onClick={() => setActiveSpot(isSelected ? null : spot)}
                  className="relative group p-2 focus:outline-none"
                  aria-label={spot.title}
                >
                  <span className="absolute inset-0 rounded-full bg-gold-400/60 animate-ping" />
                  <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-gold-500 text-gold-700 shadow-lg group-hover:scale-125 transition-transform duration-300">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </button>

                {/* Açılır Ferah Beyaz Mini Kart */}
                {isSelected && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 sm:w-64 max-w-[80vw] p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-gold-300 shadow-2xl space-y-2.5 sm:space-y-3 animate-in fade-in zoom-in-95 duration-200 z-30 text-left">
                    <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
                      <span className="text-[9px] font-mono text-gold-700 font-bold uppercase tracking-wider">Kombin Parçası</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSpot(null);
                        }}
                        className="text-neutral-400 hover:text-neutral-700 text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex gap-2.5 sm:gap-3 items-center">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-neutral-200 shrink-0 bg-neutral-50">
                        <Image src={spot.image} alt={spot.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-serif text-xs font-bold text-neutral-900 line-clamp-1">
                          {spot.title}
                        </h4>
                        <span className="text-[10px] text-neutral-500 block mt-0.5 line-clamp-1">
                          {spot.material}
                        </span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xs font-bold text-neutral-950">
                            {(spot.salePrice ?? spot.price).toLocaleString("tr-TR")} ₺
                          </span>
                          {spot.salePrice && (
                            <span className="text-[9px] text-neutral-400 line-through">
                              {spot.price.toLocaleString("tr-TR")} ₺
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Butonlar */}
                    <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
                      <button
                        onClick={() => handleQuickAdd(spot)}
                        className={`flex-1 py-1.5 px-3 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                          addedId === spot.id
                            ? "bg-emerald-700 text-white"
                            : "bg-neutral-900 hover:bg-gold-600 text-white shadow"
                        }`}
                      >
                        {addedId === spot.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Sepete Eklendi</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3 h-3" />
                            <span>Sepete Ekle</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/urun/${spot.productSlug}`}
                        className="p-1.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition"
                        title="İncele"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                )}
              </div>
            );
          })}

          {/* Sol Alt Rozet */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/85 backdrop-blur-md border border-neutral-200 text-xs shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-800 font-medium">İmza Kombinler • 3 Parça Yayında</span>
          </div>

        </div>

      </div>
    </section>
  );
}
