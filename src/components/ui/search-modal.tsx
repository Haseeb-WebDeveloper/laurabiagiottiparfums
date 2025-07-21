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

  // Handle scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[640px] w-[95%] p-0 gap-0 z-[110] overflow-hidden flex flex-col max-h-[85vh] rounded">
        <DialogClose className="hidden" />

        <button
          onClick={onClose}
          className="cursor-pointer z-[110] group absolute top-3 right-3 flex size-7 items-center justify-center  "
        >
          <Image
            src="/icons/close-thin-dark.svg"
            alt="Close"
            width={16}
            height={16}
            className="dark:invert"
          />
          <span className="sr-only">Close</span>
        </button>

        {/* Search Input */}
        <div className="p-[1rem] flex justify-between items-center text-[1rem]">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("search")}
            className="w-full text-[1rem] pr-10 text-lg focus:outline-none"
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
          {isLoading ? (
            <h6 className="border border-t-[1px] font-bold text-[1rem] px-[1rem] py-[0.5rem]">
              Loading...
            </h6>
          ) : (
            results && (
              <>
                <div className="">
                  {/* Perfumes & Collections */}
                  {results.perfumes.length > 0 && (
                    <div>
                      <h6 className="px-[1rem] py-[0.5rem] border-t-[1px]  text-lg font-medium mb-[0.5rem]">
                        Perfumes & Collections
                      </h6>
                      <div className="flex flex-col gap-4">
                        {results.perfumes.map((item) => (
                          <Link
                            key={item._id}
                            href={`/${locale}/${
                              item.category === "mens" ? "mens" : "womens"
                            }-perfume/${item.slug}`}
                            className="group flex gap-[1rem] hover:bg-foreground/5 p-[1rem] rounded-[0.8rem]"
                            onClick={onClose}
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
                                <div className="w-[100px] h-[100px] bg-foreground/5 flex items-center justify-center">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium group-hover:text-primary transition-colors">
                                {item.localized?.value.title ||
                                  item.title ||
                                  "No title"}
                              </p>
                              {item.localized?.value.description && (
                                <p className="text-sm text-foreground/60 mt-1 line-clamp-2">
                                  {item.localized.value.description ||
                                    "No description"}
                                </p>
                              )}
                            </div>
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
                            onClick={onClose}
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
                </div>
              </>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
