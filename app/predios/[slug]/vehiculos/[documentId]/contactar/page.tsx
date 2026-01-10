"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type PageProps = {
  params: { slug: string; documentId: string };
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function cleanPhone(input: string) {
  return (input || "").replace(/\D/g, ""); // solo números
}

export default function ContactarPage({ params }: PageProps) {
  const p = useParams<{ slug: string; documentId: string }>();
  const slug = (p?.slug as string) ?? params?.slug;
  const documentId = (p?.documentId as string) ?? params?.documentId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [whatsappPredio, setWhatsappPredio] = useState<string>("");
  const [predioNombre, setPredioNombre] = useState<string>("");

  const [vehiculo, setVehiculo] = useState<any>(null);

  // Formulario (solo 2 campos)
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  // ====== UX styles (sin romper lógica) ======
  const styles = useMemo(() => {
    const card: React.CSSProperties = {
      width: "100%",
      maxWidth: 560,
      background: "#fff",
      border: "1px solid #e9e9e9",
      borderRadius: 16,
      padding: 18,
      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    };

    const label: React.CSSProperties = {
      display: "grid",
      gap: 6,
      fontSize: 13,
      fontWeight: 700,
      color: "#111",
    };

    const input: React.CSSProperties = {
      width: "100%",
      padding: "12px 12px",
      borderRadius: 12,
      border: "1px solid #d9d9d9",
      outline: "none",
      fontSize: 14,
      background: "#fff",
    };

    const hint: React.CSSProperties = {
      fontSize: 12,
      opacity: 0.7,
      lineHeight: 1.4,
    };

    const softBox: React.CSSProperties = {
      marginTop: 14,
      border: "1px solid #efefef",
      borderRadius: 14,
      padding: 14,
      background: "#fafafa",
    };

    // Botón estilo "Contactar a vendedor"
    const btnPrimary: React.CSSProperties = {
      width: "100%",
      marginTop: 16,
      padding: "14px 16px",
      borderRadius: 14,
      border: "1px solid rgba(0,0,0,0.06)",
      background: "#11a956",
      color: "#fff",
      fontWeight: 900,
      letterSpacing: 0.2,
      cursor: "pointer",
      boxShadow: "0 12px 24px rgba(18,158,144,0.25)",
      transition: "transform 120ms ease, filter 120ms ease, opacity 120ms ease",
    };

    const btnDisabled: React.CSSProperties = {
      ...btnPrimary,
      opacity: 0.5,
      cursor: "not-allowed",
      boxShadow: "none",
      background: "linear-gradient(180deg,#b7e7e2,#9adad3)",
      color: "#2a5a55",
    };

    return { card, label, input, hint, softBox, btnPrimary, btnDisabled };
  }, []);

  // Fetch (igual a tu lógica)
  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        setLoading(true);
        setError("");

        const url =
          `${STRAPI_URL}/api/predios` +
          `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
          `&fields[0]=slug&fields[1]=whatsapp` +
          `&populate[vehiculos][fields][0]=titulo` +
          `&populate[vehiculos][fields][1]=marca` +
          `&populate[vehiculos][fields][2]=modelo` +
          `&populate[vehiculos][fields][3]=anio` +
          `&populate[vehiculos][fields][4]=transmision` +
          `&populate[vehiculos][fields][5]=precio` +
          `&populate[vehiculos][fields][6]=moneda`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Strapi error: ${res.status}`);

        const json = await res.json();
        const item = Array.isArray(json?.data) ? json.data[0] : null;
        const data = item?.attributes ?? item ?? null;

        if (!data) throw new Error("No se encontró el predio.");

        // whatsapp del predio (destino)
        const wp = cleanPhone(String(data.whatsapp ?? ""));
        const predioSlug = String(data.slug ?? "");

        // vehiculos (v4/v5)
        const vehiculosRaw: any = data?.vehiculos;
        const vehiculosArr: any[] = Array.isArray(vehiculosRaw)
          ? vehiculosRaw
          : Array.isArray(vehiculosRaw?.data)
          ? vehiculosRaw.data
          : [];

        const vehiculos = vehiculosArr.map((v: any) => v?.attributes ?? v);

        // Buscar el vehiculo por documentId (si no existe, intenta id)
        const found =
          vehiculos.find(
            (v: any) => String(v?.documentId ?? "") === String(documentId)
          ) ??
          vehiculos.find((v: any) => String(v?.id ?? "") === String(documentId)) ??
          null;

        if (!found) throw new Error("No se encontró el vehículo en este predio.");

        if (!mounted) return;

        setWhatsappPredio(wp);
        setPredioNombre(predioSlug);
        setVehiculo(found);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message ?? "Error desconocido");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [slug, documentId]);

  const mensaje = useMemo(() => {
    if (!vehiculo) return "";

    const titulo = vehiculo?.titulo ?? "";
    const marca = vehiculo?.marca ?? "";
    const modelo = vehiculo?.modelo ?? "";
    const anio = vehiculo?.anio ?? "";
    const transmision = vehiculo?.transmision ?? "";
    const precio = vehiculo?.precio ?? "";
    const moneda = vehiculo?.moneda ?? "";

    const lineas = [
      "Hola. Estoy interesado en este vehículo:",
      "",
      "— Detalles del vehículo —",
      `Predio: ${predioNombre || ""}`,
      `Vehículo: ${titulo}`,
      `Marca: ${marca}`,
      `Modelo: ${modelo}`,
      `Año: ${anio}`,
      `Transmisión: ${transmision}`,
      `Precio: ${String(precio)} ${String(moneda)}`.trim(),
      "",
      "— Datos del interesado —",
      `Nombre: ${nombre || ""}`,
      `Teléfono: ${telefono || ""}`,
    ]
      .filter((x) => x !== "Precio:" && x !== "Precio: ")
      .map((x) => x.trimEnd());

    return lineas.join("\n");
  }, [vehiculo, predioNombre, nombre, telefono]);

  const waLink = useMemo(() => {
    const to = cleanPhone(whatsappPredio);
    if (!to) return "";
    const finalTo = to; // si quieres: to.startsWith("502") ? to : `502${to}`
    return `https://wa.me/${finalTo}?text=${encodeURIComponent(mensaje)}`;
  }, [whatsappPredio, mensaje]);

  const canSend = Boolean(waLink && nombre.trim() && telefono.trim());

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <div style={styles.card}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Contactar a vendedor</div>
          <div style={{ marginTop: 8, opacity: 0.7 }}>Cargando…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          padding: 16,
        }}
      >
        <div style={styles.card}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>Contactar a vendedor</div>
          <div style={{ marginTop: 10, color: "crimson", fontWeight: 700 }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  // Resumen: mismos campos
  const resumen: [string, any][] = [
    ["Vehículo", vehiculo?.titulo],
    ["Marca", vehiculo?.marca],
    ["Modelo", vehiculo?.modelo],
    ["Año", vehiculo?.anio],
    ["Transmisión", vehiculo?.transmision],
  ];

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: 16,
        display: "grid",
        placeItems: "center", // ✅ centrado en desktop y mobile
      }}
    >
      <div style={styles.card}>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 900, fontSize: 20, lineHeight: 1.1 }}>
            Contactar a vendedor
          </div>
          <div style={styles.hint}>
            Llena tus datos y se abrirá WhatsApp con el mensaje ya listo.
          </div>
        </div>

        {/* 1) Campos */}
        <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
          <label style={styles.label}>
            Nombre
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Teléfono (WhatsApp)
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: 50255554444"
              style={styles.input}
              inputMode="numeric"
            />
          </label>
        </div>

        {/* 2) Resumen */}
        <div style={styles.softBox}>
          <div style={{ fontWeight: 900, marginBottom: 10 }}>Resumen del vehículo</div>
          <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
            {resumen.map(([label, val]) => (
              <div key={label} style={{ display: "flex", gap: 8 }}>
                <div style={{ minWidth: 110, opacity: 0.75, fontWeight: 800 }}>
                  {label}
                </div>
                <div style={{ fontWeight: 800 }}>{val ?? "-"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3) Botón enviar (MISMO estilo que “Contactar a vendedor”) */}
        <button
          type="button"
          onClick={() => window.open(waLink, "_blank")}
          disabled={!canSend}
          style={canSend ? styles.btnPrimary : styles.btnDisabled}
          onMouseDown={(e) => {
            // micro feedback sin libs
            if (!canSend) return;
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.99)";
          }}
          onMouseUp={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          onMouseEnter={(e) => {
            if (!canSend) return;
            (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.03)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter = "none";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          Enviar mensaje por WhatsApp
        </button>

        {!canSend && (
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
            Completa <strong>nombre</strong> y <strong>teléfono</strong> para habilitar el botón.
          </div>
        )}
      </div>
    </div>
  );
}
