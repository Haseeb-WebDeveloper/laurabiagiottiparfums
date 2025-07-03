import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import DesktopLogo from "./desktop-logo";
import MobileLogo from "./mobile-logo";

export default function Navbar() {
  return (
    <div className="max-w px-[38px] pt-[46px] pb-[24px]">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-[1rem]">
          <LanguageSwitcher />
          {/* Search */}
          <div className="cursor-pointer w-full flex items-center gap-[0.5rem] border border-foreground rounded-[0.45rem] p-[0.555rem] leading-0">
            <p className="text-[.75rem] leading-0 font-[400] text-pretty">
              Search
            </p>
            <Image
              src="/icons/search.svg"
              alt="search"
              width={12}
              height={12}
              className="text-foreground "
            />
          </div>
        </div>
        {/* Center */}
        <div className="flex flex-col gap-[3rem] items-center">
          <p className="text-[1.5rem] font-[400] leading-0">Lora Bugatti</p>
          {/* Nav items */}
          <div className="flex items-center gap-[1.5rem]">
            <button className="cursor-pointer text-[0.75rem] font-[400] leading-0 text-pretty">
              Women's perfume
            </button>
            <button className="cursor-pointer text-[0.75rem] font-[400] leading-0">
              Men's perfume
            </button>
            <button className="cursor-pointer text-[0.75rem] font-[400] leading-0">
              Brand
            </button>
            <button className="cursor-pointer text-[0.75rem] font-[400] leading-0">
              News
            </button>
          </div>
        </div>
        {/* Right */}
        <div className="">
          <p
            className={`cursor-pointer h-fit px-[1rem] py-[1rem] leading-0 rounded-[0.45rem] text-[.75rem] font-[400] border hover:border-foreground border-transparent text-pretty capitalize transition-colors duration-300 bg-foreground text-background hover:bg-background hover:text-foreground`}
          >
            Where Your Product is Made
          </p>
        </div>
      </div>
    </div>
  );
}
