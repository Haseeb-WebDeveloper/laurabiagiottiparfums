"use client";

import { TableBlock, TableRow } from "@/types/blocks";
import Image from "next/image";

export default function TableBlockComponent({
  TableBlock,
}: {
  TableBlock: TableBlock;
}) {
  return (
    <div className="w-full mt-[3rem] space-y-2 overflow-hidden">
      <h2 className="text-[1rem] font-bold">
        {TableBlock.tableTitle}
      </h2>
      <div className="flex border-[1px] border-foreground">
        {/* First Column - Icons */}
        <div className="border-r-[1px] border-foreground flex flex-col gap-[1rem] justify-between items-center">
          {TableBlock.tableRows.map((row: TableRow) => (
            <div 
              key={row.icon.asset.url} 
              className="h-full p-1 flex items-center justify-center"
            >
              <Image
                src={row.icon.asset.url}
                alt="Row icon"
                width={100}
                height={100}
                className="object-contain w-[62px] h-[62px]"
              />
            </div>
          ))}
        </div>
        
        {/* Second Column - Content */}
        <div className="flex-1 space-y-[0.6rem] p-3">
          {TableBlock.tableRows.map((row: TableRow) => (
            <div 
              key={row.icon.asset.url}
              className=""
            >
              {row.content.map((contentItem, index) => (
                <div key={index} className="space-y-[0.5rem]">
                  <p className="text-[1rem]"
                   style={{
                    wordSpacing: "-0.03em",
                  }}
                  >{contentItem.paragraphContent}</p>
                  {contentItem.bulletPoints && contentItem.bulletPoints.length > 0 && (
                    <div className="space-y-[0.02rem]">
                      {contentItem.bulletPoints.map((point, bulletIndex) => (
                        <div key={bulletIndex} className="pl-[1.3rem]">
                          <li className="list-disc list-outside">
                            <span className="text-foreground text-[1.02rem]">{point}</span>
                          </li>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
