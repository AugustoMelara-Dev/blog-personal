import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { BookOpen, Minimize2 } from 'lucide-react';

export default function ReadingMode() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('reading-mode-active');
    } else {
      document.body.classList.remove('reading-mode-active');
    }

    return () => {
      document.body.classList.remove('reading-mode-active');
    };
  }, [isActive]);

  return (
    <>
      {/* Global styles for reading mode */}
      {isActive && (
        <style dangerouslySetInnerHTML={{__html: `
          body.reading-mode-active {
            background-color: #050505 !important;
            transition: background-color 0.5s ease;
          }
          body.reading-mode-active header {
            display: none !important;
          }
          body.reading-mode-active footer {
            display: none !important;
          }
          body.reading-mode-active main {
            display: flex;
            justify-content: center;
          }
          body.reading-mode-active article {
            max-width: 70ch !important;
            width: 100%;
            margin: 0 auto !important;
            padding-top: 4rem !important;
            padding-bottom: 8rem !important;
          }
          body.reading-mode-active .prose {
            font-size: 1.2rem !important;
            transition: font-size 0.3s ease;
          }
        `}} />
      )}

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsActive(!isActive)}
          title={isActive ? "Salir" : "Modo lectura"}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#111111] border border-[#1f1f1f] text-[#a3a3a3] hover:border-lime-400/30 hover:text-lime-400 shadow-lg transition-colors duration-300 relative"
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Minimize2 size={18} />
              </motion.div>
            ) : (
              <motion.div
                key="book"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <BookOpen size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
