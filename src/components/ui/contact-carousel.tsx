"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Logo {
  id: string;
  image: string;
  className?: string;
}

interface ContactCarouselProps {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const ContactCarousel = ({
  heading = "Our Sponsors",
  logos = [],
  className,
}: ContactCarouselProps) => {
  return (
    <section className={`overflow-hidden mb-[3vw] lg:mb-0 ${className || ''}`}>
      <div className="mx-auto flex flex-col items-center gap-10">
        {heading && (
          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-pretty text-[2.5rem] lg:text-[5rem] uppercase font-bold">
              {heading}
            </h1>
          </div>
        )}
        <div className="w-full">
          <div className="relative mx-auto flex items-center justify-center">
            <Carousel
              opts={{
                loop: true,
                align: "start",
                dragFree: false,
                containScroll: "trimSnaps",
                // Disable drag functionality
                watchDrag: false,
              }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                  speed: 2,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                  direction: "forward",
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="flex items-center" style={{ gap: '2rem' }}>
                {[...logos, ...logos].map((logo, index) => (
                  <CarouselItem
                    key={`${logo.id}-${index}`}
                    className="flex-shrink-0"
                    style={{ flex: 'none' }}
                  >
                    <div className="flex items-center justify-center h-20">
                      <img
                        src={logo.image}
                        alt={logo.id}
                        className={`max-h-full w-auto object-contain ${logo.className || ''}`}
                        style={{ maxWidth: '200px' }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            {/* Gradient overlays */}
            <div className="absolute -left-1 w-[10vw] h-full bg-gradient-to-r from-[#040404] from-3% to-transparent"></div>
            <div className="absolute -right-1 w-[10vw] h-full bg-gradient-to-l from-[#040404] from-3% to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ContactCarousel };