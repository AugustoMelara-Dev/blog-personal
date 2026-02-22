import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  total: number;
}

export default function FrasesCounter({ total }: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, total, {
      duration: 1.5,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [total]);

  return (
    <div className="text-center mb-12">
      <motion.span
        className="block text-8xl font-black text-[#1a1a1a] leading-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {displayValue}
      </motion.span>
      <span className="text-sm text-[#525252] uppercase tracking-widest">
        frases publicadas
      </span>
    </div>
  );
}
