import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { Resend } from 'resend';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const posts = (await getCollection('posts')).filter((p) => !p.data.draft);
    const frases = await getCollection('frases');

    let subscribers = 0;
    try {
      const resend = new Resend(import.meta.env.RESEND_API_KEY);
      const contacts = await resend.contacts.list({
        audienceId: import.meta.env.RESEND_AUDIENCE_ID,
      });
      subscribers = contacts.data?.data?.length ?? 0;
    } catch {
      // If Resend fails, subscribers stays 0
    }

    const sortedPosts = posts.sort(
      (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
    );
    const lastPublished = sortedPosts[0]?.data.pubDate.toISOString() || '';

    return new Response(
      JSON.stringify({
        posts: posts.length,
        frases: frases.length,
        subscribers,
        lastPublished,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ posts: 0, frases: 0, subscribers: 0, lastPublished: '' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
