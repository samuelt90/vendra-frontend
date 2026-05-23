"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/getImageUrl";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";

type Props = {
  vehiculo: any;
  slug: string;
};

export default function VehicleCard({ vehiculo, slug }: Props) {
  const router = useRouter();

  const titulo = vehiculo?.titulo ?? "(sin título)";
  const marca = vehiculo?.marca ?? "";
  const modelo = vehiculo?.modelo;
  const anio = vehiculo?.anio;
  const transmision = vehiculo?.transmision;
  const precio = vehiculo?.precio;
  const moneda = vehiculo?.moneda;

  // ===== Galería (Strapi v4/v5) =====
  const galeriaRaw = vehiculo?.galeria;

  // galeria puede venir como array (v5) o { data: [] } (v4)
  const fotosArr: any[] = Array.isArray(galeriaRaw)
    ? galeriaRaw
    : Array.isArray(galeriaRaw?.data)
    ? galeriaRaw.data
    : [];

  // cada foto puede venir plano (v5) o en .attributes (v4)
  const fotosNorm = useMemo(() => {
    return fotosArr.map((f: any) => f?.attributes ?? f).filter(Boolean);
  }, [galeriaRaw]);

  const fotosCount = fotosNorm.length;

  // ===== Slider =====
  const [idx, setIdx] = useState(0);

  // si cambia la cantidad de fotos, evita idx fuera de rango
  const safeIdx = fotosCount === 0 ? 0 : Math.min(idx, fotosCount - 1);
  const currentPhoto = fotosCount > 0 ? fotosNorm[safeIdx] : null;

  const imgUrl = getImageUrl(getStrapiMediaUrl(currentPhoto));

  function prev() {
    if (fotosCount <= 1) return;
    setIdx((v) => (v - 1 + fotosCount) % fotosCount);
  }

  function next() {
    if (fotosCount <= 1) return;
    setIdx((v) => (v + 1) % fotosCount);
  }

  // ===== Detalles =====
  const [showDetails, setShowDetails] = useState(false);


  return (
  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
    <div className="text-base font-black tracking-wide text-gray-950">
      {titulo}
    </div>

    <div className="mt-1 text-sm text-gray-600">
      {marca}
    </div>

    <div className="mt-3 text-sm text-gray-600">
      Fotos en galería: {fotosCount}
    </div>

    {/* IMAGEN + FLECHAS */}
    <div className="relative mt-3 flex min-h-65 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={currentPhoto?.alternativeText ?? titulo ?? "vehículo"}
          width={900}
          height={600}
          className="mx-auto h-auto max-h-90 w-full max-w-130 rounded-xl object-contain"
        />
      ) : (
        <div className="text-sm text-gray-500">(sin imagen)</div>
      )}

      {/* Flecha izquierda */}
      <button
        type="button"
        onClick={prev}
        aria-label="Anterior"
        disabled={fotosCount <= 1}
        className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gray-300 bg-white text-xl font-black shadow-md transition disabled:cursor-not-allowed disabled:opacity-45"
      >
        ‹
      </button>

      {/* Flecha derecha */}
      <button
        type="button"
        onClick={next}
        aria-label="Siguiente"
        disabled={fotosCount <= 1}
        className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-gray-300 bg-white text-xl font-black shadow-md transition disabled:cursor-not-allowed disabled:opacity-45"
      >
        ›
      </button>

      {/* Indicador */}
      <div className="absolute bottom-3 left-3 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-extrabold text-gray-900">
        {fotosCount === 0 ? "0/0" : `${safeIdx + 1}/${fotosCount}`}
      </div>
    </div>

    {/* BOTÓN: VER DETALLES */}
    <div className="mt-4">
      {!showDetails ? (
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-black text-slate-900 transition hover:bg-slate-50"
        >
          Ver detalles del vehículo
        </button>
      ) : (
        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="grid gap-3 text-sm">
            <div>
              <span className="font-extrabold text-gray-500">■ Precio:</span>{" "}
              <strong>
                {precio ?? "(sin dato)"} {moneda ?? ""}
              </strong>
            </div>

            <div>
              <span className="font-extrabold text-gray-500">■ Modelo:</span>{" "}
              <strong>{modelo ?? "(sin dato)"}</strong>
            </div>

            <div>
              <span className="font-extrabold text-gray-500">■ Año:</span>{" "}
              <strong>{anio ?? "(sin dato)"}</strong>
            </div>

            <div>
              <span className="font-extrabold text-gray-500">
                ■ Transmisión:
              </span>{" "}
              <strong>{transmision ?? "(sin dato)"}</strong>
            </div>

            <div>
              <span className="font-extrabold text-gray-500">■ Marca:</span>{" "}
              <strong>{marca || "(sin dato)"}</strong>
            </div>
          </div>

          {/* Botones abajo */}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="flex-1 rounded-xl border border-gray-300 bg-gray-100 px-3 py-3 font-black text-gray-900 transition hover:bg-gray-200"
            >
              Cerrar (x)
            </button>

            <button
              type="button"
              onClick={() => {
                router.push(
                  `/predios/${slug}/vehiculos/${vehiculo.documentId}/contactar`
                );
              }}
              className="flex-1 rounded-xl border border-green-700 bg-green-600 px-3 py-3 font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
            >
              Contactar a vendedor
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
