import type { PredioCatalog, PredioVehicleDetail } from "./types";

export type PredioPaymentSource =
  | PredioCatalog
  | PredioVehicleDetail["predio"];

export type PredioPaymentOptionKey =
  | "efectivo"
  | "visacuotas"
  | "credicuotas"
  | "financiamiento_propio"
  | "financiamiento_bancario"
  | "zu_credito";

export type PredioPaymentOption = {
  key: PredioPaymentOptionKey;
  label: string;
  description: string;
  requirements: string[];
};

export function hasPredioPaymentOptions(predio: PredioPaymentSource) {
  if (predio.solo_efectivo) return false;

  return Boolean(
    predio.visacuotas ||
      predio.credicuotas ||
      predio.financiamiento_propio ||
      predio.financiamiento_bancario ||
      predio.zu_credito
  );
}

export function hasPredioFormalFinancing(predio: PredioPaymentSource) {
  if (predio.solo_efectivo) return false;

  return Boolean(
    predio.financiamiento_propio ||
      predio.financiamiento_bancario ||
      predio.zu_credito
  );
}

export function getPredioPaymentOptions(
  predio: PredioPaymentSource
): PredioPaymentOption[] {
  const options: PredioPaymentOption[] = [
    {
      key: "efectivo",
      label: "Efectivo / contado",
      description: "Compra directa del vehículo.",
      requirements: [
        "DPI",
        "Datos para facturación",
        "Confirmar disponibilidad del vehículo",
      ],
    },
  ];

  if (predio.solo_efectivo) {
    return options;
  }

  if (predio.visacuotas) {
    options.push({
      key: "visacuotas",
      label: "Visacuotas",
      description: "Consulta cuotas con tarjeta de crédito.",
      requirements: [
        "DPI",
        "Tarjeta de crédito participante",
        "Límite disponible",
        "Validación sujeta al banco o emisor",
      ],
    });
  }

  if (predio.credicuotas) {
    options.push({
      key: "credicuotas",
      label: "Credicuotas",
      description: "Consulta pago en cuotas con tarjeta.",
      requirements: [
        "DPI",
        "Tarjeta activa",
        "Límite disponible",
        "Aprobación según condiciones del emisor",
      ],
    });
  }

  if (predio.financiamiento_propio) {
    options.push({
      key: "financiamiento_propio",
      label: "Financiamiento propio",
      description: "Consulta enganche y pagos directamente con el predio.",
      requirements: [
        "DPI",
        "Enganche inicial",
        "Comprobante de ingresos",
        "Referencias personales",
        "Evaluación del predio",
      ],
    });
  }

  if (predio.financiamiento_bancario) {
    options.push({
      key: "financiamiento_bancario",
      label: "Financiamiento bancario",
      description: "Consulta financiamiento mediante banco.",
      requirements: [
        "DPI",
        "Constancia de ingresos",
        "Estados de cuenta",
        "Recibo de servicios",
        "Evaluación bancaria",
      ],
    });
  }

  if (predio.zu_credito) {
    options.push({
      key: "zu_credito",
      label: "Zú-Crédito",
      description: "Consulta si el vehículo aplica para esta opción.",
      requirements: [
        "DPI",
        "Validación de perfil",
        "Evaluación de crédito",
        "Condiciones sujetas a aprobación",
      ],
    });
  }

  return options;
}