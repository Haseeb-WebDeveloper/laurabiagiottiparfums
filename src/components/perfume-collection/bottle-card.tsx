"use client";

import { forwardRef } from "react";

type BottleCardProps = {
  idx: number;
  src: string;
  alt: string;
  onHoverIn?: (idx: number) => void;
  onHoverOut?: (idx: number) => void;
  onClick?: (idx: number) => void;
  isOpen?: boolean;
};

// Focusable, accessible bottle image wrapper
const BottleCard = forwardRef<HTMLDivElement, BottleCardProps>(
  ({ idx, src, alt, onHoverIn, onHoverOut, onClick, isOpen }, ref) => {
    return (
      <div
        ref={ref}
        data-idx={idx}
        className="relative select-none will-change-transform"
      >
        <button
          type="button"
          aria-label={alt}
          aria-expanded={isOpen ? true : false}
          className="block outline-none cursor-pointer"
          onMouseEnter={() => onHoverIn?.(idx)}
          onMouseLeave={() => onHoverOut?.(idx)}
          onFocus={() => onHoverIn?.(idx)}
          onBlur={() => onHoverOut?.(idx)}
          onClick={() => onClick?.(idx)}
        >
          {/* using img for full control over transforms; Next/Image isn't necessary here */}
          <img
            src={src}
            alt={alt}
            className="pointer-events-none w-auto h-[200px]  md:h-[420px] object-contain"
            draggable={false}
          />
        </button>
      </div>
    );
  }
);

BottleCard.displayName = "BottleCard";

export default BottleCard;
