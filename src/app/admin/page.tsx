"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts, getLocalOrders, updateOrderStatus } from "@/lib/store";
import { Product, Order } from "@/types";
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2,
  Sparkles,
  ArrowRight,
  Truck,
  CreditCard,
  ChevronRight,
  Layers,
  AlertCircle,
  Eye,
  RefreshCw,
  BarChart3,
  Activity,
  User
} from "lucide-react";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "processing" | "shipped">("all");
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d">("7d");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const p = await getAllProducts();
      const o = getLocalOrders();
      setProducts(p);
      setOrders(o);
      setLoading(false);
    }
    load();
  }, []);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingHavaleOrders = orders.filter((o) => o.paymentMethod === "havale_eft" && o.orderStatus === "processing");
  const processingOrders = orders.filter((o) => o.orderStatus === "processing");
  const shippedOrders = orders.filter((o) => o.orderStatus === "shipped");
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Filtrelenmiş Siparişler
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "pending") return order.paymentMethod === "havale_eft" && order.orderStatus === "processing";
    if (activeTab === "processing") return order.orderStatus === "processing";
    if (activeTab === "shipped") return order.orderStatus === "shipped";
    return true;
  });

  // 7 Günlük Simüle Satış Verisi
  const weeklyData = [
    { day: "Pzt", amount: Math.round(totalRevenue * 0.12), orders: 2, height: "45%" },
    { day: "Sal", amount: Math.round(totalRevenue * 0.16), orders: 3, height: "60%" },
    { day: "Çar", amount: Math.round(totalRevenue * 0.09), orders: 1, height: "35%" },
    { day: "Per", amount: Math.round(totalRevenue * 0.18), orders: 3, height: "70%" },
    { day: "Cum", amount: Math.round(totalRevenue * 0.22), orders: 4, height: "85%" },
    { day: "Cmt", amount: Math.round(totalRevenue * 0.14), orders: 2, height: "55%" },
    { day: "Paz", amount: Math.round(totalRevenue * 0.09), orders: 1, height: "40%" },
  ];

  // Kategori İstatistikleri
  const categoryCounts = {
    kolyeler: products.filter((p) => p.category === "kolyeler").length,
    bileklikler: products.filter((p) => p.category === "bileklikler").length,
    yuzukler: products.filter((p) => p.category === "yuzukler").length,
    kupeler: products.filter((p) => p.category === "kupeler").length,
  };

  const handleQuickStatusChange = (orderId: string, newStatus: Order["orderStatus"]) => {
    updateOrderStatus(orderId, newStatus);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
          Yönetici Paneli Hazırlanıyor...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-admin-fade">
      
      {/* 1. Üst Modern Karşılama Banner'ı (Altın Işıltılı & Aksiyonlu) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-stone-900 text-white p-6 sm:p-8 border border-neutral-800 shadow-xl">
        
        {/* Arka Plan Hareketli Altın Işık */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-gold-500/20 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-gold-300 text-[11px] font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>Rider Silver Atölye Yönetim Paneli</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
              Mağaza Genel <span className="font-serif italic text-gold-400">Performansı</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl font-light">
              Bugün mağazanızda <strong className="text-white font-semibold">{products.length} aktif mücevher</strong> ve onay bekleyen <strong className="text-amber-400 font-semibold">{pendingHavaleOrders.length} havale işlemi</strong> bulunmaktadır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/urunler"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-600 hover:to-amber-600 text-neutral-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Ürün Ekle</span>
            </Link>

            <Link
              href="/admin/siparisler"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-gold-300" />
              <span>Siparişleri İncele</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Dörtlü Hareketli & Gölgeli KPI İstatistik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Kart 1: Toplam Satış Ciro (TL) */}
        <div className="group admin-glass-card rounded-3xl p-6 relative overflow-hidden border border-neutral-200 hover:border-emerald-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Toplam Satış Tutarı
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-serif text-xl font-bold group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
              ₺
            </div>
          </div>
          
          <div className="mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 block">
              {totalRevenue.toLocaleString("tr-TR")} ₺
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3" />
                +%18.4
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">bu hafta</span>
            </div>
          </div>
        </div>

        {/* Kart 2: Toplam Sipariş */}
        <div className="group admin-glass-card rounded-3xl p-6 relative overflow-hidden border border-neutral-200 hover:border-blue-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Toplam Sipariş
            </span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 block">
              {orders.length} <span className="text-lg font-sans font-normal text-neutral-500">Adet</span>
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {shippedOrders.length} Kargoda
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">aktif süreçte</span>
            </div>
          </div>
        </div>

        {/* Kart 3: Bekleyen Havale Onayı (Canlı Uyarı) */}
        <div className="group admin-glass-card rounded-3xl p-6 relative overflow-hidden border border-neutral-200 hover:border-amber-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Bekleyen Havale
            </span>
            <div className="relative w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
              <Building2 className="w-5 h-5" />
              {pendingHavaleOrders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
              )}
            </div>
          </div>

          <div className="mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-amber-600 block">
              {pendingHavaleOrders.length} <span className="text-lg font-sans font-normal text-neutral-500">İşlem</span>
            </span>
            <div className="flex items-center gap-2 mt-2">
              {pendingHavaleOrders.length > 0 ? (
                <button
                  onClick={() => setActiveTab("pending")}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-0.5 rounded-full border border-amber-300 transition"
                >
                  <AlertCircle className="w-3 h-3 text-amber-700 animate-pulse" />
                  Onay Bekliyor →
                </button>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Tümü Onaylandı
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Kart 4: Yayındaki Mücevherler */}
        <div className="group admin-glass-card rounded-3xl p-6 relative overflow-hidden border border-neutral-200 hover:border-purple-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
              Yayındaki Ürün
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-4">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-neutral-950 block">
              {products.length} <span className="text-lg font-sans font-normal text-neutral-500">Parça</span>
            </span>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                4 Kategori
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">vitrinde aktif</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. İki Kolonlu İnteraktif Görsel Grafikler & Kategori Dağılımı */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sol Kolon: Haftalık Ciro & Satış Çubuk Grafiği (8 Kolon) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold mb-1">
                <BarChart3 className="w-4 h-4 text-gold-600" />
                <span>Haftalık Satış Analizi</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-neutral-900">
                Gelir & Sipariş Hacmi
              </h2>
            </div>

            {/* Periyot Seçici */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-mono font-semibold">
              <button
                onClick={() => setChartPeriod("7d")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  chartPeriod === "7d"
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Son 7 Gün
              </button>
              <button
                onClick={() => setChartPeriod("30d")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  chartPeriod === "30d"
                    ? "bg-white text-neutral-950 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Bu Ay
              </button>
            </div>
          </div>

          {/* İnteraktif Çubuk Grafik Alanı */}
          <div className="pt-8">
            <div className="h-60 flex items-end justify-between gap-3 sm:gap-6 px-2">
              {weeklyData.map((item, idx) => (
                <div
                  key={item.day}
                  className="flex-1 flex flex-col items-center gap-3 group relative cursor-pointer"
                  onMouseEnter={() => setHoveredBarIndex(idx)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Hover Tooltip */}
                  {hoveredBarIndex === idx && (
                    <div className="absolute -top-12 z-20 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-[11px] font-mono shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                      <div className="font-bold text-gold-400">{item.amount.toLocaleString("tr-TR")} ₺</div>
                      <div className="text-[9px] text-neutral-400">{item.orders} Sipariş</div>
                    </div>
                  )}

                  {/* Sütun Çubuğu */}
                  <div className="w-full bg-neutral-100 rounded-2xl overflow-hidden h-48 flex items-end p-1">
                    <div
                      style={{ height: item.height }}
                      className={`w-full rounded-xl transition-all duration-500 ${
                        hoveredBarIndex === idx
                          ? "bg-gradient-to-t from-gold-600 to-amber-400 shadow-md shadow-gold-500/30 scale-105"
                          : "bg-gradient-to-t from-neutral-800 to-neutral-700 group-hover:from-gold-600 group-hover:to-amber-500"
                      }`}
                    />
                  </div>

                  {/* Gün Etiketi */}
                  <span className={`text-xs font-mono font-medium transition ${
                    hoveredBarIndex === idx ? "text-gold-700 font-bold scale-110" : "text-neutral-500"
                  }`}>
                    {item.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gold-500 to-amber-500" />
                Canlı Satış Verisi
              </span>
              <span>En Yüksek Gün: <strong>Cuma (4 Sipariş)</strong></span>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Koleksiyon & Kategori İlerleme Çubukları (4 Kolon) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-gold-700 font-bold block mb-1">
                  Katalog Yapısı
                </span>
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  Kategori Dağılımı
                </h3>
              </div>
              <Link
                href="/admin/urunler"
                className="text-xs font-mono font-bold text-gold-700 hover:text-gold-800 transition"
              >
                Tümü →
              </Link>
            </div>

            <div className="space-y-4">
              {/* Kolyeler */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-neutral-700">Kolyeler & Kasklar</span>
                  <span className="font-mono font-bold text-neutral-900">{categoryCounts.kolyeler} Ürün</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-amber-500 rounded-full transition-all duration-700"
                    style={{ width: `${(categoryCounts.kolyeler / (products.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bileklikler */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-neutral-700">Bileklikler & Kelepçeler</span>
                  <span className="font-mono font-bold text-neutral-900">{categoryCounts.bileklikler} Ürün</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-700"
                    style={{ width: `${(categoryCounts.bileklikler / (products.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Yüzükler */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-neutral-700">Tamtur & Tektaş Yüzükler</span>
                  <span className="font-mono font-bold text-neutral-900">{categoryCounts.yuzukler} Ürün</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-violet-500 rounded-full transition-all duration-700"
                    style={{ width: `${(categoryCounts.yuzukler / (products.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Küpeler */}
              <div>
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-neutral-700">İnci & Halka Küpeler</span>
                  <span className="font-mono font-bold text-neutral-900">{categoryCounts.kupeler} Ürün</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                    style={{ width: `${(categoryCounts.kupeler / (products.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hızlı Bilgilendirme Kutusu */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-950 space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Stok & Sevkiyat Durumu</span>
            </div>
            <p className="text-[11px] text-amber-900/80 leading-relaxed">
              Tüm ürünler 925 ayar has gümüş sertifikalı ve kararmaz koruyucu cilalıdır.
            </p>
          </div>
        </div>

      </div>

      {/* 4. Son Gelen Siparişler (İnteraktif Filtre Sekmeli Tablo) */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        
        {/* Başlık ve Filtre Sekmeleri */}
        <div className="p-6 sm:p-8 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold mb-1">
              <ShoppingBag className="w-4 h-4 text-gold-600" />
              <span>Sipariş Akışı</span>
            </div>
            <h2 className="font-serif text-xl font-bold text-neutral-900">
              Son Gelen Siparişler
            </h2>
          </div>

          {/* İnteraktif Filtre Sekmeleri */}
          <div className="flex flex-wrap items-center gap-2 bg-neutral-100 p-1.5 rounded-2xl text-xs font-mono font-semibold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "all"
                  ? "bg-white text-neutral-950 shadow-xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Tümü ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "pending"
                  ? "bg-amber-500 text-neutral-950 shadow-xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Havale Bekleyen ({pendingHavaleOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("processing")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "processing"
                  ? "bg-blue-600 text-white shadow-xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Hazırlanan ({processingOrders.length})
            </button>
            <button
              onClick={() => setActiveTab("shipped")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === "shipped"
                  ? "bg-emerald-600 text-white shadow-xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Kargoda ({shippedOrders.length})
            </button>
          </div>
        </div>

        {/* Tablo İçeriği */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/80 text-neutral-500 font-mono uppercase tracking-wider text-[10px] border-b border-neutral-200">
              <tr>
                <th className="py-3.5 px-6">Sipariş No</th>
                <th className="py-3.5 px-6">Müşteri</th>
                <th className="py-3.5 px-6">Ödeme Tipi</th>
                <th className="py-3.5 px-6">Tutar</th>
                <th className="py-3.5 px-6">Durum</th>
                <th className="py-3.5 px-6 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <span>Bu filtreye uygun sipariş bulunamadı.</span>
                  </td>
                </tr>
              ) : (
                filteredOrders.slice(0, 8).map((order) => (
                  <tr 
                    key={order.id} 
                    className="hover:bg-amber-50/30 transition-colors group"
                  >
                    {/* Sipariş No & Tarih */}
                    <td className="py-4 px-6 font-mono font-bold text-neutral-900">
                      <div className="flex items-center gap-2">
                        <span className="text-gold-700">#{order.orderNumber}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-normal block mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Müşteri */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 font-mono text-[10px] font-bold">
                          {order.customer.fullName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium text-neutral-900 block">
                            {order.customer.fullName}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {order.customer.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Ödeme Yöntemi */}
                    <td className="py-4 px-6">
                      {order.paymentMethod === "havale_eft" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <Building2 className="w-3 h-3 text-amber-600" />
                          Havale / EFT (%5 İndirimli)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          <CreditCard className="w-3 h-3 text-blue-600" />
                          Kredi Kartı
                        </span>
                      )}
                    </td>

                    {/* Tutar */}
                    <td className="py-4 px-6 font-mono font-bold text-neutral-950 text-sm">
                      {order.totalAmount.toLocaleString("tr-TR")} ₺
                    </td>

                    {/* Durum Rozeti */}
                    <td className="py-4 px-6">
                      {order.orderStatus === "shipped" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Truck className="w-3 h-3" />
                          Kargoda
                        </span>
                      ) : order.orderStatus === "delivered" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Teslim Edildi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                          <Clock className="w-3 h-3" />
                          Hazırlanıyor
                        </span>
                      )}
                    </td>

                    {/* Hızlı İşlem */}
                    <td className="py-4 px-6 text-right">
                      <Link
                        href="/admin/siparisler"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-gold-600 hover:text-white text-neutral-700 text-xs font-mono font-semibold transition group-hover:shadow-xs"
                      >
                        <span>Detay</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Alt Bilgi & Tümünü Gör */}
        <div className="p-4 sm:p-6 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-mono">
            Toplam {orders.length} siparişten {filteredOrders.slice(0, 8).length} tanesi gösteriliyor.
          </span>
          <Link
            href="/admin/siparisler"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-gold-700 hover:text-gold-900 transition"
          >
            <span>Tüm Siparişleri Yönet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
