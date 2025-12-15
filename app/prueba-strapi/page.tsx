export const dynamic = 'force-dynamic';

async function getData() {
  const res = await fetch(
    'http://localhost:1337/api/stores?filters[slug][$eq]=tienda&populate=products',
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al llamar a Strapi: ${res.status} - ${text}`);
  }

  return res.json();
}

export default async function PruebaStrapiPage() {
  const data = await getData();

  // 👇 aquí procesamos la respuesta
  const store = data?.data?.[0];
  const products = store?.products ?? [];

  return (
    <main style={{ padding: 16 }}>
      <h1>Prueba Strapi (aislada)</h1>
      <p>Esta página solo muestra lo que responde Strapi.</p>

      {/* Vista procesada */}
      <section style={{ marginTop: 24, marginBottom: 24 }}>
        <h2>Tienda</h2>
        {store ? (
          <>
            <p><strong>Nombre:</strong> {store.name}</p>
            <p><strong>WhatsApp:</strong> {store.whatsapp}</p>

            <h3>Productos</h3>
            {products.length === 0 && <p>No hay productos.</p>}
            <ul>
              {products.map((p: any) => (
                <li key={p.id}>
                  {p.Text} — Q{p.price}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No se encontró tienda.</p>
        )}
      </section>

      {/* JSON crudo para ver estructura */}
      <h2>JSON crudo</h2>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          border: '1px solid #ccc',
          padding: 12,
          borderRadius: 8,
          marginTop: 12,
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
