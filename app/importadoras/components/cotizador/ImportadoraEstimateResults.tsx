import { buildEstimateWhatsappUrl } from "@/lib/importadoras/buildEstimateWhatsappUrl";
import type { MockVehicleReference } from "@/lib/importadoras/mockVehicleReferences";
import type { BudgetFormValues } from "./ImportadoraBudgetForm";
import ImportadoraEstimateCard from "./ImportadoraEstimateCard";

type ImportadoraEstimateResultsProps = {
  importadoraName: string;
  whatsappNumber: string | null;
  values: BudgetFormValues;
  vehicles: MockVehicleReference[];
};

const CATEGORY_LABELS = {
  sedan: "Sedán",
  suv: "SUV",
  pickup: "Pickup",
};

function formatGTQ(amount: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ImportadoraEstimateResults({
  importadoraName,
  whatsappNumber,
  values,
  vehicles,
}: ImportadoraEstimateResultsProps) {
  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b]">
            Resultados de referencia
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-[-0.045em] text-white md:text-4xl">
            Opciones cercanas a tu presupuesto
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52 md:text-base">
            Estas referencias muestran vehículos que podrían ajustarse al monto
            y características que seleccionaste.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3">
          <p className="text-xs text-white/42">Tu búsqueda</p>

          <p className="mt-1 text-sm font-bold text-white">
            {formatGTQ(values.budgetGTQ)} ·{" "}
            {CATEGORY_LABELS[values.category]} · Desde {values.minimumYear}
          </p>

          {values.preferredBrand ? (
            <p className="mt-1 text-xs font-semibold text-[#f59e0b]">
              Preferencia: {values.preferredBrand}
            </p>
          ) : null}
        </div>
      </div>

      {vehicles.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle, index) => {
            const whatsappUrl = buildEstimateWhatsappUrl({
              importadoraName,
              whatsappNumber,
              budgetGTQ: values.budgetGTQ,
              category: values.category,
              minimumYear: values.minimumYear,
              preferredBrand: values.preferredBrand,
              vehicle,
            });

            return (
              <ImportadoraEstimateCard
                key={vehicle.id}
                vehicle={vehicle}
                budgetGTQ={values.budgetGTQ}
                whatsappUrl={whatsappUrl}
                position={index + 1}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center md:p-10">
          <p className="text-lg font-bold text-white">
            No encontramos referencias con esos criterios.
          </p>

          <p className="mt-2 text-sm leading-6 text-white/48">
            Prueba con otro tipo de vehículo, una marca diferente o un año
            mínimo más flexible.
          </p>
        </div>
      )}
    </section>
  );
}
