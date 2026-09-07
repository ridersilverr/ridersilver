"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function BrandLogoShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-950 via-[#101013] to-neutral-950 border-b border-neutral-800/80 select-none shadow-md">
      {/* Arka Plan Atmosfer Işıkları (Kompakt Odak) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Merkez Gümüş/Altın Spot Işığı */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] h-[70px] sm:h-[90px] bg-gradient-to-r from-amber-500/10 via-white/10 to-amber-500/10 rounded-full blur-2xl opacity-60" />
        
        {/* Üst ve Alt İnce Işık Çizgisi */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-center text-center">
        {/* Ana Logo: Kompakt, Kırpılmamış, Şeffaf Arka Planlı Tam Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-[180px] xs:w-[210px] sm:w-[250px] md:w-[290px] aspect-[816/324] flex items-center justify-center group cursor-pointer"
        >
          <Image
            src="/images/rider-silver-full.png"
            alt="RIDER SILVER - Senin Sürüşün, Senin Hikayen."
            fill
            priority
            sizes="(max-width: 640px) 210px, (max-width: 768px) 250px, 290px"
            className="object-contain object-center drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] filter brightness-105 group-hover:scale-[1.03] transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
}
