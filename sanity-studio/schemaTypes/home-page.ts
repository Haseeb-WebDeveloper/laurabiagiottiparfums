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
    // SEO
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English meta title',
          validation: (Rule) => Rule.required(),
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian meta title',
          validation: (Rule) => Rule.required(),
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German meta title',
        },
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English meta description',
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian meta description',
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German meta description',
        },
      ],
    }),
    defineField({
      name: 'ogTitle',
      title: 'OG Title',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English OG title',
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian OG title',
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German OG title',
        },
      ],
    }),
    defineField({
      name: 'ogDescription',
      title: 'OG Description',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English OG description',
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian OG description',
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German OG description',
        },
      ],
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English Twitter title',
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian Twitter title',
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German Twitter title',
        },
      ],
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'object',
      fields: [
        {
          type: 'string',
          name: 'en',
          title: 'English',
          description: 'English Twitter description',
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian Twitter description',
        },
        {
          type: 'string',
          name: 'de',
          title: 'German',
          description: 'German Twitter description',
        },
      ],
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
