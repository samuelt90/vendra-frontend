"use client";

import { useEffect, useState } from "react";
import { DocumentIcon } from "./icons/ImportadoraIcons";

const FAQS = [
  {
    question: "¿La cotización es exacta?",
    answer:
      "No. Es una referencia inicial. El monto puede variar según el lote, condición del vehículo, flete, impuestos, tipo de cambio y gastos finales de importación.",
  },
  {
    question: "¿Para qué sirve el anticipo?",
    answer:
      "Sirve para confirmar el interés del cliente y permitir que la importadora gestione la búsqueda, revisión o participación según el vehículo elegido.",
  },
  {
    question: "¿Qué pasa si no se gana la opción buscada?",
    answer:
      "La importadora puede revisar opciones similares y continuar el proceso con otro vehículo, según lo acordado directamente con el cliente.",
  },
  {
    question: "¿Cuánto tarda una importación?",
    answer:
      "El tiempo depende del origen, naviera, aduana, reparaciones y trámites. La importadora debe confirmar el plazo aproximado según cada caso.",
  },
];

export default function ImportadoraFaq() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop */}
      <section className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_60px_rgba(0,0,0,0.34)] lg:block">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b] shadow-[0_0_30px_rgba(245,158,11,0.12)]">
              <DocumentIcon className="h-7 w-7" />
            </div>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#f59e0b]">
              Preguntas frecuentes
            </p>

            <h2 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-white">
              Resuelve tus dudas antes de avanzar
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/52">
              Conoce qué puede variar en una cotización, cómo funciona el
              anticipo y qué ocurre durante una importación.
            </p>
          </div>

          <FaqList />
        </div>
      </section>

      {/* Botón flotante móvil */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="importadora-mobile-faq"
        className="fixed bottom-5 right-4 z-50 inline-flex items-center gap-2 rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b] px-4 py-3 text-sm font-black text-black shadow-[0_18px_45px_rgba(245,158,11,0.34)] transition active:scale-[0.97] lg:hidden"
      >
        <DocumentIcon className="h-5 w-5" />
        Preguntas frecuentes
      </button>

      {/* Panel móvil */}
      {isOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Cerrar preguntas frecuentes"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
          />

          <section
            id="importadora-mobile-faq"
            role="dialog"
            aria-modal="true"
            aria-labelledby="importadora-mobile-faq-title"
            className="absolute inset-x-0 bottom-0 max-h-[84dvh] overflow-y-auto rounded-t-[2rem] border-t border-white/12 bg-[#07111d] px-4 pb-[calc(env(safe-area-inset-bottom)+20px)] pt-4 shadow-[0_-24px_80px_rgba(0,0,0,0.62)]"
          >
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/15" />

            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]">
                  <DocumentIcon className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f59e0b]">
                    Antes de avanzar
                  </p>

                  <h2
                    id="importadora-mobile-faq-title"
                    className="mt-1 text-2xl font-black tracking-[-0.04em] text-white"
                  >
                    Preguntas frecuentes
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-white/45">
                    Revisa las dudas más comunes sobre la importación.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] text-xl text-white/70 active:scale-[0.97]"
              >
                ×
              </button>
            </div>

            <FaqList />

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#f59e0b] px-4 py-3.5 text-sm font-black text-black active:scale-[0.98]"
            >
              Entendido
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}

function FaqList() {
  return (
    <div className="space-y-3">
      {FAQS.map((item) => (
        <details
          key={item.question}
          className="group rounded-[1.35rem] border border-white/10 bg-[#0b1118] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-white [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] text-lg font-light text-[#f59e0b] transition group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-4 border-t border-white/8 pt-4 text-xs leading-6 text-white/52">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
