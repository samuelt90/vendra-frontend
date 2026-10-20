"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

import type {
  InformationBlock,
  InformationIcon,
} from "../../data/information";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type InformationCardProps = {
  block: InformationBlock;
  index: number;
  visible?: boolean;
};

function InformationSymbol({
  icon,
}: {
  icon: InformationIcon;
}) {
  const props = {
    size: 31,
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

function getSurface(index: number) {
  switch (index) {
    case 0:
      return {
        card: `
          bg-[var(--commerce-ink)]
          text-[var(--commerce-paper)]
        `,
        muted: "text-white/50",
        body: "text-white/64",
        divider: "bg-white/15",
        actionBorder: "border-white/25",
        accent: "bg-[var(--commerce-accent)]",
        cursor: "bg-[var(--commerce-accent)]",
      };

    case 1:
      return {
        card: `
          border
          border-[var(--commerce-line)]
          bg-[var(--commerce-paper)]
          text-[var(--commerce-ink)]
        `,
        muted: "text-[var(--commerce-muted)]",
        body: "text-[var(--commerce-ink-soft)]",
        divider: "bg-[var(--commerce-line)]",
        actionBorder:
          "border-[var(--commerce-line-strong)]",
        accent: "bg-[var(--commerce-olive)]",
        cursor: "bg-[var(--commerce-olive)]",
      };

    default:
      return {
        card: `
          bg-[var(--commerce-sand)]
          text-[var(--commerce-ink)]
        `,
        muted: "text-[var(--commerce-ink-soft)]",
        body: "text-[var(--commerce-ink-soft)]",
        divider: "bg-black/12",
        actionBorder: "border-black/25",
        accent: "bg-[var(--commerce-ink)]",
        cursor: "bg-[var(--commerce-ink)]",
      };
  }
}

function TypingTitle({
  lines,
  active,
  index,
  cursorClassName,
  accentClassName,
  onComplete,
}: {
  lines: string[];
  active: boolean;
  index: number;
  cursorClassName: string;
  accentClassName: string;
  onComplete: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const lineStarts = useMemo(() => {
    let offset = 0;

    return lines.map((line) => {
      const start = offset;

      offset += line.length + 5;

      return start;
    });
  }, [lines]);

  const totalSteps = useMemo(() => {
    if (!lines.length) return 0;

    const lastIndex = lines.length - 1;

    return (
      lineStarts[lastIndex] +
      lines[lastIndex].length
    );
  }, [lines, lineStarts]);

  const [step, setStep] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setStep(0);
      completedRef.current = false;
      return;
    }

    if (reduceMotion) {
      setStep(totalSteps);

      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }

      return;
    }

    setStep(0);
    completedRef.current = false;

    let intervalId: number | undefined;

    const startTimeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setStep((current) => {
          if (current >= totalSteps) {
            if (intervalId) {
              window.clearInterval(intervalId);
            }

            return totalSteps;
          }

          return current + 1;
        });
      }, 72);
    }, 380);

    return () => {
      window.clearTimeout(startTimeout);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [
    active,
    reduceMotion,
    totalSteps,
    onComplete,
  ]);

  useEffect(() => {
    if (
      active &&
      step >= totalSteps &&
      !completedRef.current
    ) {
      completedRef.current = true;

      const timeout = window.setTimeout(() => {
        onComplete();
      }, 260);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [
    active,
    step,
    totalSteps,
    onComplete,
  ]);

  const finished =
    active && step >= totalSteps;

  return (
    <div className="relative mt-5">
      {lines.map((line, lineIndex) => {
        const start = lineStarts[lineIndex];

        const typedLength = Math.max(
          0,
          Math.min(
            line.length,
            step - start
          )
        );

        const typedText =
          line.slice(0, typedLength);

        const isTypingThisLine =
          active &&
          step >= start &&
          step < start + line.length;

        const isLastLine =
          lineIndex === lines.length - 1;

        const showFinalCursor =
          finished && isLastLine;

        return (
          <div
            key={`${line}-${lineIndex}`}
            className="
              relative
              min-h-[0.88em]
            "
          >
            <span
              className="
                commerce-display
                block
                text-[clamp(2.55rem,11.5vw,4.1rem)]
                leading-[0.86]
                tracking-[-0.06em]

                md:text-[clamp(2.8rem,4.2vw,4.4rem)]
              "
            >
              {typedText}

              {(isTypingThisLine ||
                showFinalCursor) && (
                <motion.span
                  aria-hidden="true"
                  className={`
                    ml-[0.055em]
                    inline-block
                    h-[0.72em]
                    w-[0.07em]
                    align-[-0.04em]
                    ${cursorClassName}
                  `}
                  animate={{
                    opacity: [1, 1, 0, 0],
                  }}
                  transition={{
                    duration: 0.85,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </span>
          </div>
        );
      })}

      <motion.div
        aria-hidden="true"
        className="
          mt-4
          flex
          items-center
          gap-2
        "
        initial={false}
        animate={{
          opacity: finished ? 1 : 0,
          y: finished ? 0 : 5,
        }}
        transition={{
          duration: 0.42,
          ease: commerceEase.enter,
        }}
      >
        <motion.span
          className={`
            block
            h-[3px]
            rounded-full
            ${accentClassName}
          `}
          initial={false}
          animate={{
            width: finished
              ? index === 1
                ? 54
                : 42
              : 0,
          }}
          transition={{
            duration: 0.58,
            ease: commerceEase.spatial,
          }}
        />

        <motion.span
          className="
            commerce-sans
            text-[0.72rem]
            leading-none
          "
          initial={false}
          animate={{
            opacity: finished ? 0.68 : 0,
            scale: finished ? 1 : 0.7,
            rotate: finished ? 0 : -12,
          }}
          transition={{
            delay: finished ? 0.12 : 0,
            duration: 0.42,
            ease: commerceEase.spatial,
          }}
        >
          ✦
        </motion.span>
      </motion.div>
    </div>
  );
}

export default function InformationCard({
  block,
  index,
}: InformationCardProps) {
  /*
    IMPORTANTE:
    este wrapper NO se anima.

    IntersectionObserver observa una geometría
    completamente estable.
  */
  const observerRef =
    useRef<HTMLDivElement>(null);

  const reduceMotion =
    useReducedMotion();

  const active = useInView(observerRef, {
    once: false,

    /*
      Un poco más tolerante que 0.55.

      En móvil permite activar la card cuando
      realmente es protagonista del swipe,
      sin parpadeos cerca del límite.
    */
    amount: 0.42,
  });

  const [typingDone, setTypingDone] =
    useState(false);

  useEffect(() => {
    if (!active) {
      setTypingDone(false);
    }
  }, [active]);

  /*
    Callback estable.
    No cambia su identidad en cada render.
  */
  const handleTypingComplete =
    useCallback(() => {
      setTypingDone(true);
    }, []);

  const surface = getSurface(index);

  return (
    <div
      ref={observerRef}
      className="
        h-full
        w-full
      "
    >
      <motion.article
        initial={false}
        animate={
          active
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
              }
            : {
                opacity: 0.38,
                y: 20,
                scale: 0.98,
              }
        }
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : 0.68,
          ease: commerceEase.spatial,
        }}
        className={`
          relative
          flex
          min-h-[455px]
          w-full
          flex-col
          overflow-hidden
          rounded-[30px_30px_12px_30px]
          p-6

          sm:min-h-[470px]
          sm:p-7

          md:min-h-[485px]
          md:p-8

          ${surface.card}
        `}
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-6
          "
        >
          <motion.div
            className="inline-flex"
            initial={false}
            animate={
              active
                ? {
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                  }
                : {
                    opacity: 0,
                    scale: 0.84,
                    rotate: -6,
                  }
            }
            transition={{
              duration: 0.5,
              ease: commerceEase.spatial,
            }}
          >
            <InformationSymbol
              icon={block.icon}
            />
          </motion.div>

          <motion.span
            className={`
              commerce-sans
              text-[0.68rem]
              font-[700]
              tracking-[0.13em]
              ${surface.muted}
            `}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : -4,
            }}
            transition={{
              duration: 0.4,
              ease: commerceEase.enter,
            }}
          >
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </motion.span>
        </div>

        {/* MARCA SUPERIOR */}
        <motion.div
          aria-hidden="true"
          className={`
            mt-7
            h-[2px]
            origin-left
            ${surface.accent}
          `}
          initial={false}
          animate={{
            width: active
              ? index === 1
                ? 54
                : 38
              : 0,
          }}
          transition={{
            duration: 0.62,
            ease: commerceEase.spatial,
          }}
        />

        {/* CONTENT */}
        <div className="mt-auto pt-10">
          <motion.p
            className={`
              commerce-sans
              text-[0.67rem]
              font-[700]
              uppercase
              tracking-[0.14em]
              ${surface.muted}
            `}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              y: active ? 0 : 6,
            }}
            transition={{
              delay:
                active && !reduceMotion
                  ? 0.14
                  : 0,
              duration: 0.42,
              ease: commerceEase.enter,
            }}
          >
            {block.eyebrow}
          </motion.p>

          <TypingTitle
            lines={block.titleLines}
            active={active}
            index={index}
            cursorClassName={
              surface.cursor
            }
            accentClassName={
              surface.accent
            }
            onComplete={
              handleTypingComplete
            }
          />

          <motion.p
            className={`
              commerce-sans
              mt-5
              max-w-[31rem]
              text-[0.91rem]
              leading-[1.55]
              tracking-[-0.025em]
              ${surface.body}
            `}
            initial={false}
            animate={
              typingDone
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {
                    opacity: 0,
                    y: 10,
                  }
            }
            transition={{
              duration: 0.48,
              ease: commerceEase.enter,
            }}
          >
            {block.description}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-8"
          initial={false}
          animate={
            typingDone
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 8,
                }
          }
          transition={{
            delay:
              typingDone &&
              !reduceMotion
                ? 0.12
                : 0,
            duration: 0.45,
            ease: commerceEase.enter,
          }}
        >
          <div
            aria-hidden="true"
            className={`
              mb-5
              h-px
              w-full
              ${surface.divider}
            `}
          />

          <Link
            href={block.actionHref}
            className="
              commerce-sans
              flex
              min-h-11
              w-full
              items-center
              justify-between
              gap-5
              text-[0.88rem]
              font-[650]
              tracking-[-0.025em]
            "
          >
            <span
              className={`
                border-b
                pb-1
                ${surface.actionBorder}
              `}
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
                duration:
                  commerceDuration.fast,
                ease: commerceEase.enter,
              }}
            >
              <ArrowRight
                size={20}
                weight="regular"
              />
            </motion.span>
          </Link>
        </motion.div>
      </motion.article>
    </div>
  );
}
