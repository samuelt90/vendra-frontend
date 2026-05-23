// app/predios/[slug]/page.tsx

import VehicleCard from "./components/VehicleCard";

type PageProps = {
  params: { slug: string };
};

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function blocksToPlainText(blocks: any): string {
  try {
    if (!Array.isArray(blocks)) return "";

    return blocks
      .map((b: any) => {
        const children = Array.isArray(b?.children) ? b.children : [];
        return children.map((c: any) => c?.text ?? "").join("");
      })
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function safeStr(v: any, fallback = ""): string {
  if (v === null || v === undefined) return fallback;
  return String(v);
}

function normalizeStrapiEntity(item: any) {
  return item?.attributes ?? item ?? null;
}

function normalizeCollection(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

export default async function PredioPage({ params }: PageProps) {
  const { slug } = await (params as any);

  if (!slug) {
    return (
      <main className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">Predio</h1>
          <p className="mt-2 text-sm text-slate-600">Slug inválido.</p>
        </div>
      </main>
    );
  }

  const url =
    `${STRAPI_URL}/api/predios` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&fields[0]=slug&fields[1]=whatsapp&fields[2]=direccion&fields[3]=descripcion` +
    `&populate[vehiculos][fields][0]=titulo` +
    `&populate[vehiculos][fields][1]=marca` +
    `&populate[vehiculos][fields][2]=modelo` +
    `&populate[vehiculos][fields][3]=anio` +
    `&populate[vehiculos][fields][4]=transmision` +
    `&populate[vehiculos][fields][5]=precio` +
    `&populate[vehiculos][fields][6]=moneda` +
    `&populate[vehiculos][populate][galeria]=true`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-5xl">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-md" />
              <div className="font-black tracking-wide text-slate-950">
                Vendra
              </div>
            </div>

            <div className="text-xs font-black text-slate-500">
              Demo · Predios
            </div>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">Predio</h1>

            <p className="mt-2 text-sm text-slate-600">
              Error Strapi: <strong>{res.status}</strong>
            </p>

            <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
              {url}
            </pre>
          </section>
        </div>
      </main>
    );
  }

  const json = await res.json();
  const item = Array.isArray(json?.data) ? json.data[0] : null;
  const data = normalizeStrapiEntity(item);

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 p-4">
        <div className="mx-auto max-w-5xl">
          <header className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-md" />
              <div className="font-black tracking-wide text-slate-950">
                Vendra
              </div>
            </div>

            <div className="text-xs font-black text-slate-500">
              Demo · Predios
            </div>
          </header>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-black text-slate-950">
              Predio no encontrado
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              No se encontró predio para slug:{" "}
              <strong>{safeStr(slug)}</strong>
            </p>

            <pre className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-4 text-xs leading-relaxed text-slate-700">
              {url}
            </pre>
          </section>
        </div>
      </main>
    );
  }

  const descripcionPlano = blocksToPlainText((data as any)?.descripcion);

  const vehiculosRaw = (data as any)?.vehiculos;
  const vehiculosArr = normalizeCollection(vehiculosRaw)
    .map(normalizeStrapiEntity)
    .filter(Boolean);

  const whatsapp = safeStr((data as any)?.whatsapp, "").replace(/\D/g, "");
  const waLink = whatsapp ? `https://wa.me/502${whatsapp}` : "";

  const predioTitle = safeStr((data as any)?.slug, "Predio");
  const direccion = safeStr((data as any)?.direccion, "");
  const desc = descripcionPlano || "(sin descripción)";

  return (
    <main className="min-h-screen bg-slate-50 px-3 py-5 sm:px-4 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-md" />
            <div className="font-black tracking-wide text-slate-950">
              Vendra
            </div>
          </div>

          <div className="text-xs font-black text-slate-500">
            Demo · Predios
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="p-5 sm:p-6">
            <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-950">
              {predioTitle}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Información del predio y catálogo de vehículos disponible.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs">
                <span className="font-black text-slate-600">WhatsApp</span>
                <span className="font-extrabold text-slate-900">
                  {whatsapp ? `+502 ${whatsapp}` : "No definido"}
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-xs">
                <span className="font-black text-slate-600">Dirección</span>
                <span className="font-extrabold text-slate-900">
                  {direccion || "No definida"}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-sm font-black text-slate-700">
                Descripción
              </div>

              <div className="whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm leading-relaxed text-slate-700">
                {desc}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                className={`inline-flex items-center justify-center rounded-2xl border px-4 py-3 text-sm font-black transition ${
                  waLink
                    ? "border-green-700 bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
                    : "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                }`}
                href={waLink || "#"}
                target={waLink ? "_blank" : undefined}
                rel={waLink ? "noopener noreferrer" : undefined}
                aria-disabled={!waLink}
              >
                Contactar por WhatsApp
              </a>

              <a
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:bg-slate-50"
                href="#vehiculos"
              >
                Ver vehículos
              </a>
            </div>
          </div>

          <div
            id="vehiculos"
            className="border-t border-slate-200 bg-white/80 p-5 sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-black tracking-tight text-slate-950">
                Vehículos
              </h2>

              <div className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-black text-blue-700">
                {vehiculosArr.length} disponible
                {vehiculosArr.length === 1 ? "" : "s"}
              </div>
            </div>

            {vehiculosArr.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                Este predio no tiene vehículos por ahora.
              </p>
            ) : (
              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                {vehiculosArr.map((v: any) => (
                  <div
                    key={v?.id ?? v?.documentId ?? v?.titulo}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <VehicleCard
                      vehiculo={v}
                      slug={safeStr((data as any)?.slug, safeStr(slug))}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
