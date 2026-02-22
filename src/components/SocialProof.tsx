import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Stats {
  posts: number;
  frases: number;
}

interface Props {
  fallbackPosts: number;
  fallbackFrases: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: 'easeOut',
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value]);

  return <span>{display}</span>;
}

export default function SocialProof({ fallbackPosts, fallbackFrases }: Props) {
  const [stats, setStats] = useState<Stats>({
    posts: fallbackPosts,
    frases: fallbackFrases,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats({
          posts: data.posts || fallbackPosts,
          frases: data.frases || fallbackFrases,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="inline-flex items-center gap-6 bg-[#111111] border border-[#1f1f1f] rounded-lg px-6 py-3 mt-8"
    >
      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" 
          strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"
          style={{color: '#a3e635'}}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        {loading ? (
          <div className="skeleton h-4 w-8" />
        ) : (
          <span className="text-[#f5f5f5] font-semibold text-sm">
            <AnimatedNumber value={stats.posts} />
          </span>
        )}
        <span className="text-[#525252] text-sm">posts</span>
      </div>

      <div className="w-px h-4 bg-[#1f1f1f]" />

      <div className="flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round"
          style={{color: '#a3e635'}}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        {loading ? (
          <div className="skeleton h-4 w-8" />
        ) : (
          <span className="text-[#f5f5f5] font-semibold text-sm">
            <AnimatedNumber value={stats.frases} />
          </span>
        )}
        <span className="text-[#525252] text-sm">frases</span>
      </div>
    </motion.div>
  );
}
