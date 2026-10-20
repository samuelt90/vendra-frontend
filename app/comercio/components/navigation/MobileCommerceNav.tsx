"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  HouseSimple,
  Sparkle,
  SquaresFour,
  List,
  X,
  ArrowRight,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

const items = [
  {
    label: "Inicio",
    href: "/comercio",
    icon: HouseSimple,
  },
  {
    label: "Asistente",
    href: "/comercio/asistente",
    icon: Sparkle,
  },
  {
    label: "Productos",
    href: "/comercio/tienda",
    icon: SquaresFour,
  },
];

const moreItems = [
  {
    label: "Comprar por mayor",
    href: "/comercio/mayoristas",
  },
  {
    label: "Quiénes somos",
    href: "/comercio/nosotros",
  },
  {
    label: "Cómo comprar",
    href: "/comercio/como-comprar",
  },
  {
    label: "Preguntas frecuentes",
    href: "/comercio/preguntas-frecuentes",
  },
  {
    label: "Términos y condiciones",
    href: "/comercio/terminos",
  },
];

export default function MobileCommerceNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [moreOpen, setMoreOpen] = useState(false);

  const hidden =
    pathname === "/comercio/completar-compra";

  const moreActive = moreItems.some(
    (item) => pathname === item.href
  );

  useEffect(() => {
    if (!moreOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [moreOpen]);

  if (hidden) {
    return null;
  }

  return (
    <>
      {/* MENÚ SECUNDARIO */}

      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar menú"
              className="
                fixed inset-0
                z-[90]
                bg-black/25
                md:hidden
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
            />

            <motion.div
              id="commerce-more-menu"
              role="region"
              aria-label="Más opciones"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }
              }
              transition={{
                duration: reduceMotion
                  ? commerceDuration.micro
                  : commerceDuration.interface,
                ease: commerceEase.spatial,
              }}
              className="
                fixed
                inset-x-3
                bottom-[calc(66px+env(safe-area-inset-bottom)+12px)]
                z-[110]
                overflow-hidden
                rounded-[22px]
                border
                border-[var(--commerce-line)]
                bg-[var(--commerce-paper)]
                p-5
                shadow-[0_22px_65px_rgba(23,22,18,0.17)]
                md:hidden
              "
            >
              <div
                className="
                  mb-4 flex
                  items-center
                  justify-between
                "
              >
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Explorar Vendra
                </p>

                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setMoreOpen(false)}
                  className="
                    flex h-9 w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--commerce-line)]
                  "
                >
                  <X size={18} />
                </button>
              </div>

              <div
                className="
                  border-t
                  border-[var(--commerce-line)]
                "
              >
                {moreItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() =>
                      setMoreOpen(false)
                    }
                    className="
                      commerce-sans
                      flex min-h-14
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-[var(--commerce-line)]
                      text-[0.87rem]
                      font-[650]
                      tracking-[-0.025em]
                      text-[var(--commerce-ink)]
                      transition-colors
                      active:text-[var(--commerce-accent)]
                    "
                  >
                    <span>{item.label}</span>

                    <ArrowRight
                      size={16}
                      weight="regular"
                      className="
                        shrink-0
                        text-[var(--commerce-muted)]
                      "
                    />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BARRA INFERIOR */}

      <nav
        aria-label="Navegación principal"
        className="
          fixed
          inset-x-0
          bottom-0
          z-[100]
          border-t
          border-[var(--commerce-line)]
          bg-[var(--commerce-paper)]
          md:hidden
        "
      >
        <div
          className="
            grid grid-cols-4
            pb-[env(safe-area-inset-bottom)]
          "
        >
          {items.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={
                  active ? "page" : undefined
                }
                onClick={() =>
                  setMoreOpen(false)
                }
                className="
                  commerce-sans
                  relative
                  flex min-h-[66px]
                  flex-col
                  items-center
                  justify-center
                  gap-1.5
                  text-[0.64rem]
                  font-[650]
                  tracking-[-0.02em]
                  text-[var(--commerce-ink)]
                  transition-opacity
                  active:opacity-60
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-[-3px]
                  focus-visible:outline-[var(--commerce-accent)]
                "
              >
                <Icon
                  size={21}
                  weight={
                    active ? "fill" : "regular"
                  }
                />

                <span>{item.label}</span>

                {active && (
                  <motion.span
                    layoutId="commerce-mobile-active"
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-1.5
                      h-[2px]
                      w-5
                      bg-[var(--commerce-ink)]
                    "
                    transition={{
                      duration:
                        commerceDuration.fast,
                      ease: commerceEase.spatial,
                    }}
                  />
                )}
              </Link>
            );
          })}

          {/* MÁS */}

          <button
            type="button"
            aria-label="Más opciones"
            aria-expanded={moreOpen}
            aria-controls="commerce-more-menu"
            onClick={() =>
              setMoreOpen((current) => !current)
            }
            className="
              commerce-sans
              relative
              flex min-h-[66px]
              flex-col
              items-center
              justify-center
              gap-1.5
              text-[0.64rem]
              font-[650]
              tracking-[-0.02em]
              text-[var(--commerce-ink)]
              active:opacity-60
              focus-visible:outline
              focus-visible:outline-2
              focus-visible:outline-offset-[-3px]
              focus-visible:outline-[var(--commerce-accent)]
            "
          >
            <List
              size={21}
              weight={
                moreOpen || moreActive
                  ? "bold"
                  : "regular"
              }
            />

            <span>Más</span>

            {(moreOpen || moreActive) && (
              <span
                aria-hidden="true"
                className="
                  absolute
                  bottom-1.5
                  h-[2px]
                  w-5
                  bg-[var(--commerce-ink)]
                "
              />
            )}
          </button>
        </div>
      </nav>
    </>
  );
}

