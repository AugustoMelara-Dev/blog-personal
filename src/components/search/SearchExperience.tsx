import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { SearchItem } from "../../lib/content";

export default function SearchExperience({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description", "tags", "extra", "type"],
        threshold: 0.34,
      }),
    [items],
  );

  const results = query.trim() ? fuse.search(query).map((item) => item.item) : items.slice(0, 8);

  return (
    <div className="surface-panel p-6 sm:p-8">
      <label className="grid gap-3">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-500">
          Buscar contenido
        </span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Sermones, estudios, etiquetas, temas..."
          className="rounded-2xl border border-brand-100 px-4 py-3"
        />
      </label>

      <div className="mt-6 grid gap-4">
        {results.map((item) => (
          <a key={item.id} href={item.href} className="rounded-2xl border border-brand-100 px-4 py-4 hover:bg-brand-50">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{item.type}</p>
            <h3 className="mt-2 font-serif text-2xl text-ink-900">{item.title}</h3>
            <p className="mt-2 text-ink-600">{item.description}</p>
            {item.extra && <p className="mt-3 text-sm text-ink-500">{item.extra}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
