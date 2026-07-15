import ImportadoraActionCard from "../ui/ImportadoraActionCard";
import {
  CalculatorIcon,
  CarIcon,
  RouteIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraHomeActionCardsProps = {
  slug: string;
  className?: string;
};

export default function ImportadoraHomeActionCards({
  slug,
  className = "",
}: ImportadoraHomeActionCardsProps) {
  return (
    <section className={["mt-10", className].join(" ")}>
      <div className="mb-5">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f59e0b]">
          Accesos rápidos
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ImportadoraActionCard
          href={`/importadoras/${slug}/cotizador`}
          title="Cotizador"
          text="Obtén una referencia inicial según marca, modelo y presupuesto."
          actionLabel="Cotizar ahora"
          icon={<CalculatorIcon className="h-9 w-9" />}
        />

        <ImportadoraActionCard
          href={`/importadoras/${slug}/inventario`}
          title="Inventario"
          text="Explora vehículos disponibles, en ruta y próximos ingresos."
          actionLabel="Ver inventario"
          icon={<CarIcon className="h-9 w-9" />}
        />

        <ImportadoraActionCard
          href={`/importadoras/${slug}/proceso`}
          title="Proceso"
          text="Conoce cómo funciona la importación paso a paso."
          actionLabel="Ver proceso"
          icon={<RouteIcon className="h-9 w-9" />}
        />
      </div>
    </section>
  );
}
