"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { CustomDesignConfig, Product } from "@/types";
import { 
  Sparkles, 
  ShoppingBag, 
  RotateCw, 
  ShieldCheck, 
  Truck, 
  Check, 
  ArrowRight,
  Eye,
  Camera,
  Layers,
  Award
} from "lucide-react";

// Gerçek Fotoğraflı 4 Ana Şablon
const templates = [
  {
    id: "pist_kask",
    name: "Pist & Yarış Kaskı (Full-Face)",
    subtitle: "Shoei / Red Bull Tarzı İki Renkli Pist Kaskı",
    description: "Aerodinamik spoylerli yarış kaskı. Çene yazısı, kask markası, yarışçı numarası ve arka ay-yıldız detaylı.",
    basePrice: 1590,
    realPhoto: "/images/custom/helmet-racing.png",
    type: "kolye",
    tag: "En Popüler",
  },
  {
    id: "motocross_kask",
    name: "Motocross & Enduro Kaskı",
    subtitle: "Rockstar / Fox Tarzı Siperlikli Off-Road Kaskı",
    description: "Agresif siperlikli kros kaskı. Altın yıldız aplike, gözenekli gözlük file dokusu ve çene bandı yazısı.",
    basePrice: 1490,
    realPhoto: "/images/custom/helmet-motocross.jpg",
    type: "kolye",
    tag: "Off-Road",
  },
  {
    id: "marka_logo",
    name: "Lazer Kesim Marka & Logo",
    subtitle: "Honda Wing, Yamaha, BMW vb. Masif Kesim",
    description: "Motor ve araç amblemlerinin pürüzsüz lazer kesimi ve altına/arkasına plaka kazıma.",
    basePrice: 1290,
    realPhoto: "/images/custom/logo-honda.png",
    type: "kolye",
    tag: "Motorsport",
  },
  {
    id: "oto_asmalik",
    name: "Dikiz Aynası Asmalık Süsü",
    subtitle: "Arabaya Asılabilir Kilitli Çelik Askılı Kask / Logo",
    description: "Dikiz aynasına asılmak üzere özel kilitli çelik tel askıyla donatılmış masif kask ve plaka aksesuarı.",
    basePrice: 1390,
    realPhoto: "/images/custom/helmet-racing.png",
    type: "oto_asmalik",
    tag: "Araç İçi",
  },
];

// Gövde Kaplama Renkleri
const bodyColors = [
  {
    id: "925_gumus",
    name: "925 Ayar Parlak Gümüş",
    finish: "Ayna Parlaklığında Rodyum Cila",
    priceDiff: 0,
    hex: "#E2E8F0",
    gradient: "from-slate-200 via-white to-slate-400",
    stroke: "#94A3B8",
    textColor: "#0F172A",
  },
  {
    id: "14k_altin",
    name: "14K Mikron Altın Kaplama",
    finish: "Gerçek Altın Banyosu (Kararmaz)",
    priceDiff: 250,
    hex: "#F59E0B",
    gradient: "from-amber-200 via-yellow-100 to-amber-500",
    stroke: "#D97706",
    textColor: "#78350F",
  },
  {
    id: "mat_antik",
    name: "Mat Antik Oksit Gümüş",
    finish: "Vintage Asi Karartmalı Biker Dokusu",
    priceDiff: 100,
    hex: "#78716C",
    gradient: "from-stone-400 via-stone-200 to-stone-700",
    stroke: "#44403C",
    textColor: "#1C1917",
  },
  {
    id: "karbon_siyah",
    name: "Karbon Gece Siyahı",
    finish: "Füme Titanyum Rodyum Kaplama",
    priceDiff: 200,
    hex: "#27272A",
    gradient: "from-neutral-700 via-neutral-500 to-neutral-900",
    stroke: "#18181B",
    textColor: "#F8FAFC",
  },
];

// Vizör & Detay Renkleri (İki Renkli - Two-Tone Çift Renk İşçilik)
const visorColors = [
  {
    id: "altin_yaldiz",
    name: "Altın Yaldız Detay (Two-Tone)",
    desc: "Fotoğraftaki gibi gümüş üzerine altın vizör",
    hex: "#D97706",
    bgClass: "bg-amber-500",
    textClass: "text-amber-500",
    priceDiff: 0,
  },
  {
    id: "rodyum_gumus",
    name: "Ayna Krom Gümüş",
    desc: "Gövdeyle uyumlu saf gümüş ayna vizör",
    hex: "#E2E8F0",
    bgClass: "bg-slate-300",
    textClass: "text-slate-200",
    priceDiff: 0,
  },
  {
    id: "yakut_kirmizi",
    name: "Yakut Kırmızısı Mine",
    desc: "Yarış kırmızısı şeffaf mine dolgusu",
    hex: "#E11D48",
    bgClass: "bg-rose-600",
    textClass: "text-rose-600",
    priceDiff: 100,
  },
  {
    id: "zumrut_yesil",
    name: "Kawasaki Zümrüt Yeşili",
    desc: "Motorsport yarış yeşili mine",
    hex: "#059669",
    bgClass: "bg-emerald-600",
    textClass: "text-emerald-600",
    priceDiff: 100,
  },
  {
    id: "gece_mavisi",
    name: "Yamaha Gece Mavisi",
    desc: "Yarış mavisi derin mine dolgusu",
    hex: "#2563EB",
    bgClass: "bg-blue-600",
    textClass: "text-blue-600",
    priceDiff: 100,
  },
];

// Kask Markası Seçenekleri
const helmetBrands = [
  "SHOEI",
  "ARAI",
  "AGV",
  "HJC",
  "NOLAN",
  "BELL",
  "YAMAHA",
  "HONDA",
  "BMW",
  "ÖZEL",
];

// Sembol Seçenekleri
const symbols = [
  { id: "ay_yildiz", name: "Ay-Yıldız 🇹🇷", icon: "🇹🇷" },
  { id: "boga", name: "Güçlü Boğa (Red Bull)", icon: "🐂" },
  { id: "yildiz", name: "Rockstar Yıldızı", icon: "⭐" },
  { id: "bayrak", name: "Damalı Yarış Bayrağı", icon: "🏁" },
  { id: "kurukafa", name: "Biker Kuru Kafa", icon: "💀" },
  { id: "kartal", name: "Asil Kartal", icon: "🦅" },
];

// Zincir Seçenekleri (Fotoğraftaki Masif Küp / Venedik Zincir Başta)
const chains = [
  {
    id: "kup_venedik",
    name: "Masif Küp / Venedik Zincir (Fotoğraftaki Model - 55 cm)",
    desc: "Yüksek dayanımlı paslanmaz çelik/gümüş küp örgü",
    priceDiff: 0,
    isDefault: true,
  },
  {
    id: "kral_zincir",
    name: "925 Ayar Gümüş Kral Zincir (60 cm)",
    desc: "Ağır ve gösterişli usta kral örgü",
    priceDiff: 350,
  },
  {
    id: "deri_kordon",
    name: "İtalyan Hakiki Örgü Deri Kordon (50 cm)",
    desc: "Sportif mat siyah hakiki deri ve çelik kilit",
    priceDiff: 0,
  },
  {
    id: "dikiz_klipsi",
    name: "Dikiz Aynası Kilitli Çelik Tel Askısı",
    desc: "Araç içi dikiz aynasına özel vidalı klips",
    priceDiff: 0,
  },
];

export default function CustomizerPage() {
  const { addToCart } = useCart();

  // Seçili Tasarım Parametreleri
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedBodyColor, setSelectedBodyColor] = useState(bodyColors[0]);
  const [selectedVisorColor, setSelectedVisorColor] = useState(visorColors[0]);
  const [mainText, setMainText] = useState("RedBull");
  const [numberPlate, setNumberPlate] = useState("TR54");
  const [selectedHelmetBrand, setSelectedHelmetBrand] = useState(helmetBrands[0]);
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);
  const [backText, setBackText] = useState("A Rh(+) • Toprak R.");
  const [selectedChain, setSelectedChain] = useState(chains[0]);

  // Görünüm Modu: Canlı Çizim Simülatörü vs. Gerçek Fotoğraf
  const [previewMode, setPreviewMode] = useState<"simulator" | "real_photo">("simulator");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Toplam Tutar
  const totalPrice = 
    selectedTemplate.basePrice + 
    selectedBodyColor.priceDiff + 
    selectedVisorColor.priceDiff + 
    selectedChain.priceDiff;
  const havalePrice = totalPrice * (1 - siteConfig.havaleDiscountRate);

  // Sepete Ekle
  const handleAddToCart = () => {
    const customConfig: CustomDesignConfig = {
      template: selectedTemplate.id,
      templateName: selectedTemplate.name,
      bodyColor: selectedBodyColor.name,
      visorColor: selectedVisorColor.name,
      mainText: mainText.toUpperCase(),
      numberPlate: numberPlate.toUpperCase(),
      helmetBrand: selectedHelmetBrand,
      symbol: selectedSymbol.name,
      backText: backText || undefined,
      chainType: selectedChain.name,
      plateText: numberPlate.toUpperCase(),
      brand: selectedHelmetBrand,
      material: `${selectedBodyColor.name} + ${selectedVisorColor.name}`,
      accessoryType: selectedChain.name,
    };

    const customProduct: Product = {
      id: "custom-" + Date.now(),
      title: `${selectedTemplate.name} - [${mainText.toUpperCase()}] [${numberPlate.toUpperCase()}]`,
      slug: "ozel-tasarim-kask-kolye",
      description: `Kişiye özel iki renkli üretim. Gövde: ${selectedBodyColor.name}, Vizör/Detay: ${selectedVisorColor.name}, Çene: ${mainText}, Numara/Plaka: ${numberPlate}, Kask Markası: ${selectedHelmetBrand}, Zincir: ${selectedChain.name}.`,
      price: totalPrice,
      category: "kolyeler",
      images: [
        selectedTemplate.realPhoto,
        "/images/custom/helmet-racing.png",
        "/images/custom/helmet-motocross.jpg",
      ],
      stock: 50,
      material: `${selectedBodyColor.name} & ${selectedVisorColor.name}`,
      badge: "Kişiye Özel İmalat",
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString(),
    };

    addToCart(customProduct, 1, undefined, selectedBodyColor.name, customConfig);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık ve Açıklama */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-50 border border-gold-300 text-gold-900 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Kişiye Özel Biker & Motorsport Atölyesi</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-neutral-900">
            Kaskını, Rengini ve <span className="italic text-gold-700 font-normal">İsmini Kendin Belirle</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
            Tamamen usta ellerde şekillenen iki renkli (two-tone) pist yarış kaskları, kros kaskları ve marka amblemleri. Çene yazısı, yarışçı numarası ve renk kombinasyonunu canlı olarak seçin.
          </p>
        </div>

        {/* Ana 2 Kolonlu Alan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* SOL KOLON: Canlı Önizleme & Görsel Simülatör (5 Kolon - Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
            
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200 shadow-xl text-center relative overflow-hidden">
              
              {/* Üst Sekmeler: Simülatör vs. Gerçek Atölye Fotoğrafı */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-5">
                <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode("simulator");
                      setIsFlipped(false);
                    }}
                    className={`px-3 py-1 rounded-lg transition font-semibold flex items-center gap-1.5 ${
                      previewMode === "simulator"
                        ? "bg-white text-neutral-900 shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Canlı Tasarım</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewMode("real_photo")}
                    className={`px-3 py-1 rounded-lg transition font-semibold flex items-center gap-1.5 ${
                      previewMode === "real_photo"
                        ? "bg-white text-neutral-900 shadow-xs"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-gold-600" />
                    <span>Gerçek Numune</span>
                  </button>
                </div>

                {previewMode === "simulator" && (
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-50 hover:bg-gold-100 text-gold-900 text-xs font-mono transition border border-gold-200"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? "Ön Yüz" : "Arka Yüz"}</span>
                  </button>
                )}
              </div>

              {/* VİTİRİN GÖRSEL ALANI */}
              <div className="relative aspect-square max-w-[320px] mx-auto flex items-center justify-center bg-stone-900 rounded-3xl p-4 overflow-hidden border border-neutral-800 shadow-2xl">
                
                {/* Askı / Zincir Temsili (Fotoğraftaki Masif Küp Zincir) */}
                <div className="absolute top-2 inset-x-0 flex justify-center z-0 pointer-events-none">
                  <div className="w-24 h-10 border-t-4 border-dotted border-neutral-400/80 rounded-full" />
                </div>

                {previewMode === "real_photo" ? (
                  /* GERÇEK ATÖLYE FOTOĞRAFI GÖRÜNÜMÜ */
                  <div className="relative w-full h-full rounded-2xl overflow-hidden animate-in fade-in duration-300">
                    <Image
                      src={selectedTemplate.realPhoto}
                      alt={selectedTemplate.name}
                      fill
                      priority
                      className="object-contain"
                    />
                    <div className="absolute bottom-2 inset-x-2 py-1 bg-black/75 backdrop-blur-md rounded-lg text-[10px] font-mono text-gold-300 text-center border border-white/10">
                      Atölyemizde Üretilmiş Gerçek Numune
                    </div>
                  </div>
                ) : !isFlipped ? (
                  /* CANLI ÖN YÜZ TASARIM SİMÜLATÖRÜ */
                  <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300 select-none">
                    
                    {/* Metalik Parlama Arka Işığı */}
                    <div 
                      className="absolute w-44 h-44 rounded-full blur-2xl opacity-40 pointer-events-none"
                      style={{ backgroundColor: selectedVisorColor.hex }}
                    />

                    {/* Stilize Pist / Kros Kaskı Metalik Gövdesi */}
                    <div 
                      className={`relative w-64 h-56 rounded-[2.5rem] p-4 bg-gradient-to-tr ${selectedBodyColor.gradient} border-2 shadow-2xl flex flex-col justify-between transition-all duration-500`}
                      style={{ borderColor: selectedBodyColor.stroke }}
                    >
                      {/* Üst Alan: Kask Spoyleri, Numara ve Marka */}
                      <div className="flex items-center justify-between">
                        {/* Sol: Yarışçı Numarası / Plaka Kutusu */}
                        <div 
                          className="px-2.5 py-1 rounded-lg border text-[11px] font-mono font-extrabold tracking-wider shadow-xs"
                          style={{
                            backgroundColor: selectedVisorColor.hex,
                            color: "#FFFFFF",
                            borderColor: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {numberPlate.toUpperCase() || "TR54"}
                        </div>

                        {/* Orta: Seçili Sembol */}
                        <span className="text-xl filter drop-shadow">
                          {selectedSymbol.icon}
                        </span>

                        {/* Sağ: Kask Markası Rozeti (Shoei, Arai vb.) */}
                        <div 
                          className="px-2 py-0.5 rounded-md border text-[9px] font-mono font-black uppercase tracking-widest"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            color: selectedVisorColor.hex,
                            borderColor: selectedVisorColor.hex,
                          }}
                        >
                          {selectedHelmetBrand}
                        </div>
                      </div>

                      {/* Orta Alan: Renkli Vizör / Cam Bölgesi (İki Renkli - Two Tone) */}
                      <div 
                        className="my-auto h-20 rounded-2xl border-2 flex items-center justify-between px-3 shadow-inner relative overflow-hidden transition-colors duration-500"
                        style={{
                          backgroundColor: `${selectedVisorColor.hex}25`,
                          borderColor: selectedVisorColor.hex,
                        }}
                      >
                        <div className="relative z-10">
                          <span className="text-[10px] font-mono font-black uppercase tracking-wider block text-white/90">
                            {selectedTemplate.id === "motocross_kask" ? "ENDURO TERİĞİ" : "AERODİNAMİK VİZÖR"}
                          </span>
                          <span className="text-[9px] font-mono text-white/70 block">
                            {selectedVisorColor.name}
                          </span>
                        </div>

                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white/90 font-bold border border-white/30 text-xs shadow-sm bg-black/40">
                          {selectedSymbol.id === "boga" ? "🐂" : selectedSymbol.id === "yildiz" ? "⭐" : "🇹🇷"}
                        </div>

                        {/* Vizör Metalik Yansıma Işığı */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/30 rounded-full blur-md pointer-events-none" />
                      </div>

                      {/* Alt Alan: Çene Bandı & Ana Yazı (RedBull, Rockstar, İsim vb.) */}
                      <div className="rounded-xl bg-black/85 border border-white/20 py-2 px-3 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedVisorColor.hex }} />
                          <span className="font-mono font-black text-white text-xs sm:text-sm tracking-widest uppercase truncate">
                            {mainText.toUpperCase() || "REDBULL"}
                          </span>
                        </div>

                        <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                          925 SILVER
                        </span>
                      </div>

                    </div>

                  </div>
                ) : (
                  /* CANLI ARKA YÜZ LAZER KAZIMA GÖRÜNÜMÜ */
                  <div className="relative w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300 text-center p-4">
                    <div 
                      className={`w-60 h-52 rounded-[2.5rem] p-5 bg-gradient-to-tr ${selectedBodyColor.gradient} border-2 shadow-2xl flex flex-col items-center justify-center space-y-3`}
                      style={{ borderColor: selectedBodyColor.stroke }}
                    >
                      <Award className="w-8 h-8 text-neutral-800/80" />
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600 font-bold block mb-1">
                          Lazer Kazıma Bilgisi
                        </span>
                        <p className="font-serif text-sm sm:text-base font-bold text-neutral-900 italic">
                          &ldquo;{backText || "İsim & Kan Grubu"}&rdquo;
                        </p>
                      </div>
                      <div className="pt-2 border-t border-neutral-700/20 text-[9px] font-mono text-neutral-700">
                        {selectedBodyColor.name} • Sim-Cila Atelier
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Alt Fiyat ve Sepete Ekle Butonu */}
              <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-neutral-500 block">Özel İmalat Fiyatı</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold text-neutral-950">
                      {totalPrice.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold block">
                    Havale: {havalePrice.toLocaleString("tr-TR")} ₺
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`py-3 px-5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-900 hover:bg-gold-600 text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Çantaya Eklendi ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Tasarımı Ekle</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Atölye Güvenceleri */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 text-xs font-mono text-neutral-600 grid grid-cols-2 gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Kararmaz Cila Garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Masif Küp Zincir Dahil</span>
              </div>
            </div>

          </div>

          {/* SAĞ KOLON: Adım Adım Özelleştirme Formu (7 Kolon) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. ADIM: Kask / Model Şablonunu Seçin */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Model Şablonunu Seçin
                  </h3>
                </div>
                <span className="text-xs font-mono text-gold-700 font-bold">{templates.length} Model</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((tmpl) => (
                  <div
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl);
                      // Şablon değişince gerçek fotoğraftan da esinlenilebilsin
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-3 ${
                      selectedTemplate.id === tmpl.id
                        ? "border-gold-500 bg-gold-50/40 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image src={tmpl.realPhoto} alt={tmpl.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-neutral-900 truncate">{tmpl.name}</h4>
                        <span className="font-mono text-xs font-bold text-neutral-950">{tmpl.basePrice} ₺</span>
                      </div>
                      <span className="text-[10px] text-gold-700 font-mono font-semibold block">{tmpl.tag}</span>
                      <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">{tmpl.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. ADIM: İki Renkli (Two-Tone) Kaplama & Vizör Renkleri */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Renk Kombinasyonu (Gövde & Vizör)
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">Two-Tone İki Renk</span>
              </div>

              {/* 2A: Kask Gövde Kaplaması */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">
                  A) Gövde Madeni / Rengi
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {bodyColors.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBodyColor(b)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedBodyColor.id === b.id
                          ? "border-gold-500 bg-gold-50/50 shadow-xs"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span 
                          className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" 
                          style={{ backgroundColor: b.hex }} 
                        />
                        <span className="text-xs font-bold text-neutral-900 truncate">{b.name}</span>
                      </div>
                      {b.priceDiff > 0 && (
                        <span className="text-[10px] font-mono text-gold-700 font-bold">+{b.priceDiff} ₺</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 2B: Vizör ve Detay Rengi (İki Renkli İşçilik) */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <label className="block text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider">
                  B) Vizör, Amblem & Detay Rengi (İki Renkli İmalat)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {visorColors.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVisorColor(v)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        selectedVisorColor.id === v.id
                          ? "border-gold-500 bg-neutral-900 text-white shadow-xs"
                          : "border-neutral-200 hover:border-neutral-300 bg-neutral-50 text-neutral-800"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span 
                          className="w-4 h-4 rounded-full border border-white/50 shrink-0" 
                          style={{ backgroundColor: v.hex }} 
                        />
                        <div className="min-w-0">
                          <span className="text-xs font-bold block truncate">{v.name}</span>
                          <span className="text-[10px] opacity-75 block truncate">{v.desc}</span>
                        </div>
                      </div>
                      {v.priceDiff > 0 && (
                        <span className="text-[10px] font-mono font-bold shrink-0 ml-1">+{v.priceDiff} ₺</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. ADIM: Canlı Yazılar, İsimler ve Numaralar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    İsim, Numara & Marka Yazıları
                  </h3>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-bold">Kask Üzerinde Yazar</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                
                {/* 3A: Çene / Ana Yazı */}
                <div>
                  <label className="block text-neutral-800 font-bold mb-1.5">
                    Alt Çene Yazısı (İsim / Marka) *
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={mainText}
                    onChange={(e) => setMainText(e.target.value)}
                    placeholder="Örn: REDBULL, YAMAHA, ERAY"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 font-mono tracking-widest font-bold uppercase focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Kaskın alt çene bandında büyük kabartma harflerle yer alır.
                  </span>
                </div>

                {/* 3B: Yarışçı Numarası veya Plaka */}
                <div>
                  <label className="block text-neutral-800 font-bold mb-1.5">
                    Yarışçı No veya Plaka *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={numberPlate}
                    onChange={(e) => setNumberPlate(e.target.value)}
                    placeholder="Örn: TR54, 34 BK 902, 46"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 font-mono tracking-widest font-bold uppercase focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Vizörün üstünde renkli yarışçı plakası olarak konumlanır.
                  </span>
                </div>

                {/* 3C: Kask Markası */}
                <div>
                  <label className="block text-neutral-800 font-bold mb-1.5">
                    Kask Markası Rozeti
                  </label>
                  <select
                    value={selectedHelmetBrand}
                    onChange={(e) => setSelectedHelmetBrand(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 font-mono font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    {helmetBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* 3D: Sembol / Bayrak */}
                <div>
                  <label className="block text-neutral-800 font-bold mb-1.5">
                    Kask Üzeri Sembol / Bayrak
                  </label>
                  <select
                    value={selectedSymbol.id}
                    onChange={(e) => {
                      const sym = symbols.find((s) => s.id === e.target.value);
                      if (sym) setSelectedSymbol(sym);
                    }}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 font-mono font-bold focus:outline-none focus:border-gold-500 focus:bg-white"
                  >
                    {symbols.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* 3E: Arka Yüz Lazer Kazıma (İsim, Kan Grubu, Tarih) */}
                <div className="sm:col-span-2">
                  <label className="block text-neutral-800 font-bold mb-1.5">
                    Arka Yüz Lazer Kazıma (Kan Grubu & İsim Soyisim)
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={backText}
                    onChange={(e) => setBackText(e.target.value)}
                    placeholder="Örn: A Rh(+) • Eray Yılmaz"
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 text-xs focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                  <span className="text-[10px] text-neutral-400 mt-1 block">
                    Kolyenin arka yüzüne ince lazerle işlenir (motorcular için kan grubu hayat kurtarır).
                  </span>
                </div>

              </div>
            </div>

            {/* 4. ADIM: Zincir Seçeneği */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-mono font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900">
                    Zincir & Askı Tercihi
                  </h3>
                </div>
                <span className="text-xs font-mono text-neutral-500">{selectedChain.name.split("(")[0]}</span>
              </div>

              <div className="space-y-2.5">
                {chains.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedChain(c)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      selectedChain.id === c.id
                        ? "border-gold-500 bg-gold-50/40 shadow-xs"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900">{c.name}</span>
                        {c.isDefault && (
                          <span className="text-[9px] font-mono bg-neutral-900 text-white px-1.5 py-0.5 rounded font-semibold">
                            Tavsiye Edilen
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-500 block mt-0.5">{c.desc}</span>
                    </div>

                    <span className="text-xs font-mono font-bold text-neutral-900 shrink-0 ml-2">
                      {c.priceDiff === 0 ? "Dahil" : `+${c.priceDiff} ₺`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sipariş Eylem Kartı */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-stone-900 via-neutral-900 to-stone-950 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-widest block mb-1">
                  Özel İmalat Sipariş Tutarı
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                    {totalPrice.toLocaleString("tr-TR")} ₺
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    Havale: {havalePrice.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 font-light">
                  {selectedTemplate.name} • [{mainText.toUpperCase()}] • [{numberPlate.toUpperCase()}] • {selectedBodyColor.name}
                </p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-neutral-950 rounded-full font-mono font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2.5 shrink-0"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAdded ? "Çantaya Eklendi ✓" : "Özel Kolyeyi Sepete Ekle"}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
