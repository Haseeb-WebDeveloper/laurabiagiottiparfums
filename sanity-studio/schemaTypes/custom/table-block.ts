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
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'content',
      title: 'Content',
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
      title: 'tableTitle',
    },
    prepare({title}) {
      return {
        title: 'Table Block',
      }
    },
  },
})
