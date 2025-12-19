"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../../components/cart/CartProvider";

export default function CartPage() {
  const { items, setQty, totalPrice } = useCart();
  const { alias } = useParams<{ alias: string }>();

  const isEmpty = items.length === 0;

  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-slate-900">Carrito</h1>
            <p className="mt-1 text-sm text-slate-500">
              Revisa tu pedido antes de confirmar
            </p>
          </div>

          {isEmpty ? (
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-600">Carrito vacío</p>

              <div className="mt-6 flex justify-center">
                <Link
                  href={`/tienda/${alias}`}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          ) : (
            <>
              <ul className="mt-8 space-y-4">
                {items.map((it) => (
                  <li
                    key={it.documentId}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          {it.Text}
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Q{it.price} <span className="text-slate-400">c/u</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-slate-900">
                          Q{it.price * it.qty}
                        </div>
                        <div className="text-xs text-slate-500">Subtotal</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1">
                        <button
                          type="button"
                          onClick={() => setQty(it.documentId, it.qty - 1)}
                          className="inline-flex h-8 w-10 items-center justify-center rounded-full text-base font-semibold text-slate-700 transition hover:bg-white hover:shadow-sm active:scale-[0.98] cursor-pointer"
                          aria-label="Disminuir cantidad"
                        >
                          –
                        </button>

                        <span className="px-3 text-sm font-semibold text-slate-900">
                          {it.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => setQty(it.documentId, it.qty + 1)}
                          className="inline-flex h-8 w-10 items-center justify-center rounded-full text-base font-semibold text-slate-700 transition hover:bg-white hover:shadow-sm active:scale-[0.98] cursor-pointer"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-sm text-slate-500">
                        Total item:{" "}
                        <span className="font-semibold text-slate-900">
                          Q{it.price * it.qty}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total</span>
                  <span className="text-xl font-semibold text-slate-900">
                    Q{totalPrice}
                  </span>
                </div>

                <div className="mt-4 flex justify-center">
                  <Link
                    href={`/tienda/${alias}/checkout`}
                    className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                  >
                    Confirmar pedido
                  </Link>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href={`/tienda/${alias}`}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900 cursor-pointer"
                >
                  <span aria-hidden>←</span>
                  Seguir comprando
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
