import React from "react";
import { Sparkles } from "lucide-react";

export function MarqueeTicker() {
  const items = [
    "RIDER SILVER",
    "SENİN SÜRÜŞÜN, SENİN HİKAYEN",
    "925 AYAR HAS GÜMÜŞ MOTORCU KASK KOLYELERİ",
    "ÖMÜR BOYU CİLA & PARLATMA GARANTİSİ",
    "HAVALE / EFT İLE ANINDA %5 İNDİRİM",
    "KİŞİYE ÖZEL LAZER PLAKA & KAN GRUBU İŞLEME",
    "SİGORTALI ÖZEL KUTULU GÖNDERİM",
  ];

  return (
    <div className="relative py-3.5 bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 border-y border-amber-200/70 overflow-hidden select-none shadow-2xs">
      {/* Yan Karartma Işıkları */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Akan Metin Şeridi */}
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-6 gap-3">
            <span className="font-mono text-xs tracking-[0.25em] font-bold text-neutral-800 uppercase hover:text-gold-700 transition-colors">
              {text}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
