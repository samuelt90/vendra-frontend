"use client";

import { useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

const PRODUCTS = [
  { code: "p1", name: "Producto 1", price: 100 },
  { code: "p2", name: "Producto 2", price: 150 },
  { code: "p3", name: "Producto 3", price: 200 },
];

// número de WhatsApp del vendedor (sin +)
const WHATSAPP_NUMBER = "50243973638";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code") ?? "";
  const product = PRODUCTS.find((p) => p.code === code);
  const [qty, setQty] = useState(1);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const address = String(fd.get("address") ?? "");
    const notes = String(fd.get("notes") ?? "");
    const quantity = qty <= 0 ? 1 : qty;
    const total = product ? product.price * quantity : 0;

    const message = `Hola, quiero comprar:

Producto: ${product?.name ?? code}
Precio unitario: Q${product?.price ?? "?"}
Cantidad: ${quantity}
Total: Q${total}

Nombre: ${name}
Teléfono: ${phone}
Dirección: ${address}
Notas: ${notes}`;

    const url = `https://wa.me/${38093056}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = url;
  }

  if (!product) {
    return (
      <main className="p-4">
        <h1 className="text-red-500">Producto no encontrado</h1>
      </main>
    );
  }

  const total = product.price * (qty <= 0 ? 1 : qty);

  return (
    <main className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <div className="border rounded p-3">
        <div className="font-semibold">{product.name}</div>
        <div className="text-slate-600">Precio: Q{product.price}</div>
        <div className="text-slate-800 font-semibold mt-1">
          Total: Q{total}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Nombre completo</label>
          <input
            name="name"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Teléfono</label>
          <input
            name="phone"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Dirección</label>
          <textarea
            name="address"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Cantidad</label>
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Notas (opcional)</label>
          <textarea
            name="notes"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600"
        >
          Enviar pedido por WhatsApp
        </button>
      </form>
    </main>
  );
}
