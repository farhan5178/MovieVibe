import Link from 'next/link';
import { searchMovies } from '@/lib/api';
import { MovieCard } from '@/components/movie-card';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const currentPage = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

  let movies: any[] = [];
  let totalPages = 1;
  let totalResults = 0;

  if (query.trim()) {
    const moviesData = await searchMovies(query.trim(), currentPage);
    movies = moviesData.results || [];
    totalPages = Math.min(moviesData.total_pages || 1, 500);
    totalResults = moviesData.total_results || 0;
  }

  // Helper to build page links
  const getPageLink = (pageNumber: number) => {
    return `/search?q=${encodeURIComponent(query)}&page=${pageNumber}`;
  };

  return (
    <div className="bg-black text-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">
            Search Results
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight break-words">
            {query.trim() ? `&ldquo;${query}&rdquo;` : 'Search Movies'}
          </h1>
          {query.trim() && (
            <p className="text-slate-400 text-sm md:text-base">
              Found {totalResults.toLocaleString()} matching titles in our database.
            </p>
          )}
        </div>

        {/* Results Grid */}
        {query.trim() ? (
          movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 border border-white/5 rounded-2xl bg-zinc-950">
              <p className="text-lg">No movies found matching your search query.</p>
              <p className="text-sm text-slate-600 mt-1">Double check your spelling or search for popular keywords like &ldquo;Dune&rdquo; or &ldquo;Knight&rdquo;.</p>
            </div>
          )
        ) : (
          <div className="py-20 text-center text-slate-500 border border-white/5 rounded-2xl bg-zinc-950">
            <p className="text-lg">Please enter a search query in the search bar above.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {query.trim() && totalPages > 1 && (
          <div className="pt-8 border-t border-white/5 flex items-center justify-center gap-4">
            {/* Prev Page Button */}
            {currentPage > 1 ? (
              <Link
                href={getPageLink(currentPage - 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/5 hover:bg-red-600 hover:text-white font-bold text-xs transition-all duration-300 cursor-pointer"
              >
                <FiChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/5 text-slate-600 font-bold text-xs cursor-not-allowed">
                <FiChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </span>
            )}

            {/* Current Page Display */}
            <span className="text-xs font-semibold text-slate-400">
              Page <span className="text-white font-black">{currentPage}</span> of {totalPages}
            </span>

            {/* Next Page Button */}
            {currentPage < totalPages ? (
              <Link
                href={getPageLink(currentPage + 1)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/5 hover:bg-red-600 hover:text-white font-bold text-xs transition-all duration-300 cursor-pointer"
              >
                <span>Next</span>
                <FiChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-950 border border-white/5 text-slate-600 font-bold text-xs cursor-not-allowed">
                <span>Next</span>
                <FiChevronRight className="h-4 w-4" />
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
