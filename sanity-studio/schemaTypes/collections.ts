import {defineField, defineType} from 'sanity'

export const collections = defineType({
  name: 'collections',
  title: 'Collections',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This will show at different places like collection page, search result, etc.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
    {
      name: 'description',
      type: 'object',
      description: 'This will show in search result.',
      title: 'Description',
      fields: [
        {name: 'en', type: 'text', title: 'English', rows: 3},
        {name: 'it', type: 'text', title: 'Italian', rows: 3},
        {name: 'de', type: 'text', title: 'German', rows: 3},
      ],
    },
    defineField({
      name: 'firstSection',
      title: 'First Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'object',
          title: 'Title',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
        },
        defineField({
          name: 'description',
          type: 'object',
          title: 'Description',
          fields: [
            {name: 'en', type: 'text', title: 'English', rows: 2},
            {name: 'it', type: 'text', title: 'Italian', rows: 2},
            {name: 'de', type: 'text', title: 'German', rows: 2},
          ],
        }),
        {
          name: 'video',
          type: 'file',
          description:
            'Main video file for this collection. This will show in background of the first section.',
          title: 'Video',
          options: {
            accept: 'video/*',
          },
        },
      ],
    }),
    defineField({
      name: 'secondSection',
      title: 'Second Section (Video + Text)',
      type: 'object',
      fields: [
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          description: 'Main video file for this section.',
          validation: (Rule) => Rule.required(),
          options: {
            accept: 'video/*',
          },
        }),
        defineField({
          name: 'titleOnVideo',
          title: 'Title on Video',
          type: 'object',
          description: 'Title text overlayed on the video.',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'descriptionOnVideo',
          title: 'Description on Video',
          type: 'object',
          description: 'Description text overlayed on the video.',
          fields: [
            {name: 'en', type: 'text', title: 'English', rows: 3},
            {name: 'it', type: 'text', title: 'Italian', rows: 3},
            {name: 'de', type: 'text', title: 'German', rows: 3},
          ],
        }),
        defineField({
          name: 'rightTitle',
          title: 'Right Side Title',
          type: 'object',
          description: 'Title text shown to the right of the video.',
          fields: [
            {name: 'en', type: 'string', title: 'English'},
            {name: 'it', type: 'string', title: 'Italian'},
            {name: 'de', type: 'string', title: 'German'},
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'rightDescription',
          title: 'Right Side Description',
          type: 'object',
          description: 'Description text shown to the right of the video.',
          fields: [
            {name: 'en', type: 'text', title: 'English', rows: 3},
            {name: 'it', type: 'text', title: 'Italian', rows: 3},
            {name: 'de', type: 'text', title: 'German', rows: 3},
          ],
        }),
      ],
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'bottlesSection',
      title: 'Bottles Section',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'bottleImage',
              title: 'Bottle Image',
              type: 'image',
              description: 'This is the main bottle image.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{type: 'image'}],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'product',
              title: 'Product',
              type: 'reference',
              to: [{type: 'perfume'}, {type: 'collections'}, {type: 'mainPerfume'}],
              description: 'Reference to the product featured in this section',
              validation: (Rule) => Rule.required(),
            }),
            // description for the product
            defineField({
              name: 'productDescription',
              title: 'Product Description',
              type: 'object',
              description: 'Description text shown for the product.',
              fields: [
                {name: 'en', type: 'text', title: 'English', rows: 3},
                {name: 'it', type: 'text', title: 'Italian', rows: 3},
                {name: 'de', type: 'text', title: 'German', rows: 3},
              ],
            }),
          ],
          preview: {
            select: {
              bottleImage: 'bottleImage',
              product: 'product',
              productDescription: 'productDescription.en',
            },
            prepare(selection) {
              let subtitle = ''
              if (selection.product) {
                subtitle = '1 product'
              }
              return {
                title: 'Bottle Section',
                media: selection.bottleImage,
                subtitle: selection.productDescription || subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
      description:
        'Section displaying bottles with images, a background, and a single related product (Max 4).',
    }),
    // defineField({
    //   name: 'momentOfDay',
    //   type: 'string',
    //   title: 'Moment Of Day',
    //   description: 'e.g., Sunrise, Daytime, Sunset, Afternoon, Night',
    //   options: {
    //     list: [
    //       {title: 'Sunrise', value: 'sunrise'},
    //       {title: 'Daytime', value: 'daytime'},
    //       {title: 'Afternoon', value: 'afternoon'},
    //       {title: 'Sunset', value: 'sunset'},
    //       {title: 'Night', value: 'night'},
    //     ],
    //   },
    // }),
    defineField({
      name: 'sharpness',
      type: 'number',
      title: 'Sharpness',
      description:
        'How Light/Discrete or Intense/Persistent the perfume is 0 means very light and 100 means very intense',
    }),
    defineField({
      name: 'relatedProducts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'perfume'}, {type: 'collections'}, {type: 'mainPerfume'}],
        },
      ],
      title: 'Related Products',
      description: 'References to related perfumes',
    }),
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
      validation: (Rule) => Rule.required(),
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
      media: 'ogImage',
      category: 'category',
    },
    prepare(selection) {
      const {media, category} = selection
      return {
        title: 'Collection',
        media,
        subtitle: category || 'Untitled Collection',
      }
    },
  },
})
