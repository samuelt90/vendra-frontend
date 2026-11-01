"use client";

import { useState } from "react";
import Image from "next/image";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";

import type {
  StoreCategory,
} from "../../data/store-categories";

type Props = {
  categories: StoreCategory[];
  onExplore: (categoryId: StoreCategory["id"]) => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StoreProductStage({
  categories,
  onExplore,
}: Props) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const total = categories.length;

  const safeActive =
    total > 0 ? active % total : 0;

  const selected = categories[safeActive];

  if (!selected) return null;

  function move(step: number) {
    if (total < 2) return;

    setActive(
      (current) =>
        (current + step + total) % total
    );
  }

  function getPosition(index: number) {
    const distance =
      (index - safeActive + total) % total;

    if (distance === 0) {
      return {
        x: "0%",
        y: "0%",
        scale: 1,
        rotate: 0,
        rotateY: 0,
        zIndex: 30,
        veil: 0,
        imageScale: 1,
      };
    }

    if (distance === 1) {
      return {
        x: "53%",
        y: "6%",
        scale: 0.75,
        rotate: 9,
        rotateY: -12,
        zIndex: 15,
        veil: 0.58,
        imageScale: 0.98,
      };
    }

    if (distance === total - 1) {
      return {
        x: "-53%",
        y: "6%",
        scale: 0.75,
        rotate: -9,
        rotateY: 12,
        zIndex: 15,
        veil: 0.58,
        imageScale: 0.98,
      };
    }

    return {
      x: "0%",
      y: "15%",
      scale: 0.61,
      rotate: 0,
      rotateY: 0,
      zIndex: 5,
      veil: 0.76,
      imageScale: 0.96,
    };
  }

  return (
    <section
      aria-label="Explorar categorías"
      className="relative w-full"
    >
      {/* ENCABEZADO EDITORIAL */}

      <div
        className="
          flex items-start
          justify-between gap-5
          pb-5 md:pb-9
        "
      >
        <div>
          <p
            className="
              commerce-sans
              text-[10px] font-semibold
              uppercase tracking-[0.19em]
              text-[var(--commerce-muted)]
            "
          >
            Vendra / Colecciones
          </p>

          <h2
            className="
              commerce-display
              mt-2
              text-[clamp(2.8rem,7vw,5.3rem)]
              leading-[0.94]
              tracking-[-0.065em]
            "
          >
            La colección.
          </h2>
        </div>

        <span
          className="
            commerce-sans
            pt-1 text-[12px]
            font-semibold
            tabular-nums
            text-[var(--commerce-ink)]
          "
        >
          {String(safeActive + 1).padStart(2, "0")}
          <span className="mx-1.5 opacity-35">/</span>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ESCENA 3D */}

      <div
        className="
          relative isolate
          flex w-full
          items-center justify-center
          overflow-hidden
          h-[310px]
          sm:h-[430px]
          lg:h-[570px]
        "
        style={{
          perspective: "1300px",
        }}
      >
        {/* LUZ AMBIENTAL DETRÁS DE LAS CARDS */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-[16%]
            bottom-[12%] h-[34%]
            rounded-[100%]
            bg-[#bbb0a1]/[0.10]
            blur-[45px]
          "
        />

        {categories.map((category, index) => {
          const position = getPosition(index);
          const isActive = index === safeActive;

          return (
            <motion.button
              key={category.id}
              type="button"
              aria-label={`Seleccionar categoría ${category.name}`}
              aria-pressed={isActive}
              onClick={() => setActive(index)}
              drag={
                isActive && total > 1 && !reduceMotion
                  ? "x"
                  : false
              }
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.12}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (
                  info.offset.x < -65 ||
                  info.velocity.x < -550
                ) {
                  move(1);
                } else if (
                  info.offset.x > 65 ||
                  info.velocity.x > 550
                ) {
                  move(-1);
                }
              }}
              initial={false}
              animate={{
                x: position.x,
                y: position.y,
                scale: position.scale,
                rotate: position.rotate,
                rotateY: position.rotateY,
                opacity: 1,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.7,
                      ease: EASE,
                    }
              }
              style={{
                zIndex: position.zIndex,
                touchAction: "pan-y",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className={`
                group absolute
                aspect-[3/2]
                w-[78%] max-w-[820px]
                cursor-pointer
                overflow-hidden
                rounded-[15px]
                bg-[#f5f2ec]
                select-none
                active:cursor-grabbing
                md:w-[65%]
                md:rounded-[20px]

                ${
                  isActive
                    ? "shadow-[0_27px_65px_-25px_rgba(39,32,26,0.28),0_7px_20px_-12px_rgba(39,32,26,0.12)]"
                    : "shadow-[0_20px_45px_-24px_rgba(39,32,26,0.19)]"
                }
              `}
            >
              {/* SUPERFICIE SÓLIDA */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-0
                  bg-[#f5f2ec]
                "
              />

              {/* DETALLE SUPERIOR */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0 z-10
                  h-px bg-black/[0.06]
                "
              />

              {/* COMPOSICIÓN DE LA CATEGORÍA */}

              <motion.div
                animate={{
                  scale: position.imageScale,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: EASE,
                }}
                className="
                  pointer-events-none
                  absolute inset-x-[2%]
                  top-[2%] bottom-[5%]
                "
              >
                <Image
                  src={category.image}
                  alt={`Productos de la categoría ${category.name}`}
                  fill
                  priority={index === 0}
                  draggable={false}
                  sizes="(max-width: 768px) 78vw, 65vw"
                  className="
                    object-contain
                    select-none
                  "
                />
              </motion.div>

              {/* VELO OPACO PARA CATEGORÍAS SECUNDARIAS */}

              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{
                  opacity: position.veil,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease: EASE,
                }}
                className="
                  pointer-events-none
                  absolute inset-0 z-20
                  bg-[#f5f2ec]
                "
              />

              {/* IDENTIDAD EDITORIAL DE LA CARD */}

              <div
                className="
                  pointer-events-none
                  absolute inset-x-4 bottom-3
                  z-30
                  flex items-end
                  justify-between
                  gap-3
                  md:inset-x-7 md:bottom-5
                "
              >
                <div className="min-w-0 text-left">
                  <span
                    className="
                      commerce-sans
                      block text-[8px]
                      font-semibold
                      uppercase tracking-[0.18em]
                      text-[#837e76]
                      md:text-[10px]
                    "
                  >
                    Colección
                  </span>

                  <span
                    className="
                      commerce-sans
                      mt-1 block
                      text-[11px] font-semibold
                      tracking-[-0.025em]
                      text-[#302d29]
                      md:text-[15px]
                    "
                  >
                    {category.name}
                  </span>
                </div>

                <span
                  className="
                    commerce-sans
                    text-[10px] font-semibold
                    tabular-nums
                    text-[#827b72]
                    md:text-[12px]
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* INFORMACIÓN DE CATEGORÍA */}

      <div
        className="
          relative z-40
          mt-1 border-t
          border-[var(--commerce-line)]
          pt-5 md:pt-7
        "
      >
        <div
          className="
            flex items-end
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                commerce-sans
                mb-2 text-[10px]
                font-semibold
                uppercase tracking-[0.15em]
                text-[var(--commerce-muted)]
              "
            >
              Explora la categoría
            </p>

            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={selected.id}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 13 }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -8 }
                }
                transition={{
                  duration: reduceMotion ? 0.1 : 0.33,
                  ease: EASE,
                }}
              >
                <h3
                  className="
                    commerce-display
                    text-[clamp(2.7rem,9vw,5.2rem)]
                    leading-[0.96]
                    tracking-[-0.065em]
                  "
                >
                  {selected.name}
                </h3>

                <p
                  className="
                    commerce-sans
                    mt-2
                    max-w-[350px]
                    text-[11px]
                    leading-[1.6]
                    text-[var(--commerce-muted)]
                    md:text-[13px]
                  "
                >
                  {selected.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={() => onExplore(selected.id)}
            className="
              commerce-sans
              flex min-h-11
              shrink-0 items-center
              justify-center gap-2
              rounded-full
              bg-[var(--commerce-ink)]
              px-4
              text-[12px] font-semibold
              text-[var(--commerce-paper)]
              transition-transform
              active:scale-[0.97]
              md:px-6
            "
          >
            Ver productos
            <ArrowUpRight size={17} />
          </button>
        </div>

        {/* NAVEGACIÓN */}

        <div
          className="
            mt-6 flex
            items-center justify-between
            gap-4
          "
        >
          <span
            className="
              commerce-sans
              text-[10px]
              text-[var(--commerce-muted)]
            "
          >
            Selecciona una colección
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={total < 2}
              aria-label="Categoría anterior"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full border
                border-[var(--commerce-line)]
                transition-transform
                active:scale-95
                disabled:opacity-35
              "
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() => move(1)}
              disabled={total < 2}
              aria-label="Siguiente categoría"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-[var(--commerce-ink)]
                text-[var(--commerce-paper)]
                transition-transform
                active:scale-95
                disabled:opacity-35
              "
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

