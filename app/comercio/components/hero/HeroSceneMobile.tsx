"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { heroProducts } from "../../data/hero";

gsap.registerPlugin(ScrollTrigger);

const mobileLayout = [
  {
    id: "audifonos",
    className:
      "absolute z-[5] right-[5%] top-[47%] w-[28vw] max-w-[145px]",
    width: 900,
    height: 900,
    rotate: -8,
    scale: 1,
    floatY: -7,
    scrollX: -8,
    scrollY: -15,
    scrollScale: 1.08,
  },
  {
    id: "ring-light",
    className:
      "absolute z-[2] left-[5%] top-[56%] w-[27vw] max-w-[150px]",
    width: 650,
    height: 950,
    rotate: 5,
    scale: 1,
    floatY: -4,
    scrollX: 5,
    scrollY: -12,
    scrollScale: 1.04,
  },
  {
    id: "smartwatch",
    className:
      "absolute z-[4] right-[23%] top-[55%] w-[31vw] max-w-[175px]",
    width: 700,
    height: 700,
    rotate: 10,
    scale: 0.98,
    floatY: 7,
    scrollX: -8,
    scrollY: -17,
    scrollScale: 1.06,
  },
  {
    id: "teclado",
    className:
      "absolute z-[3] left-[21%] top-[69%] w-[54vw] max-w-[310px]",
    width: 1200,
    height: 700,
    rotate: -7,
    scale: 1,
    floatY: 3,
    scrollX: -5,
    scrollY: 9,
    scrollScale: 1.07,
  },
  {
    id: "bocina",
    className:
      "absolute z-[4] right-[3%] top-[73%] w-[28vw] max-w-[160px]",
    width: 900,
    height: 700,
    rotate: -9,
    scale: 0.96,
    floatY: -6,
    scrollX: 7,
    scrollY: -11,
    scrollScale: 1.06,
  },
] as const;



export default function HeroSceneMobile() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const objectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const track = scene.closest<HTMLElement>(
      "[data-commerce-hero-track]"
    );
    if (!track) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      mobileLayout.forEach((item, index) => {
        const object = objectRefs.current[index];
        if (!object) return;

        gsap.set(object, {
          xPercent: 0,
          yPercent: 0,
          rotate: item.rotate,
          scale: item.scale,
        });

        const floating = object.querySelector(
          "[data-hero-float]"
        );

        if (floating) {
          gsap.to(floating, {
            y: item.floatY,
            duration: 4 + index * 0.25,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        timeline.to(
          object,
          {
            xPercent: item.scrollX,
            yPercent: item.scrollY,
            rotate: item.rotate * 0.35,
            scale: item.scrollScale,
            ease: "none",
          },
          0
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="absolute inset-0"
      aria-hidden="true"
    >
      <div
  className="
    absolute
    left-1/2
    top-[56%]
    h-[44svh]
    w-[90vw]
    max-w-[420px]
    -translate-x-1/2
    rounded-full
    bg-[var(--commerce-accent)]
    opacity-[0.055]
    blur-[70px]
  "
/>
      {mobileLayout.map((item, index) => {
        const product = heroProducts.find(
          (entry) => entry.id === item.id
        );

        if (!product) return null;

        return (
          <div
            key={item.id}
            ref={(element) => {
              objectRefs.current[index] = element;
            }}
            className={`${item.className} transform-gpu`}
          >
            <div data-hero-float>
              <Image
                src={product.src}
                alt=""
                width={item.width}
                height={item.height}
                priority={item.id === "audifonos"}
                className="
                  h-auto w-full object-contain
                  drop-shadow-[0_22px_27px_rgba(23,22,18,0.17)]
                "
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

