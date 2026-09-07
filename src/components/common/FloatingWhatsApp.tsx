"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { getWhatsAppUrl, siteConfig } from "@/config/site";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = "Merhaba Rider Silver, stil danışmanınızla görüşmek, koleksiyon ve özel sipariş süreçleri hakkında bilgi almak istiyorum.";
  const whatsappHref = getWhatsAppUrl(defaultMsg);

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end group">
      {/* İpucu / Bilgi Balonu (Masaüstü & Mobil) */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-neutral-900/95 backdrop-blur-md text-white border border-gold-500/30 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-400">
                VIP Stil Danışmanı
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-0.5"
              aria-label="Kapat"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-neutral-300 mt-2.5 leading-relaxed font-light">
            Özel ölçü, özel sipariş veya takı seçiminiz için stil danışmanımızla doğrudan WhatsApp üzerinden görüşebilirsiniz.
          </p>
          <div className="mt-3 text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
            📞 {siteConfig.contact.whatsapp}
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Sohbete Başla</span>
          </a>
        </div>
      )}

      {/* Ana Yüzen Buton */}
      <div className="flex items-center gap-2.5">
        {/* Hover Etiketi (Masaüstü) */}
        <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 border border-neutral-200/80 text-xs font-mono font-bold shadow-lg shadow-black/5 opacity-90 group-hover:opacity-100 transition">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Stil Danışmanı
        </span>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Stil Danışmanı ile İletişime Geçin"
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.5)] border-2 border-white transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          
          {/* Canlı Çevrimiçi Rozeti */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-emerald-900 rounded-full animate-ping" />
          </span>
        </a>
      </div>
    </div>
  );
}
