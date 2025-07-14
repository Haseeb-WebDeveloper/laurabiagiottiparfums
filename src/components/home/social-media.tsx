import { SocialMediaImage } from "@/types/home-page";
import { ParallaxImage } from "../ui/ParallaxImage";
import Image from "next/image";
import Link from "next/link";

export default function SocialMedia({
  socialMediaImages,
}: {
  socialMediaImages: SocialMediaImage[];
}) {
  return (
    <section className="">
      <h2 className="text-[3rem] font-bold">Follow us on Instagram</h2>
      <p className="text-[1rem]">Become a #LBlover!</p>
      <div className="mt-[2rem] w-full flex flex-col md:flex-row justify-between">
        <div className="flex gap-[1rem] items-center">
          <Image
            src="/logo/insta-logo.png"
            alt="Social Media"
            width={100}
            height={100}
            className="w-[70px] h-[70px] object-cover rounded-full aspect-square"
          />
          <div className="flex flex-col gap-[0.2rem]">
            <Link
              href="https://www.instagram.com/laurabiagiottiparfums/"
              target="_blank"
              className="text-[2rem] font-bold"
            >
              Laura Biagiotti Parfums
            </Link>
            <Link
              href="https://www.instagram.com/laurabiagiottiparfums/"
              target="_blank"
              className="text-[1.2rem]"
            >
              @laurabiagiottiparfums
            </Link>
          </div>
        </div>
        <div className="flex gap-[3rem]">
          <div className="flex flex-col gap-[0.2rem]">
            <h6 className="text-[2rem] font-semibold">976</h6>
            <p className="text-[1rem]">Post</p>
          </div>
          <div className="flex flex-col gap-[0.2rem]">
            <h6 className="text-[2rem] font-semibold">25.6k</h6>
            <p className="text-[1rem]">Followers</p>
          </div>
          <div className="flex flex-col gap-[0.2rem]">
            <h6 className="text-[2rem] font-semibold">251</h6>
            <p className="text-[1rem]">Following</p>
          </div>
        </div>
      </div>
      <div className="mt-[2.5rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {socialMediaImages.map((social, index) => (
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="aspect-square relative overflow-hidden group"
          >
            <ParallaxImage
              src={social.image.asset.url}
              alt="Social Media"
              fill
              className=""
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
          </a>
        ))}
      </div>
      <div className="mt-[2.5rem]">
        <Link
          href="https://www.instagram.com/laurabiagiottiparfums/"
          target="_blank"
          className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Follow
        </Link>
      </div>
    </section>
  );
}
