export const formatMovieForWatchlist = (movie) => ({
  id: movie.id,
  title: movie.title || movie.name,
  poster_path: "https://image.tmdb.org/t/p/w500" + (movie.poster_path || movie.image),
  vote_average: movie.vote_average,
  runtime: movie.runtime || movie.duration,
  release_date: movie.release_date || movie.year,
  created_at: movie.created_at || new Date(),
});
