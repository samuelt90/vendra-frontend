import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import ProcessSteps from './components/sections/ProcessSteps'
import TestimonialCarousel from './components/sections/TestimonialCarousel'
import LeadMagnetSection from './components/sections/LeadMagnetSection'
import CTASection from './components/sections/CTASection'
import SalesChannels from './components/sections/SalesChannels'

//importar Iconos
import {MessageSquare, Users, FileText, ShoppingCart, Database, Clock, Bot, Workflow, Repeat, FileQuestion} from 'lucide-react';




function App() {
  const [count, setCount] = useState(0)
  const problemas = [
      {
    texto: 'Publicas en grupos y tus productos se pierden en comentarios',
    icono: <MessageSquare className="w-10 h-10 text-white" />
  },
  {
    texto: 'En WhatsApp solo muestras lo que te preguntan',
    icono: <Users className="w-10 h-10 text-white" />
  },
  {
    texto: 'Tus productos vendidos siguen generando mensajes repetidos',
    icono: <FileText className="w-10 h-10 text-white" />
  },
  {
    texto: 'En Tiktok ven solo un producto, no todo tu catálogo',
    icono: <Clock className="w-10 h-10 text-white" />
  },
  {
    texto: 'Dependes de una sola forma de vender',
    icono: <FileQuestion className="w-10 h-10 text-white" />
  }
];

  const soluciones = [
      {
    texto: 'Un catálogo donde todos ven lo que vendes',
    icono: <Database className="w-10 h-10 text-white" />
  },
  {
    texto: 'Un solo link para compartir en cualquier canal',
    icono: <Workflow className="w-10 h-10 text-white" />
  },
  {
    texto: 'Los productos desaparecen automaticamente cuando se venden',
    icono: <ShoppingCart className="w-10 h-10 text-white" />
  },
  {
    texto: 'Quien entra ve todos tus productos en segundos',
    icono: <Repeat className="w-10 h-10 text-white" />
  },
  {
    texto: 'Puedes vender desde WhatsApp, Tiktok al mismo tiempo',
    icono: <Bot className="w-10 h-10 text-white" />
  }
];
    const steps = [
    {
      title: 'Paso 1: Hablas con nosotros',
      description:
        'Nos dices cómo vendes hoy y qué productos tienes',
      image: "assets/images/solicitar.svg",
    },
    {
      title: 'Paso 2: Creamos tu catálogo',
      description:
        'Subimos tus productos y dejamos tu tienda lista',
      image: "assets/images/crm.svg",
    },
    {
      title: 'Paso 3: Empiezas a vender',
      description:
        'Compartes tu catálogo y vendes desde cualquier canal',
      image: "assets/images/activar.svg",
    },
  
];
  return (
    <>
      
    <Navbar/>
    <Hero
              title="Tus productos están en varios lugares, pero no todos logran verlos"
              subtitle="Reúne todos tus productos en un solo catáogo listo para compartir."
              ctaText="Ver Demo"
              ctaHref="#contacto"
            />
    <Features
        title="Problemas que resolvemos"
        problemas={problemas}
        soluciones={soluciones}
      />

    <ProcessSteps steps={steps} />

    <SalesChannels/>
    <LeadMagnetSection
    title="Descarga gratis nuestro PDF exclusivo"
    description="Aprende paso a paso cómo automatizar tus ventas todos los días."
    buttonText="Quiero automatizar mi negocio"
  /> 

<TestimonialCarousel
  title="Lo que opinan nuestros clientes"
  testimonials={[
    {
      name: "Luis Pérez",
      role: "Emprendedor",
      message: 'Con DLS automatizamos todo el siguimiento de ventas en WhatsApp. Ahora tenemos control sin contratar a nadie más.'
    },
    {
      name: "Ana Rodríguez",
      role: "Dueña de tienda",
      message: 'Pasé de usar Excel todos los días a solo ver un panel con todo claro. Literalmente trabajo menos y vendo más.'
    },
    {
      name: "Carlos Gómez",
      role: "Vendedor independiente",
      message: 'El sistema predice qué productos van a agotarse. No sabía que esto existía en Guatemala.'
    }
  ]}
/>

   <CTASection
     title="¿Listo para automatizar tu negocio sin complicaciones?"
     subtitle="Regístrate gratis y descubre cómo ahorrar tiempo y vender más sin contratar más personal."
     buttonText="Solicitar mi demo gratuita"
     
   /> 
    

    <Footer/>
    </>
  )
}

export default App
