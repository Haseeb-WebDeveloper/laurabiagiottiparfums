import PerfumeSlugHeroSection from "./perfume-slug-hero-section";
import { Perfume, SubCategory } from "@/types/perfume";
import Image from "next/image";
import Link from "next/link";
import OlfactoryNotes from "./olfactory-notes";

export default function PerfumeSlug({
  perfume,
  locale,
  subCategories,
}: {
  perfume: Perfume;
  locale: string;
  subCategories: SubCategory[];
}) {


  return (
    <div className="max-w mb-[15rem] lg:mt-[10.6rem] mt-[8.2rem]">
      {/* header title category and sub category 1st Section*/}
      <div className="min-h-screen overflow-hidden flex flex-col justify-center bg-red-500">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-end">
          <h1 className="2xl:text-[4rem] lg:text-[3.85rem] text-[2.6rem] leading-[150%]">
            {perfume.title}
          </h1>
          <div className="flex gap-10 h-fit">
            <div
              className={`cursor-pointer h-fit w-fit text-[0.9rem] font-[400] `}
            >
              {perfume.category === "mens"
                ? "men's Perfume"
                : "women's Perfume"}
            </div>
            <div
              className={`cursor-pointer h-fit w-fit text-[0.9rem] font-[400] `}
            >
              {perfume.subCategory}
            </div>
          </div>
        </div>

        <div className="lg:mt-[2.3rem] mt-[1.5rem]">
          <PerfumeSlugHeroSection
            heroSectionImages={perfume.heroSectionImages || []}
            description={perfume.description}
          />
        </div>
      </div>

      <OlfactoryNotes olfactoryNotes={perfume.olfactoryNotes || []} />

      {/* Hero Section */}
      <section className="relative h-screen">
        {perfume.bgFile ? (
          perfume.bgFile.asset.url.endsWith(".mp4") ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={perfume.bgFile.asset.url}
            />
          ) : (
            <Image
              src={perfume.bgFile.asset.url}
              alt={perfume.title}
              fill
              className="object-cover"
              priority
            />
          )
        ) : (
          <Image
            src={perfume.featuredImage.asset.url}
            alt={perfume.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{perfume.title}</h1>
            <p className="text-xl mb-2">{perfume.olfactoryFamily}</p>
            <p className="text-lg">By {perfume.nose}</p>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="prose prose-lg mx-auto">
          <p className="text-xl leading-relaxed">{perfume.description}</p>
        </div>
      </section>

      {/* Olfactory Notes Section */}
      {perfume.olfactoryNotes && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Olfactory Notes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {perfume.olfactoryNotes.map((note, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={note.image.asset.url}
                      alt={note.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{note.title}</h3>
                  <ul className="space-y-2">
                    {note.notes.map((n, i) => (
                      <li key={i} className="text-gray-600">
                        {n.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Images Section */}
      {perfume.productImagesSection && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">
              {perfume.productImagesSection.title}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {perfume.productImagesSection.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perfume.productImagesSection.images.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={image.asset.url}
                    alt={`${perfume.title} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Buy Section */}
      {perfume.buy && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Where to Buy
            </h2>
            <div className="space-y-8">
              {perfume.buy.countries.map((country, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">
                    {country.countryName}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {country.websites.map((website, wIndex) => (
                      <a
                        key={wIndex}
                        href={website.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="relative w-24 h-12">
                          <Image
                            src={website.logo.asset.url}
                            alt={`Buy at ${website.url}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {perfume.previousProduct && (
              <Link
                href={`/${locale}/perfume/${perfume.previousProduct.slug}`}
                className="group flex items-center space-x-4"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={perfume.previousProduct.featuredImage.asset.url}
                    alt={perfume.previousProduct.title}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Previous</span>
                  <span className="text-lg font-medium group-hover:text-primary">
                    {perfume.previousProduct.title}
                  </span>
                </div>
              </Link>
            )}

            {perfume.nextProduct && (
              <Link
                href={`/${locale}/perfume/${perfume.nextProduct.slug}`}
                className="group flex items-center space-x-4 text-right"
              >
                <div>
                  <span className="block text-sm text-gray-500">Next</span>
                  <span className="text-lg font-medium group-hover:text-primary">
                    {perfume.nextProduct.title}
                  </span>
                </div>
                <div className="relative w-16 h-16">
                  <Image
                    src={perfume.nextProduct.featuredImage.asset.url}
                    alt={perfume.nextProduct.title}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {perfume.relatedProducts && perfume.relatedProducts.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Related Perfumes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {perfume.relatedProducts.map((related) => (
                <Link
                  key={related._id}
                  href={`/${locale}/perfume/${related.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <div className="relative h-64">
                      <Image
                        src={related.featuredImage.asset.url}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{related.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
