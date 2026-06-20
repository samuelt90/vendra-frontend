"use client";

import Image from "next/image";
import Link from "next/link";
import {
  getPredioVehicleStatusLabel,
  type PredioVehicle,
} from "@/lib/predios/types";

type Props = {
  vehicle: PredioVehicle | null;
  slug: string;
  onClose: () => void;
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

function formatKilometraje(value: string) {
  if (!value) return "No definido";

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return `${value} km`;
  }

  return `${numberValue.toLocaleString("es-GT")} km`;
}

function normalizeText(value: string) {
  if (!value) return "No definido";

  return value
    .replace(/_/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

export default function VehicleQuickViewModal({ vehicle, slug, onClose }: Props) {
  if (!vehicle) return null;

  const mainImage = vehicle.cover ?? vehicle.galeria[0] ?? null;
  const detailUrl = `/predios/${slug}/vehiculos/${vehicle.documentId}`;
  const contactUrl = `/predios/${slug}/vehiculos/${vehicle.documentId}/contactar`;

  const estadoLabel = getPredioVehicleStatusLabel(vehicle.estado);
  const isSold = vehicle.estado === "vendido";

  const featureCards = [
    {
      label: "Año",
      value: vehicle.anio || "No definido",
    },
    {
      label: "Kilometraje",
      value: formatKilometraje(vehicle.kilometraje),
    },
    {
      label: "Transmisión",
      value: normalizeText(vehicle.transmision),
    },
    {
      label: "Combustible",
      value: normalizeText(vehicle.combustible),
    },
    {
      label: "Motor",
      value: vehicle.motor || "No definido",
    },
    {
      label: "Marca",
      value: vehicle.marca || "No definido",
    },
  ];

  return (
    <div className="fixed inset-0 z-[80] bg-black/55 px-4 py-5 backdrop-blur-sm sm:hidden">
      <div className="mx-auto flex h-full max-w-md items-end">
        <div className="max-h-[92vh] w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl">
          <div className="relative h-64 bg-slate-100">
            {mainImage?.detailUrl ? (
              <Image
                src={mainImage.detailUrl || mainImage.cardUrl}
                alt={mainImage.alt || vehicle.titulo || "Vehículo"}
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-black text-slate-500">
                Sin imagen
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-black text-slate-900 shadow-lg backdrop-blur"
            >
              Cerrar
            </button>

            <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg">
              {estadoLabel}
            </div>
          </div>

          <div className="max-h-[calc(92vh-16rem)] overflow-y-auto p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
              Vista rápida
            </p>

            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {vehicle.titulo || "Vehículo"}
            </h2>

            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              {[vehicle.marca, vehicle.modelo, vehicle.anio]
                .filter(Boolean)
                .join(" · ") || "Datos por completar"}
            </p>

            <p className="mt-5 text-3xl font-black tracking-tight text-slate-950">
              {formatPrice(vehicle.precio, vehicle.moneda)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {featureCards.map((feature) => (
                <div
                  key={feature.label}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {feature.label}
                  </p>

                  <p className="mt-2 break-words text-base font-black text-slate-950">
                    {feature.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              <Link
                href={detailUrl}
                className="flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-blue-600/20 active:scale-[0.99]"
              >
                Ver vehículo completo
              </Link>

              {isSold ? (
                <button
                  type="button"
                  disabled
                  className="rounded-2xl bg-slate-200 px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-500"
                >
                  Vehículo vendido
                </button>
              ) : (
                <Link
                  href={contactUrl}
                  className="flex items-center justify-center rounded-2xl bg-green-600 px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-green-600/20 active:scale-[0.99]"
                >
                  Consultar por WhatsApp
                </Link>
              )}

              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black uppercase tracking-wide text-slate-900 active:scale-[0.99]"
              >
                Seguir explorando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
