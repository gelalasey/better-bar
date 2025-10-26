import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        pubDate: z.date(), 
        updatedDate: z.date().optional(),
        image: z.union([
            z.string(),
            z.object({
                src: z.string(),
                alt: z.string().optional(),
            }),
        ]),
        intro: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog };