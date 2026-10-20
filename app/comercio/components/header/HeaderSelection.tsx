"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ShoppingCartSimple } from "@phosphor-icons/react";

import { useCommerceCart } from "../cart/CommerceCartProvider";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function HeaderSelection() {
  const reduceMotion = useReducedMotion();

  const {
    totalItems,
    openCart,
  } = useCommerceCart();

  return (
    <AnimatePresence mode="popLayout">
      {totalItems > 0 && (
        <motion.button
          key="commerce-cart"
          type="button"
          onClick={openCart}
          layout
          initial={
            reduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  x: 12,
                  scale: 0.96,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? {
                  opacity: 0,
                }
              : {
                  opacity: 0,
                  x: 8,
                  scale: 0.96,
                }
          }
          transition={{
            duration: reduceMotion
              ? commerceDuration.micro
              : 0.36,
            ease: commerceEase.spatial,
          }}
          className="
            commerce-sans
            group
            flex
            min-h-10
            items-center
            gap-2.5
            whitespace-nowrap
            text-[0.82rem]
            font-[650]
            tracking-[-0.03em]
            text-[var(--commerce-ink)]

            md:text-[0.86rem]
          "
        >
          {/* ICONO */}
          <motion.span
            aria-hidden="true"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              text-[var(--commerce-ink)]
            "
            initial={false}
            animate={
              totalItems > 0
                ? {
                    rotate: 0,
                    y: 0,
                  }
                : undefined
            }
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -1,
                    rotate: -3,
                  }
            }
            transition={{
              duration: commerceDuration.fast,
              ease: commerceEase.enter,
            }}
          >
            <ShoppingCartSimple
              size={19}
              weight="light"
            />
          </motion.span>

          {/* TEXTO */}
          <span
            className="
              relative
              pb-[2px]
            "
          >
            Carrito

            <span
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-0
                bg-[var(--commerce-ink)]
                transition-[width]
                duration-300

                group-hover:w-full
              "
            />
          </span>

          {/* CONTADOR */}
          <AnimatePresence
            mode="popLayout"
            initial={false}
          >
            <motion.span
              key={totalItems}
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.55,
                      y: 5,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
                y: -4,
              }}
              transition={{
                duration: reduceMotion
                  ? commerceDuration.micro
                  : 0.34,
                ease: commerceEase.spatial,
              }}
              className="
                flex
                h-7
                min-w-7
                items-center
                justify-center
                rounded-full
                bg-[var(--commerce-ink)]
                px-2
                text-[0.68rem]
                font-[750]
                tabular-nums
                text-[var(--commerce-paper)]
              "
            >
              {totalItems}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
