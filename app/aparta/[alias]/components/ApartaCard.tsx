"use client";

import { useRouter, useParams } from "next/navigation";
import { getImageUrl } from "@/lib/getImageUrl";
import Image from "next/image";

type Product = {
  documentId: string;
  Text: string;
  price: number;
  Image?: string | null;
};

export default function ApartaCard({ product }: { product: Product }) {
  const router = useRouter();
  const params = useParams<{ alias: string }>();
  const alias = params?.alias;

  const imageUrl = getImageUrl(product.Image);

  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={product.Text}
          width={600}
          height={800}
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
      )}

      <div className="mb-2">
        <p className="font-semibold text-slate-900">{product.Text}</p>
        <p className="text-sm text-slate-600">Q{product.price}</p>
      </div>

      <button
        onClick={() =>
          router.push(`/aparta/${alias}/detail/${product.documentId}`)
        }
        className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm"
      >
        Ver detalles
      </button>
    </div>
  );
}