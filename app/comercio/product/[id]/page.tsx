import { notFound } from "next/navigation";

import StoreHeader from "../../components/header/StoreHeader";
import CommerceFooter from "../../components/footer/CommerceFooter";

import ProductDetail from "../ProductDetail";

import {
  commerceProducts,
  getProductById,
  getSimilarProducts,
} from "../../data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return commerceProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const similarProducts = getSimilarProducts(
    product,
    6
  );

  return (
    <>
      <StoreHeader
        brandName="Nombre del negocio"
        brandDescriptor="Tecnología y accesorios"
    
      />

      <main>
        <ProductDetail
          product={product}
          similarProducts={similarProducts}
        />
      </main>

      <CommerceFooter />
    </>
  );
}
