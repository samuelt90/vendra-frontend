import { getStoreBySlug } from "@/lib/strapi";

type ProductPageProps = {
  params: {
    alias: string;
    codigo: string; // aquí realmente es el id del producto
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { alias, codigo } = params;

  const store = await getStoreBySlug(alias);

  if (!store) {
    return <h1 className="text-red-500 p-4">Tienda no encontrada</h1>;
  }

  const product = store.products?.find(
    (p: any) => String(p.id) === String(codigo)
  );

  if (!product) {
    return <h1 className="text-red-500 p-4">Producto no encontrado</h1>;
  }

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">{product.Text}</h1>
      <p className="text-lg">Precio: Q{product.price}</p>

      <a
        href={`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(
          `Hola, quiero comprar:\n\nProducto: ${product.Text}\nPrecio: Q${product.price}\nCantidad: 1`
        )}`}
        target="_blank"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Comprar por WhatsApp
      </a>
    </main>
  );
}
