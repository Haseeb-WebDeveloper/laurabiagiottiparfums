import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import TableBlockComponent from "./editor/table-block-component";
import TwoColumnTableComponent from "./editor/two-column-table-component";

interface RichEditorProps {
  content: TypedObject | TypedObject[] | any;
  lineClamp?: number;
}

export default function RichEditor({ content, lineClamp }: RichEditorProps) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={value}
          alt={value.alt || ""}
          width={800}
          height={500}
          className="my-[0.5vw] rounded-lg shadow-md object-cover w-full h-auto aspect-video object-center"
        />
      ),
      tableBlock: ({ value }: any) => {
        return (
          <div className="table-block">
            <TableBlockComponent TableBlock={value} />
          </div>
        );
      },
      twoColumnTable: ({ value }: any) => {
        return (
          <div className="table-block">
            <TwoColumnTableComponent TwoColumnTable={value} />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-[2rem] md:text-[2.5rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h4>
      ),
      h5: ({ children }) => (
        <h5 className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h5>
      ),
      h6: ({ children }) => (
        <h6 className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]">
          {children}
        </h6>
      ),
      normal: ({ children }) => {
        const isEmpty =
          !children ||
          (Array.isArray(children) &&
            children.length === 1 &&
            typeof children[0] === "string" &&
            children[0].trim() === "");

        if (isEmpty) {
          return <div className="h-[4vw] md:h-[0.8vw]" />;
        }

        return (
          <p
            // gsap-target=""
            className={`${lineClamp ? `line-clamp-${lineClamp}` : ""}`}
            style={{
              wordSpacing: "-0.03em",
            }}
          >
            {children}
          </p>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="border-l-[0.25vw] border-[#433E3E] pl-[1vw] italic text-[5vw] md:text-[1.5vw] leading-[170%] md:mb-[1vw] mb-[4vw]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="editor-content">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <div className="pl-[2.5rem]">
          <li className="list-disc list-outside">
            <span className="text-black">{children}</span>
          </li>
        </div>
      ),
    },
    marks: {
      link: ({ value, children }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {children}
        </a>
      ),
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-gray-100 px-[0.063vw] rounded text-[0.875vw] font-mono">
          {children}
        </code>
      ),
    },
    hardBreak: () => <br className="h-[4vw] md:h-[0.8vw]" />,
  };

  return (
    <div className="prose prose-sm md:prose-lg lg:prose-xl max-w-none font-newsreader">
      <PortableText value={content} components={components} />
    </div>
  );
}
