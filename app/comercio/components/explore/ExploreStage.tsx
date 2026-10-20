"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import type { ExploreCategory } from "../../data/explore";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type ExploreStageProps = {
  category: ExploreCategory;
};

type ProductAssetProps = {
  src: string;
  alt: string;
  className: string;
  direction?: "left" | "right" | "center";
  delay?: number;
  bounded?: boolean;
};

function ProductAsset({
  src,
  alt,
  className,
  direction = "center",
  delay = 0,
  bounded = false,
}: ProductAssetProps) {
  const reduceMotion = useReducedMotion();

  const fromX =
    direction === "left"
      ? -90
      : direction === "right"
        ? 90
        : 0;

  const fromRotate =
    direction === "left"
      ? -16
      : direction === "right"
        ? 16
        : 8;

  return (
    /*
     * El contenedor exterior controla la posición.
     * Motion anima el elemento interior.
     *
     * Esto evita conflictos entre transformaciones
     * CSS de posicionamiento y transformaciones 3D.
     */
    <div className={className}>
      <motion.div
        className={
          bounded
            ? "h-full w-full"
            : "w-full"
        }
        style={{
          transformStyle: "preserve-3d",
        }}
        initial={
          reduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                x: fromX,
                y: 24,
                scale: 0.72,
                rotateY: fromRotate,
                rotateX: 8,
                z: -220,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          z: 0,
        }}
        exit={
          reduceMotion
            ? {
                opacity: 0,
              }
            : {
                opacity: 0,
                x: -fromX * 0.65,
                y: -18,
                scale: 1.08,
                rotateY: -fromRotate * 0.7,
                rotateX: -5,
                z: 170,
              }
        }
        transition={{
          delay: reduceMotion ? 0 : delay,
          duration: reduceMotion
            ? commerceDuration.micro
            : 0.72,
          ease: commerceEase.spatial,
        }}
      >
        <motion.div
          className={
            bounded
              ? "h-full w-full"
              : "w-full"
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -6, 0],
                  rotateZ: [0, 0.7, 0],
                }
          }
          transition={{
            duration: 4.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            className={`
              w-full
              object-contain
              ${
                bounded
                  ? "h-full"
                  : "h-auto"
              }
              drop-shadow-[0_26px_32px_rgba(0,0,0,0.16)]
            `}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ExploreStage({
  category,
}: ExploreStageProps) {
  const reduceMotion = useReducedMotion();

  const primary = category.assets[0];
  const secondary = category.assets[1];

  return (
    <div
      className="
        relative
        h-[46svh]
        min-h-[350px]
        w-full
        overflow-hidden

        md:h-[68svh]
        md:min-h-[620px]
      "
      style={{
        perspective: "1400px",
        perspectiveOrigin: "50% 46%",
      }}
    >
      {/* ===================================== */}
      {/* PALABRA EDITORIAL DE FONDO             */}
      {/* ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[47%]
          z-0
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`word-${category.id}`}
            aria-hidden="true"
            className="
              commerce-display
              whitespace-nowrap
              text-[clamp(5.4rem,26vw,10rem)]
              leading-none
              tracking-[-0.075em]
              text-[var(--commerce-ink)]

              md:text-[clamp(8rem,15vw,15rem)]
            "
            initial={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    scale: 0.88,
                    y: 40,
                    rotateX: 12,
                    z: -180,
                  }
            }
            animate={{
              opacity: 0.11,
              scale: 1,
              y: 0,
              rotateX: 0,
              z: 0,
            }}
            exit={
              reduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    scale: 1.08,
                    y: -28,
                    rotateX: -8,
                    z: 120,
                  }
            }
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : 0.7,
              ease: commerceEase.spatial,
            }}
          >
            <span className="md:opacity-50">
              {category.title}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===================================== */}
      {/* ILUMINACIÓN AMBIENTAL                  */}
      {/* ===================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[44%]
          z-0
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <motion.div
          aria-hidden="true"
          className="
            h-[65vw]
            max-h-[620px]
            w-[65vw]
            max-w-[620px]
            rounded-full
            bg-[var(--commerce-accent)]
            blur-[80px]

            md:blur-[120px]
          "
          animate={{
            opacity:
              category.id === "audio"
                ? 0.09
                : category.id === "wearables"
                  ? 0.065
                  : category.id === "computacion"
                    ? 0.075
                    : 0.1,
            scale:
              category.id === "creadores"
                ? 1.08
                : 1,
          }}
          transition={{
            duration:
              commerceDuration.transition,
            ease: commerceEase.smooth,
          }}
        />
      </div>

      {/* ===================================== */}
      {/* ESCENA DE PRODUCTOS                    */}
      {/* ===================================== */}

      <div
        className="
          absolute
          inset-0
          z-10
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: commerceDuration.fast,
            }}
          >
            {/* ================================= */}
            {/* AUDIO                             */}
            {/* ================================= */}

            {category.id === "audio" && primary ? (
              <>
                {/* MÓVIL — AUDÍFONOS */}

                <ProductAsset
                  src={primary.src}
                  alt={primary.alt}
                  direction="left"
                  bounded
                  className="
                    absolute
                    left-[4%]
                    top-[7%]
                    h-[48%]
                    w-[65%]

                    md:hidden
                  "
                />

                {/* MÓVIL — BOCINA */}

                {secondary && (
                  <ProductAsset
                    src={secondary.src}
                    alt={secondary.alt}
                    direction="right"
                    delay={0.06}
                    bounded
                    className="
                      absolute
                      bottom-[6%]
                      right-[5%]
                      h-[34%]
                      w-[55%]

                      md:hidden
                    "
                  />
                )}

                {/* PC — AUDÍFONOS */}

                <ProductAsset
                  src={primary.src}
                  alt={primary.alt}
                  direction="left"
                  className="
                    absolute
                    hidden

                    md:block
                    md:left-[19%]
                    md:top-[8%]
                    md:w-[37vw]
                    md:max-w-[560px]
                  "
                />

                {/* PC — BOCINA */}

                {secondary && (
                  <ProductAsset
                    src={secondary.src}
                    alt={secondary.alt}
                    direction="right"
                    delay={0.06}
                    className="
                      absolute
                      hidden

                      md:block
                      md:right-[10%]
                      md:bottom-[8%]
                      md:w-[27vw]
                      md:max-w-[420px]
                    "
                  />
                )}
              </>
            ) : null}

            {/* ================================= */}
            {/* WEARABLES                         */}
            {/* ================================= */}

            {category.id === "wearables" &&
            primary ? (
              <ProductAsset
                src={primary.src}
                alt={primary.alt}
                direction="right"
                className="
                  absolute
                  left-1/2
                  top-[8%]
                  w-[68vw]
                  max-w-[370px]
                  -translate-x-1/2

                  md:top-[4%]
                  md:w-[36vw]
                  md:max-w-[560px]
                "
              />
            ) : null}

            {/* ================================= */}
            {/* COMPUTACIÓN                       */}
            {/* ================================= */}

            {category.id === "computacion" &&
            primary ? (
              <>
                {/* MÓVIL — TECLADO */}

                <ProductAsset
                  src={primary.src}
                  alt={primary.alt}
                  direction="left"
                  bounded
                  className="
                    absolute
                    left-[4%]
                    top-[15%]
                    h-[58%]
                    w-[92%]

                    md:hidden
                  "
                />

                {/* PC — TECLADO */}

                <ProductAsset
                  src={primary.src}
                  alt={primary.alt}
                  direction="left"
                  className="
                    absolute
                    hidden

                    md:block
                    md:left-1/2
                    md:top-[18%]
                    md:w-[68vw]
                    md:max-w-[950px]
                    md:-translate-x-1/2
                  "
                />
              </>
            ) : null}

            {/* ================================= */}
            {/* CREADORES                         */}
            {/* ================================= */}

            {category.id === "creadores" &&
            primary ? (
              <ProductAsset
                src={primary.src}
                alt={primary.alt}
                direction="center"
                className="
                  absolute
                  left-1/2
                  top-[3%]
                  w-[65vw]
                  max-w-[340px]
                  -translate-x-1/2

                  md:top-[0%]
                  md:w-[28vw]
                  md:max-w-[440px]
                "
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===================================== */}
      {/* PISO VISUAL                            */}
      {/* ===================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[8%]
          left-1/2
          z-0
          h-px
          w-[68%]
          -translate-x-1/2
          bg-[var(--commerce-line)]

          md:w-[54%]
        "
      />
    </div>
  );
}

