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
  features: string[];
  specifications: ProductSpecification[];
  purchaseNotes: CommercePurchaseNote[];

  wholesaleEnabled: boolean;
};

/*
 * RUTAS DE IMÁGENES
 *
 * Las imágenes originales permanecen en /products.
 * Las nuevas se organizan por categoría.
 */

const ASSETS = "/comercio/assets/products";

const AUDIO = `${ASSETS}/audio`;
const WEARABLES = `${ASSETS}/wearables`;
const COMPUTACION = `${ASSETS}/computacion`;
const CREADORES = `${ASSETS}/creadores`;

/*
 * NOTAS COMERCIALES REUTILIZABLES
 *
 * Para los nuevos artículos de demostración.
 * Las condiciones definitivas se configurarán
 * cuando exista información del proveedor.
 */

const demoPurchaseNotes: CommercePurchaseNote[] = [
  {
    icon: "package",
    title: "Presentación del producto",
    description:
      "Consulta el contenido y los accesorios incluidos en esta presentación.",
  },
  {
    icon: "compatibility",
    title: "Compatibilidad",
    description:
      "Confirma la compatibilidad del modelo antes de realizar tu compra.",
  },
  {
    icon: "warranty",
    title: "Garantía y cambios",
    description:
      "Las condiciones aplicables se confirman con el proveedor.",
  },
  {
    icon: "delivery",
    title: "Entrega",
    description:
      "La disponibilidad y el costo de entrega se confirman según tu ubicación.",
  },
];

/*
 * CREADOR DE PRODUCTOS DE DEMOSTRACIÓN
 *
 * Evita repetir información común en los
 * productos nuevos.
 *
 * No inventa características ni especificaciones.
 */

type DemoProductInput = Pick<
  CommerceProduct,
  "id" | "name" | "category" | "price" | "image"
> &
  Partial<
    Pick<
      CommerceProduct,
      | "previousPrice"
      | "badge"
      | "status"
      | "description"
      | "features"
      | "specifications"
      | "images"
      | "wholesaleEnabled"
      | "canAddDirectly"
    >
  >;

function createDemoProduct(
  input: DemoProductInput
): CommerceProduct {
  return {
    ...input,

    href: `/comercio/product/${input.id}`,

    status: input.status ?? "Disponible",

    canAddDirectly:
      input.canAddDirectly ?? true,

    wholesaleEnabled:
      input.wholesaleEnabled ?? true,

    description:
      input.description ??
      `${input.name}. Producto de la categoría ${input.category}, disponible para consultas de compra individual y por mayor.`,

    features: input.features ?? [],

    specifications: input.specifications ?? [],

    purchaseNotes: demoPurchaseNotes,
  };
}

/*
 * ======================================================
 * CATÁLOGO DE VENDRA COMERCIO
 * ======================================================
 *
 * 22 productos
 *
 * Audio:        6
 * Wearables:    6
 * Computación:  5
 * Creadores:    5
 *
 * Los primeros cinco productos conservan su información.
 * Los nuevos utilizan precios simulados.
 */

export const commerceProducts: CommerceProduct[] = [

  /*
   * ====================================================
   * AUDIO
   * ====================================================
   */

  {
    id: "pulse-x1",
    name: "Audífonos Pulse X1",
    category: "Audio",
    price: 349,

    image: `${ASSETS}/audifonos.png`,


    images: [
  "/comercio/assets/products/audio/pulse-x1/animacion.png",
  "/comercio/assets/products/audio/pulse-x1/costado-cerca.png",
  "/comercio/assets/products/audio/pulse-x1/costado-detalle.png",
  "/comercio/assets/products/audio/pulse-x1/costados.png",
  "/comercio/assets/products/audio/pulse-x1/detalles.png",
  "/comercio/assets/products/audio/pulse-x1/envuelto.png",
  "/comercio/assets/products/audio/pulse-x1/frontal.png",
],

    badge: "Nuevo",
    status: "Disponible",

    href: "/comercio/product/pulse-x1",
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

    image: `${ASSETS}/bocina.png`,

    badge: "Precio especial",
    status: "Disponible",

    href: "/comercio/product/sound-mini",
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

  createDemoProduct({
    id: "audifonos-gaming",
    name: "Audífonos Gaming",
    category: "Audio",
    price: 389,

    image: `${AUDIO}/audifonos-gaming.png`,

    badge: "Nuevo",
  }),

  createDemoProduct({
    id: "audifonos-pequenos",
    name: "Audífonos Inalámbricos Compactos",
    category: "Audio",
    price: 179,

    image: `${AUDIO}/audifonos-pequenos.png`,
  }),

  createDemoProduct({
    id: "audifonos-tws",
    name: "Audífonos TWS",
    category: "Audio",
    price: 199,

    image: `${AUDIO}/audifonos-tws.png`,

    badge: "Nuevo",
  }),

  createDemoProduct({
    id: "mini-bocina",
    name: "Mini Bocina Bluetooth",
    category: "Audio",
    price: 189,
    previousPrice: 229,

    image: `${AUDIO}/mini-bocina.png`,

    badge: "Precio especial",
  }),

  /*
   * ====================================================
   * WEARABLES
   * ====================================================
   */

  {
    id: "watch-s2",
    name: "Smartwatch S2",
    category: "Wearables",
    price: 499,

    image: `${ASSETS}/smartwatch.png`,

    badge: "Últimas unidades",
    status: "Últimas unidades",

    href: "/comercio/product/watch-s2",
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

  createDemoProduct({
    id: "smartwatch-fino",
    name: "Smartwatch Clásico",
    category: "Wearables",
    price: 449,

    image: `${WEARABLES}/smartwatch-fino.png`,
  }),

  createDemoProduct({
    id: "smartwatch-kids",
    name: "Smartwatch Kids",
    category: "Wearables",
    price: 329,

    image: `${WEARABLES}/smartwatch-kids.png`,

    badge: "Nuevo",
  }),

  createDemoProduct({
    id: "smartwatch-mujer",
    name: "Smartwatch Rosa",
    category: "Wearables",
    price: 399,

    image: `${WEARABLES}/smartwatch-mujer.png`,
  }),

  createDemoProduct({
    id: "smartwatch-s3",
    name: "Smartwatch S3",
    category: "Wearables",
    price: 549,
    previousPrice: 599,

    image: `${WEARABLES}/smartwatch-s3.png`,

    badge: "Precio especial",
  }),

  createDemoProduct({
    id: "smartwatch-sport",
    name: "Smartwatch Sport",
    category: "Wearables",
    price: 479,

    image: `${WEARABLES}/smartwatch-sport.png`,
  }),

  /*
   * ====================================================
   * COMPUTACIÓN
   * ====================================================
   */

  {
    id: "keyboard-k80",
    name: "Teclado K80",
    category: "Computación",
    price: 599,

    image: `${ASSETS}/teclado.png`,

    status: "Disponible",

    href: "/comercio/product/keyboard-k80",
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

  createDemoProduct({
    id: "combo-teclado-mouse",
    name: "Combo Teclado + Mouse",
    category: "Computación",
    price: 449,

    image: `${COMPUTACION}/combo.png`,

    badge: "Nuevo",
  }),

  createDemoProduct({
    id: "hub-usbc",
    name: "Hub USB-C Multipuerto",
    category: "Computación",
    price: 249,

    image: `${COMPUTACION}/hub.png`,
  }),

  createDemoProduct({
    id: "mouse-gaming",
    name: "Mouse Gaming RGB",
    category: "Computación",
    price: 225,

    image: `${COMPUTACION}/mouse-gaming.png`,
  }),

  createDemoProduct({
    id: "mouse-inalambrico",
    name: "Mouse Inalámbrico",
    category: "Computación",
    price: 119,
    previousPrice: 149,

    image: `${COMPUTACION}/mouse-inalambrico.png`,

    badge: "Precio especial",
  }),

  /*
   * ====================================================
   * CREADORES
   * ====================================================
   */

  {
    id: "creator-light",
    name: "Creator Light",
    category: "Creadores",
    price: 425,

    image: `${ASSETS}/ring-light.png`,

    badge: "Nuevo",
    status: "Disponible",

    href: "/comercio/product/creator-light",
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

  createDemoProduct({
    id: "micro-inalambrico",
    name: "Micrófono Inalámbrico de Solapa",
    category: "Creadores",
    price: 299,

    image: `${CREADORES}/micro-inalambrico.png`,

    badge: "Nuevo",
  }),

  createDemoProduct({
    id: "panel-led",
    name: "Panel de Iluminación LED",
    category: "Creadores",
    price: 349,

    image: `${CREADORES}/panel-led.png`,
  }),

  createDemoProduct({
    id: "soporte-articulado",
    name: "Soporte Articulado para Celular",
    category: "Creadores",
    price: 169,

    image: `${CREADORES}/soporte-articulado.png`,
  }),

  createDemoProduct({
    id: "tripode-celular",
    name: "Trípode Extensible para Celular",
    category: "Creadores",
    price: 199,

    image: `${CREADORES}/tripode-celular.png`,

    badge: "Nuevo",
  }),
];

/*
 * ======================================================
 * HELPERS
 * ======================================================
 */

/**
 * Obtiene un producto a partir de su ID.
 *
 * Utilizado por el detalle de producto
 * y otros componentes comerciales.
 */
export function getProductById(
  id: string
): CommerceProduct | undefined {
  return commerceProducts.find(
    (product) => product.id === id
  );
}

/**
 * Obtiene productos relacionados.
 *
 * Prioriza artículos de la misma categoría,
 * luego completa con otras categorías.
 */
export function getSimilarProducts(
  product: CommerceProduct,
  limit = 3
): CommerceProduct[] {
  const otherProducts = commerceProducts.filter(
    (candidate) => candidate.id !== product.id
  );

  const sameCategory = otherProducts.filter(
    (candidate) =>
      candidate.category === product.category
  );

  const otherCategories = otherProducts.filter(
    (candidate) =>
      candidate.category !== product.category
  );

  return [
    ...sameCategory,
    ...otherCategories,
  ].slice(0, limit);
}

