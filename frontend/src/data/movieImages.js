// data/movieImages.js
// Mock database records corresponding to the `movie_images` SQL table schema

export const movieImages = [
  // Movie ID 1: Dune / Avatar / Main Movies (6 Backdrops & 4 Posters)
  {
    id: 101,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.9,
    display_order: 0,
  },
  {
    id: 102,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.6,
    display_order: 1,
  },
  {
    id: 103,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.4,
    display_order: 2,
  },
  {
    id: 104,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.8,
    display_order: 3,
  },
  {
    id: 105,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.7,
    display_order: 4,
  },
  {
    id: 106,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 9.0,
    display_order: 5,
  },

  // Movie ID 1 Posters
  {
    id: 107,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop",
    type: "poster",
    width: 1000,
    height: 1500,
    vote_average: 9.1,
    display_order: 0,
  },
  {
    id: 108,
    movie_id: 1,
    file_path: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    type: "poster",
    width: 1000,
    height: 1500,
    vote_average: 8.7,
    display_order: 1,
  },

  // Movie ID 2: Titanic / Sci-Fi
  {
    id: 201,
    movie_id: 2,
    file_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 9.0,
    display_order: 0,
  },
  {
    id: 202,
    movie_id: 2,
    file_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop",
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: 8.5,
    display_order: 1,
  },
  {
    id: 203,
    movie_id: 2,
    file_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1000&auto=format&fit=crop",
    type: "poster",
    width: 1000,
    height: 1500,
    vote_average: 8.8,
    display_order: 0,
  },

  // Generic fallback generator for other movie IDs
  ...Array.from({ length: 33 }).map((_, i) => ({
    id: 300 + i,
    movie_id: i + 1,
    file_path: `https://images.unsplash.com/photo-${1534447677768 + (i * 1000)}?q=80&w=1920&auto=format&fit=crop`,
    type: "backdrop",
    width: 1920,
    height: 1080,
    vote_average: (8.0 + (i % 10) * 0.2).toFixed(1),
    display_order: 0,
  })),
];

export const movie_images = movieImages;
