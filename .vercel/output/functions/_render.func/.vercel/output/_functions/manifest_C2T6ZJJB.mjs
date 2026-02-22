import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D1Q-XhRv.mjs';
import 'es-module-lexer';
import { j as decodeKey } from './chunks/astro/server_CTCqgbJU.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/melar/OneDrive/Desktop/Proyectos%20Importantes/blog-personal/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"archivo/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/archivo","isIndex":false,"type":"page","pattern":"^\\/archivo\\/?$","segments":[[{"content":"archivo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archivo.astro","pathname":"/archivo","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/subscribe","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/subscribe\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"subscribe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/subscribe.ts","pathname":"/api/subscribe","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.aVmQp14z.css"},{"type":"external","src":"/_astro/_slug_.CeQ_4XJr.css"}],"routeData":{"route":"/frases","isIndex":false,"type":"page","pattern":"^\\/frases\\/?$","segments":[[{"content":"frases","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/frases.astro","pathname":"/frases","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://tu-blog.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/archivo.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/frases.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/tags/[tag].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/archivo@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/frases@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/subscribe@_@ts":"pages/api/subscribe.astro.mjs","\u0000@astro-page:src/pages/archivo@_@astro":"pages/archivo.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]@_@astro":"pages/tags/_tag_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/frases@_@astro":"pages/frases.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-1.md?astroContentCollectionEntry=true":"chunks/frase-1_Dj8Qjr0Z.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-2.md?astroContentCollectionEntry=true":"chunks/frase-2_CD0GtpvJ.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-3.md?astroContentCollectionEntry=true":"chunks/frase-3_DtmAjbRn.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-4.md?astroContentCollectionEntry=true":"chunks/frase-4_IKsPB475.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-5.md?astroContentCollectionEntry=true":"chunks/frase-5_B7jx7S6V.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/posts/la-envidia-no-avisa.mdx?astroContentCollectionEntry=true":"chunks/la-envidia-no-avisa_DfOWj4zS.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-1.md?astroPropagatedAssets":"chunks/frase-1_B2L_mjLb.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-2.md?astroPropagatedAssets":"chunks/frase-2_DuhRTYDm.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-3.md?astroPropagatedAssets":"chunks/frase-3_CH8xJ_-i.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-4.md?astroPropagatedAssets":"chunks/frase-4_CMAc9lEm.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-5.md?astroPropagatedAssets":"chunks/frase-5_DMY3ELmX.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/posts/la-envidia-no-avisa.mdx?astroPropagatedAssets":"chunks/la-envidia-no-avisa_8IS3-ghD.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-1.md":"chunks/frase-1_1iWtgOQS.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-2.md":"chunks/frase-2_DGAHwrIc.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-3.md":"chunks/frase-3_DGCmB26Q.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-4.md":"chunks/frase-4_DNhV448W.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-5.md":"chunks/frase-5_BPRfavqw.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/posts/la-envidia-no-avisa.mdx":"chunks/la-envidia-no-avisa_DaF44SKN.mjs","\u0000@astrojs-manifest":"manifest_C2T6ZJJB.mjs","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/AnimatedPost.tsx":"_astro/AnimatedPost.DG4U3cTq.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/StoryGenerator.tsx":"_astro/StoryGenerator.0DOGpKIg.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/CopyButton.tsx":"_astro/CopyButton.BCvx2oFY.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/Newsletter.tsx":"_astro/Newsletter.DT-uEcSN.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/ReadingProgress.tsx":"_astro/ReadingProgress.hoImbHqP.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/ReadingMode.tsx":"_astro/ReadingMode.Dca5t_Dc.js","C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/components/ShareButton.tsx":"_astro/ShareButton.vu5qqAgQ.js","@astrojs/react/client.js":"_astro/client.BuOr9PT5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/geist-cyrillic-wght-normal.CHSlOQsW.woff2","/_astro/geist-mono-latin-wght-normal.Cjtb1TV-.woff2","/_astro/geist-latin-ext-wght-normal.DMtmJ5ZE.woff2","/_astro/geist-latin-wght-normal.Dm3htQBi.woff2","/_astro/geist-mono-latin-ext-wght-normal.b6lpi8_2.woff2","/_astro/geist-mono-cyrillic-wght-normal.BZdD_g9V.woff2","/_astro/about.aVmQp14z.css","/_astro/_slug_.CeQ_4XJr.css","/og-default.png","/_astro/AnimatedPost.DG4U3cTq.js","/_astro/client.BuOr9PT5.js","/_astro/CopyButton.BCvx2oFY.js","/_astro/index.CVf8TyFT.js","/_astro/jsx-runtime.TBa3i5EZ.js","/_astro/Newsletter.DT-uEcSN.js","/_astro/proxy.BVgIP360.js","/_astro/ReadingMode.Dca5t_Dc.js","/_astro/ReadingProgress.hoImbHqP.js","/_astro/ShareButton.vu5qqAgQ.js","/_astro/StoryGenerator.0DOGpKIg.js","/about/index.html","/archivo/index.html","/blog/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"BcXeu2K1ARH4QBAifi95png+0FIkkLJPivJlXiGTiUg=","experimentalEnvGetSecretEnabled":false});

export { manifest };
