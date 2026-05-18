'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';
import { Movie } from '@/types/tmdb';
import { getImageUrl, getMovieDetails } from '@/lib/api';
import { TrailerModal } from './trailer-modal';
import * as React from 'react';

interface HeroSectionProps {
  movie: Movie;
}

export function HeroSection({ movie }: HeroSectionProps) {
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';

  // Trailer Modal State & Handler
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlayTrailer = async () => {
    setIsLoading(true);
    try {
      const details = await getMovieDetails(movie.id);
      const trailer = details?.videos?.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setTrailerKey(trailer ? trailer.key : null);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Error fetching trailer for hero movie:', err);
      setTrailerKey(null);
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center bg-black overflow-hidden border-b border-white/5">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover object-top opacity-60 transition-scale duration-10000 scale-105"
        />
        {/* Netflix Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[60%] bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black to-transparent z-10" />
        <div className="absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-black to-transparent z-10" />
      </div>

      {/* Hero Info Container */}
      <div className="container mx-auto px-4 z-20 max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4 md:space-y-6"
        >
          {/* Tag / Badge */}
          <span className="inline-block px-3 py-1 text-[10px] tracking-widest font-black uppercase text-red-600 bg-red-600/10 border border-red-600/30 rounded-full">
            Featured Spotlight
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-md leading-tight">
            {movie.title}
          </h1>

          {/* Quick info row */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="text-red-500">{releaseYear}</span>
            
            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded">
              <FaStar className="w-3.5 h-3.5 fill-current" />
              <span>{movie.vote_average.toFixed(1)} Rating</span>
            </div>

            <span className="text-slate-400">
              {movie.vote_count.toLocaleString()} IMDb Votes
            </span>
          </div>

          {/* Overview */}
          <p className="text-sm md:text-base text-slate-300 max-w-xl leading-relaxed line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              onClick={handlePlayTrailer}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-850 text-white font-bold px-6 py-3 rounded-lg text-sm md:text-base shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 cursor-pointer"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaPlay className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Loading...' : 'Play Trailer'}</span>
            </motion.button>

            <Link href={`/movie/${movie.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg text-sm md:text-base backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <FaInfoCircle className="h-4 w-4" />
                <span>More Details</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Trailer Modal Player */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        youtubeKey={trailerKey}
        title={movie.title}
      />
    </section>
  );
}

// Hero skeleton loader
export function HeroSectionSkeleton() {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center bg-black overflow-hidden animate-pulse border-b border-white/5">
      <div className="absolute inset-0 z-0 bg-zinc-950" />
      <div className="container mx-auto px-4 z-20 max-w-4xl space-y-6">
        <div className="h-6 bg-zinc-800 rounded w-1/4" />
        <div className="h-16 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-1/2" />
        <div className="h-20 bg-zinc-800 rounded w-full max-w-xl" />
        <div className="flex gap-4 pt-2">
          <div className="h-12 bg-zinc-800 rounded w-32" />
          <div className="h-12 bg-zinc-800 rounded w-32" />
        </div>
      </div>
    </section>
  );
}
