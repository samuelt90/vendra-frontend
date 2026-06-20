"use client";

import { useMemo, useState } from "react";
import type { PredioVehicleDetail } from "@/lib/predios/types";
import {
  buildPredioWhatsappUrl,
  buildVehicleDetailWhatsappMessage,
} from "@/lib/predios/whatsapp";

type Props = {
  detail: PredioVehicleDetail;
};

export default function ContactForm({ detail }: Props) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const mensaje = useMemo(() => {
    return buildVehicleDetailWhatsappMessage({
      detail,
      customerName: nombre,
      customerPhone: telefono,
    });
  }, [detail, nombre, telefono]);

  const waLink = useMemo(() => {
    return buildPredioWhatsappUrl({
      phone: detail.predio.whatsapp,
      message: mensaje,
    });
  }, [detail.predio.whatsapp, mensaje]);

  const canSend = Boolean(waLink && nombre.trim() && telefono.trim());

  const resumen: [string, string][] = [
    ["Vehículo", detail.vehiculo.titulo],
    ["Marca", detail.vehiculo.marca],
    ["Año", detail.vehiculo.anio],
    ["Precio", `${detail.vehiculo.precio} ${detail.vehiculo.moneda}`.trim()],
  ];

  return (
    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      <div className="grid gap-2">
        <h1 className="text-xl font-black leading-tight text-gray-950">
          Contactar a vendedor
        </h1>

        <p className="text-sm leading-relaxed text-gray-500">
          Llena tus datos y se abrirá WhatsApp con el mensaje ya listo.
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-2 text-sm font-bold text-gray-950">
          Nombre
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-gray-950">
          Teléfono (WhatsApp)
          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: 50255554444"
            inputMode="numeric"
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
          />
        </label>
      </div>

      <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="mb-3 font-black text-gray-950">
          Resumen del vehículo
        </div>

        <div className="grid gap-2 text-sm">
          {resumen.map(([label, val]) => (
            <div key={label} className="flex gap-3">
              <div className="min-w-[110px] font-extrabold text-gray-500">
                {label}
              </div>

              <div className="font-extrabold text-gray-900">{val || "-"}</div>
            </div>
          ))}
        </div>
      </div>

          <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => window.open(waLink, "_blank")}
            disabled={!canSend}
            className="inline-flex w-fit max-w-full items-center justify-center rounded-2xl border border-black/5 bg-green-600 px-5 py-3 text-sm font-black tracking-wide text-white shadow-md shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-green-200 disabled:text-green-900 disabled:shadow-none"
          >
            Contactar por WhatsApp
          </button>
        </div>

      {!canSend && (
        <div className="mt-3 text-xs leading-relaxed text-gray-500">
          Completa <strong>nombre</strong> y <strong>teléfono</strong> para
          habilitar el botón.
        </div>
      )}
    </div>
  );
}