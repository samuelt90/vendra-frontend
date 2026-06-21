import Image from "next/image";
import type { PredioCatalog } from "@/lib/predios/types";
import PredioSocialLinks from "./PredioSocialLinks";

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
  localWhatsapp.length === 8
    ? `502${localWhatsapp}`
    : localWhatsapp;

const whatsappMessage =
  `Hola, vi el catálogo de ${displayName} y quisiera información.`;

const waLink = internationalWhatsapp
  ? `https://wa.me/${internationalWhatsapp}?text=${encodeURIComponent(
      whatsappMessage
    )}`
  : "";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="relative h-36 w-full overflow-hidden bg-slate-950 sm:h-52">
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
          <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-800 to-blue-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/25 to-transparent" />
      </div>

      <div className="relative px-5 pb-6 sm:px-6 sm:pb-7">
        <div className="-mt-11 flex flex-col items-start gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl sm:h-24 sm:w-24">
              {predio.logo?.cardUrl ? (
                <Image
                  src={predio.logo.cardUrl}
                  alt={predio.logo.alt || predio.nombre}
                  width={180}
                  height={180}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-black text-slate-400">
                  {predio.nombre.slice(0, 1).toUpperCase()}
                </span>
              )}
            </div>

            <div className="pb-1">
              <div className="mb-2 inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-blue-700">
                Catálogo de vehículos
              </div>

              <h1 className="translate-y-1 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                {displayName}
              </h1>
            </div>
          </div>

         
        </div>

        <div className="mt-6 grid gap-5 border-t border-slate-200 pt-5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4 text-sm">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                WhatsApp
              </div>

              <div className="mt-1 text-base font-black text-slate-950">
                {predio.whatsapp ? `${predio.whatsapp}` : "No definido"}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                Dirección
              </div>

              <div className="mt-1 text-base font-black text-slate-950">
                {predio.direccion || "No definida"}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
              Descripción
            </div>

            <div className="mt-2 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
              {predio.descripcion || "Este predio aún no tiene descripción."}
              <PredioSocialLinks
              instagram={predio.instagram}
              facebook={predio.facebook}
              tiktok={predio.tiktok}
              whatsapp={waLink}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
