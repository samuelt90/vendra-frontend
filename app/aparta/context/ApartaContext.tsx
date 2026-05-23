"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Item = {
  id: number;
  documentId: string;
  Text: string;
  price: number;
  Image?: string | null;
};

type ApartaContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

const ApartaContext = createContext<ApartaContextType | null>(null);

export function ApartaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);

  // cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aparta_cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem("aparta_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Item) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev; // ❗ evita duplicados
      return [...prev, item];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

 const clear = () => {
  setItems([]);
  localStorage.removeItem("aparta_cart");
};

  return (
    <ApartaContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </ApartaContext.Provider>
  );
}

export function useAparta() {
  const ctx = useContext(ApartaContext);
  if (!ctx) throw new Error("useAparta debe usarse dentro de ApartaProvider");
  return ctx;
}
