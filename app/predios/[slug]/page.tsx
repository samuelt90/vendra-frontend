// app/predios/[slug]/page.tsx

type PageProps = {
  params: { slug: string };
};

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

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function safeStr(v: any, fallback = ""): string {
  if (v === null || v === undefined) return fallback;
  return String(v);
}

function normalizeStrapiEntity(item: any) {
  // Strapi v4: { id, attributes: {...} }
  // Strapi v5: { documentId, ...fields }
  return item?.attributes ?? item ?? null;
}

function normalizeCollection(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

export default async function PredioPage({ params }: PageProps) {
  // ✅ IMPORTANTE: Mantengo tu forma (params como Promise en tu setup)
  const { slug } = await (params as any);

  // Guard simple (para que NO consulte con undefined)
  if (!slug) {
    return (
      <div style={{ padding: 16 }}>
        <h1>Predio</h1>
        <p>Slug inválido (undefined).</p>
      </div>
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

  // ===== UX Styles (sin tocar tu lógica) =====
  const css = `
    .page {
      min-height: 100vh;
      padding: 18px 12px 40px;
      background:
        radial-gradient(1200px 600px at 10% 0%, rgba(59,130,246,0.16), transparent 55%),
        radial-gradient(900px 480px at 90% 10%, rgba(16,185,129,0.14), transparent 50%),
        #f6f7fb;
    }
    .container { max-width: 980px; margin: 0 auto; }
    .topbar { display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:12px; }
    .brand { display:flex; align-items:center; gap:10px; user-select:none; }
    .dot {
      width:34px; height:34px; border-radius:12px;
      background: linear-gradient(135deg, #3b82f6, #10b981);
      box-shadow: 0 10px 18px rgba(0,0,0,0.12);
    }
    .brandText { font-weight:900; letter-spacing:.2px; }
    .card {
      background: rgba(255,255,255,0.92);
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 20px;
      box-shadow: 0 16px 30px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .hero { padding: 18px 16px; }
    .title { margin:0; font-size:22px; line-height:1.15; font-weight:900; letter-spacing:-0.3px; }
    .subtitle { margin:6px 0 0; opacity:.72; font-size:13.5px; line-height:1.35; }
    .chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .chip {
      display:inline-flex; align-items:center; gap:8px;
      padding:8px 10px; border-radius:999px;
      background: rgba(0,0,0,0.04);
      border: 1px solid rgba(0,0,0,0.06);
      font-size:12.5px; line-height:1;
    }
    .chipLabel { font-weight:900; opacity:.75; }
    .chipValue { font-weight:800; }
    .descLabel { font-weight:900; font-size:13.5px; margin:14px 0 6px; opacity:.8; }
    .descBox {
      padding:12px; border-radius:16px;
      background: rgba(0,0,0,0.03);
      border: 1px solid rgba(0,0,0,0.08);
      white-space: pre-wrap;
      line-height:1.45; font-size:14px; opacity:.92;
    }
    .actions { display:flex; gap:10px; flex-wrap:wrap; margin-top:14px; }
    .btn {
      text-decoration:none;
      display:inline-flex; align-items:center; justify-content:center;
      padding: 12px 14px; border-radius: 14px;
      font-weight: 900;
      border: 1px solid rgba(0,0,0,0.10);
    }
    .btnPrimary {
      color:white;
      background: linear-gradient(135deg, #25D366, #16a34a);
      box-shadow: 0 12px 18px rgba(22,163,74,0.24);
      border-color: rgba(0,0,0,0.06);
    }
    .btnSecondary {
      color:#111827;
      background: rgba(255,255,255,0.85);
      box-shadow: 0 10px 16px rgba(0,0,0,0.06);
    }
    .btnDisabled { opacity:.45; filter:grayscale(.4); pointer-events:none; box-shadow:none; }
    .section {
      padding: 14px 16px 18px;
      border-top: 1px solid rgba(0,0,0,0.07);
      background: linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.92));
    }
    .sectionHead { display:flex; align-items:baseline; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:10px; }
    .h2 { margin:0; font-size:16px; font-weight:900; letter-spacing:-0.2px; }
    .badge {
      font-size:12px; font-weight:900;
      padding:6px 10px; border-radius:999px;
      background: rgba(59,130,246,0.10);
      border: 1px solid rgba(59,130,246,0.18);
      color: #1d4ed8;
    }
    .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:14px; width:100%; }
    .wrapCard {
      border-radius:18px; overflow:hidden;
      background: rgba(255,255,255,0.96);
      border: 1px solid rgba(0,0,0,0.08);
      box-shadow: 0 12px 22px rgba(0,0,0,0.07);
      transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    }
    @media (hover:hover) {
      .wrapCard:hover {
        transform: translateY(-2px);
        box-shadow: 0 18px 34px rgba(0,0,0,0.10);
        border-color: rgba(0,0,0,0.14);
      }
    }
    .empty {
      opacity:.72; font-size:14px; margin:0;
      padding:12px; border-radius:14px;
      background: rgba(0,0,0,0.03);
      border: 1px dashed rgba(0,0,0,0.16);
    }
    .footer { margin-top:14px; opacity:.6; font-size:12.5px; text-align:center; }
    .code {
      margin-top:10px; padding:12px; border-radius:14px;
      background: rgba(0,0,0,0.05);
      border: 1px solid rgba(0,0,0,0.08);
      overflow-x:auto; font-size:12px; line-height:1.35;
    }
  `;

  if (!res.ok) {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="container">
          <div className="topbar">
            <div className="brand">
              <div className="dot" />
              <div className="brandText">Vendra</div>
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.65, fontWeight: 900 }}>
              Demo · Predios
            </div>
          </div>

          <div className="card">
            <div className="hero">
              <h1 className="title">Predio</h1>
              <p className="subtitle">
                Error Strapi: <strong>{res.status}</strong>
              </p>
              <pre className="code">{url}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const json = await res.json();
  const item = Array.isArray(json?.data) ? json.data[0] : null;
  const data = normalizeStrapiEntity(item);

  if (!data) {
    return (
      <div className="page">
        <style>{css}</style>
        <div className="container">
          <div className="topbar">
            <div className="brand">
              <div className="dot" />
              <div className="brandText">Vendra</div>
            </div>
            <div style={{ fontSize: 12.5, opacity: 0.65, fontWeight: 900 }}>
              Demo · Predios
            </div>
          </div>

          <div className="card">
            <div className="hero">
              <h1 className="title">Predio no encontrado</h1>
              <p className="subtitle">
                No se encontró predio para slug: <strong>{safeStr(slug)}</strong>
              </p>
              <pre className="code">{url}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const descripcionPlano = blocksToPlainText((data as any)?.descripcion);

  // vehiculos
  const vehiculosRaw = (data as any)?.vehiculos;
  const vehiculosArr = normalizeCollection(vehiculosRaw)
    .map(normalizeStrapiEntity)
    .filter(Boolean);

  // WhatsApp link (sin JS)
  const whatsapp = safeStr((data as any)?.whatsapp, "").replace(/\D/g, "");
  const waLink = whatsapp ? `https://wa.me/502${whatsapp}` : "";

  // Tu VehicleCard
  const VehicleCard = (await import("./components/VehicleCard")).default;

  const predioTitle = safeStr((data as any)?.slug, "Predio");
  const direccion = safeStr((data as any)?.direccion, "");
  const desc = descripcionPlano || "(sin descripción)";

  return (
    <div className="page">
      <style>{css}</style>

      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="dot" />
            <div className="brandText">Vendra</div>
          </div>
          <div style={{ fontSize: 12.5, opacity: 0.65, fontWeight: 900 }}>
            Demo · Predios
          </div>
        </div>

        <div className="card">
          <div className="hero">
            <h1 className="title">{predioTitle}</h1>
            <p className="subtitle">
              Información del predio y catálogo de vehículos disponible.
            </p>

            <div className="chips">
              <div className="chip">
                <span className="chipLabel">WhatsApp</span>
                <span className="chipValue">
                  {whatsapp ? `+502 ${whatsapp}` : "No definido"}
                </span>
              </div>

              <div className="chip">
                <span className="chipLabel">Dirección</span>
                <span className="chipValue">{direccion || "No definida"}</span>
              </div>
            </div>

            <div className="descLabel">Descripción</div>
            <div className="descBox">{desc}</div>

            <div className="actions">
              <a
                className={`btn btnPrimary ${waLink ? "" : "btnDisabled"}`}
                href={waLink || "#"}
                target={waLink ? "_blank" : undefined}
                rel={waLink ? "noopener noreferrer" : undefined}
                aria-disabled={!waLink}
              >
                Contactar por WhatsApp
              </a>

              <a className="btn btnSecondary" href="#vehiculos">
                Ver vehículos
              </a>
            </div>
          </div>

          <div id="vehiculos" className="section">
            <div className="sectionHead">
              <h2 className="h2">Vehículos</h2>
              <div className="badge">
                {vehiculosArr.length} disponible{vehiculosArr.length === 1 ? "" : "s"}
              </div>
            </div>

            {vehiculosArr.length === 0 ? (
              <p className="empty">Este predio no tiene vehículos por ahora.</p>
            ) : (
              <div className="grid">
                {vehiculosArr.map((v: any) => (
                  <div
                    key={v?.id ?? v?.documentId ?? v?.titulo ?? Math.random()}
                    className="wrapCard"
                  >
                    <VehicleCard vehiculo={v} slug={safeStr((data as any)?.slug, safeStr(slug))} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
}
