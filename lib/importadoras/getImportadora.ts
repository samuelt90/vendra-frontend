type StrapiMedia = {
  url?: string;
  data?: {
    attributes?: {
      url?: string;
    };
    url?: string;
  } | null;
};

export type Importadora = {
  id: number;
  name: string;
  slug: string;
  active: boolean;
  logoUrl: string | null;
  whatsappNumber: string | null;
  acceptsFinancing: boolean;
  acceptsVisacuotas: boolean;
  acceptsCredicuotas: boolean;
  acceptsOwnFinancing: boolean;
  acceptsBankFinancing: boolean;
};

const STRAPI_URL =
  process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function getMediaUrl(media: StrapiMedia | null | undefined): string | null {
  const url = media?.url || media?.data?.url || media?.data?.attributes?.url;

  if (!url) return null;

  if (url.startsWith("http")) return url;

  return `${STRAPI_URL}${url}`;
}

function normalizeImportadora(item: any): Importadora {
  const data = item.attributes ? item.attributes : item;

  return {
    id: item.id,
    name: data.name,
    slug: data.slug,
    active: Boolean(data.active),
    logoUrl: getMediaUrl(data.logo),
    whatsappNumber: data.whatsappNumber ?? null,
    acceptsFinancing: Boolean(data.acceptsFinancing),
    acceptsVisacuotas: Boolean(data.acceptsVisacuotas),
    acceptsCredicuotas: Boolean(data.acceptsCredicuotas),
    acceptsOwnFinancing: Boolean(data.acceptsOwnFinancing),
    acceptsBankFinancing: Boolean(data.acceptsBankFinancing),
  };
}

export async function getImportadora(slug: string): Promise<Importadora | null> {
  const params = new URLSearchParams();

  params.set("filters[slug][$eq]", slug);
  params.set("filters[active][$eq]", "true");

  params.set("fields[0]", "name");
  params.set("fields[1]", "slug");
  params.set("fields[2]", "active");
  params.set("fields[3]", "whatsappNumber");
  params.set("fields[4]", "acceptsFinancing");
  params.set("fields[5]", "acceptsVisacuotas");
  params.set("fields[6]", "acceptsCredicuotas");
  params.set("fields[7]", "acceptsOwnFinancing");
  params.set("fields[8]", "acceptsBankFinancing");

  params.set("populate[logo][fields][0]", "url");

  const url = `${STRAPI_URL}/api/importadoras?${params.toString()}`;

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener la importadora desde Strapi.");
  }

  const json = await response.json();
  const item = json.data?.[0];

  if (!item) return null;

  return normalizeImportadora(item);
}
