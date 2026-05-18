'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies, getImageUrl } from '@/lib/api';
import { Movie } from '@/types/tmdb';

function SearchInputDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Movie[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Click outside listener to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search suggestion query fetcher
  React.useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsSearching(true);
    setIsDropdownOpen(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await searchMovies(searchQuery.trim());
        setSuggestions(res.results.slice(0, 5)); // show top 5
      } catch (err) {
        console.error('Error fetching search suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350); // 350ms debouncing delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSuggestion = (id: number) => {
    setSearchQuery('');
    setSuggestions([]);
    setIsDropdownOpen(false);
    router.push(`/movie/${id}`);
  };

  return (
    <form ref={containerRef} onSubmit={handleSearchSubmit} className="relative flex items-center z-50">
      <motion.div
        animate={{ width: isSearchFocused || searchQuery ? 240 : 180 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsSearchFocused(true);
            if (suggestions.length > 0) setIsDropdownOpen(true);
          }}
          className="w-full h-9 pl-9 pr-4 rounded-full text-xs bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all duration-300"
        />
        <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      </motion.div>

      {/* Floating Glassmorphic Dropdown Suggestions */}
      <AnimatePresence>
        {isDropdownOpen && (searchQuery.trim().length >= 2) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-11 w-[300px] max-h-[380px] bg-zinc-950/95 border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl z-[100] p-2 space-y-1"
          >
            {isSearching ? (
              <div className="flex items-center justify-center py-6 gap-2 text-slate-400 text-xs">
                <div className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-0.5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-3 py-1.5 border-b border-white/5">
                  Suggested Titles
                </div>
                {suggestions.map((m) => {
                  const posterUrl = getImageUrl(m.poster_path, 'w500');
                  const year = m.release_date ? m.release_date.split('-')[0] : 'N/A';
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(m.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 text-left transition-all group cursor-pointer"
                    >
                      <div className="relative h-10 w-7 rounded overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/5">
                        <Image
                          src={posterUrl}
                          alt={m.title}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-red-500 transition-colors">
                          {m.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{year}</span>
                          <span>•</span>
                          <span className="text-yellow-500 font-bold">★ {m.vote_average.toFixed(1)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                🍿 No movies found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function SearchInputMobile({ onCloseDrawer }: { onCloseDrawer: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [suggestions, setSuggestions] = React.useState<Movie[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  // Debounced search suggestion query fetcher (Mobile)
  React.useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsSearching(true);
    setIsDropdownOpen(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await searchMovies(searchQuery.trim());
        setSuggestions(res.results.slice(0, 4)); // show top 4 mobile
      } catch (err) {
        console.error('Error fetching search suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onCloseDrawer();
    }
  };

  const handleSelectSuggestion = (id: number) => {
    setSearchQuery('');
    setSuggestions([]);
    setIsDropdownOpen(false);
    onCloseDrawer();
    router.push(`/movie/${id}`);
  };

  return (
    <form ref={containerRef} onSubmit={handleSearchSubmit} className="relative w-full flex flex-col gap-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-full text-sm bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-colors"
        />
        <FiSearch className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
      </div>

      {/* Floating Suggestions in Mobile Drawer */}
      <AnimatePresence>
        {isDropdownOpen && searchQuery.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="w-full bg-zinc-950/80 border border-white/5 backdrop-blur-md rounded-xl overflow-hidden p-2 space-y-1 max-h-[300px] overflow-y-auto"
          >
            {isSearching ? (
              <div className="flex items-center justify-center py-4 gap-2 text-slate-400 text-xs">
                <div className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-1">
                {suggestions.map((m) => {
                  const posterUrl = getImageUrl(m.poster_path, 'w500');
                  const year = m.release_date ? m.release_date.split('-')[0] : 'N/A';
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(m.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-left transition-all active:bg-white/5"
                    >
                      <div className="relative h-9 w-6 rounded overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/5">
                        <Image
                          src={posterUrl}
                          alt={m.title}
                          fill
                          sizes="24px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {m.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {year} • <span className="text-yellow-500">★ {m.vote_average.toFixed(1)}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-400 text-xs">
                🍿 No movies found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}


export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-wider text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)] group-hover:text-red-500 transition-colors">
            MOVIE<span className="text-white dark:text-white group-hover:text-slate-200">VIBE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link href="/movies" className="hover:text-white transition-colors duration-200">
            Movies
          </Link>
        </nav>

        {/* Right Actions (Search, Theme, Mobile Toggle) */}
        <div className="hidden md:flex items-center gap-4">
          <React.Suspense fallback={<div className="w-[180px] h-9 bg-white/5 rounded-full" />}>
            <SearchInputDesktop />
          </React.Suspense>
          <ThemeToggle />
        </div>

        {/* Mobile Navbar Hamburger & Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
              {/* Search Form with Suspense */}
              <React.Suspense fallback={<div className="w-full h-11 bg-white/5 rounded-full" />}>
                <SearchInputMobile onCloseDrawer={() => setIsOpen(false)} />
              </React.Suspense>

              {/* Nav Links */}
              <div className="flex flex-col gap-4 text-base font-semibold text-slate-300">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/movies"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-white transition-colors"
                >
                  Movies
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
