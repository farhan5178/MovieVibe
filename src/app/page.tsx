import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from '@/lib/api';
import { HeroSection } from '@/components/hero-section';
import { MovieRow } from '@/components/movie-row';

// Enable dynamic rendering so it checks for env variables at runtime
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [trendingData, popularData, topRatedData] = await Promise.all([
    getTrendingMovies(1),
    getPopularMovies(1),
    getTopRatedMovies(1),
  ]);

  const trendingMovies = trendingData.results || [];
  const popularMovies = popularData.results || [];
  const topRatedMovies = topRatedData.results || [];

  // Spotlight movies for the Hero section carousel (top 5)
  const spotlightMovies = trendingMovies.slice(0, 5);

  return (
    <div className="bg-black text-white min-h-screen pb-16">
      {/* Hero Section */}
      {spotlightMovies.length > 0 ? (
        <HeroSection movies={spotlightMovies} />
      ) : (
        <div className="h-[50vh] flex items-center justify-center">
          <p className="text-slate-400">No movies found. Please configure your TMDB API Key.</p>
        </div>
      )}

      {/* Movie Rows Container */}
      <div className="container mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-30 space-y-8 md:space-y-12">
        {trendingMovies.length > 0 && (
          <MovieRow title="Trending Movies" movies={trendingMovies} />
        )}
        
        {popularMovies.length > 0 && (
          <MovieRow title="Popular Releases" movies={popularMovies} />
        )}

        {topRatedMovies.length > 0 && (
          <MovieRow title="Top Rated Blockbusters" movies={topRatedMovies} />
        )}
      </div>
    </div>
  );
}
