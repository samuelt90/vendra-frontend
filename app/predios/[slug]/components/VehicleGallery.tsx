"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PredioVehicleImage } from "@/lib/predios/types";

type Props = {
  images: PredioVehicleImage[];
  title: string;
};

export default function VehicleGallery({ images, title }: Props) {
  const fotos = useMemo(() => images ?? [], [images]);
  const fotosCount = fotos.length;

  const [idx, setIdx] = useState(0);

  const safeIdx = fotosCount === 0 ? 0 : Math.min(idx, fotosCount - 1);
  const currentPhoto = fotosCount > 0 ? fotos[safeIdx] : null;

  function prev() {
    if (fotosCount <= 1) return;
    setIdx((value) => (value - 1 + fotosCount) % fotosCount);
  }

  function next() {
    if (fotosCount <= 1) return;
    setIdx((value) => (value + 1) % fotosCount);
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-slate-100">
        {currentPhoto?.cardUrl ? (
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

      {fotosCount > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/95 text-xl font-black text-slate-900 shadow-md transition hover:bg-white active:scale-95"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white/95 text-xl font-black text-slate-900 shadow-md transition hover:bg-white active:scale-95"
          >
            ›
          </button>
        </>
      ) : null}
    </div>
  );
}
