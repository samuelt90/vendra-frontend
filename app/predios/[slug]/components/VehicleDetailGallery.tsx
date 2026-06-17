"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PredioVehicleImage } from "@/lib/predios/types";

type Props = {
  images: PredioVehicleImage[];
  title: string;
};

export default function VehicleDetailGallery({ images, title }: Props) {
  const gallery = useMemo(() => images.filter(Boolean), [images]);
  const total = gallery.length;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const safeIndex = total === 0 ? 0 : Math.min(selectedIndex, total - 1);
  const currentImage = total > 0 ? gallery[safeIndex] : null;

  function goPrev() {
    if (total <= 1) return;
    setSelectedIndex((value) => (value - 1 + total) % total);
  }

  function goNext() {
    if (total <= 1) return;
    setSelectedIndex((value) => (value + 1) % total);
  }

  function selectImage(index: number) {
    setSelectedIndex(index);
  }

  return (
    <>
      <div className="border-b border-slate-200 bg-slate-100 p-3 lg:border-b-0 lg:border-r">
        <button
          type="button"
          onClick={() => currentImage && setIsOpen(true)}
          className="relative flex min-h-[330px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white sm:min-h-[480px]"
        >
          {currentImage?.detailUrl ? (
            <Image
              src={currentImage.detailUrl}
              alt={currentImage.alt || title}
              width={1200}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="h-auto max-h-[680px] w-full object-contain"
            />
          ) : (
            <div className="text-sm font-bold text-slate-500">Sin imagen</div>
          )}

          {currentImage ? (
            <div className="absolute bottom-4 left-4 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-sm">
              Toca para ampliar
            </div>
          ) : null}

          {total > 0 ? (
            <div className="absolute bottom-4 right-4 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-sm">
              {safeIndex + 1}/{total}
            </div>
          ) : null}
        </button>

        {total > 1 ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-xl font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
              aria-label="Imagen anterior"
            >
              ‹
            </button>

            <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
              {gallery.map((image, index) => (
                <button
                  key={`${image.id}-${index}`}
                  type="button"
                  onClick={() => selectImage(index)}
                  className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border bg-white transition ${
                    index === safeIndex
                      ? "border-blue-600 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <Image
                    src={image.cardUrl}
                    alt={image.alt || title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-xl font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </div>
        ) : null}
      </div>

      {isOpen && currentImage ? (
        <div className="fixed inset-0 z-50 bg-black/90 p-3">
          <div className="flex h-full flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-white">
                {safeIndex + 1}/{total}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-lg"
              >
                Cerrar
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-2xl bg-black">
              <Image
                src={currentImage.fullUrl || currentImage.detailUrl}
                alt={currentImage.alt || title}
                width={1600}
                height={1100}
                sizes="100vw"
                className="h-auto max-h-full w-full object-contain"
              />

              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/90 text-2xl font-black text-slate-950 shadow-lg"
                    aria-label="Imagen anterior"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/90 text-2xl font-black text-slate-950 shadow-lg"
                    aria-label="Imagen siguiente"
                  >
                    ›
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
