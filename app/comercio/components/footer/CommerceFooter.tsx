"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock,
  InstagramLogo,
  MapPin,
  TiktokLogo,
} from "@phosphor-icons/react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

const navigation = [
  {
    number: "01",
    label: "Quiénes somos",
    href: "/comercio/nosotros",
  },
  {
    number: "02",
    label: "Cómo comprar",
    href: "/comercio/como-comprar",
  },
  {
    number: "03",
    label: "Preguntas frecuentes",
    href: "/comercio/preguntas-frecuentes",
  },
  {
    number: "04",
    label: "Términos y condiciones",
    href: "/comercio/terminos",
  },
];

export default function CommerceFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(footerRef, {
    once: true,
    margin: "-8% 0px -6% 0px",
  });

  return (
    <footer
      ref={footerRef}
      id="commerce-footer"
      className="
        relative
        overflow-hidden
        bg-[var(--commerce-paper)]
        text-[var(--commerce-ink)]
      "
    >
      {/* ================================================= */}
      {/* MOBILE                                            */}
      {/* Composición propia, no desktop comprimido.        */}
      {/* ================================================= */}

      <div
        className="
          px-[var(--commerce-page-x)]
          pb-[calc(7rem+env(safe-area-inset-bottom))]
          pt-14

          md:hidden
        "
      >
        {/* encabezado */}
        <div className="overflow-hidden">
          <motion.h2
            className="
              commerce-display
              max-w-[8.5ch]
              text-[clamp(3.2rem,13vw,5rem)]
              leading-[0.86]
              tracking-[-0.065em]
            "
            initial={false}
            animate={{
              y: inView ? "0%" : "105%",
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.68,
              ease: commerceEase.spatial,
            }}
          >
            Todo claro antes de comprar.
          </motion.h2>
        </div>

        <motion.p
          className="
            commerce-sans
            mt-5
            max-w-[28ch]
            text-[0.88rem]
            leading-[1.55]
            tracking-[-0.025em]
            text-[var(--commerce-muted)]
          "
          initial={false}
          animate={{
            opacity: inView ? 1 : 0,
            y: inView ? 0 : 8,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.12,
            duration: commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          Información sobre tu compra, el negocio y las condiciones de servicio.
        </motion.p>

        {/* índice móvil */}
        <nav
          aria-label="Información del comercio"
          className="
            mt-12
            border-t
            border-[var(--commerce-line)]
          "
        >
          {navigation.map((item, index) => (
            <motion.div
              key={item.href}
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 8,
              }}
              transition={{
                delay:
                  reduceMotion
                    ? 0
                    : 0.15 + index * 0.045,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              <Link
                href={item.href}
                className="
                  group
                  grid
                  min-h-[78px]
                  grid-cols-[38px_1fr_auto]
                  items-center
                  gap-3
                  border-b
                  border-[var(--commerce-line)]
                "
              >
                <span
                  className="
                    commerce-sans
                    text-[0.6rem]
                    font-[700]
                    tracking-[0.12em]
                    text-[var(--commerce-muted)]
                  "
                >
                  {item.number}
                </span>

                <span
                  className="
                    commerce-sans
                    text-[1rem]
                    font-[620]
                    tracking-[-0.035em]
                  "
                >
                  {item.label}
                </span>

                <ArrowUpRight
                  size={18}
                  weight="regular"
                  className="
                    text-[var(--commerce-muted)]
                    transition-transform
                    duration-300

                    group-active:-translate-y-0.5
                    group-active:translate-x-0.5
                  "
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* datos operativos */}
        <div
          className="
            mt-12
            grid
            grid-cols-2
            border-y
            border-[var(--commerce-line)]
          "
        >
          <div
            className="
              min-h-[130px]
              border-r
              border-[var(--commerce-line)]
              py-5
              pr-5
            "
          >
            <MapPin
              size={20}
              weight="regular"
              className="text-[var(--commerce-muted)]"
            />

            <p
              className="
                commerce-sans
                mt-6
                text-[0.6rem]
                font-[700]
                uppercase
                tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              Ubicación
            </p>

            <p
              className="
                commerce-sans
                mt-2
                text-[0.9rem]
                font-[620]
                tracking-[-0.025em]
              "
            >
              Guatemala
            </p>
          </div>

          <div
            className="
              min-h-[130px]
              py-5
              pl-5
            "
          >
            <Clock
              size={20}
              weight="regular"
              className="text-[var(--commerce-muted)]"
            />

            <p
              className="
                commerce-sans
                mt-6
                text-[0.6rem]
                font-[700]
                uppercase
                tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              Horario
            </p>

            <p
              className="
                commerce-sans
                mt-2
                text-[0.9rem]
                font-[620]
                tracking-[-0.025em]
              "
            >
              Lun — Sáb
            </p>

            <p
              className="
                commerce-sans
                mt-1
                text-[0.72rem]
                text-[var(--commerce-muted)]
              "
            >
              9:00 — 18:00
            </p>
          </div>
        </div>

        {/* contacto */}
        <Link
          href="/comercio/contacto"
          className="
            group
            mt-7
            flex
            min-h-[62px]
            items-center
            justify-between
            gap-5
            border-b
            border-[var(--commerce-line)]
          "
        >
          <div>
            <p
              className="
                commerce-sans
                text-[0.6rem]
                font-[700]
                uppercase
                tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              Contacto
            </p>

            <p
              className="
                commerce-sans
                mt-1
                text-[0.92rem]
                font-[620]
                tracking-[-0.025em]
              "
            >
              Hablar con nosotros
            </p>
          </div>

          <ArrowUpRight
            size={19}
            weight="regular"
            className="text-[var(--commerce-muted)]"
          />
        </Link>

        {/* redes */}
        <div
          className="
            mt-8
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <div className="flex items-center gap-6">
            <Link
              href="#"
              aria-label="Instagram"
              className="
                flex
                items-center
                gap-2
                text-[var(--commerce-ink-soft)]
              "
            >
              <InstagramLogo
                size={19}
                weight="regular"
              />

              <span
                className="
                  commerce-sans
                  text-[0.72rem]
                "
              >
                Instagram
              </span>
            </Link>

            <Link
              href="#"
              aria-label="TikTok"
              className="
                flex
                items-center
                gap-2
                text-[var(--commerce-ink-soft)]
              "
            >
              <TiktokLogo
                size={18}
                weight="regular"
              />

              <span
                className="
                  commerce-sans
                  text-[0.72rem]
                "
              >
                TikTok
              </span>
            </Link>
          </div>

          <span
            className="
              commerce-sans
              text-[0.62rem]
              text-[var(--commerce-muted)]
            "
          >
            © 2026
          </span>
        </div>
      </div>

      {/* ================================================= */}
      {/* DESKTOP                                           */}
      {/* Composición editorial independiente.              */}
      {/* ================================================= */}

      <div
        className="
          mx-auto
          hidden
          w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
          pb-12
          pt-20

          md:block
          lg:pt-24
        "
      >
        <div className="grid grid-cols-12 gap-8">
          {/* columna principal */}
          <div className="col-span-5">
            <div className="overflow-hidden">
              <motion.h2
                className="
                  commerce-display
                  max-w-[8ch]
                  text-[clamp(4.5rem,6.5vw,7.8rem)]
                  leading-[0.84]
                  tracking-[-0.07em]
                "
                initial={false}
                animate={{
                  y: inView ? "0%" : "105%",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.72,
                  ease: commerceEase.spatial,
                }}
              >
                Todo claro antes de comprar.
              </motion.h2>
            </div>
          </div>

          {/* navegación */}
          <nav
            aria-label="Información del comercio"
            className="
              col-span-6
              col-start-7
              border-t
              border-[var(--commerce-line)]
            "
          >
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  grid
                  min-h-[82px]
                  grid-cols-[44px_1fr_auto]
                  items-center
                  border-b
                  border-[var(--commerce-line)]
                "
              >
                <span
                  className="
                    commerce-sans
                    text-[0.62rem]
                    font-[700]
                    tracking-[0.12em]
                    text-[var(--commerce-muted)]
                  "
                >
                  {item.number}
                </span>

                <span
                  className="
                    commerce-sans
                    text-[1.05rem]
                    font-[620]
                    tracking-[-0.035em]
                  "
                >
                  {item.label}
                </span>

                <ArrowUpRight
                  size={18}
                  weight="regular"
                  className="
                    text-[var(--commerce-muted)]
                    transition-transform
                    duration-300

                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                  "
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* banda inferior */}
        <div
          className="
            mt-20
            grid
            grid-cols-12
            border-y
            border-[var(--commerce-line)]
          "
        >
          <div
            className="
              col-span-3
              min-h-[150px]
              border-r
              border-[var(--commerce-line)]
              p-6
            "
          >
            <MapPin
              size={21}
              className="text-[var(--commerce-muted)]"
            />

            <p className="commerce-label mt-7 text-[var(--commerce-muted)]">
              Ubicación
            </p>

            <p className="commerce-sans mt-2 text-[0.95rem] font-[600]">
              Guatemala
            </p>
          </div>

          <div
            className="
              col-span-3
              min-h-[150px]
              border-r
              border-[var(--commerce-line)]
              p-6
            "
          >
            <Clock
              size={21}
              className="text-[var(--commerce-muted)]"
            />

            <p className="commerce-label mt-7 text-[var(--commerce-muted)]">
              Horario
            </p>

            <p className="commerce-sans mt-2 text-[0.95rem] font-[600]">
              Lun — Sáb · 9:00 — 18:00
            </p>
          </div>

          <div
            className="
              col-span-3
              min-h-[150px]
              border-r
              border-[var(--commerce-line)]
              p-6
            "
          >
            <p className="commerce-label text-[var(--commerce-muted)]">
              Contacto
            </p>

            <Link
              href="/comercio/contacto"
              className="
                commerce-sans
                mt-8
                inline-flex
                items-center
                gap-2
                text-[0.95rem]
                font-[600]
              "
            >
              Hablar con nosotros
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div
            className="
              col-span-3
              flex
              min-h-[150px]
              flex-col
              justify-between
              p-6
            "
          >
            <div className="flex gap-5">
              <InstagramLogo size={20} />
              <TiktokLogo size={19} />
            </div>

            <p
              className="
                commerce-sans
                text-[0.65rem]
                text-[var(--commerce-muted)]
              "
            >
              © 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
