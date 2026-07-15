import type { ReactNode } from "react";
import {
  DocumentIcon,
  ShieldIcon,
  TruckIcon,
  UserCheckIcon,
} from "../icons/ImportadoraIcons";

const TRUST_ITEMS = [
  {
    title: "Compra segura",
    text: "Proceso acompañado desde la cotización hasta la entrega.",
    icon: <ShieldIcon className="h-5 w-5" />,
  },
  {
    title: "Proceso claro",
    text: "Información ordenada antes de avanzar con una importación.",
    icon: <DocumentIcon className="h-5 w-5" />,
  },
  {
    title: "Entrega final",
    text: "Seguimiento durante la gestión hasta recibir el vehículo.",
    icon: <TruckIcon className="h-5 w-5" />,
  },
  {
    title: "Contacto directo",
    text: "Atención por WhatsApp para resolver dudas del cliente.",
    icon: <UserCheckIcon className="h-5 w-5" />,
  },
];

export default function ImportadoraTrustSection() {
  return (
    <section className="importadora-fade-up importadora-delay-2 mt-5">
      {/* /cars principal/ Animación de confianza móvil */}


      {/* /cars principal/ Título de confianza */}
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#f59e0b]">
            Respaldo antes de avanzar
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white">
            Confianza en cada etapa
          </h3>
        </div>
      </div>

      {/* /cars principal/ Slider móvil */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_60px_rgba(0,0,0,0.35)] md:hidden">
        <div className="relative h-[150px]">
          {TRUST_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="trust-slide absolute inset-0"
              style={{ animationDelay: `${index * 3}s` }}
            >
              <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-[#070d15]/80 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_28px_rgba(245,158,11,0.14)]">
                    {item.icon}
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-white/55">
                      {item.text}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {TRUST_ITEMS.map((dot, dotIndex) => (
                    <span
                      key={dot.title}
                      className="trust-dot h-1.5 w-6 rounded-full bg-[#f59e0b]"
                      style={{ animationDelay: `${dotIndex * 3}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* /cars principal/ Grid desktop */}
      <div className="hidden grid-cols-4 gap-3 md:grid">
        {TRUST_ITEMS.map((item) => (
          <TrustMiniItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </section>
  );
}

function TrustMiniItem({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_40px_rgba(0,0,0,0.24)]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
        {icon}
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-5 text-white/45">{text}</p>
    </div>
  );
}
