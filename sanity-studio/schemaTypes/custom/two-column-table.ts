import {defineType} from 'sanity'

export const twoColumnTable = defineType({
  name: 'twoColumnTable',
  title: 'Two Column Table',
  type: 'object',
  fields: [
    {
      name: 'tableTitle',
      title: 'Table Title (English, Spanish, Portuguese)',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
        },
        {
          name: 'it',
          type: 'string',
          title: 'Italian',
        },
        {
          name: 'de',
          type: 'string',
          title: 'German',
        },
      ],
    },
    {
      name: 'firstColumnTitle',
      title: 'First Column Title (English, Spanish, Portuguese)',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
        },
        {
          name: 'it',
          type: 'string',
          title: 'Italian',
        },
        {
          name: 'de',
          type: 'string',
          title: 'German',
        },
      ],
    },
    {
      name: 'secondColumnTitle',
      title: 'Second Column Title (English, Spanish, Portuguese)',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
        },
        {
          name: 'it',
          type: 'string',
          title: 'Italian',
        },
        {
          name: 'de',
          type: 'string',
          title: 'German',
        },
      ],
    },
    {
      name: 'tableRows',
      title: 'Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'image',
            },
            {
              name: 'firstColumnContent',
              title: 'Content (Left Column)',
              type: 'object',
              fields: [
                {
                  name: 'en',
                  title: 'English',
                  type: 'text',
                  description: 'For new line add <br>',
                },
                {
                  name: 'it',
                  title: 'Italian',
                  type: 'text',
                  description: 'For new line add <br>',
                },
                {
                  name: 'de',
                  title: 'German',
                  type: 'text',
                  description: 'For new line add <br>',
                },
              ],
            },
            {
              name: 'secondColumnContent',
              title: 'Content (Right Column)',
              type: 'object',
              fields: [
                {
                  name: 'en',
                  title: 'English',
                  type: 'text',
                  description: 'For new line add <br>',
                },
                {
                  name: 'it',
                  title: 'Italian',
                  type: 'text',
                  description: 'For new line add <br>',
                },
                {
                  name: 'de',
                  title: 'German',
                  type: 'text',
                  description: 'For new line add <br>',
                },
              ],
            },
          ],
          preview: {
            select: {
              icon: 'icon',
              firstColumnContent: 'firstColumnContent',
              secondColumnContent: 'secondColumnContent',
            },
            prepare({icon, firstColumnContent, secondColumnContent}) {
              const firstColumnText = firstColumnContent?.en || ''
              const secondColumnText = secondColumnContent?.en || ''
              return {
                title: 'Row',
                subtitle:
                  firstColumnText.substring(0, 60) +
                  (firstColumnText.length > 60 ? '...' : '') +
                  ' ' +
                  secondColumnText.substring(0, 60) +
                  (secondColumnText.length > 60 ? '...' : ''),
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
      rows: 'tableRows',
    },
    prepare({title, rows}) {
      const rowCount = Array.isArray(rows) ? rows.length : 0
      return {
        title: title || 'Flexible Table',
        subtitle: `${rowCount} row${rowCount === 1 ? '' : 's'}`,
      }
    },
  },
})
