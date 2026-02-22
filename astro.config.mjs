import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://vitologic.vercel.app',
  output: 'hybrid',
  adapter: vercel({
    nodeVersion: '20.x',
  }),
  integrations: [
    mdx(),
    react(),
    tailwind(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
