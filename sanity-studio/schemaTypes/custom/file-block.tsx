import { defineType } from "sanity";

export const fileBlock = defineType({
    name: 'fileBlock',
    title: 'File Block',
    type: 'object',
    fields: [
        {
            name: 'file',
            type: 'file',
            title: 'File',
            options: {
                accept: 'image/*,video/*,.gif,application/pdf'
            },
            description: 'Upload an image, GIF, or video file'
        },
        {
            name: 'height',
            title: 'Video Height',
            type: 'string',
            description: 'If you want to set a specific height for the video here. Example: 5vw, 10vw, 15vw, etc.'
        },
        {
            name: 'autoplay',
            title: 'Autoplay',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'loop',
            title: 'Loop',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'muted',
            title: 'Muted',
            type: 'boolean',
            initialValue: false
        }
    ],
}
)