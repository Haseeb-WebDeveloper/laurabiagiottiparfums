"use client";

import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useLocale } from "@/lib/i18n/context";
import { useEffect, useState, useRef } from "react";
import { CombinedPerfume } from "@/types/perfume";
import { getNavbarPerfumes } from "@/lib/i18n/getSanityContent";
import PerfumeDropdown from "../ui/perfume-dropdown";
import SearchModal from "../ui/search-modal";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import WearYourPerfume from "../wear-your-perfume";
import { useTheme } from "next-themes";
import AnimatedUnderline from "../ui/animated-underline";
import { useNavbarAppearance } from "./navbar-appearance-context";

export default function SlugNavbar() {
  const { transparent, fixed, position } = useNavbarAppearance();
  const { locale, t } = useLocale();
  const { theme } = useTheme();
  const [perfumes, setPerfumes] = useState<{
    mens: CombinedPerfume[];
    womens: CombinedPerfume[];
  }>({ mens: [], womens: [] });
  const [hoveredCategory, setHoveredCategory] = useState<
    "mens" | "womens" | null
  >(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // GSAP refs
  const menuIconRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPerfumes = async () => {
      const data = await getNavbarPerfumes(locale);
      if (data) {
        setPerfumes(data);
      }
    };
    fetchPerfumes();
  }, [locale]);

  // GSAP animations
  useGSAP(() => {
    // Create separate timelines for opening and closing
    const openTl = gsap.timeline({ paused: true });
    const closeTl = gsap.timeline({ paused: true });

    // Opening animation sequence
    openTl
      // First step: close the gap
      .to([line1Ref.current, line2Ref.current], {
        duration: 0.2,
        top: "50%",
        ease: "power2.inOut",
      })
      // Second step: rotate to form X
      .to(
        line1Ref.current,
        {
          duration: 0.3,
          rotation: 45,
          transformOrigin: "center",
          ease: "power2.inOut",
        },
        "rotate"
      )
      .to(
        line2Ref.current,
        {
          duration: 0.3,
          rotation: -45,
          transformOrigin: "center",
          ease: "power2.inOut",
        },
        "rotate"
      ); // Using the same label "rotate" makes them animate simultaneously

    // Closing animation sequence
    closeTl
      // First step: rotate back to horizontal
      .to([line1Ref.current, line2Ref.current], {
        duration: 0.3,
        rotation: 0,
        transformOrigin: "center",
        ease: "power2.inOut",
      })
      // Second step: restore the gap
      .to(
        line1Ref.current,
        {
          duration: 0.2,
          top: "calc(50% - 4px)",
          ease: "power2.inOut",
        },
        "gap"
      )
      .to(
        line2Ref.current,
        {
          duration: 0.2,
          top: "calc(50% + 4px)",
          ease: "power2.inOut",
        },
        "gap"
      ); // Using the same label "gap" makes them animate simultaneously

    // Mobile menu animation
    const menuTl = gsap.timeline({ paused: true });
    menuTl
      .fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "100vh", opacity: 1, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        menuItemsRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        socialIconsRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" },
        "-=0.2"
      );

    if (isMobileMenuOpen) {
      openTl.play();
      menuTl.play();
    } else {
      closeTl.play();
      menuTl.reverse();
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    {
      label: t("womensPerfume"),
      href: `/${locale}/womens-perfume`,
      category: "womens" as const,
    },
    {
      label: t("mensPerfume"),
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

  const socialIcons = [
    { name: "Facebook", icon: "/icons/facebook.svg", href: "#" },
    { name: "Instagram", icon: "/icons/instagram.svg", href: "#" },
    { name: "YouTube", icon: "/icons/youtube.svg", href: "#" },
  ];

  return (
    <div className="relative">
      {/* Desktop Navbar */}
      <div
        className={`hidden md:block ${
          position === "fixed"
            ? "fixed top-0 left-0 right-0"
            : position === "absolute"
              ? "absolute top-0 left-0 right-0"
              : fixed
                ? "fixed top-0 left-0 right-0"
                : "static"
        } z-[100] ${transparent ? "bg-transparent" : "bg-background"} 2xl:px-[34px] px-[38px]`}
      >
        <div className="max-w pt-[45px] lg:pt-[45.5px] 2xl:pt-[48px]">
          <div className="flex justify-between">
            {/* Left */}
            <div className="flex h-fit gap-[0.8rem] w-full">
              <LanguageSwitcher />
              {/* Search */}
              <div
                className="cursor-pointer group flex items-center gap-[0.39rem] border border-foreground rounded-[0.56rem] px-[0.48rem] hover:bg-foreground transition-colors"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="text-[.75rem] font-[400] leading-0 text-pretty group-hover:text-background">
                  {t("search")}
                </span>
                <Image
                  src="/icons/search.svg"
                  alt="search"
                  width={11}
                  height={11}
                  className="text-foreground group-hover:invert dark:invert"
                />
              </div>
            </div>
            {/* Center */}
            <div className="w-full flex flex-col items-center">
              <Link href={`/${locale}`} className="h-fit">
                {theme === "dark" ? (
                  <Image
                    src="/logo/desktop-light-logo.svg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-[11rem] h-fit"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    quality={100}
                  />
                ) : (
                  <Image
                    src="/logo/desktop-logo.svg"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-[11rem] h-fit"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    quality={100}
                  />
                )}
              </Link>
            </div>
            {/* Right */}
            <WearYourPerfume showCustomCloseIcon={true} />
          </div>
          <div className="mt-[1.6rem] 2xl:mt-[1.7rem] w-full flex items-center justify-center gap-[2rem]">
            {/* Nav items */}
            <div className="flex items-center gap-[2rem]">
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  onMouseEnter={() => setHoveredCategory(item.category || null)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Link
                    href={item.href}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredIndex(null);
                    }}
                    className="relative cursor-pointer text-[0.9rem] 2xl:tracking-[0.003em] font-[400] leading-0"
                  >
                    {item.label}
                    <AnimatedUnderline
                      isActive={
                        hoveredIndex === index ||
                        (!!hoveredCategory && item.category === hoveredCategory)
                      }
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {!transparent && (
          <div className="h-[29px] w-[100vw] border-b-[1px] border-foreground/[0.08]"></div>
        )}
        {/* Dropdown */}
        {hoveredCategory && (
          <div
            className="absolute left-0 top-[160px] bg-background z-[110] w-full"
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

      {/* Mobile Navbar */}
      <div
        className={`md:hidden ${
          position === "fixed"
            ? "fixed top-0 left-0 right-0"
            : position === "absolute"
              ? "absolute top-0 left-0 right-0"
              : fixed
                ? "fixed top-0 left-0 right-0"
                : "static"
        } z-[100] ${transparent ? "bg-transparent" : "bg-background"}`}
      >
        <div className="flex justify-between items-center px-4 py-4">
          {/* Left - Search Icon */}
          <div className="flex items-center gap-[1rem]">
            <div
              className="cursor-pointer p-2 bg-foreground rounded-[0.45rem]"
              onClick={() => setIsSearchOpen(true)}
            >
              <Image
                src="/icons/light-loading.svg"
                alt="search"
                width={50}
                height={50}
                className="w-4 h-4"
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
            >
              <Image
                src="/icons/search.svg"
                alt="search"
                width={50}
                height={50}
                className="w-4 h-4 dark:invert"
              />
            </div>
          </div>

          {/* Center - Mobile Logo */}
          <Link href={`/${locale}`}>
            <Image
              src={
                theme === "dark"
                  ? "/logo/mobile-light-logo.svg"
                  : "/logo/mobile-logo.svg"
              }
              alt="logo"
              width={220}
              height={220}
              className="w-full h-full object-contain max-h-[25px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={100}
            />
          </Link>

          {/* Right - Menu Icon */}
          <div
            ref={menuIconRef}
            className="cursor-pointer p-2 flex flex-col items-center justify-center relative"
            onClick={toggleMobileMenu}
            style={{ height: "20px", width: "20px" }}
          >
            <div
              ref={line1Ref}
              className="w-4 h-[2px] bg-foreground absolute"
              style={{ top: "calc(50% - 4px)" }}
            />
            <div
              ref={line2Ref}
              className="w-4 h-[2px] bg-foreground absolute"
              style={{ top: "calc(50% + 4px)" }}
            />
          </div>
        </div>
        <div className="h-[1px] w-full bg-foreground/[0.08]"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 left-0 right-0 z-[90] bg-background ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
        style={{ height: 0, opacity: 0 }}
      >
        <div className="pt-28 px-6 flex flex-col h-full">
          {/* Language Switcher */}
          <div className="mb-8">
            <LanguageSwitcher />
          </div>

          {/* Menu Items */}
          <div ref={menuItemsRef} className="flex flex-col gap-6 mb-12">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[2rem] font-bold font-primary max-w-[50%] leading-[110%]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* <div className="border-b border-foreground/10 pb-4">
              <span className="text-2xl font-light">Wear your perfume</span>
            </div> */}
          </div>

          {/* Social Icons */}
          <div className="mt-auto mb-8 ">
            <div ref={socialIconsRef} className="flex gap-6 justify-center">
              {socialIcons.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
