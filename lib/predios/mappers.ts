import type {
  PredioCatalog,
  PredioEstadoVehiculo,
  PredioVehicle,
  PredioVehicleDetail,
} from "./types";
import { mapPredioImage, mapPredioImages } from "./media";

function normalizeEntity(item: any): any | null {
  if (!item) return null;
  return item?.attributes ? { id: item.id, ...item.attributes } : item;
}

function normalizeCollection(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

function safeStr(value: any, fallback = ""): string {
  if (value === null || value === undefined) return fallback;
  return String(value).trim();
}

function blocksToPlainText(blocks: any): string {
  try {
    if (!Array.isArray(blocks)) return "";

    return blocks
      .map((block: any) => {
        const children = Array.isArray(block?.children) ? block.children : [];
        return children.map((child: any) => child?.text ?? "").join("");
      })
      .join("\n")
      .trim();
  } catch {
    return "";
  }
}

function normalizeEstado(value: any): PredioEstadoVehiculo {
  const estado = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");

  if (estado === "en_ruta") return "en_ruta";
  if (estado === "vendido") return "vendido";

  return "disponible";
}

export function mapPredioVehicle(rawVehicle: any): PredioVehicle | null {
  const vehicle = normalizeEntity(rawVehicle);
  if (!vehicle) return null;

  const titulo = safeStr(vehicle.titulo, "Vehículo");

  const cover = mapPredioImage(vehicle.cover, titulo);
  const galeria = mapPredioImages(vehicle.galeria, titulo);

  const images = cover
    ? [cover, ...galeria.filter((img) => img.originalUrl !== cover.originalUrl)]
    : galeria;

  return {
    id: safeStr(vehicle.id),
    documentId: safeStr(vehicle.documentId || vehicle.id),
    titulo,
    precio: safeStr(vehicle.precio),
    moneda: safeStr(vehicle.moneda, "GTQ"),
    anio: safeStr(vehicle.anio),
    kilometraje: safeStr(vehicle.kilometraje),
    transmision: safeStr(vehicle.transmision),
    marca: safeStr(vehicle.marca),
    modelo: safeStr(vehicle.modelo),
    combustible: safeStr(vehicle.combustible),
    motor: safeStr(vehicle.motor),
    descripcion: blocksToPlainText(vehicle.descripcion),
    estado: normalizeEstado(vehicle.estado),
    cover,
    galeria: images,
  };
}

export function mapPredioCatalog(rawPredio: any): PredioCatalog | null {
  const predio = normalizeEntity(rawPredio);
  if (!predio) return null;

  const vehiculos = normalizeCollection(predio.vehiculos)
    .map((item: any) => mapPredioVehicle(item))
    .filter((item: PredioVehicle | null): item is PredioVehicle =>
      Boolean(item)
    );

  return {
    id: safeStr(predio.id),
    documentId: safeStr(predio.documentId || predio.id),
    nombre: safeStr(predio.nombre, "Predio"),
    slug: safeStr(predio.slug),
    whatsapp: safeStr(predio.whatsapp).replace(/\D/g, ""),
    instagram: safeStr(predio.instagram),
    facebook: safeStr(predio.facebook),
    tiktok: safeStr(predio.tiktok),
    direccion: safeStr(predio.direccion),
    descripcion: blocksToPlainText(predio.descripcion),
    logo: mapPredioImage(predio.logo, safeStr(predio.nombre, "Logo del predio")),
    cover: mapPredioImage(
      predio.cover,
      safeStr(predio.nombre, "Imagen del predio")
    ),
    vehiculos,
  };
}

export function mapPredioVehicleDetail(
  rawVehicle: any
): PredioVehicleDetail | null {
  const vehicleRaw = normalizeEntity(rawVehicle);
  if (!vehicleRaw) return null;

  const vehicle = mapPredioVehicle(vehicleRaw);
  if (!vehicle) return null;

  const predioRaw = normalizeEntity(vehicleRaw.predio);
  if (!predioRaw) return null;

  return {
    predio: {
      id: safeStr(predioRaw.id),
      documentId: safeStr(predioRaw.documentId || predioRaw.id),
      nombre: safeStr(predioRaw.nombre, "Predio"),
      slug: safeStr(predioRaw.slug),
      whatsapp: safeStr(predioRaw.whatsapp).replace(/\D/g, ""),
      direccion: safeStr(predioRaw.direccion),
    },
    vehiculo: vehicle,
  };
}
