import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ isMobile = false }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Only query within the article content to avoid other potential h2/h3
    const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
    const parsedHeadings = elements.map(el => {
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3
      };
    });
    setHeadings(parsedHeadings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // offset for sticky header if any
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  const content = (
    <nav className="text-sm">
      <h3 className="text-xs uppercase tracking-widest text-[#525252] mb-4 font-semibold">Contenido</h3>
      <ul className="space-y-2.5">
        {headings.map(h => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleClick(e, h.id)}
              className={`block transition-colors duration-150 pl-3 border-l-2 ${
                activeId === h.id 
                  ? "border-lime-400 text-lime-400" 
                  : "border-transparent text-[#737373] hover:text-[#f5f5f5]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (isMobile) {
    return (
      <details className="bg-[#111111] border border-[#1f1f1f] rounded-lg p-4 group">
        <summary className="text-[#a3a3a3] cursor-pointer font-medium outline-none list-none flex items-center justify-between">
          <span className="text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            Tabla de Contenidos
          </span>
          <svg className="transform group-open:rotate-180 transition-transform duration-200" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </summary>
        <div className="mt-4 pt-4 border-t border-[#1f1f1f]">
          {content}
        </div>
      </details>
    );
  }

  return content;
}
