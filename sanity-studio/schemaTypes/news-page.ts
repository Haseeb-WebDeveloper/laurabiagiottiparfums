import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsPage",
  title: "News Page",
  type: "document",
  fields: [
    defineField({
      name: "news",
      title: "News",
      type: "array",
      of: [{ type: "reference", to: { type: "news" } }],
    }),
  ],
  //   hard coded preview (News Page)
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "News Page",
      };
    },
  },
});
