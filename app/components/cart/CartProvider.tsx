"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  documentId: string;
  Text: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  setQty: (documentId: string, qty: number) => void;
  removeItem: (documentId: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function storageKey(storeSlug: string) {
  return `vendra_cart_${storeSlug}`;
}

export function CartProvider({
  storeSlug,
  children,
}: {
  storeSlug: string;
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  // cargar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(storeSlug));
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [storeSlug]);

  // guardar
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(storeSlug), JSON.stringify(items));
    } catch {}
  }, [items, storeSlug]);

  const api = useMemo<CartContextValue>(() => {
    const addItem: CartContextValue["addItem"] = (item) => {
      setItems((prev) => {
        const found = prev.find((p) => p.documentId === item.documentId);
        if (found) {
          return prev.map((p) =>
            p.documentId === item.documentId ? { ...p, qty: p.qty + 1 } : p
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
    };

    const setQty: CartContextValue["setQty"] = (documentId, qty) => {
      setItems((prev) => {
        if (qty <= 0) return prev.filter((p) => p.documentId !== documentId);
        return prev.map((p) => (p.documentId === documentId ? { ...p, qty } : p));
      });
    };

    const removeItem: CartContextValue["removeItem"] = (documentId) => {
      setItems((prev) => prev.filter((p) => p.documentId !== documentId));
    };

    const clear = () => setItems([]);

    const totalItems = items.reduce((acc, p) => acc + p.qty, 0);
    const totalPrice = items.reduce((acc, p) => acc + p.qty * (p.price || 0), 0);

    return { items, addItem, setQty, removeItem, clear, totalItems, totalPrice };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider />");
  return ctx;
}