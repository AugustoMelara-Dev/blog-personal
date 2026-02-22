import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('pwa-dismissed')) return;

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('pwa-dismissed', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4"
        >
          <div className="w-full max-w-[480px] bg-[#111111] border-t border-[#1f1f1f] rounded-xl shadow-2xl p-4 flex items-center gap-4">
            <span className="text-2xl flex-shrink-0">📲</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#f5f5f5]">Instala VitoLogic</p>
              <p className="text-xs text-[#737373]">Lee sin conexión, acceso directo.</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleDismiss}
                className="text-sm text-[#525252] hover:text-[#a3a3a3] transition-colors px-3 py-2"
              >
                Ahora no
              </button>
              <button
                onClick={handleInstall}
                className="text-sm font-semibold bg-lime-400 text-[#0a0a0a] px-4 py-2 rounded-md hover:bg-lime-300 transition-colors"
              >
                Instalar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
