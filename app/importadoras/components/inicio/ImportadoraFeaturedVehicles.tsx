import Image from "next/image";
import Link from "next/link";
import type { ImportadoraHomeVehicle } from "@/lib/importadoras/getImportadoraHome";
import ImportadoraStatusBadge from "../ui/ImportadoraStatusBadge";

type ImportadoraFeaturedVehiclesProps = {
  slug: string;
  vehicles: ImportadoraHomeVehicle[];
};

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    proximo_ingreso: "Próximo a ingresar",
    en_reparacion: "En reparación",
    listo_entrega: "Listo para entrega",
    entregado: "Entregado",
  };

  return labels[status] ?? status;
}

export default function ImportadoraFeaturedVehicles({
  slug,
  vehicles,
}: ImportadoraFeaturedVehiclesProps) {
  return (
    <section className="importadora-fade-up importadora-delay-2 mt-8">
      {/* /cars principal/ Encabezado vehículos destacados */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#f59e0b]">
            Vehículos destacados
          </p>
          <h3 className="mt-1 text-2xl font-semibold text-white">
            Opciones para revisar
          </h3>
        </div>

        <Link
          href={`/importadoras/${slug}/inventario`}
          className="hidden text-sm font-semibold text-[#f59e0b] md:inline-flex"
        >
          Ver todos →
        </Link>
      </div>

      {/* /cars principal/ Carrusel móvil / grid desktop */}
      {vehicles.length > 0 ? (
        <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
          {vehicles.slice(0, 6).map((vehicle) => (
            <article
              key={vehicle.id}
              className="group min-w-[82%] snap-start overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_55px_rgba(0,0,0,0.34)] transition duration-300 active:scale-[0.98] hover:-translate-y-1 hover:border-[#f59e0b]/35 sm:min-w-[48%] md:min-w-0"
            >
              <div className="relative h-44 bg-white/[0.04]">
                {vehicle.mainImageUrl ? (
                  <Image
                    src={vehicle.mainImageUrl}
                    alt={vehicle.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/35">
                    Sin imagen
                  </div>
                )}

                {vehicle.year ? (
                  <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {vehicle.year}
                  </div>
                ) : null}

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#03070d] to-transparent" />
              </div>

              <div className="p-4">
                <h4 className="line-clamp-1 text-base font-semibold text-white">
                  {vehicle.title}
                </h4>

                <p className="mt-1 text-xs text-white/45">
                  {vehicle.brand} · {vehicle.model}
                </p>

                {vehicle.price ? (
                  <p className="mt-3 text-lg font-bold text-[#f59e0b]">
                    {vehicle.price}
                    {vehicle.isNegotiable ? (
                      <span className="ml-1 text-xs font-normal text-white/40">
                        negociable
                      </span>
                    ) : null}
                  </p>
                ) : null}

                <div className="mt-3 flex items-center justify-between gap-2">
                  <ImportadoraStatusBadge
                    label={getStatusLabel(vehicle.inventoryStatus)}
                  />

                  <Link
                    href={`/importadoras/${slug}/cotizador`}
                    className="text-xs font-semibold text-[#f59e0b]"
                  >
                    Consultar →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold text-white">
            Próximamente más vehículos destacados.
          </p>
          <p className="mt-1 text-xs leading-5 text-white/50">
            También puedes cotizar una opción específica según marca, modelo y
            presupuesto.
          </p>

          <Link
            href={`/importadoras/${slug}/cotizador`}
            className="mt-4 inline-flex rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 px-4 py-2 text-sm font-semibold text-[#f59e0b]"
          >
            Cotizar vehículo
          </Link>
        </div>
      )}
    </section>
  );
}
