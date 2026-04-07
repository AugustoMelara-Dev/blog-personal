import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';
import AstroPWA from '@vite-pwa/astro';
import siteSettings from './src/content/settings/site.json' with { type: 'json' };

export default defineConfig({
  site: siteSettings.canonicalUrl,
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
      serialize(item) {
        if (item.url === `${siteSettings.canonicalUrl}/`) {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (
          ['/sermones/', '/estudios-biblicos/', '/articulos/', '/eventos/'].some((path) =>
            item.url.includes(path),
          )
        ) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (['/creemos', '/ministerios', '/horarios', '/ubicacion'].some((p) => item.url.endsWith(p))) {
          return { ...item, priority: 0.8, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' };
      },
    }),
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.png', 'og-default.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Iglesia Adventista del Septimo Dia',
        short_name: siteSettings.localIdentifier,
        description: 'Sitio oficial de iglesia con contenido institucional, doctrinal y editorial.',
        theme_color: '#f6f1e7',
        background_color: '#f6f1e7',
        display: 'minimal-ui',
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
