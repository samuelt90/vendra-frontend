"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle2, ShoppingCart } from "lucide-react";

export default function CartModal({ open, product, onClose }: any) {
  const router = useRouter();
  const params = useParams<{ alias: string }>();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Prenda agregada
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                Tu prenda fue agregada al carrito para continuar con el pedido.
              </p>
            </div>
          </div>

          {/* Producto */}
          <div className="mt-5 rounded-2xl bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium leading-snug text-gray-900">
                  {product.Text}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Cantidad: 1
                </p>
              </div>

              <p className="shrink-0 text-sm font-bold text-gray-900">
                Q{product.price}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
              <p className="text-sm font-medium text-gray-500">
                Total
              </p>

              <p className="text-base font-bold text-gray-950">
                Q{product.price}
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => router.push(`/aparta/${params.alias}/cart`)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] sm:hover:bg-green-700"
            >
              <ShoppingCart size={17} />
              Ver carrito
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition active:scale-[0.98] sm:hover:bg-gray-50"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
