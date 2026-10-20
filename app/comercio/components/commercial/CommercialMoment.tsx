"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import type {
  CommercialMoment as CommercialMomentType,
  CommercialMomentId,
} from "../../data/commercial";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type CommercialMomentProps = {
  moment: CommercialMomentType;
  active: boolean;
  position: number;
  onActivate: (id: CommercialMomentId) => void;
};

function getLineMotion(
  id: CommercialMomentId,
  lineIndex: number,
  active: boolean
) {
  if (!active) {
    return {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    };
  }

  switch (id) {
    case "nuevos":
      return {
        x: lineIndex === 0 ? -10 : 14,
        y: lineIndex === 0 ? -4 : 5,
        rotateX: lineIndex === 0 ? -2 : 2,
        rotateY: 0,
        scale: lineIndex === 0 ? 1.01 : 1.035,
      };

    case "especiales":
      return {
        x: lineIndex === 0 ? -9 : 9,
        y: 0,
        rotateX: 0,
        rotateY: lineIndex === 0 ? 2 : -2,
        scale: lineIndex === 0 ? 1.01 : 1.025,
      };

    case "ultimas":
      return {
        x: 0,
        y: lineIndex === 0 ? -5 : 5,
        rotateX: lineIndex === 0 ? 3 : -3,
        rotateY: 0,
        scale: 0.985,
      };

    case "temporada":
      return {
        x: lineIndex === 0 ? 8 : -8,
        y: lineIndex === 0 ? 4 : -4,
        rotateX: 0,
        rotateY: lineIndex === 0 ? -2 : 2,
        scale: 1.015,
      };

    case "disponibles":
      return {
        x: lineIndex === 0 ? -6 : 8,
        y: lineIndex === 0 ? 5 : -5,
        rotateX: lineIndex === 0 ? -3 : 3,
        rotateY: 0,
        scale: lineIndex === 0 ? 1.015 : 1.03,
      };

    default:
      return {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      };
  }
}

export default function CommercialMoment({
  moment,
  active,
  position,
  onActivate,
}: CommercialMomentProps) {
  const reduceMotion = useReducedMotion();

  const depth = Math.abs(position);

  const scale = active
    ? 1
    : Math.max(0.72, 0.9 - depth * 0.06);

  const opacity = active
    ? 1
    : Math.max(0.055, 0.15 - depth * 0.03);

  const blur = active
    ? 0
    : Math.min(10, 4 + depth * 1.5);

  return (
    <motion.div
      className="
        absolute
        inset-x-0
        top-1/2
        flex
        -translate-y-1/2
        justify-center
        px-[var(--commerce-page-x)]
      "
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: active ? "auto" : "none",
      }}
      initial={false}
      animate={{
        y: `${position * 43}%`,
        z: active ? 80 : -170 - depth * 90,
        scale,
        opacity,
        rotateX: active
          ? 0
          : position < 0
            ? 12
            : -12,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        duration: reduceMotion
          ? commerceDuration.micro
          : 0.72,
        ease: commerceEase.spatial,
      }}
    >
      <Link
        href={moment.href}
        aria-label={moment.ariaLabel}
        onFocus={() => onActivate(moment.id)}
        onMouseEnter={() => onActivate(moment.id)}
        className="
          group
          relative
          block
          w-full
          max-w-[1500px]
          px-4
          text-center
          outline-none
          sm:px-8
          md:px-12
        "
      >
        <span className="sr-only">
          {moment.ariaLabel}
        </span>

        <span
          aria-hidden="true"
          className="
            block
            [perspective:1200px]
          "
        >
          {moment.lines.map((line, lineIndex) => {
            const lineMotion = getLineMotion(
              moment.id,
              lineIndex,
              active
            );

            return (
              <span
                key={`${moment.id}-${line}`}
                className="
                  block
                  overflow-hidden
                  pb-[0.08em]
                "
              >
                <motion.span
                  className="
                    commerce-display
                    block
                    whitespace-nowrap
                    text-[clamp(2.65rem,10.7vw,5.8rem)]
                    leading-[0.79]
                    tracking-[-0.07em]
                    text-[var(--commerce-ink)]
                    md:text-[clamp(4.2rem,8vw,8.4rem)]
                  "
                  style={{
                    transformOrigin:
                      lineIndex === 0
                        ? "50% 100%"
                        : "50% 0%",
                  }}
                  initial={false}
                  animate={{
                    x: lineMotion.x,
                    y: lineMotion.y,
                    rotateX: lineMotion.rotateX,
                    rotateY: lineMotion.rotateY,
                    scale: lineMotion.scale,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? commerceDuration.micro
                      : 0.72,
                    delay:
                      active && !reduceMotion
                        ? lineIndex * 0.045
                        : 0,
                    ease: commerceEase.spatial,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            );
          })}
        </span>

        <motion.span
          className="
            commerce-sans
            mt-7
            inline-flex
            items-center
            gap-3
            text-[0.86rem]
            font-[650]
            tracking-[-0.02em]
            text-[var(--commerce-ink)]
            md:mt-9
            md:text-[0.94rem]
          "
          initial={false}
          animate={{
            opacity: active ? 1 : 0,
            y: active ? 0 : 10,
          }}
          transition={{
            duration: commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          <span
            className="
              border-b
              border-[var(--commerce-line-strong)]
              pb-1
            "
          >
            {moment.actionLabel}
          </span>

          <motion.span
            aria-hidden="true"
            className="inline-flex"
            animate={{
              x: active ? 0 : -4,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    x: 5,
                  }
            }
            transition={{
              duration: commerceDuration.fast,
              ease: commerceEase.enter,
            }}
          >
            <ArrowRight
              size={19}
              weight="regular"
            />
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
}
