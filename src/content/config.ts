import { z, defineCollection } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
    featured: z.boolean().optional().default(false),
    quote: z.string().optional(),
    versiculo: z.string().optional(),
    serie: z.string().optional(),
    serieOrden: z.number().optional(),
  }),
});

const frasesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    texto: z.string(),
    autor: z.string().default(""),
    categoria: z.enum(["reflexiones", "poder", "biblia", "personas"]),
    fecha: z.date(),
  }),
});

export const collections = {
  posts: postsCollection,
  frases: frasesCollection,
};
