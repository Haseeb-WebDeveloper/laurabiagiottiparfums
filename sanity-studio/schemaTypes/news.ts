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
                {
                    name: "en",
                    title: "English",
                    description: "English content",
                    type: "array",
                    of: [
                        { type: "block" },
                        {
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
                {
                    name: "it",
                    title: "Italian",
                    description: "Italian content",
                    type: "array",
                    of: [
                        { type: "block" },
                        {
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
                {
                    name: "de",
                    title: "German",
                    description: "German content",
                    type: "array",
                    of: [
                        { type: "block" },
                        {
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        },
                    ],
                },
            ],
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