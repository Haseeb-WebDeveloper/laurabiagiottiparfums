export type BlockContent = {
  _type: "block";
  style?: string;
  children: {
    text: string;
    _type: "span";
  }[];
};

export interface TableRow {
  icon: {
    asset: {
      url: string;
    };
  };
  content: {
    contentType: string;
    paragraphContent: string;
    bulletPoints: string[];
  }[];
}

export interface TableBlock {
  _type: "tableBlock";
  tableTitle: string;
  tableRows: TableRow[];
}
