const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

function getStrapiBaseUrl() {
  return STRAPI_URL.replace(/\/$/, "");
}

export function buildPredioCatalogQuery(slug: string) {
  const baseUrl = getStrapiBaseUrl();
  const params = new URLSearchParams();

  params.set("filters[slug][$eq]", slug);

  params.append("fields[0]", "nombre");
  params.append("fields[1]", "slug");
  params.append("fields[2]", "whatsapp");
  params.append("fields[3]", "direccion");
  params.append("fields[4]", "descripcion");
  params.append("fields[5]", "instagram");
  params.append("fields[6]", "facebook");
  params.append("fields[7]", "tiktok");
  params.append("fields[8]", "solo_efectivo");
  params.append("fields[9]", "visacuotas");
  params.append("fields[10]", "credicuotas");
  params.append("fields[11]", "financiamiento_propio");
  params.append("fields[12]", "financiamiento_bancario");
  params.append("fields[13]", "zu_credito");

  params.append("populate[logo][fields][0]", "url");
  params.append("populate[logo][fields][1]", "alternativeText");
  params.append("populate[logo][fields][2]", "name");
  params.append("populate[logo][fields][3]", "width");
  params.append("populate[logo][fields][4]", "height");
  params.append("populate[logo][fields][5]", "formats");

  params.append("populate[cover][fields][0]", "url");
  params.append("populate[cover][fields][1]", "alternativeText");
  params.append("populate[cover][fields][2]", "name");
  params.append("populate[cover][fields][3]", "width");
  params.append("populate[cover][fields][4]", "height");
  params.append("populate[cover][fields][5]", "formats");

  params.append("populate[vehiculos][fields][0]", "titulo");
  params.append("populate[vehiculos][fields][1]", "precio");
  params.append("populate[vehiculos][fields][2]", "precio_negociable");
  params.append("populate[vehiculos][fields][3]", "moneda");
  params.append("populate[vehiculos][fields][4]", "anio");
  params.append("populate[vehiculos][fields][5]", "kilometraje");
  params.append("populate[vehiculos][fields][6]", "transmision");
  params.append("populate[vehiculos][fields][7]", "marca");
  params.append("populate[vehiculos][fields][8]", "modelo");
  params.append("populate[vehiculos][fields][9]", "combustible");
  params.append("populate[vehiculos][fields][10]", "motor");
  params.append("populate[vehiculos][fields][11]", "descripcion");
  params.append("populate[vehiculos][fields][12]", "estado");

  params.append("populate[vehiculos][populate][cover][fields][0]", "url");
  params.append(
    "populate[vehiculos][populate][cover][fields][1]",
    "alternativeText"
  );
  params.append("populate[vehiculos][populate][cover][fields][2]", "name");
  params.append("populate[vehiculos][populate][cover][fields][3]", "width");
  params.append("populate[vehiculos][populate][cover][fields][4]", "height");
  params.append("populate[vehiculos][populate][cover][fields][5]", "formats");

  params.append("populate[vehiculos][populate][galeria][fields][0]", "url");
  params.append(
    "populate[vehiculos][populate][galeria][fields][1]",
    "alternativeText"
  );
  params.append("populate[vehiculos][populate][galeria][fields][2]", "name");
  params.append("populate[vehiculos][populate][galeria][fields][3]", "width");
  params.append("populate[vehiculos][populate][galeria][fields][4]", "height");
  params.append("populate[vehiculos][populate][galeria][fields][5]", "formats");

  return `${baseUrl}/api/predios?${params.toString()}`;
}

export function buildPredioVehicleDetailQuery(documentId: string) {
  const baseUrl = getStrapiBaseUrl();
  const params = new URLSearchParams();

  params.set("filters[documentId][$eq]", documentId);

  params.append("fields[0]", "titulo");
  params.append("fields[1]", "precio");
  params.append("fields[2]", "precio_negociable");
  params.append("fields[3]", "moneda");
  params.append("fields[4]", "anio");
  params.append("fields[5]", "kilometraje");
  params.append("fields[6]", "transmision");
  params.append("fields[7]", "marca");
  params.append("fields[8]", "modelo");
  params.append("fields[9]", "combustible");
  params.append("fields[10]", "motor");
  params.append("fields[11]", "descripcion");
  params.append("fields[12]", "estado");

  params.append("populate[cover][fields][0]", "url");
  params.append("populate[cover][fields][1]", "alternativeText");
  params.append("populate[cover][fields][2]", "name");
  params.append("populate[cover][fields][3]", "width");
  params.append("populate[cover][fields][4]", "height");
  params.append("populate[cover][fields][5]", "formats");

  params.append("populate[galeria][fields][0]", "url");
  params.append("populate[galeria][fields][1]", "alternativeText");
  params.append("populate[galeria][fields][2]", "name");
  params.append("populate[galeria][fields][3]", "width");
  params.append("populate[galeria][fields][4]", "height");
  params.append("populate[galeria][fields][5]", "formats");

  params.append("populate[predio][fields][0]", "nombre");
  params.append("populate[predio][fields][1]", "slug");
  params.append("populate[predio][fields][2]", "whatsapp");
  params.append("populate[predio][fields][3]", "direccion");
  params.append("populate[predio][fields][4]", "solo_efectivo");
  params.append("populate[predio][fields][5]", "visacuotas");
  params.append("populate[predio][fields][6]", "credicuotas");
  params.append("populate[predio][fields][7]", "financiamiento_propio");
  params.append("populate[predio][fields][8]", "financiamiento_bancario");
  params.append("populate[predio][fields][9]", "zu_credito");

  return `${baseUrl}/api/vehiculos?${params.toString()}`;
}
