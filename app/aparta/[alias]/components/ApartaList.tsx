import ApartaCard from "./ApartaCard";

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

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((p) => (
        <ApartaCard key={p.documentId} product={p} />
      ))}
    </div>
  );
}

