"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getLocalOrders } from "@/lib/store";
import { Order } from "@/types";
import { 
  Package, 
  User, 
  Clock, 
  CheckCircle2, 
  LogOut, 
  ShoppingBag
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) {
      router.push("/giris");
      return;
    }
    const all = getLocalOrders();
    setOrders(all);
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="bg-[#FCFBF9] min-h-screen text-neutral-900 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Kullanıcı Karşılama Kartı */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-600 text-neutral-950 flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-normal">
                Hoş Geldiniz, <strong className="font-bold text-neutral-900">{user.fullName}</strong>
              </h1>
              <span className="font-mono text-xs text-neutral-500">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-gold-50 border border-gold-300 text-gold-900 font-mono text-xs font-bold rounded-full hover:bg-gold-100 transition"
              >
                Yönetim Paneli
              </Link>
            )}
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="px-4 py-2 border border-neutral-300 text-neutral-600 hover:text-rose-600 font-mono text-xs rounded-full transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Sipariş Geçmişi */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <h2 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-gold-600" />
              <span>Sipariş Geçmişim ({orders.length})</span>
            </h2>
            <Link href="/katalog" className="font-mono text-xs text-gold-700 hover:underline">
              Yeni Parça Keşfet →
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="font-serif text-base text-neutral-900">Henüz Bir Siparişiniz Yok</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto font-light">
                Atölyemizde üretilen özel tasarımlar arasından dilediğinizi seçip ilk siparişinizi hemen verebilirsiniz.
              </p>
              <Link
                href="/katalog"
                className="inline-block mt-2 px-6 py-2.5 bg-neutral-900 text-white rounded-full font-mono text-xs font-bold uppercase hover:bg-gold-600 transition"
              >
                Kataloğa Göz At
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-neutral-200 bg-stone-50/60 space-y-4 font-mono text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-neutral-500">Sipariş No:</span>
                      <strong className="text-neutral-900 ml-1.5">{order.orderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500">Tarih:</span>
                      <span className="text-neutral-700 ml-1.5">
                        {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Ödeme:</span>
                      <span className="text-neutral-700 ml-1.5">
                        {order.paymentMethod === "havale_eft" ? "Havale / EFT" : "Kredi Kartı"}
                      </span>
                    </div>
                    <div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-neutral-800 text-xs">
                        <div>
                          <span>{item.product.title}</span>
                          {item.customDesign && (
                            <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-mono">
                              <span className="bg-gold-100 text-gold-900 px-1.5 py-0.5 rounded font-bold border border-gold-300">
                                Plaka: {item.customDesign.plateText}
                              </span>
                              <span className="text-neutral-500">{item.customDesign.brand}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-neutral-500 mt-1 sm:mt-0 font-mono">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {order.trackingNumber && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-950">
                        <Package className="w-4 h-4 text-blue-700 shrink-0" />
                        <div>
                          <span className="font-bold">{order.trackingCompany || "Kargo Firması"}: </span>
                          <span className="font-mono">{order.trackingNumber}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                        Yolda
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-neutral-200 text-xs">
                    <span className="text-neutral-500">{order.customer.city} / {order.customer.district}</span>
                    <span className="font-bold text-neutral-950 text-sm">
                      Toplam: {order.totalAmount.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
