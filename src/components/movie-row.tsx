'use client';

import * as React from 'react';
import { Movie } from '@/types/tmdb';
import { MovieCard, MovieCardSkeleton } from './movie-card';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
}

export function MovieRow({ title, movies, loading = false }: MovieRowProps) {
  const rowRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3 relative group/row py-4">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white pl-4 md:pl-0 hover:text-red-500 transition-colors inline-block cursor-pointer">
        {title}
      </h2>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full border border-white/5 opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-lg cursor-pointer h-10 w-10 flex items-center justify-center backdrop-blur-sm"
        >
          <FiChevronLeft className="h-6 w-6" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          className="flex overflow-x-auto gap-4 px-4 md:px-0 pb-4 scroll-smooth no-scrollbar select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] flex-shrink-0"
              >
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-black/90 text-white p-2 rounded-full border border-white/5 opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-lg cursor-pointer h-10 w-10 flex items-center justify-center backdrop-blur-sm"
        >
          <FiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
