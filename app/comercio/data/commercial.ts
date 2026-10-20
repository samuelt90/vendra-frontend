export type CommercialMomentId =
  | "nuevos"
  | "especiales"
  | "ultimas"
  | "temporada"
  | "disponibles";

export type CommercialMoment = {
  id: CommercialMomentId;
  lines: string[];
  href: string;
  ariaLabel: string;
  actionLabel: string;
};

export const commercialMoments: CommercialMoment[] = [
  {
    id: "nuevos",
    lines: ["Nuevos", "esta semana"],
    href: "/comercio/tienda?filtro=nuevo",
    ariaLabel: "Ver nuevos productos de esta semana",
    actionLabel: "Ver novedades",
  },
  {
    id: "especiales",
    lines: ["Precios", "especiales"],
    href: "/comercio/tienda?filtro=precio-especial",
    ariaLabel: "Ver productos con precios especiales",
    actionLabel: "Ver precios especiales",
  },
  {
    id: "ultimas",
    lines: ["Últimas", "unidades"],
    href: "/comercio/tienda?filtro=ultimas-unidades",
    ariaLabel: "Ver productos con últimas unidades",
    actionLabel: "Ver últimas unidades",
  },
  {
    id: "temporada",
    lines: ["Especial de", "temporada"],
    href: "/comercio/tienda?filtro=temporada",
    ariaLabel: "Ver especial de temporada",
    actionLabel: "Ver especial",
  },
  {
    id: "disponibles",
    lines: ["Recién", "disponibles"],
    href: "/comercio/tienda?filtro=disponibles",
    ariaLabel: "Ver productos recién disponibles",
    actionLabel: "Ver disponibles",
  },
];
