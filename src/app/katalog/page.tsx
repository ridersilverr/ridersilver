"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/store";
import { Product } from "@/types";
import { Search, X, Sparkles } from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (searchParams.get("kategori")) {
      setSelectedCategory(searchParams.get("kategori") || "all");
    }
    if (searchParams.get("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
  }, [searchParams]);

  const categories = [
    { id: "all", name: "Tüm Koleksiyon" },
    { id: "kolyeler", name: "Kolyeler" },
    { id: "bileklikler", name: "Bileklikler" },
    { id: "yuzukler", name: "Yüzükler" },
    { id: "kupeler", name: "Küpeler" },
  ];

  const materials = [
    { id: "all", name: "Tüm Madenler" },
    { id: "gümüs", name: "925 Ayar Gümüş" },
    { id: "altin", name: "Altın Kaplama" },
    { id: "rose", name: "Rose Gold" },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedCategory !== "all" && product.category !== selectedCategory) {
          return false;
        }
        if (selectedMaterial !== "all") {
          const matLower = product.material.toLowerCase();
          if (selectedMaterial === "gümüs" && !matLower.includes("gümüş")) return false;
          if (selectedMaterial === "altin" && !matLower.includes("altın")) return false;
          if (selectedMaterial === "rose" && !matLower.includes("rose")) return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = product.title.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchStone = product.stone?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchStone) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;

        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-[11px] font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Mücevher Kataloğu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-neutral-900">
            Zarafetiyle Büyüleyen <span className="italic text-gold-700">Tasarımlar</span>
          </h1>
          <p className="text-xs text-neutral-500 font-light">
            925 ayar has gümüş ve altın kaplama özel zanaat koleksiyonu.
          </p>
        </div>

        {/* Filtre ve Arama Çubuğu */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm mb-10 space-y-4">
          
          {/* Kategori Butonları */}
          <div className="flex flex-wrap items-center gap-2 border-b border-neutral-100 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-neutral-900 text-white font-bold shadow-xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Arama, Maden ve Sıralama */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Arama Inputu */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Model, taş veya maden ara..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-full text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-gold-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filtreler */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-xs font-mono text-neutral-700 focus:outline-none focus:border-gold-500"
              >
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-xs font-mono text-neutral-700 focus:outline-none focus:border-gold-500"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="newest">En Yeniler</option>
              </select>

              {(selectedCategory !== "all" || selectedMaterial !== "all" || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-mono text-rose-600 hover:underline px-3 py-1 flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Sıfırla
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Bilgi Çubuğu */}
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6 px-1">
          <span>Toplam <strong>{filteredProducts.length}</strong> mücevher tasarımı listeleniyor</span>
          <span className="text-gold-700 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Sertifikalı & Kararmaz Cila Garantili
          </span>
        </div>

        {/* Ürün Listesi */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center space-y-4 rounded-3xl bg-white border border-neutral-200 max-w-md mx-auto my-12">
            <Search className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="font-serif text-lg text-neutral-900">Aradığınız Kriterlerde Ürün Bulunamadı</h3>
            <p className="text-xs text-neutral-500">Filtreleri sıfırlayarak tüm koleksiyonumuza göz atabilirsiniz.</p>
            <button
              onClick={resetFilters}
              className="mt-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase bg-neutral-900 text-white font-bold hover:bg-gold-600 transition"
            >
              Tüm Kataloğu Göster
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center text-neutral-900">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Katalog Yükleniyor...</span>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
