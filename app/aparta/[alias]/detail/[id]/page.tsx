"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAparta } from "@/app/aparta/context/ApartaContext";
import CartModal from "../../components/CartModal";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";
import FaqFloatingButton from "../../components/FaqFloatingButton";


export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { addItem } = useAparta();

  const [product, setProduct] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex]= useState(0);

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(
        `${STRAPI}/api/aparta-products/${id}?populate=*`
      );

      const json = await res.json();

      const attrs = json.data.attributes || json.data;

      const images =
      attrs.Imagen?.length > 0
        ? attrs.Imagen.map((img: any) => `${STRAPI}${img.url}`)
        : [];

      setProduct({
        id: json.data.id,
        Text: attrs.Text,
        price: attrs.price,
        description: attrs.description,
        Image: images[0] || null,
        Images: images,
      });
    };

    fetchProduct();
  }, [id]);

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
      <div className="bg-white rounded-2xl shadow-md p-5 text-center">

{/* Imagen / Galería */}
{product.Images?.length > 0 && (
  <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50">
    <div className="flex h-96 items-center justify-center bg-gray-50">
        <Image
        src={getImageUrl(product.Images[currentImageIndex])}
        alt={product.Text}
        width={900}
        height={1200}
        className="max-h-full max-w-full object-contain"
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
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
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
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
        >
          →
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {currentImageIndex + 1} / {product.Images.length}
        </div>
      </>
    )}
  </div>
)}



        {/* Nombre */}
        <h1 className="text-base text-gray-500 mb-1">
          {product.Text}
        </h1>

        {/* Precio */}
        <p className="text-xl font-bold mb-2">
          Q{product.price}
        </p>

       {/* Descripción */}
        <div className="mb-6 rounded-2xl bg-gray-50 p-4 text-left">
          <h2 className="mb-3 text-sm font-bold text-gray-900">
            Descripción
          </h2>

          <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
            {product.description}
          </p>
        </div>

        {/* BOTÓN PRINCIPAL */}
        <button
          onClick={handleApartar}
          className="w-full bg-green-600 text-white py-4 rounded-2xl font-semibold transition hover:scale-[1.02]"
        >
          Apartar
        </button>

        {/* VOLVER */}
        <button
          onClick={() => window.history.back()}
          className="w-full mt-3 text-sm text-gray-500"
        >
          ← Volver a la tienda
        </button>
        

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
