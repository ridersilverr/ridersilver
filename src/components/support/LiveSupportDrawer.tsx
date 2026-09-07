"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLiveSupport } from "@/context/LiveSupportContext";
import { siteConfig } from "@/config/site";
import { 
  MessageSquare, 
  X, 
  Send, 
  Headphones, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2, 
  Truck
} from "lucide-react";

export function LiveSupportDrawer() {
  const { isSupportOpen, closeSupport, messages, sendMessage, isTyping } = useLiveSupport();
  const [inputText, setInputText] = useState("");
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSupportOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isSupportOpen]);

  if (!isSupportOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText("");
  };

  const handleQuickReply = (topic: string) => {
    sendMessage(topic);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    sendMessage(`Beni arayabilir misiniz? İletişim Numaram: ${callbackPhone}`);
    setCallbackRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Arka Plan Karartma */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeSupport}
      />

      {/* Canlı Destek Paneli (Drawer) */}
      <div className="relative w-full max-w-md bg-[#FCFBF9] text-neutral-900 shadow-2xl h-full flex flex-col z-50 border-l border-neutral-200">
        
        {/* Üst Başlık (Obsidian & Gold) */}
        <div className="bg-neutral-950 text-white p-4 sm:p-5 border-b border-gold-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-amber-700 flex items-center justify-center text-neutral-950 font-bold shadow-md">
              <Headphones className="w-5 h-5 text-neutral-950" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-neutral-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-sm sm:text-base font-bold tracking-wider text-white">
                  Rider Silver Destek
                </h3>
                <span className="px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-400 text-[10px] font-mono font-semibold">
                  Canlı
                </span>
              </div>
              <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Müşteri Danışmanı Çevrimiçi
              </p>
            </div>
          </div>

          <button
            onClick={closeSupport}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bilgilendirme Rozetleri */}
        <div className="bg-amber-50/70 border-b border-amber-200/50 py-2 px-4 flex items-center justify-between text-[11px] font-mono text-amber-900">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            925 Ayar Has Gümüş Danışmanlığı
          </span>
          <span className="text-[10px] text-amber-700">Yanıt: ~30 sn</span>
        </div>

        {/* Mesaj Akışı */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs leading-relaxed ${
                    isUser
                      ? "bg-neutral-900 text-white rounded-br-xs font-light"
                      : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-xs shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Hızlı Yanıt Butonları (Eğer Varsa) */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply)}
                        className="px-2.5 py-1.5 rounded-full bg-white hover:bg-gold-50 text-neutral-800 hover:text-gold-900 border border-neutral-200 hover:border-gold-300 font-mono text-[10px] font-medium transition shadow-2xs text-left"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Temsilci Yazıyor Animasyonu */}
          {isTyping && (
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-2xl px-3.5 py-2.5 w-fit shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-600 animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] font-mono text-neutral-400 ml-1">Danışman yazıyor...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Hızlı Arama Talebi Formu */}
        <div className="p-3 bg-white border-t border-neutral-200 shrink-0">
          {!callbackRequested ? (
            <form onSubmit={handleCallbackSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="tel"
                  placeholder="Sizi arayalım: 05XX XXX XX XX"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-gold-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-neutral-900 hover:bg-gold-600 text-white rounded-xl text-xs font-mono font-semibold transition shrink-0 flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Ara</span>
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Numaranız alındı, temsilcimiz en kısa sürede arayacaktır.</span>
            </div>
          )}
        </div>

        {/* Mesaj Gönderme Formu */}
        <form onSubmit={handleSend} className="p-3 bg-neutral-50 border-t border-neutral-200 shrink-0 flex items-center gap-2">
          <input
            type="text"
            placeholder="Mesajınızı buraya yazın..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-gold-500/50"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-gold-600 hover:bg-gold-700 disabled:bg-neutral-300 text-neutral-950 font-bold rounded-xl transition shadow-sm disabled:cursor-not-allowed"
            aria-label="Gönder"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

      </div>
    </div>
  );
}
