import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_DdhMy7B5.mjs';
import { manifest } from './manifest_RlWOFQW2.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/subscribe.astro.mjs');
const _page3 = () => import('./pages/archivo.astro.mjs');
const _page4 = () => import('./pages/biblia.astro.mjs');
const _page5 = () => import('./pages/blog/_slug_.astro.mjs');
const _page6 = () => import('./pages/blog.astro.mjs');
const _page7 = () => import('./pages/frases.astro.mjs');
const _page8 = () => import('./pages/rss.xml.astro.mjs');
const _page9 = () => import('./pages/series/_serie_.astro.mjs');
const _page10 = () => import('./pages/series.astro.mjs');
const _page11 = () => import('./pages/tags/_tag_.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/subscribe.ts", _page2],
    ["src/pages/archivo.astro", _page3],
    ["src/pages/biblia/index.astro", _page4],
    ["src/pages/blog/[slug].astro", _page5],
    ["src/pages/blog/index.astro", _page6],
    ["src/pages/frases.astro", _page7],
    ["src/pages/rss.xml.ts", _page8],
    ["src/pages/series/[serie].astro", _page9],
    ["src/pages/series/index.astro", _page10],
    ["src/pages/tags/[tag].astro", _page11],
    ["src/pages/index.astro", _page12]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "214c10a3-93a6-4e44-9bc4-4092852631b0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
