'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeKey: string | null;
  title: string;
}

export function TrailerModal({ isOpen, onClose, youtubeKey, title }: TrailerModalProps) {
  // Handle escape key press & scroll lock
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10"
          >
            {/* Header / Title bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-white/5">
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-red-500">
                  Now Playing Trailer
                </span>
                <h3 className="text-sm md:text-base font-black text-white line-clamp-1 mt-0.5">
                  {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-red-600 hover:text-white transition-all text-slate-400 cursor-pointer"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Video Player aspect-ratio container */}
            <div className="relative aspect-video w-full bg-black">
              {youtubeKey ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&rel=0`}
                  title={`${title} Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-500 px-6 text-center">
                  <span className="text-4xl">🍿</span>
                  <div>
                    <p className="font-bold text-white text-sm">Trailer Unavailable</p>
                    <p className="text-xs text-slate-400 mt-0.5">We could not find an official YouTube trailer for this title.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
