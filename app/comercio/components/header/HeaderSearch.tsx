"use client";

import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function HeaderSearch() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileTap={
        reduceMotion
          ? undefined
          : { scale: 0.96 }
      }
      transition={{
        duration: commerceDuration.micro,
        ease: commerceEase.enter,
      }}
    >
      <Link
        href="/comercio/buscar"
        aria-label="Buscar productos"
        className="
          commerce-sans
          group
          inline-flex
          h-11
          items-center
          gap-2
          px-2
          text-sm
          font-[600]
          tracking-[-0.025em]
          text-[var(--commerce-ink)]
          outline-none
          transition-opacity
          duration-200
          hover:opacity-60
          focus-visible:opacity-60
          sm:px-3
        "
      >
        <MagnifyingGlass
          size={20}
          weight="regular"
          className="
            shrink-0
            transition-transform
            duration-300
            group-hover:scale-[1.06]
          "
        />

        <span className="hidden sm:inline">
          Buscar
        </span>
      </Link>
    </motion.div>
  );
}

