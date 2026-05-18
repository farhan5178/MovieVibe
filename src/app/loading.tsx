import { MovieCardSkeleton } from '@/components/movie-card';
import { HeroSectionSkeleton } from '@/components/hero-section';

export default function Loading() {
  return (
    <div className="bg-black text-white min-h-screen pb-16 space-y-12">
      {/* Immersive Hero Loader */}
      <HeroSectionSkeleton />

      {/* Grid skeleton rows */}
      <div className="container mx-auto px-4 md:px-6 -mt-16 md:-mt-24 relative z-30 space-y-8">
        <div className="space-y-4">
          <div className="h-6 bg-zinc-800 rounded w-48 animate-pulse ml-4 md:ml-0" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <MovieCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
