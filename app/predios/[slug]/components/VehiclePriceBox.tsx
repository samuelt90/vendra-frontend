import type { PredioVehicle } from "@/lib/predios/types";

type Props = {
  vehicle: PredioVehicle;
  size?: "sm" | "lg";
};

function formatPrice(precio: string, moneda: string) {
  if (!precio) return "Precio no definido";

  const numberValue = Number(precio);

  if (!Number.isFinite(numberValue)) {
    return `${precio} ${moneda}`.trim();
  }

  return `${moneda} ${numberValue.toLocaleString("es-GT", {
    maximumFractionDigits: 0,
  })}`;
}

export default function VehiclePriceBox({ vehicle, size = "sm" }: Props) {
  const isSold = vehicle.estado === "vendido";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div
          className={
            size === "lg"
              ? "text-3xl font-black text-slate-950"
              : "text-xl font-black text-slate-950"
          }
        >
          {formatPrice(vehicle.precio, vehicle.moneda)}
        </div>

        <div className="mt-1 text-xs font-bold text-slate-500">
          Precio publicado por el vendedor
        </div>
      </div>

      <div
        className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${
          isSold
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
        }`}
      >
        {vehicle.estado}
      </div>
    </div>
  );
}
