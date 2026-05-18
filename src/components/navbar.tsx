'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { ThemeToggle } from './theme-toggle';
import { motion, AnimatePresence } from 'framer-motion';

function SearchInputDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  React.useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
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
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="w-full h-9 pl-9 pr-4 rounded-full text-xs bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-all duration-300"
        />
        <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      </motion.div>
    </form>
  );
}

function SearchInputMobile({ onCloseDrawer }: { onCloseDrawer: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onCloseDrawer();
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-11 pl-11 pr-4 rounded-full text-sm bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white/10 transition-colors"
      />
      <FiSearch className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
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
