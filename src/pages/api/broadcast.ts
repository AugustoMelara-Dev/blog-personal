import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { newPostEmailHtml } from '../../utils/emails/newPost';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { secret, postSlug, postTitle, postDescription, postQuote, postTags, postUrl } = body;

    if (secret !== import.meta.env.BROADCAST_SECRET) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!postSlug || !postTitle || !postUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Get all subscribers
    const contacts = await resend.contacts.list({
      audienceId: import.meta.env.RESEND_AUDIENCE_ID,
    });

    const subscribers = contacts.data?.data || [];
    if (subscribers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailHtml = newPostEmailHtml({
      title: postTitle,
      description: postDescription || '',
      url: postUrl,
      quote: postQuote,
      tags: postTags || [],
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });

    // Batch send (max 50 per batch for Resend)
    const batches: { from: string; to: string[]; subject: string; html: string }[][] = [];
    for (let i = 0; i < subscribers.length; i += 50) {
      const batch = subscribers.slice(i, i + 50).map((contact: any) => ({
        from: 'VitoLogic <onboarding@resend.dev>',
        to: [contact.email] as string[],
        subject: `Nueva en VitoLogic: ${postTitle}`,
        html: emailHtml,
      }));
      batches.push(batch);
    }

    let totalSent = 0;
    for (const batch of batches) {
      await resend.batch.send(batch as any);
      totalSent += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, sent: totalSent }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error al enviar broadcast' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
