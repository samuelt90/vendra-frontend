"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export type CommerceInfoSection = {
  title: string;
  body: string[];
};

type CommerceInfoPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: CommerceInfoSection[];
  nextLabel?: string;
  nextHref?: string;
};

export default function CommerceInfoPage({
  eyebrow,
  title,
  introduction,
  sections,
  nextLabel,
  nextHref,
}: CommerceInfoPageProps) {
  const reduceMotion = useReducedMotion();

  return (
    <main
      className="
        min-h-screen
        bg-[var(--commerce-paper)]
        text-[var(--commerce-ink)]
      "
    >
      {/* INTRO */}

      <section
        className="
          border-b
          border-[var(--commerce-line)]
          px-[var(--commerce-page-x)]
          pb-12
          pt-12

          md:pb-20
          md:pt-20
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >
          <Link
            href="/comercio"
            className="
              commerce-sans
              inline-flex
              items-center
              gap-2
              text-[0.76rem]
              font-[650]
              text-[var(--commerce-muted)]
            "
          >
            <ArrowLeft
              size={16}
              weight="regular"
            />

            Volver
          </Link>

          <motion.p
            className="
              commerce-label
              mt-12
              text-[var(--commerce-muted)]

              md:mt-16
            "
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            {eyebrow}
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="
                commerce-display
                mt-3
                max-w-[10ch]
                text-[clamp(4rem,15vw,7rem)]
                leading-[0.84]
                tracking-[-0.065em]

                md:text-[clamp(5.5rem,8vw,9rem)]
              "
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: "108%" }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.05,
                duration: reduceMotion
                  ? commerceDuration.micro
                  : 0.76,
                ease: commerceEase.spatial,
              }}
            >
              {title}
            </motion.h1>
          </div>

          <motion.p
            className="
              commerce-sans
              mt-7
              max-w-[48rem]
              text-[0.94rem]
              leading-[1.65]
              tracking-[-0.025em]
              text-[var(--commerce-ink-soft)]

              md:text-[1.05rem]
            "
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reduceMotion ? 0 : 0.14,
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            {introduction}
          </motion.p>
        </div>
      </section>

      {/* CONTENIDO */}

      <section
        className="
          px-[var(--commerce-page-x)]
          pb-24
          pt-10

          md:pb-32
          md:pt-16
        "
      >
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1600px]
            gap-10

            md:grid-cols-12
            md:gap-8
          "
        >
          <aside
            className="
              md:col-span-4
            "
          >
            <div className="md:sticky md:top-28">
              <p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
              >
                Información
              </p>

              <p
                className="
                  commerce-display
                  mt-4
                  max-w-[8ch]
                  text-[2.8rem]
                  leading-[0.9]
                  tracking-[-0.055em]

                  md:text-[4.2rem]
                "
              >
                Lo importante, claro.
              </p>
            </div>
          </aside>

          <div
            className="
              md:col-span-7
              md:col-start-6
            "
          >
            {sections.map(
              (section, index) => (
                <motion.section
                  key={section.title}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 14,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: reduceMotion
                      ? 0
                      : Math.min(
                          index * 0.05,
                          0.18
                        ),
                    duration:
                      commerceDuration.interface,
                    ease:
                      commerceEase.enter,
                  }}
                  className="
                    grid
                    grid-cols-[42px_minmax(0,1fr)]
                    gap-4
                    border-t
                    border-[var(--commerce-line)]
                    py-8

                    md:grid-cols-[64px_minmax(0,1fr)]
                    md:gap-7
                    md:py-10
                  "
                >
                  <span
                    className="
                      commerce-sans
                      text-[0.62rem]
                      font-[700]
                      tracking-[0.12em]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <h2
                      className="
                        commerce-display
                        text-[2.2rem]
                        leading-[0.92]
                        tracking-[-0.05em]

                        md:text-[3.2rem]
                      "
                    >
                      {section.title}
                    </h2>

                    <div
                      className="
                        mt-5
                        space-y-4
                      "
                    >
                      {section.body.map(
                        (paragraph) => (
                          <p
                            key={paragraph}
                            className="
                              commerce-sans
                              max-w-[48rem]
                              text-[0.88rem]
                              leading-[1.65]
                              tracking-[-0.02em]
                              text-[var(--commerce-ink-soft)]

                              md:text-[0.96rem]
                            "
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </motion.section>
              )
            )}

            {nextHref && nextLabel && (
              <Link
                href={nextHref}
                className="
                  commerce-sans
                  group
                  mt-8
                  flex
                  min-h-16
                  items-center
                  justify-between
                  gap-5
                  border-y
                  border-[var(--commerce-line)]
                  py-5
                  text-[0.9rem]
                  font-[700]
                  tracking-[-0.025em]
                "
              >
                {nextLabel}

                <motion.span
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { x: 5 }
                  }
                  transition={{
                    duration:
                      commerceDuration.fast,
                    ease:
                      commerceEase.enter,
                  }}
                >
                  <ArrowRight
                    size={19}
                    weight="regular"
                  />
                </motion.span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
