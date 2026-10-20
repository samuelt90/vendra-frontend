"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

import ProductCard from "../products/ProductCard";
import MobileProductCard from "../products/MobileProductCard";

import {
  commerceProducts,
  type CommerceProduct,
} from "../../data/products";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type CategoryFilter =
  | "todos"
  | "audio"
  | "wearables"
  | "computacion"
  | "creadores";

type CommercialFilter =
  | "all"
  | "nuevo"
  | "precio-especial"
  | "ultimas-unidades"
  | "temporada"
  | "disponibles";

const categoryOptions: {
  id: CategoryFilter;
  label: string;
}[] = [
  {
    id: "todos",
    label: "Todos",
  },
  {
    id: "audio",
    label: "Audio",
  },
  {
    id: "wearables",
    label: "Wearables",
  },
  {
    id: "computacion",
    label: "Computación",
  },
  {
    id: "creadores",
    label: "Creadores",
  },
];

const commercialOptions: {
  id: CommercialFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "nuevo",
    label: "Novedades",
  },
  {
    id: "precio-especial",
    label: "Precios especiales",
  },
  {
    id: "ultimas-unidades",
    label: "Últimas unidades",
  },
  {
    id: "temporada",
    label: "Temporada",
  },
  {
    id: "disponibles",
    label: "Disponibles",
  },
];

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getInitialCategory(
  value: string | null
): CategoryFilter {
  const allowed: CategoryFilter[] = [
    "todos",
    "audio",
    "wearables",
    "computacion",
    "creadores",
  ];

  if (
    value &&
    allowed.includes(value as CategoryFilter)
  ) {
    return value as CategoryFilter;
  }

  return "todos";
}

function getInitialCommercialFilter(
  value: string | null
): CommercialFilter {
  const allowed: CommercialFilter[] = [
    "all",
    "nuevo",
    "precio-especial",
    "ultimas-unidades",
    "temporada",
    "disponibles",
  ];

  if (
    value &&
    allowed.includes(value as CommercialFilter)
  ) {
    return value as CommercialFilter;
  }

  return "all";
}

function matchesCategory(
  product: CommerceProduct,
  category: CategoryFilter
) {
  if (category === "todos") {
    return true;
  }

  const productCategory = normalizeText(
    product.category
  );

  switch (category) {
    case "audio":
      return productCategory === "audio";

    case "wearables":
      return productCategory === "wearables";

    case "computacion":
      return productCategory === "computacion";

    case "creadores":
      return (
        productCategory === "creadores" ||
        productCategory === "creador"
      );

    default:
      return true;
  }
}

function matchesCommercialFilter(
  product: CommerceProduct,
  filter: CommercialFilter
) {
  switch (filter) {
    case "nuevo":
      return product.badge === "Nuevo";

    case "precio-especial":
      return (
        product.badge === "Precio especial"
      );

    case "ultimas-unidades":
      return (
        product.badge === "Últimas unidades"
      );

    case "disponibles":
      return normalizeText(
        product.status ?? ""
      ).includes("dispon");

    /*
      Todavía no existe una propiedad específica
      "temporada" en CommerceProduct.

      No inventamos datos aquí.
      Cuando ampliemos products.ts podremos
      añadir una colección/tag real.
    */
    case "temporada":
      return true;

    default:
      return true;
  }
}

export default function CommerceStore() {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();

  const [query, setQuery] = useState("");

  const [category, setCategory] =
    useState<CategoryFilter>(() =>
      getInitialCategory(
        searchParams.get("categoria")
      )
    );

  const [
    commercialFilter,
    setCommercialFilter,
  ] = useState<CommercialFilter>(() =>
    getInitialCommercialFilter(
      searchParams.get("filtro")
    )
  );

  /*
    Si llegamos desde Home mediante otro enlace
    con searchParams distintos, sincronizamos
    los filtros con la URL.
  */
  useEffect(() => {
    setCategory(
      getInitialCategory(
        searchParams.get("categoria")
      )
    );

    setCommercialFilter(
      getInitialCommercialFilter(
        searchParams.get("filtro")
      )
    );
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery =
      normalizeText(query);

    return commerceProducts.filter(
      (product) => {
        const matchesSearch =
          !normalizedQuery ||
          normalizeText(product.name).includes(
            normalizedQuery
          ) ||
          normalizeText(
            product.category
          ).includes(normalizedQuery) ||
          normalizeText(
            product.description
          ).includes(normalizedQuery);

        return (
          matchesSearch &&
          matchesCategory(
            product,
            category
          ) &&
          matchesCommercialFilter(
            product,
            commercialFilter
          )
        );
      }
    );
  }, [
    query,
    category,
    commercialFilter,
  ]);

  const activeCategory =
    categoryOptions.find(
      (option) => option.id === category
    );

  const activeCommercial =
    commercialOptions.find(
      (option) =>
        option.id === commercialFilter
    );

  return (
    <main
      className="
        min-h-screen
        bg-[var(--commerce-paper)]
        text-[var(--commerce-ink)]
      "
    >
      {/* ===================================== */}
      {/* INTRO                                 */}
      {/* ===================================== */}

      <section
        className="
          border-b
          border-[var(--commerce-line)]
          px-[var(--commerce-page-x)]
          pb-10
          pt-14

          md:pb-14
          md:pt-20
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
          "
        >
          <motion.p
            className="
              commerce-label
              text-[var(--commerce-muted)]
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            Tienda
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="
                commerce-display
                mt-3
                max-w-[8ch]
                text-[clamp(4rem,15vw,7rem)]
                leading-[0.84]
                tracking-[-0.065em]

                md:max-w-none
                md:text-[clamp(5.5rem,8vw,9rem)]
              "
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      y: "105%",
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  reduceMotion ? 0 : 0.06,
                duration:
                  reduceMotion
                    ? commerceDuration.micro
                    : 0.72,
                ease:
                  commerceEase.spatial,
              }}
            >
              Encuentra tu producto.
            </motion.h1>
          </div>

          <motion.p
            className="
              commerce-sans
              mt-6
              max-w-[42rem]
              text-[0.9rem]
              leading-[1.6]
              tracking-[-0.025em]
              text-[var(--commerce-ink-soft)]

              md:text-[1rem]
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
              delay:
                reduceMotion ? 0 : 0.14,
              duration:
                commerceDuration.interface,
              ease: commerceEase.enter,
            }}
          >
            Explora los productos disponibles,
            revisa precios y abre cada producto
            para ver todos sus detalles.
          </motion.p>
        </div>
      </section>

      {/* ===================================== */}
      {/* CONTROLES                             */}
      {/* ===================================== */}

      <section
        className="
          sticky
          top-0
          z-30
          border-b
          border-[var(--commerce-line)]
          bg-[color:var(--commerce-paper)]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-[var(--commerce-page-x)]
            py-4

            md:py-5
          "
        >
          {/* BUSCADOR */}

          <div
            className="
              flex
              h-13
              items-center
              border-b
              border-[var(--commerce-line-strong)]
            "
          >
            <MagnifyingGlass
              size={20}
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
                setQuery(event.target.value)
              }
              placeholder="Buscar productos"
              aria-label="Buscar productos"
              className="
                commerce-sans
                h-full
                min-w-0
                flex-1
                bg-transparent
                px-3
                text-[0.9rem]
                font-[550]
                tracking-[-0.025em]
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
                  h-10
                  w-10
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

          {/* CATEGORÍAS */}

          <div
            className="
              mt-4
              flex
              gap-2
              overflow-x-auto
              pb-1

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {categoryOptions.map(
              (option) => {
                const selected =
                  category === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setCategory(option.id)
                    }
                    className={`
                      commerce-sans
                      h-10
                      shrink-0
                      rounded-full
                      border
                      px-4
                      text-[0.76rem]
                      font-[650]
                      tracking-[-0.02em]
                      transition-colors
                      duration-200

                      ${
                        selected
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
                    {option.label}
                  </button>
                );
              }
            )}
          </div>

          {/* FILTROS COMERCIALES */}

          <div
            className="
              mt-2
              flex
              gap-2
              overflow-x-auto
              pb-1

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {commercialOptions.map(
              (option) => {
                const selected =
                  commercialFilter ===
                  option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setCommercialFilter(
                        option.id
                      )
                    }
                    className={`
                      commerce-sans
                      h-9
                      shrink-0
                      rounded-full
                      border
                      px-3.5
                      text-[0.71rem]
                      font-[620]
                      tracking-[-0.02em]

                      ${
                        selected
                          ? `
                              border-[var(--commerce-accent)]
                              text-[var(--commerce-accent)]
                            `
                          : `
                              border-transparent
                              text-[var(--commerce-muted)]
                            `
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ===================================== */}
      {/* RESULTADOS                            */}
      {/* ===================================== */}

      <section
        className="
          px-[var(--commerce-page-x)]
          pb-24
          pt-8

          md:pb-32
          md:pt-12
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
              mb-6
              flex
              items-end
              justify-between
              gap-5

              md:mb-10
            "
          >
            <div>
              <p
                className="
                  commerce-sans
                  text-[0.68rem]
                  font-[650]
                  uppercase
                  tracking-[0.1em]
                  text-[var(--commerce-muted)]
                "
              >
                {activeCategory?.label}
                {commercialFilter !==
                  "all" &&
                  ` · ${activeCommercial?.label}`}
              </p>

              <AnimatePresence mode="wait">
                <motion.p
                  key={
                    filteredProducts.length
                  }
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
                    ease:
                      commerceEase.enter,
                  }}
                  className="
                    commerce-display
                    mt-2
                    text-[2.3rem]
                    leading-none
                    tracking-[-0.05em]

                    md:text-[3rem]
                  "
                >
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1
                    ? "producto"
                    : "productos"}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <>
              {/* MOBILE */}

              <motion.div
                layout
                className="
                  grid
                  grid-cols-2
                  gap-3

                  md:hidden
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

              {/* DESKTOP */}

              <div
                className="
                  hidden
                  grid-cols-2
                  gap-6

                  md:grid
                  xl:grid-cols-3
                "
              >
                {filteredProducts.map(
                  (product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                border-t
                border-[var(--commerce-line)]
                py-20
              "
            >
              <p
                className="
                  commerce-display
                  max-w-[9ch]
                  text-[3rem]
                  leading-[0.88]
                  tracking-[-0.055em]

                  md:text-[5rem]
                "
              >
                No encontramos coincidencias.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("todos");
                  setCommercialFilter("all");
                }}
                className="
                  commerce-sans
                  mt-7
                  border-b
                  border-[var(--commerce-line-strong)]
                  pb-1
                  text-[0.84rem]
                  font-[650]
                "
              >
                Ver todos los productos
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
