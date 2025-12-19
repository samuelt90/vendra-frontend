export default function LoadingProduct() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
        <p className="text-base font-medium">Cargando producto…</p>
        <p className="text-sm text-gray-600">
          Estamos obteniendo la información del producto.
        </p>
      </div>
    </main>
  );
}