import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./social";

export default function Footer() {
  return (
    <footer className="px-[1.7rem] u-container">
      {/* Footer top */}
      <div className="flex justify-between  border-b border-foreground pb-[6rem]">
        {/* left side */}
        <div className="w-full h-full">
          <Image
            src="/logo/logo-icon.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-[50px] h-[50px]"
          />
        </div>
        {/* right side */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full space-y-2">
            <h3 className="text-lg font-bold">Info</h3>
            <ul>
              <li>
                <Link gsap-target="heading-1" href="/">
                  News
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full space-y-2">
            <h3 gsap-target="heading-1" className="text-lg font-bold">
              Fragrances
            </h3>
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
          <div className="w-full space-y-2">
            <h3 gsap-target="heading-1" className="text-lg font-bold">
              Brand
            </h3>
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
      <div className="flex justify-between items-center gap-[1rem] pt-[6rem]">
        {/* Left side */}
        <div className="space-y-[.7rem]">
          <p gsap-target="paragraph-1" className="flex items-center gap-[1rem]">
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
            <Link href="mailto:info@laurabiagiottiparfums.com" className="link">
              info@laurabiagiottiparfums.com
            </Link>
          </p>
          <p gsap-target="paragraph-1">
            Powered by AB Parfums S.p.A. P.IVA 00902901008 - © 2025 Laura
            Biagiotti - All Rights Reserved .
          </p>
        </div>

        {/* Right side (Socials)*/}
        <div className="flex items-center gap-4">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
