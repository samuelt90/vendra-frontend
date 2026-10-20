export type InformationBlockId =
  | "negocio"
  | "compra"
  | "mayorista";

export type InformationIcon =
  | "store"
  | "selection"
  | "business";

export type InformationBlock = {
  id: InformationBlockId;
  eyebrow: string;
  titleLines: string[];
  description: string;
  actionLabel: string;
  actionHref: string;
  icon: InformationIcon;
};

export const informationBlocks: InformationBlock[] = [
  {
    id: "negocio",
    eyebrow: "El negocio",
    titleLines: [
      "Tecnología para comprar",
      "con confianza.",
    ],
    description:
      "Productos, accesorios y nuevas referencias disponibles para comprar directamente en Guatemala.",
    actionLabel: "Conocer el negocio",
    actionHref: "/comercio/nosotros",
    icon: "store",
  },

  {
    id: "compra",
    eyebrow: "Comprar",
    titleLines: [
      "Encuentra. Selecciona.",
      "Compra.",
    ],
    description:
      "Busca lo que necesitas, revisa disponibilidad y continúa tu compra desde el mismo producto.",
    actionLabel: "Cómo comprar",
    actionHref: "/comercio/como-comprar",
    icon: "selection",
  },

 {
  id: "mayorista",
  eyebrow: "Para tu negocio",
  titleLines: [
    "¿Compras para",
    "tu negocio?",
  ],
  description:
    "Compra por cantidad y solicita una mejor condición para los productos que necesitas.",
  actionLabel: "Comprar por mayor",
  actionHref: "/comercio/mayoristas",
  icon: "business",
},
];
