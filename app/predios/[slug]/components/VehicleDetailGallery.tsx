"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PredioVehicleImage } from "@/lib/predios/types";

type Props = {
  images: PredioVehicleImage[];
  title: string;
};

const HIDE_CONTROLS_DELAY = 2600;
const SWIPE_MIN_DISTANCE = 45;

export default function VehicleDetailGallery({ images, title }: Props) {
  const fotos = useMemo(() => images ?? [], [images]);
  const fotosCount = fotos.length;

  const [idx, setIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileArrowsVisible, setMobileArrowsVisible] = useState(true);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const safeIdx = fotosCount === 0 ? 0 : Math.min(idx, fotosCount - 1);
  const currentPhoto = fotosCount > 0 ? fotos[safeIdx] : null;
  const hasMultiplePhotos = fotosCount > 1;

  function showMobileArrowsTemporarily() {
    setMobileArrowsVisible(true);
  }

  function prev() {
    if (!hasMultiplePhotos) return;
    setIdx((value) => (value - 1 + fotosCount) % fotosCount);
    showMobileArrowsTemporarily();
  }

  function next() {
    if (!hasMultiplePhotos) return;
    setIdx((value) => (value + 1) % fotosCount);
    showMobileArrowsTemporarily();
  }

  function openModal() {
    if (!currentPhoto) return;
    setModalOpen(true);
    setMobileArrowsVisible(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleTouchStart(event: React.TouchEvent) {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const touch = event.changedTouches[0];
    const diffX = touch.clientX - touchStartX.current;
    const diffY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);

    if (!isHorizontalSwipe || Math.abs(diffX) < SWIPE_MIN_DISTANCE) {
      showMobileArrowsTemporarily();
      return;
    }

    if (diffX > 0) {
      prev();
    } else {
      next();
    }
  }

  useEffect(() => {
    if (!modalOpen) return;
    if (!mobileArrowsVisible) return;

    const timeout = window.setTimeout(() => {
      setMobileArrowsVisible(false);
    }, HIDE_CONTROLS_DELAY);

    return () => window.clearTimeout(timeout);
  }, [modalOpen, mobileArrowsVisible, safeIdx]);

  useEffect(() => {
    if (!modalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, fotosCount]);

  return (
    <>
      <section className="min-w-0 bg-white p-3 sm:p-4">
        <button
          type="button"
          onClick={openModal}
          className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-slate-100"
        >
          {currentPhoto?.detailUrl ? (
            <Image
              src={currentPhoto.detailUrl}
              alt={currentPhoto.alt || title || "Vehículo"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain"
            />
          ) : (
            <div className="text-sm font-bold text-white/70">Sin imagen</div>
          )}

          {currentPhoto ? (
            <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs font-black text-white backdrop-blur">
              Toca para ampliar
            </div>
          ) : null}

          {fotosCount > 0 ? (
            <div className="absolute bottom-3 right-3 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs font-black text-white backdrop-blur">
              {safeIdx + 1}/{fotosCount}
            </div>
          ) : null}
        </button>

        {fotosCount > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {fotos.map((photo, photoIndex) => (
              <button
                key={`${photo.id}-${photoIndex}`}
                type="button"
                onClick={() => setIdx(photoIndex)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${
                  photoIndex === safeIdx
                    ? "border-white ring-2 ring-white/40"
                    : "border-white/10 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo.cardUrl || photo.detailUrl}
                  alt={photo.alt || title || "Vehículo"}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        ) : null}
      </section>

      {modalOpen && currentPhoto ? (
        <div
          className="fixed inset-0 z-[100] bg-black"
          onClick={showMobileArrowsTemporarily}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeModal();
            }}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
          >
            Cerrar
          </button>

          <div className="absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black text-white backdrop-blur">
            {safeIdx + 1}/{fotosCount}
          </div>

          <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-8">
            <Image
              src={currentPhoto.fullUrl || currentPhoto.detailUrl}
              alt={currentPhoto.alt || title || "Vehículo"}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {hasMultiplePhotos ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  prev();
                }}
                className={`absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/10 text-3xl font-black text-white backdrop-blur transition duration-300 hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12 ${
                  mobileArrowsVisible
                    ? "opacity-100"
                    : "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
                }`}
                aria-label="Imagen anterior"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                className={`absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/10 text-3xl font-black text-white backdrop-blur transition duration-300 hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12 ${
                  mobileArrowsVisible
                    ? "opacity-100"
                    : "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
                }`}
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
