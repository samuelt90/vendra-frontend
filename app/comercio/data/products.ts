export type CommerceProductBadge =
  | "Nuevo"
  | "Últimas unidades"
  | "Precio especial";

export type ProductSpecification = {
  label: string;
  value: string;
};

export type CommercePurchaseNoteIcon =
  | "package"
  | "compatibility"
  | "warranty"
  | "delivery";

export type CommercePurchaseNote = {
  icon: CommercePurchaseNoteIcon;
  title: string;
  description: string;
};

export type CommerceProduct = {
  id: string;
  name: string;
  category: string;

  price: number;
  previousPrice?: number;

  image: string;
  images?: string[];

  badge?: CommerceProductBadge;
  status?: string;

  href: string;

  canAddDirectly: boolean;

  description: string;

  /*
   * Características principales.
   *
   * Estas alimentan la parte editorial del producto:
   * "Lo importante / Antes de comprar", según la
   * composición donde se utilicen.
   *
   * No deben repetir las especificaciones técnicas.
   */
  features: string[];

  /*
   * Datos técnicos concretos.
   *
   * En móvil:
   * Más detalles.
   *
   * En desktop:
   * Especificaciones.
   */
  specifications: ProductSpecification[];

  /*
   * Información práctica de compra.
   *
   * No son características técnicas.
   * Responden dudas antes de confirmar:
   * contenido, compatibilidad, garantía y entrega.
   */
  purchaseNotes: CommercePurchaseNote[];

  wholesaleEnabled: boolean;
};

export const commerceProducts: CommerceProduct[] = [
  {
    id: "pulse-x1",

    name: "Audífonos Pulse X1",

    category: "Audio",

    price: 349,

    image:
      "/comercio/assets/products/audifonos.png",

    badge: "Nuevo",

    status: "Disponible",

    href:
      "/comercio/product/pulse-x1",

    canAddDirectly: true,

    description:
      "Audífonos inalámbricos para música, llamadas y uso diario, con diseño cómodo y conexión rápida.",

    features: [
      "Controles desde el audífono",
      "Diseño plegable",
      "Pensados para uso diario",
      "Llamadas y reproducción de audio",
    ],

    specifications: [
      {
        label: "Conectividad",
        value: "Bluetooth",
      },
      {
        label: "Carga",
        value: "USB-C",
      },
      {
        label: "Micrófono",
        value: "Integrado",
      },
      {
        label: "Uso",
        value: "Música y llamadas",
      },
    ],

    purchaseNotes: [
      {
        icon: "package",
        title: "Qué recibes",
        description:
          "Audífonos, cable de carga y accesorios incluidos con el producto.",
      },
      {
        icon: "compatibility",
        title: "Compatibilidad",
        description:
          "Úsalos con teléfonos, tablets y otros equipos compatibles con Bluetooth.",
      },
      {
        icon: "warranty",
        title: "Garantía y cambios",
        description:
          "Consulta las condiciones aplicables de garantía y cambios antes de confirmar tu compra.",
      },
      {
        icon: "delivery",
        title: "Entrega",
        description:
          "La disponibilidad y el costo de entrega se confirman al completar la compra.",
      },
    ],

    wholesaleEnabled: true,
  },

  {
    id: "sound-mini",

    name: "Bocina Sound Mini",

    category: "Audio",

    price: 279,

    previousPrice: 329,

    image:
      "/comercio/assets/products/bocina.png",

    badge: "Precio especial",

    status: "Disponible",

    href:
      "/comercio/product/sound-mini",

    canAddDirectly: true,

    description:
      "Bocina compacta para escuchar música en distintos espacios, con conexión inalámbrica y formato fácil de transportar.",

    features: [
      "Formato compacto",
      "Fácil de transportar",
      "Pensada para distintos espacios",
      "Reproducción inalámbrica",
    ],

    specifications: [
      {
        label: "Conectividad",
        value: "Bluetooth",
      },
      {
        label: "Carga",
        value: "USB-C",
      },
      {
        label: "Formato",
        value: "Portátil",
      },
      {
        label: "Uso",
        value: "Audio inalámbrico",
      },
    ],

    purchaseNotes: [
      {
        icon: "package",
        title: "Qué recibes",
        description:
          "Bocina y accesorios esenciales incluidos con la presentación del producto.",
      },
      {
        icon: "compatibility",
        title: "Conexión",
        description:
          "Puedes utilizarla con teléfonos, tablets y otros equipos compatibles con Bluetooth.",
      },
      {
        icon: "warranty",
        title: "Garantía y cambios",
        description:
          "Las condiciones aplicables de garantía y cambios se confirman con tu compra.",
      },
      {
        icon: "delivery",
        title: "Entrega",
        description:
          "El costo y la disponibilidad de entrega se confirman según tu ubicación.",
      },
    ],

    wholesaleEnabled: true,
  },

  {
    id: "watch-s2",

    name: "Smartwatch S2",

    category: "Wearables",

    price: 499,

    image:
      "/comercio/assets/products/smartwatch.png",

    badge: "Últimas unidades",

    status: "Últimas unidades",

    href:
      "/comercio/product/watch-s2",

    canAddDirectly: true,

    description:
      "Smartwatch para seguimiento diario, notificaciones y funciones esenciales desde la muñeca.",

    features: [
      "Seguimiento de actividad",
      "Notificaciones en la muñeca",
      "Correas intercambiables",
      "Uso cotidiano",
    ],

    specifications: [
      {
        label: "Pantalla",
        value: "Táctil",
      },
      {
        label: "Conectividad",
        value: "Bluetooth",
      },
      {
        label: "Carga",
        value: "Magnética",
      },
      {
        label: "Compatibilidad",
        value: "Android / iOS",
      },
    ],

    purchaseNotes: [
      {
        icon: "package",
        title: "Qué recibes",
        description:
          "Smartwatch, sistema de carga y accesorios incluidos con el producto.",
      },
      {
        icon: "compatibility",
        title: "Compatibilidad",
        description:
          "Diseñado para utilizarse con teléfonos Android y iOS compatibles.",
      },
      {
        icon: "warranty",
        title: "Garantía y cambios",
        description:
          "Consulta las condiciones aplicables de garantía y cambios antes de confirmar.",
      },
      {
        icon: "delivery",
        title: "Entrega",
        description:
          "La disponibilidad y el costo de entrega se confirman al completar la compra.",
      },
    ],

    wholesaleEnabled: true,
  },

  {
    id: "keyboard-k80",

    name: "Teclado K80",

    category: "Computación",

    price: 599,

    image:
      "/comercio/assets/products/teclado.png",

    status: "Disponible",

    href:
      "/comercio/product/keyboard-k80",

    canAddDirectly: true,

    description:
      "Teclado para escritorio pensado para trabajo, estudio y sesiones prolongadas frente a la computadora.",

    features: [
      "Formato completo para escritorio",
      "Pensado para uso prolongado",
      "Acceso cómodo a funciones habituales",
      "Diseño orientado a trabajo y estudio",
    ],

    specifications: [
      {
        label: "Formato",
        value: "Completo",
      },
      {
        label: "Conexión",
        value: "USB",
      },
      {
        label: "Distribución",
        value: "Español",
      },
      {
        label: "Uso",
        value: "Escritorio",
      },
    ],

    purchaseNotes: [
      {
        icon: "package",
        title: "Qué recibes",
        description:
          "Teclado y accesorios incluidos según la presentación del producto.",
      },
      {
        icon: "compatibility",
        title: "Equipo compatible",
        description:
          "Comprueba que tu computadora disponga de la conexión necesaria antes de comprar.",
      },
      {
        icon: "warranty",
        title: "Garantía y cambios",
        description:
          "Consulta las condiciones disponibles de garantía y cambios antes de confirmar.",
      },
      {
        icon: "delivery",
        title: "Entrega",
        description:
          "El costo y la disponibilidad de entrega se confirman según tu ubicación.",
      },
    ],

    wholesaleEnabled: true,
  },

  {
    id: "creator-light",

    name: "Creator Light",

    category: "Creadores",

    price: 425,

    image:
      "/comercio/assets/products/ring-light.png",

    badge: "Nuevo",

    status: "Disponible",

    href:
      "/comercio/product/creator-light",

    canAddDirectly: true,

    description:
      "Iluminación para contenido, videollamadas y fotografía, pensada para crear una luz más uniforme frente a cámara.",

    features: [
      "Iluminación para contenido",
      "Útil para videollamadas",
      "Luz frontal más uniforme",
      "Pensada para espacios de creación",
    ],

    specifications: [
      {
        label: "Tipo",
        value: "Luz circular",
      },
      {
        label: "Uso",
        value: "Foto y video",
      },
      {
        label: "Instalación",
        value: "Soporte ajustable",
      },
      {
        label: "Alimentación",
        value: "USB",
      },
    ],

    purchaseNotes: [
      {
        icon: "package",
        title: "Qué recibes",
        description:
          "Luz y accesorios incluidos para instalación y uso.",
      },
      {
        icon: "compatibility",
        title: "Antes de instalar",
        description:
          "Verifica el espacio y el soporte que utilizarás para colocarla cómodamente.",
      },
      {
        icon: "warranty",
        title: "Garantía y cambios",
        description:
          "Consulta las condiciones aplicables de garantía y cambios antes de confirmar.",
      },
      {
        icon: "delivery",
        title: "Entrega",
        description:
          "La disponibilidad y el costo de entrega se confirman según tu ubicación.",
      },
    ],

    wholesaleEnabled: true,
  },
];

/*
 * ------------------------------------------------------
 * HELPERS
 * ------------------------------------------------------
 */

export function getProductById(
  id: string
): CommerceProduct | undefined {
  return commerceProducts.find(
    (product) => product.id === id
  );
}

export function getSimilarProducts(
  product: CommerceProduct,
  limit = 3
): CommerceProduct[] {
  const otherProducts =
    commerceProducts.filter(
      (candidate) =>
        candidate.id !== product.id
    );

  const sameCategory =
    otherProducts.filter(
      (candidate) =>
        candidate.category ===
        product.category
    );

  const otherCategories =
    otherProducts.filter(
      (candidate) =>
        candidate.category !==
        product.category
    );

  return [
    ...sameCategory,
    ...otherCategories,
  ].slice(0, limit);
}
