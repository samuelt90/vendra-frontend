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
  fullWidth = false,
}: Props) {
  const isSold = vehicle.estado === "vendido";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-black shadow-md transition active:scale-[0.99] ${
        fullWidth ? "w-full" : "w-fit max-w-full"
      } ${
        isSold
          ? "pointer-events-none border-slate-200 bg-slate-200 text-slate-500 shadow-none"
          : "border-green-700 bg-green-600 text-white shadow-green-600/20 hover:bg-green-700"
      }`}
      aria-disabled={isSold}
    >
      {isSold ? "Vehículo vendido" : label}
    </Link>
  );
}
