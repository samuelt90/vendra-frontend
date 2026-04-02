"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAparta } from "@/app/aparta/context/ApartaContext";
import CartModal from "../../components/CartModal";

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const { addItem } = useAparta();

  const [product, setProduct] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(
        `${STRAPI}/api/aparta-products/${id}?populate=*`
      );

      const json = await res.json();

      const attrs = json.data.attributes || json.data;

      const imageUrl =
        attrs.Imagen?.length > 0
          ? `${STRAPI}${attrs.Imagen[0].url}`
          : null;

      setProduct({
        id: json.data.id,
        Text: attrs.Text,
        price: attrs.price,
        description: attrs.description,
        Image: imageUrl,
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

        {/* Imagen */}
        {product.Image && (
          <img
            src={product.Image}
            className="w-full h-auto rounded-xl mb-4"
          />
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
        <p className="text-sm text-gray-500 mb-5">
          {product.description}
        </p>

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

    </main>
  );
}
