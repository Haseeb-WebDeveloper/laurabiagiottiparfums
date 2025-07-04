"use client";

import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { useEffect, useState } from "react";
import { Perfume } from "@/types/perfume";
import { getNavbarPerfumes } from "@/lib/i18n/getSanityContent";
import PerfumeDropdown from "../ui/perfume-dropdown";

export default function Navbar() {
  const { locale } = useLocale();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<
    "mens" | "womens" | null
  >(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      const data = await getNavbarPerfumes(locale);
      if (data) {
        setPerfumes(data);
      }
    };
    fetchPerfumes();
  }, [locale]);

  const navItems = [
    {
      label: "Women's perfume",
      href: `/${locale}/womens-perfume`,
      category: "womens" as const,
    },
    {
      label: "Men's perfume",
      href: `/${locale}/mens-perfume`,
      category: "mens" as const,
    },
    {
      label: "Brand",
      href: `/${locale}/brand`,
    },
    {
      label: "News",
      href: `/${locale}/news`,
    },
  ];

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-[100] bg-background">
        <div className="max-w px-[34px] pt-[45px]">
          <div className="flex justify-between">
            {/* Left */}
            <div className="flex h-fit gap-[0.75rem] w-full">
              <LanguageSwitcher />
              {/* Search */}
              <div className="cursor-pointer flex items-center gap-[0.3rem] border border-foreground rounded-[0.45rem] px-[0.555rem]">
                <span className="text-[.75rem] font-[400] leading-0 text-pretty">
                  Search
                </span>
                <Image
                  src="/icons/search.svg"
                  alt="search"
                  width={12}
                  height={12}
                  className="text-foreground"
                />
              </div>
            </div>
            {/* Center */}
            <div className="w-full flex flex-col gap-[1.6rem] items-center">
              <Link href={`/${locale}`}>
                <Image
                  src="/logo/desktop-logo.svg"
                  alt="logo"
                  width={200}
                  height={200}
                  className="w-[11rem]"
                />
              </Link>
              {/* Nav items */}
              <div className="flex items-center gap-[2rem] relative">
                {navItems.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() =>
                      setHoveredCategory(item.category || null)
                    }
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link
                      href={item.href}
                      className="cursor-pointer text-[0.9rem] font-[400] leading-0 text-pretty"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="w-full flex justify-end">
              <span
                className={`w-fit h-fit cursor-pointer bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded-[0.45rem] p-[0.55rem] transition-colors duration-300 flex items-center gap-[0.5rem]`}
              >
                <span className="text-[0.75rem] font-[400] leading-0 tracking-tight text-pretty">
                  Wear your perfume
                </span>
                <Image
                  src="/icons/loading.svg"
                  alt="arrow-down"
                  width={12}
                  height={12}
                  className="dark:invert"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="h-[29px] w-screen border-b-[1px] border-foreground/[0.08]"></div>
      </div>

      {/* Dropdown */}
      {hoveredCategory && (
        <div
          onMouseEnter={() => setHoveredCategory(hoveredCategory)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <PerfumeDropdown
            isOpen={hoveredCategory === hoveredCategory}
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
            perfumes={perfumes}
            category={hoveredCategory}
            locale={locale}
            categoryName={
              navItems.find((item) => item.category === hoveredCategory)
                ?.label || ""
            }
          />
        </div>
      )}
    </div>
  );
}
