import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Equipo Yamassi'),
    authorRole: z.string().default('Especialistas en Facturación y Tecnología Comercial'),
    category: z.string(),
    tags: z.array(z.string()),
    readingTime: z.string().default('6 min de lectura'),
    featured: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    rubro: z.enum(['pos', 'restobar', 'reservas', 'odontologia']),
    section: z.string().default('General'),
    order: z.number().default(1),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, docs };
