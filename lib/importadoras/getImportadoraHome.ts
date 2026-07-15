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

export type ImportadoraHomeVehicleStatus =
  | "proximo_ingreso"
  | "en_reparacion"
  | "listo_entrega"
  | "entregado";

export type ImportadoraHomeVehicle = {
  id: number;
  title: string;
  brand: string;
  model: string;
  year: number | null;
  price: string | null;
  isNegotiable: boolean;
  inventoryStatus: ImportadoraHomeVehicleStatus;
  mainImageUrl: string | null;
};

export type ImportadoraHome = {
  id: number;
  name: string;
  slug: string;
  whatsappNumber: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  shortDescription: string | null;
  featuredVehicles: ImportadoraHomeVehicle[];
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

function normalizeHomeVehicle(item: any): ImportadoraHomeVehicle {
  const data = item.attributes ? item.attributes : item;

  const generatedTitle = [data.brand, data.model, data.year]
    .filter(Boolean)
    .join(" ");

  return {
    id: item.id,
    title: data.title || generatedTitle,
    brand: data.brand ?? "",
    model: data.model ?? "",
    year: data.year ?? null,
    price: data.price ?? null,
    isNegotiable: Boolean(data.isNegotiable),
    inventoryStatus: data.inventoryStatus ?? "proximo_ingreso",
    mainImageUrl: getSingleMediaUrl(data.mainImage),
  };
}

export async function getImportadoraHome(
  slug: string
): Promise<ImportadoraHome | null> {
  const importadoraParams = new URLSearchParams();

  importadoraParams.set("filters[slug][$eq]", slug);
  importadoraParams.set("filters[active][$eq]", "true");

  importadoraParams.set("fields[0]", "name");
  importadoraParams.set("fields[1]", "slug");
  importadoraParams.set("fields[2]", "shortDescription");
  importadoraParams.set("fields[3]", "whatsappNumber");

  importadoraParams.set("populate[logo][fields][0]", "url");
  importadoraParams.set("populate[coverImage][fields][0]", "url");

  const vehiclesParams = new URLSearchParams();

  vehiclesParams.set("filters[importadora][slug][$eq]", slug);
  vehiclesParams.set("filters[active][$eq]", "true");
  vehiclesParams.set("filters[featured][$eq]", "true");

  vehiclesParams.set("fields[0]", "title");
  vehiclesParams.set("fields[1]", "brand");
  vehiclesParams.set("fields[2]", "model");
  vehiclesParams.set("fields[3]", "year");
  vehiclesParams.set("fields[4]", "price");
  vehiclesParams.set("fields[5]", "isNegotiable");
  vehiclesParams.set("fields[6]", "inventoryStatus");
  vehiclesParams.set("fields[7]", "sortOrder");

  vehiclesParams.set("populate[mainImage][fields][0]", "url");

  vehiclesParams.set("sort[0]", "sortOrder:asc");
  vehiclesParams.set("sort[1]", "year:desc");
  vehiclesParams.set("pagination[limit]", "6");

  const [importadoraResponse, vehiclesResponse] = await Promise.all([
    fetch(`${STRAPI_URL}/api/importadoras?${importadoraParams.toString()}`, {
      next: { revalidate: 60 },
    }),
    fetch(`${STRAPI_URL}/api/importadoras-vehicles?${vehiclesParams.toString()}`, {
      next: { revalidate: 60 },
    }),
  ]);

  if (!importadoraResponse.ok) {
    throw new Error("No se pudo obtener la importadora para inicio.");
  }

  if (!vehiclesResponse.ok) {
    throw new Error("No se pudieron obtener los vehículos destacados.");
  }

  const importadoraJson = await importadoraResponse.json();
  const vehiclesJson = await vehiclesResponse.json();

  const item = importadoraJson.data?.[0];

  if (!item) return null;

  const data = item.attributes ? item.attributes : item;

  return {
    id: item.id,
    name: data.name,
    slug: data.slug,
    whatsappNumber: data.whatsappNumber ?? null,
    logoUrl: getSingleMediaUrl(data.logo),
    coverImageUrl: getSingleMediaUrl(data.coverImage),
    shortDescription: data.shortDescription ?? null,
    featuredVehicles: (vehiclesJson.data ?? []).map(normalizeHomeVehicle),
  };
}
