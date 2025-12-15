export type Product = {
  code: string;
  name: string;
  price: number;
  description: string;
};

export type Store = {
  alias: string;
  name: string;
  whatsapp: string; // sin +
  products: Product[];
};

export const STORES: Store[] = [
  {
    alias: "tienda",
    name: "Tienda Demo",
    whatsapp: "50243973638",
    products: [
      { code: "p1", name: "Producto 1", price: 100, description: "Desc 1" },
      { code: "p2", name: "Producto 2", price: 150, description: "Desc 2" },
      { code: "p3", name: "Producto 3", price: 200, description: "Desc 3" },
    ],
  },
  {
    alias: "homeoutlet",         // <- segunda tienda
    name: "Home Outlet Live",
    whatsapp: "50211112222",
    products: [
      { code: "h1", name: "Freidora de aire", price: 499, description: "Modelo X" },
      { code: "h2", name: "Batidora", price: 299, description: "Potente para repostería" },
    ],
  },
];