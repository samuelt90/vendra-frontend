"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  useMemo,
  useState,
} from "react";

import {
  commerceDuration,
  commerceEase,
} from "../styles/motion";


type ProductGalleryProps = {
  name: string;
  cover: string;
  images?: string[];
};

export default function ProductGallery({
  name,
  cover,
  images,
}: ProductGalleryProps) {
  const reduceMotion = useReducedMotion();

  const gallery = useMemo(() => {
    const source =
      images && images.length > 0
        ? images
        : [cover];

    return Array.from(new Set(source));
  }, [images, cover]);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const activeImage =
    gallery[activeIndex] ?? cover;

  const hasMultiple =
    gallery.length > 1;

  function selectImage(index: number) {
    if (
      index < 0 ||
      index >= gallery.length
    ) {
      return;
    }

    setActiveIndex(index);
  }

  function nextImage() {
    if (!hasMultiple) return;

    setActiveIndex((current) =>
      current === gallery.length - 1
        ? 0
        : current + 1
    );
  }

  function previousImage() {
    if (!hasMultiple) return;

    setActiveIndex((current) =>
      current === 0
        ? gallery.length - 1
        : current - 1
    );
  }

  return (
    <div className="w-full">
      {/* ================================================= */}
      {/* MOBILE                                            */}
      {/* ================================================= */}

      <div className="md:hidden">
        <div
          className="
            relative
            overflow-hidden
            rounded-[26px_26px_12px_26px]
            bg-[#e7e1d7]
          "
        >
          <motion.div
            className="
              relative
              aspect-[0.92]
              w-full
              touch-pan-y
            "
            drag={
              hasMultiple
                ? "x"
                : false
            }
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={0.12}
            onDragEnd={(
              _,
              info
            ) => {
              if (
                Math.abs(
                  info.offset.x
                ) < 45
              ) {
                return;
              }

              if (
                info.offset.x < 0
              ) {
                nextImage();
              } else {
                previousImage();
              }
            }}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={activeImage}
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  p-7
                "
                initial={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.965,
                        x: 18,
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={
                  reduceMotion
                    ? {
                        opacity: 0,
                      }
                    : {
                        opacity: 0,
                        scale: 0.985,
                        x: -16,
                      }
                }
                transition={{
                  duration:
                    reduceMotion
                      ? commerceDuration.micro
                      : 0.42,
                  ease: commerceEase.spatial,
                }}
              >
                <div
                  className="
                    relative
                    h-full
                    w-full
                  "
                >
                  <Image
                    src={activeImage}
                    alt={`${name} - vista ${
                      activeIndex + 1
                    }`}
                    fill
                    priority
                    sizes="100vw"
                    className="
                      pointer-events-none
                      select-none
                      object-contain
                      drop-shadow-[0_28px_36px_rgba(23,22,18,0.13)]
                    "
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Vista anterior"
                className="
                  absolute
                  bottom-4
                  left-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--commerce-paper)]
                  text-[var(--commerce-ink)]
                  shadow-[0_8px_24px_rgba(23,22,18,0.08)]
                "
              >
                <ArrowLeft
                  size={17}
                  weight="regular"
                />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Siguiente vista"
                className="
                  absolute
                  bottom-4
                  right-4
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--commerce-paper)]
                  text-[var(--commerce-ink)]
                  shadow-[0_8px_24px_rgba(23,22,18,0.08)]
                "
              >
                <ArrowRight
                  size={17}
                  weight="regular"
                />
              </button>

              <div
                className="
                  commerce-sans
                  absolute
                  bottom-5
                  left-1/2
                  z-20
                  -translate-x-1/2
                  text-[0.65rem]
                  font-[700]
                  tracking-[0.1em]
                  text-[var(--commerce-muted)]
                "
              >
                {String(
                  activeIndex + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  gallery.length
                ).padStart(2, "0")}
              </div>
            </>
          )}
        </div>

        {/* MINIATURAS MÓVIL */}
        {hasMultiple && (
          <div
            className="
              mt-3
              flex
              snap-x
              gap-2
              overflow-x-auto
              pb-1

              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {gallery.map(
              (image, index) => {
                const selected =
                  index ===
                  activeIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      selectImage(
                        index
                      )
                    }
                    aria-label={`Ver vista ${
                      index + 1
                    }`}
                    className={`
                      relative
                      aspect-square
                      w-[72px]
                      shrink-0
                      snap-start
                      overflow-hidden
                      rounded-[14px]
                      border
                      transition-colors

                      ${
                        selected
                          ? `
                              border-[var(--commerce-ink)]
                            `
                          : `
                              border-[var(--commerce-line)]
                            `
                      }
                    `}
                  >
                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#e7e1d7]
                      "
                    />

                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="72px"
                      className="
                        relative
                        object-contain
                        p-2
                      "
                    />
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* DESKTOP                                           */}
      {/* ================================================= */}

      <div
        className="
          hidden
          grid-cols-[86px_minmax(0,1fr)]
          gap-5

          md:grid

          lg:grid-cols-[96px_minmax(0,1fr)]
          lg:gap-7
        "
      >
        {/* THUMBNAILS */}
        <div
          className="
            flex
            flex-col
            gap-3
          "
        >
          {gallery.map(
            (image, index) => {
              const selected =
                index ===
                activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"

                  /*
                    PC:
                    hover cambia inmediatamente.
                    click también fija la selección.
                  */
                  onMouseEnter={() =>
                    selectImage(index)
                  }
                  onFocus={() =>
                    selectImage(index)
                  }
                  onClick={() =>
                    selectImage(index)
                  }
                  aria-label={`Ver vista ${
                    index + 1
                  }`}
                  className={`
                    group
                    relative
                    aspect-square
                    w-full
                    overflow-hidden
                    border
                    bg-[#e7e1d7]
                    transition-all
                    duration-300

                    ${
                      selected
                        ? `
                            border-[var(--commerce-ink)]
                          `
                        : `
                            border-[var(--commerce-line)]
                            hover:border-[var(--commerce-line-strong)]
                          `
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="96px"
                    className="
                      object-contain
                      p-2.5
                      transition-transform
                      duration-500

                      group-hover:scale-[1.04]
                    "
                  />

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      bottom-1.5
                      left-1/2
                      h-[2px]
                      -translate-x-1/2
                      bg-[var(--commerce-ink)]
                      transition-all
                      duration-300

                      ${
                        selected
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </button>
              );
            }
          )}
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div
          className="
            relative
            min-h-[620px]
            overflow-hidden
            rounded-[30px_30px_14px_30px]
            bg-[#e7e1d7]

            lg:min-h-[720px]
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.div
              key={activeImage}
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                p-12

                lg:p-16
              "
              initial={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.975,
                      y: 10,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.985,
                      y: -8,
                    }
              }
              transition={{
                duration:
                  reduceMotion
                    ? commerceDuration.micro
                    : 0.38,
                ease: commerceEase.spatial,
              }}
            >
              <motion.div
                className="
                  relative
                  h-full
                  w-full
                  max-w-[780px]
                "
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.018,
                      }
                }
                transition={{
                  duration: 0.45,
                  ease: commerceEase.smooth,
                }}
              >
                <Image
                  src={activeImage}
                  alt={`${name} - vista ${
                    activeIndex + 1
                  }`}
                  fill
                  priority
                  sizes="
                    (max-width: 1023px) 70vw,
                    55vw
                  "
                  className="
                    object-contain
                    drop-shadow-[0_38px_52px_rgba(23,22,18,0.14)]
                  "
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <div
              className="
                commerce-sans
                absolute
                bottom-5
                right-6
                text-[0.66rem]
                font-[700]
                tracking-[0.12em]
                text-[var(--commerce-muted)]
              "
            >
              {String(
                activeIndex + 1
              ).padStart(2, "0")}
              {" / "}
              {String(
                gallery.length
              ).padStart(2, "0")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
