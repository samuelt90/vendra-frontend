export type HeroProduct = {
  id: string;
  src: string;
  alt: string;
};

export const heroProducts: HeroProduct[] = [
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
  {
    id: "smartwatch",
    src: "/comercio/assets/products/smartwatch.png",
    alt: "Smartwatch",
  },
  {
    id: "teclado",
    src: "/comercio/assets/products/teclado.png",
    alt: "Teclado mecánico",
  },
  {
    id: "ring-light",
    src: "/comercio/assets/products/ring-light.png",
    alt: "Luz para transmisiones",
  },
];

export const heroContent = {
  eyebrow: "Nuevos ingresos",
  title: "Tecnología que acaba de llegar.",
  actionLabel: "Ver novedades",
  actionHref: "#productos",
};
