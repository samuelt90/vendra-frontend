import type { PredioFilters } from "@/lib/predios/types";

type FilterOptions = {
  marcas: string[];
  modelos: string[];
  anios: string[];
  transmisiones: string[];
  combustibles: string[];
  estados: string[];
};

type Props = {
  filters: PredioFilters;
  options: FilterOptions;
  onChange: (name: keyof PredioFilters, value: string) => void;
  onClear: () => void;
};

function SelectField({
  label,
  value,
  options,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-slate-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold normal-case text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}

function NumberField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-slate-500">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="numeric"
        placeholder={placeholder}
        className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold normal-case text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </label>
  );
}

export default function PredioVehicleFilters({
  filters,
  options,
  onChange,
  onClear,
}: Props) {
  return (
    <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-800">
            DATOS DEL VEHÍCULO
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Ajusta los datos principales para encontrar vehículos específicos.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
        >
          Limpiar
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
  <SelectField
    label="Marca"
    value={filters.marca}
    options={options.marcas}
    placeholder="Todas"
    onChange={(value) => onChange("marca", value)}
  />

  <SelectField
    label="Año"
    value={filters.anio}
    options={options.anios}
    placeholder="Todos"
    onChange={(value) => onChange("anio", value)}
  />

  <SelectField
    label="Combustible"
    value={filters.combustible}
    options={options.combustibles}
    placeholder="Todos"
    onChange={(value) => onChange("combustible", value)}
  />

  <div className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-3">
    <NumberField
      label="Precio mín."
      value={filters.precioMin}
      placeholder="50000"
      onChange={(value) => onChange("precioMin", value)}
    />

    <NumberField
      label="Precio máx."
      value={filters.precioMax}
      placeholder="150000"
      onChange={(value) => onChange("precioMax", value)}
    />
  </div>
</div>
    </div>
  );
}
