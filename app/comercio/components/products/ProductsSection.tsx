"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import MobileProductCatalog from "./MobileProductCatalog";

import ProductCard from "./ProductCard";
import { commerceProducts } from "../../data/products";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const inView = useInView(sectionRef, {
    once: false,
    margin: "-8% 0px -8% 0px",
  });

  return (
    <section
      ref={sectionRef}
      id="productos"
      className="
        relative
        bg-[var(--commerce-paper)]
        py-16

        md:py-24
        lg:py-28
      "
    >
      {/* HEADER */}
      <div
        className="
          mx-auto
          mb-8
          flex
          w-full
          max-w-[1600px]
          items-end
          justify-between
          gap-6
          px-[var(--commerce-page-x)]

          md:mb-12
        "
      >
        <div>
          <motion.p
            className="
              commerce-sans
              text-[0.68rem]
              font-[700]
              uppercase
              tracking-[0.14em]
              text-[var(--commerce-muted)]
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
            Productos
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="
                commerce-display
                mt-2
                text-[clamp(3.3rem,14vw,6rem)]
                leading-[0.86]
                tracking-[-0.065em]
                text-[var(--commerce-ink)]

                md:text-[clamp(4.5rem,7vw,7.8rem)]
              "
              initial={false}
              animate={{
                y: inView ? "0%" : "105%",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.72,
                ease: commerceEase.spatial,
              }}
            >
              Para elegir.
            </motion.h2>
          </div>
        </div>

        <Link
          href="/comercio/tienda"
          className="
            commerce-sans
            group
            mb-1
            inline-flex
            shrink-0
            items-center
            gap-2
            text-[0.82rem]
            font-[650]
            tracking-[-0.025em]
            text-[var(--commerce-ink)]

            md:text-[0.9rem]
          "
        >
          <span
            className="
              border-b
              border-[var(--commerce-line-strong)]
              pb-1
            "
          >
            Ver todos
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
              size={18}
              weight="regular"
            />
          </motion.span>
        </Link>
      </div>

      {/* ================================================= */}
      {/* MOBILE                                             */}
      {/* Flujo de compra vertical.                          */}
      {/* No deriva del layout desktop.                      */}
      {/* ================================================= */}

     <MobileProductCatalog />

      {/* ================================================= */}
      {/* TABLET / DESKTOP                                   */}
      {/* Pared editorial asimétrica.                        */}
      {/* ================================================= */}

      <div
        className="
          mx-auto
          hidden
          w-full
          max-w-[1600px]
          grid-cols-12
          gap-5
          px-[var(--commerce-page-x)]

          md:grid
          lg:gap-7
        "
      >
        {/* 01 — producto protagonista */}
        <div
          className="
            col-span-7
            lg:col-span-7
          "
        >
          <ProductCard
            product={commerceProducts[0]}
            index={0}
          />
        </div>

        {/* 02 */}
        <div
          className="
            col-span-5
            translate-y-12
            lg:col-span-5
          "
        >
          <ProductCard
            product={commerceProducts[1]}
            index={1}
          />
        </div>

        {/* 03 */}
        <div
          className="
            col-span-5
            mt-14
            lg:col-span-4
          "
        >
          <ProductCard
            product={commerceProducts[2]}
            index={2}
          />
        </div>

        {/* 04 — pieza ancha */}
        <div
          className="
            col-span-7
            mt-6
            lg:col-span-8
          "
        >
          <ProductCard
            product={commerceProducts[3]}
            index={3}
          />
        </div>

        {/* 05 */}
        <div
          className="
            col-span-6
            mt-10
            lg:col-span-5
            lg:col-start-8
          "
        >
          <ProductCard
            product={commerceProducts[4]}
            index={4}
          />
        </div>
      </div>

      {/* cierre visual */}
      <motion.div
        aria-hidden="true"
        className="
          mx-auto
          mt-14
          h-px
          w-[calc(100%-var(--commerce-page-x)*2)]
          max-w-[calc(1600px-var(--commerce-page-x)*2)]
          origin-left
          bg-[var(--commerce-line)]

          md:mt-24
        "
        initial={false}
        animate={{
          scaleX: inView ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          ease: commerceEase.spatial,
        }}
      />
    </section>
  );
}
