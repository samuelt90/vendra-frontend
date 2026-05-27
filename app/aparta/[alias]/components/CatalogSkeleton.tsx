import ShirtOutlineIcon from "./loader-icons/ShirtOutlineIcon";

export default function CatalogSkeleton() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 pt-14 sm:pt-16 lg:pt-20">
      <section className="mb-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
          <ShirtOutlineIcon
            className="h-16 w-16 text-green-700"
            pathClassName="animate-[drawOutline_2.4s_ease-in-out_infinite]"
          />
        </div>

        <h1 className="text-lg font-semibold text-gray-900">
          Estamos armando el catálogo
        </h1>

        <p className="mt-1 max-w-xs text-sm leading-relaxed text-gray-500">
          En un momento podrás ver las prendas disponibles.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white p-3 shadow-md">
            <div className="h-56 animate-pulse rounded-2xl bg-gray-100" />

            <div className="mt-3 h-4 w-16 animate-pulse rounded-full bg-gray-200" />

            <div className="mt-2 space-y-2">
              <div className="h-3 w-full animate-pulse rounded-full bg-gray-100" />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-gray-100" />
            </div>

            <div className="mt-3 h-9 animate-pulse rounded-xl bg-gray-200" />
          </div>
        ))}
      </section>
    </main>
  );
}
