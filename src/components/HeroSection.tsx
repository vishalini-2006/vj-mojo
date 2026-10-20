// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import heroBanner from "@/assets/hero-banner.jpg";

// const HeroSection = () => (
//   <section className="relative overflow-hidden">
//     {/* Background image */}
//     <div className="absolute inset-0">
//       <img src={heroBanner} alt="Auto Parts" className="h-full w-full object-cover" />
//       <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
//     </div>

//     {/* Content — reduced py from py-16/py-24 to py-8/py-10 */}
//     <div className="relative px-4 py-14 sm:px-6 sm:py-20">

//       {/* Single clear message */}
//       <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
//         <span className="text-gradient">VK Auto Parts</span>
//         <br />
//         <p className="mt-3 max-w-xs text-sm text-muted-foreground font-body normal-case">
//           Premium automobile spare parts at unbeatable prices.
//         </p>
//       </h1>

//       {/* Single CTA */}
//       <Link
//         to="/products"
//         className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-gradient px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
//       >
//         Shop Now
//         <ArrowRight className="h-4 w-4" />
//       </Link>

//     </div>
//   </section>
// );

// export default HeroSection;

import { useState, useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import bannerBags from "@/assets/banner-bags.jpeg";
import heroBanner from "@/assets/hero-banner.jpg";

const banners = [
  {
    id: 1,
    image: bannerBags,
    alt: "Bags Collection",
  },
  {
    id: 2,
    image: heroBanner,
    alt: "Auto Parts",
  },
];

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative overflow-hidden rounded-b-2xl group">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="ml-0">
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="pl-0 relative min-h-[200px] sm:min-h-[300px]">
              {/* Full Background image without dark overlays so the banner stands out */}
              <div className="absolute inset-0">
                <img
                  src={banner.image}
                  alt={banner.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Indicator dots at the bottom center */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "w-6 bg-[#96206c]" : "w-2 bg-white/70"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;