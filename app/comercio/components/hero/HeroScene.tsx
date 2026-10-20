"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { heroProducts } from "../../data/hero";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const headphonesRef = useRef<HTMLDivElement>(null);
  const speakerRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const track = scene.closest(
      "[data-commerce-hero-track]"
    ) as HTMLElement | null;

    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const context = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * MOBILE
       *
       * La composición es vertical.
       * No intentamos comprimir el desktop.
       */
      mm.add("(max-width: 767px)", () => {
        gsap.set(headphonesRef.current, {
          xPercent: 0,
          yPercent: 0,
          rotate: -9,
          scale: 1,
        });

        gsap.set(speakerRef.current, {
          rotate: 16,
          scale: 0.9,
        });

        gsap.set(watchRef.current, {
          rotate: 12,
          scale: 0.84,
        });

        gsap.set(keyboardRef.current, {
          rotate: -13,
          scale: 0.9,
        });

        gsap.set(lightRef.current, {
          rotate: 7,
          scale: 0.88,
        });

        /*
         * Movimiento ambiental.
         * Muy lento: la escena respira incluso sin scroll.
         */
        gsap.to(headphonesRef.current, {
          y: -10,
          rotate: -6,
          duration: 3.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(watchRef.current, {
          y: 8,
          rotate: 16,
          duration: 4.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(speakerRef.current, {
          y: -7,
          rotate: 13,
          duration: 4.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        /*
         * Scroll corto:
         * los objetos no "pasan slides";
         * cambian de profundidad dentro de una sola escena.
         */
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });

        timeline
          .to(
            headphonesRef.current,
            {
              yPercent: -24,
              xPercent: -10,
              scale: 1.1,
              rotate: -2,
              ease: "none",
            },
            0
          )
          .to(
            speakerRef.current,
            {
              xPercent: 34,
              yPercent: -18,
              scale: 1.02,
              rotate: 7,
              ease: "none",
            },
            0
          )
          .to(
            watchRef.current,
            {
              xPercent: -28,
              yPercent: -30,
              scale: 1.08,
              rotate: 5,
              ease: "none",
            },
            0
          )
          .to(
            keyboardRef.current,
            {
              xPercent: 8,
              yPercent: 18,
              scale: 1.05,
              rotate: -7,
              ease: "none",
            },
            0
          )
          .to(
            lightRef.current,
            {
              xPercent: 26,
              yPercent: -12,
              scale: 0.98,
              rotate: 2,
              ease: "none",
            },
            0
          );
      });

      /*
       * DESKTOP
       *
       * Más amplitud horizontal y sensación de cámara.
       */
      mm.add("(min-width: 768px)", () => {
        gsap.set(headphonesRef.current, {
          rotate: -11,
          scale: 1,
        });

        gsap.set(speakerRef.current, {
          rotate: 13,
          scale: 0.92,
        });

        gsap.set(watchRef.current, {
          rotate: 10,
          scale: 0.88,
        });

        gsap.set(keyboardRef.current, {
          rotate: -8,
          scale: 0.94,
        });

        gsap.set(lightRef.current, {
          rotate: 4,
          scale: 0.92,
        });

        gsap.to(headphonesRef.current, {
          y: -12,
          rotate: -7,
          duration: 4.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(speakerRef.current, {
          y: 10,
          rotate: 16,
          duration: 5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(watchRef.current, {
          y: -9,
          rotate: 14,
          duration: 4.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
          },
        });

        timeline
          .to(
            headphonesRef.current,
            {
              xPercent: -22,
              yPercent: -18,
              scale: 1.14,
              rotate: -3,
              ease: "none",
            },
            0
          )
          .to(
            speakerRef.current,
            {
              xPercent: 26,
              yPercent: -24,
              scale: 1.06,
              rotate: 7,
              ease: "none",
            },
            0
          )
          .to(
            watchRef.current,
            {
              xPercent: -30,
              yPercent: 18,
              scale: 1.1,
              rotate: 3,
              ease: "none",
            },
            0
          )
          .to(
            keyboardRef.current,
            {
              xPercent: 10,
              yPercent: 28,
              scale: 1.08,
              rotate: -3,
              ease: "none",
            },
            0
          )
          .to(
            lightRef.current,
            {
              xPercent: 18,
              yPercent: -16,
              scale: 1,
              rotate: 0,
              ease: "none",
            },
            0
          );

        return () => {
          timeline.kill();
        };
      });

      return () => {
        mm.revert();
      };
    }, scene);

    return () => {
      context.revert();
    };
  }, []);

  const headphones = heroProducts.find(
    (product) => product.id === "audifonos"
  );

  const speaker = heroProducts.find(
    (product) => product.id === "bocina"
  );

  const watch = heroProducts.find(
    (product) => product.id === "smartwatch"
  );

  const keyboard = heroProducts.find(
    (product) => product.id === "teclado"
  );

  const light = heroProducts.find(
    (product) => product.id === "ring-light"
  );

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        overflow-hidden
      "
    >
      {/* Fondo editorial muy sutil */}
      <div
        className="
          absolute
          left-1/2
          top-[20%]
          h-[55vw]
          max-h-[580px]
          min-h-[320px]
          w-[55vw]
          max-w-[580px]
          min-w-[320px]
          -translate-x-1/2
          rounded-full
          bg-[var(--commerce-accent)]
          opacity-[0.055]
          blur-[60px]
          md:top-[13%]
          md:blur-[90px]
        "
      />

      {/* AUDÍFONOS — objeto protagonista */}
      {headphones ? (
        <div
          ref={headphonesRef}
          className="
  absolute
  right-[3%]
  top-[12%]
  w-[29vw]
  max-w-[155px]

  md:right-[12%]
  md:top-[10%]
  md:w-[13vw]
  md:max-w-[205px]
"
        >
          <Image
            src={headphones.src}
            alt=""
            width={900}
            height={900}
            priority
            className="
              h-auto
              w-full
              object-contain
              drop-shadow-[0_32px_38px_rgba(0,0,0,0.16)]
            "
          />
        </div>
      ) : null}

      {/* SMARTWATCH */}
      {watch ? (
        <div
          ref={watchRef}
className="
  absolute
  -right-[15%]
  top-[48%]
  w-[47vw]
  max-w-[265px]

  md:right-[3%]
  md:top-[39%]
  md:w-[22vw]
  md:max-w-[350px]
"
        >
          <Image
            src={watch.src}
            alt=""
            width={700}
            height={700}
            priority
            className="
              h-auto
              w-full
              object-contain
              drop-shadow-[0_24px_28px_rgba(0,0,0,0.14)]
            "
          />
        </div>
      ) : null}

      {/* BOCINA */}
      {speaker ? (
        <div
          ref={speakerRef}
className="
  absolute
  -right-[15%]
  top-[48%]
  w-[47vw]
  max-w-[265px]

  md:right-[3%]
  md:top-[39%]
  md:w-[22vw]
  md:max-w-[350px]
"
        >
          <Image
            src={speaker.src}
            alt=""
            width={900}
            height={700}
            className="
              h-auto
              w-full
              object-contain
              drop-shadow-[0_28px_32px_rgba(0,0,0,0.15)]
            "
          />
        </div>
      ) : null}

      {/* RING LIGHT */}
      {light ? (
        <div
          ref={lightRef}
 className="
  absolute
  -left-[5%]
  top-[42%]
  w-[31vw]
  max-w-[165px]

  md:left-[6%]
  md:top-[23%]
  md:w-[14vw]
  md:max-w-[220px]
"
        >
          <Image
            src={light.src}
            alt=""
            width={650}
            height={950}
            className="
              h-auto
              w-full
              object-contain
              opacity-90
              drop-shadow-[0_26px_30px_rgba(0,0,0,0.12)]
            "
          />
        </div>
      ) : null}

      {/* TECLADO */}
      {keyboard ? (
        <div
          ref={keyboardRef}
className="
  absolute
  bottom-[0%]
  left-[52%]
  w-[72vw]
  max-w-[390px]
  -translate-x-1/2

  md:bottom-[-2%]
  md:left-[50%]
  md:w-[39vw]
  md:max-w-[650px]
"
        >
          <Image
            src={keyboard.src}
            alt=""
            width={1200}
            height={700}
            className="
              h-auto
              w-full
              object-contain
              drop-shadow-[0_32px_36px_rgba(0,0,0,0.16)]
            "
          />
        </div>
      ) : null}

      {/* Vignette suave inferior para legibilidad del copy */}
<div
  className="
    absolute
    inset-x-0
    bottom-0
    h-[48%]
    bg-gradient-to-t
    from-[var(--commerce-bg)]
    via-[var(--commerce-bg)]/65
    to-transparent
    md:h-[34%]
  "
/>
    </div>
  );
}
