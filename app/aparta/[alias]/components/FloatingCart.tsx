"use client";

import { useAparta } from "@/app/aparta/context/ApartaContext";
import { useRouter, useParams } from "next/navigation";

export default function FloatingCart() {
  const { items } = useAparta();
  const router = useRouter();
  const params = useParams<{ alias: string }>();

  if (items.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">

      <button
        onClick={() => router.push(`/aparta/${params.alias}/cart`)}
        className="bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2"
      >
        <span>🛒</span>

        <span className="text-sm font-semibold">
          {items.length}
        </span>

      </button>

    </div>
  );
}
