import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ParallaxSections = () => {
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Pin the first section and let the second section slide over it
    ScrollTrigger.create({
      trigger: section1Ref.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });

    // Parallax effect for section 2 sliding over section 1
    // Make the parallax effect slower by increasing the scrub value
    gsap.fromTo(
      section2Ref.current,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 2, // Increased scrub value for slower effect
        },
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Section 1 - Will be pinned */}
      <section
        ref={section1Ref}
        className="relative h-screen overflow-hidden"
        style={{
          backgroundImage: "url('/test-1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 h-full flex items-center justify-center text-white px-8">
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ocean Dreams
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Dive into the depths of creativity where innovation meets
              imagination. Every scroll reveals new possibilities in the digital
              ocean.
            </p>
            <div className="mt-12 flex justify-center space-x-8">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-ping delay-200"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-ping delay-400"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Will slide over Section 1 */}
      <section
        ref={section2Ref}
        className="relative h-screen overflow-hidden z-20"
        style={{
          backgroundImage: "url('/test-2.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white px-8">
          <div className="max-w-4xl text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Sunset Horizon
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Where the sky meets endless possibilities. Experience the warmth
              of innovation as we paint the digital landscape with bold new
              ideas.
            </p>
            <div className="mt-12">
              <button className="px-8 py-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Explore Further
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParallaxSections;
