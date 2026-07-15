import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "./icons/ImportadoraIcons";

type ActivePage = "inicio" | "cotizador" | "inventario" | "proceso";

type ImportadoraHeaderProps = {
  name: string;
  slug: string;
  logoUrl: string | null;
  activePage: ActivePage;
  label?: string;
  whatsappNumber?: string | null;
};

const NAV_ITEMS: {
  label: string;
  page: ActivePage;
  href: (slug: string) => string;
}[] = [
  {
    label: "Inicio",
    page: "inicio",
    href: (slug) => `/importadoras/${slug}/inicio`,
  },
  {
    label: "Cotizador",
    page: "cotizador",
    href: (slug) => `/importadoras/${slug}/cotizador`,
  },
  {
    label: "Inventario",
    page: "inventario",
    href: (slug) => `/importadoras/${slug}/inventario`,
  },
  {
    label: "Proceso",
    page: "proceso",
    href: (slug) => `/importadoras/${slug}/proceso`,
  },
];

function cleanWhatsappNumber(phone?: string | null) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

function buildWhatsappUrl(phone?: string | null, importadoraName?: string) {
  const cleanPhone = cleanWhatsappNumber(phone);

  if (!cleanPhone) return null;

  const message = `Hola, vengo de la página de ${importadoraName}. Quiero más información.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export default function ImportadoraHeader({
  name,
  slug,
  logoUrl,
  activePage,
  label = "Importadora",
  whatsappNumber,
}: ImportadoraHeaderProps) {
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, name);

  return (
    <header className="sticky top-0 z-50 -mx-4 border-b border-white/10 bg-[#03070d]/82 px-4 py-3 backdrop-blur-2xl md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <Link
          href={`/importadoras/${slug}/inicio`}
          className="group flex min-w-0 items-center gap-3"
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 shadow-[0_0_34px_rgba(245,158,11,0.14)]">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <span className="text-lg font-black text-[#f59e0b]">
                {name.slice(0, 1)}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black uppercase tracking-[-0.03em] text-white transition group-hover:text-[#f59e0b] md:text-lg">
              {name}
            </p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#f59e0b]">
              {label}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 rounded-full border border-white/10 bg-white/[0.035] px-7 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.page;

            return (
              <Link
                key={item.page}
                href={item.href(slug)}
                className={[
                  "relative text-sm font-semibold transition",
                  isActive ? "text-[#f59e0b]" : "text-white/72 hover:text-white",
                ].join(" ")}
              >
                {item.label}

                {isActive ? (
                  <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-[#f59e0b] shadow-[0_0_18px_rgba(245,158,11,0.75)]" />
                ) : null}
              </Link>
            );
          })}

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-white/72 transition hover:text-white"
            >
              Contacto
            </a>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.055] px-5 py-3 text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
            >
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          ) : null}
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition active:scale-[0.97] [&::-webkit-details-marker]:hidden">
            <span className="sr-only">Abrir menú</span>
            <span className="relative h-4 w-5">
              <span className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition group-open:top-2 group-open:rotate-45" />
              <span className="absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition group-open:opacity-0" />
              <span className="absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition group-open:top-2 group-open:-rotate-45" />
            </span>
          </summary>

          <div className="absolute right-0 top-14 w-[280px] overflow-hidden rounded-[1.6rem] border border-white/12 bg-[#07111d]/96 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.page;

                return (
                  <Link
                    key={item.page}
                    href={item.href(slug)}
                    className={[
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-[#f59e0b]/12 text-[#f59e0b]"
                        : "text-white/72 hover:bg-white/[0.06] hover:text-white",
                    ].join(" ")}
                  >
                    {item.label}
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[#f59e0b] px-4 py-3 text-sm font-black text-black shadow-[0_16px_34px_rgba(245,158,11,0.22)]"
              >
                <WhatsappIcon className="h-4 w-4" />
                WhatsApp
              </a>
            ) : null}
          </div>
        </details>
      </div>
    </header>
  );
}
