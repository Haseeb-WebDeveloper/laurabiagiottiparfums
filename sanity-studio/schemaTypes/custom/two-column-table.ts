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
              title: 'First Column Content',
              type: 'object',
              fields: [
                {
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [{type: 'block'}],
                },
                {
                  name: 'it',
                  title: 'Italian',
                  type: 'array',
                  of: [{type: 'block'}],
                },
                {
                  name: 'de',
                  title: 'German',
                  type: 'array',
                  of: [{type: 'block'}],
                },
              ],
            },
            {
              name: 'secondColumnContent',
              title: 'Second Column Content',
              type: 'object',
              fields: [
                {
                  name: 'en',
                  title: 'English',
                  type: 'array',
                  of: [{type: 'block'}],
                },
                {
                  name: 'it',
                  title: 'Italian',
                  type: 'array',
                  of: [{type: 'block'}],
                },
                {
                  name: 'de',
                  title: 'German',
                  type: 'array',
                  of: [{type: 'block'}],
                },
              ],
            },
          ],
          preview: {
            select: {
              icon: 'icon',
            },
            prepare({icon}) {
              return {
                title: 'Table Row',
                media: icon,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Two Column Table',
      }
    },
  },
})
