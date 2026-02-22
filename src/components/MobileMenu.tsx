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
        <div className="w-6 h-5 flex flex-col justify-between items-center relative">
          <span
            className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-left ${
              isOpen ? "rotate-45 translate-x-[2.5px] -translate-y-[1px]" : ""
            }`}
          />
          <span
            className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-full h-[2px] bg-current rounded-full transition-all duration-300 origin-left ${
              isOpen ? "-rotate-45 translate-x-[2.5px] translate-y-[1px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Menú Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[56px] left-0 w-full bg-[#111111] border-b border-[#1f1f1f] overflow-hidden z-40 shadow-2xl"
          >
            <nav className="flex flex-col py-2">
              {links.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
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
        )}
      </AnimatePresence>
    </div>
  );
}
