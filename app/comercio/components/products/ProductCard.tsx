"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import type { CommerceProduct } from "../../data/products";
import AddToCartButton from "../cart/AddCartButton";
import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type ProductCardProps = {
  product: CommerceProduct;
  index: number;
};

function formatPrice(price: number) {
  return `Q${price.toLocaleString("es-GT")}`;
}

function getBadgeStyle(
  badge?: CommerceProduct["badge"]
) {
  switch (badge) {
    case "Nuevo":
      return `
        bg-[var(--commerce-ink)]
        text-[var(--commerce-paper)]
      `;

    case "Últimas unidades":
      return `
        bg-[var(--commerce-accent)]
        text-white
      `;

    case "Precio especial":
      return `
        bg-[var(--commerce-olive)]
        text-white
      `;

    default:
      return "";
  }
}

function getStageSurface(index: number) {
  switch (index % 5) {
    case 0:
      return "bg-[#e8e1d5]";

    case 1:
      return "bg-[#ddd8cc]";

    case 2:
      return "bg-[#e6e7df]";

    case 3:
      return "bg-[#ded7cd]";

    default:
      return "bg-[#e9e3da]";
  }
}

export default function ProductCard({
  product,
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(cardRef, {
    once: false,
    amount: 0.22,
  });

  /*
    Movimiento del producto dentro de su propio marco.
    El card no se desplaza: solo la imagen responde
    ligeramente al scroll.
  */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const productY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion
      ? [0, 0, 0]
      : [24, 0, -20]
  );

  const productScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduceMotion
      ? [1, 1, 1]
      : [0.955, 1, 0.98]
  );

  const stageSurface =
    getStageSurface(index);

  return (
    <motion.article
      ref={cardRef}
      initial={false}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0.5,
              y: 22,
            }
      }
      transition={{
        duration: reduceMotion
          ? commerceDuration.micro
          : 0.62,
        ease: commerceEase.spatial,
      }}
      className="
        relative
        w-full
        overflow-hidden
        rounded-[26px_26px_14px_26px]
        border
        border-[var(--commerce-line)]
        bg-[var(--commerce-paper)]
      "
    >
      {/* ÁREA VISUAL */}
      <div
        className={`
          relative
          min-h-[410px]
          overflow-hidden

          sm:min-h-[450px]

          ${stageSurface}
        `}
      >
        {/* etiqueta */}
        {product.badge && (
          <motion.div
            initial={false}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: -14,
                  }
            }
            transition={{
              delay:
                inView && !reduceMotion
                  ? 0.12
                  : 0,
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
            className="
              absolute
              left-4
              top-4
              z-20
            "
          >
            <span
              className={`
                commerce-sans
                inline-flex
                min-h-7
                items-center
                px-3
                text-[0.64rem]
                font-[750]
                uppercase
                tracking-[0.1em]

                ${getBadgeStyle(
                  product.badge
                )}
              `}
            >
              {product.badge}
            </span>
          </motion.div>
        )}

        {/* categoría */}
        <motion.span
          className="
            commerce-sans
            absolute
            right-4
            top-5
            z-20
            text-[0.65rem]
            font-[650]
            uppercase
            tracking-[0.1em]
            text-[var(--commerce-muted)]
          "
          initial={false}
          animate={{
            opacity: inView ? 1 : 0,
          }}
          transition={{
            duration:
              commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          {product.category}
        </motion.span>

        {/* PRODUCTO */}
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-8
            pb-8
            pt-12
          "
        >
          <motion.div
            style={{
              y: productY,
              scale: productScale,
            }}
            className="
              relative
              h-[300px]
              w-full
              max-w-[330px]

              sm:h-[330px]
            "
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority={index < 2}
              sizes="
                (max-width: 767px) 84vw,
                33vw
              "
              className="
                object-contain
                drop-shadow-[0_26px_34px_rgba(23,22,18,0.12)]
              "
            />
          </motion.div>
        </div>

        {/* numeración editorial */}
        <span
          aria-hidden="true"
          className="
            commerce-sans
            absolute
            bottom-4
            left-4
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
      </div>

      {/* DIVISOR */}
      <motion.div
        aria-hidden="true"
        className="
          h-px
          origin-left
          bg-[var(--commerce-line)]
        "
        initial={false}
        animate={{
          scaleX: inView ? 1 : 0,
        }}
        transition={{
          delay:
            inView && !reduceMotion
              ? 0.12
              : 0,
          duration: 0.7,
          ease: commerceEase.spatial,
        }}
      />

      {/* INFORMACIÓN COMERCIAL */}
      <div
        className="
          px-5
          pb-5
          pt-5

          sm:px-6
          sm:pb-6
        "
      >
        <motion.div
          initial={false}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 12,
                }
          }
          transition={{
            delay:
              inView && !reduceMotion
                ? 0.18
                : 0,
            duration:
              commerceDuration.interface,
            ease: commerceEase.enter,
          }}
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div className="min-w-0">
              <h3
                className="
                  commerce-sans
                  text-[1.03rem]
                  font-[650]
                  leading-[1.2]
                  tracking-[-0.035em]
                  text-[var(--commerce-ink)]

                  sm:text-[1.08rem]
                "
              >
                {product.name}
              </h3>

              {product.status && (
                <p
                  className="
                    commerce-sans
                    mt-2
                    text-[0.76rem]
                    font-[600]
                    tracking-[-0.015em]
                    text-[var(--commerce-muted)]
                  "
                >
                  {product.status}
                </p>
              )}
            </div>

            <div
              className="
                shrink-0
                text-right
              "
            >
              <p
                className="
                  commerce-price
                  text-[1.18rem]
                  font-[700]
                  tracking-[-0.04em]
                  text-[var(--commerce-ink)]
                "
              >
                {formatPrice(
                  product.price
                )}
              </p>

              {product.previousPrice && (
                <p
                  className="
                    commerce-sans
                    mt-1
                    text-[0.72rem]
                    text-[var(--commerce-muted)]
                    line-through
                  "
                >
                  {formatPrice(
                    product.previousPrice
                  )}
                </p>
              )}
            </div>
          </div>

          {/* ACCIONES */}
          <div
            className="
              mt-6
              flex
              min-h-12
              items-center
              justify-between
              gap-5
              border-t
              border-[var(--commerce-line)]
              pt-4
            "
          >
            <Link
              href={product.href}
              className="
                commerce-sans
                group
                inline-flex
                items-center
                gap-2
                text-[0.84rem]
                font-[650]
                tracking-[-0.025em]
                text-[var(--commerce-ink)]
              "
            >
              <span
                className="
                  border-b
                  border-[var(--commerce-line-strong)]
                  pb-1
                "
              >
                Ver producto
              </span>

              <motion.span
                aria-hidden="true"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 4,
                      }
                }
                transition={{
                  duration:
                    commerceDuration.fast,
                  ease: commerceEase.enter,
                }}
              >
                →
              </motion.span>
            </Link>

{product.canAddDirectly && (
  <AddToCartButton
    product={product}
    variant="compact"
  />
)}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
