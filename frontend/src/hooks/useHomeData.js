// hooks/useHomeData.js
import { useQuery } from "@tanstack/react-query";
import { movies } from "../data/movies.js";
import { actors } from "../data/actors.js";
import { movie_images } from "../data/movieImages.js";

// Helper to reliably extract YouTube key or provide working fallback
const getTrailerKey = (movie) => {
  if (!movie || !movie.trailerUrl) return "dQw4w9WgXcQ";
  if (movie.trailerUrl.includes("v=")) {
    return movie.trailerUrl.split("v=")[1]?.split("&")[0] || "dQw4w9WgXcQ";
  }
  if (movie.trailerUrl.includes("youtu.be/")) {
    return movie.trailerUrl.split("youtu.be/")[1]?.split("?")[0] || "dQw4w9WgXcQ";
  }
  const parts = movie.trailerUrl.split("/");
  return parts[parts.length - 1] || "dQw4w9WgXcQ";
};

const fetchHomeData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 1. Hero Showcase Movies (6 Movies with backdrop images)
      const heroMovies = movies.slice(0, 6).map((m) => {
        const backdropObj = movie_images.find(
          (img) => img.movie_id === m.id && img.type === "backdrop"
        );
        return {
          ...m,
          banner: backdropObj?.file_path || m.image,
          trailerKey: getTrailerKey(m),
        };
      });

      // 2. Now Playing Movies
      const nowPlaying = movies.map((m) => ({
        ...m,
        trailerKey: getTrailerKey(m),
      }));

      // 3. Top Rated Movies (Sorted by rating descending)
      const topRated = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map((m) => ({
          ...m,
          trailerKey: getTrailerKey(m),
        }));

      // 4. Upcoming Movies
      const upcoming = movies.slice(2, 8).map((m) => ({
        ...m,
        trailerKey: getTrailerKey(m),
      }));

      // 5. Featured Single Movie of the Week
      const featuredMovie = {
        ...movies[0],
        banner:
          movie_images.find((img) => img.movie_id === 1 && img.type === "backdrop")
            ?.file_path || movies[0].image,
        trailerKey: getTrailerKey(movies[0]),
      };

      // 6. Popular Actors List
      const popularActors = actors.slice(0, 10);

      // 7. Platform Key Stats
      const stats = {
        totalMovies: 1240,
        totalActors: 8500,
        userReviews: 45200,
        lastUpdated: "Vừa xong",
      };

      resolve({
        heroMovies,
        nowPlaying,
        topRated,
        upcoming,
        featuredMovie,
        popularActors,
        stats,
      });
    }, 300);
  });
};

export function useHomeData() {
  return useQuery({
    queryKey: ["home-data"],
    queryFn: fetchHomeData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}
