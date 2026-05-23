import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Truck,
  RefreshCcw,
} from "lucide-react";

export const apartaFaqItems = [
  {
    icon: ShoppingBag,
    question: "¿Cómo funciona el apartado?",
    answer:
      "Cuando presionas Apartar, el producto se reserva temporalmente para ti y deja de estar visible para otros clientes mientras completas el proceso.",
  },
  {
    icon: MessageCircle,
    question: "¿Cómo confirmo mi pedido?",
    answer:
      "Después de revisar tu carrito, completa tus datos y envía el pedido por WhatsApp. La tienda recibirá el resumen para confirmar y coordinar contigo.",
  },
  {
    icon: ShieldCheck,
    question: "¿Para qué se usan mis datos?",
    answer:
      "Tus datos se utilizan únicamente para confirmar y coordinar tu pedido con la tienda. No se usan para otros fines.",
  },
  {
    icon: CreditCard,
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Las formas de pago dependen de cada tienda. Podrás coordinar por WhatsApp si aplica transferencia, contraentrega u otro método disponible.",
  },
  {
    icon: Truck,
    question: "¿Cómo se coordina la entrega?",
    answer:
      "La entrega se coordina directamente con la tienda por WhatsApp, según ubicación, disponibilidad y método acordado.",
  },
  {
    icon: RefreshCcw,
    question: "¿Aplican cambios o devoluciones?",
    answer:
      "Las políticas de cambios o devoluciones dependen de cada tienda. Te recomendamos revisar bien el producto, precio y detalles antes de confirmar tu pedido.",
  },
];