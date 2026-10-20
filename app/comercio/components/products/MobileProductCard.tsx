"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import type { CommerceProduct } from "../../data/products";
import { useCommerceCart } from "../cart/CommerceCartProvider";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type MobileProductCardProps = {
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

function getProductSurface(index: number) {
  switch (index % 5) {
    case 0:
      return "bg-[#e8e1d5]";

    case 1:
      return "bg-[#e4dfd4]";

    case 2:
      return "bg-[#e5e6de]";

    case 3:
      return "bg-[#ded8cf]";

    default:
      return "bg-[#ebe5dc]";
  }
}

export default function MobileProductCard({
  product,
  index,
}: MobileProductCardProps) {
  const reduceMotion = useReducedMotion();
  const { addProduct } = useCommerceCart();


  return (
    <motion.article
      layout
      initial={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 14,
              scale: 0.98,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 8,
              scale: 0.97,
            }
      }
      transition={{
        duration: reduceMotion
          ? commerceDuration.micro
          : 0.44,
        delay: reduceMotion
          ? 0
          : Math.min(index * 0.035, 0.18),
        ease: commerceEase.spatial,
        layout: {
          duration: 0.42,
          ease: commerceEase.spatial,
        },
      }}
      className="
        relative
        min-w-0
        overflow-hidden
        rounded-[20px_20px_10px_20px]
        border
        border-[var(--commerce-line)]
        bg-[var(--commerce-paper)]
      "
    >
      {/* PRODUCTO / IMAGEN */}
      <Link
        href={product.href}
        aria-label={`Ver ${product.name}`}
        className="
          group
          relative
          block
        "
      >
        <div
          className={`
            relative
            aspect-[0.92]
            overflow-hidden

            ${getProductSurface(index)}
          `}
        >
          {product.badge && (
            <span
              className={`
                commerce-sans
                absolute
                left-2.5
                top-2.5
                z-20
                max-w-[calc(100%-1.25rem)]
                px-2
                py-1.5
                text-[0.54rem]
                font-[750]
                uppercase
                leading-none
                tracking-[0.07em]

                ${getBadgeStyle(product.badge)}
              `}
            >
              {product.badge}
            </span>
          )}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              p-4
              pt-8
            "
          >
            <motion.div
              className="
                relative
                h-full
                w-full
              "
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale: 0.97,
                  }
              }
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 46vw, 25vw"
                className="
                  object-contain
                  drop-shadow-[0_16px_22px_rgba(23,22,18,0.10)]
                  transition-transform
                  duration-500
                  ease-out
                  group-active:scale-[0.98]
                "
              />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* INFORMACIÓN */}
      <div
        className="
          flex
          min-h-[150px]
          flex-col
          px-3
          pb-3
          pt-3
        "
      >
        <p
          className="
            commerce-sans
            text-[0.59rem]
            font-[650]
            uppercase
            tracking-[0.09em]
            text-[var(--commerce-muted)]
          "
        >
          {product.category}
        </p>

        <Link
          href={product.href}
          className="
            commerce-sans
            mt-1.5
            line-clamp-2
            text-[0.9rem]
            font-[650]
            leading-[1.15]
            tracking-[-0.035em]
            text-[var(--commerce-ink)]
          "
        >
          {product.name}
        </Link>

        <div
          className="
            mt-3
            flex
            items-start
            justify-between
            gap-2
          "
        >
          <div>
            <p
              className="
                commerce-sans
                text-[1rem]
                font-[750]
                tracking-[-0.045em]
                text-[var(--commerce-ink)]
              "
            >
              {formatPrice(product.price)}
            </p>

            {product.previousPrice && (
              <p
                className="
                  commerce-sans
                  mt-0.5
                  text-[0.65rem]
                  text-[var(--commerce-muted)]
                  line-through
                "
              >
                {formatPrice(product.previousPrice)}
              </p>
            )}
          </div>

 {product.canAddDirectly && (
  <motion.button
    type="button"
    aria-label={`Agregar ${product.name}`}
    onClick={() => addProduct(product)}
    whileTap={
      reduceMotion
        ? undefined
        : {
            scale: 0.88,
          }
    }
    className="
      flex
      h-9
      w-9
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-[var(--commerce-ink)]
      text-[var(--commerce-paper)]
    "
  >
    <Plus
      size={17}
      weight="bold"
    />
  </motion.button>
)}

        </div>

        {product.status && (
          <p
            className="
              commerce-sans
              mt-auto
              pt-3
              text-[0.64rem]
              font-[650]
              tracking-[-0.01em]
              text-[var(--commerce-accent)]
            "
          >
            {product.status}
          </p>
        )}
      </div>
    </motion.article>
  );
}
