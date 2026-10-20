"use client";

import Link from "next/link";
import {
  ArrowRight,
  Buildings,
  CursorClick,
  Storefront,
} from "@phosphor-icons/react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

import type {
  InformationBlock,
  InformationIcon,
} from "../../data/information";

import {
  commerceDuration,
  commerceEase,
  commerceSpring,
} from "../../styles/motion";

type InformationRowProps = {
  block: InformationBlock;
  index: number;
};

function InformationSymbol({
  icon,
}: {
  icon: InformationIcon;
}) {
  const props = {
    size: 34,
    weight: "regular" as const,
  };

  switch (icon) {
    case "store":
      return <Storefront {...props} />;

    case "selection":
      return <CursorClick {...props} />;

    case "business":
      return <Buildings {...props} />;
  }
}

export default function InformationRow({
  block,
  index,
}: InformationRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const inView = useInView(rowRef, {
    once: true,
    margin: "-12% 0px -12% 0px",
  });

  const direction = index % 2 === 0 ? -1 : 1;

  return (
    <div
      ref={rowRef}
      className="
        relative
        py-12
        sm:py-14
        md:py-16
        lg:py-20
      "
    >
      {/* Línea superior */}
      <motion.div
        aria-hidden="true"
        className="
          absolute
          inset-x-0
          top-0
          h-px
          origin-left
          bg-[var(--commerce-line)]
        "
        initial={{
          scaleX: reduceMotion ? 1 : 0,
        }}
        animate={
          inView
            ? {
                scaleX: 1,
              }
            : undefined
        }
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : commerceDuration.transition,
          ease: commerceEase.spatial,
        }}
      />

      <div
        className="
          grid
          gap-7

          md:grid-cols-[84px_minmax(0,1fr)]
          md:gap-8

          lg:grid-cols-[96px_minmax(0,1fr)_minmax(240px,0.42fr)]
          lg:items-end
          lg:gap-12
        "
      >
        {/* ICONO */}
        <motion.div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            text-[var(--commerce-ink)]
            md:h-14
            md:w-14
          "
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: direction * 18,
                  y: 14,
                  rotate: direction * 5,
                  scale: 0.88,
                }
          }
          animate={
            inView
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }
              : undefined
          }
          transition={
            reduceMotion
              ? {
                  duration: commerceDuration.micro,
                }
              : {
                  ...commerceSpring.soft,
                  delay: 0.06,
                }
          }
        >
          <InformationSymbol icon={block.icon} />
        </motion.div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="min-w-0">
          <motion.p
            className="
              commerce-label
              text-[var(--commerce-muted)]
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              delay: reduceMotion ? 0 : 0.08,
              duration: commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            {block.eyebrow}
          </motion.p>

          <div
            className="
              mt-4
              max-w-[13ch]
              sm:max-w-[15ch]
              lg:max-w-[12ch]
            "
          >
            {block.titleLines.map((line, lineIndex) => (
              <span
                key={`${block.id}-${line}`}
                className="
                  block
                  overflow-hidden
                  pb-[0.07em]
                "
              >
                <motion.span
                  className="
                    commerce-display
                    block
                    text-[clamp(2.8rem,11vw,6.2rem)]
                    leading-[0.86]
                    tracking-[-0.06em]
                    text-[var(--commerce-ink)]

                    md:text-[clamp(3.3rem,6vw,6.5rem)]
                  "
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: "108%",
                          rotate: direction * 1.5,
                        }
                  }
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: "0%",
                          rotate: 0,
                        }
                      : undefined
                  }
                  transition={{
                    delay:
                      reduceMotion
                        ? 0
                        : 0.12 + lineIndex * 0.08,
                    duration: reduceMotion
                      ? commerceDuration.micro
                      : commerceDuration.transition,
                    ease: commerceEase.spatial,
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.p
            className="
              commerce-body
              mt-5
              max-w-xl
              text-[var(--commerce-ink-soft)]
              md:mt-6
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            animate={
              inView
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : undefined
            }
            transition={{
              delay: reduceMotion ? 0 : 0.26,
              duration: commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            {block.description}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="
            md:col-start-2
            lg:col-start-3
          "
          initial={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 14,
                }
          }
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : undefined
          }
          transition={{
            delay: reduceMotion ? 0 : 0.32,
            duration: commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          <Link
            href={block.actionHref}
            className="
              commerce-sans
              group
              inline-flex
              items-center
              gap-3
              text-[0.9rem]
              font-[650]
              tracking-[-0.025em]
              text-[var(--commerce-ink)]
              outline-none
            "
          >
            <span
              className="
                border-b
                border-[var(--commerce-line-strong)]
                pb-1
              "
            >
              {block.actionLabel}
            </span>

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
    </div>
  );
}
