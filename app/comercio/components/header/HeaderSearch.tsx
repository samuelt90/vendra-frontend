"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  commerceDuration,
  commerceEase,
} from "../../styles/motion";

type HeaderSearchProps = {
  onSearch?: (query: string) => void;
};

export default function HeaderSearch({
  onSearch,
}: HeaderSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanQuery = query.trim();

    if (!cleanQuery) return;

    onSearch?.(cleanQuery);
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Buscar productos"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        whileTap={
          reduceMotion
            ? undefined
            : {
                scale: 0.96,
              }
        }
        transition={{
          duration: commerceDuration.micro,
          ease: commerceEase.enter,
        }}
        className="
          commerce-sans
          group
          inline-flex
          h-11
          items-center
          gap-2
          px-2
          text-sm
          font-[600]
          tracking-[-0.025em]
          text-[var(--commerce-ink)]
          outline-none
          transition-opacity
          duration-200
          hover:opacity-60
          focus-visible:opacity-60
          sm:px-3
        "
      >
        <MagnifyingGlass
          size={20}
          weight="regular"
          className="
            shrink-0
            transition-transform
            duration-300
            group-hover:scale-[1.06]
          "
        />

        <span className="hidden sm:inline">
          Buscar
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="
              fixed
              inset-0
              z-[100]
              overflow-hidden
              bg-[var(--commerce-bg)]
              text-[var(--commerce-ink)]
            "
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.985,
                    y: "-1.5%",
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 0.99,
                    y: "-1%",
                  }
            }
            transition={{
              duration: reduceMotion
                ? commerceDuration.micro
                : commerceDuration.transition,
              ease: commerceEase.spatial,
            }}
          >
            <div
              className="
                mx-auto
                flex
                min-h-dvh
                w-full
                max-w-[1600px]
                flex-col
                px-[var(--commerce-page-x)]
                pb-8
                pt-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[var(--commerce-line)]
                  pb-4
                "
              >
                <span
                  className="
                    commerce-label
                    text-[var(--commerce-muted)]
                  "
                >
                  Buscar
                </span>

                <motion.button
                  type="button"
                  aria-label="Cerrar búsqueda"
                  onClick={() => setOpen(false)}
                  whileTap={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 0.92,
                        }
                  }
                  transition={{
                    duration: commerceDuration.micro,
                    ease: commerceEase.enter,
                  }}
                  className="
                    grid
                    h-11
                    w-11
                    place-items-center
                    rounded-full
                    text-[var(--commerce-ink)]
                    outline-none
                    transition-colors
                    duration-200
                    hover:bg-[var(--commerce-line)]
                    focus-visible:bg-[var(--commerce-line)]
                  "
                >
                  <X size={22} weight="regular" />
                </motion.button>
              </div>

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  justify-start
                  pt-[12vh]
                  sm:pt-[14vh]
                  lg:pt-[16vh]
                "
              >
                <motion.div
                  className="
                    w-full
                    max-w-5xl
                  "
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 24,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.08,
                    duration: reduceMotion
                      ? commerceDuration.micro
                      : commerceDuration.transition,
                    ease: commerceEase.enter,
                  }}
                >
                  <p
                    className="
                      commerce-label
                      mb-5
                      text-[var(--commerce-muted)]
                    "
                  >
                    Encuentra lo que necesitas
                  </p>

                  <h2 className="commerce-display-lg max-w-4xl">
                    ¿Qué estás buscando?
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-10 sm:mt-14"
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        border-b
                        border-[var(--commerce-line-strong)]
                        pb-4
                        transition-colors
                        duration-300
                        focus-within:border-[var(--commerce-ink)]
                      "
                    >
                      <MagnifyingGlass
                        size={26}
                        weight="regular"
                        className="
                          shrink-0
                          text-[var(--commerce-muted)]
                        "
                      />

                      <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) =>
                          setQuery(event.target.value)
                        }
                        type="search"
                        autoComplete="off"
                        enterKeyHint="search"
                        placeholder="Producto, categoría o palabra clave"
                        className="
                          commerce-sans
                          min-w-0
                          flex-1
                          bg-transparent
                          text-xl
                          font-[550]
                          tracking-[-0.035em]
                          text-[var(--commerce-ink)]
                          outline-none
                          placeholder:text-[var(--commerce-muted)]
                          sm:text-3xl
                        "
                      />
                    </div>
                  </form>

                  <div
                    className="
                      mt-6
                      flex
                      flex-col
                      gap-4
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <p
                      className="
                        commerce-body
                        max-w-lg
                        text-[var(--commerce-ink-soft)]
                      "
                    >
                      Busca directamente sin recorrer todo el catálogo.
                      Después conectaremos aquí resultados visuales,
                      categorías y coincidencias reales.
                    </p>

                    <AnimatePresence>
                      {query.trim() ? (
                        <motion.button
                          type="button"
                          onClick={() => setQuery("")}
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 4,
                          }}
                          transition={{
                            duration: commerceDuration.fast,
                            ease: commerceEase.enter,
                          }}
                          className="
                            commerce-sans
                            self-start
                            text-sm
                            font-[650]
                            tracking-[-0.02em]
                            text-[var(--commerce-ink)]
                            underline
                            decoration-[var(--commerce-line-strong)]
                            underline-offset-4
                            transition-opacity
                            hover:opacity-60
                            sm:self-auto
                          "
                        >
                          Limpiar
                        </motion.button>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
