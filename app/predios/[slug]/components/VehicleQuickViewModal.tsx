"use client";

import Image from "next/image";
import Link from "next/link";
import { CreditCard, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import VehiclePriceBox from "./VehiclePriceBox";
import {
  getPredioVehicleStatusLabel,
  type PredioVehicle,
} from "@/lib/predios/types";

type Props = {
  vehicle: PredioVehicle | null;
  slug: string;
  onClose: () => void;
};



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
  const financingUrl = `/predios/${slug}/vehiculos/${vehicle.documentId}/financiamiento`;

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

  const vehicleMainTitle =
  [vehicle.marca, vehicle.modelo, vehicle.anio]
    .filter(Boolean)
    .join(" · ") || vehicle.titulo || "Vehículo";

const vehicleCategory = vehicle.titulo || "";

return (
  <div className="fixed inset-0 z-[80] bg-black/70 px-4 py-5 backdrop-blur-sm">
    <div className="mx-auto flex h-full max-w-md items-end sm:max-w-4xl sm:items-center">
      <div className="max-h-[92vh] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 sm:grid sm:grid-cols-[1fr_1.05fr]">
        {/* Imagen */}
        <div className="relative h-52 bg-slate-900 sm:h-auto sm:min-h-[560px]">
          {mainImage?.detailUrl || mainImage?.cardUrl ? (
            <Image
              src={mainImage.detailUrl || mainImage.cardUrl}
              alt={mainImage.alt || vehicle.titulo || "Vehículo"}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-black text-slate-400">
              Sin imagen
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/[0.075] px-4 py-2 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md active:scale-95"
          >
            Cerrar
          </button>

          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/[0.075] px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
            {estadoLabel}
          </div>
        </div>

        <div className="max-h-[calc(92vh-13rem)] overflow-y-auto p-5 sm:max-h-[92vh] sm:p-6">
          {/* Título principal */}
          <div>
            <h2 className="text-2xl font-black uppercase leading-tight tracking-tight text-[#F8FAFC] sm:text-3xl">
              {vehicleMainTitle}
            </h2>

            {vehicleCategory ? (
              <p className="mt-1 text-sm font-semibold text-[#A65A6A] sm:text-base">
                {vehicleCategory}
              </p>
            ) : null}
          </div>

          {/* Precio + WhatsApp */}
          <div className="mt-5 flex items-center gap-4">
              <div className="min-w-0">
                <VehiclePriceBox vehicle={vehicle} size="lg" />
              </div>

            {!isSold ? (
              <Link
                href={contactUrl}
                aria-label="Consultar por WhatsApp"
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.075] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-95 sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
              >
                <FaWhatsapp className="h-7 w-7 text-emerald-400" />
              </Link>
            ) : null}
          </div>

        {/* Acciones rápidas */}
        <div className="mt-5">
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
            Acciones rápidas
          </h3>

          <div className="mt-3 grid gap-2 rounded-3xl border border-white/20 bg-white/[0.075] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
            <Link
              href={financingUrl}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black text-[#F8FAFC] transition active:scale-[0.99] sm:hover:bg-white/[0.06]"
            >
              <CreditCard size={18} className="shrink-0 text-[#A65A6A]" />
              <span>Ver opciones de financiamiento</span>
            </Link>

            <Link
              href={detailUrl}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-black text-[#F8FAFC] transition active:scale-[0.99] sm:hover:bg-white/[0.06]"
            >
              <FileText size={18} className="shrink-0 text-[#A65A6A]" />
              <span>Ver vehículo completo</span>
            </Link>
          </div>
        </div>

          {/* Características */}
          <div className="mt-6">
            <h3 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
              Características
            </h3>

            <div className="mt-3 divide-y divide-white/10 rounded-3xl border border-white/20 bg-white/[0.075] px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
              {featureCards.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="text-sm font-semibold text-slate-400">
                    {feature.label}
                  </span>

                  <span className="max-w-[55%] break-words text-right text-sm font-black text-[#F8FAFC]">
                    {feature.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

       

              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-left text-sm font-black text-slate-400 transition active:scale-95 sm:hover:text-white"
                >
                  ← Seguir explorando
                </button>

              </div>
              </div>
              </div>
                  </div>
                </div>
              
            );
            }