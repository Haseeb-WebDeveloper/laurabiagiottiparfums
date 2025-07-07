import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { TypedObject } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/client'


interface RichEditorProps {
  content: TypedObject | TypedObject[] | any
  lineClamp?: number
}

export default function RichEditor({ content, lineClamp }: RichEditorProps) {
  const components: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={value.asset.url}
          alt={value.alt || ''}
          width={800}
          height={500}
          className="my-[0.5vw] rounded-lg shadow-md object-cover w-full h-auto aspect-video object-center"
        />
      ),
      
    },
    block: {
      h1: ({ children }) => <h1 className="text-[8vw] md:text-[4vw] font-bold mb-[8vw] md:pb-[1vw] leading-[130%]">{children}</h1>,
      h2: ({ children }) => <h2 className="text-[7vw] md:text-[3.5vw] font-semibold mb-[3vw] md:mb-[0.8vw] leading-[130%]">{children}</h2>,
      h3: ({ children }) => <h3 className="text-[6vw] md:text-[2.3vw] font-medium mb-[3vw] md:mb-[0.8vw] leading-[130%]">{children}</h3>,
      h4: ({ children }) => <h4 className="text-[6vw] md:text-[1.7vw] font-medium mb-[3vw] md:mb-[0.8vw]">{children}</h4>,
      h5: ({ children }) => <h5 className="text-[5.5vw] md:text-[1.6vw] font-medium mb-[3vw] md:mb-[0.8vw]">{children}</h5>,
      h6: ({ children }) => <h6 className="text-[5vw] md:text-[1.6vw] font-medium mb-[3vw] md:mb-[0.8vw]">{children}</h6>,
      normal: ({ children }) => {
        const isEmpty = !children || (Array.isArray(children) && children.length === 1 && typeof children[0] === 'string' && children[0].trim() === '')

        if (isEmpty) {
          return <div className="h-[4vw] md:h-[0.8vw]" />
        }

        return (
          <p  gsap-target="paragraph-1" className={`${lineClamp ? `line-clamp-${lineClamp}` : ''}`}>
            {children}
          </p>
        )
      }
      ,

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
        <li className="flex items-start justify-start gap-[4vw] md:gap-[1vw] ml-0">
          <Image
            src="/icons/tick.svg"
            alt="Bullet point"
            width={20}
            height={20}
            className=" md:mr-[1vw] mt-[1vw] md:mt-[0.5vw] w-[5vw] h-[5vw] md:w-[1.5vw] md:h-[1.5vw]"
          />
          <span className='text-[5vw] md:text-[1.6vw] leading-[170%]'>{children}</span>
        </li>
      ),
      number: ({ children }) => <li className="mb-[0.063vw] text-[5vw] md:text-[2vw]">{children}</li>,
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
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="bg-gray-100 px-[0.063vw] rounded text-[0.875vw] font-mono">{children}</code>
      ),
    },
    hardBreak: () => <br className="h-[4vw] md:h-[0.8vw]" />,
  }

  return (
    <div className="prose prose-sm md:prose-lg lg:prose-xl max-w-none font-newsreader">
      <PortableText value={content} components={components} />
    </div>
  )
}
