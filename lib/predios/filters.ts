import type { PredioFilters, PredioVehicle } from "./types";

function normalize(value: string) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function toNumber(value: string) {
  const clean = String(value || "").replace(/[^\d.]/g, "");

  if (!clean) return null;

  const num = Number(clean);
  return Number.isFinite(num) ? num : null;
}

export function getDefaultPredioFilters(): PredioFilters {
  return {
    marca: "",
    modelo: "",
    anio: "",
    transmision: "",
    combustible: "",
    estado: "",
    precioMin: "",
    precioMax: "",
  };
}

export function filterPredioVehicles(
  vehicles: PredioVehicle[],
  filters: PredioFilters
) {
  const marca = normalize(filters.marca);
  const modelo = normalize(filters.modelo);
  const anio = normalize(filters.anio);
  const transmision = normalize(filters.transmision);
  const combustible = normalize(filters.combustible);
  const estado = normalize(filters.estado);

  const precioMin = toNumber(filters.precioMin);
  const precioMax = toNumber(filters.precioMax);

  return vehicles.filter((vehicle) => {
    const vehiclePrecio = toNumber(vehicle.precio);

    if (marca && !normalize(vehicle.marca).includes(marca)) return false;
    if (modelo && !normalize(vehicle.modelo).includes(modelo)) return false;
    if (anio && !normalize(vehicle.anio).includes(anio)) return false;

    if (transmision && normalize(vehicle.transmision) !== transmision) {
      return false;
    }

    if (combustible && normalize(vehicle.combustible) !== combustible) {
      return false;
    }

    if (estado && normalize(vehicle.estado) !== estado) {
      return false;
    }

    if (precioMin !== null) {
      if (vehiclePrecio === null || vehiclePrecio < precioMin) return false;
    }

    if (precioMax !== null) {
      if (vehiclePrecio === null || vehiclePrecio > precioMax) return false;
    }

    return true;
  });
}

export function getPredioFilterOptions(vehicles: PredioVehicle[]) {
  const unique = (values: string[]) =>
    Array.from(new Set(values.map((v) => v.trim()).filter(Boolean))).sort();

  return {
    marcas: unique(vehicles.map((vehicle) => vehicle.marca)),
    modelos: unique(vehicles.map((vehicle) => vehicle.modelo)),
    anios: unique(vehicles.map((vehicle) => vehicle.anio)),
    transmisiones: unique(vehicles.map((vehicle) => vehicle.transmision)),
    combustibles: unique(vehicles.map((vehicle) => vehicle.combustible)),
    estados: unique(vehicles.map((vehicle) => vehicle.estado)),
  };
}
