"use client";

import { useMemo, useState, useRef} from "react";
import type { PredioFilters, PredioVehicle } from "@/lib/predios/types";
import {
  filterPredioVehicles,
  getDefaultPredioFilters,
  getPredioFilterOptions,
} from "@/lib/predios/filters";
import EmptyVehiclesState from "./EmptyVehiclesState";
import PredioVehicleFilters from "./PredioVehicleFilters";
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
  onOpenQuickView?: (vehiculo: PredioVehicle) => void;
};

function hasActiveFilters(filters: PredioFilters) {
  return Object.values(filters).some((value) => String(value || "").trim());
}

function VehicleHorizontalSection({
  title,
  description,
  vehicles,
  slug,
  onOpenQuickView,
}: VehicleSectionProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  if (vehicles.length === 0) return null;

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

  const progressWidth =
    vehicles.length > 1 ? `${Math.max(22, scrollProgress * 100)}%` : "100%";

  return (
    <section className="border-t border-slate-100 pt-5 sm:rounded-[1.75rem] sm:border sm:border-slate-200 sm:bg-slate-50/70 sm:p-4">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-lg font-black tracking-tight text-slate-950">
            {title}
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            {description}
          </p>
        </div>

        <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-600">
          {vehicles.length}
        </div>
      </div>

{/* Mobile: carrusel horizontal */}
<div className="max-w-full overflow-hidden sm:hidden">
  <div
    ref={scrollRef}
    onScroll={handleScroll}
    className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {vehicles.map((vehiculo) => (
      <div
        key={vehiculo.documentId || vehiculo.id || vehiculo.titulo}
        className="group relative min-w-[82%] snap-center overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md ring-1 ring-transparent transition duration-200 active:scale-[0.99]"
      >
        <div className="absolute inset-y-0 left-0 w-1.5 bg-blue-600 opacity-80" />

        <div className="relative">
          <VehicleCard vehiculo={vehiculo} slug={slug} onOpenQuickView={onOpenQuickView}/>
        </div>
      </div>
    ))}
  </div>

  {vehicles.length > 1 ? (
    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-blue-600 transition-[width] duration-200"
        style={{ width: progressWidth }}
      />
    </div>
  ) : null}
</div>


      {/* Desktop: grid normal */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {vehicles.map((vehiculo) => (
          <div
            key={vehiculo.documentId || vehiculo.id || vehiculo.titulo}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md ring-1 ring-transparent transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:ring-blue-200 active:scale-[0.99]"
          >
            <div className="absolute inset-y-0 left-0 w-1.5 bg-blue-600 opacity-80 transition group-hover:w-2" />

            <div className="relative">
              <VehicleCard vehiculo={vehiculo} slug={slug} onOpenQuickView={onOpenQuickView}/>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PredioVehicleCatalog({ slug, vehicles }: Props) {
  const [filters, setFilters] = useState<PredioFilters>(
    getDefaultPredioFilters()
  );

  const [showFilters, setShowFilters] = useState(false);

  const [quickViewVehicle, setQuickViewVehicle] =
  useState<PredioVehicle | null>(null);

  const filterOptions = useMemo(() => {
    return getPredioFilterOptions(vehicles);
  }, [vehicles]);

  const activeFilters = hasActiveFilters(filters);

  const filteredVehicles = useMemo(() => {
    if (!hasActiveFilters(filters)) return vehicles;

    return filterPredioVehicles(vehicles, filters);
  }, [vehicles, filters]);

  const groupedVehicles = useMemo(() => {
    return {
      disponibles: filteredVehicles.filter(
        (vehiculo) => vehiculo.estado === "disponible"
      ),
      enRuta: filteredVehicles.filter(
        (vehiculo) => vehiculo.estado === "en_ruta"
      ),
      vendidos: filteredVehicles.filter(
        (vehiculo) => vehiculo.estado === "vendido"
      ),
    };
  }, [filteredVehicles]);

  const hasVehicles = vehicles.length > 0;
  const hasFilteredVehicles = filteredVehicles.length > 0;

  function updateFilter(name: keyof PredioFilters, value: string) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters(getDefaultPredioFilters());
  }

  function closeFilters() {
    setShowFilters(false);
  }

  return (
    <>
    <section
      id="vehiculos"
      className="relative mt-5 overflow-x-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950">
            Inventario del predio
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Explora los vehículos disponibles, en ruta y vendidos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm">
            {filteredVehicles.length} de {vehicles.length} vehículo
            {vehicles.length === 1 ? "" : "s"}
          </div>

          {hasVehicles ? (
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              className={`hidden rounded-2xl border px-4 py-3 text-sm font-black shadow-sm transition active:scale-[0.99] sm:inline-flex ${
                showFilters || activeFilters
                  ? "border-blue-700 bg-blue-600 text-white shadow-blue-600/20"
                  : "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              {showFilters ? "Cerrar filtros" : "Filtrar"}
              {activeFilters ? " · activos" : ""}
            </button>
          ) : null}
        </div>
      </div>

      {hasVehicles && showFilters ? (
        <div className="mb-5 hidden sm:block">
          <PredioVehicleFilters
            filters={filters}
            options={filterOptions}
            onChange={updateFilter}
            onClear={clearFilters}
          />
        </div>
      ) : null}

      {!hasVehicles ? (
        <EmptyVehiclesState />
      ) : !hasFilteredVehicles ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
            🔎
          </div>

          <h3 className="mt-4 text-lg font-black text-slate-950">
            No hay resultados con esos filtros
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Ajusta la marca, año, transmisión, combustible o rango de precio
            para ver más vehículos.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          <VehicleHorizontalSection
            title="Disponibles"
            description="Vehículos listos para consultar o comprar."
            vehicles={groupedVehicles.disponibles}
            slug={slug}
            onOpenQuickView={setQuickViewVehicle}
          />

          <VehicleHorizontalSection
            title="En ruta"
            description="Vehículos que vienen en camino al predio."
            vehicles={groupedVehicles.enRuta}
            slug={slug}
            onOpenQuickView={setQuickViewVehicle}
          />

          <VehicleHorizontalSection
            title="Vendidos"
            description="Historial reciente de vehículos ya vendidos."
            vehicles={groupedVehicles.vendidos}
            slug={slug}
            onOpenQuickView={setQuickViewVehicle}
          />
        </div>
      )}

      {hasVehicles ? (
        <button
          type="button"
          onClick={() => setShowFilters(true)}
          className="fixed bottom-5 right-5 z-40 rounded-full border border-blue-700 bg-blue-600 px-5 py-4 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition active:scale-95 sm:hidden"
        >
          Filtrar
          {activeFilters ? " · activos" : ""}
        </button>
      ) : null}

      {hasVehicles && showFilters ? (
        <div className="fixed inset-0 z-50 sm:hidden">
          <button
            type="button"
            aria-label="Cerrar filtros"
            onClick={closeFilters}
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto rounded-t-3xl border border-slate-200 bg-white p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-950">
                  Filtrar vehículos
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Ajusta el inventario sin perder tu posición en el catálogo.
                </p>
              </div>

              <button
                type="button"
                onClick={closeFilters}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-700"
              >
                Cerrar
              </button>
            </div>

            <PredioVehicleFilters
              filters={filters}
              options={filterOptions}
              onChange={updateFilter}
              onClear={clearFilters}
            />

            <button
              type="button"
              onClick={closeFilters}
              className="mt-4 w-full rounded-2xl border border-blue-700 bg-blue-600 px-4 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20"
            >
              Ver {filteredVehicles.length} resultado
              {filteredVehicles.length === 1 ? "" : "s"}
            </button>
          </div>
        </div>
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
