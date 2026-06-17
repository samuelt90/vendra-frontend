import type { PredioVehicleImage } from "./types";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function normalizeStrapiMediaEntity(media: any): any | null {
  if (!media) return null;

  // Strapi v4: { data: { attributes: ... } }
  if (media?.data?.attributes) {
    return {
      id: String(media.data.id ?? ""),
      ...media.data.attributes,
    };
  }

  // Strapi v4 array item: { id, attributes: ... }
  if (media?.attributes) {
    return {
      id: String(media.id ?? ""),
      ...media.attributes,
    };
  }

  // Strapi v5/plano
  return media;
}

function toAbsoluteMediaUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base = STRAPI_URL.replace(/\/$/, "");
  const path = url.startsWith("/") ? url : `/${url}`;

  return `${base}${path}`;
}

function pickFormatUrl(media: any, preferredFormats: string[]): string {
  const formats = media?.formats ?? {};

  for (const format of preferredFormats) {
    const url = formats?.[format]?.url;
    if (url) return toAbsoluteMediaUrl(url);
  }

  return toAbsoluteMediaUrl(media?.url ?? "");
}

export function mapPredioImage(
  rawMedia: any,
  fallbackAlt = "Imagen de vehículo"
): PredioVehicleImage | null {
  const media = normalizeStrapiMediaEntity(rawMedia);

  if (!media?.url) return null;

  const originalUrl = toAbsoluteMediaUrl(media.url);

  return {
    id: String(media.id ?? media.documentId ?? originalUrl),
    alt: String(media.alternativeText ?? media.name ?? fallbackAlt),
    originalUrl,
    cardUrl: pickFormatUrl(media, ["medium", "small", "large", "thumbnail"]),
    detailUrl: pickFormatUrl(media, ["large", "medium", "small"]),
    fullUrl: pickFormatUrl(media, ["large", "medium", "small"]),
    width: typeof media.width === "number" ? media.width : null,
    height: typeof media.height === "number" ? media.height : null,
  };
}

export function mapPredioImages(
  rawMediaCollection: any,
  fallbackAlt = "Imagen de vehículo"
): PredioVehicleImage[] {
  const rawItems = Array.isArray(rawMediaCollection)
    ? rawMediaCollection
    : Array.isArray(rawMediaCollection?.data)
      ? rawMediaCollection.data
      : [];

 return rawItems
  .map((item: any) => mapPredioImage(item, fallbackAlt))
  .filter((item: PredioVehicleImage | null): item is PredioVehicleImage =>
    Boolean(item)
  );
}
