"use client";

import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./social";
import SplitText from "../ui/split-text";
import NewsletterPopup from "../ui/newsletter-popup";
import { useLocale } from "@/lib/i18n/context";

export default function Footer() {
  const { locale } = useLocale();
  console.log(locale);

  return (
    <footer className="pb-[4rem] lg:pb-[7rem] 2xl:px-[34px] md:px-[38px] px-[18px]">
      <div className="max-w">
        {/* Footer top */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between lg:border-b-[2px] border-foreground pb-[9rem]">
          {/* Logo */}
          <div className="w-full h-full flex flex-col gap-20">
            <Link href={`/${locale}`} className="w-fit h-fit">
              <Image
                src="/logo/logo-icon.svg"
                alt="logo"
                width={100}
                height={100}
                className="w-[32px] h-[32px]"
              />
            </Link>

            {/* Newsletter Section */}
            {locale === "it" ||
              (locale === "de" && (
                <div className="flex flex-col max-w-[300px]">
                  <SplitText
                    text="Newsletter"
                    variant="heading"
                    element="h2"
                    className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground leading-[100%]"
                  />
                  <SplitText
                    text="Subscribe to our newsletter to get the latest news and updates."
                    variant="paragraph"
                    element="p"
                    className="mt-[0.5rem] text-[0.9rem] font-[500] text-foreground"
                  />
                  <NewsletterPopup
                    customTrigger={
                      <button className="mt-[1rem] cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300">
                        <SplitText
                          text="Subscribe"
                          variant="heading"
                          element="p"
                        />
                      </button>
                    }
                  />
                </div>
              ))}
          </div>

          {/* Navigation Links */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-12">
            {/* Info Section */}
            <div className="w-full space-y-2 lg:space-y-4">
              <div className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground">
                <SplitText text="Info" variant="heading" element="h2" />
              </div>
              <ul>
                <li>
                  <Link
                    href={`/${locale}/news`}
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <SplitText text="News" variant="paragraph" element="p" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product Section */}
            <div className="w-full space-y-2 lg:space-y-4">
              <div className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground">
                <SplitText text="Product" variant="heading" element="h2" />
              </div>
              <ul className="flex flex-col gap-[0.65rem]">
                <li>
                  <Link
                    href={`/${locale}/women-perfume`}
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <SplitText
                      text="Women's Perfumes"
                      variant="paragraph"
                      element="p"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/men-perfume`}
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <SplitText
                      text="Men's Perfumes"
                      variant="paragraph"
                      element="p"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Brand Section */}
            <div className="w-full space-y-2 lg:space-y-4">
              <div className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground">
                <SplitText
                  text="Brand"
                  variant="heading"
                  element="h2"
                  className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
                />
              </div>
              <ul className="flex flex-col gap-[0.65rem]">
                <li>
                  <Link
                    href={`https://laurabiagiotti.it/categoria-prodotto/fragrances/?lang=en`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <SplitText
                      text="Laura Biagiotti Shop"
                      variant="paragraph"
                      element="p"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://www.laurabiagiotti.it/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <SplitText
                      text="Laura Biagiotti World"
                      variant="paragraph"
                      element="p"
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    href={`https://abparfums.com/recycling/italian/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <span className="leading-[130%]">
                      <SplitText
                        text="Instructions for separate collection of packaging"
                        variant="paragraph"
                        element="p"
                      />
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[1rem] pt-[4.8rem]">
          {/* Legal Links - Desktop */}
          <div className="space-y-[.5rem] hidden lg:block">
            <div className="flex items-center gap-[1rem] text-[0.9rem] tracking-tight text-foreground">
              <SplitText
                text="Privacy Policy | Cookies Policy | Terms of use | info@laurabiagiottiparfums.com"
                variant="paragraph"
                element="p"
              />
            </div>
            <div className="text-[0.9rem] text-foreground">
              <SplitText
                text="Powered by AB Parfums S.p.A. P.IVA 00902901008 - © 2025 Laura Biagiotti - All Rights Reserved."
                variant="paragraph"
                element="p"
              />
            </div>
          </div>

          {/* Legal Links - Mobile */}
          <div className="space-y-[.7rem] block lg:hidden w-full">
            <div className="space-y-2">
              <div className="text-[0.9rem] tracking-tight text-foreground">
                <SplitText
                  text="Privacy Policy | Cookies Policy | Terms of use"
                  variant="paragraph"
                  element="p"
                />
              </div>
              <div className="text-[0.9rem] text-foreground">
                <SplitText
                  text="info@laurabiagiottiparfums.com"
                  variant="paragraph"
                  element="p"
                />
              </div>
            </div>
            <div className="text-[0.9rem] tracking-tight text-foreground">
              <SplitText
                text="Powered by AB Parfums S.p.A. P.IVA 00902901008 - © 2025 Laura Biagiotti - All Rights Reserved."
                variant="paragraph"
                element="p"
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex lg:items-center w-full lg:w-fit gap-4">
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
