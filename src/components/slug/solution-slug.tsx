"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale } from '@/lib/i18n/context';
import RichEditor from '../rich-editor';
import SolutionForm from '../contact/solution-form';
import { useRouter } from 'next/navigation';
import SolutionCaseStudyModal from '../models/solution-case-study-model';
import { CaseStudy } from '@/types/interface';
import { DeliverablesCarousel } from '../layout/Deliverables-carousel';

const SolutionSlug = ({ solution, pageName }: { solution: any, pageName: string }) => {
  const { locale, t } = useLocale();
  const router = useRouter();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [formOpacity, setFormOpacity] = useState(0);
  const formRef = useRef<HTMLDivElement | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCaseStudyModel, setShowCaseStudyModel] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Animation related states and refs
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedItemRect, setClickedItemRect] = useState<DOMRect | null>(null);
  const [clickedImageRect, setClickedImageRect] = useState<DOMRect | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const caseStudyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);


  // Handle closing animation
  const handleClose = () => {
    router.push(`/${locale}/${pageName}`);
  };

  // Effect to handle scrolling when case study opens
  useEffect(() => {
    if (showCaseStudyModel && popupRef.current) {
      // Lock scrolling on the main solution modal
      popupRef.current.style.overflow = 'hidden';
    } else if (popupRef.current) {
      // Re-enable scrolling on the main solution modal
      popupRef.current.style.overflow = 'auto';
    }
  }, [showCaseStudyModel]);

  // close form
  const handleCloseForm = () => {
    setShowForm(false);
    setFormOpacity(0);
  }

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
  }

  // open case study
  const handleOpenCaseStudy = (e: React.MouseEvent<HTMLDivElement>, caseStudy: CaseStudy, index: number) => {
    if (isAnimating) return;

    e.stopPropagation();
    e.preventDefault();

    // Get the clicked item and image positions
    const itemRect = caseStudyRefs.current[index]?.getBoundingClientRect() || null;
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
  }


  return (
    <div
      className="bg-background z-50 overflow-y-hidden outline-none"
    >
      <button
        onClick={handleClose}
        className="cursor-pointer fixed md:top-0 top-4 md:left-0 right-4 z-[120]"
        aria-label="Close popup"
      >
        <Image src="/icons/close.svg" alt="Close" width={42} height={42} className='w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-shadow' />
      </button>

      <div
        className={`pt-[20vw] md:pt-[8vw] min-h-[100dvh]`}
      >
        {/* Header */}
        <h1 className="md:text-[4.5vw] text-[8vw] font-[600] text-center">{solution.title}</h1>

        {/* content */}
        <article className='max-w-[85vw] mx-auto md:pb-[15vw] pb-[30vw] mt-[5.5vw] poppins'>
          <RichEditor content={solution.content} />
        </article>

        {/* Deliverables */}
        {solution.deliverables && solution.deliverables.length > 0 && (
          <div className="w-full h-full">
            <h2 className="md:max-w-[90vw] px-6 mx-auto text-4xl md:text-[8vw] text-[10vw] font-[600] md:leading-[130%] leading-[150%] uppercase">Deliverables</h2>
            <div className="w-full h-full my-12 md:mt-[8vw] md:mb-[5vw]">
              <DeliverablesCarousel
                media={solution.deliverables.map((item: any) => ({
                  title: item.title,
                  image: item.media
                }))} />
            </div>
          </div>
        )}

        {/* case study */}
        {solution.caseStudies && solution.caseStudies.length > 0 && (
          <div className="w-full h-full mb-[40vw] md:mb-[10vw]">
            <h2 className="md:max-w-[90vw] px-6 mx-auto text-4xl md:text-[8vw] text-[10vw] font-[600] md:leading-[130%] leading-[150%] uppercase pb-[18vw] md:pb-[11vw]">SOME CASES</h2>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              {solution.caseStudies.map((caseStudy: CaseStudy, index: number) => (
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
              ))}
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

      {/* Solution Form */}
      {showForm && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background/30 backdrop-blur-xl"
          style={{ opacity: formOpacity }}
          onClick={handleFormBackdropClick}
        >
          <div
            ref={formRef}
            className="md:px-[4vw] md:py-[1.5vw] p-[6vw] md:rounded-2xl bg-[#1F1C1C]  backdrop-blur-sm w-[100%] md:w-[40vw] relative h-fit"
          >
            <SolutionForm solutionPageName={solution.title} />
          </div>
        </div>
      )}

      {/* bottom message */}
      <div className=' fixed bottom-0 left-0 w-full py-[3vw] md:py-[1vw] px-[4vw] bg-black  z-[60]'>
        <div className='md:max-w-[70vw] mx-auto flex md:flex-row flex-col items-center gap-[3vw] md:gap-[4vw] justify-center'>
          <p className='md:text-[1.4vw] text-[3.8vw] font-[500] text-center md:text-left'>{solution.stickyBarText}</p>
          <div
            onClick={() => {
              setShowForm(true);
              setFormOpacity(1);
            }}
            className='cursor-pointer w-fit text-nowrap md:px-[2vw] px-[4vw] md:py-[0.7vw] py-[2vw] bg-[#0EB081] text-white md:rounded-[1vw] rounded-[2vw]' >
            <p className='md:text-[1.4vw] text-[3.5vw] font-[400] w-full text-center'>{t('solutionModelStickyBarText')}</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SolutionSlug;