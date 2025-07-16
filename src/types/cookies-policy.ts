import { BlockContent, TableBlock } from "./blocks";

export interface TableRow {
  icon: {
    asset: {
      url: string;
    };
  };
  contentType: string;
  paragraphContent: string;
  bulletPoints: string[];
}

export interface CookiesPolicyInterface {
  name: string;
  content: (TableBlock | BlockContent | any)[];
}
