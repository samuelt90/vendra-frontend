"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Props = {
  vehiculo: any;
  slug: string;
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function mediaToUrl(file: any): string | null {
  if (!file) return null;

  const direct = file?.url as string | undefined;
  if (direct) return direct.startsWith("http") ? direct : `${STRAPI_URL}${direct}`;

  const thumb = file?.formats?.thumbnail?.url as string | undefined;
  if (thumb) return thumb.startsWith("http") ? thumb : `${STRAPI_URL}${thumb}`;

  return null;
}

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
  }, [galeriaRaw]); // mantenemos tu intención: recalcular si cambia galería

  const fotosCount = fotosNorm.length;

  // ===== Slider =====
  const [idx, setIdx] = useState(0);

  // si cambia la cantidad de fotos, evita idx fuera de rango
  const safeIdx = fotosCount === 0 ? 0 : Math.min(idx, fotosCount - 1);

  const currentPhoto = fotosCount > 0 ? fotosNorm[safeIdx] : null;
  const imgUrl = mediaToUrl(currentPhoto);

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

  // ===== Styles (solo UX visual) =====
  const cardStyle: React.CSSProperties = {
    border: "1px solid #e6e6e6",
    borderRadius: 14,
    padding: 14,
    background: "#ffffff",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
  };

  const titleStyle: React.CSSProperties = {
    fontWeight: 900,
    fontSize: 16,
    letterSpacing: 0.2,
  };

  const subStyle: React.CSSProperties = {
    opacity: 0.8,
    marginTop: 3,
    fontSize: 13,
  };

  const metaStyle: React.CSSProperties = {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.8,
  };

  // Contenedor centrado para imagen 
  const mediaWrapStyle: React.CSSProperties = {
    marginTop: 12,
    position: "relative",
    borderRadius: 12,
    background: "#f6f7f9",
    border: "1px solid #ececec",
    padding: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 260,
    overflow: "hidden",
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 520,
    maxHeight: 360,
    height: "auto",
    display: "block",
    margin: "0 auto",
    objectFit: "contain",
    borderRadius: 10,
  };

  const arrowBtnStyle = (disabled: boolean): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 38,
    height: 38,
    borderRadius: 999,
    border: "1px solid #d9d9d9",
    background: "#ffffff",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    fontSize: 18,
    fontWeight: 900,
    boxShadow: "0 6px 14px rgba(0,0,0,0.10)",
    display: "grid",
    placeItems: "center",
    userSelect: "none",
  });

  const indicatorStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 10,
    left: 12,
    padding: "5px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: 800,
    opacity: 0.95,
  };

  // Botones con color diferente al contenedor
  const btnPrimary: React.CSSProperties = {
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid #0a7a3f",
    background: "#11a956",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
    flex: 1,
    boxShadow: "0 10px 18px rgba(17,169,86,0.20)",
  };

  const btnSecondary: React.CSSProperties = {
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid #d0d5dd",
    background: "#f2f4f7",
    color: "#111827",
    cursor: "pointer",
    fontWeight: 900,
    flex: 1,
  };

  const btnOutline: React.CSSProperties = {
    padding: "11px 12px",
    borderRadius: 12,
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#0f172a",
    cursor: "pointer",
    fontWeight: 900,
    width: "100%",
  };

  const detailsCardStyle: React.CSSProperties = {
    marginTop: 10,
    border: "1px solid #e9e9e9",
    borderRadius: 12,
    padding: 12,
    background: "#fbfbfc",
  };

  const detailsGridStyle: React.CSSProperties = {
    display: "grid",
    gap: 10,
    fontSize: 13,
  };

  const labelStyle: React.CSSProperties = { opacity: 0.7, fontWeight: 800 };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{titulo}</div>
      <div style={subStyle}>{marca}</div>

      <div style={metaStyle}>Fotos en galería: {fotosCount}</div>

      {/* IMAGEN + FLECHAS */}
      <div style={mediaWrapStyle}>
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={currentPhoto?.alternativeText ?? titulo ?? "vehículo"}
            style={imgStyle}
          />
        ) : (
          <div style={{ fontSize: 13, opacity: 0.7 }}>(sin imagen)</div>
        )}

        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={prev}
          aria-label="Anterior"
          style={{
            ...arrowBtnStyle(fotosCount <= 1),
            left: 10,
          }}
        >
          ‹
        </button>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={next}
          aria-label="Siguiente"
          style={{
            ...arrowBtnStyle(fotosCount <= 1),
            right: 10,
          }}
        >
          ›
        </button>

        {/* Indicador */}
        <div style={indicatorStyle}>
          {fotosCount === 0 ? "0/0" : `${safeIdx + 1}/${fotosCount}`}
        </div>
      </div>

      {/* BOTÓN: VER DETALLES */}
      <div style={{ marginTop: 14 }}>
        {!showDetails ? (
          <button
            type="button"
            onClick={() => setShowDetails(true)}
            style={btnOutline}
          >
            Ver detalles del vehículo
          </button>
        ) : (
          <>
            {/* CARD LIGERA (detalles) */}
            <div style={detailsCardStyle}>
              <div style={detailsGridStyle}>
                <div>
                  <span style={labelStyle}>■ Precio:</span>{" "}
                  <strong>
                    {precio ?? "(sin dato)"} {moneda ?? ""}
                  </strong>
                </div>
                <div>
                  <span style={labelStyle}>■ Modelo:</span>{" "}
                  <strong>{modelo ?? "(sin dato)"}</strong>
                </div>
                <div>
                  <span style={labelStyle}>■ Año:</span>{" "}
                  <strong>{anio ?? "(sin dato)"}</strong>
                </div>
                <div>
                  <span style={labelStyle}>■ Transmisión:</span>{" "}
                  <strong>{transmision ?? "(sin dato)"}</strong>
                </div>
                <div>
                  <span style={labelStyle}>■ Marca:</span>{" "}
                  <strong>{marca || "(sin dato)"}</strong>
                </div>
              </div>

              {/* Botones abajo */}
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  style={btnSecondary}
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
                  style={btnPrimary}
                >
                  Contactar a vendedor
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
