import Image from "next/image";
import Link from "next/link";
import {
  ArrowIcon,
  ShieldIcon,
  TruckIcon,
  UserCheckIcon,
  WhatsappIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraHomeHeroProps = {
  slug: string;
  name: string;
  logoUrl: string | null;
  shortDescription?: string | null;
  coverImageUrl?: string | null;
  whatsappUrl: string | null;
};

const DEFAULT_HERO_IMAGE = "/importadoras/default/hero-importadora.jpg";

export default function ImportadoraHomeHero({
  slug,
  name,
  coverImageUrl,
  whatsappUrl,
}: ImportadoraHomeHeroProps) {
  const heroImage = coverImageUrl || DEFAULT_HERO_IMAGE;
  return (
    <section className="relative -mx-4 overflow-hidden border-b border-white/10 md:-mx-8 lg:-mx-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,158,11,0.16),transparent_34%),linear-gradient(90deg,#03070d_0%,#06111d_45%,#03070d_100%)]" />

      <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-10 lg:py-16">
        {/* Texto principal */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f59e0b]">
            Importadora de vehículos en Guatemala
          </p>

          <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-7xl">
            Importamos vehículos desde{" "}
            <span className="text-[#f59e0b]">Estados Unidos</span> a Guatemala
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/62 md:text-lg">
            Te acompañamos en todo el proceso: búsqueda, cotización, compra,
            importación y entrega en Guatemala.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/importadoras/${slug}/cotizador`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-6 py-4 text-sm font-black text-black shadow-[0_18px_42px_rgba(245,158,11,0.28)] transition hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Cotizar vehículo
              <ArrowIcon className="h-4 w-4" />
            </Link>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/18 bg-white/[0.045] px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
              >
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp directo
              </a>
            ) : null}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <HeroBenefit
              icon={<ShieldIcon className="h-5 w-5" />}
              title="Asesoría"
              text="personalizada"
            />

            <HeroBenefit
              icon={<UserCheckIcon className="h-5 w-5" />}
              title="Seguimiento"
              text="en cada etapa"
            />

            <HeroBenefit
              icon={<TruckIcon className="h-5 w-5" />}
              title="Entrega segura"
              text="en Guatemala"
            />
          </div>
        </div>

        {/* Imagen principal */}
        <div className="relative z-0 min-h-[360px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_28px_80px_rgba(0,0,0,0.42)] lg:min-h-[520px] lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
          <Image
            src={heroImage}
            alt={`Portada de ${name}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#03070d]/80 lg:via-transparent lg:to-transparent" />

          <div className="absolute bottom-5 left-5 rounded-2xl border border-white/12 bg-black/45 px-4 py-3 backdrop-blur-md lg:hidden">
            <p className="text-sm font-bold text-white">{name}</p>
            <p className="mt-1 text-xs text-white/50">
              Importadora en Guatemala
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBenefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-xs text-white/50">{text}</p>
      </div>
    </div>
  );
}
