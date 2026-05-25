"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Item = {
  id: number;
  documentId: string;
  Text: string;
  price: number;
  Image?: string | null;
};

type CatalogCacheItem = {
  store: any;
  products: any[];
  cachedAt: number;
};

type ApartaContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  clear: () => void;

  catalogCache: Record<string, CatalogCacheItem>;
  getCatalogCache: (alias: string) => CatalogCacheItem | null;
  setCatalogCache: (alias: string, store: any, products: any[]) => void;
  clearCatalogCache: (alias?: string) => void;
};

const ApartaContext = createContext<ApartaContextType | null>(null);

export function ApartaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [catalogCache, setCatalogCacheState] = useState<
    Record<string, CatalogCacheItem>
  >({});

  // cargar carrito desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("aparta_cart");

    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem("aparta_cart");
      }
    }
  }, []);

  // guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("aparta_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Item) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev;

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

  const getCatalogCache = (alias: string) => {
    if (!alias) return null;

    return catalogCache[alias] ?? null;
  };

  const setCatalogCache = (alias: string, store: any, products: any[]) => {
    if (!alias) return;

    setCatalogCacheState((prev) => ({
      ...prev,
      [alias]: {
        store,
        products,
        cachedAt: Date.now(),
      },
    }));
  };

  const clearCatalogCache = (alias?: string) => {
    if (!alias) {
      setCatalogCacheState({});
      return;
    }

    setCatalogCacheState((prev) => {
      const copy = { ...prev };
      delete copy[alias];
      return copy;
    });
  };

  return (
    <ApartaContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clear,
        catalogCache,
        getCatalogCache,
        setCatalogCache,
        clearCatalogCache,
      }}
    >
      {children}
    </ApartaContext.Provider>
  );
}

export function useAparta() {
  const ctx = useContext(ApartaContext);

  if (!ctx) {
    throw new Error("useAparta debe usarse dentro de ApartaProvider");
  }

  return ctx;
}
