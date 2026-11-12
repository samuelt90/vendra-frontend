
"use client";

import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full min-w-0">
      {/* ETIQUETA SUPERIOR */}

      <motion.p
        className="
          commerce-label
          text-[var(--commerce-ink-soft)]
        "
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 12 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
      >
        Tecnología y accesorios
      </motion.p>

      {/* TITULAR */}

      <motion.h1
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 30 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.08,
          ease: EASE,
        }}
        className="
          commerce-display
          mt-4
          max-w-[10ch]
          text-[clamp(3.2rem,13.5vw,5.6rem)]
          leading-[0.88]
          tracking-[-0.067em]
          text-[var(--commerce-ink)]
          md:max-w-[11ch]
          md:text-[clamp(4.4rem,6.4vw,7.6rem)]
        "
      >
        Tecnología para ti.
        <span
          className="
            mt-1 block
            text-[var(--commerce-ink-soft)]
          "
        >
          Y para tu negocio.
        </span>
      </motion.h1>

      {/* DESCRIPCIÓN */}

      <motion.p
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 18 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.18,
          ease: EASE,
        }}
        className="
          commerce-sans
          mt-5 max-w-[410px]
          text-[13px]
          leading-[1.65]
          tracking-[-0.015em]
          text-[var(--commerce-ink-soft)]
          sm:text-[15px]
          md:mt-7
          md:text-[16px]
        "
      >
        Productos y accesorios para tu día a día,
        ampliar tu catálogo y llevar nuevas opciones
        a tus clientes.
      </motion.p>

      {/* ACCIONES COMERCIALES */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.28,
          ease: EASE,
        }}
        className="
          mt-7
          flex flex-wrap
          items-center
          gap-x-5 gap-y-4
          md:mt-10
          md:gap-x-7
        "
      >
        {/* BOTÓN PRINCIPAL */}

        <Link
          href="/comercio/tienda"
          className="
            commerce-sans
            group relative
            inline-flex
            min-h-[48px]
            items-center justify-between
            gap-5
            rounded-full
            bg-[var(--commerce-ink)]
            py-[5px]
            pl-5 pr-[5px]
            text-[12px] font-bold
            tracking-[-0.025em]
            text-[var(--commerce-paper)]
            shadow-[0_8px_20px_rgba(23,22,18,0.13)]
            transition-[transform,box-shadow]
            duration-300
            hover:-translate-y-0.5
            active:scale-[0.98]
            md:min-h-[58px]
            md:gap-8
            md:py-2
            md:pl-7 md:pr-2
            md:text-[14px]
          "
        >
          <span>Explorar productos</span>

          <span
            aria-hidden="true"
            className="
              flex h-9 w-9
              shrink-0
              items-center justify-center
              rounded-full
              bg-[var(--commerce-accent)]
              text-white
              md:h-11 md:w-11
            "
          >
            <ArrowRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </span>
        </Link>

        {/* BOTÓN MAYOREO */}

        <Link
          href="/comercio/mayoristas"
          className="
            commerce-sans
            group inline-flex
            min-h-11 items-center
            gap-2.5
            border-b
            border-[var(--commerce-line-strong)]
            text-[12px] font-bold
            tracking-[-0.025em]
            text-[var(--commerce-ink)]
            transition-colors
            hover:text-[var(--commerce-ink-soft)]
            md:text-[14px]
          "
        >
          Comprar por mayor

          <ArrowUpRight
            size={18}
            className="
              transition-transform duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </Link>
      </motion.div>
    </div>
  );
}
