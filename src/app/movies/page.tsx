import Link from 'next/link';
import { getGenres, getPopularMovies, getMoviesByGenre } from '@/lib/api';
import { MovieCard } from '@/components/movie-card';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    genre?: string;
    page?: string;
  }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const activeGenreId = resolvedParams.genre ? parseInt(resolvedParams.genre) : null;
  const currentPage = resolvedParams.page ? parseInt(resolvedParams.page) : 1;

  // Parallel data fetching
  const [genres, moviesData] = await Promise.all([
    getGenres(),
    activeGenreId
      ? getMoviesByGenre(activeGenreId, currentPage)
      : getPopularMovies(currentPage),
  ]);

  const movies = moviesData.results || [];
  const totalPages = Math.min(moviesData.total_pages || 1, 500); // TMDB limits page navigation to 500

  // Helper to build page links
  const getPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (activeGenreId) params.set('genre', activeGenreId.toString());
    params.set('page', pageNumber.toString());
    return `/movies?${params.toString()}`;
  };

  return (
    <div className="bg-black text-white min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">
            Discover
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Explore Movies
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Browse through hundreds of titles. Filter by your favorite genres to find the perfect show for tonight.
          </p>
        </div>

        {/* Genre Capsules Row (Horizontally scrollable) */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Genres
          </h3>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {/* "All" Capsule */}
            <Link
              href="/movies"
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex-shrink-0 cursor-pointer ${
                !activeGenreId
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-zinc-900 text-slate-400 hover:bg-zinc-800 hover:text-white border border-white/5'
              }`}
            >
              All Movies
            </Link>

            {/* Genre Capsules */}
            {genres.map((genre) => {
              const isActive = activeGenreId === genre.id;
              return (
                <Link
                  key={genre.id}
                  href={`/movies?genre=${genre.id}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-zinc-900 text-slate-400 hover:bg-zinc-800 hover:text-white border border-white/5'
                  }`}
                >
                  {genre.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Movie Grid */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-slate-500 border border-white/5 rounded-2xl bg-zinc-950">
            <p className="text-lg">No movies found in this category.</p>
            <p className="text-sm text-slate-600 mt-1">Please try another genre or go back to main explore page.</p>
          </div>
        )}

        {/* Simple & Dynamic Pagination Controls */}
        {totalPages > 1 && (
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
