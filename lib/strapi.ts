// lib/strapi.ts

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// 🔹 Obtener tienda por slug (con sus productos)
export async function getStoreBySlug(slug: string) {
  const url = `${STRAPI_URL}/api/stores?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate=products`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error al obtener tienda:", res.status, await res.text());
    return null;
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    return null;
  }

  // Strapi: la tienda viene en data[0]
  return json.data[0];
}

// 🔹 Obtener producto por id (opcional, para tu página de producto)
export async function getProductById(id: string) {
  const url = `${STRAPI_URL}/api/products/${id}?populate=store`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error al obtener producto:", res.status, await res.text());
    return null;
  }

  const json = await res.json();

  if (!json.data) {
    return null;
  }

  return json.data;
}
