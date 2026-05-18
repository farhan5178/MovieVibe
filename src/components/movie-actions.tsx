'use client';

import * as React from 'react';
import { FaPlay, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { TrailerModal } from './trailer-modal';
import { motion } from 'framer-motion';
import { Movie } from '@/types/tmdb';

interface MovieActionsProps {
  movie: any;
  trailerKey: string | null;
}

export function MovieActions({ movie, trailerKey }: MovieActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);

  React.useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsInWatchlist(watchlist.some((m: any) => m.id === movie.id));
  }, [movie.id]);

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (isInWatchlist) {
      const updated = watchlist.filter((m: any) => m.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      setIsInWatchlist(false);
    } else {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      setIsInWatchlist(true);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3.5 pt-1">
      {/* 1. Watch Trailer Button */}
      {trailerKey && (
        <>
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3.5 bg-red-600 hover:bg-red-750 text-white font-black rounded-xl text-xs md:text-sm transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 flex items-center justify-center gap-2 cursor-pointer border border-red-600/10"
          >
            <FaPlay className="h-3.5 w-3.5" />
            <span>Watch Trailer</span>
          </motion.button>

          <TrailerModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            youtubeKey={trailerKey}
            title={movie.title}
          />
        </>
      )}

      {/* 2. Watchlist Bookmark Button */}
      <motion.button
        onClick={toggleWatchlist}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={`px-5 py-3.5 font-bold rounded-xl text-xs md:text-sm transition-all border flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md ${
          isInWatchlist
            ? 'bg-red-600/15 border-red-600/30 text-red-500 hover:bg-red-600/25'
            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
        }`}
      >
        {isInWatchlist ? (
          <>
            <FaBookmark className="h-3.5 w-3.5 text-red-500 fill-current" />
            <span>In Watchlist</span>
          </>
        ) : (
          <>
            <FaRegBookmark className="h-3.5 w-3.5" />
            <span>Add to Watchlist</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
