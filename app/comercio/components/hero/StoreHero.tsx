"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroContent from "./HeroContent";
import HeroScene from "./HeroScene";

gsap.registerPlugin(ScrollTrigger);

export default function StoreHero() {
  const trackRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const content = contentRef.current;

    if (!track || !sticky || !content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          content,
          {
            yPercent: -6,
            opacity: 0.78,
            ease: "none",
          },
          0.2
        )
        .to(
          sticky,
          {
            scale: 0.992,
            ease: "none",
          },
          0.45
        );
    }, track);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={trackRef}
      data-commerce-hero-track
      className="
        relative
        h-[132svh]
        bg-[var(--commerce-bg)]
        md:h-[138svh]
      "
    >
      <div
        ref={stickyRef}
        className="
          sticky
          top-0
          h-[100svh]
          overflow-hidden
        "
      >
 {/* ESCENA DE PRODUCTOS */}
<div
  className="
    absolute
    inset-0
    overflow-hidden

    md:bottom-auto
    md:h-[56svh]
  "
>
  <HeroScene />
</div>

{/* CONTENIDO EDITORIAL */}
<div
  ref={contentRef}
  className="
    absolute
    inset-x-0
    top-[clamp(5.7rem,14svh,7.5rem)]
    z-20
    h-auto
    will-change-transform

    md:top-auto
    md:bottom-[clamp(1.5rem,4svh,3.5rem)]
    md:h-auto
  "
>
  <HeroContent />
</div>

      </div>
    </section>
  );
}

