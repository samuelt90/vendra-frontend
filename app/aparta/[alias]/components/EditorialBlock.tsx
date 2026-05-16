"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  documentId: string;
  Text: string;
  price: number;
  Image?: string | null;
};

type Props = {
  emoji: string;
  title: string;
  products: Product[];
  storeAlias: string;
};

export default function EditorialBlock({
  emoji,
  title,
  products,
  storeAlias,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = useMemo(() => {
    const groups = [];

    for (let i = 0; i < products.length; i += 3) {
      groups.push(products.slice(i, i + 3));
    }

    return groups;
  }, [products]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!products.length) return null;

  const currentSlide = slides[activeIndex];
  const mainProduct = currentSlide[0];
  const secondaryProducts = currentSlide.slice(1, 3);

  return (
    <section className="mb-12">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
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
                <img
                  src={mainProduct.Image}
                  alt={mainProduct.Text}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            <div className="p-4">
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
        <div className="grid gap-4">
          {secondaryProducts.map((product) => (
            <Link
              key={product.documentId}
              href={`/aparta/${storeAlias}/detail/${product.documentId}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-40 bg-gray-50 md:h-40">
                {product.Image && (
                  <img
                    src={product.Image}
                    alt={product.Text}
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

      {/* INDICADORES */}
      {slides.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition ${
                activeIndex === index ? "w-6 bg-green-600" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
