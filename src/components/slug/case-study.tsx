"use client";
import RichEditor from "../rich-editor";
import { useLocale } from "@/lib/i18n/context";
import { CaseStudy } from "@/types/interface";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function CaseStudySlug({ caseStudy }: { caseStudy: CaseStudy }) {
    const router = useRouter();
    const { locale } = useLocale();

    const handleClose = () => {
        router.push(`/${locale}`);
    }

    return (
        <div
            className="bg-background z-50 overflow-y-hidden outline-none"
        >
            <button
                onClick={handleClose}
                className="cursor-pointer fixed md:top-0 top-4 md:left-0 right-4 z-[60]"
                aria-label="Close popup"
            >
                <Image src="/icons/close.svg" alt="Close" width={42} height={42} className='w-[4rem] h-[4rem] md:w-[10rem] md:h-[10rem] text-shadow' />
                {/* <X size={42} className="text-[4vw] md:text-[3vw]" /> */}
            </button>

            <div
                className="min-h-[100dvh]"
            // onClick={(e) => e.stopPropagation()}
            >
                {/* Header  TODO: Image*/}
                <div className='min-h-[100dvh] relative'>
                    <img src={caseStudy.featuredImage.asset.url} alt={caseStudy.name.en} className='w-full h-[70vh] md:h-[100dvh] object-cover' />
                    {/* details */}
                    <div className='absolute bottom-0 left-0 w-full bg-background grid grid-cols-1 md:grid-cols-3 items-center justify-center border-b-[1px] border-[#433E3E]'>
                        <div className='flex flex-col items-center justify-center px-[2wv] md:py-[3.8vw] py-[7vw] border-b-[1px] md:border-b-0 border-[#433E3E] md:border-r-[1px]'>
                            <div className='flex flex-col items-center md:gap-[1vw] gap-[1.4vw] w-fit px-[2vw]'>
                                <p className="md:text-[2vw] text-[6vw] font-[600] text-center">
                                    {locale === "en" ? caseStudy.name.en : caseStudy.name.it}
                                </p>
                                <p className='md:text-[1.3vw] text-[4vw] text-center'>
                                    {caseStudy.categories?.map(category => category.name).join(', ')}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center justify-center px-[4wv] md:px-[3vw] md:py-[3.8vw] py-[8vw] relative border-b-[1px] md:border-b-0 border-[#433E3E] md:border-r-[1px] max-h-[160px] md:max-h-full h-full'>
                            <div className="w-full h-[19vw] md:h-[6vw] px-[2vw] flex items-center justify-center">
                                <Image
                                    src={caseStudy.logo.asset.url}
                                    alt={caseStudy.name.en || ""}
                                    width={600}
                                    height={600}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                        </div>
                        <div className='flex flex-col items-center px-[2wv] md:py-[4vw] py-[9vw]'>
                            <div className='flex flex-col items-center md:items-start gap-[0.7vw] w-fit'>
                                <p className='md:text-[1.5vw] text-[5vw] text-center px-[2vw]'>
                                    {caseStudy.location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* content */}
                <article className='pb-[10vw] md:mt-[8vw] mt-[20vw] poppins'>
                    <RichEditor content={caseStudy.content} />
                </article>
            </div>

        </div>
    );
}