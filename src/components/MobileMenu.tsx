import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  currentPath: string;
  links: NavLink[];
}

export default function MobileMenu({ currentPath, links }: Props) {
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

  return (
    <div className="lg:hidden flex items-center">
      {/* Botón Hamburger */}
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

      {/* Menú Dropdown -> Panel Deslizante */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-screen w-[280px] bg-[#111111] border-l border-[#1f1f1f] z-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-end p-4">
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
                {links.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`px-8 py-4 border-b border-[#1a1a1a] last:border-0 transition-colors duration-200 ${
                      isActive(href)
                        ? "text-[#f5f5f5] font-medium bg-[#1a1a1a]"
                        : "text-[#a3a3a3] hover:text-[#f5f5f5] hover:bg-[#1a1a1a]"
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
