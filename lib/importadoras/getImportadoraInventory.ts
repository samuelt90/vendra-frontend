type StrapiMediaItem = {
  url?: string;
  attributes?: {
    url?: string;
  };
};

type StrapiMedia = {
  url?: string;
  data?: StrapiMediaItem | StrapiMediaItem[] | null;
};

export type ImportadoraVehicleStatus =
  | "proximo_ingreso"
  | "en_reparacion"
  | "listo_entrega"
  | "entregado";

export type ImportadoraVehicle = {
  id: number;
  title: string;
  active: boolean;
  featured: boolean;
  brand: string;
  model: string;
  year: number | null;
  price: string | null;
  isNegotiable: boolean;
  mainImageUrl: string | null;
  imageUrls: string[];
  description: string | null;
  features: string | null;
  sortOrder: number | null;
  inventoryStatus: ImportadoraVehicleStatus;
};

const STRAPI_URL =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

function getSingleMediaUrl(media: StrapiMedia | null | undefined): string | null {
  const data = media?.data;

  const url =
    media?.url ||
    (!Array.isArray(data) ? data?.url || data?.attributes?.url : null);

  if (!url) return null;

  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function getMultipleMediaUrls(media: StrapiMedia | null | undefined): string[] {
  const data = media?.data;

  if (Array.isArray(data)) {
    return data
      .map((item) => item.url || item.attributes?.url)
      .filter(Boolean)
      .map((url) => (url!.startsWith("http") ? url! : `${STRAPI_URL}${url}`));
  }

  return [];
}

function normalizeVehicle(item: any): ImportadoraVehicle {
  const data = item.attributes ? item.attributes : item;

  const generatedTitle = [data.brand, data.model, data.year]
    .filter(Boolean)
    .join(" ");

  return {
    id: item.id,
    title: data.title || generatedTitle,
    active: Boolean(data.active),
    featured: Boolean(data.featured),
    brand: data.brand ?? "",
    model: data.model ?? "",
    year: data.year ?? null,
    price: data.price ?? null,
    isNegotiable: Boolean(data.isNegotiable),
    mainImageUrl: getSingleMediaUrl(data.mainImage),
    imageUrls: getMultipleMediaUrls(data.images),
    description: data.description ?? null,
    features: data.features ?? null,
    sortOrder: data.sortOrder ?? null,
    inventoryStatus: data.inventoryStatus ?? "proximo_ingreso",
  };
}

export async function getImportadoraInventory(
  slug: string
): Promise<ImportadoraVehicle[]> {
  const params = new URLSearchParams();

  params.set("filters[importadora][slug][$eq]", slug);
  params.set("filters[active][$eq]", "true");

  params.set("fields[0]", "title");
  params.set("fields[1]", "active");
  params.set("fields[2]", "featured");
  params.set("fields[3]", "brand");
  params.set("fields[4]", "model");
  params.set("fields[5]", "year");
  params.set("fields[6]", "price");
  params.set("fields[7]", "isNegotiable");
  params.set("fields[8]", "description");
  params.set("fields[9]", "features");
  params.set("fields[10]", "sortOrder");
  params.set("fields[11]", "inventoryStatus");

  params.set("populate[mainImage][fields][0]", "url");
  params.set("populate[images][fields][0]", "url");

  params.set("sort[0]", "sortOrder:asc");
  params.set("sort[1]", "year:desc");

  const url = `${STRAPI_URL}/api/importadoras-vehicles?${params.toString()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el inventario de la importadora.");
  }

  const json = await response.json();

  return (json.data ?? []).map(normalizeVehicle);
}
