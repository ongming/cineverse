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
      name: movie.title || movie.name,
      banner: fullBanner,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

const getNowPlayingMovies = async () => {
  const nowPlayingMovies = await movieModel.findNowPlayingMovies();
  if (!nowPlayingMovies) {
    throw new NotFoundError("No now playing movies found");
  }
  return nowPlayingMovies.map((movie) => {
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);

    return {
      ...movie,
      name: movie.title || movie.name,
      poster_path: fullPoster,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

const getUpcomingMovies = async (id) => {
  const upcomingMovies = await movieModel.findUpcomingMovies();
  if (!upcomingMovies) {
    throw new NotFoundError(`No upcoming movies found`);
  }

  return upcomingMovies.map((movie) => {
    const fullPoster = formatUrl(movie.poster_path, IMAGE_BASE_W500);
    return {
      ...movie,
      name: movie.title || movie.name,
      poster_path: fullPoster,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

const getTopRatedMovies = async () => {
  const topRatedMovies = await movieModel.findTopRatedMovies();
  if (!topRatedMovies) {
    throw new NotFoundError(`No top rated movies found`);
  }

  return topRatedMovies.map((movie) => {
    const fullBanner = formatUrl(movie.banner, IMAGE_BASE_W1280);

    return {
      ...movie,
      name: movie.title || movie.name,
      banner: fullBanner,
      trailerKey: movie.youtube_key
        ? movie.youtube_key.replace(YOUTUBE_WATCH_BASE, "")
        : null,
    };
  });
};

module.exports = {
  getPopularMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
};
