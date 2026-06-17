export default function EmptyVehiclesState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl shadow-sm">
        🚗
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-950">
        No hay vehículos disponibles
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        Este predio todavía no tiene vehículos publicados o todos fueron
        marcados como vendidos.
      </p>
    </div>
  );
}