"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Quote, Sparkles, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function ReviewsTicker() {
  const testimonials = [
    {
      id: 1,
      name: "Barış Can Kaya",
      city: "İstanbul",
      rating: 5,
      product: "Özel Tasarım Biker Kask Kolye (34 BK 902)",
      comment: "Yamaha MT-09 motorum için kendi plakamı yazdırdım. Kaskın vizör detayı ve plakanın kabartması inanılmaz kaliteli. Atölyenin işçiliği 10 numara, motorcu arkadaşlarıma hemen tavsiye ettim!",
      date: "Dün",
    },
    {
      id: 2,
      name: "Zeynep Selin Ç.",
      city: "İstanbul",
      rating: 5,
      product: "Aura Baget Kolye",
      comment: "Kutusundan çıkardığım an ışıltısı büyüledi! Havale ile sipariş verdim, %5 indirim anında uygulandı ve ertesi gün teslim aldım. Kadife kutusu ve mühürlü sertifikasıyla tam bir lüks deneyim.",
      date: "2 gün önce",
    },
    {
      id: 3,
      name: "Emre Dağdelen",
      city: "Bursa",
      rating: 5,
      product: "Dikiz Aynası Asmalık Plakalı Kask (16 ED 440)",
      comment: "Arabamın dikiz aynasına asmak için yaptırdım. Güneşte parıldayan 925 ayar gümüş kaplaması arabanın içine ayrı bir hava kattı. Zincir boyu ve kilit aparatı tam oturdu.",
      date: "3 gün önce",
    },
    {
      id: 4,
      name: "Büşra Demir",
      city: "İzmir",
      rating: 5,
      product: "Venedik Su Yolu Kristal Bileklik",
      comment: "Nişanım için aldım. Herkes gerçek pırlanta sandı. Kilit mekanizması son derece sağlam ve güven veriyor. Bilekteki akıcılığı şahane.",
      date: "Geçen hafta",
    },
    {
      id: 5,
      name: "Tolga Acar",
      city: "Antalya",
      rating: 5,
      product: "BMW M Power Logo & Plakalı Kolye",
      comment: "Hem kolyenin ön yüzüne BMW logosu hem de altındaki plakaya motorumun plakasını işlettirdim. Detaylardaki mikron cila kalitesi kusursuz.",
      date: "5 gün önce",
    },
    {
      id: 6,
      name: "Merve Kaan",
      city: "Ankara",
      rating: 5,
      product: "Soleil 14K Madalyon Kolye",
      comment: "Yaklaşık 1 aydır boynumdan çıkarmıyorum. Denizde ve duşta denedim, cila kalitesi kusursuz. Kararma veya matlaşma kesinlikle yok.",
      date: "1 hafta önce",
    },
    {
      id: 7,
      name: "Okan Yılmaz",
      city: "Eskişehir",
      rating: 5,
      product: "Harley-Davidson Mat Antik Kask Kolye",
      comment: "Mat antik oksit kaplama seçtim, tam istediğim asi ve vintage görünüm oldu. Arkasına kan grubumu da yazdılar, çok anlamlı ve hayat kurtarıcı bir parça.",
      date: "1 hafta önce",
    },
    {
      id: 8,
      name: "Ece Güven",
      city: "Kocaeli",
      rating: 5,
      product: "Luna Damla Barok İnci Küpe",
      comment: "İncilerin doğallığı ve üzerindeki 14K altın klipsler harika. Ağır basmıyor, kulakta çok zarif duruyor. Paketleme de hediye gibi özenliydi.",
      date: "10 gün önce",
    },
    {
      id: 9,
      name: "Mert Şentürk",
      city: "Muğla",
      rating: 5,
      product: "Honda CB650R Plakalı Lüks Anahtarlık",
      comment: "Anahtarlık için sipariş vermiştim. Masif ve tok bir hissi var, ucuz çinko alaşımlarla alakası yok, saf 925 gümüş ağırlığı hissediliyor.",
      date: "12 gün önce",
    },
    {
      id: 10,
      name: "Selin Polat",
      city: "Trabzon",
      rating: 5,
      product: "Kral Zincirli Özel Tasarım Kolye",
      comment: "Eşime evlilik yıldönümümüz için motorunun plakasıyla sürpriz yaptım. Gözlerine inanamadı! WhatsApp stil danışmanı sipariş sürecinde çok yardımcı oldu.",
      date: "2 hafta önce",
    },
    {
      id: 11,
      name: "Serkan Vural",
      city: "Adana",
      rating: 5,
      product: "Ducati Panigale Kask Kolye (01 SV 33)",
      comment: "Kaskın aerodinamik çizgilerini kolyeye birebir aktarmışlar. İtalyan örgü deri ipiyle kombinledim, boynumda çok karizmatik duruyor.",
      date: "2 hafta önce",
    },
    {
      id: 12,
      name: "Derya Aydın",
      city: "Samsun",
      rating: 5,
      product: "Sonsuzluk Baget Yüzük",
      comment: "Ölçüsü parmağıma tam oldu. Işıltısı o kadar berrak ki yanına tektaş takmaya bile gerek kalmıyor. Cila garantisi de güven veriyor.",
      date: "3 hafta önce",
    },
    {
      id: 13,
      name: "Kaan Arslan",
      city: "Sakarya",
      rating: 5,
      product: "Mercedes-AMG Yıldız & Plaka Dikiz Süsü",
      comment: "Aracımın içine astım, araca her binen nereden aldığımı soruyor. Titreşimden sallandığında bile parıl parıl parlıyor.",
      date: "3 hafta önce",
    },
    {
      id: 14,
      name: "Ayşenur Çelik",
      city: "Gaziantep",
      rating: 5,
      product: "Zümrüt Işıltılı Damla Kolye",
      comment: "Rengi ve yeşil taşın berraklığı fotoğraftakinden bile daha canlı. Özel davetlerde tüm dikkatleri üzerine çekiyor.",
      date: "1 ay önce",
    },
    {
      id: 15,
      name: "Cemil Yıldız",
      city: "Tekirdağ",
      rating: 5,
      product: "Kawasaki Ninja Yeşil Mineli Kask Kolye",
      comment: "Yeşil mine işçiliği ve plaka yazısı kusursuz. Kargo 24 saatte elime ulaştı. Rider Silver atölyesine emeği için teşekkür ederim.",
      date: "1 ay önce",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Ekran genişliğine göre mobilde 1, masaüstünde 3 kart gruplama
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage);

  // Sayfa taştıysa sıfırla
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [totalSlides, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
    setProgressKey((k) => k + 1);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
    setProgressKey((k) => k + 1);
  }, [totalSlides]);

  // 4.5 Saniye Otomatik Sağa Kayma Zamanlayıcısı
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  // Slayt grupları oluşturma
  const slides = [];
  for (let i = 0; i < testimonials.length; i += itemsPerPage) {
    slides.push(testimonials.slice(i, i + itemsPerPage));
  }

  return (
    <section className="py-24 bg-white border-t border-neutral-200 text-neutral-900 relative select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık, Sayaç ve Kontrol Butonları */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-[11px] font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
              <span>Gerçek Müşteri Deneyimleri • 15 Yorum</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-neutral-900">
              Işıltımıza Ortak <span className="italic font-normal text-gold-700">Olanlar</span>
            </h2>
          </div>

          {/* Karusel Ok Butonları, İlerleme ve Sayaç */}
          <div className="flex items-center gap-3 self-end">
            <div className="flex items-center gap-2 mr-2">
              <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
                {isMobile ? `Yorum ${currentIndex + 1} / ${totalSlides}` : `Sayfa 0${currentIndex + 1} / 0${totalSlides}`}
              </span>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 text-neutral-400 hover:text-gold-600 transition"
                title={isPaused ? "Otomatik kaymayı başlat" : "Otomatik kaymayı duraklat"}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-gold-500 bg-white hover:bg-gold-50 text-neutral-700 hover:text-gold-800 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 group"
              aria-label="Önceki Yorumlar"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-neutral-300 hover:border-gold-500 bg-white hover:bg-gold-50 text-neutral-700 hover:text-gold-800 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 group"
              aria-label="Sonraki Yorumlar"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4.5 Saniye Zaman Çubuğu (Slider Süre Efekti) */}
        <div className="w-full h-1 bg-neutral-100 rounded-full mb-8 overflow-hidden">
          {!isPaused && (
            <motion.div
              key={progressKey}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.5, ease: "linear" }}
              className="h-full bg-gradient-to-r from-gold-500 to-amber-600 rounded-full"
            />
          )}
        </div>

        {/* Gerçek Sağa-Sola Kayma (Slider Track Efekti) */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (offset.x < -50 || swipe < -80) {
                handleNext();
              } else if (offset.x > 50 || swipe > 80) {
                handlePrev();
              }
            }}
          >
            {slides.map((slide, sIdx) => (
              <div key={sIdx} className="w-full shrink-0 flex-none px-1">
                <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-3"} gap-6`}>
                  {slide.map((t) => (
                    <motion.div
                      key={t.id}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="p-7 sm:p-8 rounded-3xl bg-stone-50/85 border border-neutral-200/90 hover:border-gold-400 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300 flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                            ))}
                          </div>
                          <Quote className="w-6 h-6 text-neutral-300 shrink-0" />
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                          &ldquo;{t.comment}&rdquo;
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5 truncate">
                            <span>{t.name}</span>
                            <span title="Doğrulanmış Alıcı">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            </span>
                          </h4>
                          <span className="text-[11px] font-mono text-neutral-500 truncate block mt-0.5">
                            {t.city} • <strong className="text-neutral-700 font-medium">{t.product}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 shrink-0">{t.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Alt Sayfalama / Slider Geçiş Noktaları */}
        <div className="mt-10 flex justify-center items-center gap-2">
          {[...Array(totalSlides)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setProgressKey((k) => k + 1);
              }}
              className={`h-2 rounded-full transition-all duration-400 ${
                currentIndex === idx 
                  ? "w-10 bg-gradient-to-r from-gold-500 to-amber-600 shadow-sm" 
                  : "w-2.5 bg-neutral-200 hover:bg-neutral-300"
              }`}
              aria-label={`Yorum Grubu ${idx + 1}`}
            />
          ))}
        </div>

        {/* Alt Metrik İstatistikleri */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-neutral-200 pt-10">
          <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900">15.000+</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-500 block mt-1">Mutlu Müşteri</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-gold-700">4.9 / 5</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-500 block mt-1">Müşteri Puanı</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-neutral-900">%100</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-500 block mt-1">Has Gümüş & El İşi</span>
          </div>
          <div className="p-4 rounded-2xl bg-stone-50 border border-neutral-200/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-gold-700">24 Saat</span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-500 block mt-1">Hızlı Kargolama</span>
          </div>
        </div>

      </div>
    </section>
  );
}
