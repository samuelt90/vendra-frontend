import { notFound } from "next/navigation";
import { getImportadoraHome } from "@/lib/importadoras/getImportadoraHome";
import ImportadoraHeader from "../../components/ImportadoraHeader";
import ImportadoraPageShell from "../../components/ImportadoraPageShell";
import ImportadoraTrustSection from "../../components/inicio/ImportadoraTrustSection";
import ImportadoraHomeActionCards from "../../components/inicio/ImportadoraHomeActionCards";
import ImportadoraShortProcess from "../../components/inicio/ImportadoraShortProcess";
import ImportadoraFeaturedVehicles from "../../components/inicio/ImportadoraFeaturedVehicles";
import ImportadoraMobileProcessSticky from "../../components/inicio/ImportadoraMobileProcessSticky";
import ImportadoraHomeHero from "../../components/inicio/ImportadoraHomeHero";
import ImportadoraHomeKnowUs from "../../components/inicio/ImportadoraHomeKnowUs";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function cleanWhatsappNumber(phone: string | null) {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
}

function getWhatsappUrl(phone: string | null, importadoraName: string) {
  const cleanPhone = cleanWhatsappNumber(phone);

  if (!cleanPhone) return null;

  const message = `Hola, vengo de la página de ${importadoraName}. Quiero más información para importar un vehículo.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export default async function ImportadoraInicioPage({ params }: PageProps) {
  const { slug } = await params;
  const importadora = await getImportadoraHome(slug);

  if (!importadora) {
    notFound();
  }

  const whatsappUrl = getWhatsappUrl(
    importadora.whatsappNumber,
    importadora.name
  );

  return (
    <ImportadoraPageShell>
      <ImportadoraHeader
        name={importadora.name}
        slug={importadora.slug}
        logoUrl={importadora.logoUrl}
        activePage="inicio"
        label="Importadora"
        whatsappNumber={importadora.whatsappNumber}
      />

      <ImportadoraHomeHero
        slug={importadora.slug}
        name={importadora.name}
        shortDescription={importadora.shortDescription}
        logoUrl={importadora.logoUrl}
        coverImageUrl={importadora.coverImageUrl}
        whatsappUrl={whatsappUrl}
      />
      
      <ImportadoraHomeKnowUs name={importadora.name} />

      <ImportadoraHomeActionCards slug={importadora.slug} />

      <ImportadoraFeaturedVehicles
        slug={importadora.slug}
        vehicles={importadora.featuredVehicles}
      />

      

      <ImportadoraShortProcess slug={importadora.slug} />

      <ImportadoraMobileProcessSticky slug={importadora.slug} />

      <div className="h-44 lg:hidden" />
    </ImportadoraPageShell>
  );
}
