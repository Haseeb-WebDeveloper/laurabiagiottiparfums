import { defineField, defineType } from "sanity";

export const brand = defineType({
    name: "brand",
    title: "Brand",
    type: "document",
    fields: [
        defineField({
            name: "firstSection",
            title: "First Section",
            description: "This is the first section of the brand page",
            type: "object",
            fields: [
                {
                    name: "title",
                    type: "object",
                    title: "Title",
                    fields: [
                        { name: "en", type: "string", title: "English" },
                        { name: "it", type: "string", title: "Italian" },
                        { name: "de", type: "string", title: "German" }
                    ]
                },
                {
                    name: "description",
                    type: "object",
                    title: "Description",
                    fields: [
                        { name: "en", type: "text", title: "English" },
                        { name: "it", type: "text", title: "Italian" },
                        { name: "de", type: "text", title: "German" }
                    ]
                },
                {
                    name: "images",
                    type: "array",
                    title: "Images",
                    of: [{
                        type: "object",
                        fields: [
                            { name: "image", type: "image", title: "Image", options: { hotspot: true } },
                            { name: "alt", type: "string", title: "Alt" }
                        ]
                    }],
                    validation: Rule => Rule.max(2)
                },
                {
                    name: "bottomText",
                    type: "object",
                    title: "Bottom Text",
                    fields: [
                        { name: "en", type: "text", title: "English" },
                        { name: "it", type: "text", title: "Italian" },
                        { name: "de", type: "text", title: "German" }
                    ]
                },
            ]
        }),
        defineField({
            name: "secondSection",
            title: "Second Section",
            description: "This is the second section of the brand page",
            type: "object",
            fields: [
                {
                    name: "title",
                    type: "object",
                    title: "Title",
                    fields: [
                        { name: "en", type: "string", title: "English" },
                        { name: "it", type: "string", title: "Italian" },
                        { name: "de", type: "string", title: "German" }
                    ]
                },
                {
                    name: "image",
                    type: "object",
                    title: "Image",
                    fields: [
                        { name: "image", type: "image", title: "Image", options: { hotspot: true } },
                        { name: "alt", type: "string", title: "Alt" }
                    ]
                },
            ]
        }),
        defineField({
            name: "thirdSection",
            title: "Third Section",
            description: "This is the third section of the brand page",
            type: "object",
            fields: [
                {
                    name: "text",
                    type: "object",
                    title: "Text",
                    fields: [
                        { name: "en", type: "text", title: "English" },
                        { name: "it", type: "text", title: "Italian" },
                        { name: "de", type: "text", title: "German" }
                    ]
                },
                {
                    name: "image",
                    type: "object",
                    title: "Image",
                    fields: [
                        { name: "image", type: "image", title: "Image", options: { hotspot: true } },
                        { name: "alt", type: "string", title: "Alt", description: "If you want you can leave it blank" }
                    ]
                },
            ]
        }),
        defineField({
            name: "fourthSection",
            title: "Fourth Section",
            description: "This is the fourth section of the brand page",
            type: "object",
            fields: [
                {
                    name: "title",
                    type: "object",
                    title: "Title",
                    fields: [
                        { name: "en", type: "string", title: "English" },
                        { name: "it", type: "string", title: "Italian" },
                        { name: "de", type: "string", title: "German" }
                    ]
                },
                {
                    name: "text",
                    type: "object",
                    title: "Text",
                    fields: [
                        { name: "en", type: "text", title: "English" },
                        { name: "it", type: "text", title: "Italian" },
                        { name: "de", type: "text", title: "German" }
                    ]
                },
                {
                    name: "image",
                    type: "object",
                    title: "Image",
                    fields: [
                        { name: "image", type: "image", title: "Image", options: { hotspot: true } },
                        { name: "alt", type: "string", title: "Alt", description: "If you want you can leave it blank" }
                    ]
                },
            ]
        }),
        defineField({
            name: "lastSection",
            title: "Last Section",
            description: "This is the last section of the brand page",
            type: "object",
            fields: [
                {
                    name: "text",
                    type: "object",
                    title: "Text",
                    fields: [
                        { name: "en", type: "text", title: "English" },
                        { name: "it", type: "text", title: "Italian" },
                        { name: "de", type: "text", title: "German" }
                    ]
                },
                {
                    name: "url",
                    type: "url",
                    title: "URL",
                    
                },
            ]
        }),
    ],
    preview: {
        prepare() {
            return {
                title: "Brand Page"
            };
        }
    }
});