'use client';

import * as React from 'react';
import Link from 'next/link';
import { MovieCard } from '@/components/movie-card';
import { Movie } from '@/types/tmdb';
import { FaBookmark, FaCompass } from 'react-icons/fa';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = React.useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const loadWatchlist = () => {
    if (typeof window !== 'undefined') {
      const items = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setWatchlist(items);
      setIsLoaded(true);
    }
  };

  React.useEffect(() => {
    loadWatchlist();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-8 md:py-16">
      <div className="container mx-auto px-4 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-500 flex items-center gap-1.5">
              <FaBookmark className="text-red-500 animate-pulse" />
              <span>Personal Library</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              My Watchlist
            </h1>
          </div>
          <div className="text-xs md:text-sm text-slate-400 font-bold bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start">
            Total Saved: <span className="text-white font-black">{watchlist.length}</span>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoaded ? (
          watchlist.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchlist.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onWatchlistChange={loadWatchlist} // Dynamic reactive reload on remove
                />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-white/5 rounded-2xl bg-zinc-950/50 backdrop-blur-md max-w-xl mx-auto p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-600/30 flex items-center justify-center mx-auto text-red-500">
                <FaBookmark className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">Your Watchlist is empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Start exploring your favorite movies and bookmark them to keep track of what you want to watch next!
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/movies"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-750 text-white font-black text-xs transition-all shadow-lg shadow-red-600/20 cursor-pointer"
                >
                  <FaCompass />
                  <span>Discover Movies</span>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(5)].map((_, idx) => (
              <div 
                key={idx} 
                className="animate-pulse rounded-xl bg-zinc-900 border border-white/5 aspect-[2/3] w-full flex flex-col justify-end p-4 relative"
              >
                <div className="absolute inset-0 bg-zinc-800/50 rounded-xl" />
                <div className="space-y-2 z-10">
                  <div className="h-3 bg-zinc-700 rounded w-1/4" />
                  <div className="h-4 bg-zinc-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
