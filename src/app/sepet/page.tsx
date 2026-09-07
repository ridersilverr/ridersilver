"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Tag 
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    freeShippingProgress,
    remainingForFreeShipping,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const shippingCost = subtotal >= siteConfig.freeShippingThreshold || subtotal === 0 ? 0 : siteConfig.standardShippingCost;
  const grandTotal = Math.max(0, subtotal - couponDiscount) + shippingCost;
  const havaleTotal = (Math.max(0, subtotal - couponDiscount)) * (1 - siteConfig.havaleDiscountRate) + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (couponCode.trim().toUpperCase() === "SIMCILA10") {
      const disc = Math.round(subtotal * 0.1);
      setCouponDiscount(disc);
      setCouponSuccess("Tebrikler! %10 Mücevher kuponu uygulandı.");
    } else {
      setCouponError("Geçersiz veya süresi dolmuş kupon kodu. (Denemek için: SIMCILA10)");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FCFBF9] text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-400 mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-2xl font-bold">Alışveriş Çantanız Boş</h1>
        <p className="text-xs text-neutral-500 mt-2 max-w-sm font-light">
          Koleksiyonumuzdaki el işçiliği mücevher parçalarını keşfederek çantanızı doldurabilirsiniz.
        </p>
        <Link
          href="/katalog"
          className="mt-6 px-8 py-3.5 bg-neutral-900 hover:bg-gold-600 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-md transition"
        >
          Koleksiyonu Keşfet
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight mb-10">
          Alışveriş Çantası <span className="text-gold-700 font-mono text-xl">({items.length} Parça)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sol: Ürün Listesi */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Ücretsiz Kargo İlerlemesi */}
            <div className="p-5 rounded-3xl bg-white border border-neutral-200 shadow-xs space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-700">
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold-700" />
                  {remainingForFreeShipping > 0 ? (
                    <>Ücretsiz kargoya <strong>{remainingForFreeShipping.toLocaleString('tr-TR')} ₺</strong> kaldı.</>
                  ) : (
                    <strong className="text-emerald-700">Tebrikler! Kargonuz sigortalı ve ücretsizdir.</strong>
                  )}
                </span>
                <span className="font-bold text-gold-800">%{freeShippingProgress}</span>
              </div>
              <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gold-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Ürün Kartları */}
            <div className="rounded-3xl bg-white border border-neutral-200 divide-y divide-neutral-100 overflow-hidden shadow-xs">
              {items.map((item, idx) => {
                const activePrice = item.product.salePrice ?? item.product.price;
                return (
                  <div key={`${item.product.id}-${idx}`} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <Link
                        href={`/urun/${item.product.slug}`}
                        className="font-serif text-base font-bold text-neutral-900 hover:text-gold-600 transition line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      {item.customDesign ? (
                        <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-gold-100 text-gold-900 border border-gold-300 text-[10px] font-mono font-bold">
                            Plaka: {item.customDesign.plateText}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-800 text-[10px] font-mono">
                            {item.customDesign.brand}
                          </span>
                          {item.customDesign.backText && (
                            <span className="text-[10px] font-mono text-neutral-500 italic">
                              Arka: &ldquo;{item.customDesign.backText}&rdquo;
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-[11px] font-mono text-neutral-500 mt-1">
                          {item.selectedMaterial || item.product.material} • Ölçü: {item.selectedSize || "Standart"}
                        </p>
                      )}
                      <div className="mt-2 text-xs font-mono font-bold text-neutral-900 sm:hidden">
                        {(activePrice * item.quantity).toLocaleString("tr-TR")} ₺
                      </div>
                    </div>

                    {/* Miktar */}
                    <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-neutral-600 hover:bg-white transition rounded-l-xl"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-neutral-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-neutral-600 hover:bg-white transition rounded-r-xl"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Fiyat */}
                    <div className="hidden sm:block text-right min-w-[120px]">
                      <span className="text-base font-mono font-bold text-neutral-950 block">
                        {(activePrice * item.quantity).toLocaleString("tr-TR")} ₺
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        Adet: {activePrice.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-neutral-400 hover:text-rose-600 transition"
                      title="Kaldır"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Alt Eylemler */}
            <div className="flex justify-between items-center text-xs font-mono pt-2">
              <Link href="/katalog" className="text-neutral-600 hover:text-gold-700">
                ← Alışverişe Devam Et
              </Link>
              <button
                onClick={clearCart}
                className="text-neutral-400 hover:text-rose-600 transition"
              >
                Çantayı Boşalt
              </button>
            </div>

          </div>

          {/* Sağ: Sipariş Özeti */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Çanta Özeti
            </h3>

            {/* Kupon Kodu */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-mono text-neutral-700 font-semibold flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gold-600" />
                İndirim Kuponu
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Kupon Kodunuz"
                  className="flex-1 px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-mono uppercase text-neutral-900 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-gold-600 text-white rounded-xl text-xs font-mono font-bold uppercase transition"
                >
                  Uygula
                </button>
              </div>
              {couponError && <p className="text-[11px] font-mono text-rose-600">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] font-mono text-emerald-700">{couponSuccess}</p>}
            </form>

            {/* Tutar Dökümü */}
            <div className="space-y-3 text-xs font-mono text-neutral-700 border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-500">Ara Toplam:</span>
                <span className="text-neutral-900 font-bold">{subtotal.toLocaleString("tr-TR")} ₺</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Kupon İndirimi (%10):</span>
                  <span>-{couponDiscount.toLocaleString("tr-TR")} ₺</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-500">Kargo Bedeli:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-700">Ücretsiz</strong>
                  ) : (
                    `${shippingCost} ₺`
                  )}
                </span>
              </div>

              {/* Havale İndirim Fırsatı */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-700" />
                    Havale / EFT Tutarı:
                  </span>
                  <span className="text-sm text-emerald-800">{havaleTotal.toLocaleString("tr-TR")} ₺</span>
                </div>
                <p className="text-[10px] text-amber-900 font-light">
                  Havale/EFT seçildiğinde anında %5 ek indirim uygulanır!
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Toplam Tutar:</span>
                <span className="font-mono text-2xl font-bold text-neutral-950">
                  {grandTotal.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>

            {/* Ödemeye Geç Butonu */}
            <Link
              href="/odeme"
              className="w-full flex items-center justify-center gap-2 py-4 bg-neutral-900 hover:bg-gold-600 text-white rounded-full font-mono font-bold text-xs uppercase tracking-wider shadow-md transition"
            >
              <span>Ödemeye Geç</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Şifreli Güvenli Aşama</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
