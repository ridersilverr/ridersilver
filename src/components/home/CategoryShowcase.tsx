import React from "react";
import Link from "next/link";
import Image from "next/image";
import { initialCategories } from "@/lib/mock-data";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section className="py-20 bg-stone-50/60 text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-700 text-xs font-mono tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Seçkin Mücevherat</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-neutral-900">
              Koleksiyonları <span className="font-serif italic font-normal text-gold-700">Keşfedin</span>
            </h2>
          </div>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-600 hover:text-gold-700 transition"
          >
            <span>Tüm Kategoriler (4)</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento Grid Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {initialCategories.map((cat, idx) => {
            const colSpan = idx === 0 || idx === 3 ? "md:col-span-7" : "md:col-span-5";
            return (
              <Link
                key={cat.id}
                href={`/katalog?kategori=${cat.slug}`}
                className={`group relative h-72 sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 hover:border-gold-400 shadow-sm hover:shadow-xl transition-all duration-700 flex flex-col justify-end p-5 sm:p-8 ${colSpan}`}
              >
                {/* Arka Plan Görseli */}
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out"
                />

                {/* Yumuşak Karartma */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* İçerik */}
                <div className="relative z-10 space-y-2 text-white">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-gold-300 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      0{idx + 1} / Koleksiyon
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-neutral-950 group-hover:border-transparent transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-white">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-200 font-light line-clamp-2 max-w-md">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
