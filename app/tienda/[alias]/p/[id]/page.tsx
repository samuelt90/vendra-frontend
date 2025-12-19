import { getProductById } from "@/lib/strapi";
import Link from "next/link";
import AddToCartButton from "@/app/components/cart/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ alias: string; id: string }>;
}) {
  const { alias, id } = await params;

  const product = await getProductById(id);
  const a = product;

  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const imgRel =
    a.Image?.data?.[0]?.attributes?.url ??
    a.Image?.[0]?.url ??
    a.image?.url ??
    a.images?.[0]?.url ??
    null;

  const productImgUrl = imgRel ? `${STRAPI_URL}${imgRel}` : null;

  return (
    <main className="min-h-[calc(100vh-0px)] bg-[#f6f7f9] px-4 py-6">
      {/* contenedor centrado */}
      <section className="mx-auto w-full max-w-xl">
        {/* Card */}
        <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
          {/* Imagen */}
          {productImgUrl && (
            <div className="mx-auto w-full max-w-[340px]">
              <img
                src={productImgUrl}
                alt={a.Text || "Producto"}
                className="w-full h-[320px] sm:h-[360px] object-contain rounded-2xl bg-white"
              />
            </div>
          )}

          {/* Info centrada */}
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">{a.Text || "Producto"}</p>

            <div className="mt-1 text-3xl font-semibold text-slate-900">
              Q{a.price}
            </div>

            {a.description && (
              <p className="mt-3 text-sm leading-6 text-slate-600 mb-4">
                {a.description}
              </p>
            )}
          </div>

          <AddToCartButton
            documentId={a.documentId}
            Text={a.Text}
            price={a.price}
          />

          {/* Volver a tienda (mismo estilo de botón) */}
          <div className="mt-4 flex justify-center">
            <Link
              href={`/tienda/${alias}`}
              className="
                inline-flex items-center justify-center gap-2
                w-full max-w-sm
                rounded-full
                bg-slate-100 px-4 py-3
                text-sm font-semibold text-slate-800
                ring-1 ring-black/5
                transition
                hover:bg-slate-200
                active:scale-[0.99]
              "
            >
              <span aria-hidden>←</span>
              Volver a la tienda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
