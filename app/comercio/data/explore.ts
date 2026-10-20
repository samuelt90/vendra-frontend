export type ExploreCategoryId =
  | "audio"
  | "wearables"
  | "computacion"
  | "creadores";

export type ExploreAsset = {
  id: string;
  src: string;
  alt: string;
};

export type ExploreCategory = {
  id: ExploreCategoryId;
  label: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  assets: ExploreAsset[];
};

export const exploreCategories: ExploreCategory[] = [
  {
    id: "audio",
    label: "Audio",
    title: "Audio",
    description:
      "Audífonos y bocinas para escuchar, trabajar y llevar contigo.",
    actionLabel: "Explorar audio",
    actionHref: "/comercio/tienda?categoria=audio",
    assets: [
      {
        id: "audifonos",
        src: "/comercio/assets/products/audifonos.png",
        alt: "Audífonos inalámbricos",
      },
      {
        id: "bocina",
        src: "/comercio/assets/products/bocina.png",
        alt: "Bocina portátil",
      },
    ],
  },

  {
    id: "wearables",
    label: "Wearables",
    title: "Wearables",
    description:
      "Relojes inteligentes y dispositivos pensados para acompañarte durante el día.",
    actionLabel: "Explorar wearables",
    actionHref: "/comercio/tienda?categoria=wearables",
    assets: [
      {
        id: "smartwatch",
        src: "/comercio/assets/products/smartwatch.png",
        alt: "Smartwatch",
      },
    ],
  },

  {
    id: "computacion",
    label: "Computación",
    title: "Computación",
    description:
      "Teclados y accesorios para trabajar, estudiar o jugar.",
    actionLabel: "Explorar computación",
    actionHref: "/comercio/tienda?categoria=computacion",
    assets: [
      {
        id: "teclado",
        src: "/comercio/assets/products/teclado.png",
        alt: "Teclado mecánico",
      },
    ],
  },

  {
    id: "creadores",
    label: "Creadores",
    title: "Creadores",
    description:
      "Iluminación y accesorios para transmitir, grabar y crear contenido.",
    actionLabel: "Explorar creadores",
    actionHref: "/comercio/tienda?categoria=creadores",
    assets: [
      {
        id: "ring-light",
        src: "/comercio/assets/products/ring-light.png",
        alt: "Luz para transmisiones",
      },
    ],
  },
];

export const defaultExploreCategory: ExploreCategoryId = "audio";
