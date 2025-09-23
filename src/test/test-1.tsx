import React from "react";
import Link from "next/link";
import styles from "./NewsSectionHome.module.css";

export interface SanityImage {
  // Minimal placeholder for compatibility with your type;
  // in real usage, you’ll likely pass image URLs already resolved via @sanity/image-url
  url?: string;
}

export interface HomePageNews {
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  title: string;
  description: string;
  slug: string;
  featuredImage: {
    asset: SanityImage;
  };
  // Optional convenience: allow direct imageUrl if you have it resolved
  imageUrl?: string;
}

type Props = {
  title: string;
  ctaAllNewsText: string;
  ctaAllNewsLink: string;
  ctaSingleNewsText: string;
  news: HomePageNews[];
};

/* Format "gg/mm/aaaa - HH:mm" like the original */
function formatDate(dateString: string) {
  if (!dateString) return "";
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return dateString;
  return dateObj
    .toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " -");
}

/* Strip HTML to plain text and decode common entities */
function decodeAndStripHtml(html?: string) {
  if (!html) return "";
  let text = html.replace(/<[^>]+>/g, " ").replace(/\s\s+/g, " ").trim();
  text = text
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(Number(dec)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n/g, " ");
  return text;
}

/* Helper to get an image URL (prefer explicit imageUrl, else featuredImage.asset.url if provided) */
function getImageUrl(item: HomePageNews): string {
  return item.imageUrl || item.featuredImage?.asset?.url || "";
}

const NewsSectionHome: React.FC<Props> = ({
  title,
  ctaAllNewsText,
  ctaAllNewsLink,
  ctaSingleNewsText,
  news,
}) => {
  // Sort by date desc (fallback to _updatedAt if _createdAt missing)
  const sorted = [...news].sort(
    (a, b) =>
      new Date(b._createdAt || b._updatedAt).getTime() -
      new Date(a._createdAt || a._updatedAt).getTime()
  );
  const latestThree = sorted.slice(0, 3);

  return (
    <div className={styles.news_home_trigger}>
      <section className={styles.news_home_section}>
        <div className="w-layout-blockcontainer u-container no-padding w-container">
          <div className={styles.div_block_103}>
            <h2>{title}</h2>

            <div className={styles.div_block_102}>
              {latestThree.map((post) => {
                const imageUrl = getImageUrl(post);
                const plainText = decodeAndStripHtml(post.description);
                const href = `/news/${post.slug}`;

                return (
                  <div className={styles.div_block_100} key={post._id}>
                    <div className={styles.news_pic_wrapper}>
                      <img
                        className={styles.image_news}
                        src={imageUrl}
                        alt={post.title}
                        loading="eager"
                      />
                    </div>

                    <div className={styles.div_block_101}>
                      <div>
                        <div className="g_eyebrow_text">{formatDate(post._createdAt)}</div>

                        <h3
                          data-title={post.title}
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: "1.2em",
                          }}
                        >
                          {post.title}
                        </h3>

                        <p
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
                          {plainText}
                        </p>
                      </div>

                      <Link href={href} className="text_link w-inline-block">
                        <div className="link_cta">{ctaSingleNewsText}</div>
                        <div className="link_underline" />
                      </Link>
                    </div>
                  </div>
                );
              })}

              <Link href={ctaAllNewsLink} className={`${styles.div_block_104} w-inline-block`}>
                <div>{ctaAllNewsText}</div>
              </Link>
            </div>

            <div data-button-style="secondary" className="btn_main_wrap">
              <div className="g_clickable_wrap">
                <Link href={ctaAllNewsLink} className="g_clickable_link w-inline-block">
                  <span className="g_clickable_text u-sr-only">{ctaAllNewsText}</span>
                </Link>
                <button type="button" className="g_clickable_btn">
                  <span className="g_clickable_text u-sr-only">{ctaAllNewsText}</span>
                </button>
              </div>
              <div aria-hidden="true" className="btn_main_text">
                {ctaAllNewsText}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsSectionHome;


export const sampleNews: HomePageNews[] = [
  {
    _id: "1",
    _createdAt: "2025-09-12T10:30:00.000Z",
    _updatedAt: "2025-09-12T10:30:00.000Z",
    title: "Roma Uomo Nero Estremo: la nuova iconica fragranza",
    description:
      "<p>Scopri la nuova fragranza maschile ispirata alla città eterna. Un equilibrio tra forza ed eleganza.</p>",
    slug: "roma-uomo-nero-estremo-la-nuova-iconica-fragranza",
    featuredImage: { asset: { url: "/daytime.png" } },
    imageUrl: "/daytime.png",
  },
  {
    _id: "2",
    _createdAt: "2025-09-10T14:15:00.000Z",
    _updatedAt: "2025-09-10T14:15:00.000Z",
    title: "Dietro le quinte della campagna autunno",
    description:
      "<p>Uno sguardo esclusivo al set e alle ispirazioni creative della nuova stagione.</p>",
    slug: "dietro-le-quinte-della-campagna-autunno",
    featuredImage: { asset: { url: "/daytime.png" } },
    imageUrl: "/daytime.png",
  },
  {
    _id: "3",
    _createdAt: "2025-09-05T08:00:00.000Z",
    _updatedAt: "2025-09-05T08:00:00.000Z",
    title: "Eventi e novità: cosa ci aspetta nei prossimi mesi",
    description:
      "<p>Anteprime, collaborazioni e appuntamenti speciali da segnare in agenda.</p>",
    slug: "eventi-e-novita-cosa-ci-aspetta",
    featuredImage: { asset: { url: "/daytime.png" } },
    imageUrl: "/daytime.png",
  },
];
