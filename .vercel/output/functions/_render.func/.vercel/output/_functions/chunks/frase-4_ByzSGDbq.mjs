import { d as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_CDhZ2Goq.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"texto":"Todos somos personas horribles. Algunos simplemente sabemos ocultarlo mejor.","categoria":"personas","fecha":"2026-02-22T00:00:00.000Z"};
				const file = "C:/Users/melar/OneDrive/Desktop/Proyectos Importantes/blog-personal/src/content/frases/frase-4.md";
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
