import ApartaCard from "./ApartaCard";
import { getStrapiMediaUrl } from "@/lib/getStrapiMediaUrl";

type Product = {
  documentId: string;
  Text: string;
  price: number;
  Image?: any;
};

export default function ApartaList({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="text-center py-10">Sin productos</div>;
  }

  const normalizedProducts = products.map((p) => ({
    ...p,
    Image: getStrapiMediaUrl(p.Image),
  }));

  return (
    <div className="grid grid-cols-2 gap-4">
      {normalizedProducts.map((p) => (
        <ApartaCard key={p.documentId} product={p} />
      ))}
    </div>
  );
}