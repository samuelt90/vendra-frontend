import { MessageCircle } from "lucide-react";
import { AtSign } from "lucide-react";
import LogoVendra from '../../assets/images/logo-vendra.svg';


export default function Footer() {
  return (
    <footer className="bg-dls-header text-gray-900 px-6 py-12 text-sm">
      {/* FAQ */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 mt-8">¿Tienes dudas?</h2>
        <p className="mb-6 text-gray-800">
          ¿Tienes dudas?.
        </p>

        <div className="space-y-4">
          <details className="bg-white/10 rounded p-4 cursor-pointer">
            <summary className="font-semibold">¿Qué es Vendra?</summary>
            <p className="mt-2 text-gray-800">
              Es un catálogo digital para mostrar todo lo que vendes en un solo lugar.
            </p>
          </details>

          <details className="bg-white/10 rounded p-4 cursor-pointer">
            <summary className="font-semibold">¿Tengo que saber de tecnología?</summary>
            <p className="mt-2 text-gray-800">No. Nosotros dejamos todo listo para que vendas más</p>
          </details>

          <details className="bg-white/10 rounded p-4 cursor-pointer">
            <summary className="font-semibold">¿Qué necesito para empezar?</summary>
            <p className="mt-2 text-gray-800">Tus productos. Nosotros hacemos el resto.</p>
          </details>

          <details className="bg-white/10 rounded p-4 cursor-pointer">
            <summary className="font-semibold">¿Cuánto cuesta?</summary>
            <p className="mt-2 text-gray-800">Te mostramos primero cómo funciona y luego te damos precio.</p>
          </details>

          <details className="bg-white/10 rounded p-4 cursor-pointer">
            <summary className="font-semibold">¿Funciona con WhatsApp, Tiktok o Facebook?</summary>
            <p className="mt-2 text-gray-800">Si. Puedes compartir tu catálogo en cualquier canal de forma simultanea.</p>
          </details>
        </div>
      </div>
      
    
 <hr className="my-8 border-gray-300" />

<div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-10 text-sm text-gray-800">
  <p className="text-sm text-center text-gray-800">
      Nuestros canales de atención personalizados:
    </p>
  <div className="flex items-center gap-2">
     <MessageCircle className="w-5 h-5 text-green-600" />
    <span>Escríbenos por WhatsApp</span>
  </div>
  <div className="flex items-center gap-2">
    <AtSign className="w-5 h-5 text-blue-600" />
    <span>Correo: vendra_ventas@dls-guatemala.com</span>
  </div>
</div>


 <div className="mt-12 flex flex-col items-center gap-4 text-center">
  <img src="/assets/images/logo-vendra.svg" alt="Logo Vendra" className="w-24" /> 

  <div>
    <p className="text-sm">
      Vendra, división de trabajo de <strong>Digital Leverage Systems</strong>
    </p>
    <p className="text-sm">
      © {new Date().getFullYear()} Digital Leverage Systems – Todos los derechos reservados.
    </p>
  </div>
</div>
    </footer>
  );
}