"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { Star, ShoppingBag, Check, Sparkles, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : ["/images/custom/helmet-racing.png"];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[activeImageIndex] || images[0];

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!hasMultipleImages) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultipleImages) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -35) {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const activePrice = product.salePrice ?? product.price;
  const havalePrice = activePrice * (1 - siteConfig.havaleDiscountRate);

  return (
    <div
      className="group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-neutral-200/90 hover:border-gold-400 hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Görsel Alanı (Sağa-Sola Kayan Slider Efekti) */}
      <Link 
        href={`/urun/${product.slug}`} 
        className="relative aspect-square w-full overflow-hidden bg-neutral-50 block"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${activeImageIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0 flex-none aspect-square">
              <Image
                src={img}
                alt={`${product.title} - Görsel ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center transition-all duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>

        {/* Sağa / Sola Görsel Geçiş Butonları */}
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Önceki Görsel"
              className="absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-90 z-20"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Sonraki Görsel"
              className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 hover:text-gold-700 shadow-md backdrop-blur-xs flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-105 active:scale-90 z-20"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Görsel Sayacı (Sağ Üst) */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900/75 backdrop-blur-sm text-white text-[8px] sm:text-[9px] font-mono font-bold z-10 pointer-events-none">
              <span>{activeImageIndex + 1}/{images.length}</span>
            </div>

            {/* Nokta Göstergeleri (Alt Orta) */}
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900/40 backdrop-blur-xs transition-opacity duration-300 sm:group-hover:opacity-0 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                  aria-label={`Görsel ${idx + 1}`}
                  className={`h-1 sm:h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx
                      ? "w-3 sm:w-4 bg-gold-400"
                      : "w-1 sm:w-1.5 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Rozetler (Üst Sol) */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-neutral-900/90 text-gold-300 backdrop-blur-md text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-gold-400/30 shadow-2xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[8px] sm:text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full shadow-2xs">
              %{discountPercent} İNDİRİM
            </span>
          )}
        </div>

        {/* Masaüstü Hızlı Ekle Butonu (Hover ile açılır) */}
        <div className="hidden sm:flex absolute inset-x-3 bottom-3 items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900/95 hover:bg-gold-600 text-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Eklendi</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Hızlı Ekle</span>
              </>
            )}
          </button>
        </div>

        {/* Mobil Dokunmatik Hızlı Ekle İkonu (Dokunmatik ekranlar için her zaman görünür) */}
        <button
          onClick={handleQuickAdd}
          aria-label="Sepete Ekle"
          className={`sm:hidden absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md active:scale-90 transition z-20 ${
            isAdded ? "bg-emerald-600 text-white" : "bg-neutral-900/90 text-white active:bg-gold-600"
          }`}
        >
          {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </Link>

      {/* Bilgiler ve Fiyat */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div>
          {/* Materyal ve Değerlendirme */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider mb-1">
            <span className="line-clamp-1">{product.material}</span>
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-0.5 sm:gap-1 text-gold-600 font-semibold shrink-0">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-gold-500 text-gold-500" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Model Adı */}
          <Link href={`/urun/${product.slug}`} className="block">
            <h3 className="font-serif text-xs sm:text-sm font-medium text-neutral-900 hover:text-gold-600 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Fiyat ve Havale Avantajı */}
        <div className="pt-2 border-t border-neutral-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-mono text-xs sm:text-base font-bold text-neutral-950">
                {activePrice.toLocaleString("tr-TR")} ₺
              </span>
              {product.salePrice && (
                <span className="font-mono text-[10px] sm:text-xs text-neutral-400 line-through">
                  {product.price.toLocaleString("tr-TR")} ₺
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-emerald-700 font-semibold block mt-0.5 line-clamp-1">
              Havale: {havalePrice.toLocaleString("tr-TR")} ₺
            </span>
          </div>

          <div className="hidden sm:flex w-7 h-7 rounded-full bg-neutral-100 items-center justify-center text-neutral-400 group-hover:text-gold-600 group-hover:bg-gold-50 transition-colors">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
