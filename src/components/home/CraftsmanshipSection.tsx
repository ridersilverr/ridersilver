import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Shield, Award, HeartHandshake } from "lucide-react";

export function CraftsmanshipSection() {
  return (
    <section className="py-24 bg-stone-50 text-neutral-900 relative overflow-hidden border-t border-neutral-200">
      
      {/* Hafif Altın Parıltı */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gold-200/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          
          {/* Sol Kolon: Zanaatkar Fotoğrafları (5 Kolon) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white shadow-xl group bg-white">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
                alt="Mücevher Zanaatkarlığı"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white shadow-xl translate-y-3 sm:translate-y-8 group bg-white">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
                alt="Detaylı Taş Mıhlama"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Sağ Kolon: Zanaat Felsefesi (7 Kolon) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-100/70 border border-gold-300 text-gold-900 text-[11px] font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Gelenekten Geleceğe Zanaat</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-900 leading-tight">
              Madenin Saf Işıltıya <span className="font-serif italic font-normal text-gold-700">Dönüşüm Serüveni</span>
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-light">
              Bizim için her bir takı sadece bir aksesuar değil; asfaltın, rüzgarın ve karakterinizin simgesidir. 
              <strong> &ldquo;Rider Silver&rdquo;</strong>, motosiklet tutkunlarının ruhunu ve asil metalin saf formunu bir araya getirir. 
              <strong> &ldquo;Senin Sürüşün, Senin Hikayen.&rdquo;</strong> — Her sürüş yeni bir sayfa, her kolye bu hikayenin ölümsüz bir parçasıdır.
            </p>

            {/* 4 Ana İlke Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-gold-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex items-center justify-center mb-3">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-neutral-900">925 Ayar Has Gümüş</h4>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Antialerjik, hassas tenlere tam uyumlu sertifikalı değerli madenler.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-gold-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex items-center justify-center mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-neutral-900">Kararmaz Cila Teknolojisi</h4>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Mikron kaplama ve nano koruyucu zırh ile ilk günkü ışıltısını korur.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-gold-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-neutral-900">Ömür Boyu Cila Desteği</h4>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Mücevherinizi dilediğiniz zaman atölyemize gönderip ücretsiz parlatabilirsiniz.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-gold-400 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-200 text-gold-700 flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-neutral-900">Mühürlü Kadife Kutu</h4>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Özel tasarım kadife hediye kutusu ve garanti kartı ile teslim edilir.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/katalog"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-gold-800 font-bold hover:text-gold-900 transition"
              >
                <span>Özel Tasarımları Keşfet</span>
                <span>→</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
