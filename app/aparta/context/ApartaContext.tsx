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
  catalogCacheReady: boolean;
  getCatalogCache: (alias: string) => CatalogCacheItem | null;
  setCatalogCache: (alias: string, store: any, products: any[]) => void;
  clearCatalogCache: (alias?: string) => void;
};

const ApartaContext = createContext<ApartaContextType | null>(null);

const CART_KEY = "aparta_cart";
const CATALOG_CACHE_KEY = "aparta_catalog_cache";
const CATALOG_CACHE_TTL = 30 * 1000; // 30 segundos

export function ApartaProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [catalogCache, setCatalogCacheState] = useState<
    Record<string, CatalogCacheItem>
  >({});
  const [catalogCacheReady, setCatalogCacheReady] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY);

    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        localStorage.removeItem(CART_KEY);
      }
    }

    const savedCatalog = sessionStorage.getItem(CATALOG_CACHE_KEY);

    if (savedCatalog) {
      try {
        const parsed = JSON.parse(savedCatalog) as Record<
          string,
          CatalogCacheItem
        >;

        const now = Date.now();

        const validCache = Object.fromEntries(
          Object.entries(parsed).filter(
            ([, value]) => now - value.cachedAt < CATALOG_CACHE_TTL
          )
        );

        setCatalogCacheState(validCache);

        if (Object.keys(validCache).length === 0) {
          sessionStorage.removeItem(CATALOG_CACHE_KEY);
        }
      } catch {
        sessionStorage.removeItem(CATALOG_CACHE_KEY);
      }
    }

    setCatalogCacheReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!catalogCacheReady) return;

    sessionStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify(catalogCache));
  }, [catalogCache, catalogCacheReady]);

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
    localStorage.removeItem(CART_KEY);
  };

  const getCatalogCache = (alias: string) => {
    if (!alias) return null;

    const cached = catalogCache[alias];
    if (!cached) return null;

    const isExpired = Date.now() - cached.cachedAt > CATALOG_CACHE_TTL;

    if (isExpired) {
      return null;
    }

    return cached;
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
      sessionStorage.removeItem(CATALOG_CACHE_KEY);
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
        catalogCacheReady,
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
