import Image from "next/image";
import {
  CarIcon,
  TruckIcon,
  UserCheckIcon,
} from "../icons/ImportadoraIcons";

type ImportadoraHomeKnowUsProps = {
  name: string;
};

const KNOW_US_IMAGES = {
  main: "/importadoras/default/know-us-main.jpg",
  vehicles: "/importadoras/default/know-us-vehicles.jpg",
  delivery: "/importadoras/default/know-us-delivery.jpg",
};

export default function ImportadoraHomeKnowUs({
  name,
}: ImportadoraHomeKnowUsProps) {
  return (
    <section className="mt-12 border-y border-white/10 py-10 md:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        {/* Contenido */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b] md:text-sm">
            Conócenos
          </p>

          <h2 className="mt-3 max-w-xl text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white md:text-5xl">
            Una importadora enfocada en acompañarte en cada etapa.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/58 md:text-base">
            {name} acompaña a clientes en Guatemala durante la búsqueda,
            cotización, importación y entrega de vehículos desde Estados
            Unidos, con atención directa durante todo el proceso.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <KnowUsFeature
              icon={<UserCheckIcon className="h-6 w-6" />}
              title="Atención directa"
              text="Acompañamiento antes y durante la importación."
            />

            <KnowUsFeature
              icon={<CarIcon className="h-6 w-6" />}
              title="Opciones de vehículos"
              text="Búsqueda según modelo, año y presupuesto."
            />

            <KnowUsFeature
              icon={<TruckIcon className="h-6 w-6" />}
              title="Entrega coordinada"
              text="Seguimiento hasta recibir el vehículo en Guatemala."
            />
          </div>
        </div>

        {/* Galería */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-rows-2">
          <div className="relative col-span-2 min-h-[280px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.34)] lg:col-span-1 lg:row-span-2 lg:min-h-[520px]">
            <Image
              src={KNOW_US_IMAGES.main}
              alt="Presentación de la importadora"
              fill
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/45 via-transparent to-transparent" />
          </div>

          <div className="relative min-h-[180px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.28)] lg:min-h-0">
            <Image
              src={KNOW_US_IMAGES.vehicles}
              alt="Vehículos de importación"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/35 via-transparent to-transparent" />
          </div>

          <div className="relative min-h-[180px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_44px_rgba(0,0,0,0.28)] lg:min-h-0">
            <Image
              src={KNOW_US_IMAGES.delivery}
              alt="Entrega de vehículo en Guatemala"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/35 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function KnowUsFeature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-white/48">{text}</p>
      </div>
    </div>
  );
}
