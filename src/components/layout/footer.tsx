import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./social";

export default function Footer() {
  return (
    <footer className="pb-[4rem] lg:pb-[7rem] 2xl:px-[34px] md:px-[38px] md:px-[28px] px-[18px]">
      <div className="max-w">
        {/* Footer top */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between lg:border-b-[2px] border-foreground pb-[9rem]">
          {/* left side */}
          <div className="w-full h-full flex items-center justify-center md:justify-start">
            <Image
              src="/logo/logo-icon.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-[32px] h-[32px]"
            />
          </div>
          {/* right side */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 gap-12">
            <div className="w-full space-y-2  lg:space-y-4">
              <div
                gsap-target="heading-1"
                className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
              >
                Info
              </div>
              <ul>
                <li>
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    News
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full space-y-2  lg:space-y-4">
              <div
                gsap-target="heading-1"
                className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
              >
                Product
              </div>
              <ul className="flex flex-col gap-[0.65rem]">
                <li>
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    Women's Perfumes
                  </Link>
                </li>
                <li>
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    Men's Perfumes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full space-y-2  lg:space-y-4">
              <div
                gsap-target="heading-1"
                className="text-[1.6rem] lg:text-[1.5rem] font-[500] text-foreground"
              >
                Brand
              </div>
              <ul className="flex flex-col gap-[0.65rem]">
                <li>
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    Laura Biagiotti Shop
                  </Link>
                </li>
                <li>
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    Laura Biagiotti World
                  </Link>
                </li>
                <li className="hidden md:block">
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <span className="leading-[130%]">
                      Instructions for separate
                      <br /> collection of packaging
                    </span>
                  </Link>
                </li>
                <li className="md:hidden block">
                  <Link
                    gsap-target="heading-1"
                    href="/"
                    className="text-[0.9rem] font-[500] text-foreground"
                  >
                    <span className="leading-[130%]">
                      Instructions for separate collection of packaging
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[1rem] pt-[4.8rem]">
          {/* Left side */}
          <div className="space-y-[.5rem] hidden lg:block">
            <p
              gsap-target="paragraph-1"
              className="flex items-center gap-[1rem] text-[0.9rem] tracking-tight text-foreground"
              style={{
                wordSpacing: "0rem",
              }}
            >
              <Link
                href="/privacy-policy/"
                className="link"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                href="/cookies-policy/"
                className="link"
                rel="noopener noreferrer"
              >
                Cookies Policy
              </Link>{" "}
              |{" "}
              <Link
                href="/terms-of-use/"
                className="link"
                rel="noopener noreferrer"
              >
                Terms of use
              </Link>{" "}
              |{" "}
              <Link
                href="mailto:info@laurabiagiottiparfums.com"
                className="link"
              >
                info@laurabiagiottiparfums.com
              </Link>
            </p>
            <p
              gsap-target="paragraph-1"
              className="text-[0.9rem] text-foreground"
              style={{
                wordSpacing: "0rem",
              }}
            >
              Powered by AB Parfums S.p.A. P.IVA 00902901008 - © 2025 Laura
              Biagiotti - All Rights Reserved .
            </p>
          </div>

          {/* Mobile */}
          <div className="space-y-[.7rem] block lg:hidden  w-full">
            <div>
              <p
                gsap-target="paragraph-1"
                className="flex items-center gap-[0.3rem] mobile-link"
              >
                <Link
                  href="/privacy-policy/"
                  className="link"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>{" "}
                |{" "}
                <Link
                  href="/cookies-policy/"
                  className="link"
                  rel="noopener noreferrer"
                >
                  Cookies Policy
                </Link>{" "}
                |{" "}
                <Link
                  href="/terms-of-use/"
                  className="link"
                  rel="noopener noreferrer"
                >
                  Terms of use
                </Link>
              </p>
              <p gsap-target="paragraph-1">
                <Link
                  href="mailto:info@laurabiagiottiparfums.com"
                  className="link"
                >
                  info@laurabiagiottiparfums.com
                </Link>
              </p>
            </div>
            <p
              gsap-target="paragraph-1"
              className="text-[0.9rem] tracking-tight text-foreground"
              style={{
                wordSpacing: "0rem",
              }}
            >
              Powered by AB Parfums S.p.A. P.IVA 00902901008 - © 2025 Laura
              Biagiotti - All Rights Reserved .
            </p>
          </div>

          {/* Right side (Socials)*/}
          <div className="flex lg:items-center w-full lg:w-fit gap-4">
            <SocialIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
