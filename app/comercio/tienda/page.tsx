import { Suspense } from "react";

import CommerceStore from "../components/store/CommerceStore";

function StoreFallback() {
  return (
    <main
      className="
        min-h-screen
        bg-[var(--commerce-paper)]
        px-[var(--commerce-page-x)]
        py-20
      "
    >
      <div className="mx-auto max-w-[1600px]">
        <p
          className="
            commerce-sans
            text-[0.78rem]
            text-[var(--commerce-muted)]
          "
        >
          Preparando productos…
        </p>
      </div>
    </main>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<StoreFallback />}>
      <CommerceStore />
    </Suspense>
  );
}
