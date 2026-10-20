import CommerceInfoPage from "../components/information/CommerceInfoPage";

export default function HowToBuyPage() {
  return (
    <CommerceInfoPage
      eyebrow="Cómo comprar"
      title="De producto a pedido."
      introduction="Puedes recorrer la tienda, elegir productos y preparar tu compra desde Vendra. La coordinación final se realiza por WhatsApp."
      sections={[
        {
          title: "Encuentra",
          body: [
            "Explora la tienda, utiliza categorías y filtros o busca directamente el producto que necesitas.",
          ],
        },
        {
          title: "Revisa",
          body: [
            "Abre la ficha del producto para consultar precio, características, especificaciones y datos importantes antes de comprar.",
          ],
        },
        {
          title: "Agrega",
          body: [
            "Añade los productos a tu compra y ajusta las cantidades desde Tu compra antes de continuar.",
          ],
        },
        {
          title: "Completa tus datos",
          body: [
            "Indica nombre y datos de entrega. Vendra prepara el detalle de productos y el total correspondiente.",
          ],
        },
        {
          title: "Confirma por WhatsApp",
          body: [
            "El mensaje queda preparado con el detalle de tu compra. El negocio confirma disponibilidad y costo de envío antes de coordinar la entrega.",
          ],
        },
      ]}
      nextLabel="Ir a la tienda"
      nextHref="/comercio/tienda"
    />
  );
}
