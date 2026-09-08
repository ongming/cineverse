import MovieCard from "../MovieCard/MovieCard.jsx";
import PaginationControls from "../PaginationControls/PaginationControls.jsx";

export default function MovieList({
  movies,
  scrollRef,
  page,
  setPage,
  hasNextPage,
}) {
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          KHÔNG CÓ PHIM NÀO TRONG DANH SÁCH NÀY...
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 w-full mb-[80px] font-mono">
        {" "}
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <PaginationControls
        scrollRef={scrollRef}
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
        isPaged={movies.length}
      />
    </section>
  );
}
