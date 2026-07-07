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
    <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-slate-400">
      {label}

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border border-white/20 bg-slate-950/70 px-3 text-sm font-bold normal-case text-[#F8FAFC] outline-none transition focus:border-white/40 focus:ring-2 focus:ring-white/15"
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
    <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-slate-400">
      {label}

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="numeric"
        placeholder={placeholder}
        className="h-11 rounded-xl border border-white/20 bg-slate-950/70 px-3 text-sm font-bold normal-case text-[#F8FAFC] outline-none transition placeholder:text-slate-500 focus:border-white/40 focus:ring-2 focus:ring-white/15"
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
    <div className="rounded-3xl border border-white/20 bg-white/[0.075] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_10px_24px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur-md">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-[#F8FAFC]">
            DATOS DEL VEHÍCULO
          </h3>

          <p className="mt-1 text-xs font-medium text-slate-400">
            Ajusta los datos principales para encontrar vehículos específicos.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-white/20 bg-white/[0.075] px-3 py-2 text-xs font-black text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_18px_rgba(0,0,0,0.24)] ring-1 ring-white/10 transition hover:border-white/30 hover:bg-white/[0.1] active:scale-[0.99]"
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

          <div className="grid grid-cols-1 gap-3 sm:col-span-2 sm:grid-cols-2 lg:col-span-3">
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
