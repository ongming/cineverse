import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../../service/watchlistService.js";
import { useWatchListIds } from "./useWatchListIds.js";
import { formatMovieForWatchlist } from "../../utils/formatTrailerUtils.js";

export function useToggleWatchlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: watchlistIds = [] } = useWatchListIds();

  const mutation = useMutation({
    // A. API Call (Passes movie.id to server)
    mutationFn: ({ movie, isBookmarked }) =>
      isBookmarked ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id),

    // ⚡ STEP 1: Runs INSTANTLY (0ms)
    onMutate: async ({ movie, isBookmarked }) => {
      await queryClient.cancelQueries({
        queryKey: ["watchlist-ids", user?.id],
      });
      await queryClient.cancelQueries({ queryKey: ["watchlist"] });

      const previousIds =
        queryClient.getQueryData(["watchlist-ids", user?.id]) || [];

      // ⚡ 1. Update lightweight ID array (Powers yellow/white icons globally in 0ms!)
      queryClient.setQueryData(
        ["watchlist-ids", user?.id],
        isBookmarked
          ? previousIds.filter((id) => id !== movie.id)
          : [movie.id, ...previousIds]
      );

      // ⚡ 2. Update main Watchlist Page grid cache directly (0ms!)
      queryClient.setQueriesData(
        { queryKey: ["watchlist"] },
        (oldData) => {
          if (!oldData) return { watchlist: [], hasNextPage: false };
          const currentList = Array.isArray(oldData) ? oldData : (oldData.watchlist || []);
          const updatedList = isBookmarked
            ? currentList.filter((item) => item.id !== movie.id)
            : [movie, ...currentList].slice(0, 18);

          return Array.isArray(oldData)
            ? updatedList
            : { ...oldData, watchlist: updatedList };
        }
      );

      return { previousIds };
    },

    onError: (err, variables, context) => {
      if (context?.previousIds) {
        queryClient.setQueryData(
          ["watchlist-ids", user?.id],
          context.previousIds
        );
      }
    },

    // 🟢 200ms Background Sync Phase after POST/DELETE HTTP request completes:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      queryClient.invalidateQueries({ queryKey: ["watchlist-ids"] });
    },
  });

  const isBookmarked = (movieId) => watchlistIds.includes(movieId);

  const handleToggle = (movie, e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
      e.stopPropagation();
    }
    const formattedMovie = formatMovieForWatchlist(movie);
    mutation.mutate({
      movie: formattedMovie,
      isBookmarked: isBookmarked(formattedMovie.id),
    });
  };

  return { handleToggle, isBookmarked, isPending: mutation.isPending };
}
