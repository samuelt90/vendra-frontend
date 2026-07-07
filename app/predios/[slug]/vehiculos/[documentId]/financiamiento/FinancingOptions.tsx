"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import type { PredioVehicle, PredioVehicleDetail } from "@/lib/predios/types";
import type { PredioPaymentOption } from "@/lib/predios/payments";

type Props = {
  predio: PredioVehicleDetail["predio"];
  vehicle: PredioVehicle;
  vehicleTitle: string;
  options: PredioPaymentOption[];
};

function formatPrice(precio: string, moneda: string) {
  if (!precio) return "Precio no definido";

  const numberValue = Number(precio);

  if (!Number.isFinite(numberValue)) {
    return `${precio} ${moneda}`.trim();
  }

  return `${moneda} ${numberValue.toLocaleString("es-GT", {
    maximumFractionDigits: 0,
  })}`;
}

export default function FinancingOptions({
  predio,
  vehicle,
  vehicleTitle,
  options,
}: Props) {
  const [selectedKey, setSelectedKey] = useState(options[0]?.key || "efectivo");

  const selectedOption =
    options.find((option) => option.key === selectedKey) || options[0];

  const whatsappUrl = useMemo(() => {
    const message = [
      `Hola, me interesa el ${vehicleTitle}.`,
      "",
      `Quiero consultar la opción: ${selectedOption?.label || "Pago"}.`,
      "",
      `Vehículo: ${vehicleTitle}`,
      `Precio: ${formatPrice(vehicle.precio, vehicle.moneda)}`,
      `Predio: ${predio.nombre}`,
    ].join("\n");

    return `https://wa.me/${predio.whatsapp}?text=${encodeURIComponent(
      message
    )}`;
  }, [predio.nombre, predio.whatsapp, selectedOption?.label, vehicle, vehicleTitle]);

  if (!selectedOption) return null;

  return (
    <div className="mt-7">
      <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
        Seleccione una opción
      </h2>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const active = option.key === selectedKey;

          return (
            <button
              key={option.key}
              type="button"
              onClick={() => setSelectedKey(option.key)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition active:scale-[0.99] ${
                active
                  ? "border-white/40 bg-white/[0.13] text-[#F8FAFC]"
                  : "border-white/15 bg-white/[0.055] text-slate-400 hover:border-white/25 hover:text-slate-100"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <section className="mt-5 rounded-3xl border border-white/20 bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
        <h3 className="text-xl font-black text-[#F8FAFC]">
          {selectedOption.label}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {selectedOption.description}
        </p>

        <div className="mt-5">
          <h4 className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Requisitos sugeridos
          </h4>

          <ul className="mt-3 grid gap-2 text-sm font-semibold text-slate-300">
            {selectedOption.requirements.map((requirement) => (
              <li key={requirement} className="flex gap-2">
                <span className="text-[#A65A6A]">•</span>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Link
            href={`/predios/${predio.slug}/vehiculos/${vehicle.documentId}`}
            className="text-sm font-black text-slate-400 transition active:scale-95 sm:hover:text-white"
          >
            ← Regresar
          </Link>

          <Link
            href={whatsappUrl}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.99] sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
          >
            <FaWhatsapp className="h-5 w-5 text-emerald-400" />
            WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}