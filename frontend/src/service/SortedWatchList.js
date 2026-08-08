export default function SortedWatchList(watchlist, userId) {
  const userWatchlist = watchlist.filter((item) => item.user_id === userId);
  return userWatchlist;
}
