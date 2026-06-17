import type { PredioVehicle, PredioVehicleDetail } from "./types";

export function cleanPredioPhone(input: string) {
  return (input || "").replace(/\D/g, "");
}

export function buildPredioWhatsappUrl({
  phone,
  message,
}: {
  phone: string;
  message: string;
}) {
  const cleanPhone = cleanPredioPhone(phone);

  if (!cleanPhone) return "";

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function buildVehicleWhatsappMessage({
  predioNombre,
  predioSlug,
  vehiculo,
  customerName,
  customerPhone,
}: {
  predioNombre: string;
  predioSlug: string;
  vehiculo: PredioVehicle;
  customerName?: string;
  customerPhone?: string;
}) {
  const lineas = [
    "Hola. Estoy interesado en este vehículo:",
    "",
    "— Detalles del vehículo —",
    `Predio: ${predioNombre || predioSlug}`,
    `Vehículo: ${vehiculo.titulo}`,
    `Marca: ${vehiculo.marca}`,
    `Modelo: ${vehiculo.modelo}`,
    `Año: ${vehiculo.anio}`,
    `Kilometraje: ${vehiculo.kilometraje}`,
    `Transmisión: ${vehiculo.transmision}`,
    `Combustible: ${vehiculo.combustible}`,
    `Motor: ${vehiculo.motor}`,
    `Precio: ${vehiculo.precio} ${vehiculo.moneda}`.trim(),
    "",
    "— Datos del interesado —",
    `Nombre: ${customerName || ""}`,
    `Teléfono: ${customerPhone || ""}`,
  ];

  return lineas
    .map((line) => line.trimEnd())
    .filter((line) => line !== "Precio:" && line !== "Precio: ")
    .join("\n");
}

export function buildVehicleDetailWhatsappMessage({
  detail,
  customerName,
  customerPhone,
}: {
  detail: PredioVehicleDetail;
  customerName?: string;
  customerPhone?: string;
}) {
  return buildVehicleWhatsappMessage({
    predioNombre: detail.predio.nombre,
    predioSlug: detail.predio.slug,
    vehiculo: detail.vehiculo,
    customerName,
    customerPhone,
  });
}
