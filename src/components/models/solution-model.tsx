"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { gsap } from "gsap";
import { useLenis } from "@studio-freight/react-lenis";
import RichEditor from "../rich-editor";
import { StudioBrandingSolution } from "@/types/branding-solutions";
import { StudioDigitalProductsSolution } from "@/types/digital-products-solution";
import SolutionForm from "../contact/solution-form";
import { CaseStudy } from "@/types/interface";
import SolutionCaseStudyModal from "./solution-case-study-model";
import { DeliverablesCarousel } from "../layout/Deliverables-carousel";

interface SolutionModelProps {
  isOpen: boolean;
  onClose: () => void;
  SolutionData: StudioBrandingSolution | StudioDigitalProductsSolution;
}

const SolutionModel: React.FC<SolutionModelProps> = ({
  isOpen,
  onClose,
  SolutionData,
}) => {
  const { t } = useLocale();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const lenisRef = useRef<any>(null);
  const [formOpacity, setFormOpacity] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const isMobileRef = useRef(false);
  const [showCaseStudyModel, setShowCaseStudyModel] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(
    null
  );

  // Animation related states and refs
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedItemRect, setClickedItemRect] = useState<DOMRect | null>(null);
  const [clickedImageRect, setClickedImageRect] = useState<DOMRect | null>(
    null
  );
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const caseStudyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

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

    // Check if we're on desktop (not mobile)
    const isDesktop = window.innerWidth > 768;

    // Only initialize Lenis on desktop
    if (isDesktop) {
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

    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;

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
      if (event.key === "Escape") {
        if (showCaseStudyModel) {
          handleCloseCaseStudy();
          event.stopPropagation(); // Prevent the escape key from closing both modals
        } else if (isOpen) {
          handleClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, showCaseStudyModel]);

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

  // Effect to handle scrolling when case study opens
  useEffect(() => {
    if (showCaseStudyModel && popupRef.current) {
      // Lock scrolling on the main solution modal
      if (lenisRef.current) {
        lenisRef.current.destroy(); // Destroy instead of stop to prevent conflicts
        lenisRef.current = null;
      }
      popupRef.current.style.overflow = "hidden";
    } else if (popupRef.current) {
      // Re-enable scrolling on the main solution modal
      if (!lenisRef.current && !isMobileRef.current) {
        // Reinitialize Lenis
        import("@studio-freight/lenis").then(({ default: Lenis }) => {
          lenisRef.current = new Lenis({
            wrapper: popupRef.current as HTMLElement,
            content: contentRef.current as HTMLElement,
            lerp: 0.09,
            smoothWheel: true,
            duration: 1,
            orientation: "vertical",
            gestureOrientation: "vertical",
            touchMultiplier: 2,
            infinite: false,
          });

          function raf(time: number) {
            if (lenisRef.current) {
              lenisRef.current.raf(time);
              requestAnimationFrame(raf);
            }
          }
          requestAnimationFrame(raf);
        });
      }
      popupRef.current.style.overflow = "auto";
    }
  }, [showCaseStudyModel]);

  // close form
  const handleCloseForm = () => {
    setShowForm(false);
    setFormOpacity(0);
  };

  // Handle click outside form
  const handleFormBackdropClick = (e: React.MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleCloseForm();
    }
  };

  // Animation complete callback from case study modal
  const handleCaseStudyAnimationComplete = () => {
    setShowCaseStudyModel(false);
    setSelectedCaseStudy(null);
    setClickedIndex(-1);
    setClickedItemRect(null);
    setClickedImageRect(null);
    setIsAnimating(false);
  };

  // close case study
  const handleCloseCaseStudy = (e?: React.MouseEvent) => {
    if (isAnimating) return;

    setIsAnimating(true);
    // The actual state resetting will be done in the animation complete callback
  };

  // open case study
  const handleOpenCaseStudy = (
    e: React.MouseEvent<HTMLDivElement>,
    caseStudy: CaseStudy,
    index: number
  ) => {
    if (isAnimating) return;

    e.stopPropagation();
    e.preventDefault();

    // Get the clicked item and image positions
    const itemRect =
      caseStudyRefs.current[index]?.getBoundingClientRect() || null;
    const imageRect = imageRefs.current[index]?.getBoundingClientRect() || null;

    // Store the positions and dimensions
    setClickedItemRect(itemRect);
    setClickedImageRect(imageRect);
    setClickedIndex(index);

    // Slight delay before opening modal to allow fade effect
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCaseStudy(caseStudy);
      setShowCaseStudyModel(true);
    }, 10);
  };

  return (
    <div
      ref={popupRef}
      className="fixed inset-0 bg-background z-[100] overflow-y-auto outline-none touch-auto"
      style={{
        display: isOpen ? "block" : "none",
        opacity: 0,
        WebkitOverflowScrolling: "touch",
        overscrollBehavior: "contain",
        height: "100vh",
        maxHeight: "100vh",
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        // Handle keyboard navigation - pass key events to Lenis if available
        if (!isMobileRef.current && lenisRef.current) {
          if (e.key === "ArrowDown") {
            lenisRef.current.scrollTo(lenisRef.current.scroll + 200);
            e.preventDefault();
          } else if (e.key === "ArrowUp") {
            lenisRef.current.scrollTo(lenisRef.current.scroll - 200);
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
        className="cursor-pointer fixed md:top-0 top-4 md:left-0 right-4 z-[120]"
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
        className={`pt-[20vw] md:pt-[8vw] min-h-[100dvh] pb-[35vw] md:pb-[10vw] ${showForm ? "blur-xl" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h1 className="md:text-[4.5vw] text-[8vw] font-[600] text-center">
          {SolutionData.title}
        </h1>

        {/* content */}
        <article className="max-w-[85vw] mx-auto md:pb-[15vw] pb-[30vw] mt-[5.5vw] poppins">
          <RichEditor content={SolutionData.content} />
        </article>

        {/* Deliverables */}
        {SolutionData.deliverables && SolutionData.deliverables.length > 0 && (
          <div className="w-full h-full">
            <h2 className="md:max-w-[90vw] px-6 mx-auto text-4xl md:text-[8vw] text-[10vw] font-[600] md:leading-[130%] leading-[150%] uppercase">
              Deliverables
            </h2>
            <div className="w-full h-full my-12 md:mt-[8vw] md:mb-[5vw]">
              <DeliverablesCarousel
                media={SolutionData.deliverables.map((item: any) => ({
                  title: item.title,
                  image: item.media,
                }))}
              />
            </div>
          </div>
        )}

        {/* case study */}
        {SolutionData.caseStudies && SolutionData.caseStudies.length > 0 && (
          <div className="w-full h-full">
            <h2 className="md:max-w-[90vw] px-6 mx-auto text-4xl md:text-[8vw] text-[10vw] font-[600] md:leading-[130%] leading-[150%] uppercase pb-[18vw] md:pb-[11vw]">
              SOME CASES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {SolutionData.caseStudies.map(
                (caseStudy: CaseStudy, index: number) => (
                  <div
                    key={caseStudy.slug}
                    className="relative group cursor-pointer overflow-hidden"
                    ref={(el) => {
                      caseStudyRefs.current[index] = el;
                    }}
                    onClick={(e) => handleOpenCaseStudy(e, caseStudy, index)}
                  >
                    <img
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      src={caseStudy.featuredImage.asset.url}
                      alt={caseStudy.name.en}
                      className="w-full object-cover h-[70vw] md:h-[28vw] group-hover:scale-[1.04] transition-all duration-300"
                    />
                    <Image
                      src={caseStudy.logo.asset.url}
                      alt={caseStudy.name.en}
                      width={800}
                      height={600}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-[25vw] lg:h-[12vw] aspect-video object-center object-contain z-10"
                    />
                    {/* overlay */}
                    {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div> */}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Case Study Modal Component */}
      {selectedCaseStudy && (
        <SolutionCaseStudyModal
          isOpen={showCaseStudyModel}
          onClose={handleCloseCaseStudy}
          onAnimationComplete={handleCaseStudyAnimationComplete}
          caseStudy={selectedCaseStudy}
          clickedItemRect={clickedItemRect}
          clickedImageRect={clickedImageRect}
          clickedIndex={clickedIndex}
          setIsAnimating={setIsAnimating}
        />
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/30 backdrop-blur-xl"
          style={{ opacity: formOpacity }}
          onClick={handleFormBackdropClick}
        >
          <div
            ref={formRef}
            className="md:px-[4vw] md:py-[1.5vw] p-[6vw] md:rounded-2xl bg-[#1F1C1C] backdrop-blur-sm w-[100%] md:w-[40vw] relative h-fit"
          >
            <SolutionForm solutionPageName={SolutionData.title} />
          </div>
        </div>
      )}

      {/* bottom message */}
      <div className="fixed bottom-0 left-0 w-full py-[3vw] md:py-[1vw] px-[4vw] bg-black z-[60]">
        <div className="md:max-w-[70vw] mx-auto flex md:flex-row flex-col items-center gap-[3vw] md:gap-[4vw] justify-center">
          <p className="md:text-[1.4vw] text-[3.8vw] font-[500] text-center md:text-left">
            {SolutionData.stickyBarText}
          </p>
          <div
            onClick={() => {
              setShowForm(true);
              setFormOpacity(1);
            }}
            className="cursor-pointer w-fit text-nowrap md:px-[2vw] px-[4vw] md:py-[0.7vw] py-[2vw] bg-[#0EB081] text-white md:rounded-[1vw] rounded-[2vw]"
          >
            <p className="md:text-[1.4vw] text-[3.5vw] font-[400] w-full text-center">
              {t("solutionModelStickyBarText")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionModel;
