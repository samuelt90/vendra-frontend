import type { PredioVehicle } from "@/lib/predios/types";

type Props = {
  vehicle: PredioVehicle;
  compact?: boolean;
};

export default function VehicleFeatureList({ vehicle, compact = false }: Props) {
  const features = [
    ["Marca", vehicle.marca],
    ["Modelo", vehicle.modelo],
    ["Año", vehicle.anio],
    ["Kilometraje", vehicle.kilometraje],
    ["Transmisión", vehicle.transmision],
    ["Combustible", vehicle.combustible],
    ["Motor", vehicle.motor],
  ].filter(([, value]) => Boolean(value));

  if (features.length === 0) {
    return (
      <p className="text-sm font-semibold text-slate-500">
        Características por completar.
      </p>
    );
  }

  if (compact) {
    return (
      <div className="grid gap-2 text-sm">
        {features.map(([label, value]) => (
          <div key={label} className="flex gap-2">
            <span className="font-extrabold text-slate-500">{label}:</span>
            <span className="font-black text-slate-900">{value}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 text-sm">
      {features.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4">
          <span className="font-bold text-slate-500">{label}</span>
          <span className="text-right font-black text-slate-900">{value}</span>
        </div>
      ))}
    </div>
  );
}
