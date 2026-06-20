export type PredioEstadoVehiculo = "disponible" | "en_ruta" | "vendido";

export type PredioMoneda = "GTQ" | "USD" | string;

export type PredioTransmision = "manual" | "automatica" | "triptonic" | string;

export type PredioCombustible =
  | "gasolina"
  | "diesel"
  | "electrico"
  | string;

export type PredioImage = {
  id: string;
  url: string;
  alternativeText: string;
  width: number | null;
  height: number | null;
  formats?: any;
};

export type PredioVehicleImage = {
  id: string;
  alt: string;
  originalUrl: string;
  cardUrl: string;
  detailUrl: string;
  fullUrl: string;
  width: number | null;
  height: number | null;
};

export type PredioVehicle = {
  id: string;
  documentId: string;
  titulo: string;
  precio: string;
  moneda: PredioMoneda;
  anio: string;
  kilometraje: string;
  transmision: PredioTransmision;
  marca: string;
  modelo: string;
  combustible: PredioCombustible;
  motor: string;
  descripcion: string;
  estado: PredioEstadoVehiculo;
  cover: PredioVehicleImage | null;
  galeria: PredioVehicleImage[];
};

export type PredioCatalog = {
  id: string;
  documentId: string;
  nombre: string;
  slug: string;
  whatsapp: string;
  direccion: string;
  descripcion: string;
  logo: PredioVehicleImage | null;
  cover: PredioVehicleImage | null;
  vehiculos: PredioVehicle[];
};

export type PredioVehicleDetail = {
  predio: {
    id: string;
    documentId: string;
    nombre: string;
    slug: string;
    whatsapp: string;
    direccion: string;
  };
  vehiculo: PredioVehicle;
};

export type PredioFilters = {
  marca: string;
  modelo: string;
  anio: string;
  transmision: string;
  combustible: string;
  estado: string;
  precioMin: string;
  precioMax: string;
};

export function getPredioVehicleStatusLabel(
  estado: PredioEstadoVehiculo
): string {
  if (estado === "en_ruta") return "En ruta";
  if (estado === "vendido") return "Vendido";

  return "Disponible";
}

export function getPredioVehicleStatusClasses(
  estado: PredioEstadoVehiculo
): string {
  if (estado === "en_ruta") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (estado === "vendido") {
    return "border-slate-300 bg-slate-100 text-slate-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}
