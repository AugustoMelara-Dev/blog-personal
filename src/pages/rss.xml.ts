import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import type { APIContext } from 'astro';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'VitoCipher — Ideas que no se callan',
    description: SITE.description,
    site: context.site!,
    customData: `
      <language>es-ES</language>
      <?xml-stylesheet href="/rss-styles.xsl" type="text/xsl"?>
      <copyright>© 2026 VitoCipher. Todos los derechos reservados.</copyright>
      <managingEditor>augusto@VitoCipher.vercel.app (Augusto Melara)</managingEditor>
      <webMaster>augusto@VitoCipher.vercel.app (Augusto Melara)</webMaster>
      <ttl>60</ttl>
    `,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: post.data.tags || [],
      author: 'Augusto Melara',
      content: sanitizeHtml(parser.render(post.body || ''), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
  });
}
