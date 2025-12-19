export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-gray-900 animate-spin" />
        <p className="text-base font-medium">Cargando tienda…</p>
        <p className="text-sm text-gray-600">
          Estamos obteniendo el catálogo y la información de la tienda.
        </p>
      </div>
    </main>
  );
}