"use client";

import CommercialStage from "./CommercialStage";

export default function CommercialSection() {
  return (
<section
  data-commercial-section
  className="
    relative
    h-[165svh]
    bg-[var(--commerce-bg)]
    text-[var(--commerce-ink)]
    md:h-[160svh]
  "
>
      <div
        className="
          sticky
          top-0
          flex
          h-[100svh]
          items-center
          overflow-hidden
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1600px]
            px-[var(--commerce-page-x)]
          "
        >
          <CommercialStage />
        </div>
      </div>
    </section>
  );
}
