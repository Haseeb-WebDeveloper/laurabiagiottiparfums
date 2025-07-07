import Image from 'next/image';
import { ParallaxWrapper } from '../ParallaxWrapper';

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
  disabled?: boolean;
  fill?: boolean;
  sizes?: string;
}

export const ParallaxImage = ({
  src,
  alt,
  width,
  height,
  speed = 0.3,
  direction = 'up',
  className = '',
  loading = 'lazy',
  priority = false,
  disabled = false,
  fill = false,
  sizes,
}: ParallaxImageProps) => {
  return (
    <ParallaxWrapper
      speed={speed}
      direction={direction}
      className={className}
      disabled={disabled}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        loading={loading}
        priority={priority}
        style={{
          objectFit: 'cover',
          objectPosition: 'bottom',
          width: '100%',
          height: '100%',
          borderRadius: '1rem',
        }}
      />
    </ParallaxWrapper>
  );
};
