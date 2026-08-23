const movieModel = require("./movie.model");
const NotFoundError = require("../../errors/NotFoundError");

const IMAGE_BASE_W1280 = "https://image.tmdb.org/t/p/w1280";
const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_WATCH_BASE = "https://www.youtube.com/watch?v=";

const formatUrl = (path, baseUrl) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
};

const getPopularMovies = async () => {
  const popularMovies = await movieModel.findPopularMovies();
  if (!popularMovies || popularMovies.length === 0) {
    throw new NotFoundError("No popular movies found");
  }

  return popularMovies.map((movie) => {
    const fullBanner = formatUrl(movie.banner, IMAGE_BASE_W1280);

    return {
      ...movie,
      name: movie.title,
      banner: fullBanner,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

const getNowPlayingMovies = async (page) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const PAGE_SIZE = 18;
  const FETCH_LIMIT = PAGE_SIZE + 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const rawRows = await movieModel.findNowPlayingMovies({ limit: FETCH_LIMIT, offset });
  if (!rawRows) {
    throw new NotFoundError("No now playing movies found");
  }

  const hasNextPage = rawRows.length > PAGE_SIZE;
  const slicedMovies = hasNextPage ? rawRows.slice(0, PAGE_SIZE) : rawRows;

  const movies = slicedMovies.map((movie) => ({
    ...movie,
    name: movie.title,
    poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
    trailerKey: movie.youtube_key
      ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
      : null,
  }));

  return { movies, hasNextPage };
};

const getUpcomingMovies = async (page) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const PAGE_SIZE = 18;
  const FETCH_LIMIT = PAGE_SIZE + 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const rawRows = await movieModel.findUpcomingMovies({ limit: FETCH_LIMIT, offset });
  if (!rawRows) {
    throw new NotFoundError(`No upcoming movies found`);
  }

  const hasNextPage = rawRows.length > PAGE_SIZE;
  const slicedMovies = hasNextPage ? rawRows.slice(0, PAGE_SIZE) : rawRows;

  const movies = slicedMovies.map((movie) => ({
    ...movie,
    name: movie.title,
    poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
    trailerKey: movie.youtube_key
      ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
      : null,
  }));

  return { movies, hasNextPage };
};

const getTopRatedMovies = async (genreId) => {
  const topRatedMovies = await movieModel.findTopRatedMovies(genreId);
  if (!topRatedMovies) {
    throw new NotFoundError(`No top rated movies found`);
  }

  return topRatedMovies.map((movie) => {
    const fullBanner = formatUrl(movie.banner, IMAGE_BASE_W1280);
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);
    return {
      ...movie,
      name: movie.title,
      banner: fullBanner,
      poster_path: fullPoster,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

const getMovieDetailsById = async (movieId) => {
  const movieDetails = await movieModel.findMovieDetailsById(movieId);
  if (!movieDetails) {
    throw new NotFoundError(`Movie with ID ${movieId} not found`);
  }
  const TrailerImage = movieDetails.images.map((image) => {
      return formatUrl(image.file_path, IMAGE_BASE_W1280);
  });
  const actorImages = movieDetails.cast_members.map((actor) => ({
    ...actor,
    profile_path: formatUrl(actor.profile_path, IMAGE_BASE_W500),
  }));
  return {
    ...movieDetails,  
    name: movieDetails.title,
    images: TrailerImage,
    cast_members: actorImages,
    director_path: formatUrl(movieDetails.director_path, IMAGE_BASE_W500),
    trailerKey: movieDetails.trailers[0]?.youtube_key
      ? movieDetails.trailers[0].youtube_key
      : null,
  };
};

const getMovieOverviewStats = async () => {
  return await movieModel.findMovieOverviewStats();
};

const searchMovies = async (query) => {
  const movies = await movieModel.findMoviesBySearch(query);
  return movies.map((movie) => {
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);
    return {
      ...movie,
      name: movie.title,
      poster_path: fullPoster,
    };
  });
};

const getSimilarMovies = async (movieId) => {
  const similarMovies = await movieModel.findSimilarMovies(movieId);
  if (!similarMovies) {
    throw new NotFoundError(`No similar movies found for movie ID ${movieId}`);
  }

  return similarMovies.map((movie) => {
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);
    return {
      ...movie,
      poster_path: fullPoster,
    };
  });
};

const getMoviesByGenre = async ({ genreName, genreId, page }) => {
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const PAGE_SIZE = 18;
  const FETCH_LIMIT = PAGE_SIZE + 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const rawRows = await movieModel.findMoviesByGenre({
    genreName,
    genreId,
    limit: FETCH_LIMIT,
    offset,
  });

  const hasNextPage = rawRows.length > PAGE_SIZE;
  const slicedMovies = hasNextPage ? rawRows.slice(0, PAGE_SIZE) : rawRows;

  const movies = slicedMovies.map((movie) => ({
    ...movie,
    name: movie.title,
    poster_path: formatUrl(movie.poster_path, IMAGE_BASE_W500),
  }));

  return { movies, hasNextPage };
};

module.exports = {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  getMovieDetailsById,
  getMovieOverviewStats,
  searchMovies,
  getSimilarMovies,
  getMoviesByGenre,
};