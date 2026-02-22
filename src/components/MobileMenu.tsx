import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  currentPath: string;
}

export default function MobileMenu({ currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  // Evitar scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    currentPath === href || (currentPath.startsWith(`${href}/`) && href !== "/");

  const LinkItem = ({ href, label }: { href: string; label: string }) => (
    <a
      href={href}
      onClick={() => setIsOpen(false)}
      className={`px-[1.5rem] py-[0.875rem] text-[0.9375rem] transition-colors duration-200 ${
        isActive(href)
          ? "text-[#f5f5f5]"
          : "text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
      }`}
    >
      {label}
    </a>
  );

  return (
    <div className="flex items-center md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#737373] hover:text-[#f5f5f5] transition-colors p-2 z-50 relative"
        aria-label="Menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-screen w-[280px] bg-[#111111] border-l border-[#1f1f1f] z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 pl-6 border-b border-[#1f1f1f]">
                <div className="flex items-center tracking-tight leading-none pb-[2px]">
                  <span className="text-[#f5f5f5] font-[800] text-xl">Vito</span>
                  <span className="text-[#a3e635] font-[800] text-xl">Cipher</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#737373] hover:text-[#f5f5f5] transition-colors p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <nav className="flex flex-col py-2">
                <LinkItem href="/blog" label="Blog" />
                <LinkItem href="/frases" label="Frases" />
                <LinkItem href="/biblia" label="Biblia" />
                <LinkItem href="/series" label="Series" />
                <LinkItem href="/mapa" label="Mapa" />
                <LinkItem href="/about" label="Sobre mí" />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
