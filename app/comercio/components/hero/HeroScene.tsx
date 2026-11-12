
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { CommerceProduct } from "../../data/products";

type HeroSceneProps = {
  products: CommerceProduct[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function formatPrice(price: number) {
  return `Q${price.toLocaleString("es-GT")}`;
}

export default function HeroScene({
  products,
  activeIndex,
  onSelect,
}: HeroSceneProps) {
  const reduceMotion = useReducedMotion();

  const active = products[activeIndex];

  if (!active) return null;

  const count = products.length;

  // El producto seleccionado siempre ocupa
  // la posición central del selector triangular.
  const positions = [-2, -1, 0, 1, 2];

  const selector = positions.map((offset, slot) => ({
    slot,
    offset,
    index: (activeIndex + offset + count) % count,
    product:
      products[(activeIndex + offset + count) % count],
  }));

  function navigate(step: number) {
    onSelect((activeIndex + step + count) % count);
  }

  return (
    <div
      className="
        relative mx-auto
        w-full min-w-0
        max-w-[700px]
      "
    >
      {/* PRODUCTO PRINCIPAL */}

      <div
        className="
          relative isolate
          h-[270px]
          w-full
          sm:h-[350px]
          md:h-[420px]
          lg:h-[490px]
        "
      >
        {/* Fondo ambiental */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-[48%]
            aspect-square
            w-[76%] max-w-[420px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[var(--commerce-line)]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-[48%]
            aspect-square
            w-[57%] max-w-[320px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--commerce-accent)]
            opacity-[0.065]
            blur-[60px]
          "
        />

        {/* Texto ambiental */}

        <span
          className="
            commerce-sans
            absolute left-0 top-4
            text-[9px] font-bold
            uppercase tracking-[0.16em]
            text-[var(--commerce-muted)]
            md:left-3 md:top-6
          "
        >
          Selección Vendra
        </span>

        <span
          className="
            commerce-sans
            absolute right-0 top-4
            text-[10px] font-semibold
            tabular-nums
            text-[var(--commerce-muted)]
            md:right-3 md:top-6
          "
        >
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {String(count).padStart(2, "0")}
        </span>

        {/* Imagen protagonista */}

        <AnimatePresence
          initial={false}
          mode="wait"
        >
          <motion.div
            key={active.id}
            className="
              absolute inset-x-[4%]
              bottom-[2%] top-[9%]
              md:inset-x-[7%]
              md:bottom-[1%]
              md:top-[6%]
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.78,
                    y: 34,
                    rotate: -7,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.84,
                    y: -26,
                    rotate: 5,
                  }
            }
            transition={{
              duration: reduceMotion ? 0.1 : 0.55,
              ease: EASE,
            }}
          >
            <motion.div
              className="
                relative h-full w-full
                will-change-transform
              "
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={active.image}
                alt={active.name}
                fill
                priority={activeIndex === 0}
                sizes="
                  (max-width: 767px) 85vw,
                  (max-width: 1199px) 48vw,
                  580px
                "
                className="
                  select-none
                  object-contain
                  drop-shadow-[0_30px_34px_rgba(23,22,18,0.17)]
                "
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SELECTOR TRIANGULAR */}

      <div
        className="
          relative mx-auto
          mt-[-7px]
          w-full
          max-w-[560px]
          md:mt-[-12px]
        "
      >
        {/* Flechas para recorrer */}

        <div
          className="
            absolute inset-x-0
            top-[30px]
            z-20
            flex items-center
            justify-between
            md:top-[43px]
          "
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Producto anterior"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-[var(--commerce-line-strong)]
              bg-[var(--commerce-paper)]
              text-[var(--commerce-ink)]
              transition-transform
              active:scale-95
              md:h-11 md:w-11
            "
          >
            <ArrowLeft size={17} />
          </button>

          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label="Producto siguiente"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-full
              border border-[var(--commerce-line-strong)]
              bg-[var(--commerce-paper)]
              text-[var(--commerce-ink)]
              transition-transform
              active:scale-95
              md:h-11 md:w-11
            "
          >
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Miniaturas en arco triangular */}

        <div
          className="
            relative mx-auto
            flex w-[calc(100%-82px)]
            max-w-[440px]
            items-start
            justify-between
            gap-1
            pb-[40px]
            md:w-[calc(100%-112px)]
            md:gap-2
            md:pb-[55px]
          "
        >
          {selector.map(
            ({ slot, offset, index, product }) => {
              const selected = offset === 0;

              // Extremos más bajos, centro más alto.
              const verticalOffset =
                Math.abs(offset) === 2
                  ? 37
                  : Math.abs(offset) === 1
                    ? 17
                    : 0;

              return (
                <motion.button
                  key={product.id}
                  type="button"
                  layout
                  onClick={() => onSelect(index)}
                  aria-label={`Seleccionar ${product.name}`}
                  aria-pressed={selected}
                  className={`
                    group relative
                    h-[58px] min-w-0
                    flex-1
                    cursor-pointer
                    touch-manipulation
                    md:h-[82px]

                    ${
                      selected
                        ? "z-20"
                        : "z-10"
                    }
                  `}
                  initial={false}
                  animate={{
                    y: verticalOffset,
                    scale: selected
                      ? 1.16
                      : Math.abs(offset) === 1
                        ? 0.94
                        : 0.84,
                    rotate:
                      offset * 3,
                    opacity: selected ? 1 : 0.78,
                  }}
                  whileTap={
                    reduceMotion
                      ? undefined
                      : { scale: 0.9 }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    ease: EASE,
                    layout: {
                      duration: 0.55,
                      ease: EASE,
                    },
                  }}
                >
                  <span
                    className={`
                      absolute inset-0
                      overflow-hidden
                      rounded-[10px]
                      border
                      transition-colors
                      duration-300
                      ${
                        selected
                          ? "border-[var(--commerce-accent)] bg-[var(--commerce-paper)]"
                          : "border-[var(--commerce-line)] bg-[#F0EFEB]"
                      }
                    `}
                  >
                    <span
                      className="
                        absolute inset-[7%]
                        block
                      "
                    >
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="
                          (max-width: 767px) 64px,
                          90px
                        "
                        className="
                          object-contain
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />
                    </span>
                  </span>

                  {selected && (
                    <motion.span
                      layoutId="hero-selected-indicator"
                      aria-hidden="true"
                      className="
                        absolute -bottom-2
                        left-1/2
                        h-1.5 w-1.5
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--commerce-accent)]
                      "
                    />
                  )}
                </motion.button>
              );
            }
          )}
        </div>
      </div>

      {/* INFORMACIÓN DEL PRODUCTO SELECCIONADO */}

      <div
        className="
          relative mx-auto
          flex min-w-0
          max-w-[560px]
          items-center
          justify-between
          gap-3
          border-t
          border-[var(--commerce-line)]
          pt-4
          md:pt-5
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            className="min-w-0"
            initial={{
              opacity: 0,
              y: 9,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -9,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
            }}
          >
            <p
              className="
                commerce-sans
                text-[9px] font-semibold
                uppercase tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              {active.category}
            </p>

            <h2
              className="
                commerce-sans
                mt-1
                text-[14px] font-bold
                leading-[1.25]
                tracking-[-0.035em]
                text-[var(--commerce-ink)]
                md:text-[18px]
              "
            >
              {active.name}
            </h2>

            <p
              className="
                commerce-sans
                mt-1
                text-[14px] font-semibold
                tabular-nums
                text-[var(--commerce-ink-soft)]
                md:text-[17px]
              "
            >
              {formatPrice(active.price)}
            </p>
          </motion.div>
        </AnimatePresence>

        <Link
          href={
            active.href ||
            `/comercio/product/${active.id}`
          }
          className="
            commerce-sans
            group inline-flex
            min-h-10 shrink-0
            items-center gap-2
            text-[11px] font-bold
            text-[var(--commerce-ink)]
            md:text-[13px]
          "
        >
          Ver producto

          <ArrowUpRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
}
