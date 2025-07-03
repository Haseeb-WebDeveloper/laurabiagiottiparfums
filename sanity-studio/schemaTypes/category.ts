import { defineField, defineType } from "sanity";

export const category = defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "object",
            fields: [
                defineField({
                    name: "en",
                    title: "English",
                    type: "string",
                }),
                defineField({
                    name: "it",
                    title: "Italian",
                    type: "string",
                }),
                defineField({
                    name: "de",
                    title: "German",
                    type: "string",
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: "name.en",
        },
        prepare(selection) {
            return { title: selection.title };
        },
    },
});