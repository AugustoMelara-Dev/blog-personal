# Blog Personal

Blog personal construido con **Astro 4**, **TailwindCSS v3**, y **React islands** con framer-motion.

## Stack

- Astro 4 (static output)
- TailwindCSS v3 + @tailwindcss/typography
- MDX para posts
- React + framer-motion para animaciones
- Tipografía Geist (sans + mono)
- date-fns para fechas en español
- reading-time para tiempo de lectura

## Desarrollo

```bash
npm install
npm run dev
```

El servidor abre en `http://localhost:4321`.

## Publicar un post nuevo

1. Crea un archivo `.mdx` en `src/content/posts/`:

```mdx
---
title: "Tu título"
description: "Descripción corta del post"
pubDate: 2026-03-01
tags: ["ejemplo", "tutorial"]
draft: false
featured: false
quote: "Frase destacada opcional"
---

## Tu contenido aquí

Escribe en Markdown/MDX como siempre.
```

2. Haz `git push` — Vercel lo despliega automáticamente.

## Frontmatter

| Campo         | Tipo     | Requerido | Default |
| ------------- | -------- | --------- | ------- |
| `title`       | string   | ✅        | —       |
| `description` | string   | ✅        | —       |
| `pubDate`     | Date     | ✅        | —       |
| `tags`        | string[] | ❌        | `[]`    |
| `draft`       | boolean  | ❌        | `false` |
| `featured`    | boolean  | ❌        | `false` |
| `quote`       | string   | ❌        | —       |

## Build

```bash
npm run build
npm run preview
```

## Deploy

El proyecto es estático. Funciona directo en Vercel, Netlify, o cualquier hosting estático.
