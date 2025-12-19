export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center flex flex-col gap-3">
        <p className="text-lg font-semibold">Producto no disponible</p>
        <p className="text-sm text-gray-600">
          Este producto no existe o ya no está disponible en esta tienda.
        </p>
      </div>
    </main>
  );
}