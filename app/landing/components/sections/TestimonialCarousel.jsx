import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star } from "lucide-react";
import { Quote } from "lucide-react";

export default function TestimonialCarousel({ title, testimonials }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-dls-section py-16 px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="max-w-6xl mx-auto">
       <Slider {...settings}>
  {testimonials.map((testimonial, index) => (
    <div key={index} className="px-2">
      <div className="h-56 bg-[#27364c] p-6 rounded-xl shadow-md border border-gray-700 flex flex-col justify-between text-center 
                  hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="flex items-start gap-2 mb-4">
          <Quote className=" w-5 h-5 text-yellow-400 flex-shrink-0"/>
           <p className="text-sm mb-4 italic text-white">{testimonial.message}</p>
           <Quote className=" w-5 h-5 text-yellow-400 flex-shrink-0"/>
        </div>
        <div className="flex justify-center gap-1 mb-2">
        <Star className="w-8 h-8 text-yellow-400 drop-shadow-sm"/> 
        <Star className="w-8 h-8 text-yellow-400 drop-shadow-sm"/>
        <Star className="w-8 h-8 text-yellow-400 drop-shadow-sm"/>
        <Star className="w-8 h-8 text-yellow-400 drop-shadow-sm"/>
        <Star className="w-8 h-8 text-yellow-400 drop-shadow-sm"/>
        </div>
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </div>
  ))}
</Slider>
      </div>
    </section>
  );
}