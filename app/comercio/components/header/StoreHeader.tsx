"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useState } from "react";

import HeaderBrand from "./HeaderBrand";
import HeaderSearch from "./HeaderSearch";
import HeaderSelection from "./HeaderSelection";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type StoreHeaderProps = {
  brandName?: string;
  brandDescriptor?: string;
  brandLogo?: string;


  onSearch?: (query: string) => void;
  onOpenSelection?: () => void;
};

const COMPACT_SCROLL_Y = 40;

export default function StoreHeader({
  brandName = "Casa Vendra",
  brandDescriptor,
  brandLogo,

  onSearch,
}: StoreHeaderProps) {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextCompact = latest > COMPACT_SCROLL_Y;

    setCompact((current) =>
      current === nextCompact ? current : nextCompact
    );
  });

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        w-full
        text-[var(--commerce-ink)]
      "
    >
      {/* Superficie que aparece al hacer scroll */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[var(--commerce-bg)]
        "
        initial={false}
        animate={{
          opacity: compact ? 0.97 : 0,
        }}
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : commerceDuration.interface,
          ease: commerceEase.spatial,
        }}
      />

      {/* Línea inferior */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px
          bg-[var(--commerce-line)]
        "
        initial={false}
        animate={{
          opacity: compact ? 1 : 0,
          scaleX: compact ? 1 : 0.92,
        }}
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : commerceDuration.interface,
          ease: commerceEase.spatial,
        }}
      />

      <motion.div
        className="
          relative
          mx-auto
          flex
          w-full
          max-w-[1600px]
          items-center
          justify-between
          gap-3
          px-[var(--commerce-page-x)]
        "
        initial={false}
        animate={{
          height: compact ? 62 : 78,
        }}
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : commerceDuration.interface,
          ease: commerceEase.spatial,
        }}
      >
        <motion.div
          className="
            min-w-0
            flex-1
          "
          initial={false}
          animate={{
            scale: compact ? 0.97 : 1,
            x: compact ? -2 : 0,
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.spatial,
          }}
          style={{
            transformOrigin: "left center",
          }}
        >
          <HeaderBrand
            name={brandName}
            descriptor={brandDescriptor}
            logoSrc={brandLogo}
            compact={compact}
          />
        </motion.div>

        <motion.div
          className="
            flex
            shrink-0
            items-center
            gap-0.5
            sm:gap-1
          "
          initial={false}
          animate={{
            y: compact ? 0 : 1,
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.spatial,
          }}
        >
          <HeaderSearch onSearch={onSearch} />

          <HeaderSelection />
        </motion.div>
      </motion.div>
    </header>
  );
}
