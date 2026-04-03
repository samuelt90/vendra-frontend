import { Info } from "lucide-react";
import Button from "../ui/Button";


export default function SalesChannels() {
  const channels = [
   
     {
    title: "Catálogo digital",
    description: (
      <>
        <span className="font-semibold text-white">Aumenta</span> tus ventas por{" "}
        <span className="text-white font-semibold underline">TikTok</span> y{" "}
        <span className="text-white font-semibold underline">WhatsApp</span> con catálogo{" "}
        <span className="text-white font-semibold">de tus productos</span>,{" "}
        <span className="text-white font-semibold">para tus</span> {" "}
        <span className="text-white font-semibold">clientes</span>.
      </>
    ),
    image:"/assets/images/logos/LiveControl.webp",
  },
    {
  title: "Catálogo dinámico",
  description: (
    <>
      Tu propia <span className="font-semibold text-white">tienda online</span> para vender con{" "}
      <span className="font-semibold text-white">pasarela de pago</span> y{" "}
      <span className="font-semibold text-white">catálogo dinámico incluido</span>.
    </>
  ),
      image: "/assets/images/logos/Web.webp",
    },
    {
  title: "Catálogo de Vehículos",
  description: (
    <>
      Ideal para <span className="font-semibold text-white">predios e importadora de vehículos.</span>{" "}
      Recibe solicitudes desde el catálogo<span className="font-semibold text-white"></span>,{" "}
      <span className="font-semibold text-white">recibe interesados sin responder uno por uno</span> y{" "}
      <span className="font-semibold text-white">vende en menos pasos</span>.
    </>
  ),
      image: "/assets/images/logos/Select.webp",
    },
  ];

  return (
    <section className="bg-dls-section text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nuestros Canales de Venta</h2>
        <p className="text-gray-300">Elige el canal que se adapta a tu negocio</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="rounded-xl p-6 shadow-xl bg-[#27364c] border-4 border-transparent hover:border-[#eebf35] transition-all duration-200"
          >
            <div className="flex flex-col h-full justify-between items-center text-center">
              <img src={channel.image} alt={channel.title} className="h-20 md:h-24 mx-auto mb-4 rounded-lg drop-shadow-2xl" />
              <div>
                <h3 className="text-xl font-semibold mb-3 text-lime-300">{channel.title}</h3>
                <p className="text-gray-300 mb-6">{channel.description}</p>
                <Button text="Solicitar Demo" icon="info" className="w-full justify-center" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Texto + ícono sin diseño de botón */}
      <div className="mt-12 text-center space-y-4">
        <p className="text-sm text-white/80">
          ¿Tienes duda de qué servicio sea el correcto para tu negocio?
          <br className="hidden md:block" />
          Consulta con nuestro asesor.
        </p>

        <a
          href="#contacto"
          className="inline-flex items-center justify-center gap-2 text-gray-300 hover:text-[#27364c] transition-colors font-semibold"
        >
          <Info className="w-5 h-5" />
          <span className="underline underline-offset-2">Contactar asesor para mi negocio</span>
        </a>
      </div>
    </section>
  );
}