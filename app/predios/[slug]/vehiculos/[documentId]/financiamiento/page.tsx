import Link from "next/link";
import { getPredioVehicleDetail } from "@/lib/predios/service";
import { getPredioPaymentOptions } from "@/lib/predios/payments";
import VehiclePriceBox from "../../../components/VehiclePriceBox";
import FinancingOptions from "./FinancingOptions";

type PageProps = {
  params: Promise<{ slug: string; documentId: string }> | {
    slug: string;
    documentId: string;
  };
};

async function resolveParams(params: PageProps["params"]) {
  return await Promise.resolve(params);
}

export default async function VehicleFinancingPage({ params }: PageProps) {
  const { slug, documentId } = await resolveParams(params);

  const result = await getPredioVehicleDetail(slug, documentId);

  if (!result.ok || !result.data) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-6 text-white">
        <div className="mx-auto w-full max-w-4xl">
          <Link
            href={`/predios/${slug}`}
            className="inline-flex w-fit items-center rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.99]"
          >
            ← Volver
          </Link>

          <section className="mt-5 rounded-3xl border border-white/20 bg-white/[0.075] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
            <h1 className="text-2xl font-black text-[#F8FAFC]">
              Vehículo no encontrado
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              No se pudo cargar la información del vehículo.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const { predio, vehiculo } = result.data;
  const paymentOptions = getPredioPaymentOptions(predio);

  const vehicleMainTitle =
    [vehiculo.marca, vehiculo.modelo, vehiculo.anio]
      .filter(Boolean)
      .join(" · ") ||
    vehiculo.titulo ||
    "Vehículo";

  return (
    <main className="min-h-screen bg-slate-950 px-3 py-4 text-white sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <Link
            href={`/predios/${predio.slug}/vehiculos/${vehiculo.documentId}`}
            className="inline-flex w-fit items-center rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.99]"
          >
            ← Volver al vehículo
          </Link>

          <div className="text-xs font-black text-slate-500">
            Vendra · Predios
          </div>
        </header>

        <section className="rounded-[2rem] border border-white/20 bg-white/[0.075] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md sm:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Opciones disponibles
            </p>

            <h1 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-[#F8FAFC] sm:text-3xl">
              {vehicleMainTitle}
            </h1>

            {vehiculo.titulo ? (
              <p className="mt-1 text-sm font-semibold text-[#A65A6A]">
                {vehiculo.titulo}
              </p>
            ) : null}

            <div className="mt-5">
              <VehiclePriceBox vehicle={vehiculo} size="lg" />
            </div>
          </div>

          <FinancingOptions
            predio={predio}
            vehicle={vehiculo}
            vehicleTitle={vehicleMainTitle}
            options={paymentOptions}
          />
        </section>
      </div>
    </main>
  );
}