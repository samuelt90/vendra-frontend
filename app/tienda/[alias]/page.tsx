import StoreView from "../../components/StoreView";

export default async function StorePage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  return (
    <main style={{ padding: 20 }}>
      
      <StoreView slug={alias} />
    </main>
  );
}