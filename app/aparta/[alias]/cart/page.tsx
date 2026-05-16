"use client";

import { useAparta } from "@/app/aparta/context/ApartaContext";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import Stepper from "../components/Stepper";

export default function CartPage() {
  const { items, removeItem } = useAparta();
  const router = useRouter();
  const params = useParams<{ alias: string }>();
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  const [toast, setToast] = useState("");

  const handleRemove = async (item: any) => {
    try {
      await fetch(`${STRAPI}/api/aparta-products/${item.documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            estado: "disponible",
          },
        }),
      });

      removeItem(item.id);

      setToast("Producto eliminado. La prenda volvió a estar disponible.");

      setTimeout(() => {
        setToast("");
      }, 2500);
    } catch (error) {
      console.error(error);

      setToast("No se pudo liberar la prenda. Intenta de nuevo.");

      setTimeout(() => {
        setToast("");
      }, 2500);
    }
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="max-w-md mx-auto p-4 pb-32">
      <Stepper step={1} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg text-sm z-50">
          {toast}
        </div>
      )}

      {/* VACÍO */}
      {items.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>

          <button
            onClick={() => router.push(`/aparta/${params.alias}`)}
            className="text-black underline"
          >
            Volver a productos
          </button>
        </div>
      )}

      {/* CARD PRINCIPAL */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h1 className="text-xl font-semibold text-center mb-1">
            Carrito
          </h1>

          <p className="text-center text-gray-500 text-sm mb-6">
            Revisa tu pedido antes de confirmar
          </p>

          {/* PRODUCTOS */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between">
                  <p className="font-medium">{item.Text}</p>
                  <p className="font-semibold">Q{item.price}</p>
                </div>

                <button
                  onClick={() => handleRemove(item)}
                  className="text-red-500 text-sm mt-1"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between mt-6">
            <p className="text-gray-600">Total</p>
            <p className="font-bold text-lg">Q{total}</p>
          </div>

          {/* BOTÓN */}
          <button
            onClick={() => router.push(`/aparta/${params.alias}/checkout`)}
            className="w-full bg-green-600 text-white py-4 rounded-full mt-5 font-semibold"
          >
            Confirmar pedido
          </button>

          {/* LINK */}
          <button
            onClick={() => router.push(`/aparta/${params.alias}`)}
            className="w-full text-center mt-3 text-sm text-gray-500"
          >
            ← Seguir comprando
          </button>
        </div>
      )}
    </main>
  );
}
