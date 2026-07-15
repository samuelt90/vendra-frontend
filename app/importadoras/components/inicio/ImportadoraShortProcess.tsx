import Link from "next/link";
import {
  ArrowIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraShortProcessProps = {
  slug: string;
};

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Cotizas el vehículo",
    text: "Nos indicas qué buscas y tu presupuesto.",
    
  },
  {
    number: "02",
    title: "Buscamos opciones",
    text: "Revisamos alternativas que puedan tener sentido.",
   
  },
  {
    number: "03",
    title: "Coordinamos la gestión",
    text: "Se explica el proceso antes de avanzar.",
   
  },
  {
    number: "04",
    title: "Entrega en Guatemala",
    text: "Se da seguimiento hasta la entrega final.",
   
  },
];

export default function ImportadoraShortProcess({
  slug,
}: ImportadoraShortProcessProps) {
  return (
    <section className="mt-10">
    

      {/* Desktop*/}
      <div className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.35)] lg:block">
        <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-[#f59e0b]">
              Cómo funciona en breve
            </p>

            <h3 className="mt-2 text-4xl font-semibold tracking-tight text-white">
              Un proceso más claro antes de importar.
            </h3>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/55">
              La idea es que puedas consultar, comparar y entender el camino
              antes de avanzar con una compra o importación.
            </p>

            <Link
              href={`/importadoras/${slug}/proceso`}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
            >
              Ver proceso completo
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROCESS_STEPS.map((step) => (
              <DesktopProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                text={step.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopProcessStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-[#070d15]/70 p-4">
      <p className="text-sm font-bold text-[#f59e0b]">{number}</p>
      <h4 className="mt-3 text-base font-semibold text-white">{title}</h4>
      <p className="mt-2 text-xs leading-5 text-white/45">{text}</p>
    </div>
  );
}
