"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "./CartProvider";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartModal({ open, onClose }: Props) {
  const { items, totalPrice } = useCart();
  const params = useParams();

  // tu ruta es /tienda/[alias]/...
  const storeSlug = (params?.alias as string) || "";

  if (!open) return null;

return (
  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-3">
    {/* CARD */}
    <div
      className="
        w-full sm:w-[420px]
        bg-white rounded-2xl
        p-4 sm:p-5
        shadow-xl
        max-h-[75vh] overflow-auto
      "
    >
      <p className="font-semibold mb-3">✅ Producto agregado al carrito</p>

      {/* LISTA (máx 5) */}
      <div className="space-y-3 mb-4">
        {items.slice(0, 5).map((item) => (
          <div key={item.documentId} className="flex justify-between items-start">
            <div className="text-sm">
              <div className="font-medium leading-5">{item.Text}</div>
              <div className="text-gray-500 text-xs">Cantidad: {item.qty}</div>
            </div>
            <div className="text-sm font-semibold">Q{item.price * item.qty}</div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between font-bold border-t pt-3 mb-4">
        <span>Total</span>
        <span>Q{totalPrice}</span>
      </div>

      {/* BOTONES */}
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={`/tienda/${storeSlug}/cart`}
          onClick={onClose}
          className="text-center bg-black text-white py-3 rounded-full font-medium"
        >
          Ir al carrito
        </Link>

        <button
          onClick={onClose}
          className="border py-3 rounded-full font-medium"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  </div>
);
}
