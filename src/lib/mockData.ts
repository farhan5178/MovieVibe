import { Movie, MovieDetails, Genre } from '@/types/tmdb';

export const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Dune: Part Two',
    original_title: 'Dune: Part Two',
    overview: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.',
    poster_path: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    release_date: '2024-03-01',
    vote_average: 8.4,
    vote_count: 3450,
    popularity: 980.5,
    genre_ids: [878, 12]
  },
  {
    id: 2,
    title: 'The Dark Knight',
    original_title: 'The Dark Knight',
    overview: 'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
    poster_path: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    release_date: '2008-07-18',
    vote_average: 9.0,
    vote_count: 31200,
    popularity: 750.2,
    genre_ids: [28, 80, 18, 53]
  },
  {
    id: 3,
    title: 'Oppenheimer',
    original_title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster_path: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    release_date: '2023-07-21',
    vote_average: 8.1,
    vote_count: 7800,
    popularity: 640.4,
    genre_ids: [18, 36]
  },
  {
    id: 4,
    title: 'Interstellar',
    original_title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    release_date: '2014-11-07',
    vote_average: 8.4,
    vote_count: 33400,
    popularity: 580.9,
    genre_ids: [12, 18, 878]
  },
  {
    id: 5,
    title: 'Spider-Man: Across the Spider-Verse',
    original_title: 'Spider-Man: Across the Spider-Verse',
    overview: 'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. However, when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders.',
    poster_path: 'https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&auto=format&fit=crop&q=80',
    release_date: '2023-06-02',
    vote_average: 8.6,
    vote_count: 5900,
    popularity: 520.1,
    genre_ids: [16, 28, 12, 878]
  },
  {
    id: 6,
    title: 'Inception',
    original_title: 'Inception',
    overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
    poster_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
    release_date: '2010-07-16',
    vote_average: 8.3,
    vote_count: 34900,
    popularity: 490.8,
    genre_ids: [28, 878, 12, 9648]
  },
  {
    id: 7,
    title: 'Everything Everywhere All at Once',
    original_title: 'Everything Everywhere All at Once',
    overview: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.',
    poster_path: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    release_date: '2022-03-24',
    vote_average: 7.8,
    vote_count: 6500,
    popularity: 430.5,
    genre_ids: [28, 12, 878, 35]
  },
  {
    id: 8,
    title: 'The Matrix',
    original_title: 'The Matrix',
    overview: 'Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents who fight the vast and powerful computers who now rule the earth.',
    poster_path: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80',
    backdrop_path: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    release_date: '1999-03-30',
    vote_average: 8.2,
    vote_count: 24200,
    popularity: 410.2,
    genre_ids: [28, 878]
  }
];

export const getMockMovieDetails = (id: number): MovieDetails | null => {
  const movie = mockMovies.find((m) => m.id === id);
  if (!movie) return null;

  return {
    ...movie,
    genres: mockGenres.filter((g) => movie.genre_ids.includes(g.id)),
    runtime: 148,
    tagline: 'Experience it in IMAX.',
    budget: 165000000,
    revenue: 650000000,
    status: 'Released',
    credits: {
      cast: [
        {
          id: 101,
          name: 'Timothée Chalamet',
          character: 'Paul Atreides',
          profile_path: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
          order: 0
        },
        {
          id: 102,
          name: 'Zendaya',
          character: 'Chani',
          profile_path: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
          order: 1
        },
        {
          id: 103,
          name: 'Christian Bale',
          character: 'Bruce Wayne / Batman',
          profile_path: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
          order: 2
        },
        {
          id: 104,
          name: 'Heath Ledger',
          character: 'Joker',
          profile_path: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
          order: 3
        }
      ],
      crew: [
        {
          id: 201,
          name: 'Denis Villeneuve',
          job: 'Director',
          department: 'Directing',
          profile_path: null
        },
        {
          id: 202,
          name: 'Christopher Nolan',
          job: 'Director',
          department: 'Directing',
          profile_path: null
        }
      ]
    },
    videos: {
      results: [
        {
          id: 'v1',
          key: 'dQw4w9WgXcQ', // Placeholder trailer key (Rickroll as trailer!)
          name: 'Official Trailer',
          site: 'YouTube',
          type: 'Trailer',
          official: true
        }
      ]
    }
  };
};
