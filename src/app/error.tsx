'use client';

import * as React from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    // Log the error to an analytics provider or console
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="bg-black text-white min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md p-8 rounded-2xl bg-zinc-950 border border-red-500/20 shadow-2xl shadow-red-500/5 space-y-6">
        
        {/* Error icon overlay */}
        <div className="w-16 h-16 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(220,38,38,0.2)]">
          <span className="text-3xl font-black text-red-600">!</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Cinematic Interruption
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Something went wrong while fetching the show. This might be due to a poor network connection or missing TMDB API credentials.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 cursor-pointer"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold rounded-lg text-sm transition-all border border-white/5 text-center"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
