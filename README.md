# IASD Local Site

Base institucional v1.0 para una iglesia adventista local construida con Astro, Tailwind, MDX, React islands y despliegue en Vercel.

## Stack

- Astro con `output: "hybrid"`
- TypeScript
- Tailwind CSS
- MDX + Astro Content Collections
- React solo para islas puntuales
- Resend para formularios
- Fuse.js para busqueda editorial
- Sitemap, RSS y PWA discreta

## Desarrollo

```bash
nvm use 20
npm install
npm run dev
```

`.nvmrc` ya fija `20`. En el entorno actual el proyecto tambien compilo con Node 22, pero Astro/Vercel advirtio que las funciones serverless estan orientadas a Node 20.x; para evitar diferencias locales conviene trabajar y desplegar con Node 20.

## Variables de entorno

Usa `.env.example` como base:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

Sin estas variables, los formularios validan y redirigen, pero no enviaran correo.

## Publicar contenido

Agrega archivos MDX en estas carpetas:

- `src/content/sermons/`
- `src/content/studies/`
- `src/content/articles/`
- `src/content/beliefs/`
- `src/content/ministries/`
- `src/content/events/`
- `src/content/pages/`

## Ajustes iniciales recomendados

1. Reemplazar datos de ejemplo en `src/data/site.ts` y `src/content/settings/site.json`.
2. Exportar y agregar el logotipo adventista oficial autorizado en `public/images/branding/`.
3. Configurar correos reales de Resend.
4. Actualizar la URL final del sitio en `src/config.ts` y `astro.config.mjs`.

## Deploy

El proyecto esta preparado para Vercel con rutas estaticas para contenido y endpoints serverless para formularios.
