"use client";

import Image from "next/image";
import {
  Check,
  WhatsappLogo,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

export type PreparedPurchase = {
  products: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    lineTotal: number;
  }[];

  totalItems: number;
  subtotal: number;

  delivery: {
    name: string;
    department: string;
    municipality: string;
    address: string;
    reference: string;
  };

  whatsappUrl: string;
};

type PreparedPurchaseViewProps = {
  purchase: PreparedPurchase;
  onContinueShopping: () => void;
  onOpenWhatsApp: () => void;
};

function formatPrice(value: number) {
  return `Q${value.toLocaleString("es-GT")}`;
}

export default function PreparedPurchaseView({
  purchase,
  onContinueShopping,
  onOpenWhatsApp,
}: PreparedPurchaseViewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[var(--commerce-bg)]
        px-[var(--commerce-page-x)]
        pb-[calc(env(safe-area-inset-bottom)+48px)]
        pt-10

        md:pb-24
        md:pt-16
      "
    >
      <div
        className="
          mx-auto
          max-w-[1440px]
        "
      >
        <div
          className="
            md:grid
            md:grid-cols-[minmax(0,0.82fr)_minmax(420px,1.18fr)]
            md:gap-20

            lg:gap-28
          "
        >
          {/* ================================= */}
          {/* ESTADO                            */}
          {/* ================================= */}

          <motion.section
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : 0.62,
              ease: commerceEase.spatial,
            }}
            className="
              md:sticky
              md:top-16
              md:self-start
            "
          >
            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.72,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: reduceMotion
                  ? 0
                  : 0.12,
                duration: 0.45,
                ease: commerceEase.spatial,
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[var(--commerce-line-strong)]
                text-[var(--commerce-ink)]
              "
            >
              <Check
                size={21}
                weight="regular"
              />
            </motion.div>

            <p
              className="
                commerce-label
                mt-8
                text-[var(--commerce-muted)]
              "
            >
              Compra preparada
            </p>

            <h1
              className="
                commerce-display
                mt-3
                max-w-[580px]
                text-[clamp(3.4rem,6vw,6.6rem)]
                leading-[0.86]
                tracking-[-0.065em]
                text-[var(--commerce-ink)]
              "
            >
              Tu compra está preparada.
            </h1>

            <p
              className="
                commerce-sans
                mt-7
                max-w-[470px]
                text-[0.84rem]
                leading-[1.7]
                text-[var(--commerce-ink-soft)]

                md:text-[0.88rem]
              "
            >
              El mensaje con tus productos y
              datos de entrega está listo en
              WhatsApp. Envíalo para que el
              negocio confirme disponibilidad
              y costo de entrega.
            </p>

            {/* ACCIONES */}

            <div
              className="
                mt-10
                space-y-3
              "
            >
              <motion.button
                type="button"
                onClick={onContinueShopping}
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
                  rounded-full
                  bg-[var(--commerce-ink)]
                  px-7
                  text-[0.84rem]
                  font-[700]
                  tracking-[-0.02em]
                  text-[var(--commerce-paper)]

                  md:max-w-[390px]
                "
              >
                Seguir comprando
              </motion.button>

              <motion.button
                type="button"
                onClick={onOpenWhatsApp}
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
                  h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  border
                  border-[var(--commerce-line-strong)]
                  bg-transparent
                  px-7
                  text-[0.8rem]
                  font-[650]
                  tracking-[-0.02em]
                  text-[var(--commerce-ink)]

                  md:max-w-[390px]
                "
              >
                <WhatsappLogo
                  size={18}
                  weight="regular"
                />

                Abrir WhatsApp
              </motion.button>
            </div>
          </motion.section>

          {/* ================================= */}
          {/* RESUMEN                           */}
          {/* ================================= */}

          <motion.section
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 22,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: reduceMotion
                ? 0
                : 0.18,
              duration: 0.7,
              ease: commerceEase.spatial,
            }}
            className="
              mt-16
              border-t
              border-[var(--commerce-ink)]
              pt-7

              md:mt-0
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                gap-8
              "
            >
              <div>
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Resumen
                </p>

                <h2
                  className="
                    commerce-display
                    mt-2
                    text-[2.8rem]
                    leading-[0.9]
                    tracking-[-0.055em]

                    md:text-[3.6rem]
                  "
                >
                  Tu compra.
                </h2>
              </div>

              <p
                className="
                  commerce-sans
                  pb-1
                  text-[0.72rem]
                  font-[650]
                  text-[var(--commerce-muted)]
                "
              >
                {purchase.totalItems === 1
                  ? "1 unidad"
                  : `${purchase.totalItems} unidades`}
              </p>
            </div>

            {/* PRODUCTOS */}

            <div
              className="
                mt-8
                border-t
                border-[var(--commerce-line)]
              "
            >
              {purchase.products.map(
                (item) => (
                  <article
                    key={item.id}
                    className="
                      grid
                      grid-cols-[72px_minmax(0,1fr)]
                      gap-4
                      border-b
                      border-[var(--commerce-line)]
                      py-5

                      md:grid-cols-[86px_minmax(0,1fr)_auto]
                      md:items-center
                      md:gap-5
                    "
                  >
                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        rounded-[16px]
                        bg-[var(--commerce-paper)]
                      "
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="86px"
                        className="
                          object-contain
                          p-3
                        "
                      />
                    </div>

                    <div>
                      <h3
                        className="
                          commerce-sans
                          text-[0.88rem]
                          font-[700]
                          leading-[1.25]
                          tracking-[-0.03em]
                          text-[var(--commerce-ink)]
                        "
                      >
                        {item.name}
                      </h3>

                      <p
                        className="
                          commerce-sans
                          mt-2
                          text-[0.72rem]
                          text-[var(--commerce-muted)]
                        "
                      >
                        {item.quantity} ×{" "}
                        {formatPrice(
                          item.price
                        )}
                      </p>

                      <p
                        className="
                          commerce-sans
                          mt-2
                          text-[0.82rem]
                          font-[750]
                          tabular-nums

                          md:hidden
                        "
                      >
                        {formatPrice(
                          item.lineTotal
                        )}
                      </p>
                    </div>

                    <p
                      className="
                        commerce-sans
                        hidden
                        text-[0.9rem]
                        font-[750]
                        tabular-nums

                        md:block
                      "
                    >
                      {formatPrice(
                        item.lineTotal
                      )}
                    </p>
                  </article>
                )
              )}
            </div>

            {/* TOTAL */}

            <div
              className="
                flex
                items-end
                justify-between
                gap-6
                border-b
                border-[var(--commerce-line)]
                py-7
              "
            >
              <div>
                <p
                  className="
                    commerce-sans
                    text-[0.78rem]
                    font-[700]
                    text-[var(--commerce-ink)]
                  "
                >
                  Total de productos
                </p>

                <p
                  className="
                    commerce-sans
                    mt-1
                    text-[0.67rem]
                    text-[var(--commerce-muted)]
                  "
                >
                  Envío no incluido
                </p>
              </div>

              <p
                className="
                  commerce-display
                  text-[2rem]
                  leading-none
                  tracking-[-0.05em]

                  md:text-[2.35rem]
                "
              >
                {formatPrice(
                  purchase.subtotal
                )}
              </p>
            </div>

            {/* ENTREGA */}

            <div
              className="
                py-8
              "
            >
              <p
                className="
                  commerce-label
                  text-[var(--commerce-muted)]
                "
              >
                Entrega
              </p>

              <div
                className="
                  commerce-sans
                  mt-5
                  space-y-1.5
                  text-[0.8rem]
                  leading-[1.55]
                  text-[var(--commerce-ink)]
                "
              >
                <p
                  className="
                    font-[700]
                  "
                >
                  {purchase.delivery.name}
                </p>

                <p>
                  {
                    purchase.delivery
                      .municipality
                  }
                  ,{" "}
                  {
                    purchase.delivery
                      .department
                  }
                </p>

                <p>
                  {
                    purchase.delivery
                      .address
                  }
                </p>

                {purchase.delivery.reference && (
                  <p
                    className="
                      pt-2
                      text-[var(--commerce-muted)]
                    "
                  >
                    Referencia:{" "}
                    {
                      purchase.delivery
                        .reference
                    }
                  </p>
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
