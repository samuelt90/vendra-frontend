import Link from "next/link";
import { notFound } from "next/navigation";
import { getImportadoraProcess } from "@/lib/importadoras/getImportadoraProcess";
import ImportadoraHeader from "../../components/ImportadoraHeader";
import ImportadoraPageShell from "../../components/ImportadoraPageShell";
import ProcessSteps from "../../components/ProcessSteps";
import TrustSection from "../../components/TrustSection";
import ImportadoraFaq from "../../components/ImportadoraFaq";
import {
  DocumentIcon,
  RouteIcon,
  ShieldIcon,
} from "../../components/icons/ImportadoraIcons";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ImportadoraProcesoPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const importadora = await getImportadoraProcess(slug);

  if (!importadora) {
    notFound();
  }

  const financingOptions = [
    importadora.acceptsVisacuotas ? "Visacuotas" : null,
    importadora.acceptsCredicuotas ? "Credicuotas" : null,
    importadora.acceptsOwnFinancing ? "Financiamiento propio" : null,
    importadora.acceptsBankFinancing
      ? "Financiamiento bancario"
      : null,
  ].filter(Boolean) as string[];

  return (
    <ImportadoraPageShell>
      <ImportadoraHeader
        name={importadora.name}
        slug={importadora.slug}
        logoUrl={importadora.logoUrl}
        activePage="proceso"
        label="Importadora"
        whatsappNumber={importadora.whatsappNumber}
      />

      <section className="relative overflow-hidden border-b border-white/10 py-10 md:py-14">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#f59e0b]/10 blur-[110px]" />

        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b] md:text-sm">
              Antes de avanzar
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white md:text-6xl">
              Conoce cómo funciona la importación
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
              Revisa el proceso, los datos del negocio, las opciones de
              financiamiento y las dudas frecuentes antes de iniciar una
              gestión.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <ProcessIntroItem
              icon={<RouteIcon className="h-5 w-5" />}
              title="Proceso"
              text="Desde la búsqueda hasta la entrega."
            />

            <ProcessIntroItem
              icon={<ShieldIcon className="h-5 w-5" />}
              title="Datos visibles"
              text="Nombre comercial, NIT y ubicación."
            />

            <ProcessIntroItem
              icon={<DocumentIcon className="h-5 w-5" />}
              title="Información clara"
              text="Financiamiento y dudas frecuentes."
            />
          </div>
        </div>
      </section>

      <div className="space-y-10 py-8 md:space-y-14 md:py-12">
        <ProcessSteps />

        <TrustSection
          businessName={importadora.businessName}
          nit={importadora.nit}
          officeAddress={importadora.officeAddress}
          googleMapsUrl={importadora.googleMapsUrl}
          officePhotoUrls={importadora.officePhotoUrls}
          deliveryPhotoUrls={importadora.deliveryPhotoUrls}
          financingOptions={financingOptions}
        />

        <ImportadoraFaq />

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b]">
                Siguiente paso
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white md:text-3xl">
                Explora una opción según tu presupuesto
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/52">
                Revisa vehículos de referencia o consulta las unidades que la
                importadora tiene publicadas.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={`/importadoras/${importadora.slug}/cotizador`}
                className="flex items-center justify-center rounded-2xl bg-[#f59e0b] px-5 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(245,158,11,0.22)] transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Explorar presupuesto
              </Link>

              <Link
                href={`/importadoras/${importadora.slug}/inventario`}
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.055] px-5 py-3.5 text-sm font-bold text-white transition hover:border-[#f59e0b]/35 hover:text-[#f59e0b]"
              >
                Ver inventario
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ImportadoraPageShell>
  );
}

function ProcessIntroItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/42">{text}</p>
      </div>
    </div>
  );
}
