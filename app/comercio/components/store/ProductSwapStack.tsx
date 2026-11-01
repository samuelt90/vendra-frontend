"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

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
  CommerceProduct,
} from "../../data/products";

type ProductSwapStackProps = {
  products: CommerceProduct[];
  sectionId: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 500;

const SURFACES = [
  "#F1F0EC",
  "#E7E8E6",
  "#E9E6E2",
  "#E5E8E9",
];

function formatPrice(value: number) {
  return `Q${value.toLocaleString("es-GT")}`;
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

/* ======================================================
   INFORMACIÓN DEL PRODUCTO

   Móvil: aparece encima de la pila.
   Desktop: aparece a su derecha.

   Nunca se duplica la fotografía.
====================================================== */

function ProductInformation({
  product,
  reducedMotion,
  mobile = false,
}: {
  product: CommerceProduct;
  reducedMotion: boolean;
  mobile?: boolean;
}) {
  const hasDiscount =
    typeof product.previousPrice === "number" &&
    product.previousPrice > product.price;

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
    >
      <motion.div
        key={product.id}
        initial={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 14 }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={
          reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, y: -10 }
        }
        transition={{
          duration: reducedMotion ? 0.1 : 0.38,
          ease: EASE,
        }}
        className="min-w-0"
      >
        <div
          className="
            commerce-sans
            flex flex-wrap items-center gap-2
            text-[10px] font-semibold
            uppercase tracking-[0.15em]
            text-[var(--commerce-muted)]
          "
        >
          <span>{product.category}</span>

          {product.badge && (
            <>
              <span className="opacity-40">/</span>
              <span>{product.badge}</span>
            </>
          )}
        </div>

        <h4
          className={`
            commerce-display
            tracking-[-0.06em]
            leading-[0.99]
            break-words
            ${
              mobile
                ? "mt-2 text-[clamp(2rem,8vw,3rem)]"
                : "mt-4 max-w-[560px] text-[clamp(3rem,5vw,5rem)]"
            }
          `}
        >
          {product.name}
        </h4>

        <div
          className={`
            commerce-sans
            flex flex-wrap
            items-baseline gap-x-3 gap-y-1
            ${mobile ? "mt-3" : "mt-6"}
          `}
        >
          {hasDiscount && (
            <span
              className="
                text-[14px]
                line-through
                text-[var(--commerce-muted)]
              "
            >
              {formatPrice(product.previousPrice!)}
            </span>
          )}

          <strong
            className={`
              font-semibold
              tracking-[-0.04em]
              tabular-nums
              ${
                mobile
                  ? "text-[1.55rem]"
                  : "text-[2.3rem]"
              }
            `}
          >
            {formatPrice(product.price)}
          </strong>
        </div>

        {!mobile && (
          <>
            <p
              className="
                commerce-sans
                mt-4 text-[12px]
                text-[var(--commerce-ink-soft)]
              "
            >
              {product.status ??
                "Consultar disponibilidad"}
            </p>

            <Link
              href={product.href}
              className="
                commerce-sans
                mt-9 inline-flex
                min-h-12 items-center
                justify-center gap-4
                rounded-full
                bg-[var(--commerce-ink)]
                px-6 text-[13px]
                font-semibold
                text-[var(--commerce-paper)]
                transition-transform
                active:scale-[0.97]
              "
            >
              Ver producto
              <ArrowUpRight size={17} />
            </Link>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ======================================================
   ELEMENTO VISUAL DE LA PILA

   Cada tarjeta es una lámina editorial.
   Su contenedor es opaco.
====================================================== */

function ProductPlate({
  product,
  priority = false,
  muted = false,
}: {
  product: CommerceProduct;
  priority?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      {/* SUPERFICIE */}

      <div
        aria-hidden="true"
        className="
          absolute inset-0
          bg-[linear-gradient(145deg,#FAFAF8_0%,#EEEDEA_100%)]
        "
      />

      {/* LUZ SUPERIOR */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-[38%]
          bg-gradient-to-b
          from-white/60 to-transparent
        "
      />

      {/* PRODUCTO */}

      <div
        className="
          pointer-events-none
          absolute inset-[5%]
          bottom-[10%]
        "
      >
        <Image
          src={product.image}
          alt={muted ? "" : product.name}
          fill
          priority={priority}
          draggable={false}
          sizes="(max-width: 768px) 85vw, 540px"
          className={`
            select-none
            object-contain
            ${
              muted
                ? "opacity-75 saturate-[0.8]"
                : "drop-shadow-[0_16px_17px_rgba(18,20,24,0.10)]"
            }
          `}
        />
      </div>

      {/* PIEZA EDITORIAL INFERIOR */}

      <div
        className="
          pointer-events-none
          absolute inset-x-5 bottom-4
          flex items-end
          justify-between gap-4
          md:inset-x-7 md:bottom-6
        "
      >
        <span
          className="
            commerce-sans
            text-[9px] font-semibold
            uppercase tracking-[0.17em]
            text-[#73736E]
          "
        >
          {product.category}
        </span>

        <span
          aria-hidden="true"
          className="
            h-[1px] w-6
            bg-[#777770]/45
          "
        />
      </div>
    </div>
  );
}

/* ======================================================
   CARD SWAP
====================================================== */

export default function ProductSwapStack({
  products,
  sectionId,
}: ProductSwapStackProps) {
  const reducedMotion = Boolean(
    useReducedMotion()
  );

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [direction, setDirection] =
    useState(1);

  const count = products.length;

  const productIds = products
    .map((product) => product.id)
    .join("|");

  useEffect(() => {
    setActiveIndex(0);
  }, [productIds]);

  const safeIndex =
    count > 0
      ? ((activeIndex % count) + count) % count
      : 0;

  const activeProduct = products[safeIndex];

  if (!activeProduct) return null;

  function navigate(step: number) {
    if (count < 2) return;

    setDirection(step >= 0 ? 1 : -1);

    setActiveIndex(
      (current) =>
        (current + step + count) % count
    );
  }

  const backCount = Math.min(count - 1, 2);

  return (
    <div
      className="
        grid min-w-0
        grid-cols-1
        md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
        md:items-center
        md:gap-12
        xl:gap-20
      "
    >
      {/* INFORMACIÓN EN MÓVIL */}

      <div className="mb-6 md:hidden">
        <ProductInformation
          product={activeProduct}
          reducedMotion={reducedMotion}
          mobile
        />
      </div>

      {/* ESCENA DE PRODUCTO */}

      <div className="min-w-0">
        <div
          className="
            relative mx-auto w-full
            max-w-[600px]
            h-[clamp(255px,76vw,380px)]
            sm:h-[430px]
            md:h-[460px]
            xl:h-[530px]
          "
          style={{
            perspective: "1400px",
          }}
        >
          {/* SOMBRA AMBIENTAL */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute bottom-[7%] left-[18%]
              h-[28%] w-[62%]
              rounded-full
              bg-[#343028]/[0.09]
              blur-[35px]
            "
          />

          {/* TARJETAS POSTERIORES */}

          {Array.from(
            { length: backCount },
            (_, position) => {
              const depth =
                backCount - position;

              const product =
                products[
                  (safeIndex + depth) % count
                ];

              return (
                <motion.div
                  key={`${sectionId}-back-${depth}`}
                  initial={false}
                  animate={{
                    x: depth * 23,
                    y: -depth * 18,
                    rotate: depth * 6,
                    scale: 1 - depth * 0.035,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.55,
                    ease: EASE,
                  }}
                  style={{
                    zIndex: 10 - depth,
                    transformOrigin:
                      "50% 85%",
                    backgroundColor:
                      SURFACES[
                        (safeIndex + depth) %
                          SURFACES.length
                      ],
                  }}
                  className="
                    absolute
                    left-[5%] top-[14%]
                    h-[74%] w-[83%]
                    overflow-hidden
                    rounded-[8px]
                    ring-1 ring-[#35302B]/[0.07]
                    shadow-[9px_18px_28px_-12px_rgba(24,22,20,0.19)]
                    sm:rounded-[10px]
                  "
                >
                  <ProductPlate
                    product={product}
                    muted
                  />
                </motion.div>
              );
            }
          )}

          {/* TARJETA FRONTAL */}

          <AnimatePresence
            initial={false}
            custom={direction}
            mode="popLayout"
          >
            <motion.div
              key={`${sectionId}-front-${activeProduct.id}`}
              custom={direction}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: direction * 105,
                      y: -20,
                      rotate: direction * 8,
                      scale: 0.95,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: -direction * 165,
                      y: 40,
                      rotate: -direction * 15,
                      scale: 0.86,
                    }
              }
              transition={{
                duration: reducedMotion
                  ? 0.1
                  : 0.55,
                ease: EASE,
              }}
              drag={
                count > 1 && !reducedMotion
                  ? "x"
                  : false
              }
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.22}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (
                  info.offset.x < -SWIPE_DISTANCE ||
                  info.velocity.x < -SWIPE_VELOCITY
                ) {
                  navigate(1);
                } else if (
                  info.offset.x > SWIPE_DISTANCE ||
                  info.velocity.x > SWIPE_VELOCITY
                ) {
                  navigate(-1);
                }
              }}
              style={{
                zIndex: 20,
                touchAction: "pan-y",
                backfaceVisibility: "hidden",
              }}
              className="
                absolute
                left-[5%] top-[14%]
                h-[74%] w-[83%]
                cursor-grab
                overflow-hidden
                rounded-[8px]
                bg-[#F6F5F2]
                ring-1 ring-[#35302B]/[0.06]
                shadow-[0_25px_54px_-20px_rgba(26,25,24,0.30),0_5px_17px_-8px_rgba(26,25,24,0.12)]
                select-none
                active:cursor-grabbing
                sm:rounded-[10px]
              "
            >
              <ProductPlate
                product={activeProduct}
              />

              {/* IDENTIFICADOR SUPERIOR */}

              <div
                className="
                  pointer-events-none
                  absolute inset-x-5 top-4
                  flex items-center justify-between
                  md:inset-x-7 md:top-6
                "
              >
                <span
                  className="
                    commerce-sans
                    text-[9px] font-bold
                    uppercase tracking-[0.18em]
                    text-[#696963]
                  "
                >
                  VENDRA / PRODUCTO
                </span>

                <span
                  className="
                    commerce-sans
                    text-[10px] font-medium
                    tabular-nums
                    text-[#696963]
                  "
                >
                  {formatNumber(safeIndex + 1)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CONTROLES */}

        <div
          className="
            mx-auto flex w-full
            max-w-[600px]
            items-center justify-between
            gap-4 px-[5%]
          "
        >
          <div className="flex items-center gap-3">
            <span
              className="
                commerce-sans
                text-[12px] font-semibold
                tabular-nums
              "
            >
              {formatNumber(safeIndex + 1)}
              <span className="mx-1 opacity-40">
                /
              </span>
              {formatNumber(count)}
            </span>

            {/* PROGRESO */}

            <div
              className="
                hidden h-px w-12
                bg-black/10
                sm:block
              "
            >
              <motion.div
                initial={false}
                animate={{
                  width: `${
                    ((safeIndex + 1) / count) *
                    100
                  }%`,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="
                  h-px bg-[var(--commerce-ink)]
                "
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              disabled={count < 2}
              onClick={() => navigate(-1)}
              aria-label="Producto anterior"
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.92 }
              }
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full
                border border-[var(--commerce-line)]
                disabled:opacity-30
              "
            >
              <ArrowLeft size={18} />
            </motion.button>

            <motion.button
              type="button"
              disabled={count < 2}
              onClick={() => navigate(1)}
              aria-label="Siguiente producto"
              whileTap={
                reducedMotion
                  ? undefined
                  : { scale: 0.92 }
              }
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-full
                bg-[var(--commerce-ink)]
                text-[var(--commerce-paper)]
                disabled:opacity-30
              "
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* PIE MÓVIL */}

        <div
          className="
            mt-5 flex items-center
            justify-between gap-3
            px-[5%]
            md:hidden
          "
        >
          <span
            className="
              commerce-sans
              text-[11px]
              text-[var(--commerce-muted)]
            "
          >
            {activeProduct.status ??
              "Consultar disponibilidad"}
          </span>

          <Link
            href={activeProduct.href}
            className="
              commerce-sans
              inline-flex min-h-11
              items-center gap-2
              rounded-full
              bg-[var(--commerce-ink)]
              px-5 text-[12px]
              font-semibold
              text-[var(--commerce-paper)]
              transition-transform
              active:scale-[0.97]
            "
          >
            Ver producto
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* INFORMACIÓN DESKTOP */}

      <div className="hidden min-w-0 md:block">
        <ProductInformation
          product={activeProduct}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}

