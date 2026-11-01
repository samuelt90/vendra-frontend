
"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
} from "@phosphor-icons/react";

import type {
  CommerceProduct,
} from "../../data/products";

import ProductSwapStack from "./ProductSwapStack";

type StoreEditorialProductsProps = {
  products: CommerceProduct[];
  onClearFilters: () => void;
};

type StoreCollection = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  products: CommerceProduct[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Ajustar si la ruta mayorista real del proyecto
// utiliza otro nombre.
const WHOLESALE_HREF = "/comercio/mayoristas";

function createCollections(
  products: CommerceProduct[]
): StoreCollection[] {
  const newProducts = products.filter(
    (product) => product.badge === "Nuevo"
  );

  const specialProducts = products.filter(
    (product) =>
      product.badge === "Precio especial"
  );

  const otherProducts = products.filter(
    (product) =>
      product.badge !== "Nuevo" &&
      product.badge !== "Precio especial"
  );

  return [
    {
      id: "new",
      number: "01",
      eyebrow: "RECIÉN LLEGADOS",
      title: "Lo nuevo.",
      description:
        "Productos que se incorporan a nuestra colección.",
      products: newProducts,
    },
    {
      id: "offers",
      number: "02",
      eyebrow: "PRECIOS ESPECIALES",
      title: "Vale la pena verlo.",
      description:
        "Descubre artículos con precios especiales.",
      products: specialProducts,
    },
    {
      id: "catalog",
      number: "03",
      eyebrow: "EXPLORA LA COLECCIÓN",
      title: "Sigue explorando.",
      description:
        "Más productos para tu día a día, trabajo y entretenimiento.",
      products: otherProducts,
    },
  ].filter(
    (collection) => collection.products.length > 0
  );
}

/* =====================================================
   SECCIONES COMERCIALES
===================================================== */

function CollectionSection({
  collection,
}: {
  collection: StoreCollection;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby={`store-section-${collection.id}`}
      className="
        min-w-0 border-t
        border-[var(--commerce-line)]
        pt-7 md:pt-12
      "
    >
      <div
        className="
          commerce-sans
          flex items-center justify-between
          gap-4 text-[10px] font-bold
          uppercase tracking-[0.15em]
          text-[var(--commerce-muted)]
        "
      >
        <span>
          {collection.number} / {collection.eyebrow}
        </span>

        <span className="shrink-0 tabular-nums">
          {String(collection.products.length).padStart(
            2,
            "0"
          )}
        </span>
      </div>

      <div className="mb-5 mt-5 md:mb-12 md:mt-7">
        <div className="overflow-hidden">
          <motion.h3
            id={`store-section-${collection.id}`}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 25 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: EASE,
            }}
            className="
              commerce-display
              max-w-[800px]
              text-[clamp(3rem,10vw,6.5rem)]
              leading-[0.93]
              tracking-[-0.065em]
            "
          >
            {collection.title}
          </motion.h3>
        </div>

        <p
          className="
            commerce-sans
            mt-3 max-w-[420px]
            text-[13px] leading-[1.6]
            text-[var(--commerce-ink-soft)]
            md:text-[15px]
          "
        >
          {collection.description}
        </p>
      </div>

      <ProductSwapStack
        key={
          collection.id +
          ":" +
          collection.products
            .map((product) => product.id)
            .join("|")
        }
        sectionId={collection.id}
        products={collection.products}
      />
    </section>
  );
}

/* =====================================================
   SECCIÓN MAYORISTA

   Cierre editorial, no otra cuadrícula.
   Reutiliza imágenes existentes del catálogo.
===================================================== */

function WholesaleSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="store-wholesale-title"
      className="
        relative mt-24 overflow-hidden
        bg-[#202721] text-[#F6F3EB]
        md:mt-36
      "
    >
      {/* CABECERA */}

      <div
        className="
          relative z-10
          flex items-center justify-between
          gap-4
          border-b border-white/15
          px-6 py-5
          md:px-10 md:py-7
        "
      >
        <span
          className="
            commerce-sans
            text-[10px] font-semibold
            uppercase tracking-[0.18em]
            text-white/65
          "
        >
          Distribución a Mayoristas
        </span>

        <span
          className="
            commerce-sans
            text-[10px] font-semibold
            uppercase tracking-[0.14em]
            text-white/65
          "
        >
          Para negocios
        </span>
      </div>

      <div
        className="
          relative grid
          grid-cols-1
          lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]
          lg:items-center
        "
      >
        {/* MENSAJE */}

        <div
          className="
            relative z-20
            px-6 pb-4 pt-12
            md:px-10 md:pt-16
            lg:pb-20 lg:pt-20
          "
        >
          <motion.div
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 32 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease: EASE,
            }}
          >
            <p
              className="
                commerce-sans
                mb-5 text-[11px]
                font-semibold
                uppercase tracking-[0.18em]
                text-[#C5D3BD]
              "
            >
              Compras por mayor
            </p>

            <h2
              id="store-wholesale-title"
              className="
                commerce-display
                max-w-[760px]
                text-[clamp(3.6rem,10vw,8.8rem)]
                leading-[0.88]
                tracking-[-0.075em]
              "
            >
              Tu negocio.
              <span
                className="
                  mt-1 block
                  text-[#BDD0B5]
                "
              >
                Más opciones.
              </span>
            </h2>

            <p
              className="
                commerce-sans
                mt-7 max-w-[450px]
                text-[14px] leading-[1.8]
                text-white/70
                md:mt-9 md:text-[16px]
              "
            >
              Explora tecnología para abastecer
              tu tienda, ampliar tu catálogo
              y consultar compras por volumen.
              Audio, accesorios, wearables
              y más para tu comercio.
            </p>

            <Link
              href={WHOLESALE_HREF}
              className="
                commerce-sans
                group mt-9 inline-flex
                min-h-14 items-center
                justify-between gap-8
                rounded-full
                bg-[#F6F3EB]
                px-6
                text-[13px] font-bold
                text-[#202721]
                transition-colors
                hover:bg-[#DFE9D8]
                active:scale-[0.98]
                md:mt-11
              "
            >
              Explorar compras por mayor

              <ArrowUpRight
                size={19}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                "
              />
            </Link>
          </motion.div>
        </div>

        {/* COMPOSICIÓN DE PRODUCTOS */}

        <div
          className="
            relative isolate
            h-[310px] w-full
            overflow-hidden
            sm:h-[420px]
            lg:h-full lg:min-h-[520px]
          "
        >
          {/* LUZ AMBIENTAL */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-[15%] top-[10%]
              h-[75%] w-[75%]
              rounded-full
              bg-[#6C886B]/25
              blur-[75px]
            "
          />

          {/* CÍRCULO EDITORIAL */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-[12%] top-[8%]
              aspect-square w-[78%]
              rounded-full
              border border-white/15
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-[22%] top-[18%]
              aspect-square w-[58%]
              rounded-full
              border border-white/10
            "
          />

          {/* PRODUCTOS REALES DEL CATÁLOGO */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 45,
                    rotate: -8,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: -8,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              ease: EASE,
            }}
            className="
              absolute
              bottom-[12%] left-[-3%]
              h-[66%] w-[53%]
              -rotate-[8deg]
            "
          >
            <Image
              src="/comercio/assets/products/audifonos.png"
              alt="Audífonos del catálogo Vendra"
              fill
              sizes="(max-width: 1024px) 53vw, 27vw"
              className="
                object-contain
                drop-shadow-[0_24px_25px_rgba(0,0,0,0.28)]
              "
            />
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 60,
                    rotate: 9,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: 9,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.12,
              ease: EASE,
            }}
            className="
              absolute
              bottom-[5%] right-[-5%]
              h-[70%] w-[55%]
              rotate-[9deg]
            "
          >
            <Image
              src="/comercio/assets/products/teclado.png"
              alt="Teclado del catálogo Vendra"
              fill
              sizes="(max-width: 1024px) 55vw, 28vw"
              className="
                object-contain
                drop-shadow-[0_24px_25px_rgba(0,0,0,0.28)]
              "
            />
          </motion.div>

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 65,
                    scale: 0.9,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              delay: 0.22,
              ease: EASE,
            }}
            className="
              absolute
              bottom-[1%] left-[30%]
              h-[58%] w-[43%]
            "
          >
            <Image
              src="/comercio/assets/products/smartwatch.png"
              alt="Smartwatch del catálogo Vendra"
              fill
              sizes="(max-width: 1024px) 43vw, 21vw"
              className="
                object-contain
                drop-shadow-[0_20px_20px_rgba(0,0,0,0.32)]
              "
            />
          </motion.div>
        </div>
      </div>

      {/* PIE DE LA SECCIÓN */}

      <div
        className="
          relative z-20
          flex flex-wrap items-center
          justify-between gap-3
          border-t border-white/15
          px-6 py-5
          md:px-10
        "
      >
        <span
          className="
            commerce-sans
            text-[10px]
            uppercase tracking-[0.13em]
            text-white/55
          "
        >
          Tecnología para comercios
        </span>

        <span
          className="
            commerce-sans
            flex items-center gap-2
            text-[11px]
            text-white/70
          "
        >
          Consulta opciones por volumen
          <ArrowRight size={15} />
        </span>
      </div>
    </section>
  );
}

/* =====================================================
   ESCAPARATE COMPLETO
===================================================== */

export default function StoreEditorialProducts({
  products,
  onClearFilters,
}: StoreEditorialProductsProps) {
  const collections = useMemo(
    () => createCollections(products),
    [products]
  );

  const reduceMotion = useReducedMotion();

  return (
    <section
      id="commerce-store-products"
      className="
        scroll-mt-[90px]
        pt-14 md:pt-24
      "
    >
      {/* INTRO */}

      <header className="mb-12 md:mb-20">
        <p
          className="
            commerce-sans
            text-[10px] font-bold
            uppercase tracking-[0.15em]
            text-[var(--commerce-muted)]
          "
        >
          VENDRA / LA TIENDA
        </p>

        <div className="overflow-hidden">
          <motion.h2
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 30 }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.65,
              ease: EASE,
            }}
            className="
              commerce-display
              mt-3 max-w-[900px]
              text-[clamp(3.5rem,13vw,8rem)]
              leading-[0.9]
              tracking-[-0.07em]
            "
          >
            Encuentra lo tuyo.
          </motion.h2>
        </div>

        <div
          className="
            mt-6 flex items-end
            justify-between gap-4
          "
        >
          <p
            className="
              commerce-sans
              max-w-[390px]
              text-[13px] leading-[1.7]
              text-[var(--commerce-ink-soft)]
              md:text-[16px]
            "
          >
            Explora novedades, precios especiales
            y productos disponibles.
          </p>

          <span
            className="
              commerce-sans shrink-0
              text-[11px] font-bold
              tabular-nums
              text-[var(--commerce-muted)]
            "
          >
            {String(products.length).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* PRODUCTOS */}

      {collections.length === 0 ? (
        <div
          className="
            border-t
            border-[var(--commerce-line)]
            py-14
          "
        >
          <h3
            className="
              commerce-display
              text-[clamp(2.8rem,9vw,4rem)]
              leading-none
              tracking-[-0.055em]
            "
          >
            Sin coincidencias.
          </h3>

          <p
            className="
              commerce-sans
              mt-4 text-[13px]
              text-[var(--commerce-ink-soft)]
            "
          >
            Prueba con otra búsqueda o categoría.
          </p>

          <button
            type="button"
            onClick={onClearFilters}
            className="
              commerce-sans
              mt-7 inline-flex min-h-11
              items-center gap-2
              border-b border-current
              text-[13px] font-bold
            "
          >
            Ver todos los productos
            <ArrowRight size={17} />
          </button>
        </div>
      ) : (
        <div className="space-y-16 md:space-y-28">
          {collections.map((collection) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
            />
          ))}
        </div>
      )}

      {/* CIERRE MAYORISTA */}

      <WholesaleSection />
    </section>
  );
}

