import { getProductById } from "@/lib/strapi";
import CheckoutForm from "@/app/components/CheckoutForm";
type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let product: any = null;
  let error: string | null = null;

  try {
    product = await getProductById(id);
  } catch (e: any) {
    error = e?.message ?? "Error al cargar producto";
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center space-y-4">
          <h1 className="text-xl font-semibold text-red-600">
            Producto no disponible
          </h1>

          <p className="text-sm text-gray-600">
            Es posible que este producto se haya agotado o que el enlace no sea válido.
          </p>

          <a
            href="/tienda"
            className="inline-block px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
          >
            Volver a la tienda
          </a>
        </div>
      </main>
    );
  }


  const store = product.store;

  const message = `
Hola, quiero comprar:
Producto: ${product.Text}
Precio unitario: Q${product.price}
Cantidad: 1
Total: Q${product.price}
Tienda: ${store.name}
`;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {product.Text}
          </h1>
          <p className="text-lg font-bold text-green-600">
            Q{product.price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Tienda: {store.name}
          </p>
        </div>

        <CheckoutForm
          store={{
            name: store.name,
            whatsapp: store.whatsapp,
          }}
          product={{
            Text: product.Text,
            code: product.code,
            price: product.price,
          }}
        />

        <a
          href="/tienda"
          className="block text-center text-sm text-blue-600 hover:text-blue-800"
        >
          ← Volver a la tienda
        </a>
      </div>
    </main>
  );
}
