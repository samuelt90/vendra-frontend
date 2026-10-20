"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  MagnifyingGlass,
  Plus,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

import {
  commerceProducts,
  type CommerceProduct,
} from "../../data/products";
import { useCommerceCart } from "../cart/CommerceCartProvider";
import BusinessPurchasePanel from "../wholesale/BusinessPurchasePanel";
import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type CommerceAssistantProps = {
  variant?: "page" | "floating";
};

const suggestions = [
  "Audífonos",
  "Audio por menos de Q350",
  "Teclado",
  "Creadores",
  "Comprar por mayor",
  "20 audifonos por mayor",
];

const ignoredWords = new Set([
  "quiero",
  "necesito",
  "busco",
  "buscar",
  "algo",
  "producto",
  "productos",
  "para",
  "por",
  "con",
  "de",
  "del",
  "el",
  "la",
  "los",
  "las",
  "un",
  "una",
  "unos",
  "unas",
  "que",
  "en",
  "me",
  "menos",
  "hasta",
  "precio",
  "precios",
  "presupuesto",
  "maximo",
  "quetzales",
  "q",
  "comprar",
  "compras",
  "recomienda",
  "tienes",
  "tienen",
  "venden",
  "vender",
  "venta",
  "ventas",
  "mayor",
  "mayorista",
  "mayoristas",
  "negocio",
  "negocios",
  "unidades",
  "unidad",
  "piezas",
  "pieza",
  "cantidad",
  "cantidades",
  "cotizar",
  "cotizacion",
  "revender",
  "reventa",
  "distribuidor",
  "distribuidores",
  "lote",
  "lotes",
  "volumen",
  "mejor",
  "condicion",
  "condiciones",
  "cuanto",
  "cuesta",
  "puedo",
  "pueden",
  "mi",
]);



function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isWholesaleIntent(query: string) {
  const text = normalize(query);

  return (
    /\b(mayoristas?|por mayor|reventa|revender|distribuidores?|lotes?|volumen|cantidades|negocios?)\b/.test(
      text
    ) ||
    /\b\d+\s*(unidades?|piezas?)\b/.test(text)
  );
}


function extractBudget(value: string): number | null {
  const text = normalize(value);

  const match = text.match(
    /(?:menos de|hasta|maximo|presupuesto de)\s*q?\s*(\d+(?:[.,]\d{1,2})?)|q\s*(\d+(?:[.,]\d{1,2})?)/
  );

  const amount = match?.[1] ?? match?.[2];

  if (!amount) return null;

  const number = Number(amount.replace(",", "."));

  return Number.isFinite(number) && number > 0
    ? number
    : null;
}

function extractTerms(value: string) {
  const text = normalize(value)
    .replace(/q\s*\d+(?:[.,]\d+)?/g, " ")
    .replace(/\b\d+\b/g, " ");

  const aliases: Record<string, string> = {
    auriculares: "audifonos",
    cascos: "audifonos",
    parlantes: "bocina",
    parlante: "bocina",
    reloj: "smartwatch",
    relojes: "smartwatch",
    computadora: "computacion",
    computadoras: "computacion",
    tiktok: "creadores",
    contenido: "creadores",
  };

  return [...new Set(
    text
      .split(/[^a-z0-9]+/)
      .filter(
        (word) =>
          word.length > 1 && !ignoredWords.has(word)
      )
      .map((word) => aliases[word] ?? word)
  )];
}

function searchProducts(query: string) {
 const terms = extractTerms(query);
const budget = extractBudget(query);
const wholesaleIntent = isWholesaleIntent(query);

if (
  terms.length === 0 &&
  budget === null &&
  !wholesaleIntent
) {
  return [];
}


  return commerceProducts
    .filter((product) => {
      if (wholesaleIntent && !product.wholesaleEnabled) {
  return false;
}
  
      if (budget !== null && product.price > budget) {
        return false;
      }

      const content = normalize(
        [
          product.name,
          product.category,
          product.description,
          ...product.features,
          ...product.specifications.flatMap((spec) => [
            spec.label,
            spec.value,
          ]),
        ].join(" ")
      );

      return terms.every((term) =>
        content.includes(term)
      );
    })
    .sort((a, b) => a.price - b.price);
}

function formatPrice(amount: number) {
  return `Q${new Intl.NumberFormat("es-GT").format(amount)}`;
}

export default function CommerceAssistant({
  variant = "page",
}: CommerceAssistantProps) {
  const isFloating = variant === "floating";
  const reduceMotion = useReducedMotion();
  const { addProduct } = useCommerceCart();

  const [input, setInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);

  const [selectedWholesale, setSelectedWholesale] =
    useState<CommerceProduct | null>(null);

  const [wholesaleOpen, setWholesaleOpen] = useState(false);

  const results = useMemo(
    () => searchProducts(submittedQuery),
    [submittedQuery]
  );

  const hasResults = submittedQuery.length > 0;
  const wholesaleIntent = isWholesaleIntent(submittedQuery);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = input.trim();

    if (!query) return;

    setSubmittedQuery(query);
    setAddedId(null);
  }

  function selectSuggestion(query: string) {
    setInput(query);
    setSubmittedQuery(query);
    setAddedId(null);
  }

  function clearSearch() {
    setInput("");
    setSubmittedQuery("");
    setAddedId(null);
  }

  function addToCart(product: CommerceProduct) {
    addProduct(product);
    setAddedId(product.id);
  }

  return (
    <>
      <div
        className={`
          commerce-sans
          mx-auto w-full
          ${isFloating ? "max-w-[680px]" : "max-w-[1120px]"}
        `}
      >
        {/* ENCABEZADO */}

        <div
          className={
            isFloating
              ? "pt-2"
              : "pt-4 md:pt-12"
          }
        >
          <div className="flex items-center gap-2 text-[var(--commerce-accent)]">
            <Sparkle size={17} weight="regular" />

            <span className="text-[0.7rem] font-[700] uppercase tracking-[0.12em]">
              Asistente de compras
            </span>
          </div>

          <h1
            className={`
              commerce-display
              mt-5 tracking-[-0.06em]
              text-[var(--commerce-ink)]
              ${
                isFloating
                  ? "text-[2.6rem] leading-[0.95]"
                  : "max-w-[11ch] text-[clamp(3.5rem,12vw,7rem)] leading-[0.88]"
              }
            `}
          >
            ¿Qué producto necesitas?
          </h1>

          <p
            className="
              mt-5 max-w-[34rem]
              text-[0.86rem] leading-[1.65]
              text-[var(--commerce-ink-soft)]
              md:text-[0.95rem]
            "
          >
            Describe lo que buscas. Encuentra productos,
            revisa sus precios y agrégalos a tu compra.
          </p>
        </div>

        {/* BUSCADOR */}

        <form
          onSubmit={submitSearch}
          className={isFloating ? "mt-7" : "mt-10 md:mt-14"}
        >
          <div
            className="
              flex min-h-[60px] items-center gap-3
              rounded-[20px]
              border border-[var(--commerce-line-strong)]
              bg-[var(--commerce-paper)]
              py-2 pl-4 pr-2
              shadow-[0_9px_28px_rgba(23,22,18,0.045)]
              transition-colors
              focus-within:border-[var(--commerce-ink)]
            "
          >
            <MagnifyingGlass
              size={21}
              weight="regular"
              className="shrink-0 text-[var(--commerce-muted)]"
            />

            <input
              type="search"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Ej. Audífonos por menos de Q400"
              aria-label="¿Qué producto necesitas?"
              enterKeyHint="search"
              autoComplete="off"
              className="
                min-w-0 flex-1
                bg-transparent
                text-[0.86rem]
                text-[var(--commerce-ink)]
                outline-none
                placeholder:text-[var(--commerce-muted)]
                md:text-[0.97rem]
              "
            />

            {input && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Limpiar búsqueda"
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  text-[var(--commerce-muted)]
                "
              >
                <X size={17} />
              </button>
            )}

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Buscar productos"
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-[14px]
                bg-[var(--commerce-ink)]
                text-[var(--commerce-paper)]
                transition-opacity
                disabled:opacity-35
              "
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        {/* SUGERENCIAS */}

        <div className="mt-5 flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => selectSuggestion(suggestion)}
              className="
                min-h-9 rounded-full
                border border-[var(--commerce-line)]
                px-3.5 py-2
                text-[0.72rem] font-[600]
                text-[var(--commerce-ink-soft)]
                transition-colors
                hover:border-[var(--commerce-line-strong)]
                hover:text-[var(--commerce-ink)]
              "
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* RESULTADOS */}

        {hasResults && (
          <motion.section
            key={submittedQuery}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: commerceDuration.interface,
              ease: commerceEase.enter,
            }}
            className="mt-10 md:mt-14"
            aria-live="polite"
          >
            {wholesaleIntent && (
  <div
    className="
      mb-8
      rounded-[20px]
      border
      border-[var(--commerce-line)]
      bg-[var(--commerce-paper)]
      p-5
      md:p-7
    "
  >
    <p
      className="
        commerce-sans
        text-[0.68rem]
        font-[700]
        uppercase
        tracking-[0.1em]
        text-[var(--commerce-accent)]
      "
    >
      Compras para tu negocio
    </p>

    <h3
      className="
        commerce-display
        mt-3
        text-[2rem]
        leading-[0.95]
        tracking-[-0.05em]
      "
    >
      Compra por mayor en Vendra.
    </h3>

    <p
      className="
        commerce-sans
        mt-4
        max-w-[34rem]
        text-[0.84rem]
        leading-[1.65]
        text-[var(--commerce-ink-soft)]
      "
    >
      Puedes solicitar una mejor condición según el
      producto y la cantidad que necesitas. El precio
      mayorista se confirma directamente con ventas,
      considerando la disponibilidad.
    </p>

    <Link
      href="/comercio/mayoristas"
      className="
        commerce-sans
        mt-6
        inline-flex
        items-center
        gap-3
        border-b
        border-[var(--commerce-line-strong)]
        pb-1
        text-[0.82rem]
        font-[700]
      "
    >
      Explorar productos mayoristas
      <ArrowRight size={17} />
    </Link>
  </div>
)}


            <div className="mb-6 border-b border-[var(--commerce-line)] pb-5">
              <p
                className="
                  text-[0.69rem] font-[700]
                  uppercase tracking-[0.1em]
                  text-[var(--commerce-muted)]
                "
              >
                Resultados para
              </p>

              <h2
                className="
                  commerce-display
                  mt-2 text-[2rem]
                  leading-[1.05]
                  tracking-[-0.045em]
                  md:text-[3rem]
                "
              >
                {submittedQuery}
              </h2>

              <p className="mt-3 text-[0.76rem] text-[var(--commerce-ink-soft)]">
                {results.length}{" "}
                {results.length === 1
                  ? "producto encontrado"
                  : "productos encontrados"}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2 md:gap-5">
                {results.map((product) => (
                  <article
                    key={product.id}
                    className="
                      flex min-w-0 flex-col
                      rounded-[20px]
                      border border-[var(--commerce-line)]
                      bg-[var(--commerce-paper)]
                      p-3 md:p-4
                    "
                  >
                    <div className="flex gap-3 md:gap-4">
                      <Link
                        href={product.href}
                        aria-label={`Ver ${product.name}`}
                        className="
                          relative aspect-square
                          w-[104px] shrink-0
                          overflow-hidden rounded-[14px]
                          bg-[#e9e2d7]
                          md:w-[128px]
                        "
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="128px"
                          className="object-contain p-2"
                        />
                      </Link>

                      <div className="min-w-0 flex-1 py-1">
                        <p
                          className="
                            text-[0.65rem] font-[650]
                            text-[var(--commerce-muted)]
                          "
                        >
                          {product.category}
                        </p>

                        <Link
                          href={product.href}
                          className="
                            mt-1 block
                            text-[0.91rem] font-[700]
                            leading-[1.35]
                            tracking-[-0.025em]
                            text-[var(--commerce-ink)]
                          "
                        >
                          {product.name}
                        </Link>

                        <p className="mt-2 text-[1.2rem] font-[750] tracking-[-0.05em]">
                          {formatPrice(product.price)}
                        </p>

                        {product.status && (
                          <p
                            className="
                              mt-1 text-[0.67rem]
                              text-[var(--commerce-muted)]
                            "
                          >
                            {product.status}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {product.canAddDirectly && (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="
                            inline-flex min-h-10
                            items-center justify-center gap-2
                            rounded-full
                            bg-[var(--commerce-ink)]
                            px-4 text-[0.75rem]
                            font-[700]
                            text-[var(--commerce-paper)]
                          "
                        >
                          <Plus size={15} />
                          {addedId === product.id
                            ? "Agregar otra"
                            : "Agregar"}
                        </button>
                      )}

                      {product.wholesaleEnabled && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedWholesale(product);
                            setWholesaleOpen(true);
                          }}
                          className="
                            inline-flex min-h-10
                            items-center justify-center
                            rounded-full
                            border
                            border-[var(--commerce-line-strong)]
                            px-3 text-[0.73rem]
                            font-[650]
                            text-[var(--commerce-ink)]
                          "
                        >
                          Por mayor
                        </button>
                      )}

                      <Link
                        href={product.href}
                        className="
                          ml-auto
                          text-[0.7rem] font-[650]
                          text-[var(--commerce-ink-soft)]
                          underline underline-offset-4
                        "
                      >
                        Detalles
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-6">
                <h3
                  className="
                    commerce-display
                    text-[2.4rem]
                    leading-[0.95]
                    tracking-[-0.05em]
                  "
                >
                  No encontramos coincidencias.
                </h3>

                <p
                  className="
                    mt-4 max-w-[33rem]
                    text-[0.85rem] leading-[1.6]
                    text-[var(--commerce-ink-soft)]
                  "
                >
                  Prueba con otro producto o cambia
                  el presupuesto de tu búsqueda.
                </p>

                <Link
                  href="/comercio/tienda"
                  className="
                    mt-6 inline-flex items-center gap-2
                    border-b border-[var(--commerce-line-strong)]
                    pb-1 text-[0.8rem] font-[700]
                  "
                >
                  Explorar la tienda
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </motion.section>
        )}
      </div>

      {selectedWholesale && (
        <BusinessPurchasePanel
          product={selectedWholesale}
          open={wholesaleOpen}
          onClose={() => setWholesaleOpen(false)}
        />
      )}
    </>
  );
}

