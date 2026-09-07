"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ChatMessage {
  id: string;
  sender: "user" | "agent" | "system";
  text: string;
  timestamp: string;
  quickReplies?: string[];
}

interface LiveSupportContextType {
  isSupportOpen: boolean;
  openSupport: (initialMessage?: string, initialTopic?: string) => void;
  closeSupport: () => void;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
  unreadCount: number;
}

const LiveSupportContext = createContext<LiveSupportContextType | undefined>(undefined);

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    sender: "agent",
    text: "Merhaba! Rider Silver Atölyesi'ne hoş geldiniz. Size nasıl yardımcı olabiliriz?",
    timestamp: "Şimdi",
    quickReplies: [
      "Sipariş & Kargo Durumu",
      "Özel Ölçü & Kişiselleştirme",
      "Havale / EFT %5 İndirim Teyidi",
      "Ömür Boyu Cila & Garanti",
    ],
  },
];

export function LiveSupportProvider({ children }: { children: ReactNode }) {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const openSupport = (initialMessage?: string, initialTopic?: string) => {
    setIsSupportOpen(true);
    setUnreadCount(0);

    if (initialMessage) {
      sendMessage(initialMessage);
    }
  };

  const closeSupport = () => {
    setIsSupportOpen(false);
  };

  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Akıllı Temsilci Yanıtı
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Mesajınız stil danışmanımıza iletildi. Talebinizi inceliyoruz, hemen yardımcı oluyoruz.";

      const lower = text.toLowerCase();
      if (lower.includes("kargo") || lower.includes("sipariş") || lower.includes("nerede")) {
        replyText = "Tüm siparişlerimiz 1-3 iş günü içinde sigortalı olarak kargoya verilir ve 1.000 TL üzeri kargo ücretsizdir. Sipariş takip numaranız için lütfen sipariş kodunuzu veya kayıtlı telefonunuzu paylaşın.";
      } else if (lower.includes("havale") || lower.includes("eft") || lower.includes("indirim")) {
        replyText = "Havale ve EFT siparişlerinizde sepet tutarı üzerinden anında %5 ek indirim uygulanmaktadır. Ödeme yaptıktan sonra dekontunuzu veya sipariş numaranızı buradan bildirebilirsiniz.";
      } else if (lower.includes("ölçü") || lower.includes("yüzük") || lower.includes("zincir")) {
        replyText = "Kolye zincirlerimiz standart 55 cm ve 65 cm seçeneklerine sahiptir. Yüzük ölçünüzü bilmiyorsanız, bir ip yardımıyla parmak çevrenizi mm cinsinden ölçüp bize iletebilirsiniz; kuyumcumuz tam ölçüyü belirleyecektir.";
      } else if (lower.includes("cila") || lower.includes("garanti") || lower.includes("kararma")) {
        replyText = "Tüm Rider Silver mücevherleri 925 ayar has gümüşten üretilmekte olup 'Ömür Boyu Ücretsiz Cila ve Parlatma Garantisi'ne sahiptir. İstediğiniz zaman atölyemize ücretsiz gönderebilirsiniz.";
      }

      const agentReply: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: "agent",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentReply]);
    }, 900);
  };

  return (
    <LiveSupportContext.Provider
      value={{
        isSupportOpen,
        openSupport,
        closeSupport,
        messages,
        sendMessage,
        isTyping,
        unreadCount,
      }}
    >
      {children}
    </LiveSupportContext.Provider>
  );
}

export function useLiveSupport() {
  const context = useContext(LiveSupportContext);
  if (!context) {
    throw new Error("useLiveSupport must be used within a LiveSupportProvider");
  }
  return context;
}
