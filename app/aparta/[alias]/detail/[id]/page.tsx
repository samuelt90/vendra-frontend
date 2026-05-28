"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAparta } from "@/app/aparta/context/ApartaContext";
import CartModal from "../../components/CartModal";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";
import FaqFloatingButton from "../../components/FaqFloatingButton";
import { Lock } from "lucide-react";


export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { addItem } = useAparta();

  const [product, setProduct] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex]= useState(0);

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

useEffect(() => {
  if (!id || !STRAPI) return;

  const fetchProduct = async () => {
    try {
      const productUrl =
        `${STRAPI}/api/aparta-products/${id}` +
        `?fields[0]=Text` +
        `&fields[1]=price` +
        `&fields[2]=description` +
        `&fields[3]=estado` +
        `&fields[4]=codigo` +
        `&fields[5]=genero` +
        `&fields[6]=talla` +
        `&fields[7]=tipo_prenda` +
        `&fields[8]=estado_prenda` +
        `&populate[Imagen][fields][0]=url`;

      const res = await fetch(productUrl);
      const json = await res.json();

      const attrs = json.data?.attributes || json.data;

      if (!attrs) return;

      const images =
        attrs.Imagen?.length > 0
          ? attrs.Imagen.map((img: any) => img.url).filter(Boolean)
          : [];

      setProduct({
        id: json.data.id,
        documentId: json.data.documentId || id,
        Text: attrs.Text,
        price: attrs.price,
        description: attrs.description,
        estado: attrs.estado,
        codigo: attrs.codigo,
        genero: attrs.genero,
        talla: attrs.talla,
        tipo_prenda: attrs.tipo_prenda,
        estado_prenda: attrs.estado_prenda,
        Image: images[0] || null,
        Images: images,
      });
    } catch (err) {
      console.error(err);
    }
  };

  fetchProduct();
}, [id, STRAPI]);

  const handleApartar = async () => {
    try {
      const res = await fetch(
        `${STRAPI}/api/aparta-products/${product.id}/apartar`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        alert("Este producto ya fue apartado");
        return;
      }

      addItem({
        id: product.id,
        documentId: id,
        Text: product.Text,
        price: product.price,
        Image: product.Image,
      });

      setOpenModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) return <div className="p-4">Cargando...</div>;

  return (
    <main className="max-w-md mx-auto p-4">

{/* CARD PRINCIPAL */}
<div className="overflow-hidden rounded-3xl bg-white shadow-md">
  {/* Imagen / Galería */}
  {product.Images?.length > 0 && (
    <div className="relative bg-gray-50">
      <div className="flex h-[430px] items-center justify-center px-4 py-5">
        <Image
          src={getImageUrl(product.Images[currentImageIndex])}
          alt={product.Text}
          width={900}
          height={1200}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      {product.Images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === 0 ? product.Images.length - 1 : prev - 1
              )
            }
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-gray-800 shadow-md backdrop-blur transition active:scale-95"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() =>
              setCurrentImageIndex((prev) =>
                prev === product.Images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-gray-800 shadow-md backdrop-blur transition active:scale-95"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur">
            {currentImageIndex + 1} / {product.Images.length}
          </div>
        </>
      )}
    </div>
  )}

  <div className="px-5 pb-5 pt-5">
    {/* Nombre + precio */}
    <div className="space-y-2">
      <h1 className="text-lg font-semibold leading-snug text-gray-900">
        {product.Text}
      </h1>

      <p className="text-2xl font-bold text-gray-950">
        Q{product.price}
      </p>
    </div>

    {/* Descripción */}
    {product.description && (
      <div className="mt-5 rounded-2xl bg-gray-50 p-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Descripción
        </h2>

        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600">
          {product.description}
        </p>
      </div>
    )}

    {/* BOTÓN PRINCIPAL */}
    <button
      onClick={handleApartar}
      className="mx-auto mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] sm:hover:bg-green-700"

    >
      <Lock size={17}/>
      Apartar prenda
    </button>

    {/* VOLVER */}
    <button
      onClick={() => window.history.back()}
      className="mx-auto mt-3 block w-full max-w-xs rounded-2xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 transition active:scale-[0.98] sm:hover:bg-gray-50"

    >
      ← Volver a la tienda
    </button>
  </div>
</div>


      {/* MODAL */}
      <CartModal
        open={openModal}
        product={product}
        onClose={() => setOpenModal(false)}
      />
    <FaqFloatingButton/>
    </main>
  );
}
