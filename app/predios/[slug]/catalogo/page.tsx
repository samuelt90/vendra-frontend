import { getPredioCatalogBySlug } from "@/lib/predios/service";
import PredioDigitalCatalog from "../components/PredioDigitalCatalog";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams?:
    | Promise<{ estado?: string }>
    | { estado?: string };
};

async function resolveParams(params: PageProps["params"]) {
  return await Promise.resolve(params);
}

async function resolveSearchParams(searchParams: PageProps["searchParams"]) {
  return await Promise.resolve(searchParams || {});
}

function getInitialEstado(estado?: string) {
  if (
    estado === "disponible" ||
    estado === "en_ruta" ||
    estado === "vendido"
  ) {
    return estado;
  }

  return "todos";
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
    <main className="min-h-screen bg-slate-950 p-4 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/20 bg-white/[0.075] shadow-md" />

            <div className="font-black tracking-wide text-[#F8FAFC]">
              Vendra
            </div>
          </div>

          <div className="text-xs font-black text-slate-500">
            Demo · Predios
          </div>
        </header>

        <section className="rounded-3xl border border-white/20 bg-white/[0.075] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
          <h1 className="text-2xl font-black text-[#F8FAFC]">{title}</h1>

          <p className="mt-2 text-sm text-slate-400">{message}</p>

          {debugUrl ? (
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/20 p-4 text-xs leading-relaxed text-slate-400">
              {debugUrl}
            </pre>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default async function PredioCatalogoPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await resolveParams(params);
  const resolvedSearchParams = await resolveSearchParams(searchParams);

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
  const initialEstado = getInitialEstado(resolvedSearchParams.estado);

return (
  <main className="min-h-screen bg-slate-950 text-white sm:px-4 sm:py-8">
    <div className="mx-auto w-full max-w-7xl">
      <PredioDigitalCatalog
        slug={predio.slug}
        vehicles={predio.vehiculos}
        initialEstado={initialEstado}
      />
    </div>
  </main>
);
}