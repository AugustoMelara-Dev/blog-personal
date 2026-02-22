import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);
  const [gPressed, setGPressed] = useState(false);

  useEffect(() => {
    let gTimer: ReturnType<typeof setTimeout>;

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === '?') {
        e.preventDefault();
        setShowHelp((v) => !v);
        return;
      }
      if (e.key === 'Escape') {
        setShowHelp(false);
        return;
      }

      // G + key combos
      if (e.key === 'g' || e.key === 'G') {
        setGPressed(true);
        clearTimeout(gTimer);
        gTimer = setTimeout(() => setGPressed(false), 800);
        return;
      }

      if (gPressed) {
        setGPressed(false);
        clearTimeout(gTimer);
        switch (e.key) {
          case 'h': window.location.href = '/'; break;
          case 'b': window.location.href = '/blog'; break;
          case 'f': window.location.href = '/frases'; break;
          case 'm': window.location.href = '/mapa'; break;
        }
        return;
      }

      // / or Ctrl+K for search
      if (e.key === '/' || (e.key === 'k' && (e.ctrlKey || e.metaKey))) {
        // Search handles its own shortcut
        return;
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
      clearTimeout(gTimer);
    };
  }, [gPressed]);

  const shortcuts = [
    { key: '?', action: 'Mostrar/ocultar atajos' },
    { key: 'Ctrl+K', action: 'Abrir buscador' },
    { key: 'G → H', action: 'Ir a Home' },
    { key: 'G → B', action: 'Ir a Blog' },
    { key: 'G → F', action: 'Ir a Frases' },
    { key: 'G → M', action: 'Ir a Mapa' },
    { key: 'Esc', action: 'Cerrar modal' },
  ];

  return (
    <>
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 left-6 z-30 w-8 h-8 rounded-full bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-xs font-mono text-[#525252] hover:text-lime-400 hover:border-lime-400/30 transition-colors"
        aria-label="Atajos de teclado"
        title="Atajos de teclado (?)"
      >
        ?
      </button>

      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 w-full max-w-sm shadow-2xl"
            >
              <h3 className="text-sm font-semibold text-[#f5f5f5] mb-4 uppercase tracking-widest">
                Atajos de teclado
              </h3>
              <div className="flex flex-col gap-3">
                {shortcuts.map(({ key, action }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-[#737373]">{action}</span>
                    <kbd className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-0.5 text-xs font-mono text-[#a3a3a3]">
                      {key}
                    </kbd>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-6 w-full text-center text-xs text-[#525252] hover:text-[#a3a3a3] transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
