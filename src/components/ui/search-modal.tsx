"use client";

import { getSearchResults } from "@/lib/i18n/getSanityContent";
import { useLocale } from "@/lib/i18n/context";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/use-debounce";
import { Dialog, DialogClose, DialogContent } from "./dialog";

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
  const { locale, t } = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    perfumes: SearchResult[];
    news: SearchResult[];
  } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Separate perfumes and collections
  const separateResults = (results: SearchResult[] | undefined) => {
    if (!results) return { perfumes: [], collections: [] };
    return {
      perfumes: results.filter(
        (item) => item._type === "perfume" || item._type === "mainPerfume"
      ),
      collections: results.filter((item) => item._type === "collections"),
    };
  };

  // Enhanced scroll lock with wheel event prevention
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Prevent wheel events on body
      const preventScroll = (e: WheelEvent | TouchEvent) => {
        // Only prevent if the scroll is not within our dialog
        if (
          scrollContainerRef.current &&
          !scrollContainerRef.current.contains(e.target as Node)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, { passive: false });

      return () => {
        // Restore scroll
        const scrollY = document.body.style.top;
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        }

        document.removeEventListener("wheel", preventScroll);
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setResults(null);
      return;
    }

    // Focus input when modal opens
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
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

  // Handle scroll events within the dialog
  const handleDialogScroll = (e: React.WheelEvent) => {
    // Stop propagation to prevent body scroll
    e.stopPropagation();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-[640px] lg:w-[95%] w-[91%] p-0 gap-0 z-[110] overflow-hidden flex flex-col lg:max-h-[99vh] max-h-[45vh] rounded-md"
        hideDefaultCloseIcon={true}
        onWheel={handleDialogScroll}
      >
        <button
          onClick={onClose}
          className="cursor-pointer z-[110] group absolute top-4 right-3 flex size-7 items-center justify-center"
        >
          <Image
            src="/icons/close-thin-dark.svg"
            alt="Close"
            width={20}
            height={20}
            className="dark:invert"
          />
          <span className="sr-only">Close</span>
        </button>

        {/* Search Input */}
        <div className="p-[1.2rem] flex justify-between items-center text-[1rem]">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search")}
            className="w-full text-[1rem] pr-10 text-lg focus:outline-none"
          />
        </div>

        {/* Results - This is the scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain"
          style={{
            // Ensure this container handles its own scrolling
            overscrollBehavior: "contain",
          }}
          onWheel={handleDialogScroll}
        >
          {isLoading ? (
            <h6 className="border border-t-[1px] font-bold text-[1rem] px-[1rem] py-[0.5rem]">
              Loading...
            </h6>
          ) : (
            results && (
              <>
                <div className="border-t-[1px] border-foreground/10">
                  {/* Perfumes */}
                  {separateResults(results.perfumes).perfumes.length > 0 && (
                    <div>
                      <h6 className="sticky top-0 bg-background z-10 px-[1rem] pt-[1rem] pb-[0.5rem] text-[1rem] font-medium border-b border-foreground/10">
                        Perfumes
                      </h6>
                      <div className="flex flex-col">
                        {separateResults(results.perfumes).perfumes.map(
                          (item) => (
                            <Link
                              key={item._id}
                              href={`/${locale}/${
                                item.category === "mens" ? "mens" : "womens"
                              }-perfume/${item.slug}`}
                              className="group flex items-center lg:items-start gap-[1rem] hover:bg-foreground/10 px-[1rem] py-[1.5rem]"
                              onClick={onClose}
                            >
                              <div className="relative overflow-hidden rounded-xl">
                                {item.featuredImage ? (
                                  <Image
                                    src={item.featuredImage.asset.url}
                                    alt={
                                      item.localized?.value.title || item.title
                                    }
                                    width={90}
                                    height={90}
                                    className="object-cover rounded-xl"
                                  />
                                ) : (
                                  <div className="w-[100px] h-[100px] bg-foreground/5 flex items-center justify-center">
                                    No image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="line-clamp-1 lg:text-[1rem] text-[1.1rem] font-bold">
                                  {item.title}
                                </p>
                                <p
                                  className="lg:text-[0.8rem] text-[1rem] leading-[110%] mt-1 line-clamp-2"
                                  style={{
                                    wordSpacing: "0em",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p className="text-[0.9rem] pt-[1rem] ">
                                  {t("learnMore")}
                                </p>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Collections */}
                  {separateResults(results.perfumes).collections.length > 0 && (
                    <div>
                      <h6 className="sticky top-0 bg-background z-10 px-[1rem] pt-[1rem] pb-[0.5rem] text-[1rem] font-medium border-b border-foreground/10">
                        Collections
                      </h6>
                      <div className="flex flex-col">
                        {separateResults(results.perfumes).collections.map(
                          (item) => (
                            <Link
                              key={item._id}
                              href={`/${locale}/${
                                item.category === "mens" ? "mens" : "womens"
                              }-perfume/${item.slug}`}
                              className="group flex items-center lg:items-start gap-[1rem] hover:bg-foreground/10 px-[1rem] py-[1.5rem]"
                              onClick={onClose}
                            >
                              <div className="relative overflow-hidden rounded-xl">
                                {item.featuredImage ? (
                                  <Image
                                    src={item.featuredImage.asset.url}
                                    alt={item.title}
                                    width={90}
                                    height={90}
                                    className="object-cover rounded-xl"
                                  />
                                ) : (
                                  <div className="w-[100px] h-[100px] bg-foreground/5 flex items-center justify-center">
                                    No image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="line-clamp-1 lg:text-[1rem] text-[1.1rem] font-bold">
                                  {item.title}
                                </p>
                                <p
                                  className="lg:text-[0.8rem] text-[1rem] leading-[110%] mt-1 line-clamp-2"
                                  style={{
                                    wordSpacing: "0em",
                                  }}
                                >
                                  {item.description}
                                </p>
                                <p className="text-[0.9rem] pt-[1rem] ">
                                  {t("learnMore")}
                                </p>
                              </div>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* News */}
                  {results.news.length > 0 && (
                    <div>
                      <h3 className="sticky top-0 bg-background z-10 px-[1rem] pt-[1rem] pb-[0.5rem] text-[1rem] font-medium border-b border-foreground/10">
                        News
                      </h3>
                      <div className="flex flex-col">
                        {results.news.map((item) => (
                          <Link
                            key={item._id}
                            href={`/${locale}/news/${item.slug}`}
                            className="group flex items-center lg:items-start gap-[1rem] hover:bg-foreground/10 px-[1rem] py-[1.5rem]"
                            onClick={onClose}
                          >
                            <div className="relative overflow-hidden rounded-xl aspect-square">
                              {item.featuredImage ? (
                                <Image
                                  src={item.featuredImage.asset.url}
                                  alt={
                                    item.localized?.value.title || item.title
                                  }
                                  width={90}
                                  height={90}
                                  className="object-cover rounded-xl"
                                />
                              ) : (
                                <div className="w-[100px] h-[100px] bg-foreground/5 flex items-center justify-center">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="line-clamp-1 lg:text-[1rem] text-[1.1rem] font-bold">
                                {item.title}
                              </p>
                              <p
                                className="lg:text-[0.8rem] text-[1rem] leading-[110%] mt-1 line-clamp-2"
                                style={{
                                  wordSpacing: "0em",
                                }}
                              >
                                {item.description}
                              </p>
                              <p className="text-[0.9rem] pt-[1rem] ">
                                {t("learnMore")}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
