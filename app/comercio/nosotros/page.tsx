import CommerceInfoPage from "../components/information/CommerceInfoPage";

export default function AboutPage() {
  return (
    <CommerceInfoPage
      eyebrow="Quiénes somos"
      title="Tecnología para comprar mejor."
      introduction="Vendra reúne productos, disponibilidad y distintas formas de compra en una experiencia directa para clientes y negocios."
      sections={[
        {
          title: "Qué encuentras aquí",
          body: [
            "Productos y accesorios disponibles para comprar directamente, con información clara antes de tomar una decisión.",
            "La experiencia está pensada para que puedas explorar, comparar y continuar tu compra sin depender de un catálogo enviado por separado.",
          ],
        },
        {
          title: "Compra en Guatemala",
          body: [
            "La disponibilidad, entrega y condiciones de compra se coordinan para pedidos dentro de Guatemala.",
          ],
        },
        {
          title: "Compra personal o para negocio",
          body: [
            "Puedes comprar unidades individuales desde la tienda o utilizar el espacio mayorista cuando necesitas cantidades para tu negocio.",
            "Las condiciones mayoristas pueden variar según producto, cantidad y disponibilidad.",
          ],
        },
        {
          title: "Antes de confirmar",
          body: [
            "La disponibilidad y el costo de envío se revisan antes de completar la coordinación de tu pedido.",
          ],
        },
      ]}
      nextLabel="Explorar la tienda"
      nextHref="/comercio/tienda"
    />
  );
}
