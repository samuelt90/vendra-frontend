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
  return (
    <div>
      <div
        className={
          size === "lg"
            ? "break-words text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl"
            : "break-words text-xl font-black text-slate-950"
        }
      >
        {formatPrice(vehicle.precio, vehicle.moneda)}
      </div>
    </div>
  );
}

