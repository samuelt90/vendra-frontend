import CommerceInfoPage from "../components/information/CommerceInfoPage";

export default function TermsPage() {
  return (
    <CommerceInfoPage
      eyebrow="Términos y condiciones"
      title="Condiciones de compra."
      introduction="Estas condiciones describen de forma general cómo se presentan productos, precios, disponibilidad y coordinación de pedidos dentro de Vendra."
      sections={[
        {
          title: "Productos y disponibilidad",
          body: [
            "Los productos mostrados pueden estar sujetos a disponibilidad. La existencia se valida antes de confirmar definitivamente un pedido.",
          ],
        },
        {
          title: "Precios",
          body: [
            "Los precios mostrados corresponden al valor indicado para cada producto y pueden cambiar cuando existan promociones, actualizaciones o condiciones comerciales específicas.",
            "Las compras por mayor pueden contar con condiciones distintas según cantidad, producto y disponibilidad.",
          ],
        },
        {
          title: "Envíos",
          body: [
            "El costo de envío no se incorpora automáticamente al total de productos. Se coordina posteriormente según ubicación, cantidad y características del pedido.",
          ],
        },
        {
          title: "Confirmación",
          body: [
            "Preparar una compra en Vendra no significa que el pedido haya sido confirmado automáticamente.",
            "La confirmación final depende de la validación de disponibilidad y de la coordinación realizada con el negocio.",
          ],
        },
        {
          title: "Cambios y garantías",
          body: [
            "Las condiciones aplicables a cambios, garantías o devoluciones pueden depender del producto adquirido y deben confirmarse durante la coordinación de la compra.",
          ],
        },
        {
          title: "Información proporcionada",
          body: [
            "Los datos de entrega proporcionados por el comprador se utilizan para preparar y coordinar la solicitud de compra correspondiente.",
          ],
        },
      ]}
      nextLabel="Volver a la tienda"
      nextHref="/comercio/tienda"
    />
  );
}
