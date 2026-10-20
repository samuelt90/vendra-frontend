"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function WholesaleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: false,
    margin: "-15% 0px -15% 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[var(--commerce-ink)]
        text-[var(--commerce-paper)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
          py-16

          md:py-24
          lg:py-28
        "
      >
        {/* línea superior */}
        <motion.div
          aria-hidden="true"
          className="
            h-px
            w-full
            origin-left
            bg-white/14
          "
          initial={false}
          animate={{
            scaleX: inView ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.85,
            ease: commerceEase.spatial,
          }}
        />

        <div
          className="
            grid
            gap-12
            pt-8

            md:grid-cols-12
            md:items-center
            md:gap-10
            md:pt-12
          "
        >
          {/* TEXTO */}
          <div
            className="
              md:col-span-7
              lg:col-span-7
            "
          >
            <motion.p
              className="
                commerce-sans
                text-[0.67rem]
                font-[700]
                uppercase
                tracking-[0.14em]
                text-white/42
              "
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 6,
              }}
              transition={{
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              Compras para negocio
            </motion.p>

            <div
              className="
                mt-5
                overflow-hidden
              "
            >
              <motion.h2
                className="
                  commerce-display
                  max-w-[9ch]
                  text-[clamp(3.8rem,15vw,6.4rem)]
                  leading-[0.84]
                  tracking-[-0.07em]

                  md:max-w-[10ch]
                  md:text-[clamp(5rem,7vw,8rem)]
                "
                initial={false}
                animate={{
                  y: inView ? "0%" : "108%",
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.75,
                  ease: commerceEase.spatial,
                }}
              >
                ¿Necesitas varias unidades?
              </motion.h2>
            </div>

            {/* 
              En móvil el símbolo aparece aquí,
              formando parte de la composición.
              No es simplemente el desktop reducido.
            */}
            <div
              className="
                mt-10
                md:hidden
              "
            >
              <WholesaleSymbol
                active={inView}
                reduceMotion={Boolean(reduceMotion)}
              />
            </div>

            <motion.p
              className="
                commerce-sans
                mt-8
                max-w-[31rem]
                text-[0.94rem]
                leading-[1.6]
                tracking-[-0.025em]
                text-white/58

                md:mt-7
                md:text-[1rem]
              "
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 10,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.17,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              Consulta cantidades y condiciones para los productos que necesitas.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={false}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 8,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.27,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              <Link
                href="/comercio/mayoristas"
                className="
                  commerce-sans
                  group
                  inline-flex
                  min-h-11
                  items-center
                  gap-3
                  border-b
                  border-white/28
                  pb-1
                  text-[0.9rem]
                  font-[650]
                  tracking-[-0.025em]
                "
              >
                Consultar condiciones

                <motion.span
                  aria-hidden="true"
                  className="inline-flex"
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 5,
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
            </motion.div>
          </div>

          {/* VISUAL DESKTOP */}
          <div
            className="
              hidden

              md:col-span-5
              md:flex
              md:justify-end
            "
          >
            <WholesaleSymbol
              active={inView}
              reduceMotion={Boolean(reduceMotion)}
            />
          </div>
        </div>

        {/* cierre */}
        <motion.div
          aria-hidden="true"
          className="
            mt-14
            h-px
            w-full
            origin-right
            bg-white/10

            md:mt-20
          "
          initial={false}
          animate={{
            scaleX: inView ? 1 : 0,
          }}
          transition={{
            delay: reduceMotion ? 0 : 0.14,
            duration: reduceMotion ? 0 : 0.9,
            ease: commerceEase.spatial,
          }}
        />
      </div>
    </section>
  );
}

function WholesaleSymbol({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        h-[220px]
        w-full
        max-w-[360px]

        md:h-[310px]
        md:max-w-[430px]
      "
    >
      {/* círculo ambiental */}
      <motion.div
        className="
          absolute
          left-1/2
          top-1/2
          h-[190px]
          w-[190px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-white/10

          md:h-[260px]
          md:w-[260px]
        "
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.9,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: commerceEase.spatial,
        }}
      />

      {/* unidades */}
      <motion.div
        className="
          absolute
          left-[10%]
          top-[26%]
          flex
          h-[86px]
          w-[86px]
          items-center
          justify-center
          border
          border-white/18
          bg-white/[0.035]

          md:h-[112px]
          md:w-[112px]
        "
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          x: active ? 0 : -24,
          y: active ? 0 : 12,
          rotate: active ? -5 : -10,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          ease: commerceEase.spatial,
        }}
      >
        <span
          className="
            commerce-sans
            text-[0.65rem]
            font-[700]
            tracking-[0.14em]
            text-white/38
          "
        >
          01
        </span>
      </motion.div>

      <motion.div
        className="
          absolute
          left-1/2
          top-[16%]
          flex
          h-[104px]
          w-[104px]
          -translate-x-1/2
          items-center
          justify-center
          border
          border-white/22
          bg-white/[0.055]

          md:h-[138px]
          md:w-[138px]
        "
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : -22,
          rotate: active ? 3 : 8,
        }}
        transition={{
          delay: reduceMotion ? 0 : 0.07,
          duration: reduceMotion ? 0 : 0.68,
          ease: commerceEase.spatial,
        }}
      >
        <span
          className="
            commerce-sans
            text-[0.65rem]
            font-[700]
            tracking-[0.14em]
            text-white/42
          "
        >
          02
        </span>
      </motion.div>

      <motion.div
        className="
          absolute
          bottom-[13%]
          right-[7%]
          flex
          h-[92px]
          w-[92px]
          items-center
          justify-center
          border
          border-[var(--commerce-accent)]
          bg-[var(--commerce-accent)]

          md:h-[120px]
          md:w-[120px]
        "
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          x: active ? 0 : 26,
          y: active ? 0 : 20,
          rotate: active ? 7 : 13,
        }}
        transition={{
          delay: reduceMotion ? 0 : 0.12,
          duration: reduceMotion ? 0 : 0.7,
          ease: commerceEase.spatial,
        }}
      >
        <span
          className="
            commerce-sans
            text-[0.65rem]
            font-[750]
            tracking-[0.14em]
            text-white
          "
        >
          +
        </span>
      </motion.div>

      {/* línea de agrupación */}
      <motion.div
        className="
          absolute
          bottom-[6%]
          left-[14%]
          h-px
          origin-left
          bg-white/24
        "
        initial={false}
        animate={{
          width: active ? "58%" : "0%",
        }}
        transition={{
          delay: reduceMotion ? 0 : 0.2,
          duration: reduceMotion ? 0 : 0.75,
          ease: commerceEase.spatial,
        }}
      />
    </div>
  );
}
