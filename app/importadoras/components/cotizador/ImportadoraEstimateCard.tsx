"use client";

import Image from "next/image";
import { useState } from "react";
import type { MockVehicleReference } from "@/lib/importadoras/mockVehicleReferences";
import {
  CarIcon,
  WhatsappIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraEstimateCardProps = {
  vehicle: MockVehicleReference;
  budgetGTQ: number;
  whatsappUrl: string | null;
  position: number;
};

function formatGTQ(amount: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getBudgetFit(vehicle: MockVehicleReference, budgetGTQ: number) {
  if (budgetGTQ >= vehicle.estimatedMaxGTQ) {
    return {
      label: "Dentro de tu presupuesto",
      detail: `Tendrías un margen aproximado de ${formatGTQ(
        budgetGTQ - vehicle.estimatedMaxGTQ
      )}.`,
      className:
        "border-[#9fb8a8]/30 bg-[#9fb8a8]/10 text-[#b8d1c0]",
    };
  }

  if (budgetGTQ >= vehicle.estimatedMinGTQ) {
    return {
      label: "Dentro del rango estimado",
      detail: "Tu presupuesto se encuentra dentro de esta referencia.",
      className:
        "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#fbbf24]",
    };
  }

  const difference = vehicle.estimatedMinGTQ - budgetGTQ;

  if (difference <= 15000) {
    return {
      label: "Muy cerca de tu presupuesto",
      detail: `La diferencia aproximada sería de ${formatGTQ(difference)}.`,
      className:
        "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#fbbf24]",
    };
  }

  return {
    label: "Requiere ampliar presupuesto",
    detail: `El rango inicia aproximadamente ${formatGTQ(
      difference
    )} arriba de tu presupuesto.`,
    className:
      "border-white/15 bg-white/[0.06] text-white/60",
  };
}

export default function ImportadoraEstimateCard({
  vehicle,
  budgetGTQ,
  whatsappUrl,
  position,
}: ImportadoraEstimateCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const budgetFit = getBudgetFit(vehicle, budgetGTQ);

  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:border-[#f59e0b]/35">
      <div className="relative h-52 overflow-hidden bg-[#07111d]">
        {!imageFailed ? (
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_45%),linear-gradient(135deg,#0b1420,#03070d)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
              <CarIcon className="h-8 w-8" />
            </div>

            <p className="mt-3 text-sm font-bold text-white">
              {vehicle.brand} {vehicle.model}
            </p>

            <p className="mt-1 text-xs text-white/40">
              Imagen de referencia
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md">
          Opción {position}
        </span>

        <span className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
          {vehicle.yearFrom}–{vehicle.yearTo}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#f59e0b]">
          Referencia preliminar
        </p>

        <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
          {vehicle.brand} {vehicle.model}
        </h3>

        <div className="mt-5 rounded-2xl border border-white/10 bg-[#07111d]/70 p-4">
          <p className="text-xs font-semibold text-white/45">
            Estimado puesto en Guatemala
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {formatGTQ(vehicle.estimatedMinGTQ)}
            <span className="mx-2 text-white/30">–</span>
            {formatGTQ(vehicle.estimatedMaxGTQ)}
          </p>
        </div>

        <div className="mt-4">
          <span
            className={[
              "inline-flex rounded-full border px-3 py-1.5 text-xs font-bold",
              budgetFit.className,
            ].join(" ")}
          >
            {budgetFit.label}
          </span>

          <p className="mt-2 text-xs leading-5 text-white/45">
            {budgetFit.detail}
          </p>
        </div>

        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f59e0b] px-4 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(245,158,11,0.22)] transition hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <WhatsappIcon className="h-5 w-5" />
            Consultar esta opción
          </a>
        ) : (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-xs text-white/45">
            WhatsApp no disponible
          </div>
        )}
      </div>
    </article>
  );
}
