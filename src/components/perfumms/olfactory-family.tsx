"use client";

import { Perfume } from "@/types/perfume";
import { useState } from "react";
import BuyNowPopup from "../ui/buy-now-popup";
import { useLocale } from "@/lib/i18n/context";

export default function OlfactoryFamily({
  olfactoryFamily,
  nose,
  scentDescription,
  buy,
  locale,
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
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { t } = useLocale();
  return (
    <div className="flex flex-col lg:flex-row gap-[2rem]">
      {/* Left Column */}
      <div className="w-full flex flex-col md:flex-row lg:gap-[2rem] gap-[1.5rem]">
        <div className="w-full space-y-[0.7rem]">
          <h3 className="text-[2rem] lg:font-[600] font-[700]">
            {t("olfactoryFamily")}
          </h3>
          <span className="lg:text-[1rem] text-[1.1rem] leading-[1.5rem] font-[600] text-foreground/90 mb-[1.8rem]">
            {olfactoryFamily}
          </span>
        </div>
        <div className="w-full space-y-[0.7rem]">
          <h3 className="text-[2rem] lg:font-[600] font-[700]">{t("nose")}</h3>
          <span className="lg:text-[1rem] text-[1.1rem] leading-[1.5rem] font-[600] text-foreground/90 mb-[1.8rem]">
            {nose}
          </span>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full flex flex-col gap-[2rem]">
        <p className="mb-[0.4rem]">{scentDescription}</p>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
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
