import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'perfumesCarousel',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'perfume',
              type: 'reference',
              to: [{type: 'perfume'}, {type: 'mainPerfume'}, {type: 'collections'}],
              title: 'Perfume',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
            },
          ],
        },
      ],
      title: 'Perfumes Carousel',
      description: 'References to both perfumes and main perfumes',
    }),
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
      of: [{type: 'reference', to: [{type: 'notes'}]}],
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
