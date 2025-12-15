const STRAPI_URL = "http://localhost:1337";

type StoreViewProps = {
  slug: string; // slug de la tienda en Strapi (ej: "tienda", "homeoutlet")
};

async function getStoreBySlug(slug: string) {
  const url =
    `${STRAPI_URL}/api/stores` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[products][populate]=image`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al llamar a Strapi");
  }

  return res.json();
}

export default async function StoreView({ slug }: StoreViewProps) {
  let data: any = null;
  let error: string | null = null;

  try {
    data = await getStoreBySlug(slug);
  } catch (e: any) {
    error = e.message;
  }

  const store = data?.data?.[0];
  const products = store?.products ?? [];

  if (error || !store) {
    return (
      <main className="p-4">
        <h1 className="text-red-500 font-semibold">Tienda no encontrada</h1>
        <p className="text-sm text-gray-500 mt-1">
          Slug solicitado: <strong>{slug}</strong>
        </p>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-6">
      {/* Header tienda */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{store.name}</h1>
        <p className="text-sm text-gray-600">WhatsApp: {store.whatsapp}</p>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900">Productos</h2>

        {products.map((p: any) => {
          const image = p.image?.[0];

          return (
            <div
              key={p.documentId ?? p.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-6 transition-shadow duration-150 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100"
            >
              {/* Imagen */}
              <div className="w-20 h-20 shrink-0 bg-gray-100 rounded flex items-center justify-center text-center overflow-hidden">
                {image ? (
                  <img
                    src={`${STRAPI_URL}${image.url}`}
                    alt={p.Text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-xs text-gray-400 italic leading-tight">
                    Imagen no disponible
                  </p>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900">
                  {p.Text}
                </p>
                <p className="text-sm font-bold text-green-600">
                  Q{p.price}
                </p>
              </div>

              {/* Acción */}
              <div className="shrink-0">
                <a
                  href={`/p/${p.documentId}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Ver detalles →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
