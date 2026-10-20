"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  ExploreCategoryId,
  exploreCategories,
} from "../../data/explore";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type ExploreNavProps = {
  activeId: ExploreCategoryId;
  onChange: (id: ExploreCategoryId) => void;
};

export default function ExploreNav({
  activeId,
  onChange,
}: ExploreNavProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Categorías de productos"
      className="
        relative
        w-full

        md:w-auto
      "
    >
      {/* MOBILE */}
      <div
        className="
          -mx-[var(--commerce-page-x)]
          flex
          gap-6
          overflow-x-auto
          px-[var(--commerce-page-x)]
          pb-2
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          md:hidden
        "
      >
        {exploreCategories.map((category) => {
          const active = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={active}
              className="
                commerce-sans
                relative
                shrink-0
                pb-2
                text-[0.95rem]
                font-[600]
                tracking-[-0.025em]
                outline-none
              "
            >
              <span
                className={
                  active
                    ? "text-[var(--commerce-ink)]"
                    : "text-[var(--commerce-muted)]"
                }
              >
                {category.label}
              </span>

              {active ? (
                <motion.span
                  layoutId="explore-mobile-active"
                  aria-hidden="true"
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-px
                    bg-[var(--commerce-ink)]
                  "
                  transition={{
                    duration: reduceMotion
                      ? commerceDuration.micro
                      : commerceDuration.interface,
                    ease: commerceEase.spatial,
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* DESKTOP */}
      <div
        className="
          hidden
          flex-col
          items-start
          gap-2
          md:flex
        "
      >
        {exploreCategories.map((category, index) => {
          const active = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              aria-pressed={active}
              className="
                group
                relative
                flex
                items-baseline
                gap-4
                py-1
                text-left
                outline-none
              "
            >
              <span
                className="
                  commerce-sans
                  w-5
                  text-[0.66rem]
                  font-[650]
                  tabular-nums
                  text-[var(--commerce-muted)]
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <motion.span
                animate={{
                  x: active ? 12 : 0,
                  opacity: active ? 1 : 0.42,
                }}
                transition={{
                  duration: reduceMotion
                    ? commerceDuration.micro
                    : commerceDuration.interface,
                  ease: commerceEase.spatial,
                }}
                className="
                  commerce-display
                  text-[clamp(2rem,3.4vw,4rem)]
                  leading-[0.96]
                  tracking-[-0.045em]
                  text-[var(--commerce-ink)]
                "
              >
                {category.label}
              </motion.span>

              {active ? (
                <motion.span
                  layoutId="explore-desktop-marker"
                  aria-hidden="true"
                  className="
                    absolute
                    left-5
                    top-1/2
                    h-[0.45rem]
                    w-[0.45rem]
                    -translate-y-1/2
                    rounded-full
                    bg-[var(--commerce-accent)]
                  "
                  transition={{
                    duration: reduceMotion
                      ? commerceDuration.micro
                      : commerceDuration.interface,
                    ease: commerceEase.spatial,
                  }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
