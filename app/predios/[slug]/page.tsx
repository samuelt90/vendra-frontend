import { getPredioCatalogBySlug } from "@/lib/predios/service";
import PredioHeader from "./components/PredioHeader";
import PredioVehicleCatalog from "./components/PredioVehicleCatalog";


type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
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
      <div className="mx-auto max-w-5xl">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-md" />
            <div className="font-black tracking-wide text-slate-950">
              Vendra
            </div>
          </div>

          <div className="text-xs font-black text-slate-500">
            Demo · Predios
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">{title}</h1>

          <p className="mt-2 text-sm text-slate-600">{message}</p>

          {debugUrl ? (
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
              {debugUrl}
            </pre>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default async function PredioPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);

  const result = await getPredioCatalogBySlug(slug);

  if (!result.ok || !result.data) {
    return (
      <ErrorState
        title="Predio no encontrado"
        message={result.error || "No se pudo cargar la información del predio."}
        debugUrl={result.url}
      />
    );
  }

  const predio = result.data;
  const waLink = predio.whatsapp ? `https://wa.me/${predio.whatsapp}` : "";

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-5xl">
        
        <PredioHeader predio={predio} />

      <PredioVehicleCatalog
      slug={predio.slug}
      vehicles={predio.vehiculos}/>

      </div>
    </main>
  );
}
