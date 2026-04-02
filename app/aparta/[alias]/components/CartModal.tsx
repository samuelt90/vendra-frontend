"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function CartModal({ open, product, onClose }: any) {
  const router = useRouter();
  const params = useParams<{ alias: string }>();

  // 🔥 auto cerrar (3s)
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [open]);

  if (!open || !product) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4">

      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-4">

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-600 text-lg">✔</span>
          <p className="font-semibold text-sm">
            Producto agregado al carrito
          </p>
        </div>

        {/* Producto */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm">{product.Text}</p>
            <p className="text-xs text-gray-500">Cantidad: 1</p>
          </div>

          <p className="font-semibold text-sm">
            Q{product.price}
          </p>
        </div>

        {/* Línea */}
        <div className="border-t my-3"></div>

        {/* Total */}
        <div className="flex justify-between mb-4">
          <p className="text-sm font-semibold">Total</p>
          <p className="font-bold">Q{product.price}</p>
        </div>

        {/* Botones */}
        <div className="flex gap-2">

          {/* Ir al carrito */}
          <button
            onClick={() =>
              router.push(`/aparta/${params.alias}/cart`)
            }
            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm"
          >
            Ver carrito
          </button>

          {/* Seguir */}
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-3 rounded-xl text-sm"
          >
            Seguir comprando
          </button>

        </div>

      </div>
    </div>
  );
}