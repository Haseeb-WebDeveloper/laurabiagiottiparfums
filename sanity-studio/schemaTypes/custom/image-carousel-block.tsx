import { defineType } from "sanity";

export const imageCarouselBlock = defineType({
  title: 'Media Carousel Block',
  name: 'imageCarouselBlock',
  type: 'object',
  fields: [
    {
      name: 'media',
      type: 'array',
      title: 'Media Items',
      of: [
        {
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'file',
          title: 'Video or GIF',
          options: {
            accept: 'video/*,image/gif'
          }
        }
      ],
      validation: Rule => Rule.required().min(2).error('At least 2 media items are required for a carousel')
    }
  ],
  preview: {
    select: {
      media: 'media'
    },
    prepare({ media }) {
      return {
        title: `Media Carousel (${media?.length || 0} items)`,
        media: media?.[0]
      };
    }
  }
});
