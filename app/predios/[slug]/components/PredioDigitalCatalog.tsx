"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
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

type EstadoCatalogo = "todos" | PredioVehicle["estado"];

type Props = {
  slug: string;
  vehicles: PredioVehicle[];
  initialEstado?: EstadoCatalogo;
};

function hasActiveFilters(filters: PredioFilters) {
  return Object.values(filters).some((value) => String(value || "").trim());
}

function RevealCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu will-change-transform transition-all duration-300 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}



export default function PredioDigitalCatalog({
  slug,
  vehicles,
  initialEstado = "todos",
}: Props) {
  const [estado, setEstado] = useState<EstadoCatalogo>(initialEstado);
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
    const byEstado =
      estado === "todos"
        ? vehicles
        : vehicles.filter((vehiculo) => vehiculo.estado === estado);

    if (!hasActiveFilters(filters)) return byEstado;

    return filterPredioVehicles(byEstado, filters);
  }, [vehicles, estado, filters]);

  const counts = useMemo(() => {
    return {
      todos: vehicles.length,
      disponible: vehicles.filter((vehiculo) => vehiculo.estado === "disponible")
        .length,
      en_ruta: vehicles.filter((vehiculo) => vehiculo.estado === "en_ruta")
        .length,
      vendido: vehicles.filter((vehiculo) => vehiculo.estado === "vendido")
        .length,
    };
  }, [vehicles]);

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

  const estadoOptions: { label: string; value: EstadoCatalogo; count: number }[] =
    [
      { label: "Todos", value: "todos", count: counts.todos },
      { label: "Disponibles", value: "disponible", count: counts.disponible },
      { label: "En ruta", value: "en_ruta", count: counts.en_ruta },
      { label: "Vendidos", value: "vendido", count: counts.vendido },
    ];

  return (
    <>
    <section className="relative w-full min-w-0 rounded-none bg-slate-950 px-4 py-6 text-white sm:mt-5 sm:rounded-3xl sm:border sm:border-white/20 sm:px-6 sm:py-7 sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] sm:ring-1 sm:ring-white/10">
        <div className="mb-6">
  <div className="mb-5 flex items-center justify-between gap-3">
    <Link
      href={`/predios/${slug}`}
      className="inline-flex w-fit items-center rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.99]"
    >
      ← Volver
    </Link>

    {vehicles.length > 0 ? (
      <button
        type="button"
        onClick={() => setShowFilters((value) => !value)}
        className={`hidden rounded-2xl border px-4 py-3 text-sm font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.99] sm:inline-flex ${
          showFilters || activeFilters
            ? "border-white/35 bg-white/[0.12] text-white"
            : "border-white/20 bg-white/[0.075] text-slate-100 hover:border-white/30 hover:bg-white/[0.1]"
        }`}
      >
        {showFilters ? "Cerrar filtros" : "Filtrar"}
        {activeFilters ? " · activos" : ""}
      </button>
    ) : null}
  </div>

  <div>
    <h1 className="text-2xl font-black tracking-tight text-[#F8FAFC] sm:text-3xl">
      Catálogo digital
    </h1>

    <p className="mt-1 text-sm font-medium text-slate-400">
      Explora todos los vehículos del predio.
    </p>

    <p className="mt-3 text-sm font-black text-slate-500">
      {filteredVehicles.length} de {vehicles.length} vehículo
      {vehicles.length === 1 ? "" : "s"}
    </p>
  </div>
</div>


<div className="mb-6 grid w-full grid-cols-2 gap-2 sm:flex sm:flex-wrap">
  {estadoOptions.map((option) => {
    const active = estado === option.value;

    return (
      <button
        key={option.value}
        type="button"
        onClick={() => setEstado(option.value)}
        className={`min-w-0 rounded-full border px-4 py-2 text-center text-xs font-black transition active:scale-95 sm:shrink-0 ${
          active
            ? "border-white/35 bg-white/[0.14] text-[#F8FAFC]"
            : "border-white/15 bg-white/[0.055] text-slate-400 hover:border-white/25 hover:text-slate-100"
        }`}
      >
        {option.label} · {option.count}
      </button>
    );
  })}
</div>


        {vehicles.length > 0 && showFilters ? (
          <div className="mb-6 hidden sm:block">
            <PredioVehicleFilters
              filters={filters}
              options={filterOptions}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </div>
        ) : null}

        {vehicles.length === 0 ? (
          <EmptyVehiclesState />
        ) : filteredVehicles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.055] p-6 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/[0.075] text-2xl">
              🔎
            </div>

            <h3 className="mt-4 text-lg font-black text-[#F8FAFC]">
              No hay resultados
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              Ajusta los filtros o cambia el estado para ver más vehículos.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 transition hover:bg-white/[0.1]"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVehicles.map((vehiculo) => (
              <RevealCard
                key={vehiculo.documentId || vehiculo.id || vehiculo.titulo}
              >
                <VehicleCard
                  vehiculo={vehiculo}
                  slug={slug}
                  showStatusRibbon
                  onOpenQuickView={setQuickViewVehicle}
                />
              </RevealCard>
            ))}
          </div>
        )}

        {vehicles.length > 0 ? (
          <button
            type="button"
            onClick={() => setShowFilters(true)}
            className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-white/[0.075] px-5 py-4 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-95 sm:hidden"
          >
            Filtrar
            {activeFilters ? " · activos" : ""}
          </button>
        ) : null}

        {vehicles.length > 0 && showFilters ? (
          <div className="fixed inset-0 z-50 sm:hidden">
            <button
              type="button"
              aria-label="Cerrar filtros"
              onClick={closeFilters}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />

            <div className="absolute inset-x-3 top-4 max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[2rem] border border-white/20 bg-slate-950 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-[#F8FAFC]">
                    Filtrar vehículos
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    Ajusta el catálogo completo del predio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeFilters}
                  className="rounded-full border border-white/20 bg-white/[0.075] px-4 py-2 text-xs font-black text-slate-100"
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
                className="mt-4 w-full rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-4 text-sm font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md"
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
