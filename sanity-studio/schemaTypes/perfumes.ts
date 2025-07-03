import { defineField, defineType } from "sanity";

export const perfume = defineType({
    name: "perfume",
    title: "Perfume",
    type: "document",
    fields: [
        defineField({
            name: "featuredImage",
            type: "image",
            title: "Featured Image",
            description: "This will be featured image",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            description: "URL-friendly identifier for the product",
            options: {
                source: "title",
                maxLength: 96
            }
        }),
        defineField({
            name: "description",
            type: "object",
            title: "Description",
            fields: [
                { name: "en", type: "text", title: "English" },
                { name: "it", type: "text", title: "Italian" },
                { name: "de", type: "text", title: "German" }
            ]
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "reference",
            to: [{ type: "category" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "subCategory",
            title: "Sub Category",
            type: "reference",
            to: [{ type: "sub-category" }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "heroSectionImages",
            type: "array",
            title: "Hero Section Images",
            description: "This will be used the the 1st section of this perfume slug page.",
            of: [{ type: "image", title: "Image" }]
        }),
        defineField({
            name: "olfactoryNotes",
            title: "Olfactory Notes",
            type: "array",
            of: [{
                type: "object",
                name: "noteCategory",
                title: "Note Category",
                fields: [
                    {
                        name: "image",
                        type: "image",
                        title: "Category Image"
                    },
                    {
                        name: "title",
                        title: "Category Title",
                        type: "object",
                        fields: [
                            { name: "en", type: "string", title: "English" },
                            { name: "it", type: "string", title: "Italian" },
                            { name: "de", type: "string", title: "German" }
                        ],
                        description: "e.g., Head Notes, Heart Notes, Base Notes",
                    },
                    {
                        name: "notes",
                        title: "Notes",
                        type: "array",
                        of: [{
                            type: "object", name: "note", title: "Note", fields: [
                                { name: "en", type: "string", title: "English" },
                                { name: "it", type: "string", title: "Italian" },
                                { name: "de", type: "string", title: "German" }
                            ]
                        }],
                        description: "Individual fragrance notes in this category"
                    }
                ],
                preview: {
                    select: {
                        title: "title.en",
                        media: "image"
                    },
                    prepare(selection) {
                        const { title, media } = selection;
                        return {
                            title: title || "Note Category",
                            media
                        };
                    }
                }
            }],
            validation: Rule => Rule.max(3)
        }),
        defineField({
            name: "olfactoryFamily",
            title: "Olfactory Family",
            type: "object",
            fields: [
                { name: "en", type: "string", title: "English" },
                { name: "it", type: "string", title: "Italian" },
                { name: "de", type: "string", title: "German" }
            ],
            description: "e.g., Floral – Chypre – Gourmand"
        }),
        defineField({
            name: "nose",
            type: "string",
            title: "Nose",
            description: "Creator of the fragrance"
        }),

        defineField({
            name: "scentDescription",
            type: "object",
            title: "Detailed Scent Description",
            fields: [
                { name: "en", type: "text", title: "English" },
                { name: "it", type: "text", title: "Italian" },
                { name: "de", type: "text", title: "German" }
            ]
        }),
        defineField({
            name: "bgFile",
            type: "file",
            title: "Background Asset (Video or Image)",
            description: "This will be used as the background asset for the perfume slug page.",
            options: {
                accept: "video/*, image/*"
            }
        }),
        defineField({
            name: "productImagesSection",
            type: "object",
            title: "Product Images Section",
            fields: [
                {
                    name: "title",
                    type: "object",
                    title: "Section Title",
                    fields: [
                        { name: "en", type: "string", title: "English" },
                        { name: "it", type: "string", title: "Italian" },
                        { name: "de", type: "string", title: "German" }
                    ]
                },
                {
                    name: "description",
                    type: "object",
                    title: "Section Description",
                    fields: [
                        { name: "en", type: "string", title: "English" },
                        { name: "it", type: "string", title: "Italian" },
                        { name: "de", type: "string", title: "German" }
                    ]
                },
                {
                    name: "images",
                    type: "array",
                    title: "Images",
                    of: [{ type: "image", title: "Image" }]
                }
            ]
        }),
        defineField({
            name: "heroProductImage",
            type: "image",
            title: "Hero Product Image"
        }),
        // --- Buy field starts here ---
        defineField({
            name: "buy",
            type: "object",
            title: "Buy Options",
            fields: [
                defineField({
                    name: "countries",
                    type: "array",
                    title: "Countries",
                    of: [
                        {
                            type: "object",
                            name: "countryBuy",
                            title: "Country",
                            fields: [
                                {
                                    name: "countryName",
                                    type: "string",
                                    title: "Country Name"
                                },
                                {
                                    name: "websites",
                                    type: "array",
                                    title: "Websites",
                                    of: [
                                        {
                                            type: "object",
                                            name: "website",
                                            title: "Website",
                                            fields: [
                                                {
                                                    name: "logo",
                                                    type: "image",
                                                    title: "Website Logo"
                                                },
                                                {
                                                    name: "url",
                                                    type: "url",
                                                    title: "Website URL"
                                                }
                                            ],
                                            preview: {
                                                select: {
                                                    title: "url",
                                                    media: "logo"
                                                },
                                                prepare(selection) {
                                                    return {
                                                        title: selection.title || "Website",
                                                        media: selection.media
                                                    };
                                                }
                                            }
                                        }
                                    ]
                                }
                            ],
                            preview: {
                                select: {
                                    title: "countryName",
                                    websites: "websites"
                                },
                                prepare(selection) {
                                    const { title, websites } = selection;
                                    let subtitle = "";
                                    if (websites && Array.isArray(websites)) {
                                        subtitle = `${websites.length} website${websites.length === 1 ? "" : "s"}`;
                                    }
                                    return {
                                        title: title || "Country",
                                        subtitle
                                    };
                                }
                            }
                        }
                    ]
                })
            ]
        }),
        // --- Buy field ends here ---
        defineField({
            name: "previousProduct",
            type: "reference",
            to: [{ type: "perfume" }],
            title: "Previous Product",
            description: "Reference to the previous perfume in the sequence"
        }),
        defineField({
            name: "nextProduct",
            type: "reference",
            to: [{ type: "perfume" }],
            title: "Next Product",
            description: "Reference to the next perfume in the sequence"
        }),
        defineField({
            name: "relatedProducts",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "perfume" }]
                }
            ],
            title: "Related Products",
            description: "References to related perfumes"
        })
    ],
    preview: {
        select: {
            title: "title",
            media: "featuredImage"
        },
        prepare(selection) {
            const { title, media } = selection;
            return {
                title: title || "Untitled Perfume",
                media
            };
        }
    }
});