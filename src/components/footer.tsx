import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-slate-400 border-t border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]">
                MOVIE<span className="text-white">VIBE</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your ultimate movie guide. Explore trending, popular, and top-rated movies. Get detailed cast info, movie descriptions, ratings, and much more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Navigation</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/movies" className="hover:text-red-500 transition-colors">Explore Movies</Link>
              </li>
              <li>
                <Link href="/movies?genre=28" className="hover:text-red-500 transition-colors">Action Movies</Link>
              </li>
              <li>
                <Link href="/movies?genre=878" className="hover:text-red-500 transition-colors">Sci-Fi Movies</Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Help & Support</h3>
            <ul className="flex flex-col gap-2 text-xs">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white tracking-wider uppercase">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-400 transition-all duration-300">
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[10px] text-slate-500">
              Powered by TMDB API.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} MovieVibe. All rights reserved. Made for cinematic excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
