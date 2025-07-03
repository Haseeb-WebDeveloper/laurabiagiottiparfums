'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Product {
  id: string;
  image: string;
  title: string;
  description: string;
  meta: {
    price: string;
    category: string;
    rating: number;
  };
}

interface ThreeColumnScrollProps {
  products: Product[];
}

const ThreeColumnScroll: React.FC<ThreeColumnScrollProps> = ({ products }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Distribute products into columns (2-4-3 layout)
  const leftProducts = products.slice(0, 2);
  const centerProducts = products.slice(2, 6);
  const rightProducts = products.slice(6, 9);

  useGSAP(() => {
    if (typeof window === 'undefined') return;
    
    const container = containerRef.current;
    const leftColumn = leftColumnRef.current;
    const centerColumn = centerColumnRef.current;
    const rightColumn = rightColumnRef.current;

    if (!container || !leftColumn || !centerColumn || !rightColumn) return;

    // Check if it's mobile view
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Reset transforms for mobile
      gsap.set([leftColumn, centerColumn, rightColumn], { y: 0 });
      return;
    }

    // Wait for layout to settle
    setTimeout(() => {
      // Get the viewport height for calculations
      const vh = window.innerHeight;
      
      // Calculate different scroll speeds for parallax effect
      const leftSpeed = 0;  
      const centerSpeed = 2000 ; 
      const rightSpeed = 1000;  

      console.log(leftSpeed, centerSpeed, rightSpeed);

      // Create individual ScrollTriggers for each column
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false, // Set to true for debugging
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(leftColumn, {
            y: -progress * leftSpeed,
            force3D: true
          });
        }
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(centerColumn, {
            y: -progress * centerSpeed,
            force3D: true
          });
        }
      });

      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(rightColumn, {
            y: -progress * rightSpeed,
            force3D: true
          });
        }
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

  }, { scope: containerRef });

  // Handle window resize
  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Product Showcase</h1>
          <p className="text-lg md:text-xl opacity-80">Scroll to explore our amazing products</p>
        </div>
      </div>

      {/* Three Column Scroll Section */}
      <div 
        ref={containerRef}
        className="relative min-h-[300vh] bg-gray-50"
      >
        {/* Desktop: 3 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 h-auto md:h-screen p-4 md:p-8">
          {/* Left Column - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block relative">
            <div ref={leftColumnRef} className="space-y-6">
              {leftProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Center Column - Mobile: all products, Desktop: center products */}
          <div className="relative">
            <div ref={centerColumnRef}>
              {/* Mobile: show all products, Desktop: show center products */}
              <div className="md:hidden space-y-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="hidden md:block space-y-6">
                {centerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Hidden on mobile, shown on desktop */}
          <div className="hidden md:block relative">
            <div ref={rightColumnRef} className="space-y-6">
              {rightProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">End of Showcase</h2>
          <p className="text-lg opacity-80">All columns finished scrolling together!</p>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
          <span className="text-lg font-semibold text-purple-600">
            {product.meta.price}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {product.meta.category}
          </span>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < product.meta.rating ? 'text-yellow-400' : 'text-gray-300'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.meta.rating})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColumnScroll;