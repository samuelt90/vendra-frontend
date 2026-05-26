"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Dumbbell, BadgeCheck, Recycle } from "lucide-react";
import EditorialCarousel from "./EditorialCarousel";
import { getImageUrl } from "@/lib/getImageUrl";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";
import Image from "next/image";
import FaqFloatingButton from "./FaqFloatingButton";
import { useAparta } from "../../context/ApartaContext";

export default function ApartaContainer() {
  const params = useParams<{ alias: string }>();
  const router = useRouter();
  const alias = params?.alias || "";

  const { getCatalogCache, setCatalogCache, catalogCacheReady } = useAparta();

  const cachedCatalog = alias ? getCatalogCache(alias) : null;

  const [store, setStore] = useState<any>(cachedCatalog?.store ?? null);
  const [products, setProducts] = useState<any[]>(cachedCatalog?.products ?? []);

  const [search, setSearch] = useState("");
  const [generoFilter, setGeneroFilter] = useState("Todos");
  const [tallaFilter, setTallaFilter] = useState("Todas");
  const [tipoFilter, setTipoFilter] = useState("Todo");
  const [estadoFilter, setEstadoFilter] = useState("Todos");
  const [ofertaFilter, setOfertaFilter] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [itemsPerLoad, setItemsPerLoad] = useState(6);

  const [openFilters, setOpenFilters] = useState({
    tipo: true,
    talla: false,
    genero: false,
    estado: false,
  });

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  const updateVisibleCount = () => {
    const count = window.innerWidth >= 1024 ? 10 : 6;
    setVisibleCount(count);
    setItemsPerLoad(count);
  };

  useEffect(() => {
    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  const toggleFilterSection = (
    section: "tipo" | "talla" | "genero" | "estado"
  ) => {
    setOpenFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    if (!alias || !STRAPI || !catalogCacheReady) return;

    const cached = getCatalogCache(alias);

    if (cached) {
      setStore(cached.store);
      setProducts(cached.products);
      return;
    }

    const fetchData = async () => {
      try {
        setStore(null);
        setProducts([]);

const catalogUrl =
  `${STRAPI}/api/aparta-stores` +
  `?filters[slug][$eq]=${alias}` +
  `&fields[0]=name` +
  `&fields[1]=slug` +
  `&fields[2]=whatsapp` +
  `&fields[3]=descripcion` +
  `&fields[4]=is_active` +
  `&populate[cover][fields][0]=url` +
  `&populate[logo][fields][0]=url` +
  `&populate[aparta_products][fields][0]=Text` +
  `&populate[aparta_products][fields][1]=price` +
  `&populate[aparta_products][fields][2]=estado` +
  `&populate[aparta_products][fields][3]=codigo` +
  `&populate[aparta_products][fields][4]=genero` +
  `&populate[aparta_products][fields][5]=talla` +
  `&populate[aparta_products][fields][6]=tipo_prenda` +
  `&populate[aparta_products][fields][7]=estado_prenda` +
  `&populate[aparta_products][fields][8]=oferta` +
  `&populate[aparta_products][fields][9]=encontrado_semana` +
  `&populate[aparta_products][fields][10]=refit_pick` +
  `&populate[aparta_products][populate][Imagen][fields][0]=url`;

const catalogRes = await fetch(catalogUrl);
const catalogJson = await catalogRes.json();

const storeData = catalogJson.data?.[0];

if (!storeData) return;

const mapped = storeData.aparta_products.map((p: any) => {
          const attrs = p.attributes || p;
          const imageUrl = getStrapiMediaUrl(attrs.Imagen);

          return {
            id: p.id,
            documentId: p.documentId || p.id,
            Text: attrs.Text,
            price: attrs.price,
            estado: attrs.estado,
            Image: imageUrl,
            codigo: attrs.codigo,
            genero: attrs.genero,
            talla: attrs.talla,
            tipo_prenda: attrs.tipo_prenda,
            estado_prenda: attrs.estado_prenda,
            oferta: attrs.oferta,
            encontrado_semana: attrs.encontrado_semana,
            refit_pick: attrs.refit_pick,
          };
        });

        const availableProducts = mapped.filter(
          (p: any) => p.estado !== "apartado"
        );

        setStore(storeData);
        setProducts(availableProducts);
        setCatalogCache(alias, storeData, availableProducts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [alias, catalogCacheReady]);

 const coverUrl = store?.cover?.url
  ? getImageUrl(store.cover.url)
  : store?.attributes?.cover?.data?.attributes?.url
  ? getImageUrl(store.attributes.cover.data.attributes.url)
  : null;

const logoUrl = store?.logo?.[0]?.url
  ? getImageUrl(store.logo[0].url)
  : null;

const ofertasDestacadas = useMemo(
  () => products.filter((p) => p.oferta === true),
  [products]
);

const encontradosSemana = useMemo(
  () => products.filter((p) => p.encontrado_semana === true),
  [products]
);

const refitPicks = useMemo(
  () => products.filter((p) => p.refit_pick === true),
  [products]
);

const filteredProducts = useMemo(() => {
  const searchText = search.toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      product.Text?.toLowerCase().includes(searchText) ||
      product.codigo?.toLowerCase().includes(searchText);

    const matchesGenero =
      generoFilter === "Todos" ||
      product.genero === generoFilter.toLowerCase();

    const matchesTalla =
      tallaFilter === "Todas" ||
      product.talla?.toLowerCase() === tallaFilter.toLowerCase();

    const matchesTipo =
      tipoFilter === "Todo" ||
      product.tipo_prenda?.toLowerCase() === tipoFilter.toLowerCase();

    const matchesEstado =
      estadoFilter === "Todos" ||
      product.estado_prenda?.toLowerCase() === estadoFilter.toLowerCase();

    const matchesOferta = !ofertaFilter || product.oferta === true;

    return (
      matchesSearch &&
      matchesGenero &&
      matchesTalla &&
      matchesTipo &&
      matchesEstado &&
      matchesOferta
    );
  });
}, [
  products,
  search,
  generoFilter,
  tallaFilter,
  tipoFilter,
  estadoFilter,
  ofertaFilter,
]);

const visibleProducts = useMemo(
  () => filteredProducts.slice(0, visibleCount),
  [filteredProducts, visibleCount]
);

const hasMoreProducts = visibleCount < filteredProducts.length;

if (!store) return <div className="p-4">Cargando...</div>;


  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-4">
  {/* PORTADA */}
  {coverUrl && (
    <div className="mb-4 overflow-hidden rounded-2xl shadow-md">
            <Image
          src={coverUrl}
          alt={store.name || "Portada de tienda"}
          width={1200}
          height={400}
          className="h-40 w-full object-contain bg-black sm:h-52"
        />
    </div>
  )}

 {/* INFO TIENDA */}
<div className="mb-8 rounded-3xl bg-white px-5 py-6 shadow-sm md:px-8 md:py-7">
  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

    {/* LOGO + TEXTO */}
    <div className="flex items-center gap-4 md:gap-5">
      {logoUrl && (
        <Image
          src={logoUrl}
          alt={store.name}
          width={300}
          height={300}
          className="h-24 w-24 shrink-0 rounded-full object-cover md:h-32 md:w-32"
        />
      )}

      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-black md:text-4xl">
          {store.name}
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 md:text-base">
          {store.descripcion}
        </p>
      </div>
    </div>

 {/* WHATSAPP */}
<div className="flex justify-center md:block">
  <a
    href={`https://wa.me/${store.whatsapp}`}
    target="_blank"
    className="inline-block rounded-2xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
  >
    WhatsApp
  </a>
</div>
</div>


{/* SELLITOS */}
<div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-sm">

  <div className="flex items-center gap-2 text-gray-800">
    <Dumbbell className="h-4 w-4 text-green-600" />
    <span>Selección deportiva</span>
  </div>

  <div className="flex items-center gap-2 text-gray-800">
    <BadgeCheck className="h-4 w-4 text-green-600" />
    <span>Calidad revisada</span>
  </div>

  <div className="flex items-center gap-2 text-gray-800">
    <Recycle className="h-4 w-4 text-green-600" />
    <span>Segunda vida</span>
  </div>

</div>

</div>


<EditorialCarousel
  storeAlias={params.alias || ""}
  sections={[
    {
      emoji: "🔥",
      title: "Ofertas destacadas",
      products: ofertasDestacadas,
    },
    {
      emoji: "✨",
      title: "Encontrados de la semana",
      products: encontradosSemana,
    },
    {
      emoji: "⚡",
      title: "Refit Picks",
      products: refitPicks,
    },
  ]}
/>



      {/* TITULO */}
<h2 className="text-sm text-gray-600 mb-3">Productos</h2>


{/* FILTROS */}
<div className="mb-4 space-y-4">

  {/* BUSCADOR */}
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Buscar por código, prenda o marca..."
    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
  />
  <div className="flex gap-2">
  <button
    type="button"
    onClick={() => setShowFilters(true)}
    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium shadow-sm"
  >
    Filtros
  </button>
</div>

{showFilters && (
 
  <div className="fixed inset-0 z-50 bg-black/40">

<div
  className="
    fixed bottom-0 left-0 right-0
    max-h-[90vh]
    overflow-y-auto
    rounded-t-3xl
    bg-white
    p-5
    shadow-2xl

    animate-in
    slide-in-from-bottom
    fade-in
    duration-300

    md:relative
    md:mx-auto
    md:mt-10
    md:max-w-xl
    md:rounded-3xl
  "
>

  <div className="flex items-center justify-between mb-4">
  <h3 className="text-lg font-semibold text-gray-800">
    Filtros
  </h3>

  <button
    type="button"
    onClick={() => setShowFilters(false)}
    className="text-sm text-gray-500"
  >
    ✕
  </button>
</div>


{/* TIPO */}
<div className="border-b border-gray-200 py-4">

<button
  type="button"
  onClick={() => toggleFilterSection("tipo")}
  className="flex w-full items-center justify-between"
>

  <div className="flex items-center gap-2">

    <span className="text-sm font-semibold text-gray-900">
      Tipo de prenda
    </span>

    {!openFilters.tipo && (
      <span className="text-sm text-gray-400">
        {tipoFilter}
      </span>
    )}

  </div>

  <span className="text-lg text-gray-500">
    {openFilters.tipo ? "⌃" : "⌄"}
  </span>

</button>

  {openFilters.tipo && (
    <div className="mt-4 flex flex-wrap gap-2">

      {[
        { label: "Todo", value: "Todo" },
        { label: "Playera", value: "playera" },
        { label: "Playera compresión", value: "playera_compresion" },
        { label: "Pants", value: "pants" },
        { label: "Short", value: "short" },
        { label: "Sudadero", value: "sudadero" },
        { label: "Licra", value: "licra" },
      ].map((filter) => (

        <button
          key={filter.value}
          type="button"
          onClick={() => setTipoFilter(filter.value)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            tipoFilter === filter.value
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          {filter.label}
        </button>

      ))}

    </div>
  )}

</div>

 {/* TALLA */}
<div className="border-b border-gray-200 py-4">

  <button
    type="button"
    onClick={() => toggleFilterSection("talla")}
    className="flex w-full items-center justify-between"
  >
    <div className="flex items-center gap-2">

      <span className="text-sm font-semibold text-gray-900">
        Talla
      </span>

      {!openFilters.talla && (
        <span className="text-sm text-gray-400">
          {tallaFilter}
        </span>
      )}

    </div>

    <span className="text-lg text-gray-500">
      {openFilters.talla ? "⌃" : "⌄"}
    </span>
  </button>

  {openFilters.talla && (
    <div className="mt-4 flex flex-wrap gap-2">

      {["Todas", "M", "L", "XL"].map((filter) => (

        <button
          key={filter}
          type="button"
          onClick={() => setTallaFilter(filter)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            tallaFilter === filter
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          {filter}
        </button>

      ))}

    </div>
  )}

</div>

  {/* GÉNERO */}
<div className="border-b border-gray-200 py-4">

  <button
    type="button"
    onClick={() => toggleFilterSection("genero")}
    className="flex w-full items-center justify-between"
  >

    <div className="flex items-center gap-2">

      <span className="text-sm font-semibold text-gray-900">
        Género
      </span>

      {!openFilters.genero && (
        <span className="text-sm text-gray-400">
          {generoFilter}
        </span>
      )}

    </div>

    <span className="text-lg text-gray-500">
      {openFilters.genero ? "⌃" : "⌄"}
    </span>

  </button>

  {openFilters.genero && (

    <div className="mt-4 flex flex-wrap gap-2">

      {["Todos", "Hombre", "Mujer"].map((filter) => (

        <button
          key={filter}
          type="button"
          onClick={() => setGeneroFilter(filter)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            generoFilter === filter
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          {filter}
        </button>

      ))}

    </div>

  )}

</div>


{/* ESTADO */}
<div className="border-b border-gray-200 py-4">

  <button
    type="button"
    onClick={() => toggleFilterSection("estado")}
    className="flex w-full items-center justify-between"
  >

    <div className="flex items-center gap-2">

      <span className="text-sm font-semibold text-gray-900">
        Estado
      </span>

      {!openFilters.estado && (
        <span className="text-sm text-gray-400">
          {estadoFilter.replaceAll("_", " ")}
        </span>
      )}

    </div>

    <span className="text-lg text-gray-500">
      {openFilters.estado ? "⌃" : "⌄"}
    </span>

  </button>

  {openFilters.estado && (

    <div className="mt-4 flex flex-wrap gap-2">

      {[
        "Todos",
        "casi_nuevo",
        "buen_estado",
        "detalles_minimos",
      ].map((filter) => (

        <button
          key={filter}
          type="button"
          onClick={() => setEstadoFilter(filter)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            estadoFilter === filter
              ? "border-green-600 bg-green-600 text-white"
              : "border-gray-300 bg-white text-gray-700"
          }`}
        >
          {filter.replaceAll("_", " ")}
        </button>

      ))}

    </div>

  )}

</div>

  {/* OFERTAS */}
<div className="border-b border-gray-200 py-4">

  <div className="flex items-center justify-between">

    <span className="text-sm font-semibold text-gray-900">
      Solo ofertas
    </span>

    <button
      type="button"
      onClick={() => setOfertaFilter(!ofertaFilter)}
      className={`relative h-6 w-11 rounded-full transition ${
        ofertaFilter ? "bg-green-600" : "bg-gray-300"
      }`}
    >

      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          ofertaFilter ? "translate-x-5" : "translate-x-0.5"
        }`}
      />

    </button>

  </div>

</div>


        {/* FOOTER */}
<div className="sticky bottom-0 mt-6 border-t border-gray-200 bg-white pt-4">

  <div className="flex gap-3">

    <button
      type="button"
      onClick={() => {
        setGeneroFilter("Todos");
        setTallaFilter("Todas");
        setTipoFilter("Todo");
        setEstadoFilter("Todos");
        setOfertaFilter(false);
      }}
      className="flex-1 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
    >
      Limpiar
    </button>

    <button
      type="button"
      onClick={() => setShowFilters(false)}
      className="flex-1 rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
    >
      Ver prendas
    </button>

  </div>

</div>


  </div>
        </div>
)}
</div>




{/* GRID */}
<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleProducts.map((product, index) => (
          <div
            key={product.documentId}
            className="bg-white rounded-2xl shadow-md p-3 transition hover:shadow-lg hover:scale-[1.02]"
          >
            
           {/* Imagen */}
            {product.Image && (
              <div className="mb-3 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
               <Image
                src={getImageUrl(product.Image)}
                alt={product.Text}
                width={600}
                height={800}
                className="h-full w-full object-contain"
                priority={index < 4}
              />
              </div>
            )}

            {/* Precio */}
            <p className="font-bold text-sm mb-1">
              Q{product.price}
            </p>

            {/* Nombre */}
            <p className="text-sm mb-2 line-clamp-2">
              {product.Text}
            </p>

            

            {/* Botón */}
            <button
              onClick={() =>
                router.push(
                  `/aparta/${params.alias}/detail/${product.documentId}`
                )
              }
              className="w-full bg-green-600 text-white py-2 rounded-xl text-sm font-semibold transition hover:text-base"
            >
              Ver detalles →
            </button>
          </div>
        ))}
      </div>

      {hasMoreProducts && (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={() => setVisibleCount((prev) => prev + itemsPerLoad)}
      className="rounded-full border border-green-600 px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
    >
      Ver más prendas
    </button>
  </div>
)}
  <FaqFloatingButton/>
    </main>
  );
}
