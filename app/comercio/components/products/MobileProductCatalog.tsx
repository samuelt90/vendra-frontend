"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Check,
  MagnifyingGlass,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import MobileProductCard from "./MobileProductCard";
import {
  commerceProducts,
  type CommerceProductBadge,
} from "../../data/products";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type SheetType =
  | "category"
  | "price"
  | "filters"
  | null;

type PriceFilter =
  | "all"
  | "under300"
  | "300to500"
  | "over500";

const priceOptions: {
  id: PriceFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "Todos los precios",
  },
  {
    id: "under300",
    label: "Menos de Q300",
  },
  {
    id: "300to500",
    label: "Q300 — Q500",
  },
  {
    id: "over500",
    label: "Más de Q500",
  },
];

const commercialFilters: CommerceProductBadge[] = [
  "Nuevo",
  "Precio especial",
  "Últimas unidades",
];

export default function MobileProductCatalog() {
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");
  const [sheet, setSheet] =
    useState<SheetType>(null);

  const [category, setCategory] =
    useState("Todos");

  const [priceFilter, setPriceFilter] =
    useState<PriceFilter>("all");

  const [
    selectedCommercialFilters,
    setSelectedCommercialFilters,
  ] = useState<CommerceProductBadge[]>([]);

  const categories = useMemo(() => {
    return [
      "Todos",
      ...Array.from(
        new Set(
          commerceProducts.map(
            (product) => product.category
          )
        )
      ),
    ];
  }, []);

  useEffect(() => {
    if (!sheet) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [sheet]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery =
      query.trim().toLowerCase();

    return commerceProducts.filter(
      (product) => {
        const matchesSearch =
          !normalizedQuery ||
          product.name
            .toLowerCase()
            .includes(normalizedQuery) ||
          product.category
            .toLowerCase()
            .includes(normalizedQuery);

        const matchesCategory =
          category === "Todos" ||
          product.category === category;

        const matchesPrice =
          priceFilter === "all" ||
          (priceFilter === "under300" &&
            product.price < 300) ||
          (priceFilter === "300to500" &&
            product.price >= 300 &&
            product.price <= 500) ||
          (priceFilter === "over500" &&
            product.price > 500);

        const matchesCommercial =
          selectedCommercialFilters.length === 0 ||
          (product.badge &&
            selectedCommercialFilters.includes(
              product.badge
            ));

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesCommercial
        );
      }
    );
  }, [
    query,
    category,
    priceFilter,
    selectedCommercialFilters,
  ]);

  const activeFilterCount =
    (category !== "Todos" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0) +
    selectedCommercialFilters.length;

  const activePriceLabel =
    priceOptions.find(
      (option) => option.id === priceFilter
    )?.label ?? "Precio";

  function toggleCommercialFilter(
    filter: CommerceProductBadge
  ) {
    setSelectedCommercialFilters(
      (current) => {
        if (current.includes(filter)) {
          return current.filter(
            (item) => item !== filter
          );
        }

        return [...current, filter];
      }
    );
  }

  function clearFilters() {
    setCategory("Todos");
    setPriceFilter("all");
    setSelectedCommercialFilters([]);
  }

  return (
    <div className="md:hidden">
      {/* BUSCADOR */}
      <div
        className="
          px-[var(--commerce-page-x)]
        "
      >
        <div
          className="
            relative
            flex
            h-14
            items-center
            border-b
            border-[var(--commerce-line-strong)]
          "
        >
          <MagnifyingGlass
            size={21}
            weight="regular"
            className="
              shrink-0
              text-[var(--commerce-muted)]
            "
          />

          <input
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            type="search"
            inputMode="search"
            placeholder="Buscar productos"
            aria-label="Buscar productos"
            className="
              commerce-sans
              h-full
              min-w-0
              flex-1
              bg-transparent
              px-3
              text-[0.95rem]
              font-[550]
              tracking-[-0.025em]
              text-[var(--commerce-ink)]
              outline-none

              placeholder:text-[var(--commerce-muted)]
            "
          />

          {query && (
            <button
              type="button"
              aria-label="Limpiar búsqueda"
              onClick={() => setQuery("")}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[var(--commerce-muted)]
              "
            >
              <X
                size={17}
                weight="regular"
              />
            </button>
          )}
        </div>
      </div>

      {/* FILTROS PRINCIPALES */}
      <div
        className="
          mt-5
          flex
          gap-2
          overflow-x-auto
          px-[var(--commerce-page-x)]
          pb-1

          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <button
          type="button"
          onClick={() =>
            setSheet("category")
          }
          className={`
            commerce-sans
            flex
            h-10
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            px-4
            text-[0.78rem]
            font-[650]
            tracking-[-0.02em]

            ${
              category !== "Todos"
                ? `
                    border-[var(--commerce-ink)]
                    bg-[var(--commerce-ink)]
                    text-[var(--commerce-paper)]
                  `
                : `
                    border-[var(--commerce-line-strong)]
                    text-[var(--commerce-ink)]
                  `
            }
          `}
        >
          {category === "Todos"
            ? "Categoría"
            : category}
        </button>

        <button
          type="button"
          onClick={() =>
            setSheet("price")
          }
          className={`
            commerce-sans
            flex
            h-10
            shrink-0
            items-center
            rounded-full
            border
            px-4
            text-[0.78rem]
            font-[650]
            tracking-[-0.02em]

            ${
              priceFilter !== "all"
                ? `
                    border-[var(--commerce-ink)]
                    bg-[var(--commerce-ink)]
                    text-[var(--commerce-paper)]
                  `
                : `
                    border-[var(--commerce-line-strong)]
                    text-[var(--commerce-ink)]
                  `
            }
          `}
        >
          {priceFilter === "all"
            ? "Precio"
            : activePriceLabel}
        </button>

        <button
          type="button"
          onClick={() =>
            setSheet("filters")
          }
          className={`
            commerce-sans
            flex
            h-10
            shrink-0
            items-center
            gap-2
            rounded-full
            border
            px-4
            text-[0.78rem]
            font-[650]
            tracking-[-0.02em]

            ${
              selectedCommercialFilters.length >
              0
                ? `
                    border-[var(--commerce-ink)]
                    bg-[var(--commerce-ink)]
                    text-[var(--commerce-paper)]
                  `
                : `
                    border-[var(--commerce-line-strong)]
                    text-[var(--commerce-ink)]
                  `
            }
          `}
        >
          <SlidersHorizontal
            size={16}
            weight="regular"
          />

          Filtros

          {selectedCommercialFilters.length >
            0 && (
            <span>
              {
                selectedCommercialFilters.length
              }
            </span>
          )}
        </button>
      </div>

      {/* ESTADO DEL CATÁLOGO */}
      <div
        className="
          mt-6
          flex
          min-h-8
          items-center
          justify-between
          gap-4
          px-[var(--commerce-page-x)]
        "
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={filteredProducts.length}
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -5,
            }}
            transition={{
              duration:
                commerceDuration.fast,
              ease: commerceEase.enter,
            }}
            className="
              commerce-sans
              text-[0.73rem]
              font-[600]
              tracking-[-0.015em]
              text-[var(--commerce-muted)]
            "
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "producto"
              : "productos"}
          </motion.p>
        </AnimatePresence>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="
              commerce-sans
              border-b
              border-[var(--commerce-line-strong)]
              pb-0.5
              text-[0.72rem]
              font-[650]
              tracking-[-0.02em]
              text-[var(--commerce-ink)]
            "
          >
            Limpiar
          </button>
        )}
      </div>

      {/* GRID MÓVIL */}
      <motion.div
        layout
        className="
          mt-4
          grid
          grid-cols-2
          gap-3
          px-[var(--commerce-page-x)]
        "
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(
            (product, index) => (
              <MobileProductCard
                key={product.id}
                product={product}
                index={index}
              />
            )
          )}
        </AnimatePresence>
      </motion.div>

      {/* SIN RESULTADOS */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mx-[var(--commerce-page-x)]
            mt-4
            border-t
            border-[var(--commerce-line)]
            py-14
          "
        >
          <p
            className="
              commerce-display
              max-w-[8ch]
              text-[2.8rem]
              leading-[0.9]
              tracking-[-0.055em]
              text-[var(--commerce-ink)]
            "
          >
            No encontramos coincidencias.
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              clearFilters();
            }}
            className="
              commerce-sans
              mt-6
              border-b
              border-[var(--commerce-line-strong)]
              pb-1
              text-[0.84rem]
              font-[650]
              text-[var(--commerce-ink)]
            "
          >
            Ver todos los productos
          </button>
        </motion.div>
      )}

      {/* BOTTOM SHEETS */}
      <AnimatePresence>
        {sheet && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar filtros"
              onClick={() => setSheet(null)}
              className="
                fixed
                inset-0
                z-[80]
                bg-black/28
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="
                fixed
                inset-x-0
                bottom-0
                z-[90]
                max-h-[82dvh]
                overflow-y-auto
                rounded-t-[28px]
                bg-[var(--commerce-paper)]
                px-[var(--commerce-page-x)]
                pb-[calc(24px+env(safe-area-inset-bottom))]
                pt-4
              "
              initial={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      y: "100%",
                    }
              }
              animate={
                reduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      y: 0,
                    }
              }
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      y: "100%",
                    }
              }
              transition={{
                duration: reduceMotion
                  ? commerceDuration.micro
                  : 0.48,
                ease: commerceEase.spatial,
              }}
            >
              {/* HANDLE */}
              <div
                aria-hidden="true"
                className="
                  mx-auto
                  mb-6
                  h-1
                  w-10
                  rounded-full
                  bg-[var(--commerce-line-strong)]
                "
              />

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-5
                "
              >
                <h3
                  className="
                    commerce-display
                    text-[2.2rem]
                    leading-none
                    tracking-[-0.055em]
                    text-[var(--commerce-ink)]
                  "
                >
                  {sheet === "category" &&
                    "Categoría"}

                  {sheet === "price" &&
                    "Precio"}

                  {sheet === "filters" &&
                    "Filtros"}
                </h3>

                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() =>
                    setSheet(null)
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--commerce-line)]
                    text-[var(--commerce-ink)]
                  "
                >
                  <X
                    size={19}
                    weight="regular"
                  />
                </button>
              </div>

              {/* CATEGORÍAS */}
              {sheet === "category" && (
                <div className="mt-7">
                  {categories.map(
                    (item) => {
                      const selected =
                        category === item;

                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() =>
                            setCategory(item)
                          }
                          className="
                            flex
                            min-h-14
                            w-full
                            items-center
                            justify-between
                            border-b
                            border-[var(--commerce-line)]
                            text-left
                          "
                        >
                          <span
                            className="
                              commerce-sans
                              text-[0.95rem]
                              font-[600]
                              tracking-[-0.025em]
                              text-[var(--commerce-ink)]
                            "
                          >
                            {item}
                          </span>

                          {selected && (
                            <Check
                              size={19}
                              weight="bold"
                            />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {/* PRECIOS */}
              {sheet === "price" && (
                <div className="mt-7">
                  {priceOptions.map(
                    (option) => {
                      const selected =
                        priceFilter ===
                        option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() =>
                            setPriceFilter(
                              option.id
                            )
                          }
                          className="
                            flex
                            min-h-14
                            w-full
                            items-center
                            justify-between
                            border-b
                            border-[var(--commerce-line)]
                            text-left
                          "
                        >
                          <span
                            className="
                              commerce-sans
                              text-[0.95rem]
                              font-[600]
                              tracking-[-0.025em]
                              text-[var(--commerce-ink)]
                            "
                          >
                            {option.label}
                          </span>

                          {selected && (
                            <Check
                              size={19}
                              weight="bold"
                            />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {/* FILTROS COMERCIALES */}
              {sheet === "filters" && (
                <div className="mt-7">
                  {commercialFilters.map(
                    (filter) => {
                      const selected =
                        selectedCommercialFilters.includes(
                          filter
                        );

                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() =>
                            toggleCommercialFilter(
                              filter
                            )
                          }
                          className="
                            flex
                            min-h-14
                            w-full
                            items-center
                            justify-between
                            border-b
                            border-[var(--commerce-line)]
                            text-left
                          "
                        >
                          <span
                            className="
                              commerce-sans
                              text-[0.95rem]
                              font-[600]
                              tracking-[-0.025em]
                              text-[var(--commerce-ink)]
                            "
                          >
                            {filter}
                          </span>

                          <span
                            className={`
                              flex
                              h-6
                              w-6
                              items-center
                              justify-center
                              rounded-full
                              border

                              ${
                                selected
                                  ? `
                                      border-[var(--commerce-ink)]
                                      bg-[var(--commerce-ink)]
                                      text-[var(--commerce-paper)]
                                    `
                                  : `
                                      border-[var(--commerce-line-strong)]
                                    `
                              }
                            `}
                          >
                            {selected && (
                              <Check
                                size={13}
                                weight="bold"
                              />
                            )}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}

              {/* APLICAR */}
              <button
                type="button"
                onClick={() =>
                  setSheet(null)
                }
                className="
                  commerce-sans
                  mt-7
                  flex
                  h-13
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--commerce-ink)]
                  px-6
                  text-[0.88rem]
                  font-[700]
                  tracking-[-0.025em]
                  text-[var(--commerce-paper)]
                "
              >
                Ver {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "producto"
                  : "productos"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
