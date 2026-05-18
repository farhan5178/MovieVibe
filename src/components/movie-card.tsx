'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlay, FaStar } from 'react-icons/fa';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/api';
import * as React from 'react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <Link href={`/movie/${movie.id}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative cursor-pointer overflow-hidden rounded-xl bg-zinc-900 border border-white/5 shadow-lg shadow-black/40 aspect-[2/3] w-full"
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

        {/* Hover/Overlay info (Netflix + IMDb vibe) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
          
          {/* Circular Play Button in the Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 p-4 rounded-full text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.7)]">
            <FaPlay className="ml-0.5 h-4 w-4" />
          </div>

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
    </Link>
  );
}

// Reusable card skeleton loader
export function MovieCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl bg-zinc-900 border border-white/5 aspect-[2/3] w-full flex flex-col justify-end p-4 relative">
      <div className="absolute inset-0 bg-zinc-800/50 rounded-xl" />
      <div className="space-y-2 z-10">
        <div className="h-3 bg-zinc-700 rounded w-1/4" />
        <div className="h-4 bg-zinc-700 rounded w-3/4" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-5 bg-zinc-700 rounded w-1/3" />
          <div className="h-3 bg-zinc-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
