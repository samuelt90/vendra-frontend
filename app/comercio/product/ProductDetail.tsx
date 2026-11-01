"use client";
import BusinessPurchasePanel from "../components/wholesale/BusinessPurchasePanel";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CaretDown,
  Check,
  CheckCircle,
  Package,
  Plus,
  DeviceMobile,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";
import AddToCartButton from "../components/cart/AddCartButton";
import ProductGallery from "./ProductGallery";
import { useCommerceCart } from "../components/cart/CommerceCartProvider";
import MobileProductCard from "../components/products/MobileProductCard";
import ProductCard from "../components/products/ProductCard";

import type { CommerceProduct } from "../data/products";

import {
  commerceDuration,
  commerceEase,
} from "../styles/motion";

type ProductDetailProps = {
  product: CommerceProduct;
  similarProducts: CommerceProduct[];
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
const purchaseNoteIcons = {
  package: Package,
  compatibility: DeviceMobile,
  warranty: ShieldCheck,
  delivery: Truck,
};

export default function ProductDetail({
  product,
  similarProducts,
}: ProductDetailProps) {
  const reduceMotion = useReducedMotion();
  const {addProduct} = useCommerceCart();
  const [businessPurchaseOpen, setBusinessPurchaseOpen,] = useState(false);
  const [
    specificationsOpen,
    setSpecificationsOpen,
  ] = useState(false);

  return (
    <article
      className="
        bg-[var(--commerce-bg)]
        pb-28
        pt-24

        md:pb-24
        md:pt-32
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-[var(--commerce-page-x)]
        "
      >
        {/* REGRESAR */}
        <Link
          href="/comercio/buscar"
          className="
            commerce-sans
            mb-6
            inline-flex
            min-h-10
            items-center
            gap-2
            text-[0.78rem]
            font-[650]
            tracking-[-0.02em]
            text-[var(--commerce-muted)]

            md:mb-8
          "
        >
          <ArrowLeft
            size={17}
            weight="regular"
          />

          {product.category}
        </Link>

        {/* ================================================= */}
        {/* PRODUCTO PRINCIPAL                                */}
        {/* ================================================= */}

 <div
  className="
    grid
    min-w-0
    grid-cols-1
    gap-8

    md:grid-cols-12
    md:items-start
    md:gap-8

    lg:gap-12
  "
>
          {/* GALERÍA */}
          <div
            className="
              min-w-0
              w-full
              md:col-span-7
              lg:col-span-7
            "
          >
            <ProductGallery
              name={product.name}
              cover={product.image}
              images={product.images}
            />
          </div>

          {/* INFORMACIÓN */}
<div
  className="
    min-w-0
    w-full
    max-w-full

    md:col-span-5
    md:sticky
    md:top-24
    lg:top-28
  "
>
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <div>
                {product.badge && (
                  <span
                    className={`
                      commerce-sans
                      inline-flex
                      min-h-7
                      items-center
                      px-3
                      text-[0.62rem]
                      font-[750]
                      uppercase
                      tracking-[0.1em]

                      ${getBadgeStyle(product.badge)}
                    `}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <span
                className="
                  commerce-sans
                  text-[0.65rem]
                  font-[650]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--commerce-muted)]
                "
              >
                {product.category}
              </span>
            </div>

            {/* NOMBRE */}
            <div className="mt-6 overflow-hidden">
              <motion.h1
                className="
                  commerce-display
                  text-[clamp(3.3rem,13vw,5.6rem)]
                  leading-[0.84]
                  tracking-[-0.065em]
                  text-[var(--commerce-ink)]

                  md:text-[clamp(4rem,5.3vw,6.4rem)]
                "
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        y: "105%",
                      }
                }
                animate={{
                  y: "0%",
                }}
                transition={{
                  duration: 0.72,
                  ease: commerceEase.spatial,
                }}
              >
                {product.name}
              </motion.h1>
            </div>

            {/* PRECIO */}
            <motion.div
              className="
                mt-7
                flex
                items-end
                gap-3
              "
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.14,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              <p
                className="
                  commerce-sans
                  text-[1.7rem]
                  font-[750]
                  tracking-[-0.055em]
                  text-[var(--commerce-ink)]

                  md:text-[1.9rem]
                "
              >
                {formatPrice(product.price)}
              </p>

              {product.previousPrice && (
                <p
                  className="
                    commerce-sans
                    pb-1
                    text-[0.85rem]
                    text-[var(--commerce-muted)]
                    line-through
                  "
                >
                  {formatPrice(
                    product.previousPrice
                  )}
                </p>
              )}
            </motion.div>

            {/* DISPONIBILIDAD */}
            <div
              className="
                mt-4
                flex
                items-center
                gap-2
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[var(--commerce-olive)]
                "
              />

              <span
                className="
                  commerce-sans
                  text-[0.78rem]
                  font-[650]
                  tracking-[-0.015em]
                  text-[var(--commerce-ink-soft)]
                "
              >
                {product.status ?? "Disponible"}
              </span>
            </div>

            {/* DESCRIPCIÓN */}
            <motion.p
              className="
                commerce-sans
                mt-6
                max-w-[36rem]
                text-[0.94rem]
                leading-[1.65]
                tracking-[-0.025em]
                text-[var(--commerce-ink-soft)]
              "
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: reduceMotion ? 0 : 0.2,
                duration: commerceDuration.interface,
                ease: commerceEase.enter,
              }}
            >
              {product.description}
            </motion.p>


            {/* MÁS DETALLES */}
<div
  className="
    mt-5
    border-y
    border-[var(--commerce-line)]
  "
>
  <button
    type="button"
    onClick={() =>
      setSpecificationsOpen((current) => !current)
    }
    aria-expanded={specificationsOpen}
    className="
      commerce-sans
      flex
      min-h-[58px]
      w-full
      items-center
      justify-between
      gap-5
      text-left
      text-[0.82rem]
      font-[650]
      tracking-[-0.025em]
      text-[var(--commerce-ink)]
    "
  >
    <span>Más detalles</span>

    <motion.span
      aria-hidden="true"
      animate={{
        rotate: specificationsOpen ? 180 : 0,
      }}
      transition={{
        duration: commerceDuration.fast,
        ease: commerceEase.enter,
      }}
      className="
        inline-flex
        text-[var(--commerce-muted)]
      "
    >
      <CaretDown
        size={17}
        weight="regular"
      />
    </motion.span>
  </button>

  <AnimatePresence initial={false}>
    {specificationsOpen && (
      <motion.div
        initial={{
          height: 0,
          opacity: 0,
        }}
        animate={{
          height: "auto",
          opacity: 1,
        }}
        exit={{
          height: 0,
          opacity: 0,
        }}
        transition={{
          duration: reduceMotion
            ? commerceDuration.micro
            : 0.4,
          ease: commerceEase.spatial,
        }}
        className="overflow-hidden"
      >
        <div
          className="
            border-t
            border-[var(--commerce-line)]
            pb-2
          "
        >
          {product.specifications.map((specification) => (
            <div
              key={specification.label}
              className="
                grid
                min-h-[54px]
                grid-cols-[0.9fr_1.1fr]
                items-center
                gap-4
                border-b
                border-[var(--commerce-line)]
                last:border-b-0
              "
            >
              <span
                className="
                  commerce-sans
                  text-[0.7rem]
                  font-[600]
                  text-[var(--commerce-muted)]
                "
              >
                {specification.label}
              </span>

              <span
                className="
                  commerce-sans
                  text-right
                  text-[0.78rem]
                  font-[620]
                  tracking-[-0.02em]
                "
              >
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>


    {/* AGREGAR */}
<div className="mt-8">
  <AddToCartButton
    product={product}
  />
</div>

            {/* MAYORISTA */}
            {product.wholesaleEnabled && (
              <div
                className="
                  mt-7
                  border-y
                  border-[var(--commerce-line)]
                  py-5
                "
              >
                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >
                  <Package
                    size={22}
                    weight="regular"
                    className="
                      mt-0.5
                      shrink-0
                      text-[var(--commerce-muted)]
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        commerce-sans
                        text-[0.88rem]
                        font-[650]
                        tracking-[-0.03em]
                        text-[var(--commerce-ink)]
                      "
                    >
                      ¿Necesitas varias unidades?
                    </p>

                    <p
                      className="
                        commerce-sans
                        mt-1
                        max-w-[30rem]
                        text-[0.76rem]
                        leading-[1.5]
                        text-[var(--commerce-muted)]
                      "
                    >
                      Consulta disponibilidad y condiciones para compras por cantidad.
                    </p>
<button
  type="button"
  onClick={() =>
    setBusinessPurchaseOpen(true)
  }
  className="
    commerce-sans
    group
    mt-4
    inline-flex
    items-center
    gap-2
    border-b
    border-[var(--commerce-line-strong)]
    pb-1
    text-[0.78rem]
    font-[650]
    tracking-[-0.02em]
    text-[var(--commerce-ink)]
  "
>
  Comprar por mayor

  <ArrowRight
    size={15}
    weight="regular"
    className="
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
  />
</button>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================================================= */}
        {/* MOBILE - INFORMACIÓN COMPACTA                     */}
        {/* ================================================= */}

        <section
          className="
            mt-14
            md:hidden
          "
        >
          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
              >
                Lo importante
              </p>

              <h2
                className="
                  commerce-display
                  mt-2
                  max-w-[8ch]
                  text-[2.7rem]
                  leading-[0.88]
                  tracking-[-0.06em]
                "
              >
                Antes de comprar.
              </h2>
            </div>

            <span
              className="
                commerce-sans
                shrink-0
                pb-1
                text-[0.62rem]
                font-[700]
                tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              {String(
                product.features.length
              ).padStart(2, "0")}
            </span>
          </div>

          {/* FEATURES HORIZONTALES */}
          <div
            className="
              -mx-[var(--commerce-page-x)]
              mt-7
              flex
              snap-x
              snap-mandatory
              gap-3
              overflow-x-auto
              px-[var(--commerce-page-x)]
              pb-2

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
{product.purchaseNotes.map((note, index) => {
  const Icon = purchaseNoteIcons[note.icon];

  return (
    
    <article
      key={note.title}
      className="
        flex
        min-h-[190px]
        w-[78vw]
        max-w-[290px]
        shrink-0
        snap-start
        flex-col
        justify-between
        border-r
        border-[var(--commerce-line)]
        pr-6
      "
    >
      <div>
        <div
          className="
            flex
            items-start
            justify-between
            gap-5
          "
        >
          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[var(--commerce-line-strong)]
              text-[var(--commerce-ink)]
            "
          >
            <Icon
              size={17}
              weight="regular"
            />
          </span>

          <span
            className="
              commerce-sans
              text-[0.62rem]
              font-[650]
              tracking-[0.12em]
              text-[var(--commerce-muted)]
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="
            commerce-sans
            mt-7
            text-[0.94rem]
            font-[700]
            leading-[1.2]
            tracking-[-0.035em]
            text-[var(--commerce-ink)]
          "
        >
          {note.title}
        </h3>

        <p
          className="
            commerce-sans
            mt-3
            text-[0.76rem]
            leading-[1.55]
            text-[var(--commerce-ink-soft)]
          "
        >
          {note.description}
        </p>
      </div>
    </article>
  );
})}

 
          </div>

 
        </section>

        {/* ================================================= */}
        {/* DESKTOP - CARACTERÍSTICAS                         */}
        {/* ================================================= */}

        <div className="hidden md:block">
          <section
            className="
              mt-28
              border-t
              border-[var(--commerce-line)]
              pt-14
            "
          >
            <div
              className="
                grid
                grid-cols-12
                gap-8
              "
            >
              <div className="col-span-4">
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Lo importante
                </p>

                <h2
                  className="
                    commerce-display
                    mt-4
                    max-w-[8ch]
                    text-[clamp(3.8rem,5vw,6rem)]
                    leading-[0.87]
                    tracking-[-0.06em]
                  "
                >
                  Lo que debes saber.
                </h2>
              </div>

              <div
                className="
                  col-span-8
                  grid
                  grid-cols-2
                  gap-x-10
                  gap-y-8
                "
              >
                {product.features.map(
                  (feature, index) => (
                    <motion.div
                      key={feature}
                      className="
                        border-t
                        border-[var(--commerce-line)]
                        pt-4
                      "
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.4,
                      }}
                      transition={{
                        delay:
                          reduceMotion
                            ? 0
                            : index *
                              0.05,
                        duration:
                          commerceDuration.interface,
                        ease:
                          commerceEase.enter,
                      }}
                    >
                      <CheckCircle
                        size={19}
                        weight="regular"
                        className="
                          text-[var(--commerce-olive)]
                        "
                      />

                      <p
                        className="
                          commerce-sans
                          mt-5
                          text-[0.9rem]
                          font-[600]
                          leading-[1.35]
                          tracking-[-0.025em]
                        "
                      >
                        {feature}
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* ESPECIFICACIONES DESKTOP */}
          <section className="mt-28">
            <div
              className="
                grid
                grid-cols-12
                gap-8
              "
            >
              <div className="col-span-4">
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Características
                </p>

                <h2
                  className="
                    commerce-display
                    mt-4
                    text-[clamp(2.8rem,5vw,4.8rem)]
                    leading-[0.88]
                    tracking-[-0.06em]
                  "
                >
                  Especificaciones.
                </h2>
              </div>

              <div
                className="
                  col-span-8
                  border-t
                  border-[var(--commerce-line)]
                "
              >
                {product.specifications.map(
                  (specification) => (
                    <div
                      key={
                        specification.label
                      }
                      className="
                        grid
                        min-h-[66px]
                        grid-cols-[1fr_1.2fr]
                        items-center
                        gap-5
                        border-b
                        border-[var(--commerce-line)]
                      "
                    >
                      <span
                        className="
                          commerce-sans
                          text-[0.76rem]
                          font-[600]
                          text-[var(--commerce-muted)]
                        "
                      >
                        {
                          specification.label
                        }
                      </span>

                      <span
                        className="
                          commerce-sans
                          text-[0.86rem]
                          font-[620]
                          tracking-[-0.025em]
                        "
                      >
                        {
                          specification.value
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        </div>

        {/* ================================================= */}
        {/* PRODUCTOS SIMILARES                               */}
        {/* ================================================= */}

        {similarProducts.length > 0 && (
          <section
            className="
              mt-16
              border-t
              border-[var(--commerce-line)]
              pt-10

              md:mt-32
              md:pt-14
            "
          >
            <div
              className="
                mb-7
                flex
                items-end
                justify-between
                gap-5

                md:mb-12
              "
            >
              <div>
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  También podría interesarte
                </p>

                {/* MOBILE */}
                <h2
                  className="
                    commerce-display
                    mt-2
                    text-[2.65rem]
                    leading-[0.88]
                    tracking-[-0.06em]

                    md:hidden
                  "
                >
                  Más para ti.
                </h2>

 {/* DESKTOP */}
<h2
  className="
    commerce-display
    mt-3
    hidden
    text-[clamp(3rem,5vw,5.8rem)]
    leading-[0.86]
    tracking-[-0.06em]

    md:block
  "
>
  Más para ti.
</h2>

              </div>

              <ArrowRight
                size={20}
                weight="regular"
                className="
                  mb-1
                  text-[var(--commerce-muted)]

                  md:hidden
                "
              />
            </div>

            {/* MOBILE */}
            <div
              className="
                -mx-[var(--commerce-page-x)]
                flex
                snap-x
                snap-mandatory
                gap-3
                overflow-x-auto
                px-[var(--commerce-page-x)]
                pb-4

                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden

                md:hidden
              "
            >
              {similarProducts.map(
                (similar, index) => (
                  <div
                    key={similar.id}
                    className="
                      w-[46vw]
                      min-w-[165px]
                      max-w-[210px]
                      shrink-0
                      snap-start
                    "
                  >
                    <MobileProductCard
                      product={similar}
                      index={index}
                    />
                  </div>
                )
              )}
            </div>

            {/* DESKTOP */}
            <div
              className="
                hidden
                grid-cols-3
                gap-6

                md:grid
              "
            >
              {similarProducts.map(
                (similar, index) => (
                  <ProductCard
                    key={similar.id}
                    product={similar}
                    index={index}
                  />
                )
              )}
            </div>
          </section>
        )}
      </div>
      <BusinessPurchasePanel
        product={product}
        open={businessPurchaseOpen}
        onClose={() =>
          setBusinessPurchaseOpen(false)
        }
      />

    </article>

);
}