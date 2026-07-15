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

export type ImportadoraProcess = {
  id: number;
  name: string;
  slug: string;
  logoUrl: string | null;
  businessName: string | null;
  nit: string | null;
  officeAddress: string | null;
  googleMapsUrl: string | null;
  whatsappNumber: string | null;
  officePhotoUrls: string[];
  deliveryPhotoUrls: string[];
  acceptsFinancing: boolean;
  acceptsVisacuotas: boolean;
  acceptsCredicuotas: boolean;
  acceptsOwnFinancing: boolean;
  acceptsBankFinancing: boolean;
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

  if (!Array.isArray(data)) return [];

  return data
    .map((item) => item.url || item.attributes?.url)
    .filter(Boolean)
    .map((url) => (url!.startsWith("http") ? url! : `${STRAPI_URL}${url}`));
}

export async function getImportadoraProcess(
  slug: string
): Promise<ImportadoraProcess | null> {
  const params = new URLSearchParams();

  params.set("filters[slug][$eq]", slug);
  params.set("filters[active][$eq]", "true");

  params.set("fields[0]", "name");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "businessName");
  params.set("fields[3]", "nit");
  params.set("fields[4]", "officeAddress");
  params.set("fields[5]", "googleMapsUrl");
  params.set("fields[6]", "whatsappNumber");
  params.set("fields[7]", "acceptsFinancing");
  params.set("fields[8]", "acceptsVisacuotas");
  params.set("fields[9]", "acceptsCredicuotas");
  params.set("fields[10]", "acceptsOwnFinancing");
  params.set("fields[11]", "acceptsBankFinancing");

  params.set("populate[logo][fields][0]", "url");
  params.set("populate[officePhotos][fields][0]", "url");
  params.set("populate[deliveryPhotos][fields][0]", "url");

  const url = `${STRAPI_URL}/api/importadoras?${params.toString()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de proceso.");
  }

  const json = await response.json();
  const item = json.data?.[0];

  if (!item) return null;

  const data = item.attributes ? item.attributes : item;

  return {
    id: item.id,
    name: data.name,
    slug: data.slug,
    logoUrl: getSingleMediaUrl(data.logo),
    businessName: data.businessName ?? null,
    nit: data.nit ?? null,
    officeAddress: data.officeAddress ?? null,
    googleMapsUrl: data.googleMapsUrl ?? null,
    whatsappNumber: data.whatsappNumber ?? null,
    officePhotoUrls: getMultipleMediaUrls(data.officePhotos),
    deliveryPhotoUrls: getMultipleMediaUrls(data.deliveryPhotos),
    acceptsFinancing: Boolean(data.acceptsFinancing),
    acceptsVisacuotas: Boolean(data.acceptsVisacuotas),
    acceptsCredicuotas: Boolean(data.acceptsCredicuotas),
    acceptsOwnFinancing: Boolean(data.acceptsOwnFinancing),
    acceptsBankFinancing: Boolean(data.acceptsBankFinancing),
  };
}
