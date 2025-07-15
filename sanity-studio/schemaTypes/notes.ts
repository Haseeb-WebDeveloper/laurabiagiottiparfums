import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'notes',
  title: 'Notes',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'perfumeNotes',
      title: 'Perfume Notes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'perfume'}, {type: 'mainPerfume'}, {type: 'collections'}],
        },
      ],
    }),
  ],
  //   hard coded preview (News Page)
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Untitled Note',
        media: media || 'image',
      }
    },
  },
})
