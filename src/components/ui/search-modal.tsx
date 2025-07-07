"use client";

import { getSearchResults } from "@/lib/i18n/getSanityContent";
import { useLocale } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchResult {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  description?: string;
  category?: string;
  featuredImage?: {
    asset: {
      url: string;
    };
  };
  localized?: {
    value: {
      title: string;
      description: string;
    };
  };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { locale } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    perfumes: SearchResult[];
    news: SearchResult[];
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setResults(null);
      return;
    }

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(modalRef.current, {
        opacity: 0,
      });
      gsap.set(contentRef.current, {
        y: -20,
        opacity: 0,
      });

      // Animate in
      const tl = gsap.timeline();
      tl.to(modalRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      })
        .to(
          contentRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Focus input
      inputRef.current?.focus();
    });

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setResults(null);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const data = await getSearchResults(debouncedSearchTerm, locale);
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm, locale]);

  const handleClose = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onClose,
      });
      tl.to(contentRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      }).to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      );
    });

    return () => ctx.revert();
  };

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-blue-50/30 z-[200]"
          onClick={handleClose}
        >
          <div
            ref={contentRef}
            className="absolute top-0 left-0 right-0 w-screen h-screen flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[700px] w-full bg-background mx-auto shadow-md rounded-[0.8rem] max-h-[100vh] overflow-y-scroll">
              {/* Search Input */}
              <div className="p-[1rem] flex justify-between items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for perfumes, collections, or news..."
                  className="w-full bg-transparent py-4 pr-10 text-lg focus:outline-none focus:border-none"
                />
                <Image
                  src="/icons/close-thin-dark.svg"
                  alt="search"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={handleClose}
                />
              </div>

              {/* Results */}
              <div className="space-y-8">
                {isLoading ? (
                  <h6 className="p-[1rem] border border-foreground/20 pt-[1rem]">Loading...</h6>
                ) : (
                  results && (
                    <>
                      {/* Perfumes & Collections */}
                      {results.perfumes.length > 0 && (
                        <div className=" border-t border-foreground/20 pt-[1rem]">
                          <h6 className="text-lg font-medium mb-[1rem] px-[1rem]">
                            Perfumes & Collections
                          </h6>
                          <div className="flex flex-col">
                            {results.perfumes.map((item) => (
                              <Link
                                key={item._id}
                                href={`/${locale}/${
                                  item.category === "mens"
                                    ? "mens"
                                    : "womens"
                                }-perfume/${item.slug}`}
                                className="group flex gap-[1rem] hover:bg-foreground/5 p-[1rem] rounded-[0.8rem]"
                              >
                                <div className="relative overflow-hidden rounded-lg">
                                  {item.featuredImage ? (
                                    <Image
                                      src={item.featuredImage.asset.url}
                                      alt={
                                        item.localized?.value.title || item.title
                                      }
                                      width={100}
                                      height={100}
                                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                                      No image
                                    </div>
                                  )}
                                </div>
                                <p className="font-medium group-hover:text-primary transition-colors">
                                  {item.localized?.value.title || item.title || "No title"}
                                </p>
                                {item.localized?.value.description && (
                                  <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                                    {item.localized.value.description || "No description"}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* News */}
                      {results.news.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">News</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {results.news.map((item) => (
                              <Link
                                key={item._id}
                                href={`/${locale}/news/${item.slug}`}
                                className="group"
                              >
                                <div className="aspect-[3/4] relative mb-3 overflow-hidden rounded-lg">
                                  {item.featuredImage ? (
                                    <Image
                                      src={item.featuredImage.asset.url}
                                      alt={
                                        item.localized?.value.title || item.title
                                      }
                                      fill
                                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                                      No image
                                    </div>
                                  )}
                                </div>
                                <h4 className="font-medium group-hover:text-primary transition-colors">
                                  {item.localized?.value.title || item.title}
                                </h4>
                                {item.localized?.value.description && (
                                  <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                                    {item.localized.value.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No Results */}
                      {/* {results.perfumes.length === 0 &&
                        results.news.length === 0 && (
                          <div className="text-center py-12 text-foreground/60">
                            No results found for "{searchTerm}"
                          </div>
                        )} */}
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 