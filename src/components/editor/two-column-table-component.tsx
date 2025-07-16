"use client";

import { TwoColumnTable } from "@/types/blocks";
import Image from "next/image";
import RichEditor from "../rich-editor";

export default function TwoColumnTableComponent({
  TwoColumnTable,
}: {
  TwoColumnTable: TwoColumnTable;
}) {
  return (
    <div className="w-full mt-[3rem] space-y-2 overflow-hidden">
      <h2 className="text-[1rem] font-bold">{TwoColumnTable.tableTitle}</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-foreground text-background p-4 flex gap-[1rem]">
            <div className="w-[10%] min-w-[80px] lg:min-w-auto"></div>
            <h3 className="w-full text-[1rem] font-semibold">
              {TwoColumnTable.secondColumnTitle}
            </h3>
            <h3 className="w-full text-[1rem] font-semibold">
              {TwoColumnTable.firstColumnTitle}
            </h3>
          </div>
          <div className="flex flex-col border-[1px] border-foreground">
            {TwoColumnTable.tableRows?.map((row, index) => (
              <div
                key={row._key}
                className={`flex 
                  ${index === TwoColumnTable.tableRows.length - 1 ? "" : "border-b-[1px] border-foreground"}
                  `}
              >
                <div className="w-[10%] min-w-[80px] p-4 border-r-[1px] border-foreground">
                  <Image
                    src={row.icon.asset.url}
                    alt="Row icon"
                    width={100}
                    height={100}
                    className="object-contain w-[62px] h-[62px]"
                  />
                </div>
                <div className="w-full p-3 border-r-[1px] border-foreground">
                  <div key={row._key}>
                    <RichEditor content={row.firstColumnContent} />
                  </div>
                </div>
                <div className="w-full p-3">
                  <div key={row._key}>
                    <RichEditor content={row.secondColumnContent} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}