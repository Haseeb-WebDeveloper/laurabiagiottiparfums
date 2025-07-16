import { BlockContent, TableBlock } from "./blocks";


export interface TermsOfUseInterface {
  name: string;
  content: (TableBlock | BlockContent | any)[];
}
