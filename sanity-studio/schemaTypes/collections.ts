import {defineField, defineType} from 'sanity'

export const collections = defineType({
  name: 'collections',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'firstSection',
      title: 'First Section',
      type: 'object',
      fields: [
        {
          name: 'tagLine',
          type: 'object',
          title: 'Tag Line',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
        },
        {
          name: 'image',
          type: 'image',
          title: 'First Section Main Image',
        },
        {
          name: 'description',
          type: 'object',
          title: 'Description',
          fields: [
            {name: 'en', type: 'text', title: 'English'},
            {name: 'it', type: 'text', title: 'Italian'},
            {name: 'de', type: 'text', title: 'German'},
          ],
        },
        {
          name: 'bgMedia',
          type: 'file',
          title: 'Background Media Video or Image',
          options: {
            accept: 'video/*, image/*',
          },
        },
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier for the news',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: "Men's", value: 'mens'},
          {title: "Women's", value: 'womens'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'productsCollection',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'perfume'}],
        },
      ],
      title: 'Products Collection',
      description: 'References to products in the collection',
    }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'perfume'}],
        },
      ],
      title: 'Related Products',
      description: 'References to related perfumes',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title: title || 'Untitled Collection',
        media,
        subtitle: category || 'Untitled Collection',
      }
    },
  },
})
