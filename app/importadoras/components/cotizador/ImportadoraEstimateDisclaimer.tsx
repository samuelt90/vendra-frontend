import {
  DocumentIcon,
  ShieldIcon,
} from "../icons/ImportadoraIcons";

export default function ImportadoraEstimateDisclaimer() {
  return (
    <section className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_50px_rgba(0,0,0,0.28)] md:p-6">
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#f59e0b]/25 bg-[#f59e0b]/10 text-[#f59e0b]">
          <DocumentIcon className="h-6 w-6" />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.17em] text-[#f59e0b]">
            Importante
          </p>

          <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
            Estos resultados son una referencia preliminar
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/52">
            El monto final puede variar según la unidad disponible, su
            condición, el precio de subasta, transporte, impuestos,
            reparaciones y otros costos asociados a la importación.
          </p>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/10 bg-[#07111d]/65 p-4">
            <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#f59e0b]" />

            <p className="text-xs leading-5 text-white/48">
              La importadora revisará cada caso antes de confirmar una
              cotización o recomendar avanzar con una compra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
