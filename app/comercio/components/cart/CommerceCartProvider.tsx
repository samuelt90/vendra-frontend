"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CommerceProduct } from "../../data/products";

export type CommerceCartItem = {
  product: CommerceProduct;
  quantity: number;
};

type CommerceCartContextValue = {
  items: CommerceCartItem[];

  totalItems: number;
  subtotal: number;

  cartOpen: boolean;

  addProduct: (
    product: CommerceProduct,
    quantity?: number
  ) => void;

  removeProduct: (
    productId: string
  ) => void;

  incrementProduct: (
    productId: string
  ) => void;

  decrementProduct: (
    productId: string
  ) => void;

  setProductQuantity: (
    productId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  openCart: () => void;
  closeCart: () => void;
};

const CommerceCartContext =
  createContext<CommerceCartContextValue | null>(
    null
  );

type CommerceCartProviderProps = {
  children: ReactNode;
};

export default function CommerceCartProvider({
  children,
}: CommerceCartProviderProps) {
  const [items, setItems] = useState<
    CommerceCartItem[]
  >([]);

  const [cartOpen, setCartOpen] =
    useState(false);

  function addProduct(
    product: CommerceProduct,
    quantity = 1
  ) {
    if (quantity <= 0) return;

    setItems((current) => {
      const existing = current.find(
        (item) =>
          item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity,
        },
      ];
    });
  }

  function removeProduct(
    productId: string
  ) {
    setItems((current) =>
      current.filter(
        (item) =>
          item.product.id !== productId
      )
    );
  }

  function incrementProduct(
    productId: string
  ) {
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  }

  function decrementProduct(
    productId: string
  ) {
    setItems((current) =>
      current.flatMap((item) => {
        if (
          item.product.id !== productId
        ) {
          return [item];
        }

        if (item.quantity <= 1) {
          return [];
        }

        return [
          {
            ...item,
            quantity:
              item.quantity - 1,
          },
        ];
      })
    );
  }

  function setProductQuantity(
    productId: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }

    setItems((current) =>
      current.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  }

  function clearCart() {
    setItems([]);
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  const totalItems = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.product.price *
            item.quantity,
        0
      ),
    [items]
  );

  const value =
    useMemo<CommerceCartContextValue>(
      () => ({
        items,

        totalItems,
        subtotal,

        cartOpen,

        addProduct,
        removeProduct,
        incrementProduct,
        decrementProduct,
        setProductQuantity,

        clearCart,

        openCart,
        closeCart,
      }),
      [
        items,
        totalItems,
        subtotal,
        cartOpen,
      ]
    );

  return (
    <CommerceCartContext.Provider
      value={value}
    >
      {children}
    </CommerceCartContext.Provider>
  );
}

export function useCommerceCart() {
  const context = useContext(
    CommerceCartContext
  );

  if (!context) {
    throw new Error(
      "useCommerceCart debe utilizarse dentro de CommerceCartProvider."
    );
  }

  return context;
}
