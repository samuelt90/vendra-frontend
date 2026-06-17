import Link from "next/link";
import { getPredioVehicleDetail } from "@/lib/predios/service";
import ContactForm from "./ContactForm";

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
  backUrl,
  debugUrl,
}: {
  title: string;
  message: string;
  backUrl: string;
  debugUrl?: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
        <h1 className="text-lg font-black text-gray-950">{title}</h1>

        <p className="mt-3 text-sm leading-relaxed text-red-600">{message}</p>

        {debugUrl ? (
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
            {debugUrl}
          </pre>
        ) : null}

        <Link
          href={backUrl}
          className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Volver
        </Link>
      </div>
    </main>
  );
}

export default async function ContactarPage({ params }: PageProps) {
  const { slug, documentId } = await resolveParams(params);

  const result = await getPredioVehicleDetail(slug, documentId);

  if (!result.ok || !result.data) {
    return (
      <ErrorState
        title="Contactar a vendedor"
        message={result.error || "No se pudo cargar el vehículo."}
        backUrl={`/predios/${slug}`}
        debugUrl={result.url}
      />
    );
  }

  const detail = result.data;

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/predios/${detail.predio.slug}/vehiculos/${detail.vehiculo.documentId}`}
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            ← Volver al vehículo
          </Link>

          <div className="text-xs font-black text-slate-500">
            Vendra · Predios
          </div>
        </header>

        <section className="grid min-h-[70vh] place-items-center">
          <ContactForm detail={detail} />
        </section>
      </div>
    </main>
  );
}