import type { PredioVehicle } from "@/lib/predios/types";

type Props = {
  vehicle: PredioVehicle;
  compact?: boolean;
};

function formatKilometraje(value: string) {
  if (!value) return "";

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    return value.toLowerCase().includes("km") ? value : `${value} km`;
  }

  return `${numberValue.toLocaleString("es-GT")} km`;
}

function normalizeValue(value: string) {
  if (!value) return "";

  return value
    .replace(/_/g, " ")
    .trim()
    .toLowerCase()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatFeatureValue(label: string, value: string) {
  if (!value) return "";

  if (label === "Kilometraje") {
    return formatKilometraje(value);
  }

  if (label === "Transmisión" || label === "Combustible") {
    return normalizeValue(value);
  }

  return value;
}

export default function VehicleFeatureList({ vehicle, compact = false }: Props) {
  const features = [
    ["Marca", vehicle.marca],
    ["Modelo", vehicle.modelo],
    ["Año", vehicle.anio],
    ["Kilometraje", vehicle.kilometraje],
    ["Transmisión", vehicle.transmision],
    ["Combustible", vehicle.combustible],
    ["Motor", vehicle.motor],
  ]
    .map(([label, value]) => [label, formatFeatureValue(label, value || "")])
    .filter(([, value]) => Boolean(value));

  if (features.length === 0) {
    return (
      <p className="text-sm font-semibold text-slate-500">
        Características por completar.
      </p>
    );
  }

  return (
    <div
      className={
        compact
          ? "divide-y divide-slate-200 text-sm"
          : "divide-y divide-slate-200 text-sm"
      }
    >
      {features.map(([label, value]) => (
        <div
          key={label}
          className={
            compact
              ? "flex items-center justify-between gap-4 py-2"
              : "flex items-center justify-between gap-4 py-3"
          }
        >
          <span className="font-bold text-slate-500">{label}</span>

          <span className="max-w-[58%] break-words text-right font-black text-slate-950">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
