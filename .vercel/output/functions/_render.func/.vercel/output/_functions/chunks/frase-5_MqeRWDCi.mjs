import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_CDhZ2Goq.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"texto":"En el juego del poder, la confianza sin límites no es virtud. Es descuido.","categoria":"poder","fecha":"2026-02-22T00:00:00.000Z"};
				const file = "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-5.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
