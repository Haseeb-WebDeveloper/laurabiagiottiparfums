"use client";

import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";
import { useLocale } from "@/lib/i18n/context";
import SplitText from "../ui/split-text";
import HtmlSplitText from "../ui/html-split-text";

export default function OlfactoryFamily({
  olfactoryFamily,
  nose,
  scentDescription,
  buy,
  locale,
  isMainPerfume = false,
}: {
  olfactoryFamily: string;
  nose: string;
  scentDescription: string;
  buy?: {
    countries: {
      countryName: string;
      websites: {
        logo: {
          asset: {
            url: string;
          };
        };
        url: string;
      }[];
    }[];
  };
  locale: string;
  isMainPerfume?: boolean;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useLocale();
  return (
    <div className="flex flex-col lg:flex-row gap-[2rem]">
      {/* Left Column */}
      <div className="w-full flex flex-col md:flex-row lg:gap-[2rem] gap-[1.5rem]">
        <div className="w-full space-y-[0.7rem]">
          <h3 className="text-[2rem] lg:font-[600] font-[700] tracking-wider">
            {t("olfactoryFamily")}
          </h3>
          <SplitText
            className="lg:text-[1rem] text-[1.1rem] leading-[1.5rem] font-bold mb-[1.8rem]"
            variant="paragraph"
            element="p"
            text={olfactoryFamily}
            style={{
              fontWeight: "500",
            }}
          />
        </div>
        <div className="w-full space-y-[0.7rem]">
          <h3 className="text-[2rem] lg:font-[600] font-[700] tracking-wider">{t("nose")}</h3>
          <SplitText
            className="lg:text-[1rem] text-[1.1rem] leading-[1.5rem] font-bold mb-[1.8rem]"
            variant="paragraph"
            element="p"
            text={nose}
            style={{
              fontWeight: "500",
            }}
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full flex flex-col gap-[2rem]">
        <HtmlSplitText className="mb-[0.4rem]" variant="paragraph" htmlContent={scentDescription} />
        <button
          onClick={() => setIsPopupOpen(true)}
          className={`cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border text-foreground  transition-colors duration-300 
            
            ${isMainPerfume ? "border-ring hover:bg-ring" : "border-foreground hover:bg-foreground hover:text-background"}`}
        >
          {t("shop")}
        </button>
      </div>

      {buy && (
        <BuyNowPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          countries={buy.countries}
          locale={locale}
        />
      )}
    </div>
  );
}
