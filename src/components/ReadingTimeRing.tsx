import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

interface Props {
  totalMinutes: number;
}

export default function ReadingTimeRing({ totalMinutes }: Props) {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v);
      if (v >= 0.98) {
        setVisible(false);
      } else if (v > 0.02) {
        setVisible(true);
      }
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;
  const remaining = Math.max(0, Math.ceil(totalMinutes * (1 - progress)));

  return (
    <AnimatePresence>
      {visible && progress > 0.02 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 left-6 z-40"
        >
          <div className="relative w-10 h-10">
            <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
              <circle cx="20" cy="20" r={radius} fill="none" stroke="#1f1f1f" strokeWidth="3" />
              <circle
                cx="20"
                cy="20"
                r={radius}
                fill="none"
                stroke="#a3e635"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.1s ease' }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-[#737373]">
              {remaining}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
