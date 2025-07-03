import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'


export const caseStudy = defineType({
    name: "caseStudy",
    title: "Case Study",
    type: "document",
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ type: 'caseStudy' }), // hidden by default
        defineField({
            name: "name",
            title: "Name",
            type: "object",
            fields: [
                {
                    name: "en",
                    type: "string",
                    title: "English",
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: "it",
                    type: "string",
                    title: "Italian",
                    validation: (Rule) => Rule.required(),
                },
                {
                    name: "es",
                    type: "string",
                    title: "Spanish"
                }
            ],
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "object",
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
            ],
            description: "Only need to add a title if this case study is featured on the Figmenta homepage.",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "object",
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
            ],
            description: "Only need to add a description if this case study is featured on the Figmenta homepage.",
        }),
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "featuredVideo",
            title: "Featured Video",
            type: "file",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name.en",
                maxLength: 96,
            },
            description: "Slug is the URL path for the Case Study. It should be unique and descriptive.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "clientName",
            title: "Client Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            description: "This is the location of the client like 'France, Italy'",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{ type: "categories" }]
                }
            ]
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
                        { type: "titleBlock" },
                        { type: "centerTextBlock" },
                        { type: "textImageBlock" },
                        { type: "twoImagesBlock" },
                        { type: "imageCarouselBlock" },
                        { type: "logosBlock" },
                        { type: "fileBlock" },
                        { type: "mediaBlock" },
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
                        { type: "titleBlock" },
                        { type: "centerTextBlock" },
                        { type: "textImageBlock" },
                        { type: "twoImagesBlock" },
                        { type: "imageCarouselBlock" },
                        { type: "logosBlock" },
                        { type: "fileBlock" },
                        { type: "mediaBlock" },
                    ],
                },
                {
                    name: "es",
                    title: "Spanish",
                    description: "Spanish content",
                    type: "array",
                    of: [
                        { type: "block" },
                        {
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        },
                        { type: "titleBlock" },
                        { type: "centerTextBlock" },
                        { type: "textImageBlock" },
                        { type: "twoImagesBlock" },
                        { type: "imageCarouselBlock" },
                        { type: "logosBlock" },
                        { type: "fileBlock" },
                        { type: "mediaBlock" },
                    ],
                },
            ],
        }),
        defineField({
            name: "metaTitle",
            title: "Meta Title",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English meta title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian meta title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish meta title",
            }],
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English meta description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian meta description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish meta description",
            }],
        }),
        defineField({
            name: "ogTitle",
            title: "OG Title",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English OG title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian OG title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish OG title",
            }],
        }),
        defineField({
            name: "ogDescription",
            title: "OG Description",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English OG description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian OG description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish OG description",
            }],
        }),
        defineField({
            name: "twitterTitle",
            title: "Twitter Title",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English Twitter title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian Twitter title",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish Twitter title",
            }],
        }),
        defineField({
            name: "twitterDescription",
            title: "Twitter Description",
            type: "object",
            fields: [{
                type: "string",
                name: "en",
                title: "English",
                description: "English Twitter description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "it",
                title: "Italian",
                description: "Italian Twitter description",
                validation: (Rule) => Rule.required(),
            },
            {
                type: "string",
                name: "es",
                title: "Spanish",
                description: "Spanish Twitter description",
            }],
        }),
        defineField({
            name: "ogImage",
            title: "OG Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        })
    ],
    preview: {
        select: {
            title: 'name.en',
            media: 'featuredImage'
        },
        prepare: ({ title, media }) => ({
            title: title || 'Untitled Case Study',
            media
        })
    }
});
