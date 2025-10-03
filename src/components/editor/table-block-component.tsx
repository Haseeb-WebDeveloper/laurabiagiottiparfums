"use client";

import { TableBlock } from "@/types/blocks";
import Image from "next/image";
import RichEditor from "../rich-editor";

export default function TableBlockComponent({
  TableBlock,
}: {
  TableBlock: TableBlock;
}) {
  return (
    <div className="w-full mt-[3rem] space-y-2 overflow-hidden">
      <h2 className="text-[1rem] font-bold">{TableBlock.tableTitle}</h2>

      {/* Table Structure */}
      <div className="flex border-[1px] border-foreground">
        {/* First Column - Icons */}
        <div className="border-r-[1px] border-foreground flex flex-col gap-[1rem] justify-between items-center">
          {TableBlock.images?.map((image) => (
            <div
              key={image.asset.url}
              className="h-full p-2 flex items-center justify-center"
            >
              <Image
                src={image.asset.url}
                alt="Row icon"
                width={100}
                height={100}
                className="object-contain w-[62px] h-[62px]"
              />
            </div>
          ))}
        </div>

        {/* Second Column - Content */}
        <div className="flex w-full items-center p-3">
          {/* Rich Text Content */}
          <RichEditor content={TableBlock.content} />
        </div>
      </div>
    </div>
  );
}

// {TableBlock.tableRows?.map((row) => (
//     <div
//       key={row._key}
//       className="space-y-2"
//     >
//       {row.content.map((contentItem) => (
//         <div key={contentItem._key} className="space-y-[0.5rem]">
//           {contentItem.contentType === "paragraph" && contentItem.paragraphContent?.en && (
//             <RichEditor content={contentItem.paragraphContent.en} />
//           )}

//           {contentItem.contentType === "bullets" && contentItem.bulletPoints && (
//             <div className="space-y-[0.02rem]">
//               {contentItem.bulletPoints.map((point) => (
//                 <div key={point._key} className="pl-[1.3rem]">
//                   <li className="list-disc list-outside">
//                     <span className="text-foreground text-[1.02rem]">
//                       {point.en}
//                     </span>
//                   </li>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   ))}
