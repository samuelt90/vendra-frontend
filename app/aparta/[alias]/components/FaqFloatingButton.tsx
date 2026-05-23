"use client";

import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import FaqBlock from "./FaqBlock";
import { apartaFaqItems } from "./faqItems";

export default function FaqFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition active:scale-95"
      >
        <HelpCircle size={18} />
        Ayuda
      </button>

      {/* MODAL / BOTTOM SHEET */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 sm:items-center">
          <div className="relative max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-4 shadow-xl sm:rounded-3xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
            >
              <X size={18} />
            </button>

            <div className="pt-8">
              <FaqBlock items={apartaFaqItems} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}