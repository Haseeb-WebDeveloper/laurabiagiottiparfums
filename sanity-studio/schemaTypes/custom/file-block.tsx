import { defineType, defineField } from "sanity";

export const fileBlock = defineType({
  name: "fileBlock",
  title: "Image/YouTube Block",
  type: "object",
  fields: [
    defineField({
      name: "isYoutubeVideo",
      title: "Is YouTube Video?",
      type: "boolean",
      initialValue: false,
      description: "Enable to embed a YouTube video instead of an image.",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "Paste the YouTube video URL here.",
      hidden: ({ parent }: { parent: { isYoutubeVideo?: boolean } }) =>
        !(parent && parent.isYoutubeVideo),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent && (context.parent as { isYoutubeVideo?: boolean }).isYoutubeVideo && !value) {
            return "You must provide a YouTube video URL.";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        accept: "image/*",
        hotspot: true,
      },
      description: "Upload an image file",
      hidden: ({ parent }: { parent: { isYoutubeVideo?: boolean } }) =>
        !!(parent && parent.isYoutubeVideo),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.parent && !(context.parent as { isYoutubeVideo?: boolean }).isYoutubeVideo && !value) {
            return "You must provide an image.";
          }
          return true;
        }),
    }),
    defineField({
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "string",
      description: "Choose the aspect ratio for the image or video",
      options: {
        list: [
          { title: "1:1 (Square)", value: "1/1" },
          { title: "16:9 (Widescreen)", value: "16/9" },
          { title: "9:16 (Vertical)", value: "9/16" },
          { title: "4:3 (width > height)", value: "4/3" },
          { title: "3:4 (width < height)", value: "3/4" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});