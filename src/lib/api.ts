import axios from 'axios';
import { Movie, MovieDetails, Genre, TMDBResponse } from '@/types/tmdb';
import { mockMovies, mockGenres, getMockMovieDetails } from './mockData';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const getGenres = async (): Promise<Genre[]> => {
  if (!TMDB_API_KEY) {
    return mockGenres;
  }
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres, falling back to mock:', error);
    return mockGenres;
  }
};

export const getTrendingMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    return {
      page,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
  try {
    const response = await api.get('/trending/movie/day', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies, falling back to mock:', error);
    return {
      page,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
};

export const getTopRatedMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    return {
      page,
      results: [...mockMovies].sort((a, b) => b.vote_average - a.vote_average),
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
  try {
    const response = await api.get('/movie/top_rated', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies, falling back to mock:', error);
    return {
      page,
      results: [...mockMovies].sort((a, b) => b.vote_average - a.vote_average),
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
};

export const getPopularMovies = async (page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    return {
      page,
      results: [...mockMovies].sort((a, b) => b.popularity - a.popularity),
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies, falling back to mock:', error);
    return {
      page,
      results: [...mockMovies].sort((a, b) => b.popularity - a.popularity),
      total_pages: 1,
      total_results: mockMovies.length,
    };
  }
};

export const getMoviesByGenre = async (genreId: number, page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    const filtered = mockMovies.filter((m) => m.genre_ids.includes(genreId));
    return {
      page,
      results: filtered,
      total_pages: 1,
      total_results: filtered.length,
    };
  }
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching movies for genre ${genreId}, falling back to mock:`, error);
    const filtered = mockMovies.filter((m) => m.genre_ids.includes(genreId));
    return {
      page,
      results: filtered,
      total_pages: 1,
      total_results: filtered.length,
    };
  }
};

export const getMovieDetails = async (id: number): Promise<MovieDetails | null> => {
  if (!TMDB_API_KEY) {
    return getMockMovieDetails(id);
  }
  try {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      api.get(`/movie/${id}`),
      api.get(`/movie/${id}/credits`),
      api.get(`/movie/${id}/videos`),
    ]);

    return {
      ...detailsRes.data,
      credits: creditsRes.data,
      videos: videosRes.data,
    };
  } catch (error) {
    console.error(`Error fetching movie details for id ${id}, falling back to mock:`, error);
    return getMockMovieDetails(id);
  }
};

export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    const lowercaseQuery = query.toLowerCase();
    const filtered = mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(lowercaseQuery) ||
        m.overview.toLowerCase().includes(lowercaseQuery)
    );
    return {
      page,
      results: filtered,
      total_pages: 1,
      total_results: filtered.length,
    };
  }
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies for query "${query}", falling back to mock:`, error);
    const lowercaseQuery = query.toLowerCase();
    const filtered = mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(lowercaseQuery) ||
        m.overview.toLowerCase().includes(lowercaseQuery)
    );
    return {
      page,
      results: filtered,
      total_pages: 1,
      total_results: filtered.length,
    };
  }
};

export const getSimilarMovies = async (movieId: number, page = 1): Promise<TMDBResponse<Movie>> => {
  if (!TMDB_API_KEY) {
    const movie = mockMovies.find((m) => m.id === movieId);
    const genreIds = movie?.genre_ids || [];
    const filtered = mockMovies.filter(
      (m) => m.id !== movieId && m.genre_ids.some((id) => genreIds.includes(id))
    );
    const results = filtered.length > 0 ? filtered : mockMovies.filter((m) => m.id !== movieId);
    return {
      page,
      results,
      total_pages: 1,
      total_results: results.length,
    };
  }
  try {
    const response = await api.get(`/movie/${movieId}/similar`, { params: { page } });
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar movies for id ${movieId}, falling back to mock:`, error);
    const movie = mockMovies.find((m) => m.id === movieId);
    const genreIds = movie?.genre_ids || [];
    const filtered = mockMovies.filter(
      (m) => m.id !== movieId && m.genre_ids.some((id) => genreIds.includes(id))
    );
    const results = filtered.length > 0 ? filtered : mockMovies.filter((m) => m.id !== movieId);
    return {
      page,
      results,
      total_pages: 1,
      total_results: results.length,
    };
  }
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500'): string => {
  if (!path) return 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&auto=format&fit=crop&q=80'; // fallback movie placeholder
  if (path.startsWith('http')) return path; // Use direct URLs (like mock images)
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

