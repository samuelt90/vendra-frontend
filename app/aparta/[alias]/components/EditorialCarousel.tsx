"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";

type Product = {
  documentId: string;
  Text: string;
  price: number;
  Image?: string | null;
};

type EditorialSection = {
  emoji: string;
  title: string;
  products: Product[];
};

type Props = {
  storeAlias: string;
  sections: EditorialSection[];
};

export default function EditorialCarousel({ storeAlias, sections }: Props) {
  const validSections = useMemo(
    () => sections.filter((section) => section.products.length > 0),
    [sections]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (validSections.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [validSections.length]);

  if (!validSections.length) return null;

  const activeSection = validSections[activeIndex];
  const products = activeSection.products.slice(0, 3);

  const mainProduct = products[0];
  const secondaryProducts = products.slice(1, 3);

  return (
    <section className="mb-10">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{activeSection.emoji}</span>
          <h2 className="text-xl font-bold text-gray-900">
            {activeSection.title}
          </h2>
        </div>

        <div className="flex gap-2">
          {validSections.map((section, index) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition ${
                activeIndex === index
                  ? "w-6 bg-green-600"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* BLOQUE EDITORIAL */}
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {/* PRODUCTO PRINCIPAL */}
        {mainProduct && (
          <Link
            href={`/aparta/${storeAlias}/detail/${mainProduct.documentId}`}
            className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-72 bg-gray-50 md:h-96">
              {mainProduct.Image && (
                <Image
                  src={getImageUrl(mainProduct.Image)}
                  alt={mainProduct.Text}
                  width={900}
                  height={1200}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="p-4 text-center">
              <p className="text-lg font-bold text-black">
                Q{mainProduct.price}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {mainProduct.Text}
              </p>
            </div>
          </Link>
        )}

        {/* PRODUCTOS SECUNDARIOS */}
        <div className="hidden gap-4 md:grid">
          {secondaryProducts.map((product) => (
            <Link
              key={product.documentId}
              href={`/aparta/${storeAlias}/detail/${product.documentId}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-40 bg-gray-50">
                {product.Image && (
                  <Image
                    src={getImageUrl(product.Image)}
                    alt={product.Text}
                    width={600}
                    height={800}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              <div className="p-3">
                <p className="font-bold text-black">Q{product.price}</p>

                <p className="mt-1 line-clamp-1 text-sm text-gray-600">
                  {product.Text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
