"use client";

import Image from "next/image";
import { ChevronRight, Fuel, Gauge, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";

import VehiclePriceBox from "./VehiclePriceBox";
import {
  getPredioVehicleStatusLabel,
  type PredioVehicle,
} from "@/lib/predios/types";

type Props = {
  vehiculo: PredioVehicle;
  slug: string;
  showStatusRibbon?: boolean;
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
  showStatusRibbon = false,
  onOpenQuickView,
}: Props) {
  const router = useRouter();


  const detailUrl = `/predios/${slug}/vehiculos/${vehiculo.documentId}`;
  const contactUrl = `/predios/${slug}/vehiculos/${vehiculo.documentId}/contactar`;

  const statusLabel = getPredioVehicleStatusLabel(vehiculo.estado);
  const ribbonClasses = getStatusRibbonClasses(vehiculo.estado);

  const mainImage = vehiculo.cover ?? vehiculo.galeria[0] ?? null;
  const imageUrl = mainImage?.detailUrl || mainImage?.cardUrl;

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


  const vehicleMainTitle =
  [vehiculo.marca, vehiculo.modelo, vehiculo.anio]
    .filter(Boolean)
    .join(" · ") || vehiculo.titulo || "Vehículo";

const vehicleCategory = vehiculo.titulo || "";      

return (
  <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition duration-300 sm:p-4 sm:hover:-translate-y-1 sm:hover:border-white/45 sm:hover:bg-white/[0.09] sm:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_18px_44px_rgba(0,0,0,0.45)] sm:hover:ring-2 sm:hover:ring-white/20">
    {/* Imagen */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950 sm:rounded-2xl sm:border sm:border-white/20">
              {showStatusRibbon ? (
          <div
            className={`absolute -left-12 top-5 z-10 w-44 -rotate-45 py-1.5 text-center text-[11px] font-black uppercase tracking-wide shadow-md ${ribbonClasses}`}
          >
            {statusLabel}
          </div>
        ) : null}

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={mainImage?.alt || vehiculo.titulo || "Vehículo"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-400">
          Sin imagen
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
    </div>

    {/* Contenido */}
    <div className="flex flex-1 flex-col p-4 sm:px-0 sm:pb-0">
      <div>
        <h3 className="line-clamp-2 text-base font-black uppercase leading-tight tracking-tight text-slate-100">
          {vehicleMainTitle}
        </h3>

        {vehicleCategory ? (
          <p className="mt-1 text-sm font-semibold text-[#A65A6A]">
            {vehicleCategory}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <VehiclePriceBox vehicle={vehiculo} />
      </div>

    {previewFeatures.length > 0 ? (
      <div className="mt-4 flex min-h-[2.75rem] flex-wrap items-center gap-x-4 gap-y-2">
        {previewFeatures.map((feature, index) => {
          const Icon =
        index === 0 ? Gauge : index === 1 ? Settings2 : Fuel;

      return (
        <span
          key={feature}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#A65A6A]"
        >
          <Icon size={14} className="shrink-0 text-[#A65A6A]" />
          <span>{feature}</span>
        </span>
      );
    })}
  </div>
) : null}

  <div className="mt-4">
  <button
    type="button"
    onClick={() => {
      if (onOpenQuickView) {
        onOpenQuickView(vehiculo);
        return;
      }

      router.push(detailUrl);
    }}
    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-blue-950/45 px-4 py-3 text-sm font-black text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_20px_rgba(0,0,0,0.24)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.99] sm:hover:border-white/30 sm:hover:bg-blue-900/55"
  >
    Ver detalles
    <ChevronRight size={17} className="shrink-0 text-[#F8FAFC]" />
  </button>
</div>
    </div>
  </article>
);

}