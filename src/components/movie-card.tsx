'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlay, FaStar, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { Movie } from '@/types/tmdb';
import { getImageUrl, getMovieDetails } from '@/lib/api';
import { TrailerModal } from './trailer-modal';
import * as React from 'react';

interface MovieCardProps {
  movie: Movie;
  onWatchlistChange?: () => void;
}

export function MovieCard({ movie, onWatchlistChange }: MovieCardProps) {
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const imageUrl = getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Sync watchlist status
  React.useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setIsInWatchlist(watchlist.some((m: any) => m.id === movie.id));
  }, [movie.id]);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    if (onWatchlistChange) {
      onWatchlistChange();
    }
  };

  const handlePlayTrailer = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    try {
      const details = await getMovieDetails(movie.id);
      const trailer = details?.videos?.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setTrailerKey(trailer ? trailer.key : null);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching trailer:', err);
      setTrailerKey(null);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link href={`/movie/${movie.id}`} className="group flex flex-col w-full">
        <motion.div
          whileHover={{ y: -8, scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shadow-lg shadow-black/40 aspect-[2/3] w-full"
        >
          {/* Movie Poster */}
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={movie.popularity > 800}
            />
          </div>

          {/* Watchlist Bookmark Icon (Always visible on mobile, hover-only on desktop) */}
          <button
            onClick={toggleWatchlist}
            className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-red-600 hover:scale-110 active:scale-95 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer backdrop-blur-md shadow-lg"
            title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            {isInWatchlist ? (
              <FaBookmark className="w-3 h-3 text-red-500 fill-current" />
            ) : (
              <FaRegBookmark className="w-3 h-3 text-slate-300" />
            )}
          </button>

          {/* Hover/Overlay info (Desktop only - Netflix Vibe) */}
          <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
            
            {/* Circular Play Button in the Center */}
            <button
              onClick={handlePlayTrailer}
              disabled={isLoading}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 p-4 rounded-full text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.7)] hover:bg-red-500 hover:scale-105 disabled:bg-zinc-800 disabled:scale-90 active:scale-95 cursor-pointer flex items-center justify-center h-12 w-12"
              title="Watch Trailer"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaPlay className="ml-0.5 h-4.5 w-4.5" />
              )}
            </button>

            {/* Movie Details at the bottom */}
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[10px] uppercase font-bold tracking-widest text-red-500">
                {releaseYear}
              </span>
              <h3 className="font-bold text-white text-sm mt-1 line-clamp-1 group-hover:text-red-500 transition-colors">
                {movie.title}
              </h3>
              
              <div className="flex items-center justify-between mt-2">
                {/* IMDb Rating Vibe */}
                <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/30 px-2 py-0.5 rounded text-xs font-semibold text-yellow-500">
                  <FaStar className="w-3 h-3 fill-current" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {movie.vote_count.toLocaleString()} votes
                </span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Mobile-only Movie Details block (Shown directly below the card poster) */}
        <div className="block md:hidden mt-2 px-1 text-left">
          <h4 className="font-bold text-white text-xs line-clamp-1 group-hover:text-red-500 transition-colors">
            {movie.title}
          </h4>
          <div className="flex items-center justify-between mt-0.5 text-[10px] text-slate-400">
            <span>{releaseYear}</span>
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <FaStar className="w-2.5 h-2.5 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Trailer Modal Overlay inside each card for easy access */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        youtubeKey={trailerKey}
        title={movie.title}
      />
    </>
  );
}

// Reusable card skeleton loader (with mobile-friendly layout)
export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="animate-pulse rounded-xl bg-zinc-900 border border-white/5 aspect-[2/3] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-800/50" />
      </div>
      {/* Mobile-only skeleton metadata */}
      <div className="block md:hidden mt-2 space-y-1.5 px-1">
        <div className="h-3 bg-zinc-800 rounded w-3/4 animate-pulse" />
        <div className="flex justify-between items-center">
          <div className="h-2.5 bg-zinc-800 rounded w-1/4 animate-pulse" />
          <div className="h-2.5 bg-zinc-800 rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
