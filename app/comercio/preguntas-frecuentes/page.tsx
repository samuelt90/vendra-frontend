import CommerceInfoPage from "../components/information/CommerceInfoPage";

export default function FrequentlyAskedQuestionsPage() {
  return (
    <CommerceInfoPage
      eyebrow="Preguntas frecuentes"
      title="Antes de comprar."
      introduction="Estas son algunas de las dudas más comunes sobre productos, disponibilidad, entrega y compras por cantidad."
      sections={[
        {
          title: "¿Los productos mostrados están disponibles?",
          body: [
            "La disponibilidad mostrada sirve como referencia del catálogo. Antes de confirmar la compra se revisa nuevamente la existencia del producto y la cantidad solicitada.",
          ],
        },
        {
          title: "¿El precio incluye envío?",
          body: [
            "No. El total mostrado corresponde a los productos. El costo de envío se confirma posteriormente según ubicación y características del pedido.",
          ],
        },
        {
          title: "¿Cómo se confirma una compra?",
          body: [
            "Vendra prepara el detalle del pedido y los datos de entrega. La coordinación final continúa por WhatsApp.",
          ],
        },
        {
          title: "¿Puedo comprar varias unidades?",
          body: [
            "Sí. Cuando necesitas cantidades para tu negocio puedes utilizar la sección Mayoristas y solicitar una condición acorde al producto y cantidad requerida.",
          ],
        },
        {
          title: "¿El precio mayorista es público?",
          body: [
            "No necesariamente. La condición final puede depender de la cantidad, disponibilidad y producto solicitado.",
          ],
        },
        {
          title: "¿Puedo modificar mi compra?",
          body: [
            "Antes de enviar la solicitud puedes agregar, quitar o cambiar cantidades desde Tu compra.",
          ],
        },
      ]}
      nextLabel="Comprar por mayor"
      nextHref="/comercio/mayoristas"
    />
  );
}
