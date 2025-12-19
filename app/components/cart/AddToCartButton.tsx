"use client";

import { useCart } from "./CartProvider";

type Props = {
  documentId: string;
  Text: string;
  price: number;
};

export default function AddToCartButton({ documentId, Text, price }: Props) {
  const { addItem } = useCart();

  return (
    <button
  onClick={() => addItem({ documentId, Text, price })}
  className="
     mx-auto
    flex items-center justify-center gap-2
    px-6 py-3
    rounded-full
    bg-emerald-600 text-white
    text-sm font-medium
    hover:bg-emerald-700
    transition 
    cursor-pointer
  "
>
  <span className="text-base">🛒</span>
  <span>Agregar al carrito</span>
</button>
  );
}
