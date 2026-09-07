"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/lib/store";
import { Product, CategorySlug } from "@/types";
import { 
  Plus, 
  Trash2, 
  Search, 
  X, 
  Sparkles, 
  Package,
  Layers,
  Star,
  Check,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Filter,
  Pencil,
  Save,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategorySlug>("kolyeler");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("15");
  const [material, setMaterial] = useState("925 Ayar Gümüş");
  const [stone, setStone] = useState("AAAA Kalite Pırlanta Kesim Zirkon");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000");
  const [additionalImages, setAdditionalImages] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllProducts();
      setProducts(data);
    }
    load();
  }, []);

  // Bildirim toast zamanlayıcısı
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Yeni Ürün Modalini Aç
  const openNewModal = () => {
    setEditingProduct(null);
    setTitle("");
    setCategory("kolyeler");
    setPrice("");
    setSalePrice("");
    setStock("15");
    setMaterial("925 Ayar Gümüş");
    setStone("AAAA Kalite Pırlanta Kesim Zirkon");
    setImageUrl("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000");
    setAdditionalImages("");
    setBadge("");
    setDescription("");
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  // Var Olan Ürünü Düzenleme Modalini Aç
  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setTitle(prod.title);
    setCategory((prod.category as CategorySlug) || "kolyeler");
    setPrice(String(prod.price));
    setSalePrice(prod.salePrice ? String(prod.salePrice) : "");
    setStock(String(prod.stock ?? 10));
    setMaterial(prod.material || "925 Ayar Gümüş");
    setStone(prod.stone || "");
    setImageUrl(prod.images?.[0] || "");
    setAdditionalImages(prod.images?.slice(1).join("\n") || "");
    setBadge(prod.badge || "");
    setDescription(prod.description || "");
    setIsFeatured(Boolean(prod.isFeatured));
    setIsModalOpen(true);
  };

  // Form Gönderimi (Ekleme veya Güncelleme)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      alert("Lütfen ürün başlığını ve fiyatını giriniz.");
      return;
    }

    setIsSubmitting(true);

    // Ek görselleri birleştir
    const extraList = additionalImages
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    
    const allImages = [imageUrl.trim(), ...extraList].filter(Boolean);

    try {
      if (editingProduct) {
        // MEVCUT ÜRÜNÜ DÜZENLE
        const updated: Product = {
          ...editingProduct,
          title,
          category,
          price: Number(price),
          salePrice: salePrice ? Number(salePrice) : undefined,
          stock: Number(stock) || 0,
          material,
          stone: stone || undefined,
          images: allImages.length > 0 ? allImages : editingProduct.images,
          badge: badge.trim() || undefined,
          description: description || editingProduct.description,
          isFeatured,
        };

        await updateProduct(updated);
        setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
        setToastMessage(`"${title}" başarıyla güncellendi.`);
      } else {
        // YENİ ÜRÜN EKLE
        const slug = title
          .toLowerCase()
          .replace(/ğ/g, "g")
          .replace(/ü/g, "u")
          .replace(/ş/g, "s")
          .replace(/ı/g, "i")
          .replace(/ö/g, "o")
          .replace(/ç/g, "c")
          .replace(/[^a-z0-9]/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") + "-" + Math.floor(100 + Math.random() * 900);

        const newProd = await createProduct({
          title,
          slug,
          category,
          price: Number(price),
          salePrice: salePrice ? Number(salePrice) : undefined,
          stock: Number(stock) || 10,
          material,
          stone,
          images: allImages.length > 0 ? allImages : ["/images/custom/helmet-racing.png"],
          badge: badge.trim() || undefined,
          description: description || "Atölyemizde özenle üretilmiş, yüksek kaliteli zarif mücevher parçası.",
          isFeatured,
          isNew: true,
          reviews: [],
        });

        setProducts([newProd, ...products]);
        setToastMessage(`"${title}" kataloğa eklendi.`);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Save product error:", err);
      alert("Ürün kaydedilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string, productTitle: string) => {
    if (confirm(`"${productTitle}" adlı mücevheri silmek istediğinize emin misiniz?`)) {
      await deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      setToastMessage(`"${productTitle}" silindi.`);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { slug: "all", name: "Tümü" },
    { slug: "kolyeler", name: "Kolyeler" },
    { slug: "bileklikler", name: "Bileklikler" },
    { slug: "yuzukler", name: "Yüzükler" },
    { slug: "kupeler", name: "Küpeler" },
    { slug: "ozel-tasarim", name: "Özel Tasarım" },
  ];

  return (
    <div className="space-y-6 animate-admin-fade">
      
      {/* Başarı Bildirimi Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gold-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Üst Başlık & Eylem Çubuğu */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold-700 font-bold mb-1">
            <Package className="w-4 h-4 text-gold-600" />
            <span>Mücevher Envanteri</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            Katalog Yönetimi
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Toplam <strong className="text-neutral-900 font-bold">{products.length} ürün</strong> listelenmektedir. Kayıtlı tüm ürünleri düzenleyebilir, yeni fotoğraflar ekleyebilir veya güncelleyebilirsiniz.
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-600 hover:to-amber-600 text-neutral-950 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-gold-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Yeni Mücevher Ekle</span>
        </button>
      </div>

      {/* 2. Filtre ve Arama Çubuğu */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Kategori Sekmeleri */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                selectedCategory === cat.slug
                  ? "bg-white text-neutral-950 shadow-sm scale-[1.02]"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Arama Input */}
        <div className="relative flex-1 max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xs flex items-center px-4 py-2.5">
          <Search className="w-4 h-4 text-neutral-400 shrink-0 mr-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Model adı veya materyal ile filtrele..."
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

      {/* 3. Ürünler Tablosu */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 text-neutral-500 font-mono uppercase tracking-wider text-[10px] border-b border-neutral-200">
              <tr>
                <th className="py-4 px-6">Görsel & Model Başlığı</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Satış Fiyatı</th>
                <th className="py-4 px-6">Maden / Taş</th>
                <th className="py-4 px-6">Stok Durumu</th>
                <th className="py-4 px-6 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <span>Aradığınız kriterlere uygun mücevher bulunamadı.</span>
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr 
                    key={product.id} 
                    className="hover:bg-amber-50/30 transition-colors group"
                  >
                    {/* Görsel ve Model */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200 shadow-xs group-hover:scale-105 transition-transform">
                          <Image
                            src={product.images[0] || "/placeholder.jpg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link 
                            href={`/urun/${product.slug}`}
                            target="_blank"
                            className="font-serif font-bold text-neutral-900 hover:text-gold-700 transition flex items-center gap-1.5"
                          >
                            <span>{product.title}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            {product.badge && (
                              <span className="text-[9px] font-mono font-bold bg-neutral-900 text-gold-300 px-2 py-0.5 rounded-full">
                                {product.badge}
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                Vitrinde
                              </span>
                            )}
                            {product.images && product.images.length > 1 && (
                              <span className="text-[9px] font-mono text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-md">
                                {product.images.length} Görsel
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-6">
                      <span className="font-mono font-semibold uppercase tracking-wider text-[11px] text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>

                    {/* Fiyat */}
                    <td className="py-4 px-6 font-mono">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-neutral-950 text-sm">
                          {(product.salePrice ?? product.price).toLocaleString("tr-TR")} ₺
                        </span>
                        {product.salePrice && (
                          <span className="text-[10px] text-neutral-400 line-through">
                            {product.price.toLocaleString("tr-TR")} ₺
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Maden & Taş */}
                    <td className="py-4 px-6 text-neutral-600">
                      <span className="block font-medium">{product.material}</span>
                      {product.stone && (
                        <span className="text-[10px] text-neutral-400 block">{product.stone}</span>
                      )}
                    </td>

                    {/* Stok */}
                    <td className="py-4 px-6">
                      {product.stock <= 5 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          {product.stock} Adet (Kritik)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3" />
                          {product.stock} Adet
                        </span>
                      )}
                    </td>

                    {/* Eylemler (Düzenle & Sil & İncele) */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* DÜZENLEME BUTONU */}
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 text-neutral-600 hover:text-gold-700 hover:bg-gold-50 rounded-xl transition flex items-center gap-1 border border-transparent hover:border-gold-200"
                          title="Bu Mücevheri Düzenle"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="text-[11px] font-bold hidden sm:inline">Düzenle</span>
                        </button>

                        {/* Mağazada Görüntüle */}
                        <Link
                          href={`/urun/${product.slug}`}
                          target="_blank"
                          className="p-2 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition"
                          title="Mağazada Gör"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Sil */}
                        <button
                          onClick={() => handleDelete(product.id, product.title)}
                          className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                          title="Ürünü Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ÜRÜN EKLEME & DÜZENLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Başlık */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-gradient-to-r from-neutral-50 via-amber-50/20 to-neutral-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-700 flex items-center justify-center">
                  {editingProduct ? <Pencil className="w-5 h-5 text-gold-600" /> : <Sparkles className="w-5 h-5 text-gold-600" />}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    {editingProduct ? `"${editingProduct.title}" Düzenle` : "Kataloğa Yeni Mücevher Ekle"}
                  </h3>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {editingProduct ? `Ürün ID: ${editingProduct.id} • Düzenleme Modu` : "Rider Silver Özel Koleksiyon"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              
              {/* Başlık */}
              <div>
                <label className="block text-neutral-900 font-bold mb-1.5">Tasarım / Mücevher Başlığı *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: 925 Ayar Baget Pırlanta Işıltılı Kolye"
                  className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                />
              </div>

              {/* Kategori ve Stok */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategorySlug)}
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs cursor-pointer text-xs font-medium"
                  >
                    <option value="kolyeler">Kolyeler & Kasklar</option>
                    <option value="bileklikler">Bileklikler & Kelepçeler</option>
                    <option value="yuzukler">Yüzükler</option>
                    <option value="kupeler">Küpeler</option>
                    <option value="ozel-tasarim">Özel Tasarım Parçalar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Stok Adedi</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="15"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>
              </div>

              {/* Fiyatlar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Normal Liste Fiyatı (₺) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1850"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">İndirimli Satış Fiyatı (₺ - Opsiyonel)</label>
                  <input
                    type="number"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="1490"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>
              </div>

              {/* Maden & Taş */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Maden & Kaplama</label>
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    placeholder="925 Ayar Has Gümüş / 14K Mikron Altın"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Taş Detayı</label>
                  <input
                    type="text"
                    value={stone}
                    onChange={(e) => setStone(e.target.value)}
                    placeholder="AAAA Kalite Zirkon / Doğal İnci"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>
              </div>

              {/* Ana Görsel URL & Önizleme */}
              <div>
                <label className="block text-neutral-900 font-bold mb-1.5">Ana Görsel URL Adresi *</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                  {imageUrl && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0 shadow-xs">
                      <Image
                        src={imageUrl}
                        alt="Önizleme"
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Geçersiz URL durumunda hata vermesin
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Ekstra Görseller (Slider İçin) */}
              <div>
                <label className="block text-neutral-900 font-bold mb-1">
                  Ekstra Görseller (Slider İçin Çoklu Görsel)
                </label>
                <span className="block text-[10px] text-neutral-500 mb-1.5">
                  Her satıra bir görsel URL adresi yazarak sağa-sola kayan çoklu fotoğraf galerisi oluşturabilirsiniz.
                </span>
                <textarea
                  rows={2}
                  value={additionalImages}
                  onChange={(e) => setAdditionalImages(e.target.value)}
                  placeholder={"https://images.unsplash.com/photo-ornek-2\nhttps://images.unsplash.com/photo-ornek-3"}
                  className="w-full px-4 py-2.5 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-mono"
                />
              </div>

              {/* Rozet / Etiket & Vitrin Seçeneği */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-900 font-bold mb-1.5">Rozet / Etiket (Opsiyonel)</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="Örn: Çok Satan, Haftanın Tercihi, Yeni Sezon"
                    className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-5 h-5 accent-gold-600 rounded-lg cursor-pointer"
                    />
                    <span className="text-neutral-800 font-bold text-xs">Ana Sayfa Vitrininde Göster</span>
                  </label>
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <label className="block text-neutral-900 font-bold mb-1.5">Ürün Açıklaması</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ürün işçiliği, cila koruması ve paket içeriği..."
                  className="w-full px-4 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-2xl focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 shadow-xs text-xs font-medium"
                />
              </div>

              {/* Butonlar */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-2xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition font-bold"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-neutral-950 font-bold rounded-2xl shadow-lg shadow-gold-500/25 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Kaydediliyor...</span>
                  ) : editingProduct ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Değişiklikleri Kaydet ✦</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Mücevheri Yayınla ✦</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
