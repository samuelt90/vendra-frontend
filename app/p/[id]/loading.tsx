export default function LoadingProduct() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        <p className="text-sm text-gray-600">
          Cargando producto…
        </p>
      </div>
    </main>
  );
}