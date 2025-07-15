import {defineField, defineType} from 'sanity'

export const perfume = defineType({
  name: 'perfume',
  title: 'Perfume',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      title: 'Featured Image',
      description: 'This will be featured image',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier for the product',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      type: 'object',
      title: 'Description',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'it', type: 'text', title: 'Italian'},
        {name: 'de', type: 'text', title: 'German'},
      ],
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
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference',
      to: [{type: 'sub-category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSectionImages',
      type: 'array',
      title: 'Hero Section Images',
      description: 'This will be used the the 1st section of this perfume slug page.',
      of: [{type: 'image', title: 'Image'}],
    }),
    defineField({
      name: 'olfactoryNotes',
      title: 'Olfactory Notes',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'noteCategory',
          title: 'Note Category',
          fields: [
            {
              name: 'image',
              type: 'image',
              title: 'Category Image',
            },
            {
              name: 'title',
              title: 'Category Title',
              type: 'object',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'it', type: 'string', title: 'Italian'},
                {name: 'de', type: 'string', title: 'German'},
              ],
              description: 'e.g., Head Notes, Heart Notes, Base Notes',
            },
            {
              name: 'notes',
              title: 'Notes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'note',
                  title: 'Note',
                  fields: [
                    {name: 'en', type: 'string', title: 'English'},
                    {name: 'it', type: 'string', title: 'Italian'},
                    {name: 'de', type: 'string', title: 'German'},
                  ],
                },
              ],
              description: 'Individual fragrance notes in this category',
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
      name: 'isPartOfCollection',
      title: 'Is Part Of Collection',
      type: 'boolean',
      description: 'If this perfume is part of a collection, then check this box.',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      description:
        'Add these ingredients if this perfume is a part of any collection. If not then you can leave it.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'ingredient',
          title: 'Ingredient',
          fields: [
            {
              name: 'ingredientName',
              title: 'Ingredient Name',
              type: 'object',
              fields: [
                {name: 'en', type: 'string', title: 'English'},
                {name: 'it', type: 'string', title: 'Italian'},
                {name: 'de', type: 'string', title: 'German'},
              ],
            },
            {
              name: 'image',
              type: 'image',
              title: 'Ingredient Image',
            },
            {
              name: 'description',
              title: 'Ingredient Description',
              type: 'object',
              fields: [
                {name: 'en', type: 'text', title: 'English'},
                {name: 'it', type: 'text', title: 'Italian'},
                {name: 'de', type: 'text', title: 'German'},
              ],
              description: 'Description of the ingredient',
            },
          ],
          preview: {
            select: {
              title: 'ingredientName.en',
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
      hidden: ({parent}) => !parent?.isPartOfCollection,
    }),
    defineField({
      name: 'olfactoryFamily',
      title: 'Olfactory Family',
      type: 'object',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'it', type: 'string', title: 'Italian'},
        {name: 'de', type: 'string', title: 'German'},
      ],
      description: 'e.g., Floral – Chypre – Gourmand',
    }),
    defineField({
      name: 'nose',
      type: 'string',
      title: 'Nose',
      description: 'Creator of the fragrance',
    }),
    defineField({
      name: 'scentDescription',
      type: 'object',
      title: 'Detailed Scent Description',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'it', type: 'text', title: 'Italian'},
        {name: 'de', type: 'text', title: 'German'},
      ],
    }),
    defineField({
      name: 'bgFile',
      type: 'file',
      title: 'Background Asset (Video or Image)',
      description: 'This will be used as the background asset for the perfume slug page.',
      options: {
        accept: 'video/*, image/*',
      },
    }),
    defineField({
      name: 'productImagesSection',
      type: 'object',
      title: 'Product Images Section',
      fields: [
        {
          name: 'title',
          type: 'object',
          title: 'Section Title',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
        },
        {
          name: 'description',
          type: 'object',
          title: 'Section Description',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
        },
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [{type: 'image', title: 'Image'}],
        },
      ],
    }),
    defineField({
      name: 'heroProductImage',
      type: 'image',
      title: 'Hero Product Image',
    }),
    defineField({
      name: 'momentOfDay',
      type: 'string',
      title: 'Moment Of Day',
      description: 'e.g., Morning, Afternoon, Evening, Night',
      options: {
        list: [
          {title: 'Sunrise', value: 'sunrise'},
          {title: 'Daytime', value: 'daytime'},
          {title: 'Afternoon', value: 'afternoon'},
          {title: 'Sunset', value: 'sunset'},
          {title: 'Night', value: 'night'},
        ],
      },
    }),
    defineField({
      name: 'sharpness',
      type: 'number',
      title: 'Sharpness',
      description:
        'How Light/Discrete or Intense/Persistent the perfume is 0 means very light and 100 means very intense',
    }),
    // --- Buy field starts here ---
    defineField({
      name: 'buy',
      type: 'object',
      title: 'Buy Options',
      fields: [
        defineField({
          name: 'countries',
          type: 'array',
          title: 'Countries',
          of: [
            {
              type: 'object',
              name: 'countryBuy',
              title: 'Country',
              fields: [
                {
                  name: 'countryName',
                  type: 'string',
                  title: 'Country Name',
                },
                {
                  name: 'websites',
                  type: 'array',
                  title: 'Websites',
                  of: [
                    {
                      type: 'object',
                      name: 'website',
                      title: 'Website',
                      fields: [
                        {
                          name: 'logo',
                          type: 'image',
                          title: 'Website Logo',
                        },
                        {
                          name: 'url',
                          type: 'url',
                          title: 'Website URL',
                        },
                      ],
                      preview: {
                        select: {
                          title: 'url',
                          media: 'logo',
                        },
                        prepare(selection) {
                          return {
                            title: selection.title || 'Website',
                            media: selection.media,
                          }
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'countryName',
                  websites: 'websites',
                },
                prepare(selection) {
                  const {title, websites} = selection
                  let subtitle = ''
                  if (websites && Array.isArray(websites)) {
                    subtitle = `${websites.length} website${websites.length === 1 ? '' : 's'}`
                  }
                  return {
                    title: title || 'Country',
                    subtitle,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    // --- Buy field ends here ---
    defineField({
      name: 'previousProduct',
      type: 'reference',
      to: [{type: 'perfume'}],
      title: 'Previous Product',
      description: 'Reference to the previous perfume in the sequence',
    }),
    defineField({
      name: 'nextProduct',
      type: 'reference',
      to: [{type: 'perfume'}],
      title: 'Next Product',
      description: 'Reference to the next perfume in the sequence',
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
      media: 'featuredImage',
      category: 'category',
    },
    prepare(selection) {
      const {title, media, category} = selection
      return {
        title: title || 'Untitled Perfume',
        media,
        subtitle: category || 'Untitled Category',
      }
    },
  },
})
