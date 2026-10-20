import StoreHeader from "./components/header/StoreHeader";
import StoreHero from "./components/hero/StoreHero";
import ExploreSection from "./components/explore/ExploreSection";
import CommercialSection from "./components/commercial/CommercialSection";
import InformationSection from "./components/information/InformationSection";
import ProductsSection from "./components/products/ProductsSection";
import CommerceFooter from "./components/footer/CommerceFooter";
import WholesaleSection from "./components/wholesale/WholesaleSection";

export default function ComercioPage() {
  return (
    <>
      <StoreHeader
        brandName="Nombre del negocio"
        brandDescriptor="Tecnología y accesorios"
      />

      <main>
        <StoreHero />
        <ExploreSection />
        <CommercialSection />
        <InformationSection />
        <ProductsSection />
        <WholesaleSection />
      </main>
      <CommerceFooter />
    </>
  );
}
