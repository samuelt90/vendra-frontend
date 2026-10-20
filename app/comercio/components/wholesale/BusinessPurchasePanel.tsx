"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Minus,
  Package,
  Plus,
  Tag,
  Truck,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type { CommerceProduct } from "../../data/products";
import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type BusinessPurchasePanelProps = {
  product: CommerceProduct;
  open: boolean;
  onClose: () => void;
};

function formatPrice(value: number) {
  return `Q${value.toLocaleString("es-GT")}`;
}

export default function BusinessPurchasePanel({
  product,
  open,
  onClose,
}: BusinessPurchasePanelProps) {
  const reduceMotion = useReducedMotion();

  const [quantity, setQuantity] =
    useState(12);

  const regularTotal = useMemo(
    () => product.price * quantity,
    [product.price, quantity]
  );

  useEffect(() => {
    if (!open) return;

    const previous =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previous;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, onClose]);

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(2, current - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((current) =>
      current + 1
    );
  }

  function handleWhatsApp() {
    const configuredNumber =
      process.env
        .NEXT_PUBLIC_COMMERCE_WHATSAPP_NUMBER;

    const phone =
      configuredNumber?.replace(
        /\D/g,
        ""
      ) ?? "";

    const message = [
      "Hola, quiero comprar por mayor:",
      "",
      `Producto: ${product.name}`,
      `Cantidad: ${quantity} unidades`,
      `Precio regular: ${formatPrice(
        product.price
      )} c/u`,
      `Total a precio regular: ${formatPrice(
        regularTotal
      )}`,
      "",
      "Quiero conocer el mejor precio disponible para esta cantidad y coordinar la entrega.",
    ].join("\n");

    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(
          message
        )}`
      : `https://wa.me/?text=${encodeURIComponent(
          message
        )}`;

    const isMobile =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    if (isMobile) {
      window.location.href = url;
      return;
    }

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[170]
          "
        >
          {/* BACKDROP */}

          <motion.button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="
              absolute
              inset-0
              h-full
              w-full
              cursor-default
              bg-black/40
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          />

          {/* ================================= */}
          {/* MÓVIL                             */}
          {/* ================================= */}

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Compra para tu negocio"
            className="
              absolute
              inset-x-0
              bottom-0
              flex
              max-h-[94dvh]
              flex-col
              overflow-hidden
              rounded-t-[30px]
              bg-[var(--commerce-paper)]

              md:hidden
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { y: "100%" }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { y: "100%" }
            }
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : 0.58,
              ease: commerceEase.spatial,
            }}
          >
            <div
              className="
                flex
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
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Para tu negocio
                </p>

                <h2
                  className="
                    commerce-display
                    mt-2
                    text-[2.45rem]
                    leading-[0.9]
                    tracking-[-0.055em]
                  "
                >
                  Compra por mayor.
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[var(--commerce-line)]
                "
              >
                <X
                  size={18}
                  weight="regular"
                />
              </button>
            </div>

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-5
                pb-8
              "
            >
              <WholesaleContent
                product={product}
                quantity={quantity}
                regularTotal={
                  regularTotal
                }
                decreaseQuantity={
                  decreaseQuantity
                }
                increaseQuantity={
                  increaseQuantity
                }
                reduceMotion={
                  reduceMotion
                }
              />
            </div>

            <div
              className="
                shrink-0
                border-t
                border-[var(--commerce-line)]
                bg-[var(--commerce-paper)]
                px-5
                pb-[calc(env(safe-area-inset-bottom)+18px)]
                pt-4
              "
            >
              <motion.button
                type="button"
                onClick={handleWhatsApp}
                whileTap={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 0.985,
                      }
                }
                className="
                  commerce-sans
                  flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[var(--commerce-ink)]
                  px-6
                  text-[0.82rem]
                  font-[700]
                  text-[var(--commerce-paper)]
                "
              >
                <WhatsappLogo
                  size={18}
                  weight="regular"
                />

                <span>
                  Solicitar{" "}
                  <AnimatedNumber
                    value={quantity}
                  />{" "}
                  unidades por WhatsApp
                </span>
              </motion.button>
            </div>
          </motion.section>

          {/* ================================= */}
          {/* DESKTOP                           */}
          {/* ================================= */}

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Compra para tu negocio"
            className="
              absolute
              bottom-0
              right-0
              top-0
              hidden
              w-[min(560px,46vw)]
              min-w-[480px]
              flex-col
              bg-[var(--commerce-paper)]

              md:flex
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%" }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { x: "100%" }
            }
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : 0.62,
              ease: commerceEase.spatial,
            }}
          >
            <div
              className="
                flex
                items-start
                justify-between
                border-b
                border-[var(--commerce-line)]
                px-9
                pb-7
                pt-8
              "
            >
              <div>
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Para tu negocio
                </p>

                <h2
                  className="
                    commerce-display
                    mt-2
                    text-[3rem]
                    leading-[0.9]
                    tracking-[-0.055em]
                  "
                >
                  Compra por mayor.
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
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
            </div>

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-9
                pb-10
              "
            >
              <WholesaleContent
                product={product}
                quantity={quantity}
                regularTotal={
                  regularTotal
                }
                decreaseQuantity={
                  decreaseQuantity
                }
                increaseQuantity={
                  increaseQuantity
                }
                reduceMotion={
                  reduceMotion
                }
              />
            </div>

            <div
              className="
                shrink-0
                border-t
                border-[var(--commerce-line)]
                px-9
                pb-8
                pt-5
              "
            >
              <motion.button
                type="button"
                onClick={handleWhatsApp}
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
                className="
                  commerce-sans
                  flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-[var(--commerce-ink)]
                  px-7
                  text-[0.84rem]
                  font-[700]
                  text-[var(--commerce-paper)]
                "
              >
                <WhatsappLogo
                  size={18}
                  weight="regular"
                />

                <span>
                  Solicitar{" "}
                  <AnimatedNumber
                    value={quantity}
                  />{" "}
                  unidades por WhatsApp
                </span>
              </motion.button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================= */
/* CONTENIDO                                         */
/* ================================================= */

type WholesaleContentProps = {
  product: CommerceProduct;
  quantity: number;
  regularTotal: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  reduceMotion: boolean | null;
};

function WholesaleContent({
  product,
  quantity,
  regularTotal,
  decreaseQuantity,
  increaseQuantity,
  reduceMotion,
}: WholesaleContentProps) {
  const benefits = [
    {
      icon: Tag,
      title: "Mejor precio",
      description:
        "El precio por unidad puede mejorar según la cantidad que necesites.",
    },
    {
      icon: Package,
      title: "Disponibilidad",
      description:
        "Revisamos que tengamos las unidades antes de confirmar.",
    },
    {
      icon: Truck,
      title: "Entrega",
      description:
        "Coordinamos el envío según tu pedido y ubicación.",
    },
  ];

  return (
    <>
      {/* PRODUCTO */}

      <div
        className="
          border-b
          border-[var(--commerce-line)]
          py-7
        "
      >
        <p
          className="
            commerce-sans
            text-[0.67rem]
            font-[650]
            uppercase
            tracking-[0.09em]
            text-[var(--commerce-muted)]
          "
        >
          {product.category}
        </p>

        <h3
          className="
            commerce-sans
            mt-1.5
            text-[1rem]
            font-[700]
            tracking-[-0.03em]
          "
        >
          {product.name}
        </h3>
      </div>

      {/* ================================= */}
      {/* DEMOSTRACIÓN DE PRECIO            */}
      {/* ================================= */}

      <div className="py-8">
        <p
          className="
            commerce-sans
            text-[0.72rem]
            font-[650]
            text-[var(--commerce-muted)]
          "
        >
          Precio regular
        </p>

        <div
          className="
            mt-2
            flex
            items-baseline
            gap-2
          "
        >
          <p
            className="
              commerce-display
              text-[3rem]
              leading-none
              tracking-[-0.055em]
            "
          >
            {formatPrice(product.price)}
          </p>

          <span
            className="
              commerce-sans
              text-[0.72rem]
              font-[650]
              text-[var(--commerce-muted)]
            "
          >
            c/u
          </span>
        </div>

        {/* CANTIDAD + TOTAL */}

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-5
            border-y
            border-[var(--commerce-line)]
            py-6
          "
        >
          <div>
            <p
              className="
                commerce-sans
                text-[0.65rem]
                font-[650]
                uppercase
                tracking-[0.08em]
                text-[var(--commerce-muted)]
              "
            >
              Cantidad
            </p>

            <div
              className="
                mt-2
                flex
                items-baseline
                gap-2
              "
            >
              <AnimatedNumber
                value={quantity}
                large
              />

              <span
                className="
                  commerce-sans
                  text-[0.7rem]
                  text-[var(--commerce-muted)]
                "
              >
                unidades
              </span>
            </div>
          </div>

          <div>
            <p
              className="
                commerce-sans
                text-[0.65rem]
                font-[650]
                uppercase
                tracking-[0.08em]
                text-[var(--commerce-muted)]
              "
            >
              Total regular
            </p>

            <AnimatePresence
              mode="popLayout"
              initial={false}
            >
              <motion.p
                key={regularTotal}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 7,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: -7,
                      }
                }
                transition={{
                  duration: 0.26,
                  ease:
                    commerceEase.spatial,
                }}
                className="
                  commerce-display
                  mt-2
                  text-[2rem]
                  leading-none
                  tracking-[-0.05em]
                "
              >
                {formatPrice(
                  regularTotal
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* MEJOR PRECIO */}

        <motion.div
          key={quantity}
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  x: -8,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: reduceMotion
              ? 0
              : 0.08,
            duration: 0.36,
            ease: commerceEase.spatial,
          }}
          className="
            mt-5
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <div>
            <p
              className="
                commerce-sans
                text-[0.7rem]
                font-[700]
                uppercase
                tracking-[0.08em]
                text-[var(--commerce-accent)]
              "
            >
              Mejor precio
            </p>

            <p
              className="
                commerce-sans
                mt-1
                max-w-[34ch]
                text-[0.75rem]
                leading-[1.5]
                text-[var(--commerce-ink-soft)]
              "
            >
              Podemos mejorar esta condición
              para tu pedido.
            </p>
          </div>

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 5, 0],
                  }
            }
            transition={{
              duration: 0.7,
              ease: commerceEase.smooth,
            }}
            className="
              commerce-display
              text-[1.75rem]
              text-[var(--commerce-accent)]
            "
          >
            →
          </motion.span>
        </motion.div>
      </div>

      {/* ================================= */}
      {/* BENEFICIOS                        */}
      {/* ================================= */}

      <div
        className="
          border-t
          border-[var(--commerce-line)]
          py-8
        "
      >
        <h3
          className="
            commerce-display
            max-w-[380px]
            text-[2.35rem]
            leading-[0.94]
            tracking-[-0.05em]
          "
        >
          Compra por mayor y aprovecha
          nuestros beneficios.
        </h3>

        <div className="mt-8">
          {benefits.map(
            (
              {
                icon: Icon,
                title,
                description,
              },
              index
            ) => (
              <motion.div
                key={title}
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  delay: reduceMotion
                    ? 0
                    : index * 0.07,
                  duration:
                    commerceDuration.interface,
                  ease:
                    commerceEase.enter,
                }}
                className="
                  grid
                  grid-cols-[38px_minmax(0,1fr)]
                  gap-4
                  border-t
                  border-[var(--commerce-line)]
                  py-5
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--commerce-line-strong)]
                  "
                >
                  <Icon
                    size={17}
                    weight="regular"
                  />
                </div>

                <div>
                  <p
                    className="
                      commerce-sans
                      text-[0.82rem]
                      font-[700]
                      tracking-[-0.02em]
                    "
                  >
                    {title}
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-1.5
                      max-w-[38ch]
                      text-[0.74rem]
                      leading-[1.55]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {description}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* ================================= */}
      {/* SELECTOR                          */}
      {/* ================================= */}

      <div
        className="
          border-t
          border-[var(--commerce-line)]
          py-8
        "
      >
        <p
          className="
            commerce-sans
            text-[0.78rem]
            font-[700]
          "
        >
          ¿Cuántas unidades necesitas?
        </p>

        <div
          className="
            mt-5
            grid
            grid-cols-[56px_minmax(0,1fr)_56px]
            items-center
            rounded-full
            border
            border-[var(--commerce-line-strong)]
          "
        >
          <motion.button
            type="button"
            onClick={decreaseQuantity}
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.9,
                  }
            }
            className="
              flex
              h-14
              items-center
              justify-center
            "
          >
            <Minus
              size={17}
              weight="regular"
            />
          </motion.button>

          <div
            className="
              flex
              items-center
              justify-center
              border-x
              border-[var(--commerce-line)]
            "
          >
            <AnimatedNumber
              value={quantity}
              selector
            />
          </div>

          <motion.button
            type="button"
            onClick={increaseQuantity}
            whileTap={
              reduceMotion
                ? undefined
                : {
                    scale: 0.9,
                  }
            }
            className="
              flex
              h-14
              items-center
              justify-center
            "
          >
            <Plus
              size={17}
              weight="regular"
            />
          </motion.button>
        </div>
      </div>
    </>
  );
}

/* ================================================= */
/* NÚMERO ANIMADO                                    */
/* ================================================= */

function AnimatedNumber({
  value,
  large = false,
  selector = false,
}: {
  value: number;
  large?: boolean;
  selector?: boolean;
}) {
  return (
    <span
      className="
        relative
        inline-flex
        min-w-[2ch]
        overflow-hidden
      "
    >
      <AnimatePresence
        mode="popLayout"
        initial={false}
      >
        <motion.span
          key={value}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.24,
            ease: commerceEase.spatial,
          }}
          className={
            selector
              ? `
                  commerce-display
                  block
                  w-full
                  text-center
                  text-[2rem]
                  leading-[3.5rem]
                  tracking-[-0.04em]
                `
              : large
                ? `
                    commerce-display
                    text-[2rem]
                    leading-none
                    tracking-[-0.05em]
                  `
                : `
                    commerce-sans
                    font-[700]
                    tabular-nums
                  `
          }
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
