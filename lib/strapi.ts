const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") || "http://localhost:1337";

/**
 * Obtiene una tienda por slug y trae sus productos relacionados.
 * Retorna el registro Strapi (data[0]) o null.
 */
export async function getStoreBySlug(slug: string) {
  const url =
    `${STRAPI_URL}/api/stores?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[0]=cover` +
    `&populate[1]=products` +
    `&populate[products][populate][0]=Image`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    console.error("Error al obtener tienda:", res.status, await res.text());
    return null;
  }

  const json = await res.json();
  if (!json?.data || json.data.length === 0) return null;

  return json.data[0];
}


/**
 * Obtiene un producto por documentId (como lo estás usando en el link).
 * Retorna el registro Strapi (data[0]) o null.
 */
export async function getProductById(id: string | number) {
  const url = `${STRAPI_URL}/api/products?filters[documentId][$eq]=${id}&populate=*`;


  const res = await fetch(url, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.[0] ?? null;
}

/**
 * ------------------------------------------------------------------
 * UTILIDADES GENERALES STRAPI (USO TRANSVERSAL)
 * ------------------------------------------------------------------
 * Estas funciones NO reemplazan getStoreBySlug ni getProductById.
 *
 * Se usan para:
 * - Pruebas de conexión
 * - Endpoints genéricos (predios, vehículos, galerías)
 * - Evitar duplicar lógica fetch
 *
 * Buenas prácticas:
 * - Centralizar STRAPI_URL
 * - No hardcodear fetch en páginas
 * - Facilitar documentación y debugging
 * ------------------------------------------------------------------
 */

export async function strapiFetch<T = any>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Strapi error ${res.status}: ${await res.text()}`);
  }

  return res.json();
}

/**
 * Convierte URLs relativas de Strapi Media a absolutas
 * Ej: /uploads/img.jpg -> http://localhost:1337/uploads/img.jpg
 */
export function toAbsMediaUrl(url?: string | null) {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

