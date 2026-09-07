"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Building2, 
  MessageCircle, 
  ArrowRight
} from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "SC-849201";
  const method = searchParams.get("method") || "havale_eft";
  const total = searchParams.get("total") || "1490";

  const [copiedIban, setCopiedIban] = useState<string | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#ECC880", "#10b981", "#ca8a04"],
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIban(text);
    setTimeout(() => setCopiedIban(null), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Merhaba, ${siteConfig.name} üzerinden #${orderId} numaralı siparişimi verdim. Bilgi almak istiyorum.`
  );

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl p-8 sm:p-12 text-center space-y-6 bg-white border border-neutral-200 shadow-xl">
          
          {/* Başarı İkonu */}
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-700 block mb-1 font-bold">
              Siparişiniz Başarıyla Alındı
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-neutral-900">
              Teşekkür Ederiz, Işıltınız Yola Çıkıyor!
            </h1>
            <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto font-light">
              Mücevheriniz atölyemizde özenle kontrol edilip sigortalı özel kutusunda yola çıkarılacaktır.
            </p>
          </div>

          {/* Sipariş No */}
          <div className="inline-flex items-center gap-3 bg-stone-50 px-6 py-3 rounded-full border border-neutral-200 text-xs font-mono">
            <span className="text-neutral-500">Referans Kodu:</span>
            <span className="font-bold text-neutral-900 text-sm">{orderId}</span>
            <button onClick={() => handleCopy(orderId)} className="text-neutral-400 hover:text-neutral-700 p-1">
              {copiedIban === orderId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Havale Talimatı */}
          {method === "havale_eft" && (
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-left space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <span className="font-bold text-amber-950 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gold-700" />
                  Havale / EFT Talimatı
                </span>
                <span className="font-bold text-emerald-800 text-sm">
                  Ödenecek: {Number(total).toLocaleString("tr-TR")} ₺
                </span>
              </div>

              <p className="text-neutral-700 font-light leading-relaxed">
                Lütfen havale yaparken açıklama kısmına <strong>{orderId}</strong> referans numarasını yazmayı unutmayınız.
              </p>

              <div className="space-y-2">
                {siteConfig.bankAccounts.slice(0, 2).map((acc) => (
                  <div key={acc.id} className="p-3 bg-white rounded-xl border border-neutral-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-bold text-neutral-900">{acc.bankName}</span>
                      <code className="text-[11px] text-neutral-800 block font-bold mt-0.5">{acc.iban}</code>
                    </div>
                    <button
                      onClick={() => handleCopy(acc.iban)}
                      className="px-3 py-1 bg-neutral-100 hover:bg-gold-500 hover:text-white rounded-lg text-neutral-800 font-bold transition"
                    >
                      {copiedIban === acc.iban ? "Kopyalandı" : "Kopyala"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aksiyon Butonları */}
          <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/905325550199?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Teyit Bildir</span>
            </a>

            <Link
              href="/katalog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-900 hover:bg-gold-600 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-full transition shadow-md"
            >
              <span>Kataloğa Dön</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] bg-[#FCFBF9] flex items-center justify-center font-mono text-xs text-neutral-500">
          Sipariş Özeti Yükleniyor...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
