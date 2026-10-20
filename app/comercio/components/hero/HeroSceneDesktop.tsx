"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { heroProducts } from "../../data/hero";

gsap.registerPlugin(ScrollTrigger);

const desktopLayout = [
  {
    id: "ring-light",
    className:
      "absolute z-[3] left-[7%] top-[21%] w-[13vw] max-w-[205px]",
    width: 650,
    height: 950,
    rotate: 4,
    scale: 0.98,
    floatY: -4,
    scrollX: 9,
    scrollY: -12,
    scrollScale: 1.04,
  },
  {
    id: "teclado",
    className:
      "absolute z-[2] left-[25%] top-[35%] w-[30vw] max-w-[490px]",
    width: 1200,
    height: 700,
    rotate: -7,
    scale: 1,
    floatY: 4,
    scrollX: 6,
    scrollY: 12,
    scrollScale: 1.07,
  },
  {
    id: "smartwatch",
    className:
      "absolute z-[4] right-[18%] top-[27%] w-[18vw] max-w-[285px]",
    width: 700,
    height: 700,
    rotate: 9,
    scale: 0.98,
    floatY: -8,
    scrollX: -10,
    scrollY: 10,
    scrollScale: 1.05,
  },
  {
    id: "audifonos",
    className:
      "absolute z-[5] right-[10%] top-[11%] w-[12vw] max-w-[195px]",
    width: 900,
    height: 900,
    rotate: -9,
    scale: 1,
    floatY: -10,
    scrollX: -13,
    scrollY: -17,
    scrollScale: 1.1,
  },
  {
    id: "bocina",
    className:
      "absolute z-[3] right-[4%] top-[50%] w-[15vw] max-w-[255px]",
    width: 900,
    height: 700,
    rotate: -7,
    scale: 0.96,
    floatY: 7,
    scrollX: 10,
    scrollY: -10,
    scrollScale: 1.06,
  },
] as const;

export default function HeroSceneDesktop() {
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

    mm.add("(min-width: 768px)", () => {
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
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      desktopLayout.forEach((item, index) => {
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
            duration: 4 + index * 0.3,
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
          left-1/2 top-[18%]
          h-[38vw] w-[38vw]
          max-h-[550px] max-w-[550px]
          -translate-x-1/2
          rounded-full
          bg-[var(--commerce-accent)]
          opacity-[0.045]
          blur-[90px]
        "
      />

      {desktopLayout.map((item, index) => {
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
                  drop-shadow-[0_25px_30px_rgba(23,22,18,0.19)]
                "
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

