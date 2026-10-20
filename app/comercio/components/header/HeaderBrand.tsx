"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type HeaderBrandProps = {
  name: string;
  descriptor?: string;
  logoSrc?: string;
  compact?: boolean;
};

export default function HeaderBrand({
  name,
  descriptor,
  logoSrc,
  compact = false,
}: HeaderBrandProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href="/comercio"
      aria-label={`Ir al inicio de ${name}`}
      className="
        group
        inline-flex
        min-w-0
        items-center
        gap-3
        outline-none
      "
    >
      {logoSrc ? (
        <motion.div
          className="
            relative
            shrink-0
            overflow-hidden
            rounded-full
            bg-[var(--commerce-paper)]
          "
          initial={false}
          animate={{
            width: compact ? 32 : 38,
            height: compact ? 32 : 38,
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.spatial,
          }}
        >
          <img
            src={logoSrc}
            alt=""
            className="
              h-full
              w-full
              object-contain
              p-1
            "
          />
        </motion.div>
      ) : (
        <motion.div
          aria-hidden="true"
          className="
            commerce-sans
            grid
            shrink-0
            place-items-center
            rounded-full
            border
            border-[var(--commerce-line)]
            text-[0.68rem]
            font-[700]
            uppercase
            tracking-[0.08em]
            text-[var(--commerce-ink)]
          "
          initial={false}
          animate={{
            width: compact ? 32 : 38,
            height: compact ? 32 : 38,
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.spatial,
          }}
        >
          {name.slice(0, 2)}
        </motion.div>
      )}

      <div className="min-w-0">
        <motion.div
          className="
            commerce-sans
            truncate
            font-[700]
            leading-none
            tracking-[-0.045em]
            text-[var(--commerce-ink)]
          "
          initial={false}
          animate={{
            fontSize: compact ? "0.92rem" : "1.02rem",
          }}
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : commerceDuration.interface,
            ease: commerceEase.spatial,
          }}
        >
          {name}
        </motion.div>

        {descriptor ? (
          <motion.div
            className="
              commerce-sans
              mt-1
              truncate
              text-[0.64rem]
              font-[550]
              tracking-[0.015em]
              text-[var(--commerce-muted)]
            "
            initial={false}
            animate={{
              opacity: compact ? 0 : 1,
              height: compact ? 0 : "auto",
              y: compact ? -4 : 0,
            }}
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : commerceDuration.fast,
              ease: commerceEase.enter,
            }}
          >
            {descriptor}
          </motion.div>
        ) : null}
      </div>
    </Link>
  );
}
