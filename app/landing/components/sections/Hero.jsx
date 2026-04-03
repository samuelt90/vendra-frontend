import Button from '../ui/Button';
import heroImage from '../../assets/images/hero-image.svg';

export default function Hero({ title, subtitle, ctaText, ctaHref = "#", showButton = true }) {
  return (
    <section className="bg-dls-section text-white py-24">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
    
    {/* Columna de texto */}
    <div className="flex-1 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-lg md:text-xl text-white/90 mb-10">{subtitle}</p>
      {showButton && (
        <Button text={ctaText} href={ctaHref} icon="info" className="text-base" />
      )}
    </div>

    {/* Columna de imagen */}
    <div className="flex-1">
      <img
        src="/assets/images/hero-image.svg" 
        alt="Demo de ecommerce"
        className="w-full max-w-md mx-auto rounded-xl shadow-xl shadow-black/25 transition-transform duration-300 hover:scale-105"
      />
    </div>

  </div>
</section>
  );
}