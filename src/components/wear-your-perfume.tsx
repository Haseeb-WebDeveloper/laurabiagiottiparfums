"use client";

import { useId, useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useLocale } from "@/lib/i18n/context";
import { Note, NoteItem } from "@/types/notes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getNotes } from "@/lib/i18n/getSanityContent";
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

const timesOfDay = [{
  name: "sunrise",
  label: "sunrise",
}, {
  name: "dayTime",
  label: "dayTime",
}, {
  name: "sunset",
  label: "sunset",
}, {
  name: "night",
  label: "night",
}];

export default function WearYourPerfume() {
  const { locale, t } = useLocale();
  const id = useId();
  const [currentStep, setCurrentStep] = useState(1);
  const [notes, setNotes] = useState<Note[]>([]);
  const [matchedPerfumes, setMatchedPerfumes] = useState<NoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const morphingPathRef = useRef<SVGPathElement>(null);
  const [triggerHover, setTriggerHover] = useState(false);

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

  // Refs for GSAP animations
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await getNotes(locale);
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [locale]);

  // GSAP animations for step transitions
  useGSAP(() => {
    const steps = [step1Ref, step2Ref, step3Ref, step4Ref, resultsRef];

    // Initially hide all steps except first
    steps.slice(1).forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, {
          autoAlpha: 0,
          xPercent: 100,
        });
      }
    });

    // Function to animate step transition
    const animateStepTransition = (fromStep: number, toStep: number) => {
      const fromRef = steps[fromStep - 1].current;
      const toRef = steps[toStep - 1].current;

      if (!fromRef || !toRef) return;

      const timeline = gsap.timeline();

      // Animate current step out to left
      timeline.to(fromRef, {
        xPercent: -100,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Animate next step in from right
      timeline.fromTo(
        toRef,
        { xPercent: 100, autoAlpha: 0 },
        { xPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power2.inOut" },
        "-=0.3"
      );
    };

    // Watch for step changes
    if (currentStep > 1) {
      animateStepTransition(currentStep - 1, currentStep);
    }
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const findMatchingPerfumes = () => {
    setIsLoading(true);
    try {
      // Get all perfumes from the selected note
      const selectedNotePerfumes =
        step2Selection.selectedNote?.perfumeNotes || [];

      // Filter perfumes based on all criteria
      const matches = selectedNotePerfumes.filter((perfume) => {
        // Match gender
        if (perfume.category !== step1Selection.gender) return false;

        // Match time of day
        if (perfume.momentOfDay !== step3Selection.timeOfDay) return false;

        // Match intensity (within 30 points range)
        const intensityDiff = Math.abs(
          (perfume.sharpness || 50) - step4Selection.intensity
        );
        if (intensityDiff > 30) return false;

        return true;
      });

      // Sort by closest intensity match
      const sortedMatches = matches.sort((a, b) => {
        const aDiff = Math.abs((a.sharpness || 50) - step4Selection.intensity);
        const bDiff = Math.abs((b.sharpness || 50) - step4Selection.intensity);
        return aDiff - bDiff;
      });

      // Take top 2 matches
      setMatchedPerfumes(sortedMatches.slice(0, 2));
      setCurrentStep(5); // Show results
    } catch (error) {
      console.error("Error finding matching perfumes:", error);
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full flex justify-end">
          <span
            className={`w-fit h-fit cursor-pointer bg-foreground text-background hover:bg-background hover:text-foreground border border-foreground rounded-[0.45rem] p-[0.55rem] transition-colors duration-300 flex items-center gap-[0.5rem]`}
            onMouseEnter={() => setTriggerHover(true)}
            onMouseLeave={() => setTriggerHover(false)}
          >
            <span className="text-[0.75rem] font-[400] leading-0 tracking-tight text-pretty">
              {t("wearYourPerfume")}
            </span>
            <Image
              src={
                triggerHover
                  ? "/icons/dark-loading.svg"
                  : "/icons/light-loading.svg"
              }
              alt="arrow-down"
              width={12}
              height={12}
              className="dark:invert"
            />
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="overflow-x-hidden z-[110] w-[79vw] h-[85vh] max-w overflow-y-auto flex flex-col items-center justify-center ">
        {/* Step 1: Gender Selection */}
        <div
          ref={step1Ref}
          className={`${currentStep !== 1 ? "hidden" : "flex"} min-h-[60vh] flex-col items-center justify-center`}
        >
          <h2 className="text-[2rem] lg:text-[3rem] font-[500] mb-[.5rem]">
            {t("wypstep1Title")}
          </h2>
          <p className="text-[1rem] font-[400] mb-[2rem] text-center ">
            {t("wypstep1Description")}
          </p>
          <div className="flex gap-8 w-full max-w-[600px] justify-center items-center">
            <button
              onClick={() => {
                setStep1Selection({ gender: "mens" });
                handleNextStep();
              }}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {t("forHim")}
            </button>
            <button
              onClick={() => {
                setStep1Selection({ gender: "womens" });
                handleNextStep();
              }}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              {t("forHer")}
            </button>
          </div>
        </div>

        {/* Step 2: Notes Selection */}
        <div
          ref={step2Ref}
          className={`${currentStep !== 2 ? "hidden" : ""} min-h-[60vh] flex flex-col items-center justify-center w-full relative`}
        >
          <h2 className="text-[2rem] lg:text-[2.5rem] font-[500] mb-[.5rem] text-center">
            {t("wypstep2Title")}
          </h2>
          <div className="mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full justify-between gap-8">
            {notes.map((note, index) => (
              <button
                key={index}
                onClick={() => {
                  setStep2Selection({ selectedNote: note });
                  handleNextStep();
                }}
                className={`cursor-pointer flex flex-col items-center gap-4
                  ${step2Selection.selectedNote?.title === note.title ? "" : ""}`}
              >
                <div className="w-[190px] h-[190px] rounded-full overflow-hidden">
                  <Image
                    src={note.image.asset.url}
                    alt={note.title || ""}
                    width={190}
                    height={190}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-center text-[1.1rem] font-[400]">
                  {note.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Time of Day */}
        <div
          ref={step3Ref}
          className={`${currentStep !== 3 ? "hidden" : ""} min-h-[60vh] flex flex-col items-center w-full relative`}
        >
          <h2 className="text-[2rem] lg:text-[2.5rem] font-[500] mb-[.5rem]">
            {t("wypstepe3Title")}
          </h2>
          <div className="mt-[2rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full justify-between">
            {timesOfDay.map((time: { name: string; label: string }) => (
              <button
                key={time.name}
                onClick={() => {
                  setStep3Selection({ timeOfDay: time.name as any });
                  handleNextStep();
                }}
                className={`cursor-pointer flex flex-col items-center gap-4
                  ${step3Selection.timeOfDay === time.name ? "" : ""}`}
              >
                <div className="w-[190px] h-[190px] rounded-full overflow-hidden">
                  <Image
                    src={`/${time.name}.png`}
                    alt={time.label}
                    width={190}
                    height={190}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="capitalize text-[1.1rem] font-[400]">
                  {t(time.label)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Intensity Slider */}
        <div
          ref={step4Ref}
          className={`${currentStep !== 4 ? "hidden" : ""} min-h-[60vh] flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-4 relative`}
        >
          <h2 className="text-[2rem] lg:text-[2.5rem] font-[500] mb-[.5rem] text-center">
            {t("wypstepe4Title")}
          </h2>

          <div className="flex flex-col items-center gap-12 w-full mt-[4rem]">
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
              <div className="w-full px-12">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={step4Selection.intensity}
                    onChange={(e) =>
                      setStep4Selection({ intensity: parseInt(e.target.value) })
                    }
                    className="w-full h-2 appearance-none bg-transparent cursor-pointer"
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
                      left: `calc(${step4Selection.intensity}% - 24px)`,
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
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <Image
                      src="/icons/right-arror.svg"
                      alt="Light"
                      width={24}
                      height={24}
                      className="rotate-180"
                    />
                    <Image
                      src="/icons/right-arror.svg"
                      alt="Intense"
                      width={24}
                      height={24}
                      className=""
                    />
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute left-10 -bottom-8 text-[1.1rem] font-[400]">
                {t("light")}
              </div>
              <div className="absolute right-10 -bottom-8 text-[1.1rem] font-[400]">
                {t("intense")}
              </div>
            </div>

            {/* Value Display */}
            <div className="text-center mt-8">
              <span className="text-[1.2rem] font-[500]">
                Intensity: {step4Selection.intensity}%
              </span>
            </div>

            <button
              onClick={findMatchingPerfumes}
              disabled={isLoading}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300 mt-4"
            >
              {isLoading ? "Finding matches..." : t("unveil")}
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className={`${currentStep !== 5 ? "hidden" : ""} min-h-[60vh] relative`}
        >
          <h2 className="text-[2rem] lg:text-[2.5rem] font-[500] mb-[.5rem] text-center">
            {t("wypResult")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matchedPerfumes.map((perfume) => (
              <div key={perfume._id} className="group w-full -[340px] ">
                <div className="space-y-[1rem]">
                  <div className="lg:h-[14rem] h-[16rem] w-full relative">
                    <ParallaxImage
                      src={perfume.featuredImage?.asset.url || ""}
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

        <div className="w-full flex flex-col gap-[1rem] mb-2">
          {/* Back Button */}
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              className="cursor-pointer w-fit"
            >
              {t("back")}
            </button>
          )}
          {/* Progress Bar */}
          <div
            className="absolute bottom-0 left-0 h-[1rem] bg-foreground transition-all duration-300 ease-in-out"
            style={{
              width: `${(currentStep / 5) * 100}%`,
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
