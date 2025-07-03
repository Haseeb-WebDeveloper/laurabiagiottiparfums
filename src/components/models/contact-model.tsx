"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { gsap } from "gsap";
import Link from "next/link";
import { useLenis } from "@studio-freight/react-lenis";
import { ContactDataType } from "@/types/contact";
import { ContactCarousel } from "../ui/contact-carousel";
import ContactForm from "../contact/contact-form";
import Accordion from "@/components/ui/accordion";

interface ContactModelProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: ContactDataType;
}

const ContactModel: React.FC<ContactModelProps> = ({
  isOpen,
  onClose,
  contactData,
}) => {
  const { locale, t } = useLocale();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lenisRef = useRef<any>(null);
  const isMobileRef = useRef<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      isMobileRef.current = window.innerWidth <= 768;
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Initialize Lenis for the popup - desktop only
  useEffect(() => {
    // Clean up any previous Lenis instance to prevent multiple instances
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (!isOpen || !popupRef.current) return;

    // Only initialize Lenis on desktop
    if (!isMobileRef.current) {
      // Import Lenis dynamically
      import("@studio-freight/lenis").then(({ default: Lenis }) => {
        // Create a new Lenis instance for popup scrolling
        lenisRef.current = new Lenis({
          wrapper: popupRef.current as HTMLElement,
          content: contentRef.current as HTMLElement,
          lerp: 0.09,
          smoothWheel: true,
          duration: 1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          touchMultiplier: 2,
          infinite: false,
          // smoothTouch: false,  // Disable smooth touch to improve responsiveness
          // normalizeWheel: true, // Normalize wheel events across browsers
          // keyboardSupport: true // Explicitly enable keyboard support
        });

        // Raf loop for the lenis instance
        function raf(time: number) {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
          }
        }

        requestAnimationFrame(raf);
      });
    }

    // Clean up Lenis instance on unmount or when popup closes
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isOpen]);

  // Get the root Lenis instance
  const rootLenis = useLenis();

  // Initialize open/close animations
  useEffect(() => {
    if (!isOpen) return;

    // Get mobile status from ref
    const isMobile = isMobileRef.current;

    // Stop main page scrolling on desktop only
    if (rootLenis && !isMobile) {
      rootLenis.stop();
    }

    // Lock body scroll as a fallback - but not for mobile
    if (!isMobile) {
      document.body.style.overflow = "hidden";
    }

    // Set initial focus and scroll position
    if (popupRef.current) {
      popupRef.current.style.display = "block";

      // Ensure the popup is properly initialized for scrolling
      setTimeout(() => {
        if (popupRef.current) {
          popupRef.current.focus();

          // Reset scroll position to top
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          } else {
            popupRef.current.scrollTop = 0;
          }
        }
      }, 10);
    }

    // Create animation timeline for open/close
    timelineRef.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        if (popupRef.current) {
          popupRef.current.style.display = "none";
        }
      },
    });

    // Animate popup entrance
    if (popupRef.current && contentRef.current) {
      timelineRef.current
        .fromTo(
          popupRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.inOut" }
        )
        .fromTo(
          contentRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.1"
        );
    }

    // Play the animation
    if (timelineRef.current) {
      timelineRef.current.play();
    }

    // Clean up animations and restore body scroll
    return () => {
      // Re-enable main page scrolling
      if (rootLenis) {
        rootLenis.start();
      }

      document.body.style.overflow = "auto";

      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isOpen, rootLenis]);

  // Handle escape key for closing
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen]);

  // Handle closing animation
  const handleClose = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse();
      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      onClose();
    }
  };

  if (!contactData) return null;

  // Convert Sanity logos to the format expected by ContactCarousel
  const carouselLogos = contactData.logos.map((logo, index) => ({
    id: `logo-${index}`,
    image: logo.image.asset.url,
    className: "h-24 w-auto drop-shadow-[0_0_6px_rgba(0,0,0,0.9)]",
  }));

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 bg-[#040404] z-50 md:overflow-y-auto overflow-y-auto outline-none touch-auto"
      style={{
        display: isOpen ? "block" : "none",
        opacity: 0,
        WebkitOverflowScrolling: "touch", // Enable momentum scrolling on iOS
        overscrollBehavior: "contain",
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        // Handle keyboard navigation - pass key events to Lenis if available
        if (!isMobileRef.current && lenisRef.current) {
          if (e.key === "ArrowDown") {
            lenisRef.current.scrollTo(lenisRef.current.scroll + 100);
            e.preventDefault();
          } else if (e.key === "ArrowUp") {
            lenisRef.current.scrollTo(lenisRef.current.scroll - 100);
            e.preventDefault();
          } else if (e.key === "PageDown") {
            lenisRef.current.scrollTo(
              lenisRef.current.scroll + window.innerHeight * 1.2
            );
            e.preventDefault();
          } else if (e.key === "PageUp") {
            lenisRef.current.scrollTo(
              lenisRef.current.scroll - window.innerHeight * 1.2
            );
            e.preventDefault();
          } else if (e.key === "Home") {
            lenisRef.current.scrollTo(0);
            e.preventDefault();
          } else if (e.key === "End") {
            lenisRef.current.scrollTo(contentRef.current?.scrollHeight || 0);
            e.preventDefault();
          }
        }
      }}
      onClick={(e) => e.target === popupRef.current && handleClose()}
    >
      <button
        onClick={handleClose}
        className="cursor-pointer fixed md:top-0 top-4 md:left-0 right-4 z-[60]"
        aria-label="Close popup"
      >
        <Image
          src="/icons/close.svg"
          alt="Close"
          width={42}
          height={42}
          className="w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-shadow"
        />
      </button>

      <div
        ref={contentRef}
        className="pt-[20vw] md:pt-[13vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-[6vw] max-w-[85vw] mx-auto">
          <p className="text-[6vw] md:text-[3.5vw] leading-[130%] text-center">
            {contactData.heading}
          </p>
        </div>

        {/* Contact Number */}
        <div className="mb-20 mx-auto block  px-[6vw] md:px-[3vw] py-[2vw] md:py-[1.5vw]">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 rounded-[1.2vw] px-[1vw] py-[1vw] md:bg-[#090909] w-fit mx-auto">
            <div>
              <Link
                href="tel:+390280897083"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[4vw] md:text-[2vw] leading-[130%] flex gap-2 items-center rounded-2xl md:px-[2vw] px-[3.5vw] md:py-[1vw] py-[2vw] bg-[#040404]"
              >
                <p>{t("contactNumber")}</p>
              </Link>
            </div>
            <div>
              <Link
                href="https://wa.me/393758293603"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[4vw] md:text-[2vw] leading-[130%] flex gap-2 items-center rounded-2xl md:px-[2vw] px-[3.5vw] md:py-[1vw] py-[2vw] bg-green-700 hover:bg-green-600 transition-all duration-300"
              >
                <p>{t("contactWhatsapp")}</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2vw] md:mb-[8vw] mb-[15vw] max-w-[85vw] mx-auto py-[2vw] md:py-[1.5vw]">
          {contactData.locations.map((location, index) => (
            <a
              key={index}
              href={`mailto:${location.email}`}
              className="relative group cursor-pointer"
            >
              <Image
                alt={location.locationName}
                src={location.image.asset.url}
                width={1000}
                height={1000}
                className="location-card object-cover object-center bg-secondary/50 rounded-4xl md:h-full md:max-h-[17vw] h-[30vw]"
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-black/30 hover:bg-black/80 transition-colors duration-300 flex flex-col justify-end p-4 md:p-6">
                <p className="text-[6vw] md:text-[3.8vw] leading-[120%] font-semibold mb-2">
                  {location.locationName}
                </p>
                <p className="text-[2vw] md:text-[1.5vw] leading-[130%] font-light underline transition-all duration-300">
                  {location.email}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-24 max-w-[85vw] mx-auto py-[2vw] md:py-[1.5vw]">
          <p className="text-[12vw] md:text-[8vw] font-semibold leading-[130%] md:mb-[1vw] mb-[4vw] uppercase">
            {t("contactFormTitle")}
          </p>
          <div className="w-full flex flex-col md:flex-row md:gap-[3vw] gap-[4vw] bg-[#090909] p-[3vw] rounded-4xl">
            {/* Contact Form left */}
            <ContactForm />

            {/* Contact Form right */}
            <div className="bg-[#040404] h-fit md:px-[2vw] md:py-[3vw] px-[2vw] py-[5vw] rounded-4xl  md:space-y-[4vw] space-y-[5vw] md:w-[28vw] w-full">
              <p className="text-[6vw] md:text-[1.6vw] w-full text-center leading-[150%] font-light">
                {t("contactFormCTAMessage1")}
                <br />
                {t("contactFormCTAMessage2")}
              </p>

              <div className="flex flex-col items-center md:gap-[2vw] gap-[4vw]">
                <p className="italic text-[6vw] md:text-[1.5vw] text-[#FFFFFF]/80 text-center leading-[150%] font-light">
                  {t("contactFormCTAMessage3")} <br />
                  {t("contactFormCTAMessage4")}
                </p>

                <Image
                  src="/chiara.webp"
                  alt="Chiara"
                  width={1000}
                  height={1000}
                  className="rounded-full md:w-[7vw] w-20 h-20 md:h-[7vw] object-cover"
                />

                <Link
                  href="https://wa.me/393758293603"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center md:gap-[1.3vw] gap-[3vw] md:px-[2vw] md:py-[1vw] px-[4vw] py-[3vw] bg-[#10450B] hover:bg-[#10450B]/80 transition-all duration-300 md:rounded-[1.5vw] rounded-[2vw]"
                >
                  <p className="text-nowrap text-[5vw] md:text-[1.3vw] leading-[130%] font-medium uppercase">
                    {t("contactSendMessage")}
                  </p>
                  <Image
                    src="/icons/whatsapp.svg"
                    alt="Whatsapp"
                    width={300}
                    height={300}
                    className="w-6 md:w-[1.8vw] h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-24 max-w-[85vw] mx-auto py-[2vw] md:py-[1.5vw]">
          <h2 className="text-[12vw] md:text-[8vw] font-semibold leading-[130%] mb-[2vw]">
            {t("faq")}
          </h2>
          <Accordion items={contactData.faq.faqs} locale={locale} columns={1} />
        </div>

        {/* Logos Carousel */}
        <div className="mb-[4vw]">
          <div className="overflow-hidden">
            <ContactCarousel heading="" logos={carouselLogos} className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModel;
