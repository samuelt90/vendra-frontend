"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Package,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useRef,
  useState,
} from "react";

import {
  commerceProducts,
  type CommerceProduct,
} from "../../data/products";

const EASE = [0.22, 1, 0.36, 1] as const;
const PRODUCTS_PER_BATCH = 6;

const PARALLAX_SPRING = {
  stiffness: 100,
  damping: 30,
  mass: 0.7,
};

function formatPrice(price: number) {
  return `Q${price.toLocaleString("es-GT")}`;
}

type ProductItemProps = {
  product: CommerceProduct;
  index: number;
  mobile?: boolean;
  focusedIndex?: number | null;
  onFocus?: (index: number | null) => void;
};

/* =====================================================
   PRODUCTO
===================================================== */

function ProductItem({
  product,
  index,
  mobile = false,
  focusedIndex = null,
  onFocus,
}: ProductItemProps) {
  const reduceMotion = useReducedMotion();

  const isDimmed =
    !mobile &&
    focusedIndex !== null &&
    focusedIndex !== index;

  return (
    <motion.div
      layout
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: mobile ? 24 : 24,
              scale: mobile ? 0.95 : 1,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
        layout: {
          duration: 0.45,
          ease: EASE,
        },
      }}
      className="min-w-0"
    >
      <Link
        href={
          product.href ||
          `/comercio/product/${product.id}`
        }
        onMouseEnter={() => {
          if (!mobile) onFocus?.(index);
        }}
        onMouseLeave={() => onFocus?.(null)}
        onFocus={() => {
          if (!mobile) onFocus?.(index);
        }}
        onBlur={() => onFocus?.(null)}
        className={`
          group block min-w-0
          transition-[filter,opacity]
          duration-500
          ${
            isDimmed
              ? "md:opacity-40 md:blur-[2px]"
              : "opacity-100"
          }
        `}
      >
        <motion.div
          whileTap={
            reduceMotion
              ? undefined
              : { scale: 0.96 }
          }
          transition={{ duration: 0.18 }}
          className="min-w-0"
        >
          <div
            className={`
              relative isolate
              w-full overflow-hidden
              bg-[#EFEEEA]
              ${
                mobile
                  ? "aspect-[0.78]"
                  : "aspect-[0.92] sm:aspect-square"
              }
            `}
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-0
                bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.95),transparent_74%)]
              "
            />

            <motion.div
              className={
                mobile
                  ? "absolute inset-[4%]"
                  : "absolute inset-[9%]"
              }
              whileHover={
                mobile || reduceMotion
                  ? undefined
                  : {
                      scale: 1.075,
                      y: -5,
                    }
              }
              transition={{
                duration: 0.55,
                ease: EASE,
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes={
                  mobile
                    ? "(max-width: 767px) 31vw, 160px"
                    : "(max-width: 1200px) 31vw, 440px"
                }
                className="
                  object-contain
                  drop-shadow-[0_12px_16px_rgba(28,30,24,0.13)]
                "
              />
            </motion.div>

            <span
              className={`
                commerce-sans
                absolute font-bold
                tabular-nums text-[#6B6D66]
                ${
                  mobile
                    ? "left-2 top-2 text-[9px]"
                    : "left-5 top-5 text-[10px] tracking-[0.1em]"
                }
              `}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className={`
                absolute flex items-center
                justify-center rounded-full
                bg-white/85
                text-[#272C26]
                transition-transform
                duration-300
                group-hover:rotate-45
                ${
                  mobile
                    ? "right-2 top-2 h-7 w-7"
                    : "right-5 top-5 h-10 w-10"
                }
              `}
            >
              <ArrowUpRight
                size={mobile ? 14 : 17}
              />
            </span>

            {product.badge && (
              <span
                className={`
                  commerce-sans
                  absolute bg-[#272E27]
                  font-semibold uppercase
                  text-white
                  ${
                    mobile
                      ? "bottom-2 left-2 max-w-[calc(100%-16px)] px-1.5 py-1 text-[8px] leading-tight"
                      : "bottom-5 left-5 px-3 py-2 text-[9px]"
                  }
                `}
              >
                {product.badge}
              </span>
            )}
          </div>

          <div
            className={
              mobile
                ? "min-w-0 pt-2.5"
                : "min-w-0 pt-4"
            }
          >
            <p
              className={`
                commerce-sans
                font-semibold uppercase
                text-[var(--commerce-muted)]
                ${
                  mobile
                    ? "text-[8px] tracking-[0.08em]"
                    : "text-[10px] tracking-[0.13em]"
                }
              `}
            >
              {product.category}
            </p>

            <h3
              className={`
                commerce-sans
                min-w-0 font-semibold
                tracking-[-0.025em]
                text-[var(--commerce-ink)]
                ${
                  mobile
                    ? "mt-1 text-[11px] leading-[1.3] [overflow-wrap:anywhere]"
                    : "mt-1.5 text-[17px] leading-[1.35]"
                }
              `}
            >
              {product.name}
            </h3>

            <div
              className={`
                flex flex-wrap items-baseline
                ${
                  mobile
                    ? "mt-1 gap-x-1.5 gap-y-0.5"
                    : "mt-2 gap-x-2 gap-y-1"
                }
              `}
            >
              <span
                className={`
                  commerce-sans font-bold
                  tracking-[-0.04em]
                  text-[var(--commerce-ink)]
                  ${
                    mobile
                      ? "text-[13px]"
                      : "text-[19px]"
                  }
                `}
              >
                {formatPrice(product.price)}
              </span>

              {product.previousPrice != null && (
                <span
                  className={`
                    commerce-sans
                    text-[var(--commerce-muted)]
                    line-through
                    ${
                      mobile
                        ? "text-[9px]"
                        : "text-[12px]"
                    }
                  `}
                >
                  {formatPrice(
                    product.previousPrice
                  )}
                </span>
              )}
            </div>

            {product.wholesaleEnabled && (
              <span
                className={`
                  commerce-sans
                  mt-1.5 inline-flex
                  items-start gap-1
                  font-semibold leading-[1.3]
                  text-[#526A4E]
                  ${
                    mobile
                      ? "text-[9px]"
                      : "text-[11px]"
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className="
                    mt-1 h-1.5 w-1.5
                    shrink-0 rounded-full
                    bg-[#6D8A60]
                  "
                />
                Por mayor
              </span>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* =====================================================
   MOBILE — PARALLAX DE APERTURA

   3 columnas:
   izquierda  ↙
   centro     ↑
   derecha    ↘

   Secuencia:
   cerrado → abierto → cerrado

   El scroll de la página controla todo.
===================================================== */

function MobileParallaxGrid({
  products,
}: {
  products: CommerceProduct[];
}) {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  // Suaviza el movimiento para evitar saltos
  // cuando el usuario desplaza rápidamente.
  const progress = useSpring(
    scrollYProgress,
    PARALLAX_SPRING
  );

  /*
    APERTURA HORIZONTAL

    Inicio: columnas alineadas.
    45%: laterales se separan.
    Final: vuelven al centro.

    La apertura es deliberadamente visible
    pero limitada para pantallas de 386px.
  */

  const leftX = useTransform(
    progress,
    [0, 0.18, 0.48, 0.78, 1],
    [0, -12, -35, -13, 0]
  );

  const rightX = useTransform(
    progress,
    [0, 0.18, 0.48, 0.78, 1],
    [0, 12, 35, 13, 0]
  );

  /*
    MOVIMIENTO VERTICAL

    El centro se desplaza en sentido opuesto
    a las columnas laterales.

    No se reinicia automáticamente: la posición
    responde al progreso real del scroll.
  */

  const leftY = useTransform(
    progress,
    [0, 0.5, 1],
    [-82, 0, 82]
  );

  const centerY = useTransform(
    progress,
    [0, 0.5, 1],
    [104, 0, -104]
  );

  const rightY = useTransform(
    progress,
    [0, 0.5, 1],
    [-76, 0, 76]
  );

  /*
    ROTACIÓN Y ESCALA

    Los laterales se inclinan hacia fuera,
    simulando una composición que se expande.
  */

  const leftRotate = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, -2, -5, -2, 0]
  );

  const rightRotate = useTransform(
    progress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 2, 5, 2, 0]
  );

  const lateralScale = useTransform(
    progress,
    [0, 0.5, 1],
    [1, 0.94, 1]
  );

  const centerScale = useTransform(
    progress,
    [0, 0.5, 1],
    [0.96, 1.045, 0.96]
  );

  const tracks = [0, 1, 2].map((column) =>
    products
      .map((product, index) => ({
        product,
        index,
      }))
      .filter(
        ({ index }) => index % 3 === column
      )
  );

  return (
    <div
      ref={stageRef}
      className="
        relative w-full min-w-0
        md:hidden
      "
    >
      <div
        className="
          commerce-sans
          mb-4 flex items-center
          justify-between gap-3
          text-[9px] font-semibold
          uppercase tracking-[0.12em]
          text-[var(--commerce-muted)]
        "
      >
        <span>Explora la colección</span>

        <span className="inline-flex items-center gap-2">
          Desplázate
          <ArrowRight size={13} />
        </span>
      </div>

      {/*
        La ventana recorta los desplazamientos laterales.
        Las imágenes no generan scroll horizontal.
      */}

      <div
        className="
          relative min-w-0
          overflow-x-clip
          pt-[115px] pb-[115px]
        "
      >
        <div
          className="
            grid min-w-0
            grid-cols-3
            items-start
            gap-x-2
          "
        >
          {/* IZQUIERDA */}

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    x: leftX,
                    y: leftY,
                    rotate: leftRotate,
                    scale: lateralScale,
                  }
            }
            className="
              flex min-w-0
              origin-right
              flex-col gap-7
              will-change-transform
            "
          >
            <AnimatePresence initial={false}>
              {tracks[0].map(
                ({ product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    index={index}
                    mobile
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>

          {/* CENTRO — EJE DE LA COMPOSICIÓN */}

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    y: centerY,
                    scale: centerScale,
                  }
            }
            className="
              relative z-10
              flex min-w-0
              origin-center
              flex-col gap-7
              pt-8
              will-change-transform
            "
          >
            <AnimatePresence initial={false}>
              {tracks[1].map(
                ({ product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    index={index}
                    mobile
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>

          {/* DERECHA */}

          <motion.div
            style={
              reduceMotion
                ? undefined
                : {
                    x: rightX,
                    y: rightY,
                    rotate: rightRotate,
                    scale: lateralScale,
                  }
            }
            className="
              flex min-w-0
              origin-left
              flex-col gap-7
              pt-14
              will-change-transform
            "
          >
            <AnimatePresence initial={false}>
              {tracks[2].map(
                ({ product, index }) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    index={index}
                    mobile
                  />
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   DESKTOP — FOCUS CARDS + PARALLAX EXISTENTE

   Sin cambios de diseño.
===================================================== */

function DesktopProductGrid({
  products,
}: {
  products: CommerceProduct[];
}) {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  const [focusedIndex, setFocusedIndex] =
    useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const columnA = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-6, 0, 6]
  );

  const columnB = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-13, 0, 13]
  );

  const columnC = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [11, 0, -11]
  );

  return (
    <div
      ref={gridRef}
      onMouseLeave={() =>
        setFocusedIndex(null)
      }
      className="
        hidden min-w-0
        grid-cols-3
        gap-x-6 gap-y-12
        md:grid
        lg:gap-x-8
      "
    >
      <AnimatePresence
        initial={false}
        mode="popLayout"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            style={
              reduceMotion
                ? undefined
                : {
                    y:
                      index % 3 === 0
                        ? columnA
                        : index % 3 === 1
                          ? columnB
                          : columnC,
                  }
            }
            className="min-w-0"
          >
            <ProductItem
              product={product}
              index={index}
              focusedIndex={focusedIndex}
              onFocus={setFocusedIndex}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* =====================================================
   PRODUCTS SECTION
===================================================== */

export default function ProductsSection() {
  const reduceMotion = useReducedMotion();

  const [visibleCount, setVisibleCount] =
    useState(PRODUCTS_PER_BATCH);

  const visibleProducts = commerceProducts.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < commerceProducts.length;

  const remaining = Math.max(
    0,
    commerceProducts.length - visibleCount
  );

  function showMore() {
    setVisibleCount((current) =>
      Math.min(
        current + PRODUCTS_PER_BATCH,
        commerceProducts.length
      )
    );
  }

  return (
    <section
      id="productos"
      className="
        relative min-w-0
        bg-[var(--commerce-paper)]
        py-14 md:py-24
      "
    >
      <div
        className="
          mx-auto w-full min-w-0
          max-w-[1600px]
          px-[var(--commerce-page-x)]
        "
      >
        {/* HEADER */}

        <header
          className="
            mb-8 flex flex-wrap
            items-end justify-between
            gap-5 md:mb-14
          "
        >
          <div className="min-w-0">
            <p
              className="
                commerce-sans
                text-[10px] font-bold
                uppercase tracking-[0.16em]
                text-[var(--commerce-muted)]
              "
            >
              VENDRA / PRODUCTOS
            </p>

            <motion.h2
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.65,
                ease: EASE,
              }}
              className="
                commerce-display
                mt-3
                text-[clamp(3.3rem,12vw,7.5rem)]
                leading-[0.87]
                tracking-[-0.07em]
                text-[var(--commerce-ink)]
              "
            >
              Para elegir.
            </motion.h2>

            <p
              className="
                commerce-sans
                mt-4 max-w-[450px]
                text-[13px]
                leading-[1.65]
                text-[var(--commerce-ink-soft)]
                md:text-[15px]
              "
            >
              Tecnología y accesorios para tu
              día a día y para abastecer tu negocio.
            </p>
          </div>

          <Link
            href="/comercio/tienda"
            className="
              commerce-sans
              group inline-flex
              min-h-10 shrink-0
              items-center gap-2
              text-[12px] font-semibold
              text-[var(--commerce-ink)]
              md:text-[14px]
            "
          >
            Tienda completa

            <ArrowUpRight
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-1
                group-hover:translate-x-1
              "
            />
          </Link>
        </header>

        {/* MÓVIL — PARALLAX CON APERTURA */}

        <MobileParallaxGrid
          products={visibleProducts}
        />

        {/* DESKTOP — SE CONSERVA */}

        <DesktopProductGrid
          products={visibleProducts}
        />

        {/* VER MÁS */}

        <div
          className="
            mt-5 flex flex-col
            items-center gap-4
            md:mt-20
          "
        >
          {hasMore ? (
            <>
              <button
                type="button"
                onClick={showMore}
                className="
                  commerce-sans
                  group flex
                  min-h-[52px] w-full
                  max-w-[330px]
                  items-center justify-between
                  gap-8 rounded-full
                  border border-[var(--commerce-ink)]
                  px-6
                  text-[13px] font-bold
                  text-[var(--commerce-ink)]
                  transition-colors duration-300
                  hover:bg-[var(--commerce-ink)]
                  hover:text-[var(--commerce-paper)]
                "
              >
                Ver más productos

                <Plus
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-90
                  "
                />
              </button>

              <span
                className="
                  commerce-sans
                  text-[11px]
                  text-[var(--commerce-muted)]
                "
              >
                {remaining} productos más por descubrir
              </span>
            </>
          ) : (
            <Link
              href="/comercio/tienda"
              className="
                commerce-sans
                inline-flex min-h-12
                items-center gap-3
                border-b
                border-[var(--commerce-ink)]
                text-[13px] font-bold
              "
            >
              Explorar la tienda
              <ArrowRight size={17} />
            </Link>
          )}
        </div>


      </div>
    </section>
  );
}

