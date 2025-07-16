import {defineField, defineType} from 'sanity'

export const termsOfUse = defineType({
  name: 'termsOfUse',
  title: 'Terms of Use',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'English',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'it',
          type: 'string',
          title: 'Italian',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'de',
          type: 'string',
          title: 'German',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'en',
          title: 'English',
          description: 'English content',
          type: 'array',
          of: [
            {type: 'block'},
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {type: 'tableBlock'},
          ],
        },
        {
          name: 'it',
          title: 'Italian',
          description: 'Italian content',
          type: 'array',
          of: [
            {type: 'block'},
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {type: 'tableBlock'},
          ],
        },
        {
          name: 'de',
          title: 'German',
          description: 'German content',
          type: 'array',
          of: [
            {type: 'block'},
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {type: 'tableBlock'},
          ],
        },
      ],
    }),
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
        },
        {
          type: 'string',
          name: 'it',
          title: 'Italian',
          description: 'Italian meta title',
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
      title: 'name.en',
      media: 'featuredImage',
    },
    prepare: ({title, media}) => ({
      title: title || 'Untitled Terms of Use',
      media,
    }),
  },
})
