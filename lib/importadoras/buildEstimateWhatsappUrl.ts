import type {
  MockVehicleReference,
  VehicleReferenceCategory,
} from "./mockVehicleReferences";

type BuildEstimateWhatsappUrlParams = {
  importadoraName: string;
  whatsappNumber: string | null;
  budgetGTQ: number;
  category: VehicleReferenceCategory;
  minimumYear: number;
  preferredBrand?: string;
  vehicle: MockVehicleReference;
};

const CATEGORY_LABELS: Record<VehicleReferenceCategory, string> = {
  sedan: "Sedán",
  suv: "SUV",
  pickup: "Pickup",
};

function cleanWhatsappNumber(phone: string | null) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

function formatGTQ(amount: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildEstimateWhatsappUrl({
  importadoraName,
  whatsappNumber,
  budgetGTQ,
  category,
  minimumYear,
  preferredBrand,
  vehicle,
}: BuildEstimateWhatsappUrlParams) {
  const cleanPhone = cleanWhatsappNumber(whatsappNumber);

  if (!cleanPhone) {
    return null;
  }

  const preferredBrandLine = preferredBrand
    ? `Marca preferida: ${preferredBrand}`
    : "Marca preferida: Sin preferencia";

  const message = [
    `Hola, revisé el explorador de presupuesto de ${importadoraName}.`,
    "",
    "Estos son los datos que ingresé:",
    `Presupuesto: ${formatGTQ(budgetGTQ)}`,
    `Tipo de vehículo: ${CATEGORY_LABELS[category]}`,
    `Año mínimo: ${minimumYear}`,
    preferredBrandLine,
    "",
    "Me interesa esta referencia:",
    `${vehicle.brand} ${vehicle.model}`,
    `Años de referencia: ${vehicle.yearFrom}–${vehicle.yearTo}`,
    `Estimado puesto en Guatemala: ${formatGTQ(
      vehicle.estimatedMinGTQ
    )} – ${formatGTQ(vehicle.estimatedMaxGTQ)}`,
    "",
    "¿Me puede ayudar a revisar una opción similar?",
  ].join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}