import type { ReactNode } from "react";
import {
  CalculatorIcon,
  DocumentIcon,
  RouteIcon,
  TruckIcon,
  UserCheckIcon,
} from "./icons/ImportadoraIcons";

const STEPS = [
  {
    number: "01",
    title: "Cotización inicial",
    description:
      "El cliente indica su presupuesto o el vehículo que busca para revisar qué opciones podrían tener sentido.",
    icon: <CalculatorIcon className="h-5 w-5" />,
  },
  {
    number: "02",
    title: "Búsqueda y revisión",
    description:
      "La importadora revisa vehículos similares, condición, precio y costos aproximados antes de recomendar una opción.",
    icon: <RouteIcon className="h-5 w-5" />,
  },
  {
    number: "03",
    title: "Selección y anticipo",
    description:
      "Antes de realizar un pago se confirma la unidad, el alcance de la gestión y las condiciones para avanzar.",
    icon: <UserCheckIcon className="h-5 w-5" />,
  },
  {
    number: "04",
    title: "Compra e importación",
    description:
      "Se coordina la compra, transporte en Estados Unidos, flete, ingreso y proceso de nacionalización.",
    icon: <DocumentIcon className="h-5 w-5" />,
  },
  {
    number: "05",
    title: "Preparación y entrega",
    description:
      "La unidad recibe el seguimiento necesario hasta quedar lista para su entrega en Guatemala.",
    icon: <TruckIcon className="h-5 w-5" />,
  },
];

export default function ProcessSteps() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_70px_rgba(0,0,0,0.38)] md:p-8">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b] md:text-sm">
          Proceso de importación
        </p>

        <h2 className="mt-3 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white md:text-5xl">
          Desde la búsqueda hasta la entrega
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/52 md:text-base">
          Cada vehículo requiere una revisión particular, pero estas son las
          etapas generales antes de recibirlo en Guatemala.
        </p>
      </div>

      {/* Móvil: ruta vertical */}
      <div className="relative mt-8 space-y-4 md:hidden">
        <div className="absolute bottom-10 left-[23px] top-10 w-px bg-gradient-to-b from-[#f59e0b]/60 via-[#f59e0b]/25 to-transparent" />

        {STEPS.map((step) => (
          <div
            key={step.number}
            className="relative grid grid-cols-[48px_1fr] gap-4"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#0a111b] text-[#f59e0b] shadow-[0_0_26px_rgba(245,158,11,0.14)]">
              {step.icon}

              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f59e0b] px-1 text-[8px] font-black text-black">
                {step.number}
              </span>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-[#07111d]/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <h3 className="text-base font-black text-white">{step.title}</h3>

              <p className="mt-2 text-xs leading-5 text-white/48">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet y desktop: ruta horizontal */}
      <div className="relative mt-10 hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-7 h-px bg-gradient-to-r from-transparent via-[#f59e0b]/45 to-transparent" />

        <div className="relative grid grid-cols-5 gap-3">
          {STEPS.map((step) => (
            <DesktopProcessStep
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopProcessStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col items-center text-center">
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#0a111b] text-[#f59e0b] shadow-[0_0_28px_rgba(245,158,11,0.14)]">
        {icon}

        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f59e0b] px-1 text-[9px] font-black text-black">
          {number}
        </span>
      </div>

      <div className="mt-5 min-h-[190px] w-full rounded-[1.4rem] border border-white/10 bg-[#07111d]/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <h3 className="text-sm font-black leading-5 text-white">{title}</h3>

        <p className="mt-3 text-xs leading-5 text-white/45">
          {description}
        </p>
      </div>
    </article>
  );
}