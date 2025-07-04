interface SanityImageAsset {
    _id: string;
    url: string;
  }
  
  interface BrandImage {
    image: { asset: SanityImageAsset };
    alt?: string;
  }
  
  interface FirstSection {
    title: string;
    description: string;
    images: BrandImage[];
    bottomText: string;
  }
  
  interface SecondSection {
    title: string;
    image: BrandImage;
  }
  
  interface ThirdSection {
    text: string;
    image: BrandImage;
  }
  
  interface FourthSection {
    title: string;
    text: string;
    image: BrandImage;
  }
  
  interface LastSection {
    text: string;
    url: string;
  }
  
  export interface BrandPage {
    firstSection: FirstSection;
    secondSection: SecondSection;
    thirdSection: ThirdSection;
    fourthSection: FourthSection;
    lastSection: LastSection;
  }
  