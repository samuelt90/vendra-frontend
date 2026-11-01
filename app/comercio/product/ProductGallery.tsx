"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowsOutSimple,
} from "@phosphor-icons/react";
import {
  useEffect,
  useMemo,
  useState,
  type PointerEvent,
} from "react";

type ProductGalleryProps = {
  name: string;
  cover: string;
  images?: string[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const SPRING = {
  stiffness: 110,
  damping: 23,
  mass: 0.85,
};

const imageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction * 32,
    rotate: direction * 4,
    scale: 0.93,
  }),

  animate: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
  },

  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -24,
    rotate: direction * -3,
    scale: 0.96,
  }),
};


export default function ProductGallery({
  name,
  cover,
  images,
}: ProductGalleryProps) {
  const reduceMotion = useReducedMotion();

  const gallery = useMemo(
    () =>
      Array.from(
        new Set(
          [cover, ...(images ?? [])].filter(Boolean)
        )
      ),
    [cover, images]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [inspecting, setInspecting] = useState(false);

  const activeImage = gallery[activeIndex] ?? cover;
  const hasMultiple = gallery.length > 1;

  // Movimiento físico suave del producto.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, SPRING);
  const smoothRotateY = useSpring(rotateY, SPRING);
  const smoothX = useSpring(translateX, SPRING);
  const smoothY = useSpring(translateY, SPRING);

  useEffect(() => {
    setActiveIndex(0);
    setInspecting(false);
  }, [cover]);

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  }

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (
      reduceMotion ||
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const positionX =
      (event.clientX - bounds.left) / bounds.width;

    const positionY =
      (event.clientY - bounds.top) / bounds.height;

    const normalizedX = (positionX - 0.5) * 2;
    const normalizedY = (positionY - 0.5) * 2;

    rotateY.set(normalizedX * 8);
    rotateX.set(normalizedY * -6);

    translateX.set(normalizedX * 12);
    translateY.set(normalizedY * 9);
  }

  function selectImage(index: number) {
    if (
      index < 0 ||
      index >= gallery.length ||
      index === activeIndex
    ) {
      return;
    }

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setInspecting(false);
  }

  function nextImage() {
    if (!hasMultiple) return;

    setDirection(1);
    setActiveIndex((current) =>
      (current + 1) % gallery.length
    );
    setInspecting(false);
  }

  function previousImage() {
    if (!hasMultiple) return;

    setDirection(-1);
    setActiveIndex((current) =>
      (current - 1 + gallery.length) %
      gallery.length
    );
    setInspecting(false);
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      {/* ESCENA PRINCIPAL */}

      <div
        className="
          relative isolate
          w-full min-w-0
          overflow-hidden
          bg-[#EDEDE9]
        "
      >
        <div
          className="
            pointer-events-none
            absolute inset-0
            bg-[radial-gradient(ellipse_at_50%_46%,#FAFAF7_0%,#E8E9E4_58%,#DADDD6_100%)]
          "
        />

        {/* Halo de profundidad */}

        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-[46%]
            aspect-square w-[78%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-white/50 blur-[55px]
          "
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.07, 1],
                  opacity: [0.65, 0.95, 0.65],
                }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Líneas circulares muy sutiles */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            aspect-square w-[75%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full border border-white/55
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            aspect-square w-[105%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full border border-white/30
          "
        />

        {/* Información editorial */}

        <div
          className="
            commerce-sans
            pointer-events-none
            absolute left-5 right-5 top-5 z-20
            flex items-start justify-between
            gap-4
            md:left-8 md:right-8 md:top-8
          "
        >
          <span
            className="
              text-[10px] font-bold
              uppercase tracking-[0.16em]
              text-[#535A52]
            "
          >
            VENDRA / PRODUCTO
          </span>

          <span
            className="
              text-[10px] font-semibold
              tabular-nums tracking-[0.12em]
              text-[#626961]
            "
          >
            {String(activeIndex + 1).padStart(2, "0")}
            {" — "}
            {String(gallery.length).padStart(2, "0")}
          </span>
        </div>

        {/* ZONA INTERACTIVA */}

        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          className="
            relative
            h-[min(108vw,470px)]
            min-h-[310px]
            w-full
            select-none
            md:h-[620px]
            lg:h-[720px]
          "
          style={{
            perspective: "1100px",
          }}
        >
          <motion.div
            className="
              pointer-events-none
              absolute inset-[8%]
              flex items-center justify-center
              [transform-style:preserve-3d]
            "
            style={{
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              x: smoothX,
              y: smoothY,
            }}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={direction}
            >
 <motion.div
  key={activeImage}
  custom={direction}
  variants={imageVariants}
  initial="initial"
  animate={{
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: inspecting ? 1.25 : 1,
  }}
  exit="exit"
  className="
    absolute inset-0
    [transform-style:preserve-3d]
  "
  transition={{
    duration: reduceMotion ? 0 : 0.55,
    ease: EASE,
  }}
>

                <motion.div
                  className="relative h-full w-full"
                  animate={
                    reduceMotion || inspecting
                      ? undefined
                      : {
                          y: [0, -7, 0],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={activeImage}
                    alt={`${name} — vista ${activeIndex + 1}`}
                    fill
                    priority={activeIndex === 0}
                    sizes="
                      (max-width: 767px) 90vw,
                      (max-width: 1023px) 56vw,
                      48vw
                    "
                    draggable={false}
                    className="
                      select-none
                      object-contain
                      drop-shadow-[0_32px_28px_rgba(32,38,32,0.18)]
                    "
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Área táctil: solo móvil.
              touch-pan-y permite el scroll vertical. */}

          {hasMultiple && (
            <motion.div
              aria-label="Desliza horizontalmente para cambiar la vista"
              className="
                absolute inset-0 z-10
                cursor-grab touch-pan-y
                active:cursor-grabbing
                md:hidden
              "
              drag="x"
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                const distance = info.offset.x;
                const speed = info.velocity.x;

                if (
                  Math.abs(distance) < 45 &&
                  Math.abs(speed) < 500
                ) {
                  return;
                }

                if (distance < 0 || speed < -500) {
                  nextImage();
                } else {
                  previousImage();
                }
              }}
            />
          )}

          {/* Inspección en desktop */}

          <button
            type="button"
            onClick={() =>
              setInspecting((current) => !current)
            }
            aria-label={
              inspecting
                ? "Restablecer vista"
                : "Acercar imagen del producto"
            }
            aria-pressed={inspecting}
            className="
              commerce-sans
              absolute bottom-7 right-7 z-20
              hidden h-11 w-11
              items-center justify-center
              rounded-full
              border border-[#3F473E]/10
              bg-white/75
              text-[#29312A]
              backdrop-blur-md
              transition-colors
              hover:bg-white
              md:flex
            "
          >
            <ArrowsOutSimple
              size={19}
              weight="regular"
            />
          </button>

          {/* Navegación dentro de escena */}

          {hasMultiple && (
            <div
              className="
                absolute bottom-5 left-5
                z-20 flex items-center gap-2
                md:bottom-7 md:left-7
              "
            >
              <button
                type="button"
                onClick={previousImage}
                aria-label="Vista anterior"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  border border-[#29312A]/10
                  bg-white/80
                  text-[#29312A]
                  backdrop-blur-md
                  transition-colors hover:bg-white
                "
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Siguiente vista"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  border border-[#29312A]/10
                  bg-white/80
                  text-[#29312A]
                  backdrop-blur-md
                  transition-colors hover:bg-white
                "
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SELECTOR DE VISTAS */}

      {hasMultiple && (
        <div
          className="
            mt-4 flex min-w-0
            items-center gap-3
            md:mt-5
          "
        >
          <div
            className="
              flex min-w-0 flex-1
              gap-2 overflow-x-auto
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {gallery.map((image, index) => {
              const selected = activeIndex === index;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => selectImage(index)}
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType === "mouse"
                    ) {
                      selectImage(index);
                    }
                  }}
                  aria-label={`Ver vista ${index + 1}`}
                  aria-pressed={selected}
                  className={`
                    group relative
                    h-[66px] w-[66px]
                    shrink-0 overflow-hidden
                    bg-[#EDEDE9]
                    transition-all duration-300
                    md:h-[78px] md:w-[78px]
                    ${
                      selected
                        ? "ring-1 ring-[#30392F]"
                        : "opacity-65 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="78px"
                    className="
                      object-contain p-2
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />

                  <span
                    className={`
                      absolute bottom-0 left-0
                      h-[2px] bg-[#30392F]
                      transition-all duration-300
                      ${
                        selected
                          ? "w-full"
                          : "w-0"
                      }
                    `}
                  />
                </button>
              );
            })}
          </div>

          <span
            className="
              commerce-sans
              hidden shrink-0
              text-[10px] font-semibold
              uppercase tracking-[0.12em]
              text-[var(--commerce-muted)]
              lg:block
            "
          >
            Explorar vistas
          </span>
        </div>
      )}
    </div>
  );
}

