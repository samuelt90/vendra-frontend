"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/components/cart/CartProvider";

type Store = {
  name: string;
  whatsapp: string; // ej: "38093056"
};

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams<{ alias: string }>();
  const alias = params?.alias;

  const { items, totalPrice, totalItems } = useCart();

  const [store, setStore] = useState<Store | null>(null);

  // Campos del formulario
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("Envío a domicilio");
  const [payment, setPayment] = useState("Contraentrega");

  // Si el carrito está vacío, manda a carrito
  useEffect(() => {
    if (totalItems === 0 && alias) router.replace(`/tienda/${alias}/cart`);
  }, [totalItems, alias, router]);

  // Traer tienda (name + whatsapp) por slug
  useEffect(() => {
    if (!alias) return;

    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!STRAPI) return;

    const url = `${STRAPI}/api/stores?filters[slug][$eq]=${encodeURIComponent(
      alias
    )}`;

    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const s = json?.data?.[0];
        if (!s) return;

        // Ajusta si tu Strapi devuelve directo o dentro de attributes
        const name = s.name ?? s.attributes?.name;
        const whatsapp = s.whatsapp ?? s.attributes?.whatsapp;

        setStore({ name, whatsapp });
      })
      .catch(() => {});
  }, [alias]);

  const phoneForWhatsApp = useMemo(() => {
    const raw = (store?.whatsapp || "").replace(/\D/g, "");
    if (!raw) return "";

    // Guatemala: si son 8 dígitos, prefijamos 502
    if (raw.length === 8) return `502${raw}`;
    return raw;
  }, [store?.whatsapp]);

  const message = useMemo(() => {
    const tienda = store?.name || alias || "Tienda";
    const lines: string[] = [];

    lines.push("Hola, quiero comprar:");
    lines.push(`Tienda: ${tienda}`);
    lines.push("");

    items.forEach((p: any) => {
      const subtotal = p.price * p.qty;
      lines.push(`Producto: ${p.Text}`);
      if ((p as any).code) lines.push(`Código: ${(p as any).code}`);
      lines.push(`Cantidad: ${p.qty}`);
      lines.push(`Precio unitario: Q${p.price}`);
      lines.push(`Subtotal: Q${subtotal}`);
      lines.push(""); // separador
    });

    lines.push(`Total: Q${totalPrice}`);
    lines.push("");
    lines.push("— Datos de envío —");
    lines.push(`Nombre: ${name}`);
    lines.push(`Tel: ${tel}`);
    lines.push(`Dirección: ${address}`);
    lines.push(`Entrega: ${delivery}`);
    lines.push(`Pago: ${payment}`);

    return lines.join("\n");
  }, [items, totalPrice, store?.name, alias, name, tel, address, delivery, payment]);

  const goWhatsApp = () => {
    const phone = phoneForWhatsApp; // ej: "50238093056"
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const canSend = !!store?.whatsapp && !!name && !!tel && !!address;

  return (
    <main className="min-h-[calc(100vh-40px)] px-4 py-6 flex justify-center">
      <div className="w-fit mx-auto">
        {/* Header */}
        <div className="mb-4 text-center">
          <div className="text-slate-500 text-sm">
            {store?.name ? store.name : "Tienda"}{" "}
            {totalPrice ? (
              <span className="ml-2 inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600">
                Total: Q{totalPrice}
              </span>
            ) : null}
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Completar pedido
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Ingresa tus datos para confirmar por WhatsApp.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 sm:p-6">
          {/* Resumen */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Productos</span>
              <span className="font-medium text-slate-900">{totalItems}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-slate-600">Total</span>
              <span className="text-xl font-semibold text-slate-900">
                Q{totalPrice}
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Nombre completo
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Samuel Torres"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Teléfono</span>
              <input
                type="tel"
                inputMode="numeric"
                value={tel}
                onChange={(e) => {const value = e.target.value.replace(/[^0-9]/g, "")
                 setTel(value)
                }}
                
                placeholder="Ej: 4397xxxx"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Dirección</span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Zona, colonia, referencia..."
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Tipo de entrega
                </span>
                <select
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  <option>Envío a domicilio</option>
                  <option>Recoger en tienda</option>
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-700">
                  Método de pago
                </span>
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                >
                  <option>Contraentrega</option>
                  <option>Depósito</option>
                </select>
              </label>
            </div>

            {/* Botones */}
            <div className="mt-2 grid gap-3">
              
             {canSend && (
              <div className="grid gap-3">
                <button
                  onClick={goWhatsApp}
                  disabled={!canSend}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
                >
                  Confirmar pedido por WhatsApp
                </button>
                
                <button
                  type="button"
                  onClick={() => router.push(`/tienda/${alias}/cart`)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  ← Volver al carrito
                </button>
              </div>
            )}
            
              
            </div>
          </div>

          {/* (Opcional) preview del mensaje */}
          {/* 
          <pre className="mt-6 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
            {message}
          </pre> 
          */}
        </div>
      </div>
    </main>
  );
}
