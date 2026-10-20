"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import ExploreNav from "./ExploreNav";
import ExploreStage from "./ExploreStage";

import {
  defaultExploreCategory,
  exploreCategories,
  type ExploreCategoryId,
} from "../../data/explore";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function ExploreSection() {
  const [activeId, setActiveId] =
    useState<ExploreCategoryId>(defaultExploreCategory);

  const reduceMotion = useReducedMotion();

  const activeCategory = useMemo(
    () =>
      exploreCategories.find(
        (category) => category.id === activeId
      ) ?? exploreCategories[0],
    [activeId]
  );

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[var(--commerce-paper)]
        px-[var(--commerce-page-x)]
        py-16
        sm:py-20
        md:min-h-[100svh]
        md:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
        "
      >
        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-6
            md:mb-10
          "
        >
          <div>
            <p className="commerce-label text-[var(--commerce-muted)]">
              Explorar
            </p>

            <h2
              className="
                commerce-display
                mt-3
                max-w-[9ch]
                text-[clamp(3.2rem,11vw,7rem)]
                leading-[0.86]
                tracking-[-0.06em]
                text-[var(--commerce-ink)]
              "
            >
              Encuentra lo que buscas.
            </h2>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="mb-5 md:hidden">
          <ExploreNav
            activeId={activeId}
            onChange={setActiveId}
          />
        </div>

        <div
          className="
            grid
            gap-4
            md:grid-cols-[minmax(220px,0.34fr)_minmax(0,1fr)]
            md:items-center
            md:gap-10
          "
        >
          {/* DESKTOP NAV */}
          <div className="hidden md:block">
            <ExploreNav
              activeId={activeId}
              onChange={setActiveId}
            />
          </div>

          <ExploreStage category={activeCategory} />
        </div>

        {/* CONTENIDO DE CATEGORÍA */}
        <div
          className="
            mt-5
            grid
            gap-5
            border-t
            border-[var(--commerce-line)]
            pt-5

            md:mt-8
            md:grid-cols-[minmax(0,1fr)_auto]
            md:items-end
            md:gap-10
            md:pt-7
          "
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -10,
                    }
              }
              transition={{
                duration: reduceMotion
                  ? commerceDuration.micro
                  : commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              <h3
                className="
                  commerce-sans
                  text-[1.25rem]
                  font-[700]
                  tracking-[-0.045em]
                  text-[var(--commerce-ink)]
                  md:text-[1.5rem]
                "
              >
                {activeCategory.title}
              </h3>

              <p
                className="
                  commerce-body
                  mt-2
                  max-w-xl
                  text-[var(--commerce-ink-soft)]
                "
              >
                {activeCategory.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <Link
            href={activeCategory.actionHref}
            className="
              commerce-sans
              group
              inline-flex
              w-fit
              items-center
              gap-3
              text-[0.92rem]
              font-[650]
              tracking-[-0.025em]
              text-[var(--commerce-ink)]
            "
          >
            <span
              className="
                border-b
                border-[var(--commerce-line-strong)]
                pb-1
              "
            >
              {activeCategory.actionLabel}
            </span>

            <motion.span
              aria-hidden="true"
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      x: 4,
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
          </Link>
        </div>
      </div>
    </section>
  );
}
