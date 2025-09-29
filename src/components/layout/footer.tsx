"use client";

import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./social";
import SplitText from "../ui/split-text";
// import NewsletterPopup from "../ui/newsletter-popup";
import { useLocale } from "@/lib/i18n/context";
import { useState } from "react";
import AnimatedUnderline from "@/components/ui/animated-underline";

export default function Footer() {
  const { locale, t } = useLocale();

  return (
    <footer className="pb-[4rem] lg:pb-[6.8rem] 2xl:px-[34px] md:px-[38px] px-[18px]">
      <div className="max-w">
        {/* Footer top */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-4 justify-between lg:border-b-[2px] border-foreground pb-[9.5rem]">
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
            {/* {locale === "it" ||
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
                    className="mt-[0.5rem] text-[0.87rem] font-[500] text-foreground"
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
              ))} */}
          </div>

          {/* Navigation Links */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-12">
            {/* Info Section */}
            <div className="w-full space-y-2 lg:space-y-[15px]">
              <div className="">
                <SplitText
                  text={t("info")}
                  variant="heading"
                  element="h2"
                  className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
                />
              </div>
              <ul>
                <li>
                  <FooterLink href={`/${locale}/news`}>
                    <SplitText
                      text={t("news")}
                      variant="paragraph"
                      element="p"
                      className="lg:text-[14px] tracking-[0.25px]"
                      style={{
                        fontWeight: "500",
                      }}
                    />
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Product Section */}
            <div className="w-full space-y-2 lg:space-y-[15px]">
              <div className="">
                <SplitText
                  text={t("Fragrances")}
                  variant="heading"
                  element="h2"
                  className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
                />
              </div>
              <ul className="flex flex-col gap-[0.5rem]">
                <li>
                  <FooterLink href={`/${locale}/women-perfume`}>
                    <SplitText
                      text={t("women")}
                      variant="paragraph"
                      element="p"
                      className="lg:text-[14px] tracking-[0.25px]"
                      style={{
                        fontWeight: "500",
                      }}
                    />
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={`/${locale}/men-perfume`}>
                    <SplitText
                      text={t("men")}
                      variant="paragraph"
                      element="p"
                      className="lg:text-[14px] tracking-[0.25px]"
                      style={{
                        fontWeight: "500",
                      }}
                    />
                  </FooterLink>
                </li>
              </ul>
            </div>

            {/* Brand Section */}
            <div className="w-full space-y-2 lg:space-y-[15px]">
              <div className="">
                <SplitText
                  text={t("brand")}
                  variant="heading"
                  element="h2"
                  className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
                />
              </div>
              <ul className="flex flex-col gap-[0.5rem]">
                <li>
                  <FooterLink
                    href={`https://laurabiagiotti.it/categoria-prodotto/fragrances/?lang=en`}
                    external
                  >
                    <SplitText
                      text={t("LauraBiagiottiShop")}
                      variant="heading"
                      element="p"
                      className="lg:text-[14px] tracking-[0.25px]"
                      style={{
                        fontWeight: "500",
                        wordSpacing: "0.12em",
                      }}
                    />
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={`https://www.laurabiagiotti.it/`} external>
                    <SplitText
                      text={t("LauraBiagiottiWorld")}
                      variant="paragraph"
                      element="p"
                      className="lg:text-[14px] tracking-[0.25px]"
                      style={{
                        fontWeight: "500",
                        wordSpacing: "0.12em",
                      }}
                    />
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href={`https://abparfums.com/recycling/italian/`}
                    external
                  >
                    <span className="">
                      <SplitText
                        text={t("Instructionsforrecycling")}
                        variant="paragraph"
                        element="p"
                        className="lg:text-[14px] tracking-[0.25px] "
                        style={{
                          maxWidth: "150px",
                          display: "inline-block",
                          fontWeight: "500",
                          wordSpacing: "0.12em",
                          lineHeight: "145%",
                        }}
                      />
                    </span>
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[1rem] pt-[4.87rem]">
          {/* Legal Links - Desktop */}
          <div className="space-y-[.5rem] hidden lg:block">
            <div className="flex items-center gap-[0.2rem] text-[0.87rem] tracking-tight text-foreground">
              <Link
                href={`/${locale}/privacy-policy`}
                className="flex items-center"
              >
                <SplitText
                  text="Privacy Policy"
                  variant="paragraph"
                  element="p"
                  className="text-[0.87rem] leading-0 border-b-[1px] border-transparent hover:border-foreground py-0 tracking-[0rem]"
                  style={{
                    wordSpacing: "0.05em",
                    lineHeight: "100%",
                  }}
                />
              </Link>
              <span>|</span>
              <Link
                href={`/${locale}/cookies-policy`}
                className="flex items-center"
              >
                <SplitText
                  text="Cookies Policy"
                  variant="paragraph"
                  element="p"
                  className="text-[0.87rem] leading-0 border-b-[1px] border-transparent hover:border-foreground py-0 tracking-[0rem]"
                  style={{
                    wordSpacing: "0.05em",
                    lineHeight: "100%",
                  }}
                />
              </Link>
              <span>|</span>
              <Link
                href={`/${locale}/terms-of-use`}
                className="flex items-center"
              >
                <SplitText
                  text={t("termsOfUse")}
                  variant="paragraph"
                  element="p"
                  className="text-[0.87rem] leading-0 border-b-[1px] border-transparent hover:border-foreground py-0 tracking-[0rem]"
                  style={{
                    wordSpacing: "0.05em",
                    lineHeight: "100%",
                  }}
                />
              </Link>
              <span>|</span>
              <Link
                href={`mailto:info@laurabiagiottiparfums.com`}
                className="flex items-center"
              >
                <SplitText
                  text="info@laurabiagiottiparfums.com"
                  variant="paragraph"
                  element="p"
                  className="text-[0.87rem] leading-0 border-b-[1px] border-transparent hover:border-foreground py-0 tracking-[0rem]"
                  style={{
                    wordSpacing: "0.05em",
                    lineHeight: "100%",
                  }}
                />
              </Link>
            </div>
            <div className="text-[0.87rem] text-foreground">
              <SplitText
                text={t("footerLastLine")}
                variant="paragraph"
                element="p"
                className=""
                style={{
                  wordSpacing: "0.02em",
                }}
              />
            </div>
          </div>

          {/* Legal Links - Mobile */}
          <div className="space-y-[.7rem] block lg:hidden w-full">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-x-[0.5rem] gap-y-0 text-[0.87rem] tracking-tight text-foreground">
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="flex items-center"
                >
                  <SplitText
                    text="Privacy Policy"
                    variant="paragraph"
                    element="p"
                    className="text-[0.87rem] leading-[80%] border-b-[1px] border-transparent hover:border-foreground"
                    style={{
                      wordSpacing: "0.05em",
                    }}
                  />
                </Link>
                <span>|</span>
                <Link
                  href={`/${locale}/cookies-policy`}
                  className="flex items-center"
                >
                  <SplitText
                    text="Cookies Policy"
                    variant="paragraph"
                    element="p"
                    className="text-[0.87rem] leading-[80%] border-b-[1px] border-transparent hover:border-foreground"
                    style={{
                      wordSpacing: "0.05em",
                    }}
                  />
                </Link>
                <span>|</span>
                <Link
                  href={`/${locale}/terms-of-use`}
                  className="flex items-center"
                >
                  <SplitText
                    text={t("termsOfUse")}
                    variant="paragraph"
                    element="p"
                    className="text-[0.87rem] leading-[80%] border-b-[1px] border-transparent hover:border-foreground"
                    style={{
                      wordSpacing: "0.05em",
                    }}
                  />
                </Link>
              </div>
              <div className="">
                <Link
                  href={`mailto:info@laurabiagiottiparfums.com`}
                  className="flex items-center"
                >
                  <SplitText
                    text="info@laurabiagiottiparfums.com"
                    variant="paragraph"
                    element="p"
                    className="text-[0.87rem] leading-[80%] border-b-[1px] border-transparent hover:border-foreground"
                    style={{
                      wordSpacing: "0.05em",
                    }}
                  />
                </Link>
              </div>
            </div>
            <div className="">
              <SplitText
                text={t("footerLastLine")}
                variant="paragraph"
                element="p"
                style={{
                  wordSpacing: "0.05em",
                }}
                className="text-[0.87rem] text-foreground"
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

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const [isHover, setIsHover] = useState(false);
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...externalProps}
      className="relative inline-block text-[0.87rem] text-foreground"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className="relative">
        {children}
        <AnimatedUnderline isActive={isHover} className="-bottom-[1px] " />
      </span>
    </Link>
  );
}
