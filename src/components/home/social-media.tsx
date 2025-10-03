"use client";

import { ParallaxImage } from "../ui/ParallaxImage";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import SplitText from "../ui/split-text";
import { useInstagram } from "@/hooks/useInstagram";
import { useInstagramStats } from "@/hooks/useInstagramStats";
import { InstagramPost } from "@/types/insta-post";
import { useLocale } from "@/lib/i18n/context";

interface SocialMediaProps {
  refreshInterval?: number;
  limit?: number;
}

export default function SocialMedia({
  refreshInterval = 60000, // 1 minute
  limit = 4,
}: SocialMediaProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRef = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useLocale();

  // Fetch Instagram data
  const { posts, isLoading, error, refresh } = useInstagram(
    limit,
    refreshInterval
  );
  const { stats, isLoading: statsLoading } = useInstagramStats();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);

    // Animate description down
    gsap.to(descriptionRef.current[index], {
      y: 0,
      opacity: 1,
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out",
    });

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

    // Animate description up
    gsap.to(descriptionRef.current[index], {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });

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
    // Initialize icons and descriptions position
    iconsRef.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref.children, {
          y: 20,
          opacity: 0,
        });
      }
    });

    descriptionRef.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, {
          y: -20,
          opacity: 0,
        });
      }
    });
  }, [posts]); // Re-run when posts change

  const truncateCaption = (
    caption: string,
    maxLength: number = 100
  ): string => {
    if (!caption) return "";
    return caption.length > maxLength
      ? caption.substring(0, maxLength) + "..."
      : caption;
  };

  // Loading state
  if (isLoading && posts.length === 0 && statsLoading) {
    return (
      <section className="">
        <div>
          <h2
            className="md:text-[3rem] text-[2.25rem] font-bold"
            style={{
              letterSpacing: "-0.04em",
              marginBottom: "0.5rem",
            }}
          >
            {t("followUsOnInstagram")}
          </h2>
        </div>
        <SplitText
          text={t("becomeALover")}
          element="p"
          className="text-[1rem] "
        />

        {/* Loading grid */}
        <div className="mt-[2.5rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(limit)].map((_, index) => (
            <div
              key={index}
              className="aspect-square relative overflow-hidden bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error && posts.length === 0 && statsLoading) {
    return (
      <section className="">
        <div
          style={{
            letterSpacing: "-0.04em",
            marginBottom: "0.5rem",
          }}
        >
          <SplitText
            text={t("followUsOnInstagram")}
            variant="heading"
            element="h2"
            className="md:text-[3rem] text-[2.2rem] font-bold"
          />
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Unable to load Instagram posts</p>
          <button
            onClick={() => refresh()}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  console.log("posts", posts);


  return (
    <section className="">
      <div>
        <h2
          className="md:text-[3rem] text-[2.2rem] font-bold"
          style={{
            letterSpacing: "-0.04em",
            marginBottom: "0.5rem",
          }}
        >
          Follow us on Instagram
        </h2>
      </div>
      <div className="">
        <SplitText
          text="Become a #LBlover!"
          className="text-[1rem] "
          element="p"
        />
      </div>

      <div className="mt-[2rem] w-full flex flex-col gap-y-[1.5rem] md:flex-row justify-between">
        <div className="flex gap-[1rem] items-center">
          <div className="flex items-center rounded-full relative  md:w-[62px] md:h-[62px] w-[45px] h-[45px]">
            <Image
              src={stats?.profilePicture || "/logo/insta-bg.jpg"}
              alt="Social Media"
              width={100}
              height={100}
              className="z-10 absolute top-0 left-0 scale-[96%] w-full h-full object-cover rounded-full aspect-square"
            />
            <Image
              src="/logo/insta-bg.jpg"
              alt="Social Media"
              width={100}
              height={100}
              className="absolute top-0 left-0 w-full h-feull object-cover rounded-full aspect-square"
            />
          </div>
          <div className="flex flex-col md:gap-[0.2rem]">
            <div className="flex gap-[0.5rem] items-center relative">
              <Link
                onMouseEnter={() => setHoveredLink(0)}
                onMouseLeave={() => setHoveredLink(null)}
                href={`https://www.instagram.com/${stats?.username || "laurabiagiottiparfums"}`}
                target="_blank"
                className=""
              >
                <SplitText
                  text={stats?.name || "Laura Biagiotti Parfums"}
                  variant="heading"
                  element="p"
                  className="md:text-[2rem] text-[1.75rem] tracking-[2px]"
                  style={{
                    wordSpacing: "0.15em",
                    fontWeight: "700",
                    lineHeight: "110%",
                  }}
                />
              </Link>
              <Image
                src="/icons/varify.svg"
                alt="Check"
                width={20}
                height={20}
                className="w-[1rem] h-[1rem] hidden md:block"
              />
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
                className="absolute z-[200] bottom-[3px] left-0 bg-foreground"
              />
            </div>
            <Link
              onMouseEnter={() => setHoveredLink(1)}
              onMouseLeave={() => setHoveredLink(null)}
              href={`https://www.instagram.com/${stats?.username || "laurabiagiottiparfums"}`}
              target="_blank"
              className="text-[1rem] w-fit relative"
            >
              <SplitText
                text={`@${stats?.username || "laurabiagiottiparfums"}`}
                variant="paragraph"
                element="p"
                className="text-[1rem]"
              />
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
                className="absolute z-[200] bottom-[2px] left-0 bg-foreground"
              />
            </Link>
          </div>
        </div>

        {/* Dynamic Stats */}
        <div className="flex gap-[3rem] px-[0.5rem]">
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.2rem]">
            <SplitText
              text={stats?.posts || ""}
              variant="paragraph"
              element="h3"
              className="md:text-[2rem] text-[1.8rem] font-semibold"
            />
            <SplitText
              text="Posts"
              variant="paragraph"
              element="p"
              className="text-[1rem]"
            />
          </div>
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.2rem]">
            <SplitText
              text={stats?.followers || ""}
              variant="paragraph"
              element="h3"
              className="md:text-[2rem] text-[1.8rem] font-semibold"
            />
            <SplitText
              text="Followers"
              variant="paragraph"
              element="p"
              className="text-[1rem]"
            />
          </div>
          <div className="flex flex-col md:gap-[0.2rem] gap-[0.2rem]">
            <SplitText
              text={stats?.following || ""}
              variant="paragraph"
              element="h3"
              className="md:text-[2rem] text-[1.8rem] font-semibold"
            />
            <SplitText
              text="Following"
              variant="paragraph"
              element="p"
              className="text-[1rem]"
            />
          </div>
        </div>
      </div>

      {/* Instagram Posts Grid */}
      <div className="mt-[2.5rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post: InstagramPost, index: number) => (
          <div
            key={post.id}
            className="aspect-square relative overflow-hidden group"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <ParallaxImage
                src={
                  post.media_type === "VIDEO"
                    ? post.thumbnail_url || post.media_url
                    : post.media_url
                }
                alt={post.caption || "Instagram post"}
                fill
                className=""
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/60 transition-colors" />

              {/* Video indicator */}
              {post.media_type === "VIDEO" && (
                <div className="absolute top-4 right-4 z-50">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              <p
                ref={(el) => {
                  if (el) {
                    descriptionRef.current[index] = el;
                  }
                }}
                className="absolute z-[60] top-4 left-0 px-[1rem] text-[1rem] text-white opacity-0"
              >
                {truncateCaption(post.caption)}
              </p>

              <div
                ref={(el) => {
                  if (el) {
                    iconsRef.current[index] = el;
                  }
                }}
                className="absolute z-[60] bottom-4 left-5 flex gap-3"
              >
                {/* Heart Icon */}
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
                    stroke={
                      hoveredIcon === `heart-${index}` ? "white" : "white"
                    }
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                {/* Comment Icon */}
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
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-[2.5rem]">
        <Link
          href={`https://www.instagram.com/${stats?.username || "laurabiagiottiparfums"}`}
          target="_blank"
          className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          {t("follow")}
        </Link>
      </div>
    </section>
  );
}
