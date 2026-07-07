"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { PredioVehicle } from "@/lib/predios/types";
import EmptyVehiclesState from "./EmptyVehiclesState";
import VehicleCard from "./VehicleCard";
import VehicleQuickViewModal from "./VehicleQuickViewModal";

type Props = {
  slug: string;
  vehicles: PredioVehicle[];
};

type VehicleSectionProps = {
  title: string;
  description: string;
  vehicles: PredioVehicle[];
  slug: string;
  catalogHref: string;
  onOpenQuickView?: (vehiculo: PredioVehicle) => void;
};

function VehicleHorizontalSection({
  title,
  description,
  vehicles,
  slug,
  catalogHref,
  onOpenQuickView,
}: VehicleSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  if (vehicles.length === 0) return null;

  const previewVehicles = vehicles.slice(0, 5);

  function handleScroll() {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) {
      setScrollProgress(1);
      return;
    }

    setScrollProgress(container.scrollLeft / maxScroll);
  }

  const progressStep = Math.min(
    10,
    Math.max(0, Math.ceil(scrollProgress * 10))
  );

  const progressWidthClass = [
    "w-[22%]",
    "w-[22%]",
    "w-[25%]",
    "w-[30%]",
    "w-[40%]",
    "w-[50%]",
    "w-[60%]",
    "w-[70%]",
    "w-[80%]",
    "w-[90%]",
    "w-full",
  ][progressStep];

  return (
    <section className="min-w-0 max-w-full overflow-hidden border-t border-white/10 pt-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="h-7 w-1 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.75)]" />

            <h3 className="text-xl font-black tracking-tight text-white">
              {title}
            </h3>
          </div>

          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-400">
            {description}
          </p>
        </div>
        <Link
          href={catalogHref}
          className="hidden shrink-0 items-center text-sm font-black text-slate-300 transition sm:inline-flex sm:hover:text-white"
        >
          Ver todos los vehículos →
        </Link>
      </div>

      {/* Mobile: carrusel horizontal */}
      <div className="w-full max-w-full min-w-0 overflow-hidden sm:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="w-full max-w-full min-w-0 snap-x snap-mandatory overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-full">
            {previewVehicles.map((vehiculo) => (
              <div
                key={vehiculo.documentId || vehiculo.id || vehiculo.titulo}
                className="w-full min-w-0 flex-[0_0_100%] snap-start snap-always"
              >
                <VehicleCard
                  vehiculo={vehiculo}
                  slug={slug}
                  onOpenQuickView={onOpenQuickView}
                />
              </div>
            ))}
          </div>
        </div>

        {previewVehicles.length > 1 ? (
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.75)] transition-[width] duration-200 ${progressWidthClass}`}
            />
          </div>
        ) : null}
      </div>

      {/* Desktop: grid normal */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {previewVehicles.map((vehiculo) => (
          <VehicleCard
            key={vehiculo.documentId || vehiculo.id || vehiculo.titulo}
            vehiculo={vehiculo}
            slug={slug}
            onOpenQuickView={onOpenQuickView}
          />
        ))}
      </div>
    </section>
  );
}

export default function PredioVehicleCatalog({ slug, vehicles }: Props) {
  const [quickViewVehicle, setQuickViewVehicle] =
    useState<PredioVehicle | null>(null);

  const groupedVehicles = useMemo(() => {
    return {
      disponibles: vehicles.filter(
        (vehiculo) => vehiculo.estado === "disponible"
      ),
      enRuta: vehicles.filter((vehiculo) => vehiculo.estado === "en_ruta"),
      vendidos: vehicles.filter((vehiculo) => vehiculo.estado === "vendido"),
    };
  }, [vehicles]);

  const hasVehicles = vehicles.length > 0;

  return (
    <>
      <section
          id="vehiculos"
          className="relative mt-5 w-full max-w-full min-w-0 overflow-x-hidden rounded-3xl border border-white/20 bg-slate-950 px-4 py-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 sm:px-6 sm:py-7"
        >
<div className="mb-6 flex flex-wrap items-start justify-between gap-4">
  <div>
    <h2 className="text-2xl font-black tracking-tight text-white">
      Inventario del predio
    </h2>

    <p className="mt-1 text-sm font-medium text-slate-400">
      Explora los vehículos disponibles, en ruta y vendidos.
    </p>

    <p className="mt-3 text-sm font-black text-slate-500">
      {vehicles.length} vehículo{vehicles.length === 1 ? "" : "s"}
    </p>
  </div>

  {hasVehicles ? (
    <Link
      href={`/predios/${slug}/catalogo`}
      className="hidden rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.99] sm:inline-flex sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
    >
      Ver catálogo
    </Link>
  ) : null}
</div>

        {!hasVehicles ? (
          <EmptyVehiclesState />
        ) : (
          <div className="grid min-w-0 gap-6">
            <VehicleHorizontalSection
              title="Disponibles"
              description="Vehículos listos para consultar o comprar."
              vehicles={groupedVehicles.disponibles}
              slug={slug}
              catalogHref={`/predios/${slug}/catalogo?estado=disponible`}
              onOpenQuickView={setQuickViewVehicle}
            />

            <VehicleHorizontalSection
              title="En ruta"
              description="Vehículos que vienen en camino al predio."
              vehicles={groupedVehicles.enRuta}
              slug={slug}
              catalogHref={`/predios/${slug}/catalogo?estado=en_ruta`}
              onOpenQuickView={setQuickViewVehicle}
            />

            <VehicleHorizontalSection
              title="Vendidos"
              description="Historial reciente de vehículos ya vendidos."
              vehicles={groupedVehicles.vendidos}
              slug={slug}
              catalogHref={`/predios/${slug}/catalogo?estado=vendido`}
              onOpenQuickView={setQuickViewVehicle}
            />
          </div>
        )}

        {hasVehicles ? (
          <Link
            href={`/predios/${slug}/catalogo`}
            className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-white/[0.075] px-5 py-4 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-95 sm:hidden"
          >
            Ver catálogo
          </Link>
        ) : null}
      </section>

      <VehicleQuickViewModal
        vehicle={quickViewVehicle}
        slug={slug}
        onClose={() => setQuickViewVehicle(null)}
      />
    </>
  );
}
