export type StoreCategoryId =
  | "audio"
  | "wearables"
  | "computacion"
  | "creadores";

export type StoreCategory = {
  id: StoreCategoryId;
  name: string;
  subtitle: string;
  image: string;
};

const CATEGORY_ASSETS = "/comercio/assets/categories";

export const storeCategories: StoreCategory[] = [
  {
    id: "audio",
    name: "Audio",
    subtitle: "Audífonos · Bocinas · Sonido",
    image: `${CATEGORY_ASSETS}/categoria-audio.png`,
  },
  {
    id: "wearables",
    name: "Wearables",
    subtitle: "Smartwatches · Bandas · Accesorios",
    image: `${CATEGORY_ASSETS}/categoria-wearables.png`,
  },
  {
    id: "computacion",
    name: "Computación",
    subtitle: "Teclados · Mouses · Accesorios",
    image: `${CATEGORY_ASSETS}/categoria-computacion.png`,
  },
  {
    id: "creadores",
    name: "Creadores",
    subtitle: "Iluminación · Audio · Soportes",
    image: `${CATEGORY_ASSETS}/categoria-creadores.png`,
  },
];

