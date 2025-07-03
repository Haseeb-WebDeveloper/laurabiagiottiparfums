import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "This will not show on the website. Just for reference.",
    }),
    defineField({
      name: "heading",
      type: "object",
      title: "Heading",
      fields: [
        {
          name: "en",
          type: "string",
          title: "English"
        },
        {
          name: "it",
          type: "string",
          title: "Italian"
        },
        {
          name: "es",
          type: "string",
          title: "Spanish"
        }
      ]
    }),
    defineField({
      name: "website",
      type: "string",
      title: "Website",
      options: {
        list: ["Figmenta", "Studio", "Live", "Productions"],
      },
    }),
    defineField({
      name: "locations",
      type: "array",
      title: "Locations",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "locationName",
              type: "string",
              title: "Location Name",
            },
            {
              name: "email",
              type: "string",
              title: "Email",
            },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "faq",
      type: "reference",
      to: [{ type: "faq" }],
      title: "FAQ Reference",
    }),
    defineField({
      name: "logos",
      type: "array",
      title: "Logos",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Logo Image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
    }),
  ],
});
