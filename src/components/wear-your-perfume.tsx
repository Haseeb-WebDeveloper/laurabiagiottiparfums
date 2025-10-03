"use client";

import { useId, useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { Perfume } from "@/types/perfume";
import { getAllPerfumesForWearYourPerfume } from "@/lib/i18n/getSanityContent";
import Link from "next/link";
import { ParallaxImage } from "./ui/ParallaxImage";
import { circlePath, starPath } from "@/constants/data";
import {
  Step1Selection,
  Step2Selection,
  Step3Selection,
  Step4Selection,
} from "@/types/steps";
import { interpolatePath } from "@/utils/interpolate-path";
import { useMediaQuery } from "react-responsive";

interface WearYourPerfumeProps {
  customTrigger?: React.ReactNode;
  showCustomCloseIcon?: boolean;
}

// Hardcoded notes array
const notesData = [
  {
    title: "Fresh and Citrus",
    image: {
      asset: {
        url: "https://cdn.sanity.io/images/wa3zfgpk/production/f6cdd95b83cc44dac86c8b7cbc5a8fdfeb3d2a2d-1400x1400.webp",
      },
    },
  },
  {
    title: "Spicy and Woody",
    image: {
      asset: {
        url: "https://cdn.sanity.io/images/wa3zfgpk/production/f6ecefd98510be7c1cab8711473c1d9d55837cdb-1400x1400.webp",
      },
    },
  },
  {
    title: "Flower and Fruity",
    image: {
      asset: {
        url: "https://cdn.sanity.io/images/wa3zfgpk/production/3a7fd666121432199bb28f360ccc993847b8bc30-1400x1400.webp",
      },
    },
  },
  {
    title: "Sweet and Sensual",
    image: {
      asset: {
        url: "https://cdn.sanity.io/images/wa3zfgpk/production/18ac5b22bb72285e013bb77657475e9fd0c7199e-1400x1400.webp",
      },
    },
  },
];

const timesOfDay = [
  {
    name: "sunrise",
    label: "sunrise",
  },
  {
    name: "dayTime",
    label: "dayTime",
  },
  {
    name: "sunset",
    label: "sunset",
  },
  {
    name: "night",
    label: "night",
  },
];

export default function WearYourPerfume({
  customTrigger,
  showCustomCloseIcon = false,
}: WearYourPerfumeProps) {
  const { locale, t } = useLocale();
  const id = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allPerfumes, setAllPerfumes] = useState<Perfume[]>([]);
  const [matchedPerfumes, setMatchedPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const morphingPathRef = useRef<SVGPathElement>(null);
  const [triggerHover, setTriggerHover] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Step selections
  const [step1Selection, setStep1Selection] = useState<Step1Selection>({
    gender: null,
  });
  const [step2Selection, setStep2Selection] = useState<Step2Selection>({
    selectedNote: null,
  });
  const [step3Selection, setStep3Selection] = useState<Step3Selection>({
    timeOfDay: null,
  });
  const [step4Selection, setStep4Selection] = useState<Step4Selection>({
    intensity: 50,
  });

  // Fetch all perfumes on component mount
  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        const perfumesData = await getAllPerfumesForWearYourPerfume();
        setAllPerfumes(perfumesData);
      } catch (error) {
        console.error("Error fetching perfumes:", error);
      }
    };
    fetchPerfumes();
  }, []);

  const handleNextStep = () => {
    if (currentStep < 5 && !isAnimating) {
      setIsAnimating(true);
      setPreviousStep(currentStep);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 500);
      }, 50);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1 && !isAnimating) {
      setIsAnimating(true);
      setPreviousStep(currentStep);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setTimeout(() => setIsAnimating(false), 500);
      }, 50);
    }
  };

  const findMatchingPerfumes = () => {
    setIsLoading(true);
    try {
      // First, filter perfumes by gender/category
      const genderMatches = allPerfumes.filter((perfume) => {
        return perfume.category === step1Selection.gender;
      });

      // If we have less than 2 perfumes for the selected gender, use all available perfumes
      const perfumesToSearch = genderMatches.length >= 2 ? genderMatches : allPerfumes;

      // Sort all perfumes by closest intensity match
      const sortedByIntensity = perfumesToSearch.sort((a, b) => {
        const aDiff = Math.abs((a.sharpness || 50) - step4Selection.intensity);
        const bDiff = Math.abs((b.sharpness || 50) - step4Selection.intensity);
        return aDiff - bDiff;
      });

      // Ensure we always get exactly 2 perfumes
      let finalMatches = [];
      
      if (sortedByIntensity.length >= 2) {
        // Take the 2 closest matches
        finalMatches = sortedByIntensity.slice(0, 2);
      } else if (sortedByIntensity.length === 1) {
        // If only 1 match, add the closest from all perfumes
        finalMatches = [sortedByIntensity[0]];
        const remaining = allPerfumes
          .filter(p => p._id !== sortedByIntensity[0]._id)
          .sort((a, b) => {
            const aDiff = Math.abs((a.sharpness || 50) - step4Selection.intensity);
            const bDiff = Math.abs((b.sharpness || 50) - step4Selection.intensity);
            return aDiff - bDiff;
          });
        if (remaining.length > 0) {
          finalMatches.push(remaining[0]);
        }
      } else {
        // Fallback: if no matches at all, take 2 closest from all perfumes
        const allSorted = allPerfumes.sort((a, b) => {
          const aDiff = Math.abs((a.sharpness || 50) - step4Selection.intensity);
          const bDiff = Math.abs((b.sharpness || 50) - step4Selection.intensity);
          return aDiff - bDiff;
        });
        finalMatches = allSorted.slice(0, 2);
      }

      setMatchedPerfumes(finalMatches);
      setCurrentStep(5); // Show results
    } catch (error) {
      console.error("Error finding matching perfumes:", error);
      // Fallback: show first 2 perfumes if error occurs
      setMatchedPerfumes(allPerfumes.slice(0, 2));
      setCurrentStep(5);
    } finally {
      setIsLoading(false);
    }
  };

  // Update SVG path when intensity changes
  useEffect(() => {
    if (morphingPathRef.current && currentStep === 4) {
      const progress = step4Selection.intensity / 100;
      const morphedPath = interpolatePath(circlePath, starPath, progress);
      morphingPathRef.current.setAttribute("d", morphedPath);
    }
  }, [step4Selection.intensity, currentStep]);

  // Determine animation classes based on step transition
  const getStepClasses = (stepNumber: number) => {
    const isCurrentStep = currentStep === stepNumber;
    const wasPreviousStep = previousStep === stepNumber;

    if (!isAnimating && isCurrentStep) {
      return "translate-x-0 opacity-100";
    }

    if (isAnimating) {
      if (wasPreviousStep) {
        // Exiting step
        const isMovingForward = currentStep > previousStep;
        return isMovingForward
          ? "-translate-x-full opacity-0"
          : "translate-x-full opacity-0";
      } else if (isCurrentStep) {
        // Entering step
        const isMovingForward = currentStep > previousStep;
        return isMovingForward
          ? "translate-x-0 opacity-100"
          : "translate-x-0 opacity-100";
      }
    }

    // Hidden steps
    const isMovingForward = currentStep > previousStep;
    if (stepNumber > currentStep) {
      return "translate-x-full opacity-0";
    } else if (stepNumber < currentStep) {
      return "-translate-x-full opacity-0";
    }

    return "translate-x-full opacity-0";
  };

  // Handle close popup
  const closeDialog = () => {
    setCurrentStep(1);
    setStep1Selection({ gender: null });
    setStep2Selection({ selectedNote: null });
    setStep3Selection({ timeOfDay: null });
    setStep4Selection({ intensity: 50 });
    setMatchedPerfumes([]);
    closeRef.current?.click();
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        {customTrigger || (
          <div className="w-full flex justify-end">
            <span
              className={`w-fit h-fit cursor-pointer bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded-[0.45rem] px-[0.5rem] py-[0.6rem] transition-colors duration-300 flex items-center gap-[0.4rem]`}
              onMouseEnter={() => setTriggerHover(true)}
              onMouseLeave={() => setTriggerHover(false)}
            >
              <span className="text-[0.78rem] font-[400] leading-0 tracking-[-0.01em] text-pretty">
                {t("wearYourPerfume")}
              </span>
              <Image
                src={
                  triggerHover
                    ? "/icons/dark-loading.svg"
                    : "/icons/light-loading.svg"
                }
                alt="arrow-down"
                width={11}
                height={11}
                className="dark:invert"
              />
            </span>
          </div>
        )}
      </DialogTrigger>
      <DialogContent
        onClose={closeDialog}
        className="overflow-x-hidden z-[110] w-[95vw] h-[92vh] max-w overflow-y-auto flex flex-col items-center justify-center p-0"
        hideDefaultCloseIcon={showCustomCloseIcon}
      >
        <DialogClose ref={closeRef} onClick={closeDialog} className="hidden" />
        {showCustomCloseIcon && (
          <button
            onClick={closeDialog}
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
        )}
        {/* Container for animated steps */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden ">
          {/* Step 1: Gender Selection */}
          <div
            className={`absolute inset-0 min-h-[60vh] px-[2rem] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${getStepClasses(1)}`}
          >
            <h2 className="text-[2rem] lg:text-[3rem] font-[500] mb-[.5rem]">
              {t("wypstep1Title")}
            </h2>
            <p className="text-[1rem] font-[400] mb-[2rem] text-center ">
              {t("wypstep1Description")}
            </p>
            <div className="flex lg:gap-8 gap-4 w-full max-w-[600px] justify-center items-center">
              <div
                onClick={() => {
                  setStep1Selection({ gender: "mens" });
                  handleNextStep();
                }}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                {t("forHim")}
              </div>
              <div
                onClick={() => {
                  setStep1Selection({ gender: "womens" });
                  handleNextStep();
                }}
                className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                {t("forHer")}
              </div>
            </div>
          </div>

          {/* Step 2: Notes Selection */}
          <div
            className={`absolute inset-0 min-h-[60vh] px-[3rem] flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out ${getStepClasses(2)}`}
          >
            <h2 className="text-[2.2rem] lg:text-[2.5rem] font-[500] mb-[1rem] text-center">
              {t("wypstep2Title")}
            </h2>
            <div className="mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-between gap-x-8 gap-y-10">
              {notesData.map((note, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setStep2Selection({ selectedNote: note });
                    handleNextStep();
                  }}
                  className={`group cursor-pointer flex flex-col items-center gap-4
                    ${step2Selection.selectedNote?.title === note.title ? "" : ""}`}
                >
                  <div className="lg:w-[190px] lg:h-[190px] w-[110px] h-[110px] rounded-full group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] transition-all duration-300">
                    <Image
                      src={note.image.asset.url}
                      alt={note.title || ""}
                      width={190}
                      height={190}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span className="text-center text-[1rem] tracking-tight font-[500] group-hover:underline transition-all duration-300">
                    {note.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Time of Day */}
          <div
            className={`absolute inset-0 min-h-[60vh] px-[3rem] flex flex-col items-center justify-center w-full transition-all duration-500 ease-in-out ${getStepClasses(3)}`}
          >
            <h2 className="text-[2.2rem] lg:text-[2.5rem] font-[500] mb-[1rem] text-center">
              {t("wypstepe3Title")}
            </h2>
            <div className="mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 w-full justify-between">
              {timesOfDay.map((time: { name: string; label: string }) => (
                <button
                  key={time.name}
                  onClick={() => {
                    setStep3Selection({ timeOfDay: time.name as any });
                    handleNextStep();
                  }}
                  className={`group cursor-pointer flex flex-col items-center gap-4
                    ${step3Selection.timeOfDay === time.name ? "" : ""}`}
                >
                  <div className="lg:w-[190px] lg:h-[190px] w-[110px] h-[110px] rounded-full overflow-hidden">
                    <Image
                      src={`/${time.name}.png`}
                      alt={time.label}
                      width={190}
                      height={190}
                      className="w-full h-full object-contain rounded-full group-hover:shadow-[30px_30px_84px_rgba(180,133,94,0.45)] transition-all duration-300"
                    />
                  </div>
                  <span className="capitalize text-[1rem] font-[500] group-hover:underline transition-all duration-300">
                    {t(time.label)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Intensity Slider */}
          <div
            className={`absolute inset-0 min-h-[60vh]  pb-[6rem] flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto transition-all duration-500 ease-in-out ${getStepClasses(4)}`}
          >
            <h2 className="text-[2.2rem] lg:text-[2.5rem] font-[500] mb-[1rem] text-center">
              {t("wypstepe4Title")}
            </h2>

            <div className="flex flex-col items-center gap-12 w-full mt-[4rem] px-[2rem]">
              {/* Slider Container with SVG */}
              <div className="relative w-full h-32 flex items-center justify-center">
                {/* Animated SVG - Centered */}
                <div className="w-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="-150 -150 300 300"
                    className="w-52 h-52 text-foreground"
                  >
                    <path
                      ref={morphingPathRef}
                      d={circlePath}
                      className="transition-all duration-75"
                    />
                  </svg>
                </div>

                {/* Custom Range Input */}
                <div className="w-full">
                  <div className="relative w-full">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={step4Selection.intensity}
                      onChange={(e) =>
                        setStep4Selection({
                          intensity: parseInt(e.target.value),
                        })
                      }
                      className="w-full h-1 appearance-none bg-transparent cursor-pointer"
                      style={
                        {
                          "--range-progress": `${step4Selection.intensity}%`,
                        } as any
                      }
                    />
                    {/* Thumb Icons Container */}
                    <div
                      className="absolute pointer-events-none z-[90]"
                      style={{
                        // This ensures left edge hits left end at 0% and right edge hits right end at 100%
                        left: `${step4Selection.intensity * (isMobile ? 0.86 : 0.945)}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "65px",
                        height: "65px",
                        borderRadius: "50%",
                        backgroundColor: "currentColor",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        transition: "left 0.15s ease",
                      }}
                    >
                      <Image
                        src="/icons/right-left.svg"
                        alt="Light"
                        width={50}
                        height={50}
                        className=""
                      />
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute lg:left-8 left-2 lg:-bottom-6 -bottom-8 text-[1rem] font-[500]">
                  {t("light")}
                </div>
                <div className="absolute lg:right-8 right-2 lg:-bottom-6 -bottom-8 text-[1rem] font-[500]">
                  {t("intense")}
                </div>
              </div>

              {/* Value Display */}
              {/* <div className="text-center mt-8">
                <span className="text-[1.2rem] font-[500]">
                  Intensity: {step4Selection.intensity}%
                </span>
              </div> */}
            </div>
          </div>

          {/* Results */}
          <div
            className={`absolute inset-0 min-h-[60vh] px-[2rem] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${getStepClasses(5)}`}
          >
            <h2 className="text-[2.2rem] lg:text-[2.5rem] font-[500] mb-[1rem]  max-w-sm mx-auto text-center">
              {t("wypResult")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mx-auto justify-center items-center place-items-center">
              {matchedPerfumes.map((perfume) => (
                <div key={perfume._id} className="group w-full md:w-[315px]">
                  <div className="space-y-[1rem] w-[325px]">
                    <div className="lg:h-[14rem] h-[16rem] relative">
                      <ParallaxImage
                        src={perfume.featuredImage?.asset?.url || ""}
                        alt={perfume.title}
                        className="rounded-[1rem] border-[1px] border-transparent hover:border-foreground transition-colors duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <h3 className="line-clamp-1 text-[1.5rem] font-[400]">
                      {perfume.title}
                    </h3>
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                      <Link
                        href={`/${locale}/${perfume.category}-perfume/${perfume.slug}`}
                        className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                      >
                        {t("learnMore")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[2rem] absolute bottom-0 left-0 z-[100]">
          {/* Back Button */}
          {currentStep > 1 && (
            <div className="px-[3rem] w-full flex justify-between ">
              <button
                onClick={handlePreviousStep}
                disabled={isAnimating}
                className="cursor-pointer w-fit"
              >
                {t("back")}
              </button>

              {/* Only for step 4 Intensity Slider  */}
              {currentStep === 4 && (
                <button
                  onClick={findMatchingPerfumes}
                  disabled={isLoading}
                  className="cursor-pointer w-fit flex flex-col items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  {isLoading ? "Finding matches..." : t("unveil")}
                </button>
              )}

              {/* For step 5 Results (close ESE) */}
              {currentStep === 5 && (
                <button
                  onClick={closeDialog}
                  disabled={isLoading}
                  className="cursor-pointer w-fit"
                >
                  {t("close")}
                </button>
              )}
            </div>
          )}
          {/* Progress Bar */}
          <div
            className="h-[1.1rem] bg-foreground transition-all duration-300 ease-in-out"
            style={{
              width: `${(currentStep / 5) * 100}%`,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
