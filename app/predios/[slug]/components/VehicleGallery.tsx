"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { PredioVehicleImage } from "@/lib/predios/types";

type Props = {
  images: PredioVehicleImage[];
  title: string;
};

const HIDE_CONTROLS_DELAY = 2400;

export default function VehicleGallery({ images, title }: Props) {
  const fotos = useMemo(() => images ?? [], [images]);
  const fotosCount = fotos.length;

  const [idx, setIdx] = useState(0);
  const [mobileControlsVisible, setMobileControlsVisible] = useState(true);

  const safeIdx = fotosCount === 0 ? 0 : Math.min(idx, fotosCount - 1);
  const currentPhoto = fotosCount > 0 ? fotos[safeIdx] : null;
  const hasMultiplePhotos = fotosCount > 1;

  function showMobileControlsTemporarily() {
    setMobileControlsVisible(true);
  }

  function prev() {
    if (!hasMultiplePhotos) return;

    setIdx((value) => (value - 1 + fotosCount) % fotosCount);
    showMobileControlsTemporarily();
  }

  function next() {
    if (!hasMultiplePhotos) return;

    setIdx((value) => (value + 1) % fotosCount);
    showMobileControlsTemporarily();
  }

  useEffect(() => {
    if (!hasMultiplePhotos) return;
    if (!mobileControlsVisible) return;

    const timeout = window.setTimeout(() => {
      setMobileControlsVisible(false);
    }, HIDE_CONTROLS_DELAY);

    return () => window.clearTimeout(timeout);
  }, [hasMultiplePhotos, mobileControlsVisible, safeIdx]);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100"
      onClick={showMobileControlsTemporarily}
    >
      <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-slate-100">
        {currentPhoto?.detailUrl ? (
          <Image
            src={currentPhoto.detailUrl || currentPhoto.cardUrl}
            alt={currentPhoto.alt || title || "Vehículo"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        ) : (
          <div className="text-sm font-bold text-slate-500">Sin imagen</div>
        )}
      </div>

      {fotosCount > 0 ? (
        <div className="absolute bottom-3 left-3 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-sm">
          {safeIdx + 1}/{fotosCount}
        </div>
      ) : null}

      {hasMultiplePhotos ? (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            className={`absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-2xl font-black text-slate-900 shadow-sm transition duration-300 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 ${
              mobileControlsVisible
                ? "opacity-100"
                : "pointer-events-none opacity-0 sm:pointer-events-auto"
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
            className={`absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-2xl font-black text-slate-900 shadow-sm transition duration-300 hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 ${
              mobileControlsVisible
                ? "opacity-100"
                : "pointer-events-none opacity-0 sm:pointer-events-auto"
            }`}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
