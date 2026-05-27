"use client";

import {
  ChevronRight,
  Lock,
  Search,
  Sparkles,
  Eye,
  Plus,
  ShoppingBag,
  Radio,
  Info,
} from "lucide-react";
import { useMemo, useState } from "react";

type ViewKey =
  | "vendidas"
  | "apartadas"
  | "disponibles"
  | "catalogo"
  | "live"
  | "leads"
  | "pendientes"
  | "inventario"
  | "sin-foto";

type RowItem = {
  code: string;
  item: string;
  channel?: "Catálogo" | "Live";
  size?: string;
  time?: string;
  total?: string;
  client?: string;
  status?: string;
};

const soldItems: RowItem[] = [
  {
    code: "RF-102",
    item: "Blusa satinada",
    channel: "Catálogo",
    size: "M",
    time: "10:14 AM",
    total: "Q185",
  },
  {
    code: "RF-087",
    item: "Pantalón beige",
    channel: "Live",
    size: "S",
    time: "10:42 AM",
    total: "Q210",
  },
  {
    code: "RF-133",
    item: "Vestido floral",
    channel: "Catálogo",
    size: "M",
    time: "11:08 AM",
    total: "Q260",
  },
  {
    code: "RF-091",
    item: "Blazer corto",
    channel: "Live",
    size: "L",
    time: "11:36 AM",
    total: "Q240",
  },
  {
    code: "RF-118",
    item: "Top de lino",
    channel: "Catálogo",
    size: "S",
    time: "12:02 PM",
    total: "Q150",
  },
];

const reservedItems: RowItem[] = [
  {
    code: "RF-221",
    item: "Blusa blanca",
    channel: "Live",
    client: "Andrea M.",
    time: "04:32 min",
    status: "Apartada",
  },
  {
    code: "RF-198",
    item: "Falda midi",
    channel: "Live",
    client: "Sofía R.",
    time: "03:10 min",
    status: "Apartada",
  },
  {
    code: "RF-205",
    item: "Vestido negro",
    channel: "Live",
    client: "Carla T.",
    time: "02:45 min",
    status: "Confirmada",
  },
  {
    code: "RF-176",
    item: "Top rib",
    channel: "Live",
    client: "Daniela P.",
    time: "01:58 min",
    status: "Apartada",
  },
  {
    code: "RF-190",
    item: "Pantalón lino",
    channel: "Live",
    client: "María G.",
    time: "00:54 min",
    status: "Por vencer",
  },
];

const availableItems: RowItem[] = [
  {
    code: "RF-301",
    item: "Camisa oversize",
    channel: "Catálogo",
    size: "M",
    status: "Disponible",
  },
  {
    code: "RF-302",
    item: "Short denim",
    channel: "Catálogo",
    size: "S",
    status: "Disponible",
  },
  {
    code: "RF-303",
    item: "Vestido lino",
    channel: "Catálogo",
    size: "M",
    status: "Disponible",
  },
  {
    code: "RF-304",
    item: "Top básico",
    channel: "Live",
    size: "S",
    status: "Disponible",
  },
];

const leadItems: RowItem[] = [
  {
    code: "LD-001",
    item: "Consulta por vestido floral",
    client: "María G.",
    channel: "Catálogo",
    status: "Interesada",
  },
  {
    code: "LD-002",
    item: "Pregunta por talla de blazer",
    client: "Andrea M.",
    channel: "Live",
    status: "Pendiente",
  },
  {
    code: "LD-003",
    item: "Solicita fotos adicionales",
    client: "Sofía R.",
    channel: "Catálogo",
    status: "Interesada",
  },
];

const inventoryItems: RowItem[] = [
  {
    code: "RF-410",
    item: "Falda satinada",
    channel: "Catálogo",
    size: "M",
    status: "Registrada",
  },
  {
    code: "RF-411",
    item: "Blusa manga corta",
    channel: "Catálogo",
    size: "S",
    status: "Registrada",
  },
  {
    code: "RF-412",
    item: "Pantalón recto",
    channel: "Live",
    size: "L",
    status: "Sin foto",
  },
];

const viewConfig: Record<
  ViewKey,
  {
    title: string;
    badge: string;
    description: string;
    tableType: "sales" | "reserved" | "available" | "leads" | "inventory";
  }
> = {
  vendidas: {
    title: "Vendidas hoy",
    badge: "12",
    description: "Resumen unificado de catálogo digital y live selling.",
    tableType: "sales",
  },
  apartadas: {
    title: "Apartadas activas",
    badge: "6",
    description: "Consulta de prendas apartadas desde catálogo digital y live selling.",
    tableType: "reserved",
  },
  disponibles: {
    title: "Disponibles",
    badge: "37",
    description: "Prendas listas para vender en catálogo digital o live selling.",
    tableType: "available",
  },
  catalogo: {
    title: "Catálogo digital",
    badge: "7",
    description: "Ventas generadas desde el catálogo digital de Refit.",
    tableType: "sales",
  },
  live: {
    title: "Live selling",
    badge: "5",
    description: "Actividad comercial generada durante live selling.",
    tableType: "reserved",
  },
  leads: {
    title: "Leads interesados",
    badge: "12",
    description: "Resumen de interesados. La gestión completa vive en Exhiba.",
    tableType: "leads",
  },
  pendientes: {
    title: "Leads pendientes",
    badge: "3",
    description: "Contactos pendientes de seguimiento.",
    tableType: "leads",
  },
  inventario: {
    title: "Inventario registrado",
    badge: "41",
    description: "Resumen visual del inventario. La fuente real será NestJS de Vendra.",
    tableType: "inventory",
  },
  "sin-foto": {
    title: "Prendas sin foto",
    badge: "2",
    description: "Prendas registradas que necesitan completar imagen.",
    tableType: "inventory",
  },
};

export default function ApartaSellerPanelPage() {
  const [activeView, setActiveView] = useState<ViewKey>("vendidas");
  const [openMenu, setOpenMenu] = useState<string | null>("null");
  const [channelFilter, setChannelFilter] = useState<"Todo" | "Catálogo" | "Live">(
    "Todo"
  );

  const currentView = viewConfig[activeView];

  const currentRows = useMemo(() => {
    if (currentView.tableType === "reserved") return reservedItems;
    if (currentView.tableType === "available") return availableItems;
    if (currentView.tableType === "leads") return leadItems;
    if (currentView.tableType === "inventory") return inventoryItems;

    if (channelFilter === "Catálogo") {
      return soldItems.filter((item) => item.channel === "Catálogo");
    }

    if (channelFilter === "Live") {
      return soldItems.filter((item) => item.channel === "Live");
    }

    return soldItems;
  }, [currentView.tableType, channelFilter]);

  const toggleMenu = (menu: string) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  };

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-4 py-6 text-neutral-900 md:px-8 lg:px-10">
      <section className="mx-auto max-w-7xl">
        <header className="mb-6 flex items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl tracking-wide md:text-5xl">
              Hola, Astrid
            </h1>
            <p className="mt-2 text-base text-neutral-500">Hoy en Refit</p>
          </div>

          <div className="hidden text-right md:block">
            
            <p className="mt-1 text-xs tracking-[0.5em] text-neutral-500">
              Panel administrativo en desarrollo 
            </p>
          </div>
        </header>

        <section className="mb-6 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          <Sparkles className="h-5 w-5 text-neutral-500" />
          <input
            className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
            placeholder="Pregunta por ventas, apartados, catálogo o live selling..."
          />
          <button className="hidden rounded-xl bg-[#f1eee9] px-5 py-2 text-sm text-neutral-700 md:block">
            Asistente Vendra
          </button>
        </section>

        <section className="grid gap-6 lg:grid-cols-[390px_1fr]">
          <aside className="space-y-4">
        <PanelCard
                title="Resumen del día"
                isOpen={openMenu === "resumen"}
                onToggle={() => toggleMenu("resumen")}
                >
                {openMenu === "resumen" && (
                    <>
                    <MetricRow
                        label="Vendidas"
                        value="12"
                        active={activeView === "vendidas"}
                        onClick={() => setActiveView("vendidas")}
                    />
                    <MetricRow
                        label="Apartadas"
                        value="6"
                        active={activeView === "apartadas"}
                        onClick={() => setActiveView("apartadas")}
                    />
                    <MetricRow
                        label="Disponibles"
                        value="37"
                        active={activeView === "disponibles"}
                        onClick={() => setActiveView("disponibles")}
                    />

                    <DropdownNote>
                        Vista rápida del estado comercial del día.
                    </DropdownNote>
                    </>
                )}
                </PanelCard>


            <PanelCard
                title="Canales"
                isOpen={openMenu === "canales"}
                onToggle={() => toggleMenu("canales")}
                >
                {openMenu === "canales" && (
                    <>
                    <MetricRow
                        label="Catálogo digital"
                        value="7 ventas"
                        icon={<ShoppingBag className="h-4 w-4" />}
                        active={activeView === "catalogo"}
                        onClick={() => {
                        setActiveView("catalogo");
                        setChannelFilter("Catálogo");
                        }}
                    />
                    <MetricRow
                        label="Live selling"
                        value="5 ventas"
                        icon={<Radio className="h-4 w-4" />}
                        active={activeView === "live"}
                        onClick={() => {
                        setActiveView("live");
                        setChannelFilter("Live");
                        }}
                    />

                    <DropdownNote>
                        Catálogo y live selling se consultan desde el mismo panel.
                    </DropdownNote>
                    </>
                )}
                </PanelCard>


            <PanelCard
                    title="Leads"
                    isOpen={openMenu === "leads"}
                    onToggle={() => toggleMenu("leads")}
                    >
                    {openMenu === "leads" && (
                        <>
                        <MetricRow
                            label="Interesados"
                            value="12"
                            active={activeView === "leads"}
                            onClick={() => setActiveView("leads")}
                        />
                        <MetricRow
                            label="Pendientes"
                            value="3"
                            active={activeView === "pendientes"}
                            onClick={() => setActiveView("pendientes")}
                        />

                        <DropdownNote>
                            Solo resumen. La gestión completa pertenece a Exhiba.
                        </DropdownNote>
                        </>
                    )}
                    </PanelCard>


           <PanelCard
                title="Inventario"
                isOpen={openMenu === "inventario"}
                onToggle={() => toggleMenu("inventario")}
                >
                {openMenu === "inventario" && (
                    <>
                    <MetricRow
                        label="Registradas"
                        value="41"
                        active={activeView === "inventario"}
                        onClick={() => setActiveView("inventario")}
                    />
                    <MetricRow
                        label="Sin foto"
                        value="2"
                        active={activeView === "sin-foto"}
                        onClick={() => setActiveView("sin-foto")}
                    />

                    <DropdownNote>
                        Solo consulta. El inventario real será manejado por Vendra.
                    </DropdownNote>
                    </>
                )}
                </PanelCard>

          </aside>

          <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm md:p-8">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-serif text-4xl tracking-wide">
                    {currentView.title}
                  </h2>
                  <span className="rounded-xl bg-[#f1eee9] px-4 py-2 text-lg">
                    {currentView.badge}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <FilterChip
                    label="Todo"
                    active={channelFilter === "Todo"}
                    onClick={() => setChannelFilter("Todo")}
                  />
                  <FilterChip
                    label="Catálogo digital"
                    active={channelFilter === "Catálogo"}
                    onClick={() => setChannelFilter("Catálogo")}
                  />
                  <FilterChip
                    label="Live selling"
                    active={channelFilter === "Live"}
                    onClick={() => setChannelFilter("Live")}
                  />
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 py-3 text-sm text-neutral-600 md:w-auto">
                <Search className="h-4 w-4" />
                Buscar código
              </button>
            </div>

            <div className="mb-6 space-y-3 text-sm text-neutral-600">
              <div className="flex items-center gap-3">
                <Eye className="h-4 w-4 text-neutral-500" />
                <span>Vista de consulta</span>
              </div>

              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-neutral-500" />
                <span>Cambios de estado deshabilitados para vendedor</span>
              </div>
            </div>

            <DataTable rows={currentRows} type={currentView.tableType} />

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#d8ddf2] bg-[#f6f7ff] px-4 py-4 text-sm text-neutral-600">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#40549c]" />
              <p>{currentView.description}</p>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

function PanelCard({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-2xl">{title}</h3>

        <button
          onClick={onToggle}
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-800 hover:bg-[#f5f1eb]"
          aria-label={`Abrir opciones de ${title}`}
        >
          <Plus
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MetricRow({
  label,
  value,
  active,
  onClick,
  icon,
}: {
  label: string;
  value: string;
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
        active
          ? "border-l-4 border-[#9c7b60] bg-[#f4f0ea]"
          : "hover:bg-[#fbfaf7]"
      }`}
    >
      <span className="flex items-center gap-3 text-base">
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f2ede6] text-[#7f6048]">
            {icon}
          </span>
        )}
        {label}
      </span>

      <span className="flex items-center gap-3 text-base">
        {value}
        <ChevronRight className="h-4 w-4 text-neutral-500" />
      </span>
    </button>
  );
}

function DropdownNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl bg-[#fbfaf7] px-4 py-3 text-sm text-neutral-500">
      {children}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-5 py-2 text-sm transition ${
        active
          ? "border-[#ded6cc] bg-[#f1eee9] text-neutral-900"
          : "border-neutral-200 bg-white text-neutral-600 hover:bg-[#fbfaf7]"
      }`}
    >
      {label}
    </button>
  );
}

function DataTable({
  rows,
  type,
}: {
  rows: RowItem[];
  type: "sales" | "reserved" | "available" | "leads" | "inventory";
}) {
  if (type === "reserved") {
    return (
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <TableHeader columns={["Código", "Prenda", "Cliente", "Tiempo", "Estado"]} />

        <div className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-[1fr_1.4fr_1.2fr_1fr_1fr] items-center gap-4 px-4 py-4 text-sm"
            >
              <p>{row.code}</p>
              <p>{row.item}</p>
              <p>{row.client}</p>
              <p>{row.time}</p>
              <StatusPill status={row.status ?? "Apartada"} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "leads") {
    return (
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <TableHeader columns={["Código", "Consulta", "Cliente", "Canal", "Estado"]} />

        <div className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-[1fr_1.8fr_1.2fr_1fr_1fr] items-center gap-4 px-4 py-4 text-sm"
            >
              <p>{row.code}</p>
              <p>{row.item}</p>
              <p>{row.client}</p>
              <ChannelPill channel={row.channel ?? "Catálogo"} />
              <StatusPill status={row.status ?? "Interesada"} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "available" || type === "inventory") {
    return (
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <TableHeader columns={["Código", "Prenda", "Canal", "Talla", "Estado"]} />

        <div className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-[1fr_1.8fr_1fr_1fr_1fr] items-center gap-4 px-4 py-4 text-sm"
            >
              <p>{row.code}</p>
              <p>{row.item}</p>
              <ChannelPill channel={row.channel ?? "Catálogo"} />
              <p>{row.size}</p>
              <StatusPill status={row.status ?? "Disponible"} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <TableHeader columns={["Código", "Prenda", "Canal", "Hora", "Total"]} />

      <div className="divide-y divide-neutral-100">
        {rows.map((row) => (
          <div
            key={row.code}
            className="grid grid-cols-[1fr_1.8fr_1fr_1fr_1fr] items-center gap-4 px-4 py-4 text-sm"
          >
            <p>{row.code}</p>
            <p>{row.item}</p>
            <ChannelPill channel={row.channel ?? "Catálogo"} />
            <p>{row.time}</p>
            <p>{row.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TableHeader({ columns }: { columns: string[] }) {
  return (
    <div className="grid grid-cols-[1fr_1.8fr_1fr_1fr_1fr] gap-4 bg-[#fbfaf7] px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
      {columns.map((column) => (
        <p key={column}>{column}</p>
      ))}
    </div>
  );
}

function ChannelPill({ channel }: { channel: "Catálogo" | "Live" }) {
  return (
    <span
      className={`w-fit rounded-xl px-3 py-1 text-sm ${
        channel === "Live"
          ? "bg-[#eeedff] text-[#4f4a7f]"
          : "bg-[#f1eee9] text-[#6d5b4c]"
      }`}
    >
      {channel}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const className =
    status === "Confirmada"
      ? "bg-[#e8f4ec] text-[#2f6b43]"
      : status === "Por vencer"
        ? "bg-[#fff0e8] text-[#a24b23]"
        : status === "Disponible"
          ? "bg-[#eef7ef] text-[#377246]"
          : status === "Sin foto"
            ? "bg-[#fff6df] text-[#8a6414]"
            : "bg-[#f1eee9] text-[#6d5b4c]";

  return (
    <span className={`w-fit rounded-xl px-3 py-1 text-sm ${className}`}>
      {status}
    </span>
  );
}
