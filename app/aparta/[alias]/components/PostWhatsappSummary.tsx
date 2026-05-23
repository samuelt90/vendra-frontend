"use client";

import FaqFloatingButton from "./FaqFloatingButton";

type SubmittedOrder = {
  items: any[];
  total: number;
  form: {
    nombre: string;
    tel: string;
    direccion: string;
    entrega: string;
    pago: string;
  };
};

type PostWhatsappSummaryProps = {
  order: SubmittedOrder;
  storeName: string;
  storeWhatsapp: string;
  onContinueShopping: () => void;
};

export default function PostWhatsappSummary({
  order,
  storeName,
  storeWhatsapp,
  onContinueShopping,
}: PostWhatsappSummaryProps) {
  return (
    <main className="mx-auto max-w-md p-4">
      <section className="rounded-3xl bg-white p-5 shadow-md">
        <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          🟢 Pedido recibido
        </div>

        <h1 className="mt-5 text-xl font-bold text-gray-900">
          Resumen de compra
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Tu solicitud fue enviada correctamente a {storeName}. Conserva este
          resumen mientras la tienda confirma tu pedido por WhatsApp.
        </p>

        <div className="mt-5 space-y-3">
          {order.items.map((item) => (
            <div
              key={item.documentId}
              className="rounded-2xl border border-gray-100 px-4 py-3"
            >
              <p className="text-sm font-medium text-gray-900">{item.Text}</p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                Q{item.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-between border-t border-gray-100 pt-4">
          <span className="text-sm text-gray-500">Total</span>
          <span className="font-bold text-gray-900">Q{order.total}</span>
        </div>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Datos de coordinación
          </h2>

          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <p>Nombre: {order.form.nombre}</p>
            <p>Teléfono: {order.form.tel}</p>
            <p>Dirección: {order.form.direccion}</p>
            <p>Entrega: {order.form.entrega}</p>
            <p>Pago: {order.form.pago}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 p-4">
          <p className="text-sm leading-relaxed text-gray-600">
            Pedido confirmado. Para cualquier consulta o asistencia, nuestro
            equipo está disponible para ayudarte.
          </p>

          <a
            href={`https://wa.me/${storeWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-2xl bg-green-600 py-3 text-center text-sm font-semibold text-white"
          >
            Escribir por WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={onContinueShopping}
          className="mt-4 w-full rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700"
        >
          🛍️ Seguir comprando
        </button>
      </section>

      <FaqFloatingButton />
    </main>
  );
}
