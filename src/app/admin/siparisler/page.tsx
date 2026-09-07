"use client";

import React, { useEffect, useState } from "react";
import { getLocalOrders, updateOrderStatus, shipOrder } from "@/lib/store";
import { Order } from "@/types";
import { 
  ShoppingBag, 
  Building2, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  MapPin, 
  Phone, 
  Mail,
  Copy,
  Check,
  X,
  Sparkles,
  AlertCircle,
  ExternalLink,
  PackageCheck,
  ChevronDown
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "processing" | "shipped">("all");

  // Kargo Modal Durumu
  const [shippingModalOrder, setShippingModalOrder] = useState<Order | null>(null);
  const [trackingCompany, setTrackingCompany] = useState("Yurtiçi Kargo");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSubmittingShipping, setIsSubmittingShipping] = useState(false);

  useEffect(() => {
    const list = getLocalOrders();
    setOrders(list);
  }, []);

  const handleStatusChange = (orderId: string, status: Order["orderStatus"]) => {
    updateOrderStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
  };

  const handleOpenShippingModal = (order: Order) => {
    setShippingModalOrder(order);
    setTrackingCompany(order.trackingCompany || "Yurtiçi Kargo");
    setTrackingNumber(order.trackingNumber || "");
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingModalOrder) return;
    if (!trackingNumber.trim()) {
      alert("Lütfen kargo takip numarasını giriniz.");
      return;
    }

    setIsSubmittingShipping(true);
    shipOrder(shippingModalOrder.id, trackingCompany, trackingNumber.trim());

    setOrders((prev) =>
      prev.map((o) =>
        o.id === shippingModalOrder.id
          ? {
              ...o,
              orderStatus: "shipped",
              trackingCompany,
              trackingNumber: trackingNumber.trim(),
            }
          : o
      )
    );

    setIsSubmittingShipping(false);
    setShippingModalOrder(null);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);

    if (activeFilter === "pending") return matchesSearch && o.paymentMethod === "havale_eft" && o.orderStatus === "processing";
    if (activeFilter === "processing") return matchesSearch && o.orderStatus === "processing";
    if (activeFilter === "shipped") return matchesSearch && o.orderStatus === "shipped";
    return matchesSearch;
  });

  const pendingCount = orders.filter((o) => o.paymentMethod === "havale_eft" && o.orderStatus === "processing").length;
  const processingCount = orders.filter((o) => o.orderStatus === "processing").length;
  const shippedCount = orders.filter((o) => o.orderStatus === "shipped").length;

  return (
    <div className="space-y-6 animate-admin-fade">
      
      {/* 1. Üst Başlık & Eylem Çubuğu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold mb-1">
            <ShoppingBag className="w-4 h-4 text-gold-600" />
            <span>Sevkiyat & Müşteri Siparişleri</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Sipariş Yönetimi
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Toplam <strong className="text-neutral-900 font-bold">{orders.length} sipariş</strong> bulunmaktadır. Havale onaylarını yapabilir ve kargo takip numarası girebilirsiniz.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span>{pendingCount} Havale Onayı Bekliyor</span>
          </div>
        )}
      </div>

      {/* 2. Filtre Sekmeleri ve Arama */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Durum Sekmeleri */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeFilter === "all"
                ? "bg-white text-neutral-950 shadow-sm scale-[1.02]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Tümü ({orders.length})
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeFilter === "pending"
                ? "bg-amber-500 text-neutral-950 shadow-sm scale-[1.02]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Havale Bekleyen ({pendingCount})
          </button>
          <button
            onClick={() => setActiveFilter("processing")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeFilter === "processing"
                ? "bg-blue-600 text-white shadow-sm scale-[1.02]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Hazırlanan ({processingCount})
          </button>
          <button
            onClick={() => setActiveFilter("shipped")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeFilter === "shipped"
                ? "bg-emerald-600 text-white shadow-sm scale-[1.02]"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            Kargoda ({shippedCount})
          </button>
        </div>

        {/* Arama Input */}
        <div className="relative flex-1 max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xs flex items-center px-4 py-2.5">
          <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sipariş no, müşteri adı veya telefon..."
            className="w-full text-xs text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")} 
              className="p-1 text-neutral-400 hover:text-neutral-700 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* 3. Sipariş Listesi (Modern Kart Tasarımı) */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-neutral-200 text-center text-xs text-neutral-500 space-y-2 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" />
          <p className="font-bold text-neutral-800 text-sm">Filtreye uygun sipariş bulunamadı.</p>
          <p>Arama kriterlerinizi değiştirebilir veya diğer sekmeleri inceleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="group bg-white p-6 sm:p-7 rounded-3xl border border-neutral-200 hover:border-gold-300 shadow-sm hover:shadow-lg transition-all duration-300 space-y-5 text-xs"
            >
              {/* Üst Bilgi Barı */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base sm:text-lg font-bold text-neutral-950">
                    #{order.orderNumber}
                  </span>
                  <span className="text-neutral-400 text-xs font-mono">
                    {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {order.paymentMethod === "havale_eft" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 font-mono">
                      <Building2 className="w-3.5 h-3.5 text-amber-600" />
                      Havale / EFT (%5 İndirimli)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 font-mono">
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      Kredi Kartı
                    </span>
                  )}

                  <span className="font-serif text-lg font-bold text-neutral-950">
                    {order.totalAmount.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              {/* Müşteri & Sipariş Kalemleri */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Müşteri Bilgileri (5 Kolon) */}
                <div className="lg:col-span-5 bg-neutral-50/80 p-5 rounded-2xl border border-neutral-100 space-y-2">
                  <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 tracking-wider block">
                    Alıcı & Teslimat Bilgileri
                  </span>
                  <p className="font-bold text-neutral-900 text-sm">{order.customer.fullName}</p>
                  
                  <div className="flex items-center gap-2 text-neutral-600 font-mono">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{order.customer.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-neutral-600 font-mono">
                    <Mail className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{order.customer.email}</span>
                  </div>

                  <div className="flex items-start gap-2 text-neutral-600 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                    <span>{order.customer.address}, {order.customer.district} / {order.customer.city}</span>
                  </div>

                  {order.customer.tcNumber && (
                    <div className="text-[11px] text-neutral-500 font-mono pt-1">
                      TC Kimlik: <strong>{order.customer.tcNumber}</strong>
                    </div>
                  )}
                </div>

                {/* Sepet Kalemleri (7 Kolon) */}
                <div className="lg:col-span-7 space-y-2">
                  <span className="text-[10px] uppercase font-mono font-bold text-neutral-400 tracking-wider block">
                    Sipariş Edilen Tasarımlar ({order.items.length})
                  </span>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-neutral-100 hover:border-neutral-200 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center font-mono font-bold text-neutral-600 text-xs">
                            {item.quantity}x
                          </span>
                          <div>
                            <span className="font-serif font-semibold text-neutral-900 block">
                              {item.product.title}
                            </span>
                            {item.selectedSize && (
                              <span className="text-[10px] text-neutral-400 font-mono">
                                Boyut: {item.selectedSize}
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="font-mono font-bold text-neutral-900">
                          {((item.product.salePrice ?? item.product.price) * item.quantity).toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Kargo Bilgisi / Takip Numarası Rozeti */}
                  {order.trackingNumber && (
                    <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-700" />
                        <span className="font-mono text-emerald-900 font-semibold">
                          {order.trackingCompany}: <strong>{order.trackingNumber}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(order.trackingNumber || "")}
                        className="flex items-center gap-1 text-[11px] font-mono text-emerald-800 hover:text-emerald-950 font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs transition"
                      >
                        {copiedCode === order.trackingNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCode === order.trackingNumber ? "Kopyalandı" : "Kopyala"}</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Alt Eylem Butonları */}
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-mono text-[11px]">Durum:</span>
                  <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                    order.orderStatus === "shipped"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : order.orderStatus === "delivered"
                      ? "bg-green-100 text-green-800 border border-green-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}>
                    {order.orderStatus === "shipped" ? "Kargoda" : order.orderStatus === "delivered" ? "Teslim Edildi" : "Hazırlanıyor"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {order.paymentMethod === "havale_eft" && order.orderStatus === "processing" && (
                    <button
                      onClick={() => handleStatusChange(order.id, "confirmed")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-mono text-xs transition shadow-xs"
                    >
                      ✓ Havaleyi Onayla
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenShippingModal(order)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-gold-600 text-white rounded-xl font-bold font-mono text-xs transition shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{order.trackingNumber ? "Kargo Bilgisini Düzenle" : "Kargoya Ver"}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 4. KARGO TAKİP NUMARASI GİRİŞ MODALI */}
      {shippingModalOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 text-gold-700 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-neutral-900">
                    Kargo Takip Bilgisi
                  </h3>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    #{shippingModalOrder.orderNumber}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShippingModalOrder(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveShipping} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-neutral-900 font-bold mb-1.5">Kargo Şirketi</label>
                <select
                  value={trackingCompany}
                  onChange={(e) => setTrackingCompany(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 shadow-xs cursor-pointer font-medium"
                >
                  <option value="Yurtiçi Kargo">Yurtiçi Kargo</option>
                  <option value="Aras Kargo">Aras Kargo</option>
                  <option value="MNG Kargo">MNG Kargo</option>
                  <option value="Sürat Kargo">Sürat Kargo</option>
                  <option value="PTT Kargo">PTT Kargo</option>
                  <option value="Kolay Gelsin">Kolay Gelsin</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-900 font-bold mb-1.5">Kargo Takip Numarası *</label>
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Örn: 245901847192"
                  className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 font-mono shadow-xs font-bold tracking-wider"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Bu numara kaydedildiğinde sipariş durumu otomatik olarak <strong>Kargoda</strong> yapılacak ve müşterinin ekranına yansıyacaktır.</span>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShippingModalOrder(null)}
                  className="px-5 py-2.5 rounded-2xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-bold transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingShipping}
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-gold-600 text-white font-bold rounded-2xl transition shadow-sm"
                >
                  {isSubmittingShipping ? "Kaydediliyor..." : "Kaydet ve Kargola"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
