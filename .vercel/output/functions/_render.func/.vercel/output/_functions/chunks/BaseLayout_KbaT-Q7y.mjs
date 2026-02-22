import { c as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, h as renderHead, g as renderComponent, i as renderSlot } from './astro/server_CTCqgbJU.mjs';
import 'kleur/colors';
import { S as SITE } from './config_B_J4s_Lx.mjs';
import 'clsx';
/* empty css                          */

const $$Astro$1 = createAstro("https://tu-blog.vercel.app");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const navLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/frases", label: "Frases" },
    { href: "/tags/reflexiones", label: "Tags" },
    { href: "/about", label: "Sobre m\xED" }
  ];
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50 bg-bg/80 backdrop-blur-lg border-b border-bg-border"> <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"> <a href="/" class="text-text-primary font-semibold text-lg hover:text-accent transition-colors duration-200"> ${SITE.title} </a> <nav class="flex items-center gap-8"> ${navLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
    "text-sm transition-colors duration-200",
    currentPath.startsWith(href) ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
  ], "class:list")}> ${label} </a>`)} <a href="/archivo"${addAttribute([
    "text-sm transition-colors duration-200 hidden md:block",
    currentPath.startsWith("/archivo") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
  ], "class:list")}>
Archivo
</a> </nav> </div> </header>`;
}, "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="border-t border-bg-border"> <div class="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between"> <p class="text-sm text-text-muted">
© ${year} ${SITE.author}. Todos los derechos reservados.
</p> <a href="/rss.xml" class="text-sm text-text-secondary hover:text-accent transition-colors duration-200" target="_blank" rel="noopener">
RSS
</a> </div> </footer>`;
}, "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/Footer.astro", void 0);

const $$Astro = createAstro("https://tu-blog.vercel.app");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title,
    description,
    ogImage = "/og-default.png",
    type = "website"
  } = Astro2.props;
  const pageTitle = title ? `${title} \u2014 ${SITE.title}` : SITE.title;
  const pageDescription = description || SITE.description;
  return renderTemplate`<html lang="es" class="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(pageDescription, "content")}><meta name="author"${addAttribute(SITE.author, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Open Graph --><meta property="og:title"${addAttribute(pageTitle, "content")}><meta property="og:description"${addAttribute(pageDescription, "content")}><meta property="og:type"${addAttribute(type, "content")}><meta property="og:url"${addAttribute(Astro2.url.href, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:site_name"${addAttribute(SITE.title, "content")}><meta property="og:locale" content="es_ES"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(pageTitle, "content")}><meta name="twitter:description"${addAttribute(pageDescription, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml"${addAttribute(SITE.title, "title")}${addAttribute(new URL("rss.xml", Astro2.site), "href")}><title>${pageTitle}</title>${renderHead()}</head> <body class="min-h-screen flex flex-col bg-bg"> ${renderComponent($$result, "Header", $$Header, {})} <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
