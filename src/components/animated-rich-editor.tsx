import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { TypedObject } from "@portabletext/types";
import Image from "next/image";
// import { urlFor } from "@/lib/sanity/client";
import TableBlockComponent from "./editor/table-block-component";
import TwoColumnTableComponent from "./editor/two-column-table-component";
// import SplitText from "./ui/split-text";
import React from "react";
import FileBlock from "./editor/file-block";

interface AnimatedRichEditorProps {
  content: TypedObject | TypedObject[] | any;
  lineClamp?: number;
}

// Helper function to extract text content from React children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractTextFromChildren(child)).join("");
  }

  if (React.isValidElement(children)) {
    return extractTextFromChildren((children.props as any).children);
  }

  return "";
};

// Wrapper component for animated text elements
const AnimatedTextElement = ({
  children,
  variant,
  element,
  className,
  style,
}: {
  children: React.ReactNode;
  variant: "paragraph" | "heading";
  element:
    | "div"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "span"
    | undefined;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const textContent = extractTextFromChildren(children);

  if (!textContent.trim()) {
    // If no text content, render the original children without animation
    const Component = element as any;
    return (
      <Component className={className} style={style}>
        {children}
      </Component>
    );
  }

  // Custom animation implementation for better React children handling
  const ref = React.useRef<HTMLElement | null>(null);
  const hasPlayedRef = React.useRef(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !ref.current || hasPlayedRef.current)
      return;

    const el = ref.current;
    const { gsap } = require("gsap");
    const { ScrollTrigger } = require("gsap/ScrollTrigger");
    const { SplitText: GSAPSplitText } = require("gsap/SplitText");

    gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

    let tl: any;
    let splitter: any;
    let targets: Element[];

    const initializeAnimation = () => {
      if (hasPlayedRef.current) {
        el.style.visibility = "visible";
        return;
      }

      // Configuration based on variant
      const baseConfig =
        variant === "paragraph"
          ? {
              splitType: "lines" as const,
              from: { opacity: 0, y: "2rem" },
              to: { opacity: 1, y: 0 },
              stagger: 0.15,
              ease: "power3.out",
              duration: 1.0,
            }
          : {
              splitType: "words" as const,
              from: { opacity: 0, y: "2rem" },
              to: { opacity: 1, y: "0" },
              stagger: 0.2,
              ease: "power3.out",
              duration: 1.0,
            };

      try {
        splitter = new GSAPSplitText(el, {
          type: baseConfig.splitType,
          absolute: false,
          linesClass: "split-line",
        });

        targets =
          baseConfig.splitType === "lines" ? splitter.lines : splitter.words;

        if (!targets || targets.length === 0) {
          splitter.revert();
          return;
        }

        targets.forEach((t: any) => {
          t.style.willChange = "transform, opacity";
          t.style.display = "inline-block";
          t.style.position = "relative";
        });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "bottom 20%",
            toggleActions: "play none none none",
            markers: false,
            onEnter: () => {
              hasPlayedRef.current = true;
              el.style.visibility = "visible";
            },
          },
          onComplete: () => {
            gsap.set(targets, {
              ...baseConfig.to,
              clearProps: "willChange",
            });
          },
        });

        tl.set(targets, { ...baseConfig.from, force3D: true });
        tl.to(targets, {
          ...baseConfig.to,
          ease: baseConfig.ease,
          stagger: baseConfig.stagger,
          duration: baseConfig.duration,
          force3D: true,
        });
      } catch (error) {
        console.error("Failed to create SplitText:", error);
        el.style.visibility = "visible";
      }
    };

    const timeoutId = setTimeout(initializeAnimation, 50);

    return () => {
      clearTimeout(timeoutId);
      if (tl) tl.kill();
      if (targets) gsap.killTweensOf(targets);
      if (splitter) splitter.revert();
    };
  }, [variant]);

  const Component = (element === "span" ? "div" : element) as any;

  return (
    <Component
      ref={ref}
      className={`split-parent ${className || ""}`}
      style={{
        visibility: "hidden",
        ...style,
      }}
    >
      {children}
    </Component>
  );
};

export default function AnimatedRichEditor({
  content,
  lineClamp,
}: AnimatedRichEditorProps) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={value.asset.url}
          alt={value.alt || ""}
          width={800}
          height={500}
          className="my-[0.5vw] object-cover w-full h-full object-center"
        />
      ),
      fileBlock: ({ value }: any) => {
        return <FileBlock value={value} />;
      },
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
        <AnimatedTextElement
          className="text-[2.5rem] md:text-[3.5rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h1"
        >
          {children}
        </AnimatedTextElement>
      ),
      h2: ({ children }) => (
        <AnimatedTextElement
          className="text-[2rem] md:text-[2.5rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h2"
        >
          {children}
        </AnimatedTextElement>
      ),
      h3: ({ children }) => (
        <AnimatedTextElement
          className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h3"
        >
          {children}
        </AnimatedTextElement>
      ),
      h4: ({ children }) => (
        <AnimatedTextElement
          className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h4"
        >
          {children}
        </AnimatedTextElement>
      ),
      h5: ({ children }) => (
        <AnimatedTextElement
          className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h5"
        >
          {children}
        </AnimatedTextElement>
      ),
      h6: ({ children }) => (
        <AnimatedTextElement
          className="text-[1.5rem] md:text-[2rem] font-medium mb-[1rem] md:mb-[0.8rem]"
          variant="heading"
          element="h6"
        >
          {children}
        </AnimatedTextElement>
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
          <AnimatedTextElement
            className={`${lineClamp ? `line-clamp-${lineClamp}` : ""}`}
            style={{
              wordSpacing: "-0.03em",
            }}
            variant="paragraph"
            element="p"
          >
            {children}
          </AnimatedTextElement>
        );
      },
      blockquote: ({ children }) => (
        <AnimatedTextElement
          className="border-l-[0.25vw] border-[#433E3E] pl-[1vw] italic text-[5vw] md:text-[1.5vw] leading-[170%] md:mb-[1vw] mb-[4vw]"
          variant="paragraph"
          element="span"
        >
          {children}
        </AnimatedTextElement>
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
            <AnimatedTextElement
              className="text-black"
              variant="paragraph"
              element="span"
            >
              {children}
            </AnimatedTextElement>
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
