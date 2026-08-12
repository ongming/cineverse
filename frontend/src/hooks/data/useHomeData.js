// hooks/data/useHomeData.js
import { useQuery } from "@tanstack/react-query";
import { movies } from "../../data/movies.js";
import { actors } from "../../data/actors.js";
import { movie_images } from "../../data/movieImages.js";

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
        };
      });

      // 2. Now Playing Movies (Direct master list)
      const nowPlaying = movies;

      // 3. Top Rated Movies (Sorted by rating descending)
      const topRated = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      // 4. Upcoming Movies
      const upcoming = movies.slice(2, 8);

      // 5. Featured Single Movie of the Week
      const featuredMovie = {
        ...movies[0],
        banner:
          movie_images.find((img) => img.movie_id === 1 && img.type === "backdrop")
            ?.file_path || movies[0].image,
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
