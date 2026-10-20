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
        flex h-full w-full
        items-start
        pt-3 sm:pt-5 md:pt-4
      "
    >
      <div
        className="
          mx-auto w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
        "
      >
        {/* EYEBROW */}
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

        {/* TITULAR */}
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

        {/* CTA COMERCIAL */}
        <motion.div
          className="mt-8 md:mt-10"
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16 }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.2,
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
    group relative
    inline-flex
    min-h-[46px]
    items-center
    justify-between
    gap-5
    rounded-full
    bg-[var(--commerce-ink)]
    py-[5px]
    pl-5 pr-[5px]
    text-[0.75rem]
    font-[700]
    tracking-[-0.025em]
    text-[var(--commerce-paper)]
    shadow-[0_8px_20px_rgba(23,22,18,0.13)]
    transition-[transform,box-shadow]
    duration-300
    hover:-translate-y-0.5
    active:scale-[0.98]
    motion-reduce:transition-none

    md:min-h-[58px]
    md:gap-10
    md:py-2
    md:pl-7 md:pr-2
    md:text-[1rem]
    md:shadow-[0_12px_28px_rgba(23,22,18,0.16)]
  "
>
  <span>{heroContent.actionLabel}</span>

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
      size={16}
      weight="regular"
      className="
        transition-transform
        duration-300
        group-hover:translate-x-1
        motion-reduce:transition-none

        md:h-5 md:w-5
      "
    />
  </span>
</Link>


        </motion.div>
      </div>
    </div>
  );
}

