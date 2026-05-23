import type { LucideIcon } from "lucide-react";

type FaqItem = {
  icon: LucideIcon;
  question: string;
  answer: string;
};

type FaqBlockProps = {
  title?: string;
  items: FaqItem[];
};

export default function FaqBlock({
  title = "Preguntas frecuentes",
  items,
}: FaqBlockProps) {
  return (
    <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <details
              key={item.question}
              className="group rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm">
                  <Icon size={18} />
                </span>

                <span className="flex-1 text-sm font-medium text-gray-800">
                  {item.question}
                </span>

                <span className="text-lg leading-none text-gray-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 pl-12 text-sm leading-relaxed text-gray-500">
                {item.answer}
              </p>
            </details>
          );
        })}
      </div>
    </section>
  );
}