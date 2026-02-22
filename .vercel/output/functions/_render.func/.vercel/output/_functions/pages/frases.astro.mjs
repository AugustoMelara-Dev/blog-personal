/* empty css                                 */
import { c as createAstro, d as createComponent, g as renderComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CTCqgbJU.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_KbaT-Q7y.mjs';
import { g as getCollection } from '../chunks/_astro_content_B8Z3BNwa.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { S as StoryGenerator } from '../chunks/StoryGenerator_CiIRWp9l.mjs';
export { renderers } from '../renderers.mjs';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleCopy,
      className: `flex items-center gap-2 text-sm transition-colors duration-200 ${copied ? "text-lime-400" : "text-[#525252] hover:text-lime-400"}`,
      "aria-label": "Copiar frase",
      children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
        /* @__PURE__ */ jsx("span", { children: "¡Copiado!" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
          /* @__PURE__ */ jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
        ] }),
        /* @__PURE__ */ jsx("span", { children: "Copiar" })
      ] })
    }
  );
}

const $$Astro = createAstro("https://tu-blog.vercel.app");
const prerender = false;
const $$Frases = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Frases;
  const cat = Astro2.url.searchParams.get("cat");
  const todasFrases = await getCollection("frases");
  todasFrases.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
  const frases = cat ? todasFrases.filter((f) => f.data.categoria === cat) : todasFrases;
  const categorias = ["reflexiones", "poder", "biblia", "personas"];
  const getFilterClass = (isActive) => isActive ? "bg-lime-400/10 text-lime-400 border-lime-400/30" : "bg-[#111111] text-[#737373] border-transparent hover:border-[#1f1f1f] hover:text-[#a3a3a3]";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Frases", "description": "Pensamientos cortos. Sin filtro." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-6 py-16 md:py-24 max-w-7xl mx-auto"> <header class="mb-16 text-center max-w-2xl mx-auto"> <h1 class="text-4xl md:text-5xl font-bold text-[#f5f5f5] mb-4">Frases</h1> <p class="text-xl text-[#a3a3a3]">Pensamientos cortos. Sin filtro.</p> </header> <!-- Filtros --> <div class="flex flex-wrap justify-center gap-3 mb-16"> <a href="/frases"${addAttribute(`px-4 py-2 rounded-full border text-sm transition-colors duration-200 ${getFilterClass(!cat)}`, "class")}>
Todas
</a> ${categorias.map((c) => renderTemplate`<a${addAttribute(`/frases?cat=${c}`, "href")}${addAttribute(`px-4 py-2 rounded-full border text-sm capitalize transition-colors duration-200 ${getFilterClass(cat === c)}`, "class")}> ${c} </a>`)} </div> <!-- Grid Masonry --> <div class="columns-1 md:columns-2 lg:columns-3 gap-6"> ${frases.map((frase) => renderTemplate`<div class="break-inside-avoid mb-6 bg-[#111111] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between hover:border-[#333] transition-colors duration-300"> <p class="text-lg text-[#f5f5f5] font-medium leading-relaxed mb-8">
"${frase.data.texto}"
</p> <div class="flex items-center justify-between mt-auto"> <a${addAttribute(`/frases?cat=${frase.data.categoria}`, "href")} class="inline-block text-xs px-2.5 py-1 rounded-md bg-bg-subtle text-text-subtle hover:bg-accent/10 hover:text-accent transition-colors duration-200">
#${frase.data.categoria} </a> <div class="flex items-center gap-4"> ${renderComponent($$result2, "StoryGenerator", StoryGenerator, { "client:load": true, "texto": frase.data.texto, "client:component-hydration": "load", "client:component-path": "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/StoryGenerator.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "CopyButton", CopyButton, { "client:load": true, "text": frase.data.texto, "client:component-hydration": "load", "client:component-path": "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/CopyButton.tsx", "client:component-export": "default" })} </div> </div> </div>`)} </div> ${frases.length === 0 && renderTemplate`<div class="text-center text-[#737373] mt-12"> <p>No se encontraron frases en esta categoría.</p> </div>`} </div> ` })}`;
}, "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/frases.astro", void 0);

const $$file = "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/frases.astro";
const $$url = "/frases";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Frases,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
