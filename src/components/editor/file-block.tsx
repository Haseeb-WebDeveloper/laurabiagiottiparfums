import Image from "next/image";

export default function FileBlock({ value }: any) {
    const videoProps = {
        loop: value.loop,
        muted: value.muted,
        autoPlay: value.autoplay
    }

    const fileUrl = value.file?.asset?.url;
    if (!fileUrl) return <p>File not available</p>;

    // Determine file type based on extension
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    const isVideo = ['mp4', 'webm', 'ogg', 'mov'].includes(fileExtension);
    const isImage = ['jpg', 'jpeg', 'png', 'webp', 'svg'].includes(fileExtension);
    const isGif = fileExtension === 'gif';

    // Use custom height if provided, otherwise default to md:h-[15vw]
    const heightClass = value.height ? `md:h-[${value.height}]` : 'md:h-[16vw]';

    const commonClasses = `
        object-contain rounded-md w-full md:w-fit md:max-w-[85vw] mx-auto
        ${heightClass} h-full
    `;

    return (
        <>
            {isVideo && (
                <video
                    {...videoProps}
                    src={fileUrl}
                    className={commonClasses}
                    controls={!videoProps.autoPlay}
                />
            )}
            {(isGif) && (
                <img
                    src={fileUrl}
                    alt="Content image"
                    className={commonClasses}
                />
            )}
            {(isImage) && (
                <Image
                    src={fileUrl}
                    alt="Content image"
                    width={600}
                    height={600}
                    priority
                    className={commonClasses}
                />
            )}
            {!isVideo && !isImage && !isGif && (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="block text-center">
                    Download file
                </a>
            )}
        </>
    )
}