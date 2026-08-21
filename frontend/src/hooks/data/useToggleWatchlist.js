import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../service/watchlistService.js";
import { useWatchList } from "./useWatchList.js";
import { formatMovieForWatchlist } from "../../utils/formatTrailerUtils.js";

export function useToggleWatchlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { watchlistData = [] } = useWatchList();
  const queryKey = ["watchlist", user?.id];

  const mutation = useMutation({
    // A. API Call (Passes movie.id to server)
    mutationFn: ({ movie, isBookmarked }) =>
      isBookmarked ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id),

    // ⚡ STEP 1: Runs INSTANTLY (0ms)
    onMutate: async ({ movie, isBookmarked }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousWatchlist = queryClient.getQueryData(queryKey) || [];
      // 2. Compute new watchlist array
      const updatedWatchlist = isBookmarked
        ? previousWatchlist.filter((item) => item.id !== movie.id)
        : [movie, ...previousWatchlist];
      // 3. Set new watchlist directly!
      queryClient.setQueryData(queryKey, updatedWatchlist);
      return { previousWatchlist };
    },

    onError: (err, variables, context) => {
      if (context?.previousWatchlist) {
        queryClient.setQueryData(queryKey, context.previousWatchlist);
      }
      throw err; // Re-throw the error to be caught in the component
    },
  });
  const isBookmarked = (movieId) =>
    watchlistData.some((item) => item.id === movieId);
  console.log("Current watchlist:", watchlistData);

  const handleToggle = (movie, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    mutation.mutate({
      movie: formatMovieForWatchlist(movie),
      isBookmarked: isBookmarked(movie.id),
    });
  };

  return { handleToggle, isBookmarked, isPending: mutation.isPending };
}
