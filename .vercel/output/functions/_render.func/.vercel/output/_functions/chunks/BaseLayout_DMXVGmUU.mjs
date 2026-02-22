import { c as createAstro, d as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, f as renderComponent, h as renderHead, i as renderSlot } from './astro/server_CDhZ2Goq.mjs';
import 'kleur/colors';
import { g as getCollection, S as SITE } from './_astro_content_Cw8LyiNS.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Fuse from 'fuse.js';
import 'clsx';
/* empty css                          */

function Search({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const fuseRef = useRef(null);
  useEffect(() => {
    fuseRef.current = new Fuse(items, {
      keys: ["title", "description", "tags"],
      threshold: 0.3,
      includeScore: true
    });
  }, [items]);
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    if (fuseRef.current) {
      const searchResults = fuseRef.current.search(query).map((r) => r.item);
      setResults(searchResults);
    }
  }, [query]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setIsOpen(true),
        className: "text-[#737373] hover:text-[#f5f5f5] transition-colors p-2 md:mr-0 mr-1",
        "aria-label": "Buscar",
        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
          /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex flex-col items-center pt-[10vh] px-4 md:px-0", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setIsOpen(false),
          className: "absolute inset-0 bg-black/80 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: -20 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: -20 },
          className: "relative w-full max-w-2xl bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center px-4 md:px-6 border-b border-[#1f1f1f]", children: [
              /* @__PURE__ */ jsxs("svg", { className: "text-[#a3a3a3] flex-shrink-0", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  autoFocus: true,
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: "Buscar posts y frases...",
                  className: "flex-1 bg-transparent border-none text-[#f5f5f5] text-lg px-4 py-5 focus:outline-none placeholder:text-[#525252]"
                }
              ),
              /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(false), className: "text-[#525252] hover:text-[#f5f5f5] text-xs uppercase tracking-widest font-semibold px-2 hidden sm:block", children: "ESC" })
            ] }),
            results.length > 0 && /* @__PURE__ */ jsx("div", { className: "overflow-y-auto p-2", children: results.map((item) => /* @__PURE__ */ jsxs(
              "a",
              {
                href: item.url,
                className: "block p-4 rounded-lg hover:bg-[#111111] transition-colors group",
                onClick: () => setIsOpen(false),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[#f5f5f5] font-medium group-hover:text-lime-400 transition-colors line-clamp-1", children: item.title }),
                    /* @__PURE__ */ jsx("span", { className: "text-[#525252] text-xs uppercase tracking-widest bg-[#111111] px-2 py-0.5 rounded border border-[#1f1f1f] flex-shrink-0 ml-3", children: item.type })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[#737373] text-sm line-clamp-1 mb-2", children: item.description }),
                  item.tags && item.tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: item.tags.map((tag) => /* @__PURE__ */ jsxs("span", { className: "text-[#525252] text-xs", children: [
                    "#",
                    tag
                  ] }, tag)) })
                ]
              },
              item.id
            )) }),
            query.trim() !== "" && results.length === 0 && /* @__PURE__ */ jsxs("div", { className: "p-8 text-center text-[#737373]", children: [
              'No se encontraron resultados para "',
              query,
              '"'
            ] })
          ]
        }
      )
    ] }) })
  ] });
}

const $$Astro$1 = createAstro("https://tu-blog.vercel.app");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const navLinksFull = [
    { href: "/blog", label: "Blog" },
    { href: "/frases", label: "Frases" },
    { href: "/biblia", label: "Biblia" },
    { href: "/series", label: "Series" },
    { href: "/tags/reflexiones", label: "Tags" },
    { href: "/about", label: "Sobre m\xED" },
    { href: "/archivo", label: "Archivo" }
  ];
  const mobileNavLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/frases", label: "Frases" },
    { href: "/about", label: "Sobre m\xED" }
  ];
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const frases = await getCollection("frases");
  const searchData = [
    ...posts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.data.title,
      description: post.data.description,
      tags: post.data.tags || [],
      date: post.data.pubDate.toISOString(),
      type: "post",
      url: `/blog/${post.slug}`
    })),
    ...frases.map((frase) => ({
      id: `frase-${frase.id}`,
      title: `Frase sobre ${frase.data.categoria}`,
      description: frase.data.texto,
      tags: [frase.data.categoria],
      date: frase.data.fecha.toISOString(),
      type: "frase",
      url: `/frases?cat=${frase.data.categoria}`
    }))
  ];
  return renderTemplate`${maybeRenderHead()}<header class="border-b border-bg-border bg-bg-surface/80 backdrop-blur-md sticky top-0 z-40"> <div class="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between"> <!-- Logo --> <a href="/" class="font-bold text-lg tracking-tight text-text-primary hover:text-accent transition-colors duration-200">
TuNombre
</a> <div class="flex items-center gap-6"> <!-- Desktop Nav --> <nav class="hidden lg:flex items-center gap-6"> ${navLinksFull.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
    "text-sm transition-colors duration-200",
    currentPath === href || currentPath.startsWith(`${href}/`) && href !== "/" ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
  ], "class:list")}> ${label} </a>`)} </nav> <!-- Mobile Nav & Actions --> <div class="flex items-center gap-3 md:gap-4"> <!-- Mobile Nav subset --> <nav class="flex lg:hidden items-center gap-4 mr-2"> ${mobileNavLinks.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
    "text-sm transition-colors duration-200",
    currentPath === href || currentPath.startsWith(`${href}/`) && href !== "/" ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
  ], "class:list")}> ${label} </a>`)} </nav> <div class="flex items-center border-l lg:border-l-0 border-bg-border pl-4 lg:pl-0 border-opacity-50"> ${renderComponent($$result, "Search", Search, { "client:load": true, "items": searchData, "client:component-hydration": "load", "client:component-path": "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/Search.tsx", "client:component-export": "default" })} <!-- Hamburger Menu Button --> <button id="mobile-menu-btn" class="lg:hidden text-text-secondary p-2 -mr-2" aria-label="Menu"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg> </button> </div> </div> </div> </div> <!-- Mobile Extra Nav Dropdown --> <div id="mobile-menu" class="hidden lg:hidden border-t border-bg-border bg-bg-surface px-6 py-4 absolute w-full shadow-xl z-30"> <nav class="flex flex-col gap-4"> ${navLinksFull.map(({ href, label }) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
    "text-base transition-colors duration-200",
    currentPath === href || currentPath.startsWith(`${href}/`) && href !== "/" ? "text-text-primary font-medium" : "text-text-secondary"
  ], "class:list")}> ${label} </a>`)} </nav> </div> </header> `;
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
