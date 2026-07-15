"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import ImportadoraStatusBadge from "./ui/ImportadoraStatusBadge";
import {
  CarIcon,
  WhatsappIcon,
} from "./icons/ImportadoraIcons";

type InventoryStatus =
  | "proximo_ingreso"
  | "en_reparacion"
  | "listo_entrega"
  | "entregado";

type InventoryVehicle = {
  id: number;
  title: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  price: string | null;
  isNegotiable: boolean;
  description: string | null;
  features: string | null;
  inventoryStatus: InventoryStatus;
  mainImageUrl: string | null;
};

type InventoryTabsProps = {
  vehicles: InventoryVehicle[];
  slug: string;
  whatsappNumber: string | null;
  importadoraName: string;
};

const STATUS_TABS: {
  value: InventoryStatus;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "proximo_ingreso",
    label: "Próximos a ingresar",
    shortLabel: "Próximos",
  },
  {
    value: "en_reparacion",
    label: "En preparación",
    shortLabel: "Preparación",
  },
  {
    value: "listo_entrega",
    label: "Listos para entrega",
    shortLabel: "Listos",
  },
  {
    value: "entregado",
    label: "Entregados",
    shortLabel: "Entregados",
  },
];

const STATUS_LABELS: Record<InventoryStatus, string> = {
  proximo_ingreso: "Próximo a ingresar",
  en_reparacion: "En preparación",
  listo_entrega: "Listo para entrega",
  entregado: "Entregado",
};

function cleanWhatsappNumber(phone: string | null) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

function buildVehicleWhatsappUrl({
  phone,
  importadoraName,
  vehicle,
}: {
  phone: string | null;
  importadoraName: string;
  vehicle: InventoryVehicle;
}) {
  const cleanPhone = cleanWhatsappNumber(phone);

  if (!cleanPhone) {
    return null;
  }

  const vehicleName =
    vehicle.title ||
    [vehicle.brand, vehicle.model, vehicle.year]
      .filter(Boolean)
      .join(" ");

  const message =
    vehicle.inventoryStatus === "entregado"
      ? [
          `Hola, vi un vehículo entregado por ${importadoraName}.`,
          "",
          `Referencia: ${vehicleName}`,
          vehicle.price ? `Precio publicado: ${vehicle.price}` : null,
          "",
          "¿Me puede ayudar a buscar una opción similar?",
        ]
          .filter(Boolean)
          .join("\n")
      : [
          `Hola, vi este vehículo en el inventario de ${importadoraName}.`,
          "",
          `Vehículo: ${vehicleName}`,
          `Estado: ${STATUS_LABELS[vehicle.inventoryStatus]}`,
          vehicle.price ? `Precio: ${vehicle.price}` : null,
          "",
          "Quiero recibir más información sobre esta opción.",
        ]
          .filter(Boolean)
          .join("\n");

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export default function InventoryTabs({
  vehicles,
  slug,
  whatsappNumber,
  importadoraName,
}: InventoryTabsProps) {
  const [activeStatus, setActiveStatus] =
    useState<InventoryStatus>("proximo_ingreso");

  const visibleVehicles = useMemo(
    () =>
      vehicles.filter(
        (vehicle) => vehicle.inventoryStatus === activeStatus
      ),
    [vehicles, activeStatus]
  );

  function getStatusCount(status: InventoryStatus) {
    return vehicles.filter(
      (vehicle) => vehicle.inventoryStatus === status
    ).length;
  }

  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        <div className="flex min-w-max gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2 md:min-w-0 md:grid md:grid-cols-4">
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.value;
            const count = getStatusCount(tab.value);

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveStatus(tab.value)}
                className={[
                  "flex min-w-[135px] items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition md:min-w-0",
                  isActive
                    ? "bg-[#f59e0b] text-black shadow-[0_12px_30px_rgba(245,158,11,0.2)]"
                    : "text-white/58 hover:bg-white/[0.055] hover:text-white",
                ].join(" ")}
              >
                <span className="md:hidden">{tab.shortLabel}</span>
                <span className="hidden md:inline">{tab.label}</span>

                <span
                  className={[
                    "flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[10px] font-black",
                    isActive
                      ? "bg-black/15 text-black"
                      : "bg-white/[0.07] text-white/45",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.17em] text-[#f59e0b]">
              {STATUS_LABELS[activeStatus]}
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white md:text-3xl">
              {visibleVehicles.length === 1
                ? "1 vehículo publicado"
                : `${visibleVehicles.length} vehículos publicados`}
            </h2>
          </div>

          <Link
            href={`/importadoras/${slug}/cotizador`}
            className="hidden text-sm font-bold text-[#f59e0b] transition hover:text-[#fbbf24] md:inline-flex"
          >
            Buscar otra opción →
          </Link>
        </div>

        {visibleVehicles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleVehicles.map((vehicle) => {
              const whatsappUrl = buildVehicleWhatsappUrl({
                phone: whatsappNumber,
                importadoraName,
                vehicle,
              });

              const vehicleTitle =
                vehicle.title ||
                [vehicle.brand, vehicle.model, vehicle.year]
                  .filter(Boolean)
                  .join(" ");

              return (
                <article
                  key={vehicle.id}
                  className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] transition duration-300 hover:-translate-y-1 hover:border-[#f59e0b]/35"
                >
                  <div className="relative h-56 overflow-hidden bg-[#07111d]">
                    {vehicle.mainImageUrl ? (
                      <Image
                        src={vehicle.mainImageUrl}
                        alt={vehicleTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_45%),linear-gradient(135deg,#0b1420,#03070d)]">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
                          <CarIcon className="h-8 w-8" />
                        </div>

                        <p className="mt-3 text-sm font-bold text-white/65">
                          Imagen próximamente
                        </p>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-transparent" />

                    {vehicle.year ? (
                      <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                        {vehicle.year}
                      </span>
                    ) : null}

                    <div className="absolute bottom-4 left-4">
                      <ImportadoraStatusBadge
                        label={STATUS_LABELS[vehicle.inventoryStatus]}
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-[0.15em] text-[#f59e0b]">
                      {vehicle.brand || "Vehículo importado"}
                    </p>

                    <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-white">
                      {vehicleTitle}
                    </h3>

                    {vehicle.brand || vehicle.model ? (
                      <p className="mt-1 text-sm text-white/42">
                        {[vehicle.brand, vehicle.model]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}

                    {vehicle.price ? (
                      <div className="mt-5">
                        <p className="text-xs font-semibold text-white/38">
                          Precio publicado
                        </p>

                        <p className="mt-1 text-2xl font-black text-[#f59e0b]">
                          {vehicle.price}

                          {vehicle.isNegotiable ? (
                            <span className="ml-2 text-xs font-semibold text-white/42">
                              negociable
                            </span>
                          ) : null}
                        </p>
                      </div>
                    ) : (
                      <p className="mt-5 text-lg font-bold text-white">
                        Precio a consultar
                      </p>
                    )}

                    {vehicle.description ? (
                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-white/48">
                        {vehicle.description}
                      </p>
                    ) : null}

                    <div className="mt-5 grid gap-2 sm:grid-cols-2">
                      {whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 rounded-2xl bg-[#f59e0b] px-4 py-3.5 text-sm font-black text-black shadow-[0_16px_36px_rgba(245,158,11,0.2)] transition hover:-translate-y-0.5 active:scale-[0.98]"
                        >
                          <WhatsappIcon className="h-4 w-4" />

                          {vehicle.inventoryStatus === "entregado"
                            ? "Buscar similar"
                            : "Consultar"}
                        </a>
                      ) : null}

                      <Link
                        href={`/importadoras/${slug}/cotizador`}
                        className="flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.055] px-4 py-3.5 text-sm font-bold text-white transition hover:border-[#f59e0b]/35 hover:text-[#f59e0b]"
                      >
                        Ver opciones
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-10 text-center md:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
              <CarIcon className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-xl font-black text-white">
              No hay vehículos publicados en esta etapa
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/45">
              Puedes explorar qué opciones podrían ajustarse a tu presupuesto
              desde el cotizador.
            </p>

            <Link
              href={`/importadoras/${slug}/cotizador`}
              className="mt-5 inline-flex rounded-2xl bg-[#f59e0b] px-5 py-3 text-sm font-black text-black"
            >
              Explorar por presupuesto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
