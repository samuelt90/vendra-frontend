import type { PredioCatalog, PredioVehicleDetail } from "./types";
import {
  buildPredioCatalogQuery,
  buildPredioVehicleDetailQuery,
} from "./queries";
import { mapPredioCatalog, mapPredioVehicleDetail } from "./mappers";

type FetchResult<T> = {
  ok: boolean;
  data: T | null;
  error: string;
  status?: number;
  url?: string;
};

async function fetchStrapiJson(url: string) {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      ok: false,
      json: null,
      error: `Strapi error: ${res.status}`,
      status: res.status,
      url,
    };
  }

  const json = await res.json();

  return {
    ok: true,
    json,
    error: "",
    status: res.status,
    url,
  };
}

export async function getPredioCatalogBySlug(
  slug: string
): Promise<FetchResult<PredioCatalog>> {
  if (!slug) {
    return {
      ok: false,
      data: null,
      error: "Slug inválido.",
    };
  }

  const url = buildPredioCatalogQuery(slug);
  const result = await fetchStrapiJson(url);

  if (!result.ok) {
    return {
      ok: false,
      data: null,
      error: result.error,
      status: result.status,
      url: result.url,
    };
  }

  const item = Array.isArray(result.json?.data) ? result.json.data[0] : null;
  const predio = mapPredioCatalog(item);

  if (!predio) {
    return {
      ok: false,
      data: null,
      error: `No se encontró predio para slug: ${slug}`,
      status: result.status,
      url: result.url,
    };
  }

  return {
    ok: true,
    data: predio,
    error: "",
    status: result.status,
    url: result.url,
  };
}

export async function getPredioVehicleDetail(
  slug: string,
  documentId: string
): Promise<FetchResult<PredioVehicleDetail>> {
  if (!slug || !documentId) {
    return {
      ok: false,
      data: null,
      error: "Slug o documentId inválido.",
    };
  }

  const url = buildPredioVehicleDetailQuery(documentId);
  const result = await fetchStrapiJson(url);

  if (!result.ok) {
    return {
      ok: false,
      data: null,
      error: result.error,
      status: result.status,
      url: result.url,
    };
  }

  const item = Array.isArray(result.json?.data) ? result.json.data[0] : null;
  const detail = mapPredioVehicleDetail(item);

  if (!detail) {
    return {
      ok: false,
      data: null,
      error: "No se encontró el vehículo.",
      status: result.status,
      url: result.url,
    };
  }

  if (detail.predio.slug !== slug) {
    return {
      ok: false,
      data: null,
      error: "El vehículo no pertenece a este predio.",
      status: result.status,
      url: result.url,
    };
  }

  return {
    ok: true,
    data: detail,
    error: "",
    status: result.status,
    url: result.url,
  };
}
