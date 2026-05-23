import { getProductById } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/app/components/cart/AddToCartButton";
import { getImageUrl } from "@/lib/getImageUrl";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ alias: string; id: string }>;
}) {
  const { alias, id } = await params;

  const product = await getProductById(id);
  const a = product;

  const productImageRaw =
    a?.Image?.data?.[0]?.attributes ??
    a?.Image?.[0] ??
    a?.Image?.data?.attributes ??
    a?.Image ??
    a?.image ??
    a?.images?.[0] ??
    null;

  const productImgUrl = getImageUrl(getStrapiMediaUrl(productImageRaw));

  return (
    <main className="min-h-screen bg-[#f6f7f9] px-4 py-6">
      <section className="mx-auto w-full max-w-xl">
        <div className="rounded-3xl bg-white/90 p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
          {/* Imagen */}
          {productImgUrl && (
            <div className="mx-auto w-full max-w-[340px]">
              <Image
                src={productImgUrl}
                alt={a?.Text || "Producto"}
                width={700}
                height={900}
                className="h-[320px] w-full rounded-2xl bg-white object-contain sm:h-[360px]"
                priority
              />
            </div>
          )}

          {/* Info centrada */}
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500">{a?.Text || "Producto"}</p>

            <div className="mt-1 text-3xl font-semibold text-slate-900">
              Q{a?.price}
            </div>

            {a?.description && (
              <p className="mb-4 mt-3 text-sm leading-6 text-slate-600">
                {a.description}
              </p>
            )}
          </div>

          <AddToCartButton
            documentId={a.documentId}
            Text={a.Text}
            price={a.price}
            storeSlug={alias}
          />

          {/* Volver a tienda */}
          <div className="mt-4 flex justify-center">
            <Link
              href={`/tienda/${alias}`}
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-black/5 transition hover:bg-slate-200 active:scale-[0.99]"
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
