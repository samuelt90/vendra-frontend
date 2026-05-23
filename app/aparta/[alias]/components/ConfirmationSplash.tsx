"use client";

import Image from "next/image";
import FaqFloatingButton from "./FaqFloatingButton";

type ConfirmationSplashProps = {
  storeName: string;
  confirmationImageUrl?: string | null;
  onViewSummary: () => void;
  onContinueShopping: () => void;
};

export default function ConfirmationSplash({
  storeName,
  confirmationImageUrl,
  onViewSummary,
  onContinueShopping,
}: ConfirmationSplashProps) {
  return (
    <main className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 px-4 py-5">
      <section className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="relative flex h-64 items-center justify-center bg-gray-100 sm:h-72">
          {confirmationImageUrl && (
            <Image
              src={confirmationImageUrl}
              alt={`Confirmación de pedido de ${storeName}`}
              fill
              priority
              className="object-contain p-6"
            />
          )}
        </div>

        <div className="px-5 py-5">
          <h1 className="text-center text-xl font-bold text-gray-900">
            ¡Tu solicitud fue enviada! 🚀
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-gray-600">
            Tu información ya fue enviada al vendedor por WhatsApp. En breve se
            pondrán en contacto contigo para confirmar disponibilidad, coordinar
            pago y entrega.
          </p>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={onViewSummary}
              className="w-full rounded-2xl bg-gray-900 py-3 text-sm font-semibold text-white"
            >
              📄 Ver resumen de compra
            </button>

            <button
              type="button"
              onClick={onContinueShopping}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700"
            >
              🛍️ Seguir comprando
            </button>
          </div>
        </div>
      </section>
      <FaqFloatingButton/>
    </main>
  );
}
