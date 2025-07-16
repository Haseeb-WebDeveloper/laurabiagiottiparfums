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
      <div>
        {/* Desktop Header */}
        <div className="hidden md:flex bg-foreground text-background p-4 gap-[1rem]">
          <div className="w-[10%]"></div>
          <h3 className="w-full text-[1rem] font-semibold">
            {TwoColumnTable.secondColumnTitle}
          </h3>
          <h3 className="w-full text-[1rem] font-semibold">
            {TwoColumnTable.firstColumnTitle}
          </h3>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-foreground text-background p-4">
          <h3 className="text-[1rem] font-semibold text-center">
            {TwoColumnTable.tableTitle}
          </h3>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:flex flex-col border-[1px] border-foreground">
          {TwoColumnTable.tableRows?.map((row, index) => (
            <div
              key={row._key}
              className={`flex 
                ${index === TwoColumnTable.tableRows.length - 1 ? "" : "border-b-[1px] border-foreground"}
                `}
            >
              <div className="w-[10%] p-4 border-r-[1px] border-foreground">
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

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4">
          {TwoColumnTable.tableRows?.map((row, index) => (
            <div
              key={row._key}
              className="border-[1px] border-foreground rounded-lg overflow-hidden"
            >
              {/* Mobile Card Header */}
              <div className="bg-foreground text-background p-3 flex items-center gap-3">
                <Image
                  src={row.icon.asset.url}
                  alt="Row icon"
                  width={40}
                  height={40}
                  className="object-contain w-[40px] h-[40px]"
                />
                <span className="text-sm font-medium">Item {index + 1}</span>
              </div>

              {/* Mobile Card Content */}
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    {TwoColumnTable.secondColumnTitle}
                  </h4>
                  <div className="text-sm">
                    <RichEditor content={row.firstColumnContent} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-foreground">
                    {TwoColumnTable.firstColumnTitle}
                  </h4>
                  <div className="text-sm">
                    <RichEditor content={row.secondColumnContent} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}