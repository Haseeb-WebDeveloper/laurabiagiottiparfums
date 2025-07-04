"use client"

import { useEffect, useState } from "react";

export default function Rotate() {
  const [rotation, setRotation] = useState(0);
  
  const tempImages = [
    "/3d-test-2.webp",
    "/3d-test.webp",
    "/3d-test-2.webp",
    "/3d-test.webp",
    "/3d-test-2.webp",
    "/3d-test.webp",
    "/3d-test-2.webp",
    "/3d-test.webp",
  ];

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const delta = e.deltaY;
      setRotation(prev => prev + (delta > 0 ? 2 : -2));
    };

    window.addEventListener('wheel', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const totalSlides = tempImages.length;
  const radius = 350; // Distance from center

  return (
    <div className="h-screen w-full flex items-center justify-center" style={{ perspective: "1000px" }}>
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{ 
          transformStyle: "preserve-3d",
          transform: `rotateX(-6deg) rotateY(${rotation}deg)`,
        }}
      >
        {tempImages.map((item, index) => {
          // Calculate position in the circle
          const angle = (index * 2 * Math.PI) / totalSlides;
          const x = radius * Math.sin(angle);
          const z = radius * Math.cos(angle);
          
          return (
            <div
              key={index}
              className="slide absolute"
              style={{
                width: "300px",
                height: "300px",
                transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-rotation}deg)`,
              }}
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={item}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}