import {defineType} from 'sanity'

export const tableBlock = defineType({
  title: 'Table Block',
  name: 'tableBlock',
  type: 'object',
  fields: [
    {
      name: 'tableTitle',
      title: 'Table Title (English, Italian, German)', 
      type: 'object',
      fields: [
        {name: 'en', title: 'English', type: 'string'},
        {name: 'it', title: 'Italian', type: 'string'},
        {name: 'de', title: 'German', type: 'string'},
      ],
    },
    {
      name: 'tableRows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'contentType',
                      title: 'Content Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Bullet Points', value: 'bullets'},
                          {title: 'Paragraph', value: 'paragraph'},
                        ],
                      },
                    },
                    {
                      name: 'paragraphContent',
                      title: 'Paragraph Content',
                      type: 'object',
                      fields: [
                        {name: 'en', title: 'English', type: 'string'},
                        {name: 'it', title: 'Italian', type: 'string'},
                        {name: 'de', title: 'German', type: 'string'},
                      ],
                      hidden: ({parent}) => parent?.contentType !== 'paragraph',
                    },
                    {
                      name: 'bulletPoints',
                      title: 'Bullet Points',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {name: 'en', title: 'English', type: 'string'},
                            {name: 'it', title: 'Italian', type: 'string'},
                            {name: 'de', title: 'German', type: 'string'},
                          ],
                        },
                      ],
                      hidden: ({parent}) => parent?.contentType !== 'bullets',
                    },
                  ],
                  preview: {
                    select: {
                      contentType: 'contentType',
                      paragraphContent: 'paragraphContent.en',
                      bulletPoints: 'bulletPoints',
                    },
                    prepare({contentType, paragraphContent, bulletPoints}) {
                      const title = contentType === 'paragraph' 
                        ? paragraphContent 
                        : bulletPoints?.[0]?.en || 'No bullet points'
                      return {
                        title: title || 'No content',
                        subtitle: contentType,
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              icon: 'icon',
              content: 'content.0',
            },
            prepare({icon, content}) {
              return {
                title: 'Table Row',
                subtitle: content?.contentType || 'No content',
                media: icon,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'tableTitle',
    },
    prepare({title}) {
      return {
        title:'Table Block',
      }
    },
  },
})
