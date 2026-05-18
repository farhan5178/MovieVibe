import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails, getImageUrl, getSimilarMovies } from '@/lib/api';
import { MovieActions } from '@/components/movie-actions';
import { MovieRow } from '@/components/movie-row';
import { FaStar, FaClock, FaDollarSign, FaCalendarAlt, FaChevronLeft } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.id);

  // Parallel data fetching for details and similar recommendations
  const [movie, similarData] = await Promise.all([
    getMovieDetails(movieId),
    getSimilarMovies(movieId),
  ]);

  if (!movie) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Movie not found</h2>
        <Link
          href="/"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold transition-all"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const similarMovies = similarData.results || [];
  
  // Format numbers nicely
  const formatCurrency = (val: number) => {
    return val > 0 ? `$${val.toLocaleString()}` : 'N/A';
  };

  // Find trailer
  const trailer = movie.videos?.results.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const trailerKey = trailer ? trailer.key : null;

  return (
    <div className="bg-black text-white min-h-screen pb-16">
      
      {/* 1. Immersive Backdrop Banner (Netflix inspired) */}
      <div className="relative w-full h-[40vh] md:h-[60vh] z-0 overflow-hidden border-b border-white/5">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/30 z-10" />
        
        {/* Floating Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/movies"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-colors duration-200"
          >
            <FaChevronLeft />
            <span>All Movies</span>
          </Link>
        </div>
      </div>

      {/* 2. Content Info Grid (IMDb styled + detailed) */}
      <div className="container mx-auto px-4 -mt-24 md:-mt-48 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Movie Poster */}
          <div className="lg:col-span-4 max-w-sm mx-auto lg:mx-0 w-full">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80">
              <Image
                src={posterUrl}
                alt={movie.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Detailed Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Tagline */}
            <div className="space-y-2">
              {movie.tagline && (
                <span className="italic text-red-500 font-medium tracking-wide text-sm md:text-base">
                  &ldquo;{movie.tagline}&rdquo;
                </span>
              )}
              <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight">
                {movie.title}
              </h1>
            </div>

            {/* Quick Stats Pillbar */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* Year */}
              <span className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1 text-slate-300 font-semibold">
                <FaCalendarAlt className="text-red-500" />
                {releaseYear}
              </span>
              
              {/* Runtime */}
              {movie.runtime && (
                <span className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1 text-slate-300 font-semibold">
                  <FaClock className="text-red-500" />
                  {movie.runtime} min
                </span>
              )}
              
              {/* Rating */}
              <span className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-full flex items-center gap-1 text-yellow-500 font-bold">
                <FaStar />
                {movie.vote_average.toFixed(1)} / 10
              </span>
            </div>

            {/* Premium Dynamic Action Buttons */}
            <MovieActions movie={movie} trailerKey={trailerKey} />

            {/* Genres Tagline */}
            <div className="flex flex-wrap gap-2 pt-1">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/movies?genre=${genre.id}`}
                  className="px-3 py-1 bg-white/5 border border-white/5 hover:border-red-600/30 hover:bg-red-600/10 rounded-full text-xs font-bold text-slate-300 transition-colors cursor-pointer"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {/* Overview */}
            <div className="space-y-2.5">
              <h3 className="text-sm uppercase font-bold tracking-widest text-slate-500">
                Synopsis
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {movie.overview}
              </p>
            </div>

            {/* Financial Details (Budget / Revenue) */}
            <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <FaDollarSign className="text-red-500" /> Budget
                </span>
                <span className="text-sm font-black text-white">
                  {formatCurrency(movie.budget)}
                </span>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                  <FaDollarSign className="text-green-500" /> Revenue
                </span>
                <span className="text-sm font-black text-white">
                  {formatCurrency(movie.revenue)}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* 3. Cast Section */}
        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
          <div className="mt-16 space-y-4">
            <div className="border-b border-white/5 pb-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Main Cast
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 6).map((member) => (
                <div
                  key={member.id}
                  className="bg-zinc-950 rounded-xl p-3 border border-white/5 flex flex-col items-center text-center gap-2 hover:border-red-600/30 transition-all duration-300 group"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:scale-105 transition-transform">
                    <Image
                      src={
                        member.profile_path
                          ? getImageUrl(member.profile_path, 'w500')
                          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {member.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                      {member.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Similar Movies Recommendations Slider (Replaced static iframe trailer) */}
        {similarMovies.length > 0 && (
          <div className="mt-16">
            <MovieRow title="You Might Also Like" movies={similarMovies} />
          </div>
        )}

      </div>
    </div>
  );
}
