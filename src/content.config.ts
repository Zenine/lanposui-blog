import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    layout: z.string().optional(),
    title: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    description: z.string(),
    issue: z.number(),
    category: z.string(),
    cover: z.string().optional(),
    source: z.string().optional(),
    wechat: z.string().url().optional(),
  }),
});

export const collections = { articles };
