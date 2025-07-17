"use client";

import { SocialMediaImage } from "@/types/home-page";
import { ParallaxImage } from "../ui/ParallaxImage";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function SocialMedia({
  socialMediaImages,
}: {
  socialMediaImages: SocialMediaImage[];
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);

    // Animate icons up
    gsap.to(iconsRef.current[index]?.children as any, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.2,
      stagger: 0.1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    setHoveredIcon(null);

    // Animate icons down
    gsap.to(iconsRef.current[index]?.children as any, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.in",
    });
  };

  useEffect(() => {
    // Initialize icons position
    iconsRef.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref.children, {
          y: 20,
          opacity: 0,
        });
      }
    });
  }, []);

  return (
    <section className="">
      <h2
        className="md:text-[3rem] text-[2.4rem] font-bold"
        style={{
          letterSpacing: "-0.04em",
          marginBottom: "0.5rem",
        }}
      >
        Follow us on Instagram
      </h2>
      <p className="text-[1rem]">Become a #LBlover!</p>
      <div className="mt-[2rem] w-full flex flex-col gap-y-[1.5rem] md:flex-row justify-between">
        <div className="flex gap-[1rem] items-center">
          <div className="h-full flex items-center">
            <Image
              src="/logo/insta-logo.png"
              alt="Social Media"
              width={100}
              height={100}
              className="md:w-[65px] md:h-[65px] w-[45px] h-[45px] object-cover rounded-full aspect-square"
            />
          </div>
          <div className="flex flex-col md:gap-[0.19rem] gap-[0rem]">
            <Link
              onMouseEnter={() => setHoveredLink(0)}
              onMouseLeave={() => setHoveredLink(null)}
              href="https://www.instagram.com/laurabiagiottiparfums/"
              target="_blank"
              className="md:text-[2rem] text-[1.7rem] font-bold tracking-wider relative"
              style={{
                wordSpacing: "0.15em",
              }}
            >
              Laura Biagiotti Parfums
              <motion.div
                initial={{ width: 0, height: 2 }}
                animate={
                  hoveredLink === 0
                    ? {
                        width: "100%",
                        height: 1,
                        opacity: 1,
                        transition: {
                          width: { duration: 0.4, ease: "easeInOut" },
                          height: { delay: 0.4, duration: 0.2 },
                        },
                      }
                    : {
                        width: 0,
                        height: 2,
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }
                }
                className="absolute z-[200] -bottom-[1px] left-0 bg-foreground"
              />
            </Link>
            <Link
              onMouseEnter={() => setHoveredLink(1)}
              onMouseLeave={() => setHoveredLink(null)}
              href="https://www.instagram.com/laurabiagiottiparfums/"
              target="_blank"
              className="text-[1rem] w-fit relative"
            >
              @laurabiagiottiparfums
              <motion.div
                initial={{ width: 0, height: 2 }}
                animate={
                  hoveredLink === 1
                    ? {
                        width: "100%",
                        height: 1,
                        opacity: 1,
                        transition: {
                          width: { duration: 0.4, ease: "easeInOut" },
                          height: { delay: 0.4, duration: 0.2 },
                        },
                      }
                    : {
                        width: 0,
                        height: 2,
                        opacity: 0,
                        transition: { duration: 0.2 },
                      }
                }
                className="absolute z-[200] -bottom-[2px] left-0 bg-foreground"
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-[3rem] px-[0.5rem]">
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.3rem]">
            <h6 className="md:text-[2rem] text-[1.8rem] font-semibold">976</h6>
            <p className="text-[1rem]">Posts</p>
          </div>
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.3rem]">
            <h6 className="md:text-[2rem] text-[1.8rem] font-semibold">25.6K</h6>
            <p className="text-[1rem]">Followers</p>
          </div>
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.3rem]">
            <h6 className="md:text-[2rem] text-[1.8rem] font-semibold">251</h6>
            <p className="text-[1rem]">Following</p>
          </div>
        </div>
      </div>
      <div className="mt-[2.5rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {socialMediaImages.map((social, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <ParallaxImage
                src={social.image.asset.url}
                alt="Social Media"
                fill
                className=""
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/60 transition-colors" />
            <div
              ref={(el) => {
                if (el) {
                  iconsRef.current[index] = el;
                }
              }}
              className="absolute z-[60] bottom-4 left-5 flex gap-3"
            >
              <div
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIcon(`heart-${index}`)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="transition-colors duration-200"
                  fill={hoveredIcon === `heart-${index}` ? "white" : "none"}
                  stroke={hoveredIcon === `heart-${index}` ? "white" : "white"}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIcon(`comment-${index}`)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="transition-colors duration-200"
                  fill={hoveredIcon === `comment-${index}` ? "white" : "none"}
                  stroke={
                    hoveredIcon === `comment-${index}` ? "white" : "white"
                  }
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </div>
            </div>
            </a>

          </div>
        ))}
      </div>
      <div className="mt-[2.5rem]">
        <Link
          href="https://www.instagram.com/laurabiagiottiparfums/"
          target="_blank"
          className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Follow
        </Link>
      </div>
    </section>
  );
}
