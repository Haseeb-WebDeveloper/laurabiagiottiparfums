export interface SanityImageAsset {
    _id: string;
    url: string;
}

export interface RichTextBlock {
    _type: string;
    [key: string]: unknown;
}

export interface ImageBlock {
    _type: "image";
    asset: SanityImageAsset;
    [key: string]: unknown;
}

export type ContentBlock = RichTextBlock | ImageBlock;