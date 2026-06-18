import Link from "next/link";
import { getPredioVehicleDetail } from "@/lib/predios/service";
import VehicleDetailGallery from "../../components/VehicleDetailGallery";
import VehicleFeatureList from "../../components/VehicleFeatureList";
import VehiclePriceBox from "../../components/VehiclePriceBox";
import VehicleWhatsappButton from "../../components/VehicleWhatsappButton";

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

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-4 flex items-center justify-between gap-3">
          <Link
            href={`/predios/${predio.slug}`}
            className="inline-flex w-fit items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
          >
            ← Volver
          </Link>

          <div className="text-xs font-black text-slate-500">
            Vendra · Predios
          </div>
        </header>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="grid min-w-0 gap-0 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0">
              <VehicleDetailGallery
                images={vehiculo.galeria}
                title={vehiculo.titulo}
              />
            </div>

            <aside className="min-w-0 border-t border-slate-200 p-5 sm:p-6 xl:border-l xl:border-t-0">
              <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                {predio.nombre}
              </div>

              <h1 className="mt-2 break-words text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                {vehiculo.titulo}
              </h1>

              <p className="mt-1 text-sm font-bold text-slate-500">
                {[vehiculo.marca, vehiculo.modelo, vehiculo.anio]
                  .filter(Boolean)
                  .join(" · ") || "Datos por completar"}
              </p>

              <div className="mt-5">
                <VehiclePriceBox vehicle={vehiculo} size="lg" />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <VehicleWhatsappButton
                  href={contactUrl}
                  vehicle={vehiculo}
                  label="Contactar"
                />

                <Link
                  href={`/predios/${predio.slug}`}
                  className="inline-flex w-fit max-w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
                >
                  Ver más vehículos
                </Link>
              </div>

              <section className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                  Características
                </h2>

                <div className="mt-4">
                  <VehicleFeatureList vehicle={vehiculo} />
                </div>
              </section>

              {vehiculo.descripcion ? (
                <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">
                    Descripción
                  </h2>

                  <div className="mt-3 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-700">
                    {vehiculo.descripcion}
                  </div>
                </section>
              ) : null}

              <section className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                <div className="font-black text-slate-950">{predio.nombre}</div>

                <div className="mt-1 break-words">
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
