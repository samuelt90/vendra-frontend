"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
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

const PRODUCT_IMAGE =
  "/comercio/assets/products/audifonos.png";

const EASE = [0.22, 1, 0.36, 1] as const;

function WholesaleVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const visible = useInView(visualRef, {
    once: true,
    amount: 0.35,
  });

  const active = visible || Boolean(reduceMotion);

  const units = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  return (
    <div
      ref={visualRef}
      aria-label="Representación de un producto organizado en varias unidades para distribución"
      role="img"
      className="
        relative isolate mx-auto
        h-[300px] w-full
        max-w-[440px]
        overflow-hidden
        sm:h-[350px]
        md:h-[430px]
        md:max-w-[520px]
      "
    >
      {/* FONDO AMBIENTAL */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-[12%]
          rounded-full
          bg-[radial-gradient(circle,rgba(148,169,145,0.17),transparent_70%)]
          blur-[28px]
        "
      />

      {/* GUÍAS */}

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
        className="
          pointer-events-none
          absolute inset-[9%]
          rounded-full
          border border-white/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-[9%]
          top-1/2 h-px
          bg-white/[0.07]
        "
      />

      {/* PRODUCTO INICIAL */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-[46%]
          z-20
          h-[62%] w-[74%]
          -translate-x-1/2
          -translate-y-1/2
        "
        initial={false}
        animate={{
          opacity: active ? 0 : 1,
          scale: active ? 0.46 : 1,
          y: active ? -12 : 0,
          rotate: active ? -7 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: reduceMotion ? 0 : 0.45,
          ease: EASE,
        }}
      >
        <Image
          src={PRODUCT_IMAGE}
          alt=""
          fill
          sizes="(max-width: 767px) 250px, 380px"
          className="
            object-contain
            drop-shadow-[0_25px_25px_rgba(0,0,0,0.3)]
          "
        />
      </motion.div>

      {/* UNIDADES ORGANIZADAS */}

      <div
        className="
          absolute inset-x-[10%]
          top-[12%] bottom-[18%]
          grid grid-cols-3
          grid-rows-2
          gap-x-2 gap-y-3
          sm:gap-x-3 sm:gap-y-4
        "
      >
        {units.map((unit, index) => (
          <motion.div
            key={index}
            aria-hidden="true"
            className={`
              relative min-h-0 min-w-0
              overflow-hidden border
              ${
                index === 5
                  ? "border-[var(--commerce-accent)] bg-[color-mix(in_srgb,var(--commerce-accent)_10%,transparent)]"
                  : "border-white/[0.13] bg-white/[0.045]"
              }
            `}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.35,
              x: active ? 0 : unit.x * -65,
              y: active ? 0 : unit.y * -60,
              rotate:
                active ? 0 : index % 2 ? 7 : -7,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              delay: reduceMotion
                ? 0
                : 0.65 + index * 0.065,
              ease: EASE,
            }}
          >
            <div
              className="
                absolute inset-0
                bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.09),transparent_75%)]
              "
            />

            <div className="absolute inset-[9%]">
              <Image
                src={PRODUCT_IMAGE}
                alt=""
                fill
                sizes="(max-width: 767px) 90px, 135px"
                className="
                  object-contain
                  drop-shadow-[0_10px_12px_rgba(0,0,0,0.25)]
                "
              />
            </div>

            <span
              className={`
                commerce-sans
                absolute bottom-2 right-2
                text-[9px] font-semibold
                tabular-nums
                ${
                  index === 5
                    ? "text-[var(--commerce-accent)]"
                    : "text-white/35"
                }
              `}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
        ))}
      </div>

      {/* LÍNEA NARANJA DE AGRUPACIÓN */}

      <motion.div
        aria-hidden="true"
        className="
          absolute bottom-[12%] left-[10%]
          h-px w-[80%]
          origin-left
          bg-[var(--commerce-accent)]
        "
        initial={false}
        animate={{
          scaleX: active ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: reduceMotion ? 0 : 1.25,
          ease: EASE,
        }}
      />

      {/* TEXTO FINAL */}

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : 8,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.5,
          delay: reduceMotion ? 0 : 1.35,
          ease: EASE,
        }}
        className="
          commerce-sans
          absolute bottom-[5%]
          left-[10%] right-[10%]
          flex items-center
          justify-between gap-2
          text-[9px] font-semibold
          uppercase tracking-[0.13em]
          text-white/50
        "
      >
        <span>Un producto</span>

        <span className="inline-flex items-center gap-2">
          <span
            className="
              h-1.5 w-1.5
              rounded-full
              bg-[var(--commerce-accent)]
            "
          />
          Varias unidades
        </span>
      </motion.div>
    </div>
  );
}

export default function WholesaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: false,
    margin: "-15% 0px -15% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative overflow-hidden
        bg-[var(--commerce-ink)]
        text-[var(--commerce-paper)]
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
          py-16 md:py-24 lg:py-28
        "
      >
        {/* LÍNEA SUPERIOR */}

        <motion.div
          aria-hidden="true"
          className="
            h-px w-full
            origin-left bg-white/14
          "
          initial={false}
          animate={{
            scaleX: inView ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            ease: commerceEase.spatial,
          }}
        />

        <div
          className="
            grid min-w-0
            gap-10 pt-8
            md:grid-cols-12
            md:items-center
            md:gap-10 md:pt-12
          "
        >
          {/* TEXTO */}

          <div className="min-w-0 md:col-span-7">
            <motion.p
              className="
                commerce-sans
                text-[0.67rem] font-bold
                uppercase tracking-[0.14em]
                text-white/50
              "
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 6,
              }}
              transition={{
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              Distribución mayorista
            </motion.p>

            <div className="mt-5 overflow-hidden">
              <motion.h2
                className="
                  commerce-display
                  max-w-[9ch]
                  text-[clamp(3.8rem,15vw,6.4rem)]
                  leading-[0.84]
                  tracking-[-0.07em]
                  md:max-w-[10ch]
                  md:text-[clamp(5rem,7vw,8rem)]
                "
                initial={false}
                animate={{
                  y: inView ? "0%" : "108%",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  ease: commerceEase.spatial,
                }}
              >
                Abastece tu negocio.
              </motion.h2>
            </div>

            {/* ESCENA MÓVIL */}

            <div className="mt-6 md:hidden">
              <WholesaleVisual />
            </div>

            {/* DESCRIPCIÓN */}

            <motion.p
              className="
                commerce-sans
                mt-6 max-w-[31rem]
                text-[0.94rem]
                leading-[1.65]
                tracking-[-0.025em]
                text-white/65
                md:mt-7 md:text-[1rem]
              "
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 10,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.17,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              Amplía tu catálogo con productos de
              tecnología y accesorios. Consulta
              disponibilidad y condiciones comerciales
              para compras por volumen.
            </motion.p>

            {/* CTA */}

            <motion.div
              className="mt-8"
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 8,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.27,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              <Link
                href="/comercio/mayoristas"
                className="
                  commerce-sans group
                  inline-flex min-h-11
                  items-center gap-3
                  border-b border-white/30
                  pb-1 text-[0.9rem]
                  font-semibold
                  tracking-[-0.025em]
                  transition-colors
                  hover:text-white/75
                "
              >
                Consultar condiciones

                <ArrowRight
                  size={19}
                  weight="regular"
                  className="
                    transition-transform duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </motion.div>
          </div>

          {/* ESCENA DESKTOP */}

          <div
            className="
              hidden min-w-0
              md:col-span-5
              md:block
            "
          >
            <WholesaleVisual />
          </div>
        </div>

        {/* LÍNEA FINAL */}

        <motion.div
          aria-hidden="true"
          className="
            mt-14 h-px w-full
            origin-right bg-white/10
            md:mt-20
          "
          initial={false}
          animate={{
            scaleX: inView ? 1 : 0,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.14,
            duration: reduceMotion ? 0 : 0.9,
            ease: commerceEase.spatial,
          }}
        />
      </div>
    </section>
  );
}

