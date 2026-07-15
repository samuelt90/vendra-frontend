export type BuildImportadoraWhatsappUrlInput = {
  importadoraName: string;
  whatsappNumber: string | null;
  brand: string;
  model: string;
  year: string;
  budget: string;
  financingOptions?: string[];
};

function cleanWhatsappNumber(phone: string | null): string {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
}

function valueOrFallback(value: string): string {
  const cleanValue = value.trim();

  if (!cleanValue) return "No indicado";

  return cleanValue;
}

export function buildImportadoraWhatsappUrl({
  importadoraName,
  whatsappNumber,
  brand,
  model,
  year,
  budget,
  financingOptions = [],
}: BuildImportadoraWhatsappUrlInput): string {
  const cleanPhone = cleanWhatsappNumber(whatsappNumber);

  if (!cleanPhone) return "#";

  const financingText =
    financingOptions.length > 0
      ? `\nOpciones de financiamiento disponibles: ${financingOptions.join(", ")}`
      : "";

  const message = `Hola, vengo del cotizador de ${importadoraName}.

Quiero cotizar un vehículo con estos datos:

Marca: ${valueOrFallback(brand)}
Modelo: ${valueOrFallback(model)}
Año: ${valueOrFallback(year)}
Presupuesto: ${valueOrFallback(budget)}${financingText}

¿Me puede ayudar con una cotización aproximada?`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
