import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  slug: string;
}

export default function BookmarkButton({ slug }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('vitologic-bookmarks') || '[]');
    setSaved(bookmarks.includes(slug));
  }, [slug]);

  const toggle = () => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('vitologic-bookmarks') || '[]');
    let next: string[];
    if (bookmarks.includes(slug)) {
      next = bookmarks.filter((s) => s !== slug);
    } else {
      next = [...bookmarks, slug];
    }
    localStorage.setItem('vitologic-bookmarks', JSON.stringify(next));
    setSaved(!saved);
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 1.2 }}
      transition={{ duration: 0.15 }}
      className="transition-colors p-1"
      aria-label={saved ? 'Guardado' : 'Guardar'}
      title={saved ? 'Guardado' : 'Guardar'}
    >
      {saved ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#a3e635" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#525252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )}
    </motion.button>
  );
}
