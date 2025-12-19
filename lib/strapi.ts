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
