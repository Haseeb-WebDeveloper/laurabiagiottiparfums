"use client";

import { useLocale } from "@/lib/i18n/context";
import { RelatedProduct } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";

export default function RelatedPerfumes({
  relatedPerfumes,
}: {
  relatedPerfumes: RelatedProduct[];
}) {
  const { locale, t } = useLocale();

  return (
    <section className="lg:max-w-[83%] w-full mx-auto mt-[5rem]">
      <h3 className="mb-12 lg:text-[3rem] text-[2.5rem] font-[500]">
        {locale === "en"
          ? "Related fragrances"
          : locale === "it"
            ? "Altre fragranze"
            : "Andere Düfte"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-between lg:gap-8 gap-16">
        {relatedPerfumes.map((related, index) => (
          <div
            key={index}
            className={`w-full flex ${index == 0 ? "justify-start" : "justify-end"}`}
          >
            <div className="max-w-[415px] group space-y-[1.9rem]">
              <div className="lg:h-[305px] h-[420px] w-full relative">
                <ParallaxImage
                  src={related.featuredImage?.asset.url || ""}
                  alt={related.title}
                  className="rounded-[1rem] border-[1px] border-transparent hover:border-foreground transition-colors duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={index < 4} // Load first 4 images immediately
                />
              </div>
              <div className="space-y-[0.3rem]">
                <h3 className="line-clamp-1  text-[1.25rem]  md:text-[2rem] font-[700] tracking-wider leading-[120%] ">
                  {related.title}
                </h3>
                <p
                  className="pt-[0.8rem]"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.5em",
                    margin: 0,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {related.description}
                </p>
                <div className="mt-[2.5rem]">
                  <Link
                    href={`/${locale}/perfume/${related.slug}`}
                    className="cursor-pointer uppercase px-[1.7rem] py-[0.7rem] rounded-[1.1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
