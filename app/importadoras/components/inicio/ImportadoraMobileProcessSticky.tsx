import Link from "next/link";
import {
  ArrowIcon,
  CalculatorIcon,
  DocumentIcon,
  TruckIcon,
  UserCheckIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraMobileProcessStickyProps = {
  slug: string;
};

const PROCESS_STEPS = [
  {
    number: "01",
    label: "Cotizas",
    icon: <CalculatorIcon className="h-4 w-4" />,
  },
  {
    number: "02",
    label: "Buscamos",
    icon: <UserCheckIcon className="h-4 w-4" />,
  },
  {
    number: "03",
    label: "Gestionamos",
    icon: <DocumentIcon className="h-4 w-4" />,
  },
  {
    number: "04",
    label: "Entregamos",
    icon: <TruckIcon className="h-4 w-4" />,
  },
];

export default function ImportadoraMobileProcessSticky({
  slug,
}: ImportadoraMobileProcessStickyProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#03070d]/92 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-24px_70px_rgba(0,0,0,0.58)] backdrop-blur-2xl lg:hidden">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.055] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-[#f59e0b]/14 blur-3xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#f59e0b]">
              Nuestro proceso
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              Importar en cuatro pasos
            </p>
          </div>

          <Link
            href={`/importadoras/${slug}/proceso`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2 text-[11px] font-bold text-white transition active:scale-[0.97]"
          >
            Ver proceso
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-[11%] right-[11%] top-[22px] h-px bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent" />

          <div className="relative grid grid-cols-4 gap-1">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex min-w-0 flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#f59e0b]/35 bg-[#0a111b] text-[#f59e0b] shadow-[0_0_22px_rgba(245,158,11,0.15)]">
                  {step.icon}

                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f59e0b] px-1 text-[8px] font-black text-black">
                    {step.number}
                  </span>
                </div>

                <p className="mt-2 truncate text-[10px] font-bold text-white/78">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}