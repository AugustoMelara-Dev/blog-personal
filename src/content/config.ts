import { z, defineCollection } from "astro:content";

const imageField = z.string().optional();

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    heroKicker: z.string().optional(),
    heroImage: imageField,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const sermons = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    serie: z.string().optional(),
    serieOrden: z.number().optional(),
    cover: imageField,
    audioUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    passage: z.string().optional(),
  }),
});

const studies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    topic: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().optional(),
    cover: imageField,
  }),
});

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: imageField,
    category: z.string().optional(),
  }),
});

const beliefs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const ministries = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    leader: z.string().optional(),
    meetingTime: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    icon: z.string().optional(),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    location: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    registrationUrl: z.string().url().optional(),
    cover: imageField,
  }),
});

const settings = defineCollection({
  type: "data",
  schema: z.object({
    churchName: z.string(),
    localIdentifier: z.string(),
    tagline: z.string(),
    legalName: z.string(),
    description: z.string(),
    mission: z.string(),
    vision: z.string(),
    heroTitle: z.string(),
    heroScripture: z.string(),
    establishedNote: z.string().optional(),
    email: z.string(),
    phone: z.string(),
    whatsapp: z.string().optional(),
    address: z.string(),
    addressLine2: z.string().optional(),
    reference: z.string().optional(),
    mapQuery: z.string(),
    mapUrl: z.string().optional(),
    city: z.string(),
    region: z.string(),
    countryCode: z.string(),
    canonicalUrl: z.string().url(),
    contactPerson: z.string().optional(),
    logo: z.object({
      primaryPath: z.string(),
      markPath: z.string().optional(),
      alt: z.string(),
      width: z.number().default(240),
      height: z.number().default(72),
      safeBackground: z.enum(["light", "dark"]).default("light"),
    }),
    social: z.object({
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    serviceTimes: z.array(
      z.object({
        name: z.string(),
        schedule: z.string(),
        notes: z.string().optional(),
      }),
    ),
  }),
});

export const collections = {
  pages,
  sermons,
  studies,
  articles,
  beliefs,
  ministries,
  events,
  settings,
};
