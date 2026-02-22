import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Stats {
  posts: number;
  frases: number;
  subscribers: number;
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
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats({
          posts: data.posts || fallbackPosts,
          frases: data.frases || fallbackFrases,
          subscribers: data.subscribers || 0,
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
        <span className="text-sm">📝</span>
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
        <span className="text-sm">💬</span>
        {loading ? (
          <div className="skeleton h-4 w-8" />
        ) : (
          <span className="text-[#f5f5f5] font-semibold text-sm">
            <AnimatedNumber value={stats.frases} />
          </span>
        )}
        <span className="text-[#525252] text-sm">frases</span>
      </div>

      <div className="w-px h-4 bg-[#1f1f1f]" />

      <div className="flex items-center gap-2">
        <span className="text-sm">👥</span>
        {loading ? (
          <div className="skeleton h-4 w-8" />
        ) : (
          <span className="text-[#f5f5f5] font-semibold text-sm">
            <AnimatedNumber value={stats.subscribers} />
          </span>
        )}
        <span className="text-[#525252] text-sm">lectores</span>
      </div>
    </motion.div>
  );
}
