"use client";

import { useState } from "react";
import type { VehicleReferenceCategory } from "@/lib/importadoras/mockVehicleReferences";
import {
  CalculatorIcon,
  CarIcon,
} from "../icons/ImportadoraIcons";

export type BudgetFormValues = {
  budgetGTQ: number;
  category: VehicleReferenceCategory;
  minimumYear: number;
  preferredBrand: string;
};

type ImportadoraBudgetFormProps = {
  onSubmit: (values: BudgetFormValues) => void;
};

const VEHICLE_CATEGORIES: {
  value: VehicleReferenceCategory;
  label: string;
}[] = [
  { value: "sedan", label: "Sedán" },
  { value: "suv", label: "SUV" },
  { value: "pickup", label: "Pickup" },
];

const BRANDS = [
  "Sin preferencia",
  "Toyota",
  "Honda",
  "Mazda",
  "Hyundai",
  "Kia",
  "Ford",
  "Nissan",
  "Chevrolet",
];

const CURRENT_YEAR = new Date().getFullYear();

const YEARS = Array.from(
  { length: CURRENT_YEAR - 2015 + 1 },
  (_, index) => CURRENT_YEAR - index
);

export default function ImportadoraBudgetForm({
  onSubmit,
}: ImportadoraBudgetFormProps) {
  const [budgetGTQ, setBudgetGTQ] = useState("120000");
  const [category, setCategory] =
    useState<VehicleReferenceCategory>("suv");
  const [minimumYear, setMinimumYear] = useState(2019);
  const [preferredBrand, setPreferredBrand] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedBudget = Number(budgetGTQ);

    if (!Number.isFinite(parsedBudget) || parsedBudget <= 0) {
      return;
    }

    onSubmit({
      budgetGTQ: parsedBudget,
      category,
      minimumYear,
      preferredBrand,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.38)] md:p-7"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.12)]">
          <CalculatorIcon className="h-7 w-7" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b]">
            Explora por presupuesto
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
            ¿Qué vehículo podrías importar?
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/52">
            Indica cuánto tienes disponible y el tipo de vehículo que buscas.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-white/72">
            Presupuesto total
          </span>

          <div className="flex overflow-hidden rounded-2xl border border-white/12 bg-[#07111d]/80 transition focus-within:border-[#f59e0b]/55">
            <span className="flex items-center border-r border-white/10 px-4 text-sm font-black text-[#f59e0b]">
              Q
            </span>

            <input
              type="number"
              min="30000"
              step="1000"
              value={budgetGTQ}
              onChange={(event) => setBudgetGTQ(event.target.value)}
              className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base font-semibold text-white outline-none placeholder:text-white/25"
              placeholder="120000"
              required
            />
          </div>

          <p className="mt-2 text-xs text-white/38">
            Presupuesto aproximado para compra, importación y entrega.
          </p>
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-white/72">
            Tipo de vehículo
          </span>

          <div className="relative">
            <CarIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#f59e0b]" />

            <select
              value={category}
              onChange={(event) =>
                setCategory(
                  event.target.value as VehicleReferenceCategory
                )
              }
              className="w-full appearance-none rounded-2xl border border-white/12 bg-[#07111d]/80 py-4 pl-12 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#f59e0b]/55"
            >
              {VEHICLE_CATEGORIES.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="bg-[#07111d]"
                >
                  {item.label}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/45">
              ▼
            </span>
          </div>
        </label>

        <label>
          <span className="mb-2 block text-sm font-semibold text-white/72">
            Año mínimo
          </span>

          <div className="relative">
            <select
              value={minimumYear}
              onChange={(event) =>
                setMinimumYear(Number(event.target.value))
              }
              className="w-full appearance-none rounded-2xl border border-white/12 bg-[#07111d]/80 px-4 py-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#f59e0b]/55"
            >
              {YEARS.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="bg-[#07111d]"
                >
                  {year}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/45">
              ▼
            </span>
          </div>
        </label>

        <label className="md:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-white/72">
            Marca preferida
            <span className="ml-1 font-normal text-white/35">
              opcional
            </span>
          </span>

          <div className="relative">
            <select
              value={preferredBrand}
              onChange={(event) =>
                setPreferredBrand(event.target.value)
              }
              className="w-full appearance-none rounded-2xl border border-white/12 bg-[#07111d]/80 px-4 py-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#f59e0b]/55"
            >
              {BRANDS.map((brand) => (
                <option
                  key={brand}
                  value={brand === "Sin preferencia" ? "" : brand}
                  className="bg-[#07111d]"
                >
                  {brand}
                </option>
              ))}
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/45">
              ▼
            </span>
          </div>
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#f59e0b] px-5 py-4 text-sm font-black text-black shadow-[0_18px_42px_rgba(245,158,11,0.25)] transition hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <CalculatorIcon className="h-5 w-5" />
        Ver opciones para mi presupuesto
      </button>
    </form>
  );
}
