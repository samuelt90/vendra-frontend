import Image from "next/image";
import type { PredioCatalog } from "@/lib/predios/types";
import PredioSocialLinks from "./PredioSocialLinks";
import { MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
type Props = {
  predio: PredioCatalog;
};

export default function PredioHeader({ predio }: Props) {
  const displayName = predio.nombre
  .trim()
  .toLowerCase()
  .startsWith("predio")
  ? predio.nombre
  : `Predio ${predio.nombre}`;

const localWhatsapp = predio.whatsapp.replace(/\D/g, "");

const internationalWhatsapp =
  localWhatsapp.length === 8 ? `502${localWhatsapp}` : localWhatsapp;

const whatsappMessage = `Hola, vi el catálogo de ${displayName} y quisiera información.`;

const waLink = internationalWhatsapp
  ? `https://wa.me/${internationalWhatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`
  : "";

const mapsLink = predio.direccion
  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      predio.direccion
    )}`
  : "";

const theme = "blue-premium";

const themeClasses = {
  "blue-premium": {
    shell:
      "border-slate-800/70 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.26),rgba(15,23,42,0.95)_36%,rgba(2,6,23,1)_100%)]",
    glow:
      "before:absolute before:inset-x-6 before:top-8 before:h-48 before:rounded-full before:bg-blue-400/20 before:blur-3xl after:absolute after:inset-x-10 after:top-0 after:h-32 after:rounded-full after:bg-amber-300/10 after:blur-3xl",
    heroCard:
  "border-white/20 bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md",
    logoBorder: "border-white/20 bg-white/95",
    description: "text-slate-300",
  },
};

const activeTheme = themeClasses[theme];

return (
  <section
    className={`relative overflow-hidden rounded-[2rem] border ${activeTheme.shell} shadow-[0_24px_80px_rgba(15,23,42,0.35)] ${activeTheme.glow}`}
  >
    <div className="relative p-4 sm:p-6">
      {/* Imagen principal */}
      <div
        className={`relative overflow-hidden rounded-[1.65rem] border ${activeTheme.heroCard}`}
      >
        <div className="relative h-44 w-full overflow-hidden bg-slate-950 sm:h-64">
          {predio.cover?.detailUrl ? (
            <Image
              src={predio.cover.detailUrl}
              alt={predio.cover.alt || predio.nombre}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
        </div>
      </div>

{/* Información principal + acciones */}
<div className="mx-auto mt-9 w-full max-w-xl px-3 pb-1 text-center sm:mt-10">
  <h1 className="text-3xl font-black leading-tight tracking-tight text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)] sm:text-4xl">
    {displayName}
  </h1>

  <p className="mx-auto mt-3 max-w-xs text-sm font-semibold leading-relaxed text-slate-300 Ssm:max-w-md sm:text-base">
  Bienvenido a nuestro predio virtual
</p>

  <div className="mt-7 flex justify-center">
    <PredioSocialLinks
      instagram={predio.instagram}
      facebook={predio.facebook}
      tiktok={predio.tiktok}
    />
  </div>

  <div className="mx-auto mt-7 grid w-full max-w-md grid-cols-2 gap-3">
    {waLink ? (
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
       className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-emerald-300/35 bg-emerald-600/80 px-3 py-3 text-center text-sm font-black leading-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-emerald-200/15 backdrop-blur-md transition duration-300 active:scale-95 sm:hover:-translate-y-0.5 sm:hover:border-emerald-200/45 sm:hover:bg-emerald-500/85"
      >
        <FaWhatsapp size={19} className="shrink-0 text-emerald-50" />
        <span>WhatsApp</span>
      </a>
    ) : null}

    {mapsLink ? (
      <a
        href={mapsLink}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.075] px-3 py-3 text-center text-sm font-black leading-tight text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md transition duration-300 active:scale-95 sm:hover:-translate-y-0.5 sm:hover:border-white/30 sm:hover:bg-white/[0.1]"
      >
        <MapPin size={19} className="shrink-0 text-slate-100" />
        <span>Cómo llegar</span>
      </a>
    ) : null}
  </div>

 {predio.descripcion ? (
  <div className="mx-auto mt-9 max-w-md border-t border-white/10 pt-6">
    <div className="text-sm font-bold tracking-wide text-slate-300">
      Sobre el predio
    </div>

    <div className="mx-auto mt-3 whitespace-pre-wrap text-sm font-semibold leading-relaxed text-slate-200">
      {predio.descripcion}
    </div>
  </div>
) : null}
</div>
</div>
            </section>
          );
          }