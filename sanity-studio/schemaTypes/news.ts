import { defineField, defineType } from "sanity";

export const news = defineType({
    name: "news",
    title: "News",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "it", type: "string", title: "Italian" },
                { name: "de", type: "string", title: "German" }
            ]
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            description: "URL-friendly identifier for the news",
            options: {
                source: "title.en",
                maxLength: 96
            }
        }),
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "object",
            fields: [
                { name: "en", type: "text", title: "English" },
                { name: "it", type: "text", title: "Italian" },
                { name: "de", type: "text", title: "German" }
            ]
        }),
    ],
    preview: {
        select: {
            title: "title.en",
            media: "featuredImage"
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title || "Untitled News",
                media
            };
        }
    }
});