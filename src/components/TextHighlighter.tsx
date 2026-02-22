import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children: ReactNode;
}

export default function TextHighlighter({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        setTooltip(null);
        return;
      }

      const text = selection.toString().trim();
      if (text.length < 20 || text.length > 280) {
        setTooltip(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      setTooltip({
        text,
        top: rect.top - containerRect.top - 52,
        left: rect.left - containerRect.left + rect.width / 2,
      });
      setCopied(false);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.text-highlight-tooltip')) return;
      setTooltip(null);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const twitterUrl = tooltip
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${tooltip.text}" — vitologic.vercel.app`)}`
    : '';
  const whatsappUrl = tooltip
    ? `https://wa.me/?text=${encodeURIComponent(tooltip.text + '\n' + pageUrl)}`
    : '';
  const linkedinUrl = tooltip
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
    : '';

  const copyText = async () => {
    if (!tooltip) return;
    await navigator.clipboard.writeText(tooltip.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnClass =
    'flex flex-col items-center gap-1 px-3 py-2 rounded hover:bg-[#1a1a1a] transition-colors';

  return (
    <div ref={containerRef} className="relative">
      {children}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-highlight-tooltip absolute z-50"
            style={{ top: tooltip.top, left: tooltip.left, transform: 'translateX(-50%)' }}
          >
            <div className="bg-[#111111] border border-[#1f1f1f] rounded-lg shadow-xl px-2 py-1.5 flex items-center gap-1">
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5f5f5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-[10px] text-[#737373]">Tweet</span>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="text-[10px] text-[#737373]">WhatsApp</span>
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={btnClass}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-[10px] text-[#737373]">LinkedIn</span>
              </a>
              <button onClick={copyText} className={btnClass}>
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                )}
                <span className="text-[10px] text-[#737373]">{copied ? '✓' : 'Copiar'}</span>
              </button>
            </div>
            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1f1f1f]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
