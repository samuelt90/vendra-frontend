"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VehicleFeatureList from "./VehicleFeatureList";
import VehiclePriceBox from "./VehiclePriceBox";
import {
  getPredioVehicleStatusLabel,
  type PredioVehicle,
} from "@/lib/predios/types";

type Props = {
  vehiculo: PredioVehicle;
  slug: string;
  onOpenQuickView?: (vehiculo: PredioVehicle) => void;
};


function getStatusRibbonClasses(estado: PredioVehicle["estado"]) {
  if (estado === "en_ruta") {
    return "bg-blue-600 text-white";
  }

  if (estado === "vendido") {
    return "bg-slate-700 text-white";
  }

  return "bg-emerald-600 text-white";
}

function formatKilometraje(value: string) {
  if (!value) return "";

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return `${value} km`;
  }

  return `${numberValue.toLocaleString("es-GT")} km`;
}

function normalizeFeature(value: string) {
  if (!value) return "";

  return value
    .replace(/_/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

export default function VehicleCard({
  vehiculo,
  slug,
  onOpenQuickView,
}: Props) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const detailUrl = `/predios/${slug}/vehiculos/${vehiculo.documentId}`;
  const contactUrl = `/predios/${slug}/vehiculos/${vehiculo.documentId}/contactar`;

  const statusLabel = getPredioVehicleStatusLabel(vehiculo.estado);
  const ribbonClasses = getStatusRibbonClasses(vehiculo.estado);

  const mainImage = vehiculo.cover ?? vehiculo.galeria[0] ?? null;

  const previewFeatures = [
    formatKilometraje(vehiculo.kilometraje),
    normalizeFeature(vehiculo.transmision),
    normalizeFeature(vehiculo.combustible),
  ].filter(Boolean);

  const viewVehicleLabel =
    vehiculo.estado === "vendido" ? "Ver vehículo vendido" : "Ver vehículo";

  const contactLabel =
    vehiculo.estado === "vendido"
      ? "Vendido"
      : vehiculo.estado === "en_ruta"
        ? "Consultar"
        : "Contactar";

  return (
    <article className="rounded-3xl bg-white p-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-slate-100">
          <div
            className={`absolute -left-12 top-5 z-10 w-44 -rotate-45 py-1.5 text-center text-[11px] font-black uppercase tracking-wide shadow-md ${ribbonClasses}`}
          >
            {statusLabel}
          </div>

          {mainImage?.detailUrl ? (
            <Image
              src={mainImage.detailUrl || mainImage.cardUrl}
              alt={mainImage.alt || vehiculo.titulo || "Vehículo"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          ) : (
            <div className="text-sm font-bold text-slate-500">Sin imagen</div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="line-clamp-2 text-base font-black leading-tight tracking-tight text-slate-950">
          {vehiculo.titulo || "Vehículo"}
        </h3>

        <p className="mt-1 text-sm font-semibold text-slate-500">
          {[vehiculo.marca, vehiculo.modelo, vehiculo.anio]
            .filter(Boolean)
            .join(" · ") || "Datos por completar"}
        </p>
      </div>

      <div className="mt-4">
        <VehiclePriceBox vehicle={vehiculo} />
      </div>

      {previewFeatures.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {previewFeatures.map((feature) => (
            <span
              key={feature}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-black text-slate-700"
            >
              {feature}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        {!showDetails ? (
          <button
            type="button"
            onClick={() => {
              const isMobile = window.innerWidth < 640;

              if (isMobile && onOpenQuickView) {
                onOpenQuickView(vehiculo);
                return;
              }

              setShowDetails(true);
            }}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-black text-slate-900 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-800 active:scale-[0.99]"
          >
            Ver características
          </button>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-sm font-black uppercase tracking-wide text-slate-500">
                Características
              </div>

              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-700 transition hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>

            <VehicleFeatureList vehicle={vehiculo} compact />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => router.push(detailUrl)}
                className="rounded-2xl border border-blue-700 bg-blue-600 px-3 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                {viewVehicleLabel}
              </button>

              <button
                type="button"
                onClick={() => router.push(contactUrl)}
                disabled={vehiculo.estado === "vendido"}
                className="rounded-2xl border border-green-700 bg-green-600 px-3 py-3 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none"
              >
                {contactLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}