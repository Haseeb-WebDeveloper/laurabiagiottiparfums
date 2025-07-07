import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./social";

export default function Footer() {
  return (
    <footer className="pb-[4rem] lg:pb-[7rem] 2xl:px-[34px] lg:px-[38px] px-[18px]">
      <div className="max-w">
        {/* Footer top */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 justify-between lg:border-b border-foreground pb-[6rem]">
          {/* left side */}
          <div className="w-full h-full flex items-center justify-center lg:justify-start">
            <Image
              src="/logo/logo-icon.svg"
              alt="logo"
              width={100}
              height={100}
              className="w-[30px] h-[30px]"
            />
          </div>
          {/* right side */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-4 gap-12">
            <div className="w-full space-y-2  lg:space-y-4">
              <h5 gsap-target="heading-1">Info</h5>
              <ul>
                <li>
                  <Link gsap-target="heading-1" href="/">
                    News
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full space-y-2  lg:space-y-4">
              <h5 gsap-target="heading-1">Fragrances</h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link gsap-target="heading-1" href="/">
                    Women
                  </Link>
                </li>
                <li>
                  <Link gsap-target="heading-1" href="/">
                    Men
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full space-y-2  lg:space-y-4">
              <h5 gsap-target="heading-1">Brand</h5>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link gsap-target="heading-1" href="/">
                    Laura Biagiotti Shop
                  </Link>
                </li>
                <li>
                  <Link gsap-target="heading-1" href="/">
                    Laura Biagiotti World
                  </Link>
                </li>
                <li>
                  <Link gsap-target="heading-1" href="/">
                    Instructions for separate collection of packaging
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-[1rem] pt-[6rem]">
          {/* Left side */}
          <div className="space-y-[.7rem] hidden lg:block">
            <p
              gsap-target="paragraph-1"
              className="flex items-center gap-[1rem]"
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
            <p gsap-target="paragraph-1">
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
            <p gsap-target="paragraph-1">
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
