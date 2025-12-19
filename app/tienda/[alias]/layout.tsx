import { CartProvider } from "../../components/cart/CartProvider";
import CartButton from "../../components/cart/CartButton";

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  return (
    <CartProvider storeSlug={alias}>
      <CartButton storeSlug={alias} />
      {children}
    </CartProvider>
  );
}