"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type PageProps = {
  params: { slug: string; documentId: string };
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function cleanPhone(input: string) {
  return (input || "").replace(/\D/g, "");
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

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

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

        if (!res.ok) {
          throw new Error(`Strapi error: ${res.status}`);
        }

        const json = await res.json();
        const item = Array.isArray(json?.data) ? json.data[0] : null;
        const data = item?.attributes ?? item ?? null;

        if (!data) {
          throw new Error("No se encontró el predio.");
        }

        const wp = cleanPhone(String(data.whatsapp ?? ""));
        const predioSlug = String(data.slug ?? "");

        const vehiculosRaw: any = data?.vehiculos;

        const vehiculosArr: any[] = Array.isArray(vehiculosRaw)
          ? vehiculosRaw
          : Array.isArray(vehiculosRaw?.data)
          ? vehiculosRaw.data
          : [];

        const vehiculos = vehiculosArr.map((v: any) => v?.attributes ?? v);

        const found =
          vehiculos.find(
            (v: any) => String(v?.documentId ?? "") === String(documentId)
          ) ??
          vehiculos.find((v: any) => String(v?.id ?? "") === String(documentId)) ??
          null;

        if (!found) {
          throw new Error("No se encontró el vehículo en este predio.");
        }

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

    const finalTo = to;

    return `https://wa.me/${finalTo}?text=${encodeURIComponent(mensaje)}`;
  }, [whatsappPredio, mensaje]);

  const canSend = Boolean(waLink && nombre.trim() && telefono.trim());

  if (loading) {
    return (
      <div className="grid min-h-[70vh] place-items-center p-4">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="text-lg font-black text-gray-950">
            Contactar a vendedor
          </div>

          <div className="mt-2 text-sm text-gray-500">Cargando…</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid min-h-[70vh] place-items-center p-4">
        <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
          <div className="text-lg font-black text-gray-950">
            Contactar a vendedor
          </div>

          <div className="mt-3 font-bold text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  const resumen: [string, any][] = [
    ["Vehículo", vehiculo?.titulo],
    ["Marca", vehiculo?.marca],
    ["Modelo", vehiculo?.modelo],
    ["Año", vehiculo?.anio],
    ["Transmisión", vehiculo?.transmision],
  ];

  return (
    <div className="grid min-h-[70vh] place-items-center p-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
        <div className="grid gap-2">
          <h1 className="text-xl font-black leading-tight text-gray-950">
            Contactar a vendedor
          </h1>

          <p className="text-sm leading-relaxed text-gray-500">
            Llena tus datos y se abrirá WhatsApp con el mensaje ya listo.
          </p>
        </div>

        {/* Campos */}
        <div className="mt-4 grid gap-3">
          <label className="grid gap-2 text-sm font-bold text-gray-950">
            Nombre
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
            />
          </label>

          <label className="grid gap-2 text-sm font-bold text-gray-950">
            Teléfono (WhatsApp)
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Ej: 50255554444"
              inputMode="numeric"
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20"
            />
          </label>
        </div>

        {/* Resumen */}
        <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 font-black text-gray-950">
            Resumen del vehículo
          </div>

          <div className="grid gap-2 text-sm">
            {resumen.map(([label, val]) => (
              <div key={label} className="flex gap-3">
                <div className="min-w-[110px] font-extrabold text-gray-500">
                  {label}
                </div>

                <div className="font-extrabold text-gray-900">
                  {val ?? "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón enviar */}
        <button
          type="button"
          onClick={() => window.open(waLink, "_blank")}
          disabled={!canSend}
          className="mt-4 w-full rounded-2xl border border-black/5 bg-green-600 px-4 py-4 font-black tracking-wide text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-green-200 disabled:text-green-900 disabled:shadow-none"
        >
          Enviar mensaje por WhatsApp
        </button>

        {!canSend && (
          <div className="mt-3 text-xs leading-relaxed text-gray-500">
            Completa <strong>nombre</strong> y <strong>teléfono</strong> para
            habilitar el botón.
          </div>
        )}
      </div>
    </div>
  );
}
