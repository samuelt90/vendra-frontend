"use client";

import Image from "next/image";
import {
  ArrowRight,
  Package,
  Truck,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
} from "motion/react";
import { useMemo, useState } from "react";

import BusinessPurchasePanel from "./BusinessPurchasePanel";

import {
  commerceProducts,
  type CommerceProduct,
} from "../../data/products";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

function formatPrice(value: number) {
  return `Q${value.toLocaleString("es-GT")}`;
}

export default function WholesaleCommercePage() {
  const reduceMotion = useReducedMotion();

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState<CommerceProduct | null>(
    null
  );

  const [panelOpen, setPanelOpen] =
    useState(false);

  const wholesaleProducts = useMemo(
    () =>
      commerceProducts.filter(
        (product) =>
          product.wholesaleEnabled
      ),
    []
  );

  function openWholesale(
    product: CommerceProduct
  ) {
    setSelectedProduct(product);
    setPanelOpen(true);
  }

  function closeWholesale() {
    setPanelOpen(false);
  }

  return (
    <>
      <main
        className="
          min-h-screen
          bg-[var(--commerce-paper)]
          text-[var(--commerce-ink)]
        "
      >
        {/* ================================= */}
        {/* HERO                              */}
        {/* ================================= */}

        <section
          className="
            relative
            overflow-hidden
            border-b
            border-[var(--commerce-line)]
            px-[var(--commerce-page-x)]
            pb-14
            pt-16

            md:pb-20
            md:pt-24
          "
        >
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1600px]
              gap-10

              md:grid-cols-12
              md:items-end
              md:gap-8
            "
          >
            <div
              className="
                md:col-span-8
              "
            >
              <motion.p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    commerceDuration.interface,
                  ease:
                    commerceEase.enter,
                }}
              >
                Para tu negocio
              </motion.p>

              <div
                className="
                  mt-4
                  overflow-hidden
                "
              >
                <motion.h1
                  className="
                    commerce-display
                    max-w-[9ch]
                    text-[clamp(4rem,16vw,7rem)]
                    leading-[0.82]
                    tracking-[-0.07em]

                    md:max-w-[10ch]
                    md:text-[clamp(6rem,8vw,9.5rem)]
                  "
                  initial={
                    reduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          y: "108%",
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration:
                      reduceMotion
                        ? commerceDuration.micro
                        : 0.78,
                    ease:
                      commerceEase.spatial,
                  }}
                >
                  Compra por mayor.
                </motion.h1>
              </div>
            </div>

            <motion.div
              className="
                md:col-span-4
                md:pb-2
              "
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  reduceMotion ? 0 : 0.16,
                duration:
                  commerceDuration.interface,
                ease:
                  commerceEase.enter,
              }}
            >
              <p
                className="
                  commerce-sans
                  max-w-[32rem]
                  text-[0.92rem]
                  leading-[1.6]
                  tracking-[-0.025em]
                  text-[var(--commerce-ink-soft)]

                  md:text-[1rem]
                "
              >
                Elige el producto que
                necesitas, indica la
                cantidad y solicita una
                mejor condición para tu
                compra.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ================================= */}
        {/* DEMOSTRACIÓN                     */}
        {/* ================================= */}

        <section
          className="
            border-b
            border-[var(--commerce-line)]
            px-[var(--commerce-page-x)]
            py-10

            md:py-14
          "
        >
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1600px]
              gap-8

              md:grid-cols-12
              md:items-center
            "
          >
            <div
              className="
                md:col-span-4
              "
            >
              <p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
              >
                Compra por cantidad
              </p>

              <h2
                className="
                  commerce-display
                  mt-3
                  max-w-[8ch]
                  text-[3rem]
                  leading-[0.9]
                  tracking-[-0.055em]

                  md:text-[4.6rem]
                "
              >
                La cantidad puede cambiar la condición.
              </h2>
            </div>

            <div
              className="
                md:col-span-7
                md:col-start-6
              "
            >
              <div
                className="
                  grid
                  grid-cols-2
                  border-y
                  border-[var(--commerce-line)]

                  md:grid-cols-3
                "
              >
                <div
                  className="
                    border-r
                    border-[var(--commerce-line)]
                    py-5
                    pr-4

                    md:py-7
                    md:pr-6
                  "
                >
                  <p
                    className="
                      commerce-sans
                      text-[0.63rem]
                      font-[700]
                      uppercase
                      tracking-[0.1em]
                      text-[var(--commerce-muted)]
                    "
                  >
                    Precio regular
                  </p>

                  <p
                    className="
                      commerce-display
                      mt-3
                      text-[2rem]
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    Q349
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-1
                      text-[0.68rem]
                      text-[var(--commerce-muted)]
                    "
                  >
                    por unidad
                  </p>
                </div>

                <div
                  className="
                    py-5
                    pl-4

                    md:border-r
                    md:border-[var(--commerce-line)]
                    md:px-6
                    md:py-7
                  "
                >
                  <p
                    className="
                      commerce-sans
                      text-[0.63rem]
                      font-[700]
                      uppercase
                      tracking-[0.1em]
                      text-[var(--commerce-muted)]
                    "
                  >
                    Ejemplo
                  </p>

                  <p
                    className="
                      commerce-display
                      mt-3
                      text-[2rem]
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    24
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-1
                      text-[0.68rem]
                      text-[var(--commerce-muted)]
                    "
                  >
                    unidades
                  </p>
                </div>

                <div
                  className="
                    col-span-2
                    border-t
                    border-[var(--commerce-line)]
                    py-5

                    md:col-span-1
                    md:border-t-0
                    md:py-7
                    md:pl-6
                  "
                >
                  <p
                    className="
                      commerce-sans
                      text-[0.63rem]
                      font-[700]
                      uppercase
                      tracking-[0.1em]
                      text-[var(--commerce-accent)]
                    "
                  >
                    Mejor condición
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-3
                      max-w-[24ch]
                      text-[0.78rem]
                      leading-[1.5]
                      text-[var(--commerce-ink-soft)]
                    "
                  >
                    El precio por unidad
                    puede mejorar según la
                    cantidad solicitada.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* PRODUCTOS MAYORISTAS              */}
        {/* ================================= */}

        <section
          className="
            px-[var(--commerce-page-x)]
            pb-24
            pt-14

            md:pb-32
            md:pt-24
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
            "
          >
            <div
              className="
                mb-10

                md:mb-14
              "
            >
              <p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
              >
                Productos
              </p>

              <h2
                className="
                  commerce-display
                  mt-3
                  max-w-[9ch]
                  text-[clamp(3.3rem,13vw,5.5rem)]
                  leading-[0.86]
                  tracking-[-0.06em]

                  md:max-w-none
                  md:text-[clamp(4.5rem,7vw,7.5rem)]
                "
              >
                Elige qué necesitas.
              </h2>
            </div>

            <div
              className="
                grid
                gap-4

                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {wholesaleProducts.map(
                (product, index) => (
                  <WholesaleProduct
                    key={product.id}
                    product={product}
                    index={index}
                    onSelect={() =>
                      openWholesale(product)
                    }
                    reduceMotion={
                      Boolean(reduceMotion)
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* CONDICIONES                       */}
        {/* ================================= */}

        <section
          className="
            bg-[var(--commerce-ink)]
            px-[var(--commerce-page-x)]
            py-16
            text-[var(--commerce-paper)]

            md:py-24
          "
        >
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1600px]
              gap-12

              md:grid-cols-12
              md:gap-8
            "
          >
            <div
              className="
                md:col-span-5
              "
            >
              <p
                className="
                  commerce-label
                  text-white/42
                "
              >
                Antes de confirmar
              </p>

              <h2
                className="
                  commerce-display
                  mt-3
                  max-w-[8ch]
                  text-[3.5rem]
                  leading-[0.86]
                  tracking-[-0.06em]

                  md:text-[5.5rem]
                "
              >
                Primero revisamos tu pedido.
              </h2>
            </div>

            <div
              className="
                md:col-span-6
                md:col-start-7
              "
            >
              <WholesaleCondition
                number="01"
                icon={Package}
                title="Disponibilidad"
                description="Revisamos que estén disponibles las unidades que necesitas antes de confirmar."
              />

              <WholesaleCondition
                number="02"
                icon={Truck}
                title="Entrega"
                description="Coordinamos la entrega según la cantidad del pedido y tu ubicación."
              />

              <div
                className="
                  border-t
                  border-white/12
                  py-6
                "
              >
                <p
                  className="
                    commerce-sans
                    text-[0.65rem]
                    font-[700]
                    uppercase
                    tracking-[0.11em]
                    text-white/42
                  "
                >
                  03
                </p>

                <p
                  className="
                    commerce-sans
                    mt-4
                    text-[1rem]
                    font-[650]
                    tracking-[-0.03em]
                  "
                >
                  Mejor precio
                </p>

                <p
                  className="
                    commerce-sans
                    mt-2
                    max-w-[38ch]
                    text-[0.82rem]
                    leading-[1.55]
                    text-white/56
                  "
                >
                  La condición final se
                  confirma según producto,
                  cantidad y disponibilidad.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {selectedProduct && (
        <BusinessPurchasePanel
          product={selectedProduct}
          open={panelOpen}
          onClose={closeWholesale}
        />
      )}
    </>
  );
}

type WholesaleProductProps = {
  product: CommerceProduct;
  index: number;
  onSelect: () => void;
  reduceMotion: boolean;
};

function WholesaleProduct({
  product,
  index,
  onSelect,
  reduceMotion,
}: WholesaleProductProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        delay:
          reduceMotion
            ? 0
            : Math.min(index * 0.06, 0.24),
        duration:
          commerceDuration.interface,
        ease: commerceEase.enter,
      }}
      className="
        overflow-hidden
        rounded-[26px_26px_12px_26px]
        border
        border-[var(--commerce-line)]
        bg-[var(--commerce-paper)]
      "
    >
      <div
        className="
          relative
          aspect-[1.05]
          overflow-hidden
          bg-[#e8e1d5]
        "
      >
        {product.badge && (
          <span
            className="
              commerce-sans
              absolute
              left-4
              top-4
              z-20
              bg-[var(--commerce-ink)]
              px-3
              py-2
              text-[0.58rem]
              font-[750]
              uppercase
              tracking-[0.09em]
              text-[var(--commerce-paper)]
            "
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
            p-8
          "
        >
          <motion.div
            className="
              relative
              h-full
              w-full
            "
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.025,
                    y: -4,
                  }
            }
            transition={{
              duration:
                commerceDuration.interface,
              ease:
                commerceEase.spatial,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="
                (max-width: 767px) 92vw,
                (max-width: 1200px) 48vw,
                33vw
              "
              className="
                object-contain
                drop-shadow-[0_24px_32px_rgba(23,22,18,0.12)]
              "
            />
          </motion.div>
        </div>
      </div>

      <div
        className="
          p-5

          md:p-6
        "
      >
        <p
          className="
            commerce-sans
            text-[0.62rem]
            font-[700]
            uppercase
            tracking-[0.1em]
            text-[var(--commerce-muted)]
          "
        >
          {product.category}
        </p>

        <h3
          className="
            commerce-sans
            mt-2
            text-[1.05rem]
            font-[700]
            tracking-[-0.035em]
          "
        >
          {product.name}
        </h3>

        <div
          className="
            mt-5
            grid
            grid-cols-2
            gap-4
            border-y
            border-[var(--commerce-line)]
            py-4
          "
        >
          <div>
            <p
              className="
                commerce-sans
                text-[0.6rem]
                font-[650]
                uppercase
                tracking-[0.08em]
                text-[var(--commerce-muted)]
              "
            >
              Precio regular
            </p>

            <p
              className="
                commerce-price
                mt-1.5
                text-[1.15rem]
                font-[700]
                tracking-[-0.04em]
              "
            >
              {formatPrice(product.price)}
            </p>
          </div>

          <div>
            <p
              className="
                commerce-sans
                text-[0.6rem]
                font-[650]
                uppercase
                tracking-[0.08em]
                text-[var(--commerce-accent)]
              "
            >
              Por cantidad
            </p>

            <p
              className="
                commerce-sans
                mt-1.5
                text-[0.73rem]
                font-[620]
                leading-[1.35]
              "
            >
              Mejor condición disponible
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className="
            commerce-sans
            group
            mt-5
            flex
            min-h-12
            w-full
            items-center
            justify-between
            gap-5
            text-left
            text-[0.84rem]
            font-[700]
            tracking-[-0.025em]
          "
        >
          <span
            className="
              border-b
              border-[var(--commerce-line-strong)]
              pb-1
            "
          >
            Comprar por mayor
          </span>

          <motion.span
            aria-hidden="true"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    x: 5,
                  }
            }
            transition={{
              duration:
                commerceDuration.fast,
              ease:
                commerceEase.enter,
            }}
          >
            <ArrowRight
              size={18}
              weight="regular"
            />
          </motion.span>
        </button>
      </div>
    </motion.article>
  );
}

type WholesaleConditionProps = {
  number: string;
  icon: typeof Package;
  title: string;
  description: string;
};

function WholesaleCondition({
  number,
  icon: Icon,
  title,
  description,
}: WholesaleConditionProps) {
  return (
    <div
      className="
        grid
        grid-cols-[44px_minmax(0,1fr)]
        gap-4
        border-t
        border-white/12
        py-6
      "
    >
      <div>
        <Icon
          size={19}
          weight="regular"
          className="text-white/60"
        />

        <p
          className="
            commerce-sans
            mt-5
            text-[0.58rem]
            font-[700]
            tracking-[0.12em]
            text-white/32
          "
        >
          {number}
        </p>
      </div>

      <div>
        <p
          className="
            commerce-sans
            text-[1rem]
            font-[650]
            tracking-[-0.03em]
          "
        >
          {title}
        </p>

        <p
          className="
            commerce-sans
            mt-2
            max-w-[38ch]
            text-[0.82rem]
            leading-[1.55]
            text-white/56
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
