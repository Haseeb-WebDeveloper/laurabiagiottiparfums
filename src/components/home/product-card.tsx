import Link from "next/link";
import { ParallaxImage } from "../ui/ParallaxImage";
import { Perfume } from "@/types/perfume";

export default function ProductCard({ product }: { product: Perfume }) {
  return (
    <div key={product._id} className="group">
      <div className="space-y-[2.29rem]">
        <div className="lg:h-[19.1rem] h-[22rem] w-full relative">
          <ParallaxImage
            src={product.featuredImage?.asset.url || ""}
            alt={product.title}
            className="rounded-[1rem] border-[1px] border-transparent hover:border-foreground transition-colors duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div>
          <div className="uppercase tracking-[0.1em] text-[0.875rem] font-[800]">
            {product.subCategory}
          </div>
          <h3 className="line-clamp-1">{product.title}</h3>
          <p
            className="lg:pt-[0.9rem] pt-[0.8rem]"
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
            {product.description}
          </p>
          <div className="lg:mt-[2.5rem] mt-[2rem] flex flex-col lg:flex-row gap-4 lg:items-center">
            <button
              // onClick={() => handleBuyNowClick(product)}
              className="cursor-pointer w-fit flex items-center justify-center uppercase px-[1.6rem] py-[0.6rem] rounded-[1rem] tracking-[1.1px] text-[14px] leading-[20px] font-[400] border border-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Shop Now
            </button>
            <Link
              href={`/$/${product.slug}`}
              className="cursor-pointer tracking-[1.1px] text-[14px] leading-[20px] font-[400]"
            >
              Scopri
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
