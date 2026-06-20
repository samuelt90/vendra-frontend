export default function PredioLoading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
        <div className="w-full max-w-sm rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-blue-100 bg-blue-50/50">
            <div className="grid h-20 w-20 place-items-center rounded-3xl border-2 border-blue-200 bg-white shadow-sm">
              <svg
                viewBox="0 0 180 120"
                className="h-16 w-16 animate-pulse text-blue-700"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M33 72h9l14-25c3-5 8-8 14-8h39c6 0 11 3 14 8l14 25h10c6 0 10 4 10 10v16H23V82c0-6 4-10 10-10Z"
                  className="vehicle-line-draw"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M62 72h56M71 47h38M45 98h90"
                  className="vehicle-line-draw"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="55"
                  cy="98"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="7"
                />

                <circle
                  cx="125"
                  cy="98"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="7"
                />
              </svg>
            </div>
          </div>

          <h1 className="mt-6 text-xl font-black tracking-tight text-slate-950">
            Cargando vehículos...
          </h1>

          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-500">
            Un momento, estamos preparando el catálogo.
          </p>

          <div className="mx-auto mt-6 flex w-fit items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500 delay-150" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300 delay-300" />
          </div>
        </div>
      </div>
    </main>
  );
}