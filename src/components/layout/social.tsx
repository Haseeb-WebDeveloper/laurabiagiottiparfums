import React from "react";
import Link from "next/link";
import Image from "next/image";

const SocialIcons = () => {
  return (
    <div className="flex w-full lg:w-fit lg:items-center gap-[1rem]">
      <Link
        href="https://www.facebook.com/laurabiagiottiparfums"
        target="_blank"
        className="group aspect-square lg:border-[1px] border-foreground flex items-center justify-center rounded-full transition-all duration-300 hover:bg-foreground w-[2.5rem] h-[2.5rem]"
      >
        <div className="w-[1rem] h-[1rem] flex justify-center items-center">
          <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={16}
            height={16}
            className="group-hover:invert"
          />
        </div>
      </Link>
      <Link
        href="https://www.instagram.com/laurabiagiottiparfums/?hl=it"
        target="_blank"
        className="group aspect-square lg:border-[1px] border-foreground flex items-center justify-center rounded-full transition-all duration-300 hover:bg-foreground w-[2.5rem] h-[2.5rem]"
      >
        <div className="w-[1rem] h-[1rem] flex justify-center items-center">
          <Image
            src="/icons/instagram.svg"
            alt="Instagram"
            width={16}
            height={16}
            className="group-hover:invert"
          />
        </div>
      </Link>
      <Link
        href="https://www.youtube.com/channel/UCmK7kw_DHWu-2e1h_-Le6Jw"
        target="_blank"
        className="group aspect-square lg:border-[1px] border-foreground flex items-center justify-center rounded-full transition-all duration-300 hover:bg-foreground w-[2.5rem] h-[2.5rem]"
      >
        <div className="w-[1rem] h-[1rem] flex justify-center items-center">
          <Image
            src="/icons/youtube.svg"
            alt="Youtube"
            width={16}
            height={16}
            className="group-hover:invert"
          />
        </div>
      </Link>
    </div>
  );
};

export default SocialIcons;
