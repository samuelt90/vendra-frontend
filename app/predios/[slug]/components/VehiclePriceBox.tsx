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
  const priceClass =
    size === "lg"
      ? "break-words text-3xl font-black leading-tight tracking-tight text-[#F8FAFC] sm:text-4xl"
      : "break-words text-xl font-black leading-tight tracking-tight text-[#F8FAFC]";

const negotiableClass =
  size === "lg"
    ? "ml-2 inline-flex align-middle border-x border-[#A65A6A]/45 px-2 py-0.5 text-sm font-black leading-none tracking-normal text-[#A65A6A] sm:text-base"
    : "ml-2 inline-flex align-middle border-x border-[#A65A6A]/45 px-2 py-0.5 text-[11px] font-black leading-none tracking-normal text-[#A65A6A]";

  return (
    <div>
      <div className={priceClass}>
        {formatPrice(vehicle.precio, vehicle.moneda)}

        {vehicle.precio_negociable ? (
          <span className={negotiableClass}> Negociable</span>
        ) : null}
      </div>
    </div>
  );
}
