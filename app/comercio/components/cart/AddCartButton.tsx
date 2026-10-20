"use client";

import Image from "next/image";
import {
  Check,
  Plus,
  ShoppingCartSimple,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import type { CommerceProduct } from "../../data/products";
import { useCommerceCart } from "./CommerceCartProvider";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type AddState =
  | "idle"
  | "animating"
  | "added";

type AddToCartButtonProps = {
  product: CommerceProduct;
  variant?: "default" | "compact";
};

export default function AddToCartButton({
  product,
  variant = "default",
}: AddToCartButtonProps) {
  const reduceMotion = useReducedMotion();

  const compact = variant === "compact";


  const { addProduct } = useCommerceCart();

  const [state, setState] =
    useState<AddState>("idle");

  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => {
        window.clearTimeout(timer);
      });
    };
  }, []);

  function schedule(
    callback: () => void,
    delay: number
  ) {
    const timer = window.setTimeout(
      callback,
      delay
    );

    timers.current.push(timer);
  }

  function handleAdd() {
    if (state !== "idle") return;

    if (reduceMotion) {
      addProduct(product);
      setState("added");

      schedule(() => {
        setState("idle");
      }, 900);

      return;
    }

    setState("animating");

    /*
      Secuencia:

      0ms
      desaparece "Agregar"

      ~250ms
      entra carrito desde la izquierda

      ~650ms
      empieza a caer el producto

      ~1000ms
      producto entra al carrito

      ~1080ms
      se agrega realmente al carrito global
      y aparece/actualiza Carrito en header

      ~1650ms
      carrito sale por la derecha

      ~1800ms
      aparece "Agregado"

      ~2700ms
      regresa "Agregar"
    */

    schedule(() => {
      addProduct(product);
    }, 1080);

    schedule(() => {
      setState("added");
    }, 1800);

    schedule(() => {
      setState("idle");
    }, 2700);
  }

  const animating =
    state === "animating";

  const added =
    state === "added";

  return (
    <motion.button
      type="button"
      onClick={handleAdd}
      disabled={state !== "idle"}
      whileTap={
        reduceMotion ||
        state !== "idle"
          ? undefined
          : {
              scale: 0.975,
            }
      }
className={`
  commerce-sans
  relative
  flex
  overflow-hidden
  rounded-full
  bg-[var(--commerce-ink)]
  font-[700]
  tracking-[-0.025em]
  text-[var(--commerce-paper)]

  ${
    compact
      ? `
        h-10
        min-w-[112px]
        px-4
        text-[0.8rem]
      `
      : `
        h-14
        w-full
        px-6
        text-[0.9rem]
      `
  }
`}

    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {/* ===================================== */}
        {/* NORMAL                                */}
        {/* ===================================== */}

        {state === "idle" && (
          <motion.span
            key="idle"
className={`
  absolute
  inset-0
  flex
  items-center
  justify-between

  ${compact ? "px-4" : "px-6"}
`}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -7,
            }}
            transition={{
              duration: 0.22,
              ease: commerceEase.enter,
            }}
          >
            <span>
              Agregar
            </span>

<Plus
  size={compact ? 15 : 18}
  weight="bold"
/>
          </motion.span>
        )}

        {/* ===================================== */}
        {/* ESCENA DE AGREGAR                     */}
        {/* ===================================== */}

        {animating && (
          <motion.span
            key="cart-scene"
            className="
              absolute
              inset-0
              overflow-hidden
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.18,
            }}
          >
            {/* ================================= */}
            {/* PRODUCTO QUE CAE                  */}
            {/* ================================= */}

            <motion.span
              aria-hidden="true"
className={`
  absolute
  left-[52%]
  top-1/2
  z-20
  -translate-x-1/2
  -translate-y-1/2

  ${
    compact
      ? "h-7 w-7"
      : "h-9 w-9"
  }
`}
              initial={{
                opacity: 0,
                y: -62,
                scale: 0.92,
                rotate: -9,
              }}
              animate={{
                opacity: [
                  0,
                  1,
                  1,
                  1,
                  0,
                ],

                y: [
                  -62,
                  -52,
                  -22,
                  3,
                  9,
                ],

                scale: [
                  0.92,
                  0.9,
                  0.76,
                  0.48,
                  0.35,
                ],

                rotate: [
                  -9,
                  -6,
                  -2,
                  4,
                  7,
                ],
              }}
              transition={{
                delay: 0.58,
                duration: 0.72,
                times: [
                  0,
                  0.16,
                  0.52,
                  0.82,
                  1,
                ],
                ease: commerceEase.spatial,
              }}
            >
              <Image
                src={product.image}
                alt=""
                fill
                sizes={compact ? "28px" : "36px"}
                className="
                  pointer-events-none
                  select-none
                  object-contain
                  drop-shadow-[0_5px_8px_rgba(0,0,0,0.18)]
                "
              />
            </motion.span>

            {/* ================================= */}
            {/* CARRITO QUE ATRAVIESA EL BOTÓN    */}
            {/* ================================= */}

 <motion.span
  aria-hidden="true"
  className="
    absolute
    top-1/2
    z-10
    inline-flex
    -translate-x-1/2
    -translate-y-1/2
    items-center
    justify-center
  "
  initial={{
    left: "-12%",
    opacity: 0,
    y: 0,
    rotate: 0,
    scale: 0.96,
  }}
  animate={{
    left: "112%",

    opacity: [
      0,
      1,
      1,
      1,
      0,
    ],

    y: [
      0,
      0,
      0,
      3,
      0,
      0,
    ],

    rotate: [
      0,
      0,
      0,
      3,
      -1,
      0,
    ],

    scale: [
      0.96,
      1,
      1,
      0.97,
      1,
      1,
    ],
  }}
  transition={{
    left: {
      duration: 1.72,
      ease: "linear",
    },

    opacity: {
      duration: 1.72,
      times: [
        0,
        0.08,
        0.72,
        0.93,
        1,
      ],
      ease: "linear",
    },

    y: {
      duration: 1.72,
      times: [
        0,
        0.38,
        0.5,
        0.59,
        0.7,
        1,
      ],
      ease: commerceEase.smooth,
    },

    rotate: {
      duration: 1.72,
      times: [
        0,
        0.38,
        0.5,
        0.59,
        0.7,
        1,
      ],
      ease: commerceEase.smooth,
    },

    scale: {
      duration: 1.72,
      times: [
        0,
        0.16,
        0.46,
        0.59,
        0.72,
        1,
      ],
      ease: commerceEase.smooth,
    },
  }}
>
<ShoppingCartSimple
  size={compact ? 24 : 30}
  weight="regular"
/>
</motion.span>


            {/* ================================= */}
            {/* ESTELA MUY SUTIL                  */}
            {/* ================================= */}

            <motion.span
              aria-hidden="true"
              className="
                absolute
                left-[13%]
                top-1/2
                h-px
                -translate-y-1/2
                bg-white/18
              "
              initial={{
                width: "0%",
                opacity: 0,
              }}
              animate={{
                width: [
                  "0%",
                  "14%",
                  "28%",
                  "38%",
                  "18%",
                  "0%",
                ],

                opacity: [
                  0,
                  0.4,
                  0.3,
                  0.2,
                  0.1,
                  0,
                ],
              }}
              transition={{
                duration: 1.55,
                times: [
                  0,
                  0.2,
                  0.42,
                  0.62,
                  0.82,
                  1,
                ],
                ease: commerceEase.smooth,
              }}
            />
          </motion.span>
        )}

        {/* ===================================== */}
        {/* CONFIRMACIÓN                          */}
        {/* ===================================== */}

        {added && (
          <motion.span
            key="added"
className={`
  absolute
  inset-0
  flex
  items-center
  justify-between

  ${compact ? "px-4" : "px-6"}
`}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -6,
            }}
            transition={{
              duration: 0.34,
              ease: commerceEase.enter,
            }}
          >
            <span>
              Agregado
            </span>

            <motion.span
              initial={{
                opacity: 0,
                scale: 0.6,
                rotate: -12,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.4,
                ease: commerceEase.spatial,
              }}
            >
<Check
  size={compact ? 16 : 19}
  weight="bold"
/>
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
