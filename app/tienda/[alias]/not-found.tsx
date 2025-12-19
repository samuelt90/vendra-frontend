export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center flex flex-col gap-3">
        <p className="text-lg font-semibold">Tienda no encontrada</p>
        <p className="text-sm text-gray-600">
          La tienda que estás buscando no existe o ya no está disponible.
        </p>
      </div>
    </main>
  );
}