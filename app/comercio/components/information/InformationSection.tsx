"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import InformationCard from "./InformationCard";
import { informationBlocks } from "../../data/information";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function InformationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const visible = useInView(sectionRef, {
    once: true,
    margin: "-8% 0px -8% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[var(--commerce-bg)]
        py-14
        md:py-24
        lg:py-28
      "
    >
      {/* pequeño gesto visual, sin explicación */}
      <div
        className="
          mx-auto
          mb-8
          flex
          w-full
          max-w-[1600px]
          items-center
          gap-4
          px-[var(--commerce-page-x)]

          md:mb-12
        "
      >
        <motion.span
          className="
            commerce-sans
            text-[0.66rem]
            font-[700]
            tracking-[0.14em]
            text-[var(--commerce-muted)]
          "
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : undefined}
          transition={{
            duration: commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          01
        </motion.span>

        <motion.div
          aria-hidden="true"
          className="
            h-px
            flex-1
            origin-left
            bg-[var(--commerce-line)]
          "
          initial={{
            scaleX: reduceMotion ? 1 : 0,
          }}
          animate={
            visible
              ? {
                  scaleX: 1,
                }
              : undefined
          }
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : 0.8,
            ease: commerceEase.spatial,
          }}
        />
      </div>

      {/* MOBILE: SCROLL HORIZONTAL */}
      <div
        className="
          flex
          w-full
          snap-x
          snap-mandatory
          gap-4
          overflow-x-auto
          overscroll-x-contain
          scroll-smooth
          px-[var(--commerce-page-x)]
          pb-6

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          md:mx-auto
          md:grid
          md:max-w-[1600px]
          md:grid-cols-3
          md:items-start
          md:gap-5
          md:overflow-visible
          md:px-[var(--commerce-page-x)]
          md:pb-0

          lg:gap-7
        "
      >
        {informationBlocks.map((block, index) => (
          <div
            key={block.id}
            className={`
              shrink-0
              snap-start
              basis-[84vw]
              max-w-[390px]

              md:max-w-none
              md:basis-auto

              ${
                index === 0
                  ? "md:translate-y-6"
                  : index === 1
                    ? "md:-translate-y-2"
                    : "md:translate-y-9"
              }
            `}
          >
            <InformationCard
              block={block}
              index={index}
              visible={visible}
            />
          </div>
        ))}

        <div
          aria-hidden="true"
          className="w-[1px] shrink-0 md:hidden"
        />
      </div>
    </section>
  );
}
