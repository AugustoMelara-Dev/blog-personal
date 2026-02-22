import { g as createVNode, F as Fragment, _ as __astro_tag_component__ } from './astro/server_CDhZ2Goq.mjs';
import { $ as $$Image } from './_astro_assets_BgA2YJQp.mjs';
import 'clsx';

const frontmatter = {
  "title": "La envidia no avisa",
  "description": "Los amigos creen que te conocen, y eso los hace sentirse con derecho sobre ti.",
  "versiculo": "Proverbios 27:6 — Fieles son las heridas del que ama.",
  "pubDate": "2026-02-22T00:00:00.000Z",
  "tags": ["reflexiones", "poder", "personas"],
  "featured": true,
  "quote": "Un enemigo sabe que debe probar su lealtad. Un amigo cree que ya la tiene asegurada."
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "la-cercanía-como-arma",
    "text": "La cercanía como arma"
  }, {
    "depth": 2,
    "slug": "el-enemigo-más-cuidadoso",
    "text": "El enemigo más cuidadoso"
  }];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    blockquote: "blockquote",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "la-cercanía-como-arma",
      children: "La cercanía como arma"
    }), "\n", createVNode(_components.p, {
      children: "Los amigos creen que te conocen… y eso los hace sentirse con derecho sobre ti. Lo que no saben es que la cercanía crea comparación, y la comparación crea envidia, y la envidia no avisa cuando decide traicionar."
    }), "\n", createVNode(_components.h2, {
      id: "el-enemigo-más-cuidadoso",
      children: "El enemigo más cuidadoso"
    }), "\n", createVNode(_components.p, {
      children: "Sabes que un enemigo sabe que debe probar su lealtad. Un amigo cree que ya la tiene asegurada. Por eso, a veces el enemigo es más cuidadoso que el amigo."
    }), "\n", createVNode(_components.p, {
      children: "Esto no se trata de odiar a tus amigos. Se trata de no entregarles todo tu poder solo porque te caen bien."
    }), "\n", createVNode(_components.blockquote, {
      children: ["\n", createVNode(_components.p, {
        children: "En el juego del poder, la confianza sin límites no es virtud. Es descuido."
      }), "\n"]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/posts/la-envidia-no-avisa.mdx";
const file = "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/posts/la-envidia-no-avisa.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/posts/la-envidia-no-avisa.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
