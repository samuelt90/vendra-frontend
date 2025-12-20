"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import CartModal from "./CartModal";

type Props = {
  documentId: string;
  Text: string;
  price: number;
  storeSlug: string;
};

export default function AddToCartButton({
  documentId,
  Text,
  price,
  storeSlug,
}: Props) {
  const { addItem } = useCart();

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => {
          addItem({ documentId, Text, price });
          setOpen(true);
        }}
        className="
          mx-auto
          flex items-center justify-center gap-2
          px-6 py-3
          rounded-full
          bg-emerald-600 text-white
          text-sm font-medium
          hover:bg-emerald-700 transition
          cursor-pointer
        "
      >
        <span className="text-base">🛒</span>
        <span>Agregar al carrito</span>
      </button>

      <CartModal open={open} onClose={closeModal}/>
    </>
  );
}
