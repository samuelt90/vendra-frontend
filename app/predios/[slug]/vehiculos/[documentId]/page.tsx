import Link from "next/link";
import { getPredioVehicleDetail } from "@/lib/predios/service";
import VehicleDetailGallery from "../../components/VehicleDetailGallery";
import VehicleFeatureList from "../../components/VehicleFeatureList";
import VehiclePriceBox from "../../components/VehiclePriceBox";
import { CreditCard } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { hasPredioPaymentOptions } from "@/lib/predios/payments";

type PageProps = {
  params:
    | Promise<{ slug: string; documentId: string }>
    | { slug: string; documentId: string };
};

async function resolveParams(params: PageProps["params"]) {
  return await Promise.resolve(params);
}

function ErrorState({
  title,
  message,
  debugUrl,
}: {
  title: string;
  message: string;
  debugUrl?: string;
}) {
  return (
    <main className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-950">{title}</h1>

        <p className="mt-2 text-sm text-slate-600">{message}</p>

        {debugUrl ? (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
            {debugUrl}
          </pre>
        ) : null}
      </div>
    </main>
  );
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug, documentId } = await resolveParams(params);

  const result = await getPredioVehicleDetail(slug, documentId);

  if (!result.ok || !result.data) {
    return (
      <ErrorState
        title="Vehículo no encontrado"
        message={result.error || "No se pudo cargar este vehículo."}
        debugUrl={result.url}
      />
    );
  }

  const { predio, vehiculo } = result.data;

  const contactUrl = `/predios/${predio.slug}/vehiculos/${vehiculo.documentId}/contactar`;

  const vehicleMainTitle =
  [vehiculo.marca, vehiculo.modelo, vehiculo.anio]
    .filter(Boolean)
    .join(" · ") || vehiculo.titulo || "Vehículo";

const vehicleCategory = vehiculo.titulo || "";

const financingUrl  = `/predios/${predio.slug}/vehiculos/${vehiculo.documentId}/financiamiento`;
const canShowPaymentOptions =
  vehiculo.estado !== "vendido" && hasPredioPaymentOptions(predio);

return (
  <main className="min-h-screen bg-slate-950 px-3 py-4 text-white sm:px-4 sm:py-8">
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-4 flex items-center justify-between gap-3">
        <Link
          href={`/predios/${predio.slug}`}
          className="inline-flex w-fit items-center rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.99]"
        >
          ← Volver
        </Link>

        <div className="text-xs font-black text-slate-500">
          Vendra · Predios
        </div>
      </header>

      <section className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
        <div className="grid min-w-0 gap-0 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="min-w-0 bg-slate-950">
            <VehicleDetailGallery
              images={vehiculo.galeria}
              title={vehiculo.titulo}
            />
          </div>

          <aside className="min-w-0 border-t border-white/10 p-5 sm:p-6 xl:border-l xl:border-t-0">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
              {predio.nombre}
            </div>

            <h1 className="mt-2 break-words text-2xl font-black uppercase leading-tight tracking-tight text-[#F8FAFC] sm:text-3xl">
              {vehicleMainTitle}
            </h1>

            {vehicleCategory ? (
              <p className="mt-1 text-sm font-semibold text-[#A65A6A]">
                {vehicleCategory}
              </p>
            ) : null}

            <div className="mt-5 flex items-center gap-4">
              <VehiclePriceBox vehicle={vehiculo} size="lg" />

              {vehiculo.estado !== "vendido" ? (
                <Link
                  href={contactUrl}
                  aria-label="Consultar por WhatsApp"
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-95 sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
                >
                  <FaWhatsapp className="h-7 w-7 text-emerald-400" />
                </Link>
              ) : null}
            </div>

                {canShowPaymentOptions ? (
                  <Link
                    href={financingUrl}
                    className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/[0.075] px-4 py-3 text-sm font-black text-[#F8FAFC] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_20px_rgba(0,0,0,0.24)] ring-1 ring-white/10 backdrop-blur-md transition active:scale-[0.99] sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
                  >
                    <CreditCard size={18} className="shrink-0 text-[#A65A6A]" />
                    Ver opciones de financiamiento
                  </Link>
                ) : null}

            <section className="mt-6 rounded-3xl border border-white/20 bg-white/[0.075] px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
              <h2 className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                Características
              </h2>

              <div className="mt-3">
                <VehicleFeatureList vehicle={vehiculo} />
              </div>
            </section>

            {vehiculo.descripcion ? (
              <section className="mt-5 rounded-3xl border border-white/20 bg-white/[0.075] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_20px_rgba(0,0,0,0.24)] ring-1 ring-white/10 backdrop-blur-md">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-400">
                  Descripción
                </h2>

                <div className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-300">
                  {vehiculo.descripcion}
                </div>
              </section>
            ) : null}

            <section className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-400">
              <div className="font-black text-[#F8FAFC]">{predio.nombre}</div>

              <div className="mt-1 break-words text-slate-500">
                {predio.direccion || "Dirección no definida"}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </div>
  </main>
);
}