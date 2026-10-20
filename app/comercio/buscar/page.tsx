"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  X,
  ArrowRight,
} from "@phosphor-icons/react";

import {
  commerceProducts,
  type CommerceProduct,
} from "../data/products";

import ProductCard from "../components/products/ProductCard";
import MobileProductCard from "../components/products/MobileProductCard";
import BusinessPurchasePanel from "../components/wholesale/BusinessPurchasePanel";

const PAGE_SIZE = 6;

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

type SearchResultProps = {
  product: CommerceProduct;
  index: number;
  mobile?: boolean;
  onWholesale: (product: CommerceProduct) => void;
};

function SearchResult({
  product,
  index,
  mobile = false,
  onWholesale,
}: SearchResultProps) {
  return (
    <div className="flex min-w-0 flex-col">
      {mobile ? (
        <MobileProductCard
          product={product}
          index={index}
        />
      ) : (
        <ProductCard
          product={product}
          index={index}
        />
      )}

      {product.wholesaleEnabled && (
        <button
          type="button"
          onClick={() => onWholesale(product)}
          className="
            commerce-sans
            group mt-2 flex
            min-h-14 w-full
            items-center justify-between
            gap-2 rounded-xl
            border border-[var(--commerce-line-strong)]
            bg-[var(--commerce-paper)]
            px-3 text-left
            transition-colors
            hover:border-[var(--commerce-accent)]
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[var(--commerce-accent)]
            md:mt-3 md:px-5
          "
        >
          <span className="min-w-0">
            <span
              className="
                block text-[0.72rem]
                font-[700] leading-tight
                tracking-[-0.02em]
                md:text-[0.84rem]
              "
            >
              Comprar por mayor
            </span>

            <span
              className="
                mt-1 block text-[0.61rem]
                leading-tight
                text-[var(--commerce-muted)]
                md:text-[0.72rem]
              "
            >
              Solicitar precio por cantidad
            </span>
          </span>

          <ArrowRight
            size={17}
            weight="regular"
            className="
              shrink-0
              text-[var(--commerce-accent)]
              transition-transform
              group-hover:translate-x-1
            "
          />
        </button>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const [
    selectedWholesaleProduct,
    setSelectedWholesaleProduct,
  ] = useState<CommerceProduct | null>(null);

  const [wholesaleOpen, setWholesaleOpen] =
    useState(false);

  const results = useMemo(() => {
    const search = normalize(query);

    if (!search) return [];

    return commerceProducts.filter((product) => {
      const searchableText = normalize(
        [
          product.name,
          product.category,
          product.description,
          product.badge ?? "",
          ...product.features,
          ...product.specifications.flatMap(
            (specification) => [
              specification.label,
              specification.value,
            ]
          ),
        ].join(" ")
      );

      return searchableText.includes(search);
    });
  }, [query]);

  const visibleProducts = results.slice(
    0,
    visibleCount
  );

  const hasQuery = query.trim().length > 0;
  const hasMore = visibleCount < results.length;

  function updateQuery(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  function openWholesale(product: CommerceProduct) {
    setSelectedWholesaleProduct(product);
    setWholesaleOpen(true);
  }

  return (
    <>
      <main
        className="
          min-h-svh
          bg-[var(--commerce-bg)]
          px-[var(--commerce-page-x)]
          pb-32 pt-32
          text-[var(--commerce-ink)]
          md:pb-28 md:pt-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          {/* INTRO */}

          <div className="max-w-[880px]">
            <p
              className="
                commerce-label
                text-[var(--commerce-muted)]
              "
            >
              COMPRAS PARA TU NEGOCIO
            </p>

            <h1
              className="
                commerce-display
                mt-4
                max-w-[11ch]
                text-[clamp(3rem,11vw,6rem)]
                leading-[0.92]
                tracking-[-0.055em]
              "
            >
              ¿Qué producto necesitas?
            </h1>

            <p
              className="
                commerce-sans
                mt-6 max-w-[34rem]
                text-[0.88rem]
                leading-[1.65]
                text-[var(--commerce-ink-soft)]
                md:text-[1rem]
              "
            >
              Encuentra productos para tu negocio.
              Selecciona el que necesitas y solicita
              una mejor condición según la cantidad.
            </p>

            {/* BUSCADOR */}

            <div
              className="
                mt-10 flex items-center gap-3
                border-b
                border-[var(--commerce-line-strong)]
                pb-4 md:mt-14
              "
            >
              <MagnifyingGlass
                size={23}
                weight="regular"
                className="
                  shrink-0
                  text-[var(--commerce-muted)]
                "
              />

              <input
                type="search"
                value={query}
                onChange={(event) =>
                  updateQuery(event.target.value)
                }
                placeholder="Busca un producto"
                aria-label="Buscar productos"
                autoComplete="off"
                enterKeyHint="search"
                className="
                  commerce-sans
                  min-w-0 flex-1
                  bg-transparent
                  text-[1rem]
                  outline-none
                  placeholder:text-[var(--commerce-muted)]
                  md:text-[1.25rem]
                "
              />

              {hasQuery && (
                <button
                  type="button"
                  onClick={() => updateQuery("")}
                  aria-label="Limpiar búsqueda"
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                  "
                >
                  <X size={19} />
                </button>
              )}
            </div>
          </div>

          {/* ESTADO INICIAL */}

          {!hasQuery && (
            <section
              className="
                mt-12 max-w-[880px]
                border-t
                border-[var(--commerce-line)]
                pt-7 md:mt-16
              "
            >
              <div
                className="
                  flex flex-col gap-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      commerce-sans
                      text-[0.9rem]
                      font-[700]
                      tracking-[-0.025em]
                    "
                  >
                    ¿Necesitas varias unidades?
                  </p>

                  <p
                    className="
                      commerce-sans
                      mt-2 max-w-[27rem]
                      text-[0.79rem]
                      leading-[1.6]
                      text-[var(--commerce-ink-soft)]
                    "
                  >
                    Explora los productos disponibles
                    para compras por mayor.
                  </p>
                </div>

                <Link
                  href="/comercio/mayoristas"
                  className="
                    commerce-sans
                    inline-flex min-h-11
                    shrink-0 items-center
                    gap-3 self-start
                    border-b
                    border-[var(--commerce-line-strong)]
                    text-[0.82rem]
                    font-[700]
                    tracking-[-0.025em]
                  "
                >
                  Ver mayoristas

                  <ArrowRight
                    size={17}
                    weight="regular"
                  />
                </Link>
              </div>
            </section>
          )}

          {/* RESULTADOS */}

          {hasQuery && (
            <section className="mt-12 md:mt-16">
              {results.length > 0 ? (
                <>
                  <div
                    className="
                      mb-7 flex
                      items-end justify-between
                      gap-4
                    "
                  >
                    <div>
                      <p
                        className="
                          commerce-label
                          text-[var(--commerce-muted)]
                        "
                      >
                        RESULTADOS
                      </p>

                      <p
                        className="
                          commerce-sans
                          mt-2 text-[0.85rem]
                          text-[var(--commerce-ink-soft)]
                        "
                      >
                        {results.length}{" "}
                        {results.length === 1
                          ? "producto encontrado"
                          : "productos encontrados"}
                      </p>
                    </div>
                  </div>

                  {/* RESULTADOS MÓVILES */}

                  <div
                    className="
                      grid grid-cols-2
                      items-start gap-3
                      md:hidden
                    "
                  >
                    {visibleProducts.map(
                      (product, index) => (
                        <SearchResult
                          key={product.id}
                          product={product}
                          index={index}
                          mobile
                          onWholesale={openWholesale}
                        />
                      )
                    )}
                  </div>

                  {/* RESULTADOS DESKTOP */}

                  <div
                    className="
                      hidden items-start
                      gap-6 md:grid
                      md:grid-cols-2
                      xl:grid-cols-3
                    "
                  >
                    {visibleProducts.map(
                      (product, index) => (
                        <SearchResult
                          key={product.id}
                          product={product}
                          index={index}
                          onWholesale={openWholesale}
                        />
                      )
                    )}
                  </div>

                  {hasMore && (
                    <div
                      className="
                        mt-12 flex justify-center
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCount(
                            (current) =>
                              current + PAGE_SIZE
                          )
                        }
                        className="
                          commerce-sans
                          min-h-12 rounded-full
                          border
                          border-[var(--commerce-line-strong)]
                          px-7 text-[0.85rem]
                          font-[650]
                        "
                      >
                        Ver más productos
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="
                    border-t
                    border-[var(--commerce-line)]
                    py-12
                  "
                >
                  <h2
                    className="
                      commerce-display
                      text-[2.5rem]
                      leading-none
                      tracking-[-0.05em]
                    "
                  >
                    No encontramos coincidencias.
                  </h2>

                  <p
                    className="
                      commerce-sans
                      mt-4 text-[0.88rem]
                      text-[var(--commerce-ink-soft)]
                    "
                  >
                    Prueba con otro nombre o categoría.
                  </p>

                  <Link
                    href="/comercio/mayoristas"
                    className="
                      commerce-sans
                      mt-7 inline-flex
                      items-center gap-3
                      border-b
                      border-[var(--commerce-line-strong)]
                      pb-1 text-[0.84rem]
                      font-[700]
                    "
                  >
                    Explorar productos mayoristas
                    <ArrowRight size={17} />
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      {/* PANEL MAYORISTA REUTILIZADO */}

      {selectedWholesaleProduct && (
        <BusinessPurchasePanel
          product={selectedWholesaleProduct}
          open={wholesaleOpen}
          onClose={() => setWholesaleOpen(false)}
        />
      )}
    </>
  );
}

