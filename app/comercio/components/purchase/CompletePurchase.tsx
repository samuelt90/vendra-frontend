"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import {
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCommerceCart } from "../cart/CommerceCartProvider";

import PreparedPurchaseView, {
  type PreparedPurchase,
} from "./PreparedPurchaseView";

/* ================================================= */
/* TIPOS                                             */
/* ================================================= */

type DeliveryData = {
  name: string;
  department: string;
  municipality: string;
  address: string;
  reference: string;
};

/* ================================================= */
/* DEPARTAMENTOS                                     */
/* ================================================= */

const departments = [
  "Alta Verapaz",
  "Baja Verapaz",
  "Chimaltenango",
  "Chiquimula",
  "El Progreso",
  "Escuintla",
  "Guatemala",
  "Huehuetenango",
  "Izabal",
  "Jalapa",
  "Jutiapa",
  "Petén",
  "Quetzaltenango",
  "Quiché",
  "Retalhuleu",
  "Sacatepéquez",
  "San Marcos",
  "Santa Rosa",
  "Sololá",
  "Suchitepéquez",
  "Totonicapán",
  "Zacapa",
];

/* ================================================= */
/* HELPERS                                           */
/* ================================================= */

function formatPrice(value: number) {
  return `Q${value.toLocaleString("es-GT")}`;
}

/* ================================================= */
/* COMPONENTE                                        */
/* ================================================= */

export default function CompletePurchase() {
  const router = useRouter();

  const {
    items,
    totalItems,
    subtotal,
    openCart,
    clearCart,
  } = useCommerceCart();

  /* ------------------------------------------------- */
  /* DATOS DE ENTREGA                                  */
  /* ------------------------------------------------- */

  const [delivery, setDelivery] =
    useState<DeliveryData>({
      name: "",
      department: "",
      municipality: "",
      address: "",
      reference: "",
    });

  /* ------------------------------------------------- */
  /* ESTADOS                                           */
  /* ------------------------------------------------- */

  const [submitted, setSubmitted] =
    useState(false);

  const [preparing, setPreparing] =
    useState(false);

  const [
    preparedPurchase,
    setPreparedPurchase,
  ] = useState<PreparedPurchase | null>(
    null
  );

  const [
    restoringPurchase,
    setRestoringPurchase,
  ] = useState(true);

  /* ================================================= */
  /* RESTAURAR COMPRA PREPARADA                        */
  /* ================================================= */

  useEffect(() => {
    try {
      const saved =
        window.sessionStorage.getItem(
          "vendra:prepared-purchase"
        );

      if (saved) {
        const parsed =
          JSON.parse(
            saved
          ) as PreparedPurchase;

        setPreparedPurchase(parsed);
      }
    } catch {
      window.sessionStorage.removeItem(
        "vendra:prepared-purchase"
      );
    } finally {
      setRestoringPurchase(false);
    }
  }, []);

  /* ================================================= */
  /* VALIDACIÓN                                        */
  /* ================================================= */

  const isComplete = useMemo(() => {
    return Boolean(
      delivery.name.trim() &&
        delivery.department &&
        delivery.municipality.trim() &&
        delivery.address.trim()
    );
  }, [delivery]);

  /* ================================================= */
  /* MODIFICAR CAMPO                                   */
  /* ================================================= */

  function updateField(
    field: keyof DeliveryData,
    value: string
  ) {
    setDelivery((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /* ================================================= */
  /* MENSAJE WHATSAPP                                  */
  /* ================================================= */

  function buildWhatsAppMessage() {
    const productLines = items
      .map(({ product, quantity }) => {
        const lineTotal =
          product.price * quantity;

        return [
          product.name,
          `${quantity} ${
            quantity === 1
              ? "unidad"
              : "unidades"
          } × ${formatPrice(
            product.price
          )}`,
          `Subtotal: ${formatPrice(
            lineTotal
          )}`,
        ].join("\n");
      })
      .join("\n\n");

    const lines = [
      "Hola, quiero confirmar esta compra:",
      "",
      productLines,
      "",
      `Total de productos: ${formatPrice(
        subtotal
      )}`,
      "",
      "Datos de entrega:",
      delivery.name,
      `${delivery.municipality}, ${delivery.department}`,
      delivery.address,
    ];

    if (delivery.reference.trim()) {
      lines.push(
        `Referencia: ${delivery.reference.trim()}`
      );
    }

    lines.push(
      "",
      "Quedo pendiente de la confirmación y del costo de envío."
    );

    return lines.join("\n");
  }

  /* ================================================= */
  /* CONFIRMAR                                        */
  /* ================================================= */

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitted(true);

    if (!isComplete || preparing) {
      return;
    }

    const message =
      buildWhatsAppMessage();

    /*
     * Para producción:
     *
     * NEXT_PUBLIC_COMMERCE_WHATSAPP_NUMBER
     *
     * Ejemplo Guatemala:
     * 502XXXXXXXX
     */
    const configuredNumber =
      process.env
        .NEXT_PUBLIC_COMMERCE_WHATSAPP_NUMBER;

    const phone =
      configuredNumber?.replace(
        /\D/g,
        ""
      ) ?? "";

    const whatsappUrl = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(
          message
        )}`
      : `https://wa.me/?text=${encodeURIComponent(
          message
        )}`;

    /*
     * Creamos una copia independiente del carrito.
     *
     * Esto permite que la pantalla final continúe
     * existiendo aunque posteriormente limpiemos
     * el carrito.
     */
    const purchase: PreparedPurchase = {
      products: items.map(
        ({
          product,
          quantity,
        }) => ({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
          lineTotal:
            product.price *
            quantity,
        })
      ),

      totalItems,

      subtotal,

      delivery: {
        ...delivery,
      },

      whatsappUrl,
    };

    /*
     * Guardamos ANTES de salir hacia WhatsApp.
     *
     * Esto es especialmente importante en móvil,
     * porque el navegador puede quedar suspendido
     * cuando Android abre WhatsApp.
     */
    window.sessionStorage.setItem(
      "vendra:prepared-purchase",
      JSON.stringify(purchase)
    );

    setPreparing(true);

    const isMobile =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    /* ----------------------------------------- */
    /* MÓVIL                                     */
    /* ----------------------------------------- */

    if (isMobile) {
      /*
       * Dejamos una microrespuesta visible.
       * No hacemos esperar al usuario.
       */
      window.setTimeout(() => {
        setPreparedPurchase(purchase);
        setPreparing(false);

        /*
         * En móvil hacemos handoff directo.
         *
         * Si WhatsApp está instalado, el enlace
         * normalmente entrega la navegación a
         * la aplicación.
         */
        window.location.href =
          whatsappUrl;
      }, 320);

      return;
    }

    /* ----------------------------------------- */
    /* DESKTOP                                   */
    /* ----------------------------------------- */

    /*
     * En desktop WhatsApp se abre aparte.
     *
     * Vendra permanece disponible en la
     * pestaña original.
     */
    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    /*
     * Después transformamos Vendra en el
     * estado "Tu compra está preparada".
     */
    window.setTimeout(() => {
      setPreparedPurchase(purchase);
      setPreparing(false);
    }, 620);
  }

  /* ================================================= */
  /* SEGUIR COMPRANDO                                  */
  /* ================================================= */

  function handleContinueShopping() {
    /*
     * Aquí sí damos por terminado este flujo
     * dentro de Vendra.
     */

    window.sessionStorage.removeItem(
      "vendra:prepared-purchase"
    );

    clearCart();

    router.push("/comercio");
  }

  /* ================================================= */
  /* VOLVER A WHATSAPP                                 */
  /* ================================================= */

  function handleOpenWhatsApp() {
    if (!preparedPurchase) {
      return;
    }

    const isMobile =
      window.matchMedia(
        "(max-width: 767px)"
      ).matches;

    if (isMobile) {
      window.location.href =
        preparedPurchase.whatsappUrl;

      return;
    }

    window.open(
      preparedPurchase.whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  /* ================================================= */
  /* RESTAURANDO                                       */
  /* ================================================= */

  if (restoringPurchase) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[var(--commerce-bg)]
        "
      />
    );
  }

  /* ================================================= */
  /* COMPRA YA PREPARADA                               */
  /* ================================================= */

  if (preparedPurchase) {
    return (
      <PreparedPurchaseView
        purchase={preparedPurchase}
        onContinueShopping={
          handleContinueShopping
        }
        onOpenWhatsApp={
          handleOpenWhatsApp
        }
      />
    );
  }

  /* ================================================= */
  /* CARRITO VACÍO                                     */
  /* ================================================= */

  if (items.length === 0) {
    return (
      <main
        className="
          min-h-[100dvh]
          bg-[var(--commerce-bg)]
          px-[var(--commerce-page-x)]
          pb-28
          pt-28
        "
      >
        <div
          className="
            mx-auto
            max-w-[720px]
          "
        >
          <p
            className="
              commerce-label
              text-[var(--commerce-muted)]
            "
          >
            Tu compra
          </p>

          <h1
            className="
              commerce-display
              mt-4
              text-[clamp(3.2rem,8vw,6rem)]
              leading-[0.88]
              tracking-[-0.06em]
              text-[var(--commerce-ink)]
            "
          >
            Aún no hay productos.
          </h1>

          <p
            className="
              commerce-sans
              mt-7
              max-w-[430px]
              text-[0.88rem]
              leading-[1.65]
              text-[var(--commerce-ink-soft)]
            "
          >
            Agrega productos para preparar
            tu compra.
          </p>

          <Link
            href="/comercio"
            className="
              commerce-sans
              mt-10
              inline-flex
              h-12
              items-center
              justify-center
              rounded-full
              bg-[var(--commerce-ink)]
              px-7
              text-[0.8rem]
              font-[700]
              text-[var(--commerce-paper)]
            "
          >
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  /* ================================================= */
  /* INTERFAZ COMPLETAR COMPRA                         */
  /* ================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        bg-[var(--commerce-bg)]
        pb-[calc(env(safe-area-inset-bottom)+48px)]
        pt-6

        md:pb-24
        md:pt-10
      "
    >
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-[var(--commerce-page-x)]
          "
        >
          {/* ================================================= */}
          {/* CABECERA                                          */}
          {/* ================================================= */}

          <header
            className="
              border-b
              border-[var(--commerce-line)]
              pb-8

              md:pb-12
            "
          >
            <Link
              href="/comercio"
              className="
                commerce-sans
                inline-flex
                min-h-10
                items-center
                gap-2
                text-[0.75rem]
                font-[650]
                text-[var(--commerce-ink-soft)]
              "
            >
              <ArrowLeft
                size={16}
                weight="regular"
              />

              Volver a la tienda
            </Link>

            <div
              className="
                mt-8

                md:mt-12
                md:flex
                md:items-end
                md:justify-between
                md:gap-12
              "
            >
              <div>
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Último paso
                </p>

                <h1
                  className="
                    commerce-display
                    mt-3
                    max-w-[850px]
                    text-[clamp(3.2rem,7vw,7rem)]
                    leading-[0.84]
                    tracking-[-0.065em]
                    text-[var(--commerce-ink)]
                  "
                >
                  Completar compra.
                </h1>
              </div>

              <p
                className="
                  commerce-sans
                  mt-6
                  max-w-[360px]
                  text-[0.82rem]
                  leading-[1.65]
                  text-[var(--commerce-ink-soft)]

                  md:mb-2
                  md:mt-0
                "
              >
                Revisa los productos y agrega
                los datos necesarios para
                coordinar la entrega.
              </p>
            </div>
          </header>

          {/* ================================================= */}
          {/* DESKTOP                                           */}
          {/* ================================================= */}

          <div
            className="
              hidden

              md:grid
              md:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]
              md:gap-16
              md:pt-14

              lg:gap-24
            "
          >
            <div>
              {/* ============================================= */}
              {/* PRODUCTOS                                     */}
              {/* ============================================= */}

              <section>
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
                      Tu pedido
                    </p>

                    <h2
                      className="
                        commerce-display
                        mt-2
                        text-[3.25rem]
                        leading-[0.9]
                        tracking-[-0.055em]
                      "
                    >
                      Lo que llevas.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={openCart}
                    className="
                      commerce-sans
                      min-h-10
                      text-[0.74rem]
                      font-[650]
                      text-[var(--commerce-ink)]
                      underline
                      decoration-[var(--commerce-line-strong)]
                      underline-offset-4
                    "
                  >
                    Modificar
                  </button>
                </div>

                <div
                  className="
                    mt-9
                    border-t
                    border-[var(--commerce-line)]
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
                          key={product.id}
                          className="
                            grid
                            grid-cols-[92px_minmax(0,1fr)_auto]
                            items-center
                            gap-6
                            border-b
                            border-[var(--commerce-line)]
                            py-6
                          "
                        >
                          <div
                            className="
                              relative
                              aspect-square
                              overflow-hidden
                              rounded-[18px]
                              bg-[var(--commerce-paper)]
                            "
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="92px"
                              className="
                                object-contain
                                p-3
                              "
                            />
                          </div>

                          <div>
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
                              {product.category}
                            </p>

                            <h3
                              className="
                                commerce-sans
                                mt-1.5
                                text-[0.96rem]
                                font-[700]
                                tracking-[-0.03em]
                                text-[var(--commerce-ink)]
                              "
                            >
                              {product.name}
                            </h3>

                            <p
                              className="
                                commerce-sans
                                mt-2
                                text-[0.76rem]
                                text-[var(--commerce-ink-soft)]
                              "
                            >
                              {quantity} ×{" "}
                              {formatPrice(
                                product.price
                              )}
                            </p>
                          </div>

                          <p
                            className="
                              commerce-sans
                              text-[0.92rem]
                              font-[750]
                              tabular-nums
                              tracking-[-0.03em]
                            "
                          >
                            {formatPrice(
                              lineTotal
                            )}
                          </p>
                        </article>
                      );
                    }
                  )}
                </div>
              </section>

              {/* ============================================= */}
              {/* ENTREGA                                       */}
              {/* ============================================= */}

              <section className="mt-20">
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Entrega
                </p>

                <h2
                  className="
                    commerce-display
                    mt-2
                    max-w-[600px]
                    text-[3.25rem]
                    leading-[0.9]
                    tracking-[-0.055em]
                  "
                >
                  ¿Dónde recibirás tu compra?
                </h2>

                <div
                  className="
                    mt-10
                    grid
                    grid-cols-2
                    gap-x-6
                    gap-y-7
                  "
                >
                  <Field
                    label="Nombre"
                    value={delivery.name}
                    onChange={(value) =>
                      updateField(
                        "name",
                        value
                      )
                    }
                    error={
                      submitted &&
                      !delivery.name.trim()
                    }
                    className="col-span-2"
                  />

                  <DepartmentField
                    value={
                      delivery.department
                    }
                    onChange={(value) =>
                      updateField(
                        "department",
                        value
                      )
                    }
                    error={
                      submitted &&
                      !delivery.department
                    }
                  />

                  <Field
                    label="Municipio"
                    value={
                      delivery.municipality
                    }
                    onChange={(value) =>
                      updateField(
                        "municipality",
                        value
                      )
                    }
                    error={
                      submitted &&
                      !delivery.municipality.trim()
                    }
                  />

                  <Field
                    label="Dirección"
                    value={
                      delivery.address
                    }
                    onChange={(value) =>
                      updateField(
                        "address",
                        value
                      )
                    }
                    error={
                      submitted &&
                      !delivery.address.trim()
                    }
                    className="col-span-2"
                  />

                  <Field
                    label="Referencia para la entrega"
                    value={
                      delivery.reference
                    }
                    onChange={(value) =>
                      updateField(
                        "reference",
                        value
                      )
                    }
                    optional
                    className="col-span-2"
                  />
                </div>
              </section>
            </div>

            {/* ============================================= */}
            {/* RESUMEN STICKY                                */}
            {/* ============================================= */}

            <aside>
              <div
                className="
                  sticky
                  top-10
                  border-t
                  border-[var(--commerce-ink)]
                  pt-6
                "
              >
                <p
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Resumen
                </p>

                <div
                  className="
                    mt-8
                    flex
                    items-baseline
                    justify-between
                    gap-8
                  "
                >
                  <div>
                    <p
                      className="
                        commerce-sans
                        text-[0.76rem]
                        font-[650]
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      {totalItems === 1
                        ? "1 unidad"
                        : `${totalItems} unidades`}
                    </p>

                    <p
                      className="
                        commerce-sans
                        mt-1
                        text-[0.8rem]
                        font-[700]
                      "
                    >
                      Total de productos
                    </p>
                  </div>

                  <p
                    className="
                      commerce-display
                      text-[2.3rem]
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    {formatPrice(
                      subtotal
                    )}
                  </p>
                </div>

                <p
                  className="
                    commerce-sans
                    mt-7
                    border-t
                    border-[var(--commerce-line)]
                    pt-5
                    text-[0.74rem]
                    leading-[1.55]
                    text-[var(--commerce-muted)]
                  "
                >
                  El costo de envío se
                  confirma por WhatsApp.
                </p>

                <button
                  type="submit"
                  disabled={preparing}
                  className="
                    commerce-sans
                    mt-7
                    flex
                    h-[54px]
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--commerce-ink)]
                    px-7
                    text-[0.82rem]
                    font-[700]
                    tracking-[-0.02em]
                    text-[var(--commerce-paper)]
                    disabled:cursor-wait
                    disabled:opacity-80
                  "
                >
                  {preparing
                    ? "Preparando compra…"
                    : "Confirmar por WhatsApp"}
                </button>
              </div>
            </aside>
          </div>

          {/* ================================================= */}
          {/* MOBILE                                            */}
          {/* ================================================= */}

          <div className="md:hidden">
            {/* ============================================= */}
            {/* PRODUCTOS                                     */}
            {/* ============================================= */}

            <section className="pt-10">
              <div
                className="
                  flex
                  items-end
                  justify-between
                  gap-6
                "
              >
                <div>
                  <p
                    className="
                      commerce-label
                      text-[var(--commerce-muted)]
                    "
                  >
                    Tu pedido
                  </p>

                  <h2
                    className="
                      commerce-display
                      mt-2
                      text-[2.7rem]
                      leading-[0.88]
                      tracking-[-0.055em]
                    "
                  >
                    Lo que llevas.
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={openCart}
                  className="
                    commerce-sans
                    min-h-10
                    shrink-0
                    text-[0.72rem]
                    font-[650]
                    underline
                    decoration-[var(--commerce-line-strong)]
                    underline-offset-4
                  "
                >
                  Modificar
                </button>
              </div>

              <div
                className="
                  mt-7
                  border-t
                  border-[var(--commerce-line)]
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
                        key={product.id}
                        className="
                          grid
                          grid-cols-[72px_minmax(0,1fr)]
                          gap-4
                          border-b
                          border-[var(--commerce-line)]
                          py-5
                        "
                      >
                        <div
                          className="
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-[15px]
                            bg-[var(--commerce-paper)]
                          "
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="72px"
                            className="
                              object-contain
                              p-2.5
                            "
                          />
                        </div>

                        <div>
                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-4
                            "
                          >
                            <h3
                              className="
                                commerce-sans
                                text-[0.88rem]
                                font-[700]
                                leading-[1.25]
                                tracking-[-0.03em]
                              "
                            >
                              {product.name}
                            </h3>

                            <p
                              className="
                                commerce-sans
                                shrink-0
                                text-[0.83rem]
                                font-[750]
                                tabular-nums
                              "
                            >
                              {formatPrice(
                                lineTotal
                              )}
                            </p>
                          </div>

                          <p
                            className="
                              commerce-sans
                              mt-2
                              text-[0.72rem]
                              text-[var(--commerce-muted)]
                            "
                          >
                            {quantity} ×{" "}
                            {formatPrice(
                              product.price
                            )}
                          </p>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>

              <div
                className="
                  flex
                  items-end
                  justify-between
                  gap-5
                  pt-6
                "
              >
                <div>
                  <p
                    className="
                      commerce-sans
                      text-[0.7rem]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {totalItems === 1
                      ? "1 unidad"
                      : `${totalItems} unidades`}
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-1
                      text-[0.8rem]
                      font-[700]
                    "
                  >
                    Total de productos
                  </p>
                </div>

                <p
                  className="
                    commerce-display
                    text-[2rem]
                    leading-none
                    tracking-[-0.05em]
                  "
                >
                  {formatPrice(
                    subtotal
                  )}
                </p>
              </div>
            </section>

            {/* ============================================= */}
            {/* ENTREGA                                       */}
            {/* ============================================= */}

            <section
              className="
                mt-14
                border-t
                border-[var(--commerce-line)]
                pt-10
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

              <h2
                className="
                  commerce-display
                  mt-2
                  text-[2.7rem]
                  leading-[0.88]
                  tracking-[-0.055em]
                "
              >
                ¿Dónde recibirás tu compra?
              </h2>

              <div
                className="
                  mt-9
                  space-y-6
                "
              >
                <Field
                  label="Nombre"
                  value={delivery.name}
                  onChange={(value) =>
                    updateField(
                      "name",
                      value
                    )
                  }
                  error={
                    submitted &&
                    !delivery.name.trim()
                  }
                />

                <DepartmentField
                  value={
                    delivery.department
                  }
                  onChange={(value) =>
                    updateField(
                      "department",
                      value
                    )
                  }
                  error={
                    submitted &&
                    !delivery.department
                  }
                />

                <Field
                  label="Municipio"
                  value={
                    delivery.municipality
                  }
                  onChange={(value) =>
                    updateField(
                      "municipality",
                      value
                    )
                  }
                  error={
                    submitted &&
                    !delivery.municipality.trim()
                  }
                />

                <Field
                  label="Dirección"
                  value={
                    delivery.address
                  }
                  onChange={(value) =>
                    updateField(
                      "address",
                      value
                    )
                  }
                  error={
                    submitted &&
                    !delivery.address.trim()
                  }
                />

                <Field
                  label="Referencia para la entrega"
                  value={
                    delivery.reference
                  }
                  onChange={(value) =>
                    updateField(
                      "reference",
                      value
                    )
                  }
                  optional
                />
              </div>
            </section>

            {/* ============================================= */}
            {/* CONFIRMACIÓN                                  */}
            {/* ============================================= */}

            <section
              className="
                mt-14
                border-t
                border-[var(--commerce-ink)]
                pt-6
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
                      commerce-sans
                      text-[0.7rem]
                      text-[var(--commerce-muted)]
                    "
                  >
                    {totalItems === 1
                      ? "1 unidad"
                      : `${totalItems} unidades`}
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-1
                      text-[0.8rem]
                      font-[700]
                    "
                  >
                    Total de productos
                  </p>
                </div>

                <p
                  className="
                    commerce-display
                    text-[2.1rem]
                    leading-none
                    tracking-[-0.05em]
                  "
                >
                  {formatPrice(
                    subtotal
                  )}
                </p>
              </div>

              <p
                className="
                  commerce-sans
                  mt-5
                  text-[0.72rem]
                  leading-[1.55]
                  text-[var(--commerce-muted)]
                "
              >
                El costo de envío se
                confirma por WhatsApp.
              </p>

              <button
                type="submit"
                disabled={preparing}
                className="
                  commerce-sans
                  mt-6
                  flex
                  h-[54px]
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--commerce-ink)]
                  px-6
                  text-[0.82rem]
                  font-[700]
                  tracking-[-0.02em]
                  text-[var(--commerce-paper)]
                  disabled:cursor-wait
                  disabled:opacity-80
                "
              >
                {preparing
                  ? "Preparando compra…"
                  : "Confirmar por WhatsApp"}
              </button>
            </section>
          </div>
        </div>
      </form>
    </main>
  );
}

/* ================================================= */
/* FIELD                                             */
/* ================================================= */

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  optional?: boolean;
  className?: string;
};

function Field({
  label,
  value,
  onChange,
  error = false,
  optional = false,
  className = "",
}: FieldProps) {
  return (
    <label
      className={`
        block
        ${className}
      `}
    >
      <span
        className="
          commerce-sans
          flex
          items-baseline
          justify-between
          gap-4
          text-[0.72rem]
          font-[650]
          text-[var(--commerce-ink)]
        "
      >
        {label}

        {optional && (
          <span
            className="
              text-[0.64rem]
              font-[500]
              text-[var(--commerce-muted)]
            "
          >
            Opcional
          </span>
        )}
      </span>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={`
          commerce-sans
          mt-3
          h-12
          w-full
          border-0
          border-b
          bg-transparent
          px-0
          text-[0.9rem]
          text-[var(--commerce-ink)]
          outline-none
          transition-colors
          duration-200

          ${
            error
              ? "border-red-500"
              : "border-[var(--commerce-line-strong)] focus:border-[var(--commerce-ink)]"
          }
        `}
      />

      {error && (
        <span
          className="
            commerce-sans
            mt-2
            block
            text-[0.66rem]
            font-[600]
            text-red-700
          "
        >
          Completa este dato.
        </span>
      )}
    </label>
  );
}

/* ================================================= */
/* DEPARTAMENTO                                      */
/* ================================================= */

type DepartmentFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

function DepartmentField({
  value,
  onChange,
  error = false,
}: DepartmentFieldProps) {
  return (
    <label className="block">
      <span
        className="
          commerce-sans
          text-[0.72rem]
          font-[650]
          text-[var(--commerce-ink)]
        "
      >
        Departamento
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className={`
          commerce-sans
          mt-3
          h-12
          w-full
          appearance-none
          border-0
          border-b
          bg-transparent
          px-0
          text-[0.9rem]
          outline-none
          transition-colors
          duration-200

          ${
            value
              ? "text-[var(--commerce-ink)]"
              : "text-[var(--commerce-muted)]"
          }

          ${
            error
              ? "border-red-500"
              : "border-[var(--commerce-line-strong)] focus:border-[var(--commerce-ink)]"
          }
        `}
      >
        <option value="">
          Selecciona departamento
        </option>

        {departments.map(
          (department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          )
        )}
      </select>

      {error && (
        <span
          className="
            commerce-sans
            mt-2
            block
            text-[0.66rem]
            font-[600]
            text-red-700
          "
        >
          Selecciona un departamento.
        </span>
      )}
    </label>
  );
}
