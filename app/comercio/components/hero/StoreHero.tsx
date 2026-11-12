
"use client";

import { useState } from "react";

import HeroContent from "./HeroContent";
import HeroScene from "./HeroScene";

import { commerceProducts } from "../../data/products";

// Cinco productos reales para el Hero.
// El catálogo completo permanece en /comercio/tienda.
const featuredProducts = commerceProducts.slice(0, 5);

export default function StoreHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = featuredProducts[activeIndex];

  if (!activeProduct) return null;

  return (
    <section
      id="comercio-hero"
      className="
        relative isolate
        min-w-0 overflow-hidden
        bg-[var(--commerce-bg)]
        text-[var(--commerce-ink)]
      "
    >
      {/* Ambiente del Hero */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute right-[-18%] top-[25%]
          h-[440px] w-[440px]
          rounded-full
          bg-[var(--commerce-accent)]
          opacity-[0.045]
          blur-[110px]
          md:right-[3%] md:top-[10%]
          md:h-[650px] md:w-[650px]
        "
      />

      <div
        className="
          relative mx-auto
          grid w-full max-w-[1600px]
          min-w-0
          grid-cols-1
          gap-4
          px-[var(--commerce-page-x)]
          pb-12 pt-28
          sm:pt-32
          md:min-h-[min(900px,100svh)]
          md:grid-cols-12
          md:items-center
          md:gap-6
          md:pb-16
          md:pt-32
          lg:gap-10
        "
      >
        {/* Mensaje comercial */}

        <div
          className="
            relative z-20 min-w-0
            md:col-span-6
            lg:col-span-6
          "
        >
          <HeroContent />
        </div>

        {/* Producto protagonista + selector */}

        <div
          className="
            relative z-10 min-w-0
            md:col-span-6
            lg:col-span-6
          "
        >
          <HeroScene
            products={featuredProducts}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </div>

      {/* Línea de transición */}

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0
          h-px bg-[var(--commerce-line)]
        "
      />
    </section>
  );
}
