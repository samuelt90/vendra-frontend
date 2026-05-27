"use client";

import { useMemo, useState, useRef } from "react";
import {
  ArrowDown,
  Check,
  ChevronRight,
  Dumbbell,
  Flame,
  Mars,
  Play,
  ShieldCheck,
  Sparkles,
  Venus,
  X,
  Zap,
} from "lucide-react";

type Gender = "mujer" | "hombre";

type Product = {
  id: string;
  name: string;
  category: string;
  gender: Gender;
  size: string;
  price: string;
  color: string;
  tag: string;
  gradient: string;
};

const products: Product[] = [
  {
    id: "GS-W01",
    name: "Seamless Legging",
    category: "Leggings",
    gender: "mujer",
    size: "S",
    price: "Q280",
    color: "Pink Marl",
    tag: "Fit cómodo",
    gradient: "from-pink-200 via-rose-100 to-stone-100",
  },
  {
    id: "GS-W02",
    name: "Training Sports Bra",
    category: "Top deportivo",
    gender: "mujer",
    size: "M",
    price: "Q220",
    color: "Black",
    tag: "Soporte ligero",
    gradient: "from-neutral-800 via-neutral-700 to-stone-500",
  },
  {
    id: "GS-W03",
    name: "Vital Crop Tank",
    category: "Top",
    gender: "mujer",
    size: "S",
    price: "Q190",
    color: "Soft Grey",
    tag: "Ligero",
    gradient: "from-zinc-200 via-neutral-100 to-white",
  },
  {
    id: "GS-W04",
    name: "Training Shorts",
    category: "Short",
    gender: "mujer",
    size: "M",
    price: "Q210",
    color: "Deep Taupe",
    tag: "Movimiento libre",
    gradient: "from-stone-400 via-stone-300 to-neutral-100",
  },
  {
    id: "GS-M01",
    name: "Oversized Tee",
    category: "T-shirt",
    gender: "hombre",
    size: "L",
    price: "Q240",
    color: "Washed Black",
    tag: "Oversized fit",
    gradient: "from-neutral-900 via-neutral-700 to-neutral-400",
  },
  {
    id: "GS-M02",
    name: "Arrival Shorts",
    category: "Short",
    gender: "hombre",
    size: "M",
    price: "Q230",
    color: "Graphite",
    tag: "Training ready",
    gradient: "from-slate-700 via-slate-500 to-stone-300",
  },
  {
    id: "GS-M03",
    name: "Stringer Tank",
    category: "Tank",
    gender: "hombre",
    size: "M",
    price: "Q210",
    color: "Bone",
    tag: "Gym essential",
    gradient: "from-stone-100 via-neutral-100 to-white",
  },
  {
    id: "GS-M04",
    name: "Training Jogger",
    category: "Jogger",
    gender: "hombre",
    size: "L",
    price: "Q320",
    color: "Dark Olive",
    tag: "Comodidad diaria",
    gradient: "from-olive-800 via-stone-600 to-stone-300",
  },
];

const genderCopy = {
  mujer: {
    title: "Mujer",
    subtitle: "Leggings, tops, sports bras y shorts seleccionados para entrenar con comodidad.",
    icon: Venus,
  },
  hombre: {
    title: "Hombre",
    subtitle: "T-shirts, shorts, tanks y joggers pensados para entrenamiento y uso diario.",
    icon: Mars,
  },
};

export default function GymsharkDropDemoPage() {
  const dropContentRef = useRef<HTMLElement | null>(null);

  const [selectedGender, setSelectedGender] = useState<Gender>("mujer");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activePreview, setActivePreview] = useState<Product>(products[0]);
    const [showDropContent, setShowDropContent] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => product.gender === selectedGender);
  }, [selectedGender]);

  const GenderIcon = genderCopy[selectedGender].icon;

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    const firstProduct = products.find((product) => product.gender === gender);
    if (firstProduct) {
      setActivePreview(firstProduct);
    }
  };

const handleExploreDrop = () => {
  setShowDropContent(true);

  setTimeout(() => {
    dropContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 80);
};

  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(244,114,182,0.22),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(120,113,108,0.35),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.86))]" />

        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl animate-pulse" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Vendra / Aparta
            </p>
            <p className="mt-1 text-sm text-white/80">Drop visual demo</p>
          </div>

          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
            Panel demo · sin compra real
          </div>
        </nav>

        <section className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-[1.05fr_0.95fr] md:px-8">
          <div className="max-w-3xl">
           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/75 shadow-2xl backdrop-blur-xl animate-[fadeIn_0.7s_ease-out]">
                <Sparkles className="h-4 w-4" />
                Refit presenta
                </div>

                <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl lg:text-9xl animate-[heroIn_0.8s_ease-out]">
                Gymshark
                <span className="block bg-gradient-to-r from-white via-white to-white/35 bg-clip-text text-transparent">
                    Drop
                </span>
                </h1>

                <p className="mt-5 text-xl font-semibold uppercase tracking-[0.22em] text-white/80 animate-[fadeUp_0.9s_ease-out]">
                Nuevo drop disponible
                </p>

                <p className="mt-5 max-w-xl text-lg leading-8 text-white/70 md:text-xl animate-[fadeUp_0.9s_ease-out]">
                Una selección de GymShark para nuestra comunidad de Refit.
                Elige Mujer u Hombre y explora las piezas disponibles.
                </p>


            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 animate-[fadeUp_1s_ease-out]">
              <button
                onClick={() => handleGenderChange("mujer")}
                className={`group rounded-3xl border p-5 text-left transition duration-300 ${
                  selectedGender === "mujer"
                    ? "border-white bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.18)]"
                    : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <Venus className="mb-8 h-6 w-6 transition group-hover:scale-110" />
                <p className="text-2xl font-semibold">Mujer</p>
                <p
                  className={`mt-2 text-sm ${
                    selectedGender === "mujer" ? "text-black/60" : "text-white/55"
                  }`}
                >
                  Leggings · Tops · Shorts
                </p>
              </button>

              <button
                onClick={() => handleGenderChange("hombre")}
                className={`group rounded-3xl border p-5 text-left transition duration-300 ${
                  selectedGender === "hombre"
                    ? "border-white bg-white text-black shadow-[0_0_60px_rgba(255,255,255,0.18)]"
                    : "border-white/15 bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                <Mars className="mb-8 h-6 w-6 transition group-hover:scale-110" />
                <p className="text-2xl font-semibold">Hombre</p>
                <p
                  className={`mt-2 text-sm ${
                    selectedGender === "hombre" ? "text-black/60" : "text-white/55"
                  }`}
                >
                  T-shirts · Shorts · Joggers
                </p>
              </button>
            </div>

               
                <button
                onClick={handleExploreDrop}
                className="mx-auto mt-8 flex w-full max-w-[340px] items-center justify-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold uppercase tracking-[0.22em] text-white/80 backdrop-blur-xl shadow-[0_0_28px_rgba(255,255,255,0.06)] transition hover:bg-white/15 hover:text-white active:scale-[0.98] md:mx-0 md:w-fit"
                >
                Explorar drop
                <ArrowDown className="h-5 w-5 animate-bounce" />
                </button>
            
          </div>

          <div className="relative animate-[floatIn_0.9s_ease-out]">
            <div className="absolute -inset-6 rounded-[3rem] bg-white/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl">
              <div
                className={`relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br ${activePreview.gradient} p-6 text-black transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.75),transparent_24%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.2))]" />

                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/70 backdrop-blur">
                    {activePreview.category}
                  </span>

                  <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {activePreview.id}
                  </span>
                </div>

                <div className="relative mx-auto my-8 flex h-64 w-48 items-center justify-center md:h-80 md:w-56">
                  <div className="absolute h-full w-full rounded-[45%] bg-white/45 blur-2xl" />
                  <div className="relative h-full w-full rounded-t-[45%] rounded-b-[28%] bg-black/80 shadow-2xl transition duration-500 hover:scale-105">
                    <div className="absolute left-1/2 top-8 h-28 w-24 -translate-x-1/2 rounded-full bg-white/10" />
                    <div className="absolute bottom-8 left-1/2 h-28 w-36 -translate-x-1/2 rounded-[2rem] bg-white/10" />
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] text-4xl font-black tracking-[0.35em] text-white/20">
                      GS
                    </p>
                  </div>
                </div>

                <div className="relative rounded-[1.7rem] bg-white/75 p-5 backdrop-blur">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                        Vista previa
                      </p>
                      <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                        {activePreview.name}
                      </h2>
                      <p className="mt-2 text-sm text-black/60">
                        {activePreview.color} · Talla {activePreview.size}
                      </p>
                    </div>

                    <p className="text-2xl font-black">{activePreview.price}</p>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(activePreview)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Ver pieza
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

     
      </section>

                  
            {showDropContent && (
            <section
                ref={dropContentRef}
                className="relative bg-[#f5f1eb] px-5 py-16 text-black md:px-8 md:py-24 animate-[fadeUp_0.6s_ease-out]"
            >
                <div className="mx-auto max-w-7xl">
                <section className="mb-16 overflow-hidden rounded-[2.5rem] bg-black text-white shadow-2xl md:mb-24">
  <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
    <div className="relative min-h-[320px] overflow-hidden p-8 md:min-h-[420px] md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.18),transparent_30%)]" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          Refit x Gymshark
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Selección curada
          </p>

          <h2 className="mt-4 text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] md:text-7xl">
            Comunidad
            <span className="block text-white/45">Refit</span>
          </h2>
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-center bg-white p-8 text-black md:p-12">
      <div className="mb-6 flex w-fit items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white">
        <ShieldCheck className="h-4 w-4" />
        Drop preparado por Refit
      </div>

      <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] md:text-6xl">
        Este drop nace para nuestra comunidad
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-black/60 md:text-xl">
        Si llegaste desde el grupo o los estados de Refit, esta selección fue
        preparada para que explores las piezas Gymshark de forma rápida y visual.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[#f5f1eb] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Origen
          </p>
          <p className="mt-2 font-bold">Grupo / estados</p>
        </div>

        <div className="rounded-2xl bg-[#f5f1eb] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Marca
          </p>
          <p className="mt-2 font-bold">Gymshark</p>
        </div>

        <div className="rounded-2xl bg-[#f5f1eb] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-black/40">
            Venta
                </p>
                <p className="mt-2 font-bold">Refit</p>
                </div>
            </div>
            </div>
        </div>
        </section>

          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white">
                <GenderIcon className="h-4 w-4" />
                Selección Refit
              </div>

              <h2 className="text-5xl font-black uppercase tracking-[-0.08em] md:text-7xl">
                {genderCopy[selectedGender].title}
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-black/60">
                {genderCopy[selectedGender].subtitle}
              </p>
            </div>

            <div className="flex rounded-full bg-white p-1 shadow-sm">
              <button
                onClick={() => handleGenderChange("mujer")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedGender === "mujer"
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                Mujer
              </button>
              <button
                onClick={() => handleGenderChange("hombre")}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  selectedGender === "hombre"
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                Hombre
              </button>
            </div>
          </div>


          <ProductRail
            title={`Drop ${genderCopy[selectedGender].title}`}
            subtitle="Desliza para explorar las piezas seleccionadas por Refit."
            products={filteredProducts}
            activePreview={activePreview}
            onPreview={setActivePreview}
            onSelect={setSelectedProduct}
            />

          <section className="mt-16 overflow-hidden rounded-[2.3rem] bg-black p-6 text-white md:p-10">
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
                  <Flame className="h-4 w-4" />
                  Experiencia Vendra
                </div>

                <h3 className="text-4xl font-black uppercase tracking-[-0.06em] md:text-6xl">
                  Una landing para vender por contexto.
                </h3>
              </div>

              <div className="space-y-4 text-white/65">
                <p className="text-lg leading-8">
                  Esta vista está pensada para enlaces compartidos desde grupos,
                  estados de WhatsApp o historias. No reemplaza al catálogo
                  completo: crea una experiencia visual para un drop específico.
                </p>

                <div className="grid gap-3 sm:grid-cols-3">
                  <InfoCard icon={<Play className="h-5 w-5" />} text="Entrada visual" />
                  <InfoCard icon={<Venus className="h-5 w-5" />} text="Mujer / Hombre" />
                  <InfoCard icon={<Check className="h-5 w-5" />} text="Demo sin checkout" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
            )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <style jsx global>{`
        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.96);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(2deg) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </main>
  );
}

function ProductRail({
  title,
  subtitle,
  products,
  activePreview,
  onPreview,
  onSelect,
}: {
  title: string;
  subtitle: string;
  products: Product[];
  activePreview: Product;
  onPreview: (product: Product) => void;
  onSelect: (product: Product) => void;
}) {
  return (
    <section className="relative">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-3xl font-black uppercase tracking-[-0.06em] md:text-5xl">
            {title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-black/55 md:text-base">
            {subtitle}
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black/45 md:flex">
          Desliza
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <button
            key={product.id}
            onMouseEnter={() => onPreview(product)}
            onClick={() => {
              onPreview(product);
              onSelect(product);
            }}
            className={`group min-w-[82%] snap-center text-left transition duration-500 sm:min-w-[420px] lg:min-w-[360px] ${
              activePreview.id === product.id ? "scale-[1.01]" : ""
            }`}
          >
            <div
              className={`relative min-h-[460px] overflow-hidden rounded-[2.2rem] bg-gradient-to-br ${product.gradient} p-5 shadow-sm transition duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.65),transparent_25%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />

              <div className="relative flex items-center justify-between">
                <span className="rounded-full bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-black/65 backdrop-blur">
                  {product.tag}
                </span>

                <span className="rounded-full bg-black/85 px-3 py-2 text-xs font-semibold text-white">
                  {product.id}
                </span>
              </div>

              <div className="relative mx-auto mt-12 flex h-56 w-44 items-center justify-center">
                <div className="absolute h-full w-full rounded-full bg-white/35 blur-2xl" />

                <div className="relative h-full w-full rounded-t-[45%] rounded-b-[28%] bg-black/80 transition duration-500 group-hover:scale-105">
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] text-3xl font-black tracking-[0.35em] text-white/20">
                    GS
                  </p>
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/85 p-4 text-black backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                  {product.category}
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-black/55">
                    {product.color} · {product.size}
                  </p>

                  <p className="text-xl font-black">{product.price}</p>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-white group-hover:text-black">
                  Ver pieza
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}


function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-3 backdrop-blur-md md:items-center md:justify-center">
      <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-[#f5f1eb] text-black shadow-2xl animate-[fadeUp_0.25s_ease-out]">
        <div className="grid md:grid-cols-2">
          <div
            className={`relative min-h-[360px] bg-gradient-to-br ${product.gradient} p-6`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.65),transparent_25%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.25))]" />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur transition hover:scale-105"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex h-full min-h-[320px] items-center justify-center">
              <div className="absolute h-64 w-64 rounded-full bg-white/35 blur-3xl" />
              <div className="relative h-72 w-52 rounded-t-[45%] rounded-b-[28%] bg-black/80 shadow-2xl">
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] text-4xl font-black tracking-[0.35em] text-white/20">
                  GS
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-5 inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {product.id}
            </div>

            <p className="text-sm uppercase tracking-[0.25em] text-black/45">
              {product.category}
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.06em] md:text-5xl">
              {product.name}
            </h2>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <DetailPill label="Talla" value={product.size} />
              <DetailPill label="Color" value={product.color} />
              <DetailPill label="Precio" value={product.price} />
            </div>

            <p className="mt-6 text-sm leading-7 text-black/60">
              Esta es una vista demostrativa del drop. En el flujo real, esta pieza
              se conectaría al motor de apartado de Vendra y a la confirmación por
              WhatsApp.
            </p>

            <button
              disabled
              className="mt-7 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl bg-black/25 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              Compra deshabilitada en demo
              <ShieldCheck className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-black/10 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-white"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-black/40">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>
      <p className="text-sm font-medium text-white/75">{text}</p>
    </div>
  );
}
