import { notFound } from "next/navigation";
import { getImportadora } from "@/lib/importadoras/getImportadora";
import { getImportadoraInventory } from "@/lib/importadoras/getImportadoraInventory";
import ImportadoraHeader from "../../components/ImportadoraHeader";
import ImportadoraPageShell from "../../components/ImportadoraPageShell";
import InventoryTabs from "../../components/InventoryTabs";
import {
  CarIcon,
  RouteIcon,
  TruckIcon,
} from "../../components/icons/ImportadoraIcons";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ImportadoraInventarioPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const [importadora, vehicles] = await Promise.all([
    getImportadora(slug),
    getImportadoraInventory(slug),
  ]);

  if (!importadora || !importadora.active) {
    notFound();
  }

  return (
    <ImportadoraPageShell>
      <ImportadoraHeader
        name={importadora.name}
        slug={importadora.slug}
        logoUrl={importadora.logoUrl}
        activePage="inventario"
        label="Importadora"
        whatsappNumber={importadora.whatsappNumber}
      />

      <section className="relative overflow-hidden border-b border-white/10 py-10 md:py-14">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#f59e0b]/10 blur-[110px]" />

        <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b] md:text-sm">
              Inventario publicado
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] text-white md:text-6xl">
              Vehículos disponibles y próximos ingresos
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
              Revisa unidades próximas a ingresar, vehículos en preparación,
              opciones listas para entrega y entregas realizadas.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <InventoryIntroItem
              icon={<RouteIcon className="h-5 w-5" />}
              title="Próximos ingresos"
              text="Unidades que vienen en camino."
            />

            <InventoryIntroItem
              icon={<CarIcon className="h-5 w-5" />}
              title="En preparación"
              text="Vehículos que están siendo revisados."
            />

            <InventoryIntroItem
              icon={<TruckIcon className="h-5 w-5" />}
              title="Listos y entregados"
              text="Opciones disponibles e historial."
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <InventoryTabs
          vehicles={vehicles}
          slug={importadora.slug}
          whatsappNumber={importadora.whatsappNumber}
          importadoraName={importadora.name}
        />
      </section>
    </ImportadoraPageShell>
  );
}

function InventoryIntroItem({
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
