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
    <main className="min-h-screen bg-slate-50 px-3 py-4 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/predios/${predio.slug}`}
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            ← Volver al predio
          </Link>

          <div className="text-xs font-black text-slate-500">
            Vendra · Predios
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <VehicleDetailGallery
              images={vehiculo.galeria}
              title={vehiculo.titulo}
            />

            <aside className="p-5 sm:p-6">
              <div className="text-xs font-black uppercase tracking-wide text-slate-500">
                {predio.nombre}
              </div>

              <h1 className="mt-2 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                {vehiculo.titulo}
              </h1>

              <div className="mt-4">
                <VehiclePriceBox vehicle={vehiculo} size="lg" />
              </div>

              <div className="mt-5 grid gap-2">
                <VehicleWhatsappButton
                  href={contactUrl}
                  vehicle={vehiculo}
                />

                <Link
                  href={`/predios/${predio.slug}`}
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
                >
                  Ver más vehículos del predio
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">
                  Características
                </h2>

                <div className="mt-4">
                  <VehicleFeatureList vehicle={vehiculo} />
                </div>
              </div>

              {vehiculo.descripcion ? (
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-black uppercase tracking-wide text-slate-500">
                    Descripción
                  </h2>

                  <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {vehiculo.descripcion}
                  </div>
                </div>
              ) : null}

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                <div className="font-black text-slate-950">
                  {predio.nombre}
                </div>

                <div className="mt-1">
                  {predio.direccion || "Dirección no definida"}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
