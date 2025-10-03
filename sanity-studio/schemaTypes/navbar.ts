import {defineField, defineType} from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      initialValue: 'Navbar Configuration',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mensPerfumes',
      title: "Men's Perfumes for Navbar",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'perfume'},
            {type: 'mainPerfume'},
            {type: 'collections'},
          ],
        },
      ],
      description: 'Select perfumes, main perfumes, and collections to display in the men\'s navbar dropdown',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'womensPerfumes',
      title: "Women's Perfumes for Navbar",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'perfume'},
            {type: 'mainPerfume'},
            {type: 'collections'},
          ],
        },
      ],
      description: 'Select perfumes, main perfumes, and collections to display in the women\'s navbar dropdown',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      mensPerfumes: 'mensPerfumes',
      womensPerfumes: 'womensPerfumes',
    },
    prepare(selection) {
      const {title, mensPerfumes, womensPerfumes} = selection
      const mensCount = mensPerfumes ? mensPerfumes.length : 0
      const womensCount = womensPerfumes ? womensPerfumes.length : 0
      return {
        title: title || 'Navbar Configuration',
        subtitle: `Men's: ${mensCount} | Women's: ${womensCount} perfumes`,
      }
    },
  },
})
