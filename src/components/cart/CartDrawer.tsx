"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Sparkles, 
  ShieldCheck 
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingProgress,
    remainingForFreeShipping,
  } = useCart();

  if (!isCartOpen) return null;

  const havaleTotal = subtotal * (1 - siteConfig.havaleDiscountRate);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Karartılmış Arka Plan */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white text-neutral-900 shadow-2xl flex flex-col border-l border-neutral-200">
          
          {/* Çekmece Başlığı */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center text-gold-700">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-base font-bold text-neutral-900">
                  Alışveriş Çantam
                </h2>
                <span className="text-[10px] font-mono text-neutral-500">
                  {items.length} Mücevher Parçası
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Kargo İlerleme Çubuğu */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs font-medium text-amber-950 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-gold-700" />
                {remainingForFreeShipping > 0 ? (
                  <>
                    Ücretsiz Kargo için <strong className="text-gold-800">{remainingForFreeShipping.toLocaleString('tr-TR')} ₺</strong> kaldı
                  </>
                ) : (
                  <strong className="text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Kargo Bedava!
                  </strong>
                )}
              </span>
              <span className="font-bold text-gold-800">%{freeShippingProgress}</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gold-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Sepet İçeriği */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-50 border border-neutral-200 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">Çantanız Boş</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs font-light">
                    Koleksiyonumuzdaki el yapımı özel mücevherleri hemen keşfedin.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-mono font-bold uppercase tracking-wider bg-neutral-900 text-white px-6 py-2.5 rounded-full hover:bg-gold-600 transition"
                >
                  Kataloğu Keşfet
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const activePrice = item.product.salePrice ?? item.product.price;
                const itemKey = item.id || `${item.product.id}-${idx}`;
                return (
                  <div key={itemKey} className="pt-4 first:pt-0 flex gap-3.5">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/urun/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-xs font-bold text-neutral-900 hover:text-gold-600 line-clamp-2 leading-snug"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id || item.product.id)}
                            className="text-neutral-400 hover:text-rose-600 transition p-1"
                            title="Kaldır"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.customDesign ? (
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="px-1.5 py-0.5 rounded-md bg-gold-100 text-gold-900 border border-gold-300 text-[9px] font-mono font-bold">
                                Plaka: {item.customDesign.plateText}
                              </span>
                              <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-800 text-[9px] font-mono">
                                {item.customDesign.brand}
                              </span>
                            </div>
                            {item.customDesign.backText && (
                              <p className="text-[9px] text-neutral-500 font-mono italic truncate">
                                Arka: {item.customDesign.backText}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-[10px] text-neutral-500 mt-0.5">
                            {item.selectedMaterial || item.product.material}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Miktar */}
                        <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50">
                          <button
                            onClick={() => updateQuantity(item.id || item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-200 text-neutral-600 transition rounded-l-xl"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-mono font-bold text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id || item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-200 text-neutral-600 transition rounded-r-xl"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Fiyat */}
                        <div className="text-right">
                          <span className="font-mono text-xs font-bold text-neutral-950">
                            {(activePrice * item.quantity).toLocaleString('tr-TR')} ₺
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Alt Özet */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-stone-50 space-y-3">
              
              {/* Havale İndirim Fırsatı */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 flex items-center justify-between text-xs font-mono text-emerald-900">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Havale ile %5 İndirimli:
                </span>
                <span className="font-bold text-emerald-700 text-sm">
                  {havaleTotal.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              {/* Ara Toplam */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">Ara Toplam:</span>
                <span className="font-bold text-base text-neutral-950">
                  {subtotal.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              {/* Aksiyon Butonları */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/odeme"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-gold-600 text-white font-mono font-bold py-3.5 rounded-full transition shadow-md text-xs tracking-wider uppercase"
                >
                  <span>Siparişi Tamamla</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/sepet"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center text-[11px] font-mono uppercase tracking-wider text-neutral-600 hover:text-gold-700 py-1 transition"
                >
                  Sepet Detayını Görüntüle
                </Link>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Şifreleme ile Güvenli Alışveriş</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
