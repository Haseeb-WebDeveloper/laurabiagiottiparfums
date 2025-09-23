"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Perfume } from "@/types/perfume";
import ProductCard from "./product-card";
import BuyNowPopup from "../ui/buy-now-popup";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ThreeColumnScrollProps {
  products: Perfume[];
  locale: string;
}

const ThreeColumnScroll: React.FC<ThreeColumnScrollProps> = ({ products, locale }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // Keep references to created ScrollTriggers so we don't kill unrelated ones
  const leftSTRef = useRef<ScrollTrigger | null>(null);
  const centerSTRef = useRef<ScrollTrigger | null>(null);
  const rightSTRef = useRef<ScrollTrigger | null>(null);

  const handleBuyNowClick = (product: Perfume) => {
    setSelectedPerfume(product);
    setIsPopupOpen(true);
  };

  // Distribute products based on screen size
  const getProductDistribution = () => {
    // Large screens (lg): 2-4-3 layout
    const leftProducts = products.slice(0, 2);
    const centerProducts = products.slice(2, 6);
    const rightProducts = products.slice(6, 9);

    // Medium screens (md): 2-7 layout
    const leftProductsMd = products.slice(0, 2);
    const rightProductsMd = products.slice(2, 9);

    return {
      // Large screens
      leftProducts,
      centerProducts,
      rightProducts,
      // Medium screens
      leftProductsMd,
      rightProductsMd,
    };
  };

  const { leftProducts, centerProducts, rightProducts, leftProductsMd, rightProductsMd } = getProductDistribution();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const container = containerRef.current;
      const leftColumn = leftColumnRef.current;
      const centerColumn = centerColumnRef.current;
      const rightColumn = rightColumnRef.current;

      if (!container || !leftColumn || !rightColumn) return;

      // Check screen size
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const isDesktop = window.innerWidth >= 1024;

      if (isMobile) {
        // Reset transforms for mobile
        gsap.set([leftColumn, centerColumn, rightColumn], { y: 0 });
        container.style.height = 'auto';
        setMinHeight(0);
        window.dispatchEvent(new CustomEvent("columnHeightSet"));
        return;
      }

      // Create a context for our animations
      const ctx = gsap.context(() => {
        let leftHeight, centerHeight, rightHeight;

        if (isTablet) {
          // For tablet: only left and right columns
          leftHeight = leftColumn.offsetHeight;
          rightHeight = rightColumn.offsetHeight;
          
          // Find the shortest column to use as reference
          const minColumnHeight = Math.min(leftHeight, rightHeight);
          
          // Set container height
          container.style.height = `${minColumnHeight}px`;
          setMinHeight(minColumnHeight);
          
          // Calculate scroll speeds
          const leftSpeed = leftHeight - minColumnHeight;
          const rightSpeed = rightHeight - minColumnHeight;

          // Kill existing triggers created by this component only
          leftSTRef.current?.kill();
          rightSTRef.current?.kill();

          const commonScrollTriggerConfig = {
            trigger: container,
            start: `top ${isDesktop ? "190px" : "60px"}`,
            end: "bottom bottom",
            scrub: 0.8, // Slightly slower scrub for smoother feel
            invalidateOnRefresh: true,
          };

          // Left column animation
          leftSTRef.current = ScrollTrigger.create({
            ...commonScrollTriggerConfig,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(leftColumn, {
                y: -progress * leftSpeed,
                duration: 0.1,
                ease: "power2.out",
                force3D: true,
                overwrite: "auto",
              });
            },
          });

          // Right column animation
          rightSTRef.current = ScrollTrigger.create({
            ...commonScrollTriggerConfig,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(rightColumn, {
                y: -progress * rightSpeed,
                duration: 0.1,
                ease: "power2.out",
                force3D: true,
                overwrite: "auto",
              });
            },
          });

        } else if (isDesktop) {
          // For desktop: all three columns
          if (!centerColumn) return;

          leftHeight = leftColumn.offsetHeight;
          centerHeight = centerColumn.offsetHeight;
          rightHeight = rightColumn.offsetHeight;

          // Find the shortest column to use as reference
          const minColumnHeight = Math.min(leftHeight, centerHeight, rightHeight) + 2000;

          // Set container height
          container.style.height = `${minColumnHeight}px`;
          setMinHeight(minColumnHeight);

          // Calculate scroll speeds
          const leftSpeed = leftHeight - minColumnHeight;
          const centerSpeed = centerHeight - minColumnHeight;
          const rightSpeed = rightHeight - minColumnHeight;

          // Kill existing triggers created by this component only
          leftSTRef.current?.kill();
          centerSTRef.current?.kill();
          rightSTRef.current?.kill();

          const commonScrollTriggerConfig = {
            trigger: container,
            start: "top +=190px",
            end: "bottom bottom",
            scrub: 0.8, // Slightly slower scrub for smoother feel
            invalidateOnRefresh: true,
          };

          // Left column animation
          leftSTRef.current = ScrollTrigger.create({
            ...commonScrollTriggerConfig,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(leftColumn, {
                y: -progress * leftSpeed,
                duration: 0.1,
                ease: "power2.out",
                force3D: true,
                overwrite: "auto",
              });
            },
          });

          // Center column animation
          centerSTRef.current = ScrollTrigger.create({
            ...commonScrollTriggerConfig,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(centerColumn, {
                y: -progress * centerSpeed,
                duration: 0.1,
                ease: "power2.out",
                force3D: true,
                overwrite: "auto",
              });
            },
          });

          // Right column animation
          rightSTRef.current = ScrollTrigger.create({
            ...commonScrollTriggerConfig,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.to(rightColumn, {
                y: -progress * rightSpeed,
                duration: 0.1,
                ease: "power2.out",
                force3D: true,
                overwrite: "auto",
              });
            },
          });
        }

        // Dispatch event when height is set
        window.dispatchEvent(new CustomEvent("columnHeightSet"));

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();
      }, containerRef);

      // Cleanup
      return () => {
        ctx.revert();
        leftSTRef.current?.kill();
        centerSTRef.current?.kill();
        rightSTRef.current?.kill();
      };
    },
    { scope: containerRef, dependencies: [minHeight] }
  );

  // Handle window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Three Column Scroll Section */}
      <div className={`relative pb-[3rem]`}>
        {/* Responsive Grid Layout */}
        <div
          ref={containerRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-24 lg:gap-y-[7.5rem] overflow-hidden`}
        >
          {/* Left Column */}
          <div
            ref={leftColumnRef}
            className="hidden md:block overflow-hidden h-fit"
          >
            <div className="flex flex-col gap-y-24 lg:gap-y-[5rem]">
              {/* Large screens: show leftProducts, Medium screens: show leftProductsMd */}
              <div className="lg:hidden">
                {leftProductsMd.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    locale={locale} 
                    onBuyNowClick={handleBuyNowClick}
                  />
                ))}
              </div> 
              <div className="hidden lg:flex flex-col gap-y-24 lg:gap-y-[5rem]">
                {leftProducts.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    locale={locale} 
                    onBuyNowClick={handleBuyNowClick}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Only visible on large screens */}
          <div 
            ref={centerColumnRef} 
            className="hidden lg:block overflow-hidden h-fit pb-[1px]"
          >
            <div className="flex flex-col gap-y-24 lg:gap-y-[5rem]">
              {centerProducts.map((product, index) => (
                <ProductCard 
                  key={index} 
                  product={product} 
                  locale={locale} 
                  onBuyNowClick={handleBuyNowClick}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div
            ref={rightColumnRef}
            className="overflow-hidden h-fit"
          >
            <div className="flex flex-col gap-y-24 lg:gap-y-[5rem]">
              {/* Mobile: show all products */}
              <div className="md:hidden flex flex-col gap-y-20">
                {products.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    locale={locale} 
                    onBuyNowClick={handleBuyNowClick}
                  />
                ))}
              </div>
              
              {/* Medium screens: show rightProductsMd */}
              <div className="hidden md:block lg:hidden">
                {rightProductsMd.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    locale={locale} 
                    onBuyNowClick={handleBuyNowClick}
                  />
                ))}
              </div>
              
              {/* Large screens: show rightProducts */}
              <div className="hidden lg:flex flex-col gap-y-24 lg:gap-y-[5rem]">
                {rightProducts.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    locale={locale} 
                    onBuyNowClick={handleBuyNowClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Render popup outside of the columns */}
      {selectedPerfume?.buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => {
            setIsPopupOpen(false);
            setSelectedPerfume(null);
          }}
          countries={selectedPerfume.buy.countries}
          locale={locale}
        />
      )}
    </div>
  );
};

export default ThreeColumnScroll;