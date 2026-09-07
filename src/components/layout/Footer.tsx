"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppUrl } from "@/config/site";
import { useLiveSupport } from "@/context/LiveSupportContext";
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  Instagram,
  MessageCircle,
  Headphones
} from "lucide-react";

export function Footer() {
  const { openSupport } = useLiveSupport();
  return (
    <footer className="bg-obsidian-deep text-neutral-400 pt-16 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Güven ve Hizmet Rozetleri */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 pb-12 border-b border-white/5">
          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Sigortalı Kargo</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">1.000 TL üzeri ücretsiz</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Havale İndirimi</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">%5 ek avantaj</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Güvenli Ödeme</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">256-bit SSL & 3D</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">Ömür Boyu Cila</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">Ücretsiz parlatma</p>
            </div>
          </div>
        </div>

        {/* Ana Kolonlar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          
          {/* Marka & Tanıtım */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="relative w-56 sm:w-64 h-28 rounded-2xl overflow-hidden bg-neutral-900/60 border border-white/10 shadow-xl group-hover:border-gold-500/50 transition-all duration-300 p-2">
                <Image
                  src="/images/rider-silver-full.png"
                  alt="RIDER SILVER - Senin Sürüşün, Senin Hikayen"
                  fill
                  className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              {siteConfig.description} Motosiklet tutkusu, asfaltın ruhu ve 925 ayar has gümüşün kusursuz zanaatı.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-gold-400 hover:border-gold-500/40 transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Koleksiyonlar */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-widest text-gold-400">Koleksiyon</h5>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/katalog?kategori=kolyeler" className="hover:text-white transition">Kolyeler</Link></li>
              <li><Link href="/katalog?kategori=bileklikler" className="hover:text-white transition">Bileklikler</Link></li>
              <li><Link href="/katalog?kategori=yuzukler" className="hover:text-white transition">Yüzükler</Link></li>
              <li><Link href="/katalog?kategori=kupeler" className="hover:text-white transition">Küpeler</Link></li>
              <li><Link href="/katalog" className="hover:text-white transition">Tüm Arşiv</Link></li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <h5 className="font-bold uppercase tracking-widest text-gold-400">Yönetim</h5>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/admin" className="hover:text-gold-300 transition text-gold-400 font-bold">Admin Paneli</Link></li>
              <li><Link href="/odeme" className="hover:text-white transition">Banka Hesapları (IBAN)</Link></li>
              <li><Link href="/hesabim" className="hover:text-white transition">Sipariş Takibi</Link></li>
              <li><Link href="/giris" className="hover:text-white transition">Müşteri Girişi</Link></li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h5 className="font-mono font-bold uppercase tracking-widest text-gold-400">Atölye</h5>
            <div className="space-y-2.5 text-neutral-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <button
                type="button"
                onClick={() => openSupport()}
                className="flex items-center gap-2.5 font-mono text-gold-400 hover:text-gold-300 transition group text-left"
              >
                <Headphones className="w-4 h-4 text-gold-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Canlı Destek Başlat (Çevrimiçi)
                </span>
              </button>
              <a
                href={getWhatsAppUrl("Merhaba Rider Silver, web siteniz üzerinden stil danışmanınızla iletişime geçmek istiyorum.")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 font-mono text-emerald-400 hover:text-emerald-300 transition group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>WhatsApp Danışmanı: {siteConfig.contact.whatsapp}</span>
              </a>
              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Satır */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.name.toUpperCase()}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            <span>iyzico & Havale/EFT Altyapısı</span>
            <span>•</span>
            <span>Vercel Cloud Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
