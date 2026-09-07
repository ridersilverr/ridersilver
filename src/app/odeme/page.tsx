"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { siteConfig, BankAccount } from "@/config/site";
import { saveOrder } from "@/lib/store";
import { Order, PaymentMethod, ShippingAddress } from "@/types";
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Lock, 
  ArrowLeft 
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("havale_eft");
  const [copiedIban, setCopiedIban] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Verileri
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    email: "",
    city: "İstanbul",
    district: "",
    address: "",
    orderNotes: "",
  });

  // Kredi Kartı Mock Verileri (iyzico hazır)
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const shippingCost = subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.standardShippingCost;
  const isHavale = paymentMethod === "havale_eft";
  const havaleDiscount = isHavale ? Math.round(subtotal * siteConfig.havaleDiscountRate) : 0;
  const totalAmount = subtotal - havaleDiscount + shippingCost;

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 16);
    val = val.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(val);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
      val = val.substring(0, 2) + "/" + val.substring(2, 4);
    }
    setCardExpiry(val);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.district) {
      alert("Lütfen teslimat ve iletişim alanlarını eksiksiz doldurunuz.");
      return;
    }

    if (items.length === 0) {
      alert("Çantanızda ürün bulunmuyor.");
      return;
    }

    setIsSubmitting(true);

    const orderNumber = "SC-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: "ord-" + Date.now(),
      orderNumber,
      createdAt: new Date().toISOString(),
      customer: formData,
      items,
      subtotal,
      discount: havaleDiscount,
      shippingCost,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "credit_card" ? "paid" : "pending",
      orderStatus: "processing",
    };

    saveOrder(newOrder);
    clearCart();

    router.push(`/siparis-tamamlandi?orderId=${orderNumber}&method=${paymentMethod}&total=${totalAmount}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FCFBF9] text-neutral-900 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold">Çantanız Boş</h2>
        <p className="text-xs text-neutral-500 mt-2 mb-6">Ödeme yapmak için çantanıza ürün ekleyin.</p>
        <Link
          href="/katalog"
          className="px-6 py-3 bg-neutral-900 text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-gold-600 transition"
        >
          Kataloğa Git
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Üst Bilgi */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/sepet"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-500 hover:text-gold-700 uppercase tracking-widest mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Çantaya Geri Dön</span>
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight">
              Güvenli Ödeme & Teslimat
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Şifreli</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sol Kolon: Adres ve Ödeme (7 Kolon) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Adım: Teslimat */}
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-3 border-b border-neutral-100 pb-4">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono font-bold">
                  1
                </span>
                <span>Teslimat ve İletişim Detayları</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-bold mb-1">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">Telefon *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">E-Posta *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@mail.com"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">İl *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    <option value="İstanbul">İstanbul</option>
                    <option value="Ankara">Ankara</option>
                    <option value="İzmir">İzmir</option>
                    <option value="Bursa">Bursa</option>
                    <option value="Antalya">Antalya</option>
                    <option value="Diğer">Diğer İl</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-bold mb-1">İlçe *</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="İlçe (Örn: Beşiktaş)"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-bold mb-1">Açık Adres *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Mahalle, cadde, sokak, bina ve daire no..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-bold mb-1">Sipariş / Hediye Notu (İsteğe Bağlı)</label>
                  <input
                    type="text"
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="Özel hediye paketi notunuz veya teslimat talimatınız"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Adım: Ödeme Tercihi */}
            <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
              <h2 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-3 border-b border-neutral-100 pb-4">
                <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs flex items-center justify-center font-mono font-bold">
                  2
                </span>
                <span>Ödeme Yöntemi</span>
              </h2>

              {/* Sekmeler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Havale / EFT */}
                <div
                  onClick={() => setPaymentMethod("havale_eft")}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                    paymentMethod === "havale_eft"
                      ? "border-gold-500 bg-gold-50/60 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-gold-500 text-neutral-950 font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Havale / EFT</h4>
                        <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                          <Sparkles className="w-3 h-3" /> %5 Anında İndirim
                        </span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "havale_eft" ? "border-gold-600 bg-gold-600" : "border-neutral-300"
                    }`}>
                      {paymentMethod === "havale_eft" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>

                {/* Kredi Kartı (iyzico) */}
                <div
                  onClick={() => setPaymentMethod("credit_card")}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${
                    paymentMethod === "credit_card"
                      ? "border-gold-500 bg-gold-50/60 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-neutral-900 text-white font-bold">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Kredi Kartı</h4>
                        <span className="text-[11px] font-mono text-neutral-500 mt-0.5 block">iyzico 3D Secure</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "credit_card" ? "border-gold-600 bg-gold-600" : "border-neutral-300"
                    }`}>
                      {paymentMethod === "credit_card" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* HAVALE BİLGİLERİ */}
              {paymentMethod === "havale_eft" && (
                <div className="p-5 rounded-2xl bg-stone-50 border border-neutral-200 space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-900 font-bold uppercase tracking-wider text-[11px]">
                      Banka Hesaplarımız
                    </span>
                    <span className="text-neutral-500 text-[10px]">{siteConfig.bankAccounts[0].accountHolder}</span>
                  </div>

                  <div className="space-y-3">
                    {siteConfig.bankAccounts.map((acc: BankAccount) => (
                      <div
                        key={acc.id}
                        className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                      >
                        <div>
                          <span className="text-xs font-bold text-neutral-900">{acc.bankName}</span>
                          <code className="text-xs text-neutral-800 font-bold block mt-1 tracking-wider">{acc.iban}</code>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyIban(acc.iban)}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-neutral-100 hover:bg-gold-500 hover:text-white text-neutral-700 transition self-start sm:self-center"
                        >
                          {copiedIban === acc.iban ? "Kopyalandı!" : "IBAN Kopyala"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                    Sipariş tamamlandığında ekranda çıkacak olan <strong>Sipariş Referans Kodunu</strong> havale açıklama kısmına yazmanız yeterlidir.
                  </p>
                </div>
              )}

              {/* KREDİ KARTI IYZICO */}
              {paymentMethod === "credit_card" && (
                <div className="p-5 rounded-2xl bg-stone-50 border border-neutral-200 space-y-5">
                  {/* Kart Önizlemesi */}
                  <div className="max-w-sm mx-auto aspect-[1.58/1] rounded-2xl p-5 bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 text-white shadow-xl flex flex-col justify-between border border-gold-400/40">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
                        {siteConfig.name} PRESTIGE
                      </span>
                      <CreditCard className="w-5 h-5 text-gold-400" />
                    </div>
                    <div className="font-mono text-base tracking-[0.2em] text-neutral-100">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between items-end text-[9px] font-mono text-neutral-300 uppercase">
                      <div>
                        <span>{cardHolder || "AD SOYAD"}</span>
                      </div>
                      <div>
                        <span>{cardExpiry || "AA/YY"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Inputlar */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="col-span-2">
                      <label className="block text-neutral-700 font-bold mb-1">Kart Üzerindeki İsim</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="KART ÜZERİNDEKİ İSİM"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 uppercase focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-neutral-700 font-bold mb-1">Kart Numarası</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-700 font-bold mb-1">SKT</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="AA/YY"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-700 font-bold mb-1">CVV</label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Sağ Kolon: Sipariş Özeti (5 Kolon) */}
          <div className="lg:col-span-5 p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Mücevher Kalemleri ({items.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item, idx) => {
                const activePrice = item.product.salePrice ?? item.product.price;
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-medium text-neutral-900 line-clamp-1">{item.product.title}</p>
                      {item.customDesign ? (
                        <div className="flex items-center gap-1.5 mt-0.5 text-[9px] font-mono">
                          <span className="font-bold text-gold-800 bg-gold-50 px-1 rounded border border-gold-200">
                            [{item.customDesign.plateText}]
                          </span>
                          <span className="text-neutral-500">{item.customDesign.brand}</span>
                        </div>
                      ) : (
                        <span className="font-mono text-[10px] text-neutral-500">Adet: {item.quantity}</span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-neutral-950">
                      {(activePrice * item.quantity).toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-neutral-100 pt-4 space-y-2.5 text-xs font-mono text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-500">Ara Toplam:</span>
                <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
              </div>

              {isHavale && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Havale / EFT İndirimi (%5):</span>
                  <span>-{havaleDiscount.toLocaleString("tr-TR")} ₺</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-500">Sigortalı Kargo:</span>
                <span>
                  {shippingCost === 0 ? <strong className="text-emerald-700">Ücretsiz</strong> : `${shippingCost} ₺`}
                </span>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-neutral-900">Ödenecek Tutar:</span>
                <span className="font-mono text-2xl font-bold text-neutral-950">
                  {totalAmount.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-neutral-900 hover:bg-gold-600 text-white rounded-full font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? "Sipariş Oluşturuluyor..." : "Siparişi Onayla ve Tamamla"}</span>
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}
