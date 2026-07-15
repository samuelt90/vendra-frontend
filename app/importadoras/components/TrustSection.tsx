import Image from "next/image";
import type { ReactNode } from "react";
import {
  CalculatorIcon,
  DocumentIcon,
  RouteIcon,
  ShieldIcon,
  TruckIcon,
  UserCheckIcon,
} from "./icons/ImportadoraIcons";

type TrustSectionProps = {
  businessName: string | null;
  nit: string | null;
  officeAddress: string | null;
  googleMapsUrl: string | null;
  officePhotoUrls: string[];
  deliveryPhotoUrls: string[];
  financingOptions: string[];
};

export default function TrustSection({
  businessName,
  nit,
  officeAddress,
  googleMapsUrl,
  officePhotoUrls,
  deliveryPhotoUrls,
  financingOptions,
}: TrustSectionProps) {
  const hasBusinessInformation = Boolean(
    businessName || nit || officeAddress
  );

  const hasPhotos =
    officePhotoUrls.length > 0 || deliveryPhotoUrls.length > 0;

  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b] md:text-sm">
          Información del negocio
        </p>

        <h2 className="mt-3 text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white md:text-5xl">
          Datos visibles antes de avanzar
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/52 md:text-base">
          Consulta la información comercial, ubicación y opciones disponibles
          antes de iniciar una compra o gestión de importación.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Información comercial */}
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] md:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.12)]">
              <ShieldIcon className="h-7 w-7" />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.17em] text-[#f59e0b]">
                Datos comerciales
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                Información de la importadora
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/48">
                Datos publicados para identificar el negocio y su punto de
                atención.
              </p>
            </div>
          </div>

          {hasBusinessInformation ? (
            <div className="mt-7 grid gap-3">
              {businessName ? (
                <BusinessDataRow
                  icon={<UserCheckIcon className="h-5 w-5" />}
                  label="Nombre comercial"
                  value={businessName}
                />
              ) : null}

              {nit ? (
                <BusinessDataRow
                  icon={<DocumentIcon className="h-5 w-5" />}
                  label="NIT"
                  value={nit}
                />
              ) : null}

              {officeAddress ? (
                <BusinessDataRow
                  icon={<RouteIcon className="h-5 w-5" />}
                  label="Ubicación"
                  value={officeAddress}
                />
              ) : null}
            </div>
          ) : (
            <div className="mt-7 rounded-2xl border border-dashed border-white/12 bg-white/[0.025] px-5 py-6 text-center">
              <p className="text-sm font-semibold text-white/55">
                Información comercial pendiente de publicar.
              </p>
            </div>
          )}

          {googleMapsUrl ? (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.055] px-5 py-3.5 text-sm font-bold text-white transition hover:border-[#f59e0b]/40 hover:bg-[#f59e0b]/10 hover:text-[#f59e0b]"
            >
              <RouteIcon className="h-5 w-5" />
              Ver ubicación en Google Maps
            </a>
          ) : null}
        </article>

        {/* Financiamiento */}
        <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] md:p-7">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#f59e0b]/12 blur-3xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.12)]">
              <CalculatorIcon className="h-7 w-7" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.17em] text-[#f59e0b]">
              Formas de compra
            </p>

            <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
              Opciones de financiamiento
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/48">
              Las condiciones pueden variar según el vehículo, el monto y la
              evaluación de cada caso.
            </p>

            {financingOptions.length > 0 ? (
              <div className="mt-6 grid gap-3">
                {financingOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07111d]/72 px-4 py-3.5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
                      <ShieldIcon className="h-4 w-4" />
                    </div>

                    <p className="text-sm font-bold text-white">{option}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/12 bg-white/[0.025] px-5 py-6">
                <p className="text-sm font-semibold text-white/55">
                  No hay opciones de financiamiento publicadas.
                </p>

                <p className="mt-2 text-xs leading-5 text-white/38">
                  La disponibilidad y condiciones pueden consultarse
                  directamente con la importadora.
                </p>
              </div>
            )}
          </div>
        </article>
      </div>

      {/* Evidencia visual */}
      {hasPhotos ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {officePhotoUrls.length > 0 ? (
            <PhotoGallery
              eyebrow="Punto físico"
              title="Oficina y atención"
              description="Imágenes del lugar donde opera o atiende la importadora."
              icon={<UserCheckIcon className="h-6 w-6" />}
              images={officePhotoUrls}
              imageAlt="Oficina de la importadora"
            />
          ) : null}

          {deliveryPhotoUrls.length > 0 ? (
            <PhotoGallery
              eyebrow="Vehículos entregados"
              title="Entregas realizadas"
              description="Referencias visuales de unidades que han completado el proceso."
              icon={<TruckIcon className="h-6 w-6" />}
              images={deliveryPhotoUrls}
              imageAlt="Entrega de vehículo"
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function BusinessDataRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07111d]/72 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-white/38">{label}</p>
        <p className="mt-1 break-words text-sm font-bold leading-6 text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function PhotoGallery({
  eyebrow,
  title,
  description,
  icon,
  images,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  images: string[];
  imageAlt: string;
}) {
  const visibleImages = images.slice(0, 4);
  const [mainImage, ...secondaryImages] = visibleImages;

  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] md:p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.17em] text-[#f59e0b]">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-white/42">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative col-span-2 h-56 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#07111d] md:h-72">
          <Image
            src={mainImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#03070d]/45 via-transparent to-transparent" />
        </div>

        {secondaryImages.map((imageUrl, index) => (
          <div
            key={`${imageUrl}-${index}`}
            className={[
              "relative h-28 overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#07111d] md:h-36",
              secondaryImages.length === 1 ? "col-span-2" : "",
            ].join(" ")}
          >
            <Image
              src={imageUrl}
              alt={`${imageAlt} ${index + 2}`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
