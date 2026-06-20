import {
  getPredioVehicleStatusLabel,
  type PredioVehicle,
  type PredioVehicleDetail,
} from "./types";

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

function formatVehiclePrice(vehicle: PredioVehicle) {
  if (!vehicle.precio) return "No definido";

  const numberValue = Number(vehicle.precio);

  if (!Number.isFinite(numberValue)) {
    return `${vehicle.precio} ${vehicle.moneda}`.trim();
  }

  return `${vehicle.moneda} ${numberValue.toLocaleString("es-GT", {
    maximumFractionDigits: 0,
  })}`;
}

function getWhatsappClosingLine(estado: PredioVehicle["estado"]) {
  if (estado === "en_ruta") {
    return "Quedo atento para consultar disponibilidad y fecha estimada de llegada.";
  }

  if (estado === "vendido") {
    return "Estoy consultando por este vehículo marcado como vendido.";
  }

  return "Quedo atento para confirmar disponibilidad y más información.";
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
  const estadoLabel = getPredioVehicleStatusLabel(vehiculo.estado);
  const precioLabel = formatVehiclePrice(vehiculo);
  const closingLine = getWhatsappClosingLine(vehiculo.estado);

  const lineas = [
    "Hola. Estoy interesado en este vehículo.",
    "",
    "*Detalles del vehículo*",
    `Predio: ${predioNombre || predioSlug || "No definido"}`,
    `Vehículo: ${vehiculo.titulo || "No definido"}`,
    `Estado: ${estadoLabel}`,
    `Marca: ${vehiculo.marca || "No definido"}`,
    `Año: ${vehiculo.anio || "No definido"}`,
    `Precio: ${precioLabel}`,
    "",
    "*Datos del interesado*",
    `Nombre: ${customerName || "No indicado"}`,
    `Teléfono: ${customerPhone || "No indicado"}`,
    "",
    closingLine,
  ];

  return lineas.map((line) => line.trimEnd()).join("\n");
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
