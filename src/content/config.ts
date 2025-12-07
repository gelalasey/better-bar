import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

// Homepage collection schema
const umpd = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/umpd" }),
    schema: z.object({
        leftbox: z.object({
            title: z.string(),
            content: z.string().optional(),
            image: z.string(),
            button: z.object({
                enable: z.boolean(),
                label: z.string(),
                link: z.string(),
            })
        }),
        rightbox: z.object({
            title: z.string(),
            content: z.string().optional(),
            image: z.string().optional(),
        bulletpoints: z.array(z.string()).optional(),
    }),
}),
});

// Trainee Section collection schema
const traineeCollection = defineCollection({
    loader: glob({
        pattern: "trainee.md",
        base: "src/content/partials",
    }),
    schema: z.object({
        enable: z.boolean(),
        trainees: z.array(
            z.object({
                name: z.string(),
                star: z.string(),
                link: z.string(),
                image: z.string(),
            })
        )
    }),
});
export const collections = { 
    blog,
    umpd, 
    traineeSection: traineeCollection,
};