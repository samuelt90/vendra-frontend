"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

import {
  ArrowRight,
  CaretDown,
  FunnelSimple,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";

import StoreProductStage from "./StoreProductStage";
import StoreEditorialProducts from "./StoreEditorialProducts";

import {
  commerceProducts,
  type CommerceProduct,
} from "../../data/products";

import {
  storeCategories,
  type StoreCategoryId,
} from "../../data/store-categories";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type CategoryFilter = "todos" | StoreCategoryId;

type CommercialFilter =
  | "all"
  | "nuevo"
  | "precio-especial"
  | "ultimas-unidades"
  | "temporada"
  | "disponibles";

type StorePanel =
  | "categorias"
  | "buscar"
  | "filtros"
  | null;

const categoryOptions: {
  id: CategoryFilter;
  label: string;
}[] = [
  {
    id: "todos",
    label: "Toda la tecnología",
  },
  ...storeCategories.map((category) => ({
    id: category.id,
    label: category.name,
  })),
];

const commercialOptions: {
  id: CommercialFilter;
  label: string;
}[] = [
  { id: "all", label: "Todos los productos" },
  { id: "nuevo", label: "Novedades" },
  { id: "precio-especial", label: "Precios especiales" },
  { id: "ultimas-unidades", label: "Últimas unidades" },
  { id: "temporada", label: "Temporada" },
  { id: "disponibles", label: "Disponibles" },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getCategory(value: string | null): CategoryFilter {
  return categoryOptions.some((option) => option.id === value)
    ? (value as CategoryFilter)
    : "todos";
}

function getCommercialFilter(
  value: string | null
): CommercialFilter {
  return commercialOptions.some(
    (option) => option.id === value
  )
    ? (value as CommercialFilter)
    : "all";
}

function matchesCategory(
  product: CommerceProduct,
  category: CategoryFilter
) {
  if (category === "todos") return true;

  const productCategory = normalizeText(product.category);

  if (category === "creadores") {
    return (
      productCategory === "creadores" ||
      productCategory === "creador"
    );
  }

  return productCategory === category;
}

function matchesCommercialFilter(
  product: CommerceProduct,
  filter: CommercialFilter
) {
  switch (filter) {
    case "nuevo":
      return product.badge === "Nuevo";

    case "precio-especial":
      return product.badge === "Precio especial";

    case "ultimas-unidades":
      return product.badge === "Últimas unidades";

    case "disponibles":
      return normalizeText(
        product.status ?? ""
      ).includes("dispon");

    case "temporada":
      return false;

    default:
      return true;
  }
}

export default function CommerceStore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");
  const [panel, setPanel] = useState<StorePanel>(null);

  const category = getCategory(
    searchParams.get("categoria")
  );

  const commercialFilter = getCommercialFilter(
    searchParams.get("filtro")
  );

  const filteredProducts = useMemo(() => {
    const search = normalizeText(query);

    return commerceProducts.filter((product) => {
      const searchableText = normalizeText(
        [
          product.name,
          product.category,
          product.description,
          ...product.features,
        ].join(" ")
      );

      const matchesSearch =
        !search || searchableText.includes(search);

      return (
        matchesSearch &&
        matchesCategory(product, category) &&
        matchesCommercialFilter(
          product,
          commercialFilter
        )
      );
    });
  }, [query, category, commercialFilter]);

  const activeCategory =
    categoryOptions.find(
      (option) => option.id === category
    )?.label ?? "Toda la tecnología";

  const hasFilters =
    category !== "todos" ||
    commercialFilter !== "all" ||
    query.trim().length > 0;

  useEffect(() => {
    if (!panel) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [panel]);

  function changeFilters(
    nextCategory: CategoryFilter,
    nextFilter: CommercialFilter
  ) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (nextCategory === "todos") {
      params.delete("categoria");
    } else {
      params.set("categoria", nextCategory);
    }

    if (nextFilter === "all") {
      params.delete("filtro");
    } else {
      params.set("filtro", nextFilter);
    }

    const suffix = params.toString();

    router.replace(
      `/comercio/tienda${suffix ? `?${suffix}` : ""}`,
      { scroll: false }
    );

    setPanel(null);
  }

  function clearFilters() {
    setQuery("");
    changeFilters("todos", "all");
  }

  function scrollToProducts() {
    document
      .getElementById("commerce-store-products")
      ?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
      });
  }

  function exploreCategory(categoryId: StoreCategoryId) {
    setQuery("");
    changeFilters(categoryId, "all");

    scrollToProducts();
  }

  return (
    <main
      className="
        min-h-svh
        bg-[var(--commerce-bg)]
        text-[var(--commerce-ink)]
      "
    >
      {/* ENCABEZADO */}

      <header
        className="
          mx-auto max-w-[1600px]
          px-[var(--commerce-page-x)]
          pb-7 pt-[105px]
          md:pb-12 md:pt-[150px]
        "
      >
        <motion.p
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: commerceDuration.interface,
            ease: commerceEase.enter,
          }}
          className="
            commerce-sans
            text-[0.66rem] font-bold
            uppercase tracking-[0.16em]
            text-[var(--commerce-muted)]
          "
        >
          Vendra / Tienda
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { y: "110%" }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : 0.7,
              ease: commerceEase.spatial,
            }}
            className="
              commerce-display
              mt-2
              text-[clamp(3.8rem,14vw,8.5rem)]
              leading-[0.88]
              tracking-[-0.07em]
            "
          >
            Explora.
          </motion.h1>
        </div>
      </header>

      {/* CONTROLES DE TIENDA */}

      <section
        className="
          border-y
          border-[var(--commerce-line)]
        "
      >
        <div
          className="
            mx-auto flex max-w-[1600px]
            items-center gap-3
            px-[var(--commerce-page-x)]
            py-3 md:gap-6 md:py-5
          "
        >
          <button
            type="button"
            onClick={() => setPanel("categorias")}
            aria-label={`Cambiar categoría. Actual: ${activeCategory}`}
            aria-haspopup="dialog"
            className="
              commerce-sans
              flex min-h-11 min-w-0 flex-1
              items-center justify-between
              gap-2 text-left
            "
          >
            <span className="min-w-0">
              <span
                className="
                  block text-[0.6rem] font-bold
                  uppercase tracking-[0.12em]
                  text-[var(--commerce-muted)]
                "
              >
                Colección
              </span>

              <span
                className="
                  block truncate
                  text-[0.88rem] font-bold
                  tracking-[-0.035em]
                  md:text-[1rem]
                "
              >
                {activeCategory}
              </span>
            </span>

            <CaretDown
              size={17}
              className="shrink-0"
            />
          </button>

          <div
            className="
              h-8 w-px
              bg-[var(--commerce-line)]
            "
          />

          <button
            type="button"
            onClick={() => setPanel("buscar")}
            aria-label="Buscar productos"
            aria-haspopup="dialog"
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
            "
          >
            <MagnifyingGlass size={22} />
          </button>

          <button
            type="button"
            onClick={() => setPanel("filtros")}
            aria-label="Filtrar productos"
            aria-haspopup="dialog"
            className="
              relative flex h-11 w-11 shrink-0
              items-center justify-center
            "
          >
            <FunnelSimple size={22} />

            {commercialFilter !== "all" && (
              <span
                className="
                  absolute right-0 top-0
                  h-2 w-2 rounded-full
                  bg-[var(--commerce-accent)]
                "
              />
            )}
          </button>
        </div>
      </section>

      {/* CATÁLOGO: CARRUSEL + ESCAPARATE */}

      <section
        className="
          mx-auto max-w-[1600px]
          px-[var(--commerce-page-x)]
          pb-32 pt-5 md:pb-24 md:pt-9
        "
      >
        <StoreProductStage
          categories={storeCategories}
          onExplore={exploreCategory}
        />

        <StoreEditorialProducts
          products={filteredProducts}
          onClearFilters={clearFilters}
        />

        {hasFilters && (
          <div
            className="
              mt-10 flex items-center
              justify-between gap-4
              border-t border-[var(--commerce-line)]
              pt-5
            "
          >
            <p
              aria-live="polite"
              className="
                commerce-sans text-xs
                text-[var(--commerce-muted)]
              "
            >
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                commerce-sans text-xs
                font-bold underline
                underline-offset-4
              "
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </section>

      {/* PANEL DE CATEGORÍAS, BÚSQUEDA Y FILTROS */}

      <AnimatePresence>
        {panel && (
          <div
            className="
              fixed inset-0 z-[120]
              flex items-end justify-center
              md:items-center
            "
          >
            <motion.button
              type="button"
              aria-label="Cerrar selector"
              onClick={() => setPanel(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                absolute inset-0 bg-black/40
              "
            />

            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="commerce-store-panel-title"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 65 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 45 }
              }
              transition={{
                duration: reduceMotion
                  ? commerceDuration.micro
                  : commerceDuration.interface,
                ease: commerceEase.spatial,
              }}
              className="
                relative z-10
                max-h-[85svh] w-full
                overflow-y-auto
                rounded-t-[28px]
                bg-[var(--commerce-paper)]
                px-6 pt-6
                pb-[calc(1.5rem+env(safe-area-inset-bottom))]
                shadow-2xl
                md:max-w-[530px]
                md:rounded-[28px] md:p-9
              "
            >
              <div
                className="
                  mb-7 flex items-center
                  justify-between
                "
              >
                <p
                  className="
                    commerce-sans
                    text-[0.65rem] font-bold
                    uppercase tracking-[0.13em]
                    text-[var(--commerce-muted)]
                  "
                >
                  Vendra / Catálogo
                </p>

                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setPanel(null)}
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full border
                    border-[var(--commerce-line)]
                  "
                >
                  <X size={19} />
                </button>
              </div>

              <h2
                id="commerce-store-panel-title"
                className="
                  commerce-display mb-7
                  text-[clamp(2.8rem,11vw,4rem)]
                  leading-[0.95]
                  tracking-[-0.06em]
                "
              >
                {panel === "categorias"
                  ? "Explora por categoría."
                  : panel === "buscar"
                    ? "¿Qué buscas?"
                    : "Refina tu búsqueda."}
              </h2>

              {/* CATEGORÍAS */}

              {panel === "categorias" && (
                <div
                  className="
                    border-t
                    border-[var(--commerce-line)]
                  "
                >
                  {categoryOptions.map((item) => {
                    const selected =
                      item.id === category;

                    const count =
                      commerceProducts.filter(
                        (product) =>
                          matchesCategory(
                            product,
                            item.id
                          )
                      ).length;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          changeFilters(
                            item.id,
                            commercialFilter
                          )
                        }
                        className="
                          flex min-h-[68px] w-full
                          items-center justify-between
                          gap-4 border-b
                          border-[var(--commerce-line)]
                          py-3 text-left
                        "
                      >
                        <span
                          className={`
                            commerce-display
                            text-[1.9rem]
                            leading-none
                            tracking-[-0.045em]
                            ${
                              selected
                                ? "text-[var(--commerce-ink)]"
                                : "text-[var(--commerce-ink-soft)]"
                            }
                          `}
                        >
                          {item.label}
                        </span>

                        <span
                          className="
                            commerce-sans flex shrink-0
                            items-center gap-3
                            text-xs
                            text-[var(--commerce-muted)]
                          "
                        >
                          {String(count).padStart(2, "0")}
                          <ArrowRight size={16} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* BUSCAR */}

              {panel === "buscar" && (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    setPanel(null);
                    scrollToProducts();
                  }}
                >
                  <div
                    className="
                      flex items-center gap-3
                      border-b
                      border-[var(--commerce-line-strong)]
                      pb-3
                    "
                  >
                    <MagnifyingGlass size={22} />

                    <input
                      autoFocus
                      type="search"
                      value={query}
                      onChange={(event) =>
                        setQuery(event.target.value)
                      }
                      placeholder="Nombre o tipo de producto"
                      aria-label="Buscar en el catálogo"
                      className="
                        commerce-sans min-w-0 flex-1
                        bg-transparent text-[1rem]
                        outline-none
                      "
                    />

                    {query && (
                      <button
                        type="button"
                        aria-label="Borrar texto"
                        onClick={() => setQuery("")}
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="
                      commerce-sans mt-7
                      flex min-h-12 w-full
                      items-center justify-center
                      gap-3 rounded-full
                      bg-[var(--commerce-ink)]
                      text-sm font-bold
                      text-[var(--commerce-paper)]
                    "
                  >
                    Ver resultados
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

              {/* FILTROS COMERCIALES */}

              {panel === "filtros" && (
                <div
                  className="
                    border-t
                    border-[var(--commerce-line)]
                  "
                >
                  {commercialOptions.map((item) => {
                    const selected =
                      item.id === commercialFilter;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          changeFilters(
                            category,
                            item.id
                          )
                        }
                        className="
                          commerce-sans
                          flex min-h-14 w-full
                          items-center justify-between
                          border-b
                          border-[var(--commerce-line)]
                          text-left text-[0.9rem]
                          font-semibold
                        "
                      >
                        {item.label}

                        <span
                          className={`
                            h-[9px] w-[9px]
                            rounded-full
                            ${
                              selected
                                ? "bg-[var(--commerce-accent)]"
                                : "border border-[var(--commerce-line-strong)]"
                            }
                          `}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.section>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

