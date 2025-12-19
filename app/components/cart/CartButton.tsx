"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartButton({ storeSlug }: { storeSlug: string }) {
  const { totalItems } = useCart();

  return (
    <Link href={`/tienda/${storeSlug}/cart`}>
      <button style={{ position: "fixed", top: 16, right: 16 }}>
        🛒 Realizar compra {totalItems > 0 && `(${totalItems})`}
      </button>
    </Link>
  );
}