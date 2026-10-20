"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CommercialMoment from "./CommercialMoment";

import {
  commercialMoments,
  type CommercialMomentId,
} from "../../data/commercial";

gsap.registerPlugin(ScrollTrigger);

export default function CommercialStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] =
    useState<CommercialMomentId>(commercialMoments[0].id);

  const activeIndex = commercialMoments.findIndex(
    (moment) => moment.id === activeId
  );

  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const section = stage.closest(
      "[data-commercial-section]"
    ) as HTMLElement | null;

    if (!section) return;

    const context = gsap.context(() => {
     ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom bottom",
  scrub: 0.7,

  onUpdate: (self) => {
    const count = commercialMoments.length;

    const rawIndex = Math.round(
      self.progress * (count - 1)
    );

    const clampedIndex = Math.max(
      0,
      Math.min(count - 1, rawIndex)
    );

    const nextMoment =
      commercialMoments[clampedIndex];

    if (nextMoment) {
      setActiveId(nextMoment.id);
    }
  },
});

    }, stage);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="
        relative
        h-[78svh]
        min-h-[620px]
        w-full
        overflow-hidden

        md:h-[82svh]
        md:min-h-[700px]
      "
      style={{
        perspective: "1500px",
        perspectiveOrigin: "50% 48%",
      }}
    >
      {/* Fondo tipográfico / ambiental */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[58vw]
          max-h-[720px]
          min-h-[340px]
          w-[58vw]
          max-w-[720px]
          min-w-[340px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--commerce-accent)]
          opacity-[0.045]
          blur-[90px]

          md:blur-[130px]
        "
      />

      {/* Plano de profundidad */}
      <div
        className="
          absolute
          inset-0
        "
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {commercialMoments.map((moment, index) => (
          <CommercialMoment
            key={moment.id}
            moment={moment}
            active={moment.id === activeId}
            position={index - activeIndex}
            onActivate={setActiveId}
          />
        ))}
      </div>

      {/* Guía inferior muy sutil */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-x-[var(--commerce-page-x)]
          bottom-7
          flex
          items-center
          justify-between
          gap-6
          md:bottom-10
        "
      >
        <span
          className="
            commerce-label
            text-[var(--commerce-muted)]
          "
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <div
          className="
            relative
            h-px
            flex-1
            overflow-hidden
            bg-[var(--commerce-line)]
          "
        >
          <div
            className="
              absolute
              inset-y-0
              left-0
              bg-[var(--commerce-ink)]
              transition-[width]
              duration-500
            "
            style={{
              width: `${
                ((activeIndex + 1) /
                  commercialMoments.length) *
                100
              }%`,
            }}
          />
        </div>

        <span
          className="
            commerce-label
            text-[var(--commerce-muted)]
          "
        >
          {String(commercialMoments.length).padStart(
            2,
            "0"
          )}
        </span>
      </div>
    </div>
  );
}
