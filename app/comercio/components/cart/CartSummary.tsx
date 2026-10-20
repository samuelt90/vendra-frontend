"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Minus,
  Plus,
  X,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
} from "react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

import { useCommerceCart } from "./CommerceCartProvider";

function formatPrice(
  value: number
) {
  return `Q${value.toLocaleString("es-GT")}`;
}

export default function CartSummary() {
  const reduceMotion = useReducedMotion();

  const router = useRouter();

  const {
    items,
    totalItems,
    subtotal,
    cartOpen,
    closeCart,
    incrementProduct,
    decrementProduct,
    removeProduct,
  } = useCommerceCart();

  function handleCompletePurchase() {
    closeCart();
    router.push("/comercio/completar-compra");
  }

  /*
   * Si se elimina la última unidad,
   * desaparece también la superficie.
   */
  useEffect(() => {
    if (
      cartOpen &&
      totalItems === 0
    ) {
      closeCart();
    }
  }, [
    cartOpen,
    totalItems,
    closeCart,
  ]);


  /*
   * Bloqueamos el documento mientras
   * Tu compra está abierta.
   */
  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [cartOpen]);

  /*
   * Escape en desktop.
   */
  useEffect(() => {
    if (!cartOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        closeCart();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    cartOpen,
    closeCart,
  ]);

  return (
    <AnimatePresence>
      {cartOpen &&
        totalItems > 0 && (
          <motion.div
            key="cart-summary"
            className="
              fixed
              inset-0
              z-[150]
            "
          >
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Cerrar tu compra"
              onClick={closeCart}
              className="
                absolute
                inset-0
                h-full
                w-full
                cursor-default
                bg-black/38
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
                duration:
                  reduceMotion
                    ? commerceDuration.micro
                    : 0.32,
                ease:
                  commerceEase.enter,
              }}
            />

            {/* ================================= */}
            {/* MOBILE                            */}
            {/* ================================= */}

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Tu compra"
              className="
                absolute
                inset-x-0
                bottom-0
                flex
                h-[94dvh]
                flex-col
                overflow-hidden
                rounded-t-[28px]
                bg-[var(--commerce-paper)]
                md:hidden
              "
              initial={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      y: "100%",
                    }
              }
              animate={
                reduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      y: 0,
                    }
              }
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      y: "100%",
                    }
              }
              transition={{
                duration:
                  reduceMotion
                    ? commerceDuration.micro
                    : 0.55,
                ease:
                  commerceEase.spatial,
              }}
            >
              {/* MOBILE HEADER */}

              <header
                className="
                  flex
                  shrink-0
                  items-start
                  justify-between
                  border-b
                  border-[var(--commerce-line)]
                  px-5
                  pb-5
                  pt-6
                "
              >
                <div>
                  <h2
                    className="
                      commerce-display
                      text-[2rem]
                      leading-[0.98]
                      tracking-[-0.04em]
                      text-[var(--commerce-ink)]
                    "
                  >
                    Tu compra
                  </h2>

                  <p
                    className="
                      commerce-sans
                      mt-2
                      text-[0.75rem]
                      font-[600]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {totalItems === 1
                      ? "1 unidad"
                      : `${totalItems} unidades`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Cerrar"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--commerce-line)]
                    text-[var(--commerce-ink)]
                    transition-colors
                    duration-200
                    active:bg-black/[0.04]
                  "
                >
                  <X
                    size={19}
                    weight="regular"
                  />
                </button>
              </header>

              {/* MOBILE PRODUCTS */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-5
                "
              >
                {items.map(
                  ({
                    product,
                    quantity,
                  }) => {
                    const lineTotal =
                      product.price *
                      quantity;

                    return (
                      <article
                        key={
                          product.id
                        }
                        className="
                          border-b
                          border-[var(--commerce-line)]
                          py-6
                        "
                      >
                        <div
                          className="
                            grid
                            grid-cols-[92px_minmax(0,1fr)]
                            gap-4
                          "
                        >
                          {/* PRODUCT IMAGE */}

                          <div
                            className="
                              relative
                              aspect-square
                              overflow-hidden
                              rounded-[18px]
                              bg-[var(--commerce-bg)]
                            "
                          >
                            <Image
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              fill
                              sizes="92px"
                              className="
                                object-contain
                                p-3
                              "
                            />
                          </div>

                          {/* PRODUCT INFO */}

                          <div
                            className="
                              min-w-0
                            "
                          >
                            <p
                              className="
                                commerce-sans
                                text-[0.68rem]
                                font-[650]
                                uppercase
                                tracking-[0.08em]
                                text-[var(--commerce-muted)]
                              "
                            >
                              {
                                product.category
                              }
                            </p>

                            <h3
                              className="
                                commerce-sans
                                mt-1
                                text-[0.96rem]
                                font-[700]
                                leading-[1.25]
                                tracking-[-0.03em]
                                text-[var(--commerce-ink)]
                              "
                            >
                              {
                                product.name
                              }
                            </h3>

                            <p
                              className="
                                commerce-sans
                                mt-2
                                text-[0.8rem]
                                font-[600]
                                text-[var(--commerce-ink-soft)]
                              "
                            >
                              {formatPrice(
                                product.price
                              )}{" "}
                              c/u
                            </p>

                            <div
                              className="
                                mt-5
                                flex
                                items-end
                                justify-between
                                gap-3
                              "
                            >
                              {/* QUANTITY */}

                              <div>
                                <div
                                  className="
                                    flex
                                    h-10
                                    items-center
                                    rounded-full
                                    border
                                    border-[var(--commerce-line-strong)]
                                  "
                                >
                                  <button
                                    type="button"
                                    aria-label={`Reducir cantidad de ${product.name}`}
                                    onClick={() =>
                                      decrementProduct(
                                        product.id
                                      )
                                    }
                                    className="
                                      flex
                                      h-10
                                      w-10
                                      items-center
                                      justify-center
                                      rounded-full
                                      transition-colors
                                      duration-200
                                      active:bg-black/[0.05]
                                    "
                                  >
                                    <Minus
                                      size={
                                        15
                                      }
                                      weight="regular"
                                    />
                                  </button>

                                  <span
                                    className="
                                      commerce-sans
                                      min-w-8
                                      text-center
                                      text-[0.78rem]
                                      font-[700]
                                      tabular-nums
                                      text-[var(--commerce-ink)]
                                    "
                                  >
                                    {
                                      quantity
                                    }
                                  </span>

                                  <button
                                    type="button"
                                    aria-label={`Aumentar cantidad de ${product.name}`}
                                    onClick={() =>
                                      incrementProduct(
                                        product.id
                                      )
                                    }
                                    className="
                                      flex
                                      h-10
                                      w-10
                                      items-center
                                      justify-center
                                      rounded-full
                                      transition-colors
                                      duration-200
                                      active:bg-black/[0.05]
                                    "
                                  >
                                    <Plus
                                      size={
                                        15
                                      }
                                      weight="regular"
                                    />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeProduct(
                                      product.id
                                    )
                                  }
                                  className="
                                    commerce-sans
                                    mt-3
                                    text-[0.69rem]
                                    font-[650]
                                    text-[var(--commerce-muted)]
                                    underline
                                    decoration-[var(--commerce-line-strong)]
                                    underline-offset-4
                                  "
                                >
                                  Eliminar
                                </button>
                              </div>

                              {/* LINE TOTAL */}

                              <p
                                className="
                                  commerce-sans
                                  pb-1
                                  text-right
                                  text-[0.95rem]
                                  font-[750]
                                  tabular-nums
                                  tracking-[-0.03em]
                                  text-[var(--commerce-ink)]
                                "
                              >
                                {formatPrice(
                                  lineTotal
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              {/* MOBILE SUMMARY */}

              <footer
                className="
                  shrink-0
                  border-t
                  border-[var(--commerce-line)]
                  bg-[var(--commerce-paper)]
                  px-5
                  pb-[calc(env(safe-area-inset-bottom)+20px)]
                  pt-5
                "
              >
                <div
                  className="
                    space-y-2.5
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-6
                    "
                  >
                    <span
                      className="
                        commerce-sans
                        text-[0.78rem]
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      Productos
                    </span>

                    <span
                      className="
                        commerce-sans
                        text-[0.88rem]
                        font-[700]
                        tabular-nums
                        text-[var(--commerce-ink)]
                      "
                    >
                      {formatPrice(
                        subtotal
                      )}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                    "
                  >
                    <span
                      className="
                        commerce-sans
                        text-[0.78rem]
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      Envío
                    </span>

                    <span
                      className="
                        commerce-sans
                        text-right
                        text-[0.74rem]
                        font-[600]
                        text-[var(--commerce-muted)]
                      "
                    >
                      Por calcular
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-5
                    flex
                    items-baseline
                    justify-between
                    gap-5
                    border-t
                    border-[var(--commerce-line)]
                    pt-4
                  "
                >
                  <span
                    className="
                      commerce-sans
                      text-[0.82rem]
                      font-[700]
                      text-[var(--commerce-ink)]
                    "
                  >
                    Subtotal
                  </span>

                  <span
                    className="
                      commerce-display
                      text-[1.65rem]
                      leading-none
                      tracking-[-0.04em]
                      text-[var(--commerce-ink)]
                    "
                  >
                    {formatPrice(
                      subtotal
                    )}
                  </span>
                </div>

<div className="mt-5 space-y-2.5">
  <motion.button
    type="button"
    onClick={handleCompletePurchase}
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.985,
          }
    }
    transition={{
      duration: commerceDuration.micro,
      ease: commerceEase.enter,
    }}
    className="
      commerce-sans
      flex
      h-[54px]
      w-full
      items-center
      justify-center
      rounded-full
      bg-[var(--commerce-ink)]
      px-6
      text-[0.84rem]
      font-[700]
      tracking-[-0.02em]
      text-[var(--commerce-paper)]
    "
  >
    Completar compra
  </motion.button>

  <motion.button
    type="button"
    onClick={closeCart}
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.988,
          }
    }
    transition={{
      duration: commerceDuration.micro,
      ease: commerceEase.enter,
    }}
    className="
      commerce-sans
      flex
      h-[48px]
      w-full
      items-center
      justify-center
      rounded-full
      border
      border-[var(--commerce-line-strong)]
      bg-transparent
      px-6
      text-[0.8rem]
      font-[650]
      tracking-[-0.02em]
      text-[var(--commerce-ink)]
    "
  >
    Seguir comprando
  </motion.button>
</div>

              </footer>
            </motion.section>

            {/* ================================= */}
            {/* DESKTOP                           */}
            {/* ================================= */}

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Tu compra"
              className="
                absolute
                bottom-0
                right-0
                top-0
                hidden
                w-[min(480px,42vw)]
                min-w-[420px]
                flex-col
                bg-[var(--commerce-paper)]
                md:flex
              "
              initial={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      x: "100%",
                    }
              }
              animate={
                reduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      x: 0,
                    }
              }
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      x: "100%",
                    }
              }
              transition={{
                duration:
                  reduceMotion
                    ? commerceDuration.micro
                    : 0.55,
                ease:
                  commerceEase.spatial,
              }}
            >
              {/* DESKTOP HEADER */}

              <header
                className="
                  flex
                  shrink-0
                  items-start
                  justify-between
                  border-b
                  border-[var(--commerce-line)]
                  px-8
                  pb-7
                  pt-8
                "
              >
                <div>
                  <h2
                    className="
                      commerce-display
                      text-[2.55rem]
                      leading-none
                      tracking-[-0.045em]
                      text-[var(--commerce-ink)]
                    "
                  >
                    Tu compra
                  </h2>

                  <p
                    className="
                      commerce-sans
                      mt-3
                      text-[0.76rem]
                      font-[600]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {totalItems === 1
                      ? "1 unidad"
                      : `${totalItems} unidades`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Cerrar"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--commerce-line)]
                    text-[var(--commerce-ink)]
                    transition-colors
                    duration-200
                    hover:bg-black/[0.035]
                  "
                >
                  <X
                    size={18}
                    weight="regular"
                  />
                </button>
              </header>

              {/* DESKTOP PRODUCTS */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  overscroll-contain
                  px-8
                "
              >
                {items.map(
                  ({
                    product,
                    quantity,
                  }) => {
                    const lineTotal =
                      product.price *
                      quantity;

                    return (
                      <article
                        key={
                          product.id
                        }
                        className="
                          border-b
                          border-[var(--commerce-line)]
                          py-7
                        "
                      >
                        <div
                          className="
                            grid
                            grid-cols-[104px_minmax(0,1fr)]
                            gap-5
                          "
                        >
                          <div
                            className="
                              relative
                              aspect-square
                              overflow-hidden
                              rounded-[20px]
                              bg-[var(--commerce-bg)]
                            "
                          >
                            <Image
                              src={
                                product.image
                              }
                              alt={
                                product.name
                              }
                              fill
                              sizes="104px"
                              className="
                                object-contain
                                p-4
                              "
                            />
                          </div>

                          <div>
                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-5
                              "
                            >
                              <div
                                className="
                                  min-w-0
                                "
                              >
                                <p
                                  className="
                                    commerce-sans
                                    text-[0.66rem]
                                    font-[650]
                                    uppercase
                                    tracking-[0.09em]
                                    text-[var(--commerce-muted)]
                                  "
                                >
                                  {
                                    product.category
                                  }
                                </p>

                                <h3
                                  className="
                                    commerce-sans
                                    mt-1.5
                                    text-[0.98rem]
                                    font-[700]
                                    leading-[1.3]
                                    tracking-[-0.03em]
                                    text-[var(--commerce-ink)]
                                  "
                                >
                                  {
                                    product.name
                                  }
                                </h3>

                                <p
                                  className="
                                    commerce-sans
                                    mt-2
                                    text-[0.78rem]
                                    font-[600]
                                    text-[var(--commerce-ink-soft)]
                                  "
                                >
                                  {formatPrice(
                                    product.price
                                  )}{" "}
                                  c/u
                                </p>
                              </div>

                              <p
                                className="
                                  commerce-sans
                                  shrink-0
                                  text-[0.94rem]
                                  font-[750]
                                  tabular-nums
                                  tracking-[-0.03em]
                                  text-[var(--commerce-ink)]
                                "
                              >
                                {formatPrice(
                                  lineTotal
                                )}
                              </p>
                            </div>

                            <div
                              className="
                                mt-5
                                flex
                                items-center
                                justify-between
                                gap-5
                              "
                            >
                              <div
                                className="
                                  flex
                                  h-9
                                  items-center
                                  rounded-full
                                  border
                                  border-[var(--commerce-line-strong)]
                                "
                              >
                                <button
                                  type="button"
                                  aria-label={`Reducir cantidad de ${product.name}`}
                                  onClick={() =>
                                    decrementProduct(
                                      product.id
                                    )
                                  }
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    transition-colors
                                    duration-200
                                    hover:bg-black/[0.04]
                                  "
                                >
                                  <Minus
                                    size={
                                      14
                                    }
                                    weight="regular"
                                  />
                                </button>

                                <span
                                  className="
                                    commerce-sans
                                    min-w-8
                                    text-center
                                    text-[0.76rem]
                                    font-[700]
                                    tabular-nums
                                  "
                                >
                                  {
                                    quantity
                                  }
                                </span>

                                <button
                                  type="button"
                                  aria-label={`Aumentar cantidad de ${product.name}`}
                                  onClick={() =>
                                    incrementProduct(
                                      product.id
                                    )
                                  }
                                  className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-full
                                    transition-colors
                                    duration-200
                                    hover:bg-black/[0.04]
                                  "
                                >
                                  <Plus
                                    size={
                                      14
                                    }
                                    weight="regular"
                                  />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeProduct(
                                    product.id
                                  )
                                }
                                className="
                                  commerce-sans
                                  text-[0.7rem]
                                  font-[650]
                                  text-[var(--commerce-muted)]
                                  transition-colors
                                  duration-200
                                  hover:text-[var(--commerce-ink)]
                                "
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              {/* DESKTOP SUMMARY */}

              <footer
                className="
                  shrink-0
                  border-t
                  border-[var(--commerce-line)]
                  px-8
                  pb-8
                  pt-6
                "
              >
                <div
                  className="
                    space-y-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        commerce-sans
                        text-[0.78rem]
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      Productos
                    </span>

                    <span
                      className="
                        commerce-sans
                        text-[0.86rem]
                        font-[700]
                        tabular-nums
                        text-[var(--commerce-ink)]
                      "
                    >
                      {formatPrice(
                        subtotal
                      )}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >
                    <span
                      className="
                        commerce-sans
                        text-[0.78rem]
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      Envío
                    </span>

                    <span
                      className="
                        commerce-sans
                        text-[0.74rem]
                        font-[600]
                        text-[var(--commerce-muted)]
                      "
                    >
                      Por calcular
                    </span>
                  </div>
                </div>

                <div
                  className="
                    mt-6
                    flex
                    items-end
                    justify-between
                    border-t
                    border-[var(--commerce-line)]
                    pt-5
                  "
                >
                  <span
                    className="
                      commerce-sans
                      pb-1
                      text-[0.8rem]
                      font-[700]
                      text-[var(--commerce-ink)]
                    "
                  >
                    Subtotal
                  </span>

                  <span
                    className="
                      commerce-display
                      text-[2rem]
                      leading-none
                      tracking-[-0.045em]
                      text-[var(--commerce-ink)]
                    "
                  >
                    {formatPrice(
                      subtotal
                    )}
                  </span>
                </div>

<div
  className="
    mt-6
    grid
    grid-cols-[0.72fr_1.28fr]
    gap-3
  "
>
  <motion.button
    type="button"
    onClick={closeCart}
    whileHover={
      reduceMotion
        ? undefined
        : {
            scale: 0.995,
          }
    }
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.985,
          }
    }
    transition={{
      duration: commerceDuration.micro,
      ease: commerceEase.enter,
    }}
    className="
      commerce-sans
      flex
      h-[50px]
      items-center
      justify-center
      rounded-full
      border
      border-[var(--commerce-line-strong)]
      bg-transparent
      px-5
      text-[0.78rem]
      font-[650]
      tracking-[-0.02em]
      text-[var(--commerce-ink)]
      transition-colors
      duration-200
      hover:bg-black/[0.025]
    "
  >
    Seguir comprando
  </motion.button>

  <motion.button
    type="button"
    onClick={handleCompletePurchase}
    whileHover={
      reduceMotion
        ? undefined
        : {
            scale: 0.995,
          }
    }
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.985,
          }
    }
    transition={{
      duration: commerceDuration.micro,
      ease: commerceEase.enter,
    }}
    className="
      commerce-sans
      flex
      h-[50px]
      items-center
      justify-center
      rounded-full
      bg-[var(--commerce-ink)]
      px-6
      text-[0.82rem]
      font-[700]
      tracking-[-0.02em]
      text-[var(--commerce-paper)]
    "
  >
    Completar compra
  </motion.button>
</div>


              </footer>
            </motion.section>
          </motion.div>
        )}
    </AnimatePresence>
  );
}
