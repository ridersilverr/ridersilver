"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  MessageCircle,
  LayoutDashboard
} from "lucide-react";

interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  isExternal?: boolean;
  badge?: string;
  hasBadge?: boolean;
  badgeCount?: number;
  onClick?: () => void;
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, cartBounce } = useCart();
  const { user, isAdmin } = useAuth();

  const navItems: NavItem[] = [
    {
      name: "Ana Sayfa",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      name: "Koleksiyon",
      href: "/katalog",
      icon: Search,
      isActive: pathname === "/katalog",
    },
    {
      name: "Çantam",
      onClick: () => setIsCartOpen(true),
      icon: ShoppingBag,
      hasBadge: true,
      badgeCount: totalItems,
    },
    {
      name: user ? (isAdmin ? "Yönetim" : "Hesabım") : "Giriş",
      href: user ? (isAdmin ? "/admin" : "/hesabim") : "/giris",
      icon: isAdmin ? LayoutDashboard : User,
      isActive: pathname === "/giris" || pathname === "/hesabim" || pathname.startsWith("/admin"),
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-neutral-200/90 py-1.5 px-3 flex items-center justify-around lg:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.08)] select-none">
      {navItems.map((item, idx) => {
        const IconComponent = item.icon;

        if (item.onClick) {
          return (
            <button
              key={idx}
              type="button"
              onClick={item.onClick}
              className="relative flex flex-col items-center justify-center p-1.5 min-w-[56px] text-neutral-600 hover:text-gold-700 transition"
              aria-label={item.name}
            >
              <div className="relative">
                <IconComponent className={`w-5 h-5 transition-transform ${cartBounce ? "scale-125 text-gold-600 animate-bounce" : ""}`} />
                {item.hasBadge && item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span className={`absolute -top-1.5 -right-2 bg-neutral-900 text-white font-bold text-[9px] rounded-full w-4 h-4 flex items-center justify-center border border-white transition-transform ${
                    cartBounce ? "scale-125 bg-gold-600" : ""
                  }`}>
                    {item.badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono tracking-wider mt-1 font-semibold">
                {item.name}
              </span>
            </button>
          );
        }

        if (item.isExternal) {
          return (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="relative flex flex-col items-center justify-center p-1.5 min-w-[56px] text-emerald-700 transition"
              aria-label={item.name}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5 text-emerald-600" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-emerald-600 text-white font-bold text-[8px] px-1 rounded-full border border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono tracking-wider mt-1 font-bold text-emerald-800">
                {item.name}
              </span>
            </a>
          );
        }

        return (
          <Link
            key={idx}
            href={item.href!}
            className={`relative flex flex-col items-center justify-center p-1.5 min-w-[56px] transition ${
              item.isActive ? "text-gold-700 font-bold" : "text-neutral-500 hover:text-neutral-900"
            }`}
            aria-label={item.name}
          >
            <div className="relative">
              <IconComponent className={`w-5 h-5 ${item.isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-3 bg-gold-600 text-white font-bold text-[7px] px-1 rounded-full border border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-mono tracking-wider mt-1 ${item.isActive ? "font-bold text-neutral-900" : "font-medium"}`}>
              {item.name}
            </span>
            {item.isActive && (
              <span className="w-1 h-1 rounded-full bg-gold-600 mt-0.5" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
