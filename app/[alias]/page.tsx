export const dynamic = "force-dynamic";

type StorePageProps = {
  params: {
    alias: string;
  };
};

async function getStoreByAlias(alias: string) {
 const url =
  `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stores` +
  `?filters[slug][$eq]=${encodeURIComponent(alias)}` +
  `&populate=products`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Error al llamar a Strapi: ${res.status}`);
  }

  return res.json();
}

export default async function StorePage(props: any) {
  const params = await props.params;
  const { alias } = params;

  console.log("alias desde StorePage:", alias); // para verificar

  let data: any = null;
  let error: string | null = null;

  try {
    data = await getStoreByAlias(alias);
  } catch (e: any) {
    error = e.message;
  }

  const store = data?.data?.[0];
  const products = store?.products ?? [];

  if (error || !store) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center space-y-4">
        <h1 className="text-xl font-semibold text-red-600">
          Tienda no encontrada
        </h1>

        <p className="text-sm text-gray-600">
          El enlace que abriste no corresponde a una tienda activa en Vendra.
        </p>

        {alias && (
          <p className="text-xs text-gray-400">
            Alias solicitado: <span className="font-mono">{alias}</span>
          </p>
        )}

        {error && (
          <p className="text-xs text-gray-400">
            Detalle técnico (solo para pruebas): {error}
          </p>
        )}

        <a
          href="/"
          className="inline-block mt-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
        >
          Volver al inicio
        </a>
      </div>
    </main>
  );
}


  return (
    <main className="p-4 space-y-6">
      {/* Header tienda */}
  <div className="flex items-start gap-4 mb-2">
    {/* Logo / cover */}
    <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
      {store.cover?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${store.cover.url}`}
          alt={store.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-[10px] text-gray-400 text-center px-1">
          Sin imagen
        </span>
      )}
    </div>

    {/* Info texto */}
    <div className="flex-1 space-y-1">
      <h1 className="text-2xl font-semibold">{store.name}</h1>

  
      <p className="text-xs text-gray-500">
        WhatsApp: <span className="font-mono">{store.whatsapp}</span>
      </p>

    {store.description && (
      <p className="mt-2 text-sm text-gray-700">
        {store.description}
      </p>
        )}
      
    </div>
  </div>


      {/* Productos */}
      <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-6">
        <h2 className="font-semibold">Productos</h2>

        {products.map((p: any) => {
          const image = p.image?.[0];

          return (
            <div
              key={p.id}
              className="border border-gray-200 rounded-lg p-3 flex gap-4 items-center transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-100"
            >
              {/* Imagen */}
              <div className="w-20 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
                {image ? (
                 
                 <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.url}`}
                    alt={p.Text}
                    className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center text-center"
                  />
                ) : (
                  <div className="text-xs text-gray-400 italic leading-tight">
                    Imagen no disponible
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-900">{p.Text}</p>
                <p className="text-sm font-semibold text-gray-600">Q{p.price}</p>
              </div>

              {/* Acción */}
              <a
                href={`/p/${p.documentId}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Ver detalles
              </a>
            </div>
          );
        })}
      </div>
    </main>
  );
}
