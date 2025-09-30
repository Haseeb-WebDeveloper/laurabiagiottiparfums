import Image from "next/image";

const aspectRatioClasses: Record<string, string> = {
  "1/1": "aspect-[1/1]",
  "16/9": "aspect-[16/9]",
  "9/16": "aspect-[9/16]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
};

// Helper to extract YouTube video ID from URL
function getYoutubeId(url: string): string | null {
  if (!url) return null;
  // Match typical YouTube URL patterns
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function FileBlock({ value }: any) {
  const isYoutubeVideo = value?.isYoutubeVideo;
  const videoUrl = value?.videoUrl;
  const imageUrl = value?.image?.asset?.url;
  const aspectRatio = value?.aspectRatio || "1/1";
  const aspectClass = aspectRatioClasses[aspectRatio] || aspectRatioClasses["1/1"];

  if (isYoutubeVideo && videoUrl) {
    const videoId = getYoutubeId(videoUrl);
    if (!videoId) {
      return <p>Invalid YouTube URL</p>;
    }
    return (
      <div className={`w-full h-full mb-6 ${aspectClass} relative`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    );
  }

  if (!imageUrl) return <p>Image not available</p>;

  return (
    <div className={`w-full h-full mb-6 ${aspectClass}`}>
      <Image
        src={imageUrl}
        alt="Content image"
        width={1000}
        height={1000}
        className="object-cover w-full h-full"
        sizes="(max-width: 1000px) 100vw, 1000px"
        priority
      />
    </div>
  );
}
