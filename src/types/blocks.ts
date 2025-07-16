export type BlockContent = {
  _type: "block";
  style?: string;
  children: {
    text: string;
    _type: "span";
  }[];
};

export interface TableBlock {
  _type: "tableBlock";
  tableTitle: string;
  images: {
    asset: {
      url: string;
    };
  }[];
  content: BlockContent[];
}

export interface TwoColumnTable {
  _type: "twoColumnTable";
  tableTitle: string;
  firstColumnTitle: string;
  secondColumnTitle: string;
  tableRows: {
    _key: string;
    icon: {
      asset: {
        url: string;
      };
    };
    firstColumnContent: BlockContent[];
    secondColumnContent: BlockContent[];
  }[];
}
