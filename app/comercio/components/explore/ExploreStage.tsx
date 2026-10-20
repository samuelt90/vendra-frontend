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
};

function ProductAsset({
  src,
  alt,
  className,
  direction = "center",
  delay = 0,
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
    <motion.div
      className={className}
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
          className="
            h-auto
            w-full
            object-contain
            drop-shadow-[0_32px_38px_rgba(0,0,0,0.16)]
          "
        />
      </motion.div>
    </motion.div>
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
        h-[52svh]
        min-h-[430px]
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
      {/* Palabra editorial de fondo */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`word-${category.id}`}
          aria-hidden="true"
          className="
            commerce-display
            pointer-events-none
            absolute
            left-1/2
            top-[47%]
            z-0
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            text-[clamp(5.4rem,26vw,10rem)]
            leading-none
            tracking-[-0.075em]
            text-[var(--commerce-ink)]
            opacity-[0.055]

            md:text-[clamp(8rem,15vw,15rem)]
          "
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scale: 0.88,
                  y: 40,
                  rotateX: 12,
                  z: -180,
                }
          }
          animate={{
            opacity: 0.055,
            scale: 1,
            y: 0,
            rotateX: 0,
            z: 0,
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
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
          {category.title}
        </motion.div>
      </AnimatePresence>

      {/* Luz ambiental */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[44%]
          z-0
          h-[65vw]
          max-h-[620px]
          w-[65vw]
          max-w-[620px]
          -translate-x-1/2
          -translate-y-1/2
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
          duration: commerceDuration.transition,
          ease: commerceEase.smooth,
        }}
      />

      {/* Escena 3D aparente */}
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
        <AnimatePresence mode="popLayout">
          <div
            key={category.id}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {category.id === "audio" && primary ? (
              <>
                <ProductAsset
                  src={primary.src}
                  alt={primary.alt}
                  direction="left"
                  className="
                    absolute
                    left-[8%]
                    top-[12%]
                    w-[68vw]
                    max-w-[360px]

                    md:left-[19%]
                    md:top-[8%]
                    md:w-[37vw]
                    md:max-w-[560px]
                  "
                />

                {secondary ? (
                  <ProductAsset
                    src={secondary.src}
                    alt={secondary.alt}
                    direction="right"
                    delay={0.06}
                    className="
                      absolute
                      -right-[12%]
                      bottom-[5%]
                      w-[56vw]
                      max-w-[300px]

                      md:right-[10%]
                      md:bottom-[8%]
                      md:w-[27vw]
                      md:max-w-[420px]
                    "
                  />
                ) : null}
              </>
            ) : null}

            {category.id === "wearables" && primary ? (
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

            {category.id === "computacion" && primary ? (
              <ProductAsset
                src={primary.src}
                alt={primary.alt}
                direction="left"
                className="
                  absolute
                  left-1/2
                  top-[24%]
                  w-[105vw]
                  max-w-[610px]
                  -translate-x-1/2

                  md:top-[18%]
                  md:w-[68vw]
                  md:max-w-[950px]
                "
              />
            ) : null}

            {category.id === "creadores" && primary ? (
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
          </div>
        </AnimatePresence>
      </div>

      {/* Piso visual muy tenue */}
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
