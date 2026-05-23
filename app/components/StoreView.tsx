import Link from "next/link";
import Image from "next/image";
import { getStoreBySlug } from "@/lib/strapi";
import { getImageUrl } from "@/lib/getImageUrl";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";

function cleanPhone(phone?: string) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

export default async function StoreView({ slug }: { slug: string }) {
  const store = await getStoreBySlug(slug);

  if (!store) {
    return (
      <div className="min-h-screen bg-[#f7f8f5] px-4 py-6">
        <p className="text-sm text-red-600">
          Tienda no encontrada <br />
          Slug solicitado: <b>{slug}</b>
        </p>
      </div>
    );
  }

  const storeCoverRaw =
    store?.attributes?.cover?.data?.attributes ??
    store?.attributes?.cover ??
    store?.cover ??
    null;

  const storeCoverUrl = getImageUrl(getStrapiMediaUrl(storeCoverRaw));

  const storeName = store?.attributes?.name ?? store?.name ?? "Tienda";
  const storeSlug = store?.attributes?.slug ?? store?.slug ?? slug;
  const storeDesc = store?.attributes?.description ?? store?.description ?? "";
  const storeWhatsapp = store?.attributes?.whatsapp ?? store?.whatsapp ?? "";

  const wa = cleanPhone(storeWhatsapp);
  const waLink = wa ? `https://wa.me/${wa}` : null;

  const products = (store.products ?? store.attributes?.products?.data ?? []) as any[];

  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <div className="mx-auto w-full max-w-3xl px-4 py-5">
        {/* Cover */}
        {storeCoverUrl && (
          <Image
            src={storeCoverUrl}
            alt={`${storeName} cover`}
            width={1200}
            height={400}
            className="mb-4 h-40 w-full rounded-2xl object-cover sm:h-52"
            priority
          />
        )}

        {/* Header tienda */}
        <div className="mb-4 rounded-2xl bg-white/90 p-4 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{storeSlug}</h1>

            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
              >
                WhatsApp
              </a>
            )}
          </div>

          {storeDesc && (
            <p className="mt-1 text-base italic text-slate-600">{storeDesc}</p>
          )}

          {storeWhatsapp && (
            <p className="mt-3 text-xs text-slate-500">
              WhatsApp:{" "}
              <span className="font-medium text-slate-700">
                {storeWhatsapp}
              </span>
            </p>
          )}
        </div>

        {/* Productos */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Productos</h2>
        </div>

        {products.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((p: any, index: number) => {
              const pa = p?.attributes ?? p;

              const productImageRaw =
                pa?.Image?.data?.[0]?.attributes ??
                pa?.Image?.[0] ??
                pa?.Image?.data?.attributes ??
                pa?.Image ??
                pa?.image ??
                pa?.images?.[0] ??
                null;

              const productImgUrl = getImageUrl(
                getStrapiMediaUrl(productImageRaw)
              );

              const productId =
                pa?.documentId ?? p?.documentId ?? p?.id ?? pa?.id;

              const href = `/tienda/${slug}/p/${productId}`;

              return (
                <li key={productId} className="group">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    {/* Imagen */}
                    <div className="relative mb-3 h-36 overflow-hidden rounded-xl bg-slate-100 sm:h-40">
                      <div className="absolute inset-0 bg-slate-200 animate-pulse" />

                      {productImgUrl && (
                        <Image
                          src={productImgUrl}
                          alt={pa?.Text || "Producto"}
                          width={600}
                          height={800}
                          className="absolute inset-0 h-full w-full object-contain"
                          priority={index < 4}
                        />
                      )}
                    </div>

                    {/* Precio + nombre */}
                    <div className="space-y-1">
                      <div className="text-base font-bold text-slate-900">
                        Q{pa?.price}
                      </div>

                      <div className="line-clamp-2 text-sm text-slate-700">
                        {pa?.Text}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-3">
                      <Link
                        href={href}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        Ver detalles <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm ring-1 ring-black/5">
            No hay productos.
          </div>
        )}
      </div>
    </main>
  );
}
