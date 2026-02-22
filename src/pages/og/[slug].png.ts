import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sharp from 'sharp';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { title: post.data.title },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title } = props;

  // Simple text wrapping (approximate, up to 2 lines)
  const words = title.split(' ');
  let line1 = '';
  let line2 = '';
  for (const word of words) {
    if ((line1 + word).length < 35) {
      line1 += word + ' ';
    } else {
      line2 += word + ' ';
    }
  }

  // Adjust Y positions depending on 1 or 2 lines
  const text1Y = line2 ? 290 : 315;
  const text2Y = line2 ? 360 : 315;

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .title { font-family: system-ui, -apple-system, sans-serif; font-weight: 700; font-size: 52px; fill: #ffffff; }
          .brand { font-family: system-ui, -apple-system, sans-serif; font-weight: 500; font-size: 24px; fill: #525252; }
        </style>
      </defs>
      <rect width="1200" height="630" fill="#0a0a0a" />
      <rect x="60" y="275" width="4" height="80" fill="#a3e635" />
      <text x="90" y="${text1Y}" class="title">${line1.trim()}</text>
      ${line2 ? `<text x="90" y="${text2Y}" class="title">${line2.trim()}</text>` : ''}
      <line x1="0" y1="520" x2="1200" y2="520" stroke="#1f1f1f" stroke-width="2" />
      <text x="1030" y="580" class="brand">VitoCipher</text>
    </svg>
  `;

  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  return new Response(pngBuffer as any, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
