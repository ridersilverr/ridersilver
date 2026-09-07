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
        setItems(JSON.parse(savedCart));
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
    setItems((prevItems) => {
      // Eğer kişiye özel tasarım ise her seferinde yeni kalem ekle (çünkü plaka veya yazı farklı olabilir)
      if (customDesign) {
        return [
          ...prevItems,
          {
            product,
            quantity,
            selectedSize,
            selectedMaterial: selectedMaterial || product.material,
            customDesign,
          },
        ];
      }

      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedMaterial === selectedMaterial &&
          !item.customDesign
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedSize,
          selectedMaterial: selectedMaterial || product.material,
        },
      ];
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

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
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
