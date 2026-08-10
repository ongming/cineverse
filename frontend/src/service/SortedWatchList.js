import { movies } from "../data/movies.js";

export default function SortedWatchList(watchlist, userId) {
  const userWatchlist = watchlist.filter((item) => item.user_id === userId);

  // Map DB records to full movie objects from movies.js
  const trailerWatchlist = () => {
    if (!userWatchlist || !movies) return [];
    return userWatchlist
      .map((item) => {
        const movieObj = movies.find((m) => m.id === item.movie_id);
        if (!movieObj) return null;
        return {
          ...movieObj,
          watchlistId: item.id,
          created_at: item.created_at,
        };
      })
      .filter(Boolean);
  };

  return trailerWatchlist();
}
