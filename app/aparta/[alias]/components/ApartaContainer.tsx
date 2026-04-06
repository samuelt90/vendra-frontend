"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ApartaContainer() {
  const params = useParams<{ alias: string }>();
  const router = useRouter();

  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    if (!params?.alias) return;

    const fetchData = async () => {
      try {
        const storeRes = await fetch(
          `${STRAPI}/api/aparta-stores?filters[slug][$eq]=${params.alias}`
        );
        const storeJson = await storeRes.json();
        const storeData = storeJson.data?.[0];

        setStore(storeData);

        // 🔥 BLOQUE CORREGIDO (fetch filtrado por tienda)
        const prodRes = await fetch(
          `${STRAPI}/api/aparta-products?filters[aparta_product][id][$eq]=${storeData.id}&populate=Imagen`
        );

        const prodJson = await prodRes.json();

        const mapped = prodJson.data.map((p: any) => {
          const attrs = p.attributes || p;

          const imageUrl =
            attrs.Imagen?.data?.[0]?.attributes?.url
              ? `${STRAPI}${attrs.Imagen.data[0].attributes.url}`
              : attrs.Imagen?.[0]?.url
              ? `${STRAPI}${attrs.Imagen[0].url}`
              : null;

          return {
            documentId: p.documentId || p.id,
            Text: attrs.Text,
            price: attrs.price,
            estado: attrs.estado,
            Image: imageUrl,
          };
        });

        setProducts(mapped.filter((p: any) => p.estado !== "apartado"));
        // 🔥 FIN BLOQUE CORREGIDO

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [params?.alias]);

  if (!store) return <div className="p-4">Cargando...</div>;

  return (
    <main className="max-w-md mx-auto p-4">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="font-semibold">{store.name}</h1>
          <p className="text-sm text-gray-500 italic">
            {store.descripcion}
          </p>
        </div>

        <a
          href={`https://wa.me/${store.whatsapp}`}
          target="_blank"
          className="bg-green-600 text-white px-3 py-2 rounded-full text-sm"
        >
          WhatsApp
        </a>
      </div>

      {/* TITULO */}
      <h2 className="text-sm text-gray-600 mb-3">Productos</h2>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <div
            key={product.documentId}
            className="bg-white rounded-2xl shadow-md p-3 transition hover:shadow-lg hover:scale-[1.02]"
          >
            {/* Imagen */}
            {product.Image && (
              <img
                src={product.Image}
                className="w-full h-auto rounded-lg mb-2"
                loading={index <4 ? "eager": "lazy"}
              />
            )}

            {/* Precio */}
            <p className="font-bold text-sm mb-1">
              Q{product.price}
            </p>

            {/* Nombre */}
            <p className="text-sm mb-2 line-clamp-2">
              {product.Text}
            </p>

            {/* Botón */}
            <button
              onClick={() =>
                router.push(
                  `/aparta/${params.alias}/detail/${product.documentId}`
                )
              }
              className="w-full bg-green-600 text-white py-2 rounded-xl text-sm font-semibold transition hover:text-base"
            >
              Ver detalles →
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
