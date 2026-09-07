"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

export function CustomizerBanner() {
  return (
    <section className="py-20 bg-gradient-to-b from-stone-100/70 via-amber-50/30 to-white text-neutral-900 border-t border-neutral-200 relative overflow-hidden">
      
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-[2.5rem] bg-gradient-to-tr from-neutral-900 via-stone-900 to-neutral-950 text-white p-8 sm:p-14 border border-neutral-800 shadow-2xl overflow-hidden relative">
          
          {/* Arka Plan Dekoratif Deseni */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Sol Açıklama ve CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-300 text-[11px] font-mono tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                <span>Motorculara & Araç Tutkunlarına Özel</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-tight">
                Kaskını, Markanı ve Plakanı <br />
                <span className="italic font-normal bg-gradient-to-r from-gold-300 via-amber-200 to-gold-400 bg-clip-text text-transparent">
                  Boynunda Taşı.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Yamaha, Honda, BMW, Harley, Ducati ve tüm otomobil/motor markaları için vizörlü kask kolyeleri, logo madalyonları ve dikiz aynası asmalıkları. Kendi plakanızı ve kan grubunuzu canlı simülatörle yazın, atölyemizde 925 ayar has gümüşle işleyelim.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/tasarla"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 hover:from-gold-400 hover:to-amber-500 text-neutral-950 font-mono font-bold text-xs uppercase tracking-wider rounded-full shadow-xl shadow-gold-500/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                >
                  <Compass className="w-4 h-4" />
                  <span>Kendi Kolyeni Tasarla</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  <span>Ömür Boyu Kararmaz Cila</span>
                </div>
              </div>
            </div>

            {/* Sağ Canlı Görsel Kart Temsili */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-gold-400 to-amber-600 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center text-3xl">
                    🪖
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest font-bold block">
                    Örnek Özel Tasarım
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1">
                    Yamaha MT-09 Biker Kaskı
                  </h3>
                </div>

                {/* Örnek Türk Plakası */}
                <div className="mx-auto max-w-[200px] h-10 bg-white rounded-lg border-2 border-neutral-700 flex items-center px-2 shadow-inner">
                  <div className="w-5 h-full bg-blue-700 text-white flex flex-col items-center justify-center rounded-xs shrink-0 mr-2">
                    <span className="text-[6px]">★</span>
                    <span className="text-[8px] font-mono font-bold">TR</span>
                  </div>
                  <span className="flex-1 font-mono font-extrabold text-neutral-900 text-sm tracking-wider">
                    34 BK 902
                  </span>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-around text-[11px] font-mono text-neutral-300">
                  <span>925 Has Gümüş</span>
                  <span>•</span>
                  <span>Lazer Kabartma</span>
                  <span>•</span>
                  <span>Kral Zincir</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
