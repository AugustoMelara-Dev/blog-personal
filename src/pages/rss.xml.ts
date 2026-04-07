import rss from "@astrojs/rss";
import { SITE } from "../config";
import { getOrderedContent } from "../lib/content";

export async function GET(context) {
  const { sermons, articles } = await getOrderedContent();
  const items = [...sermons, ...articles]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((item) => {
      const basePath = item.collection === "sermons" ? "sermones" : "articulos";
      return {
        title: item.data.title,
        description: item.data.description,
        pubDate: item.data.pubDate,
        link: `/${basePath}/${item.slug}/`,
      };
    });

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items,
    customData: `<language>es-hn</language>`,
  });
}
