import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'perfumes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'perfume'}, {type: 'mainPerfume'}],
        },
      ],
      title: 'Perfumes',
      description: 'References to both perfumes and main perfumes',
    }),
    defineField({
      name: 'circularIngridientsImages',
      title: 'Circular Ingridients Image',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'note',
          title: 'Note',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Note Image',
            },
            {
              name: 'title',
              title: 'Note Title',
              type: 'object',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'it', type: 'string', title: 'Italian'},
                {name: 'de', type: 'string', title: 'German'},
              ],
              description: 'e.g., Head Notes, Heart Notes, Base Notes',
            },
            {
              name: 'perfumeNotes',
              title: 'Perfume Notes',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  name: 'perfume',
                  title: 'Perfume',
                  to: [{type: 'perfume'}, {type: 'mainPerfume'}, {type: 'collections'}],
                },
              ],
              description: 'Perfumes that have this note',
            },
          ],
          preview: {
            select: {
              title: 'title.en',
              media: 'image',
            },
            prepare(selection) {
              const {title, media} = selection
              return {
                title: title || 'Note Category',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'textImageSection',
      title: 'Text Image Section',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'English',
              type: 'string',
            }),
            defineField({
              name: 'it',
              title: 'Italian',
              type: 'string',
            }),
            defineField({
              name: 'de',
              title: 'German',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'object',
          fields: [
            defineField({
              name: 'en',
              title: 'English',
              type: 'string',
            }),
            defineField({
              name: 'it',
              title: 'Italian',
              type: 'string',
            }),
            defineField({
              name: 'de',
              title: 'German',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'news',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'news'}]}],
    }),
    defineField({
      name: 'socialMediaImages',
      title: 'Social Media Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'url',
              media: 'image',
            },
            prepare(selection) {
              return {
                title: selection.title,
                media: selection.media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
