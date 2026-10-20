"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import { heroContent } from "../../data/hero";
import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function HeroContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="
        relative
        flex
        h-full
        w-full
        items-start
        pt-3
        sm:pt-5
        md:pt-4
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
        "
      >
        <motion.p
          className="
            commerce-label
            text-[var(--commerce-ink-soft)]
          "
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 12 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          {heroContent.eyebrow}
        </motion.p>

        <motion.h1
          className="
            commerce-display
            mt-3
            max-w-[8ch]
            text-[clamp(3.5rem,15vw,7.8rem)]
            leading-[0.82]
            tracking-[-0.065em]
            text-[var(--commerce-ink)]
            md:max-w-[11ch]
            md:text-[clamp(4.8rem,8vw,8.8rem)]
          "
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.08,
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.transition,
            ease: commerceEase.enter,
          }}
        >
          {heroContent.title}
        </motion.h1>

        <motion.div
          className="mt-5 md:mt-6"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 14 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.16,
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          <Link
            href={heroContent.actionHref}
            className="
              commerce-sans
              group
              inline-flex
              items-center
              gap-3
              text-[0.92rem]
              font-[650]
              tracking-[-0.025em]
              text-[var(--commerce-ink)]
            "
          >
            <span className="border-b border-[var(--commerce-line-strong)] pb-1">
              {heroContent.actionLabel}
            </span>

            <motion.span
              aria-hidden="true"
              whileHover={
                reduceMotion
                  ? undefined
                  : { x: 4 }
              }
              transition={{
                duration: commerceDuration.fast,
                ease: commerceEase.enter,
              }}
            >
              <ArrowRight size={19} />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
