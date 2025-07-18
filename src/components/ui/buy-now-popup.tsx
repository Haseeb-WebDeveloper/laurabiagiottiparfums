import { Country } from "@/types/perfume";
import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/context";

interface BuyNowPopupProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
  locale: string;
}

export default function BuyNowPopup({
  isOpen,
  onClose,
  countries,
  locale,
}: BuyNowPopupProps) {

  const { t } = useLocale();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(() => {
    // If locale is 'it', find Italy, if 'de', find Germany
    if (locale === "it" || locale === "de") {
      const countryName = locale === "it" ? "Italy" : "Germany";
      return (
        countries.find((country) => country.countryName.toLowerCase() === countryName.toLowerCase()) || null
      );
    }
    return null;
  });

  if (!isOpen) return null;

  // If locale is it/de, directly show websites for that country
  const showCountrySelection = !["it", "de"].includes(locale);

  const handleWebsiteClick = (url: string) => {
    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[210]">
      <div className="relative z-[110] bg-background dark:bg-[#1B1B1B] px-10 py-16 max-w-[90%] h-fit max-h-[90%] overflow-y-auto w-full lg:w-fit lg:max-w-[420px]">
        <div className=" flex justify-between items-center mb-6">
          <p className="max-w-[90%] text-foreground">
            {!selectedCountry
              ? "Select Country"
              : "Continuing you will be redirected to the website of one of our partners where you can purchase your fragrance."}
          </p>
          <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 z-100">
            <Image
              src="/icons/close.svg"
              alt="Close"
              width={400}
              height={400}
              className="w-full h-full max-w-[20px] opacity-90 aspect-square dark:invert"
            />
          </button>
        </div>

        {showCountrySelection && !selectedCountry ? (
          <div className="grid grid-cols-2 gap-5">
            {countries.map((country) => (
              <button
                key={country.countryName}
                onClick={() => setSelectedCountry(country)}
                className="cursor-pointer w-full flex items-center justify-center uppercase px-[2.7rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
              >
                {country.countryName}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {(
              selectedCountry ||
              countries.find(
                (c) =>
                  (locale === "it" && c.countryName === "Italy") ||
                  (locale === "de" && c.countryName === "Germany")
              )
            )?.websites.map((website, index) => (
              <button
                key={index}
                onClick={() => handleWebsiteClick(website.url)}
                className="w-full flex items-center justify-between gap-4 px-[0.7rem]  rounded-[0.5rem] border border-foreground"
              >
                {website.logo && (
                  <Image
                    src={website.logo.asset.url}
                    alt="Retailer logo"
                    className=" w-auto h-auto max-h-[60px] "
                    width={400}
                    height={400}
                  />
                )}
                <span className="cursor-pointer w-fit flex items-center justify-center uppercase my-[0.8rem] px-[1.5rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors duration-300">
                  {t("shop")}
                </span>
              </button>
            ))}
            {/* {showCountrySelection && (
              <button
                onClick={() => setSelectedCountry(null)}
                className="mt-4 text-[0.875rem] text-foreground/70 hover:text-foreground transition-colors"
              >
                ← Back to countries
              </button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
}
