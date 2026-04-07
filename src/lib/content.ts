import { getCollection, type CollectionEntry } from "astro:content";

type CollectionName =
  | "sermons"
  | "studies"
  | "articles"
  | "beliefs"
  | "ministries"
  | "events"
  | "pages";

export async function getPublishedCollection<T extends CollectionName>(name: T) {
  const items = await getCollection(name, ({ data }) => !("draft" in data) || !data.draft);
  return items;
}

export async function getOrderedContent() {
  const [sermons, studies, articles, beliefs, ministries, events] = await Promise.all([
    getPublishedCollection("sermons"),
    getPublishedCollection("studies"),
    getPublishedCollection("articles"),
    getPublishedCollection("beliefs"),
    getPublishedCollection("ministries"),
    getPublishedCollection("events"),
  ]);

  return {
    sermons: sermons.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
    studies: studies.sort((a, b) => {
      if (a.data.order && b.data.order) return a.data.order - b.data.order;
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }),
    articles: articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()),
    beliefs: beliefs.sort((a, b) => a.data.order - b.data.order),
    ministries: ministries.sort((a, b) => a.data.name.localeCompare(b.data.name)),
    events: events.sort((a, b) => a.data.startDate.valueOf() - b.data.startDate.valueOf()),
  };
}

export type SearchItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  type: "Sermon" | "Estudio" | "Articulo" | "Evento";
  tags: string[];
  extra?: string;
};

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const { sermons, studies, articles, events } = await getOrderedContent();

  return [
    ...sermons.map((item) => ({
      id: item.id,
      href: `/sermones/${item.slug}/`,
      title: item.data.title,
      description: item.data.description,
      type: "Sermon" as const,
      tags: item.data.tags,
      extra: item.data.serie ?? item.data.passage,
    })),
    ...studies.map((item) => ({
      id: item.id,
      href: `/estudios-biblicos/${item.slug}/`,
      title: item.data.title,
      description: item.data.description,
      type: "Estudio" as const,
      tags: item.data.tags,
      extra: item.data.topic,
    })),
    ...articles.map((item) => ({
      id: item.id,
      href: `/articulos/${item.slug}/`,
      title: item.data.title,
      description: item.data.description,
      type: "Articulo" as const,
      tags: item.data.tags,
      extra: item.data.category,
    })),
    ...events.map((item) => ({
      id: item.id,
      href: `/eventos/${item.slug}/`,
      title: item.data.title,
      description: item.data.description,
      type: "Evento" as const,
      tags: [],
      extra: item.data.location,
    })),
  ];
}

export async function getFeatured<T extends CollectionName>(
  name: T,
): Promise<CollectionEntry<T>[]> {
  const items = await getPublishedCollection(name);
  return items.filter((item) => "featured" in item.data && item.data.featured);
}
