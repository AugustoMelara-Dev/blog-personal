const keywordMap: Record<string, string> = {
  'Salomón': '/blog/salomon-y-el-precio-de-la-sabiduria',
  'silencio estratégico': '/blog/el-silencio-como-estrategia',
  'no reaccionar': '/blog/el-arte-de-no-reaccionar',
  'envidia': '/blog/la-envidia-no-avisa',
  'no necesitar': '/blog/el-poder-de-no-necesitar',
};

export function addInternalLinks(html: string): string {
  const linked = new Set<string>();

  let result = html;

  for (const [keyword, slug] of Object.entries(keywordMap)) {
    if (linked.has(keyword)) continue;

    // Only match inside <p> tags, not inside existing links, headings, or blockquotes
    const regex = new RegExp(
      `(<p[^>]*>(?:(?!<\\/p>).)*?)\\b(${keyword})\\b((?:(?!<\\/p>).)*?<\\/p>)`,
      'si'
    );

    const match = result.match(regex);
    if (!match) continue;

    // Check the matched context doesn't contain an <a> wrapping the keyword
    const before = match[1];
    const after = match[3];
    const openAnchors = (before.match(/<a[\s>]/gi) || []).length;
    const closeAnchors = (before.match(/<\/a>/gi) || []).length;
    if (openAnchors > closeAnchors) continue; // keyword is inside a link

    const replacement = `${match[1]}<a href="${slug}" class="internal-link">${match[2]}</a>${after}`;
    result = result.replace(match[0], replacement);
    linked.add(keyword);
  }

  return result;
}
