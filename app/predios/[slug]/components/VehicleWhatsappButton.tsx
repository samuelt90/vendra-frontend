import Link from "next/link";
import type { PredioVehicle } from "@/lib/predios/types";

type Props = {
  href: string;
  vehicle: PredioVehicle;
  label?: string;
  fullWidth?: boolean;
};

export default function VehicleWhatsappButton({
  href,
  vehicle,
  label = "Contactar por WhatsApp",
  fullWidth = true,
}: Props) {
  const isSold = vehicle.estado === "vendido";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl border px-4 py-4 text-sm font-black shadow-lg transition ${
        fullWidth ? "w-full" : ""
      } ${
        isSold
          ? "pointer-events-none border-slate-200 bg-slate-200 text-slate-500 shadow-none"
          : "border-green-700 bg-green-600 text-white shadow-green-600/20 hover:bg-green-700 active:scale-[0.99]"
      }`}
      aria-disabled={isSold}
    >
      {isSold ? "Vehículo vendido" : label}
    </Link>
  );
}
