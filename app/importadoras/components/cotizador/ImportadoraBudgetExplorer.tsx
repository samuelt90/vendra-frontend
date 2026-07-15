"use client";

import { useRef, useState } from "react";
import {
  MOCK_VEHICLE_REFERENCES,
  type MockVehicleReference,
} from "@/lib/importadoras/mockVehicleReferences";
import ImportadoraBudgetForm, {
  type BudgetFormValues,
} from "./ImportadoraBudgetForm";
import ImportadoraEstimateDisclaimer from "./ImportadoraEstimateDisclaimer";
import ImportadoraEstimateResults from "./ImportadoraEstimateResults";

type ImportadoraBudgetExplorerProps = {
  importadoraName: string;
  whatsappNumber: string | null;
};

function getVehicleScore(
  vehicle: MockVehicleReference,
  values: BudgetFormValues
) {
  const estimatedAverage =
    (vehicle.estimatedMinGTQ + vehicle.estimatedMaxGTQ) / 2;

  const budgetDifference = Math.abs(values.budgetGTQ - estimatedAverage);

  const preferredBrandBonus =
    values.preferredBrand &&
    vehicle.brand.toLowerCase() === values.preferredBrand.toLowerCase()
      ? -50000
      : 0;

  const yearDifference =
    vehicle.yearFrom >= values.minimumYear
      ? 0
      : (values.minimumYear - vehicle.yearFrom) * 5000;

  return budgetDifference + yearDifference + preferredBrandBonus;
}

function findVehicleReferences(values: BudgetFormValues) {
  const categoryMatches = MOCK_VEHICLE_REFERENCES.filter(
    (vehicle) =>
      vehicle.category === values.category &&
      vehicle.yearTo >= values.minimumYear
  );

  const preferredBrandMatches = values.preferredBrand
    ? categoryMatches.filter(
        (vehicle) =>
          vehicle.brand.toLowerCase() ===
          values.preferredBrand.toLowerCase()
      )
    : [];

  const source =
    preferredBrandMatches.length >= 3
      ? preferredBrandMatches
      : categoryMatches;

  return [...source]
    .sort(
      (firstVehicle, secondVehicle) =>
        getVehicleScore(firstVehicle, values) -
        getVehicleScore(secondVehicle, values)
    )
    .slice(0, 3);
}

export default function ImportadoraBudgetExplorer({
  importadoraName,
  whatsappNumber,
}: ImportadoraBudgetExplorerProps) {
  const [submittedValues, setSubmittedValues] =
    useState<BudgetFormValues | null>(null);

  const [results, setResults] = useState<MockVehicleReference[]>([]);

  const resultsRef = useRef<HTMLDivElement>(null);

  function handleSubmit(values: BudgetFormValues) {
    const matchedVehicles = findVehicleReferences(values);

    setSubmittedValues(values);
    setResults(matchedVehicles);

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  return (
    <div>
      <ImportadoraBudgetForm onSubmit={handleSubmit} />

      <div ref={resultsRef} className="scroll-mt-28">
        {submittedValues ? (
          <>
            <ImportadoraEstimateResults
              importadoraName={importadoraName}
              whatsappNumber={whatsappNumber}
              values={submittedValues}
              vehicles={results}
            />

            <ImportadoraEstimateDisclaimer />
          </>
        ) : (
          <section className="mt-8 rounded-[1.8rem] border border-dashed border-white/12 bg-white/[0.025] px-5 py-8 text-center">
            <p className="text-sm font-semibold text-white/60">
              Completa los datos para ver tres opciones cercanas a tu
              presupuesto.
            </p>

            <p className="mt-2 text-xs leading-5 text-white/35">
              Los resultados se mostrarán aquí sin salir de la página.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
