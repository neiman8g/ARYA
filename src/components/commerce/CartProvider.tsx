"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  size: string;
  color: string;
  qty: number;
};

type CartContextValue = {
  cart: CartItem[];
  cartOpen: boolean;
  cartCount: number;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, "qty">) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  checkoutLoading: boolean;
  checkoutError: string | null;
  goToCheckout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = useCallback((item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const goToCheckout = useCallback(async () => {
    if (cart.length === 0) return;
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(({ id, productId, name, size, color, qty }) => ({ id, productId, name, size, color, qty })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCheckoutError(data.error || "Checkout failed");
        setCheckoutLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError("Checkout is not configured");
    } catch {
      setCheckoutError("Something went wrong");
    }
    setCheckoutLoading(false);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, cartOpen, cartCount, setCartOpen, addToCart, updateQty, removeFromCart, checkoutLoading, checkoutError, goToCheckout }}
    >
      {children}
    </CartContext.Provider>
  );
}
