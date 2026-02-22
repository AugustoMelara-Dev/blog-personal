import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import AstroPWA from '@vite-pwa/astro';

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
    sitemap({
      filter: (page) => !page.includes('/api/'),
      customPages: [
        'https://vitologic.vercel.app/empieza',
      ],
      serialize(item) {
        if (item.url === 'https://vitologic.vercel.app/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (
          ['/blog', '/frases', '/biblia', '/series', '/empieza'].some((p) =>
            item.url.endsWith(p)
          )
        ) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.svg', 'og-default.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'VitoLogic',
        short_name: 'VitoLogic',
        description: 'Ideas que no se callan.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/vitologic\.vercel\.app\/blog\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'posts-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
