'use client'

import { useEffect, useRef } from 'react'
import { urlFor } from '@/lib/sanity/client'
import gsap from 'gsap'
import Image from 'next/image'

interface ImageCarouselBlockProps {
  value: {
    media: Array<{
      _type: 'image' | 'file'
      asset: {
        _ref?: string
        url?: string
      }
    }>
  }
}

export default function ImageCarouselBlock({ value }: ImageCarouselBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)


  // Double the media array for seamless looping
  const doubledMedia = [...value.media, ...value.media]

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = containerRef.current?.scrollWidth || 0
      const containerWidth = containerRef.current?.offsetWidth || 0

      // Calculate duration based on number of images
      const duration = doubledMedia.length <= 10 ? 10 : 20

      gsap.to(containerRef.current, {
        x: `-${totalWidth / 2}px`,
        duration: duration,
        ease: 'none',
        repeat: -1,
        runBackwards: false
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])


  return (
    <div className="overflow-hidden w-full py-[1vw]">
      <div
        ref={containerRef}
        className="flex gap-[1vw] w-full "
      >
        {doubledMedia.map((item, i) => {
          const url =
            item.asset?.url ||
            (item.asset?._ref ? urlFor(item.asset).url() : '')

          if (item._type === 'image') {
            return (
              <Image
                key={i}
                src={url}
                alt="carousel-img"
                width={500}
                height={300}
                className="shadow w-full h-auto object-cover md:max-h-[30vw] max-h-[50vw]"
              />
            )
          } else if (item._type === 'file' && url) {
            return (
              <video
                key={i}
                src={url}
                muted
                loop
                autoPlay
                playsInline
                className="shadow w-[100%] h-auto object-cover md:max-h-[30vw] max-h-[50vw]"
              />
            )
          }
        })}
      </div>
    </div>
  )
}
