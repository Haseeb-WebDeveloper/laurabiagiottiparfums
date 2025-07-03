interface MediaFile {
    autoplay: boolean;
    rounded: boolean;
    file: {
        asset: {
            url: string;
        };
    };
    loop: boolean;
    muted: boolean;
}

interface MediaBlockValue {
    files: MediaFile[];
    width: string;
    height: string;
    gap: string;
    justifyContent: 'center' | 'between';
}

// Video file types
const videoTypes = ['mp4', 'webm', 'ogg', 'mov'];
// Image file types
const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

export default function MediaBlock({ value }: { value: MediaBlockValue }) {
    const { files, width, height, gap, justifyContent } = value;

    const containerStyle = {
        width: '100%',
        willChange: 'transform' as const,
        backfaceVisibility: 'hidden' as const,
        transform: 'translateZ(0)',
    };

    const desktopContainerStyle = {
        width: width || '100%',
        gap: gap || '2vw',
        willChange: 'transform' as const,
        backfaceVisibility: 'hidden' as const,
        transform: 'translateZ(0)',
    };

    return (
        <div
            className={` w-full my-[8vw] md:my-[4vw] flex flex-wrap justify-center gap-[4vw] md:gap-0 ${justifyContent === 'between' ? 'md:justify-between' : 'md:justify-center'}`}
            style={containerStyle}
        >
            <div className="hidden md:flex  w-full " style={desktopContainerStyle}>
                {files && files.map((item, index) => {
                    const { file, autoplay, loop, muted } = item;

                    if (!file || !file.asset || !file.asset.url) {
                        return null;
                    }

                    const fileUrl = file.asset.url;
                    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
                    const rounded = item.rounded || false;

                    const desktopStyle = {
                        maxHeight: height || '',
                        // width: '100%',
                        objectFit: 'contain' as const
                    };

                    if (videoTypes.includes(fileExtension || '')) {
                        return (
                            <div key={`media-desktop-${index}`} className="w-fit mx-auto media-container flex justify-center items-center">
                                <video
                                    src={fileUrl}
                                    className={`${rounded ? 'rounded-lg' : ''} video-element`}
                                    style={{
                                        ...desktopStyle,
                                        contain: 'content',
                                        contentVisibility: 'auto',
                                    }}
                                    autoPlay={autoplay}
                                    loop={loop}
                                    muted={muted}
                                    controls={!autoplay}
                                    playsInline
                                    preload="auto"
                                />
                            </div>
                        );
                    } else if (imageTypes.includes(fileExtension || '')) {
                        return (
                            <div key={`media-desktop-${index}`} className="w-fit mx-auto  media-container flex justify-center items-center ">
                                <img
                                    src={fileUrl}
                                    alt="Media content"
                                    className={`${rounded ? 'rounded-lg' : ''}`}
                                    style={desktopStyle}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={`media-desktop-${index}`} className="media-container flex justify-center">
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Download File
                                </a>
                            </div>
                        );
                    }
                })}
            </div>

            {/* Mobile Layout */}
            <div className="flex flex-col w-full md:hidden">
                {files && files.map((item, index) => {
                    const { file, autoplay, loop, muted } = item;

                    if (!file || !file.asset || !file.asset.url) {
                        return null;
                    }

                    const fileUrl = file.asset.url;
                    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
                    const rounded = item.rounded || false;

                    const mobileStyle = {
                        // maxHeight: '60vw',
                        width: '100%',
                        objectFit: 'contain' as const
                    };

                    if (videoTypes.includes(fileExtension || '')) {
                        return (
                            <div key={`media-mobile-${index}`} className="media-container w-full">
                                <video
                                    src={fileUrl}
                                    className={`${rounded ? 'rounded-lg' : ''}`}
                                    style={mobileStyle}
                                    autoPlay={autoplay}
                                    loop={loop}
                                    muted={muted}
                                    controls={!autoplay}
                                    playsInline
                                />
                            </div>
                        );
                    } else if (imageTypes.includes(fileExtension || '')) {
                        return (
                            <div key={`media-mobile-${index}`} className="media-container w-full">
                                <img
                                    src={fileUrl}
                                    alt="Media content"
                                    className={`${rounded ? 'rounded-lg' : ''}`}
                                    style={mobileStyle}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div key={`media-mobile-${index}`} className="media-container w-full flex justify-center">
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block px-[4vw] py-[2vw] bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Download File
                                </a>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}