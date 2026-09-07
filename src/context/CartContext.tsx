"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product, CustomDesignConfig } from "@/types";
import { siteConfig } from "@/config/site";

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product, 
    quantity?: number, 
    selectedSize?: string, 
    selectedMaterial?: string,
    customDesign?: CustomDesignConfig
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  freeShippingProgress: number;
  remainingForFreeShipping: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartBounce: boolean;
  lastAddedProduct: { product: Product; quantity: number } | null;
  toastVisible: boolean;
  setToastVisible: (visible: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "simcila_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [cartBounce, setCartBounce] = useState<boolean>(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<{ product: Product; quantity: number } | null>(null);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Sayfa yüklendiğinde yerel depolamadan sepeti al
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed: CartItem[] = JSON.parse(savedCart);
        const normalized = parsed.map((item, idx) => ({
          ...item,
          id: item.id || `${item.product.id}-${Date.now()}-${idx}`,
        }));
        setItems(normalized);
      }
    } catch (e) {
      console.error("Sepet okunamadı:", e);
    }
  }, []);

  // Sepet değiştiğinde yerel depolamaya kaydet
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Sepet kaydedilemedi:", e);
    }
  }, [items, isMounted]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedMaterial?: string,
    customDesign?: CustomDesignConfig
  ) => {
    const finalMaterial = (selectedMaterial || product.material || "").trim();
    const finalSize = (selectedSize || "").trim();

    setItems((prevItems) => {
      // Tüm özellikleri kontrol et: Ürün ID, Beden/Ölçü, Maden ve Özel Tasarım detayları
      const existingIndex = prevItems.findIndex((item) => {
        if (item.product.id !== product.id) return false;

        const itemSize = (item.selectedSize || "").trim();
        if (itemSize !== finalSize) return false;

        const itemMaterial = (item.selectedMaterial || item.product.material || "").trim();
        if (itemMaterial !== finalMaterial) return false;

        // Özel tasarım kontrolü
        if (customDesign || item.customDesign) {
          if (!customDesign || !item.customDesign) return false;
          return (
            customDesign.template === item.customDesign.template &&
            (customDesign.plateText || "") === (item.customDesign.plateText || "") &&
            (customDesign.mainText || "") === (item.customDesign.mainText || "") &&
            (customDesign.numberPlate || "") === (item.customDesign.numberPlate || "") &&
            (customDesign.bodyColor || "") === (item.customDesign.bodyColor || "") &&
            (customDesign.chainType || "") === (item.customDesign.chainType || "") &&
            (customDesign.brand || "") === (item.customDesign.brand || "") &&
            (customDesign.backText || "") === (item.customDesign.backText || "")
          );
        }

        return true;
      });

      // Seçili tüm özellikler birebir aynı ise: mevcuda +1 ekle!
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      // Özellikler farklı ise: yeni satır olarak ekle (kendi benzersiz ID'si ile)
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        product,
        quantity,
        selectedSize: finalSize || undefined,
        selectedMaterial: finalMaterial || undefined,
        customDesign,
      };

      return [...prevItems, newItem];
    });

    // KULLANICI İSTEĞİ: Sepet çekmecesi otomatik AÇILMASIN, alışveriş kesintisiz devam etsin.
    // Sağ üstteki sepete animasyonla gitsin:
    setLastAddedProduct({ product, quantity });
    setToastVisible(true);
    setCartBounce(true);

    setTimeout(() => {
      setCartBounce(false);
    }, 1000);

    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => (item.id ? item.id !== cartItemId : item.product.id !== cartItemId))
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) => {
        const matches = item.id ? item.id === cartItemId : item.product.id === cartItemId;
        return matches ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Hesaplamalar
  const subtotal = items.reduce((acc, item) => {
    const activePrice = item.product.salePrice ?? item.product.price;
    return acc + activePrice * item.quantity;
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Ücretsiz kargo barı (1000 TL)
  const freeShippingThreshold = siteConfig.freeShippingThreshold;
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        freeShippingProgress,
        remainingForFreeShipping,
        isCartOpen,
        setIsCartOpen,
        cartBounce,
        lastAddedProduct,
        toastVisible,
        setToastVisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
