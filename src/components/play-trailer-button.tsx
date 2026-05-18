'use client';

import * as React from 'react';
import { FaPlay } from 'react-icons/fa';
import { TrailerModal } from './trailer-modal';
import { motion } from 'framer-motion';

interface PlayTrailerButtonProps {
  trailerKey: string | null;
  movieTitle: string;
}

export function PlayTrailerButton({ trailerKey, movieTitle }: PlayTrailerButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-750 text-white font-black rounded-xl text-sm transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 flex items-center justify-center gap-2 cursor-pointer border border-red-600/10"
      >
        <FaPlay className="h-3.5 w-3.5" />
        <span>Watch Trailer</span>
      </motion.button>

      <TrailerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        youtubeKey={trailerKey}
        title={movieTitle}
      />
    </>
  );
}
