import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  type: 'post' | 'frase';
  url: string;
}

export default function Search({ items }: { items: SearchItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const fuseRef = useRef<Fuse<SearchItem> | null>(null);

  useEffect(() => {
    fuseRef.current = new Fuse(items, {
      keys: ['title', 'description', 'tags'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [items]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    if (fuseRef.current) {
      const searchResults = fuseRef.current.search(query).map(r => r.item);
      setResults(searchResults);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevenir scroll cuando el modal está abierto y auto-enfocar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[#737373] hover:text-[#f5f5f5] transition-colors p-2 md:mr-0 mr-1"
        aria-label="Buscar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex flex-col items-center pt-[10vh] px-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                document.body.style.overflow = '';
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="flex items-center px-4 md:px-6 border-b border-[#1f1f1f]">
                <svg className="text-[#a3a3a3] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                  id="search-input"
                  type="text"
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar posts y frases..."
                  className="flex-1 bg-transparent border-none text-[#f5f5f5] text-lg px-4 py-5 focus:outline-none placeholder:text-[#525252]"
                />
                <button onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = '';
                }} className="text-[#525252] border border-[#1f1f1f] rounded px-2 hover:text-[#f5f5f5] text-[0.7rem] uppercase tracking-widest font-semibold hidden sm:block delay-75 transition-colors">
                  ESC
                </button>
              </div>

                <>
                  <div className="overflow-y-auto p-2">
                    {results.slice(0, 5).map(item => (
                      <a
                        key={item.id}
                        href={item.url}
                        className="block p-4 rounded-lg hover:bg-[#111111] transition-colors group"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[#f5f5f5] font-medium group-hover:text-lime-400 transition-colors line-clamp-1">
                            {item.title}
                          </span>
                          <span className="text-[#525252] text-xs uppercase tracking-widest bg-[#111111] px-2 py-0.5 rounded border border-[#1f1f1f] flex-shrink-0 ml-3">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[#737373] text-sm line-clamp-1 mb-2">
                          {item.description}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex gap-2">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-[#525252] text-xs">#{tag}</span>
                            ))}
                          </div>
                        )}
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-[#1f1f1f] p-4 text-center bg-[#050505]">
                    <a
                      href={`/buscar?q=${encodeURIComponent(query)}`}
                      className="text-[#a3a3a3] hover:text-[#a3e635] text-sm transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Ver todos los resultados →
                    </a>
                  </div>
                </>
              
              {query.trim() !== '' && results.length === 0 && (
                <div className="p-8 text-center text-[#737373]">
                  No se encontraron resultados para "{query}"
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
