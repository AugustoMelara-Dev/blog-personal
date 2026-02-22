import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import CopyButton from './CopyButton';
import StoryGenerator from './StoryGenerator';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  type: 'post' | 'frase';
  url: string;
  slug?: string;
}

const HighlightText = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-lime-400/20 text-lime-400 px-1 rounded inline-block bg-transparent">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

export default function BuscarPage({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'posts' | 'frases'>('posts');
  const [results, setResults] = useState<SearchItem[]>([]);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);

  useEffect(() => {
    // Read query from URL on mount
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    // Update URL when query changes
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set('q', query);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url.toString());
  }, [query]);

  useEffect(() => {
    fuseRef.current = new Fuse(items, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.3,
      includeScore: true,
      ignoreLocation: true,
    });
  }, [items]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(items);
      return;
    }
    if (fuseRef.current) {
      const searchResults = fuseRef.current.search(query).map(r => r.item);
      setResults(searchResults);
    }
  }, [query, items]);

  const posts = results.filter(r => r.type === 'post');
  const frases = results.filter(r => r.type === 'frase');
  const activeResults = activeTab === 'posts' ? posts : frases;

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
  };

  return (
    <div className="w-full">
      <div className="mb-12 relative">
        <svg className="absolute left-6 top-1/2 -translate-y-1/2 text-[#525252] w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input
          type="text"
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar ideas, reflexiones, frases..."
          className="w-full bg-[#111111] border border-[#1f1f1f] focus:border-lime-400 focus:ring-1 focus:ring-lime-400 rounded-xl text-[#f5f5f5] text-xl md:text-2xl px-16 py-6 outline-none transition-all placeholder:text-[#525252]"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#525252] hover:text-[#f5f5f5] p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        )}
      </div>

      <div className="flex border-b border-[#1f1f1f] mb-8">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'posts' ? 'border-lime-400 text-[#f5f5f5]' : 'border-transparent text-[#525252] hover:text-[#a3a3a3]'}`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('frases')}
          className={`px-6 py-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'frases' ? 'border-lime-400 text-[#f5f5f5]' : 'border-transparent text-[#525252] hover:text-[#a3a3a3]'}`}
        >
          Frases ({frases.length})
        </button>
      </div>

      <div className="mb-8 text-[#737373] text-sm">
        {query ? (
          <span>{activeResults.length} resultados para "{query}"</span>
        ) : (
          <span>Mostrando todo el contenido ({activeResults.length})</span>
        )}
      </div>

      {activeResults.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#1f1f1f] rounded-xl bg-[#0a0a0a]">
          <p className="text-[#a3a3a3] text-lg mb-4">Ningún resultado para "{query}"</p>
          <p className="text-[#525252] text-sm mb-6">Sugerencias para explorar:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['poder', 'biblia', 'silencio', 'envidia', 'reflexiones'].map(suggestion => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="px-4 py-2 rounded-full border border-[#1f1f1f] bg-[#111111] text-[#737373] hover:text-[#a3e635] hover:border-lime-400/30 text-sm transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={activeTab === 'frases' ? 'columns-1 md:columns-2 gap-6' : 'flex flex-col gap-6'}>
          {activeResults.map(item => (
            activeTab === 'posts' ? (
              <a 
                key={item.id} 
                href={item.url}
                className="block p-6 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:border-[#333] transition-colors group"
              >
                <div className="flex items-center gap-3 text-xs text-[#525252] uppercase tracking-widest mb-3">
                  <time dateTime={item.date}>
                    {format(new Date(item.date), "d MMM yyyy", { locale: es })}
                  </time>
                  {item.tags && item.tags.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="text-lime-400/70">{item.tags[0]}</span>
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[#f5f5f5] group-hover:text-lime-400 transition-colors mb-3">
                  <HighlightText text={item.title} query={query} />
                </h2>
                <p className="text-[#a3a3a3] leading-relaxed line-clamp-2">
                  <HighlightText text={item.description} query={query} />
                </p>
              </a>
            ) : (
              <div 
                key={item.id}
                className="break-inside-avoid mb-6 p-6 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:border-[#333] transition-colors flex flex-col justify-between"
              >
                <p className="text-lg text-[#f5f5f5] font-medium leading-relaxed italic mb-6">
                  "<HighlightText text={item.description} query={query} />"
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <a href={item.url} className="text-xs px-2.5 py-1 rounded bg-[#1f1f1f] text-[#a3a3a3] hover:bg-lime-400/10 hover:text-lime-400 transition-colors">
                    #{item.tags[0]}
                  </a>
                  <div className="flex items-center gap-2">
                    <StoryGenerator texto={item.description} />
                    <CopyButton text={item.description} />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
