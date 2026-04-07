"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartButton({ storeSlug }: { storeSlug: string }) {
  const { totalItems } = useCart();

  if (!totalItems) return null;

  return (
    <Link href={`/tienda/${storeSlug}/cart`}>
      <div
        className="fixed top-4 right-4 z-50"
      >
        <button className="bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2">
          <span>🛒</span>
          <span className="text-sm font-semibold">
            {totalItems}
          </span>
        </button>
      </div>
    </Link>
  );
}
