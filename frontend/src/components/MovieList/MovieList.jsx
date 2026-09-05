import MovieCard from "../MovieCard/MovieCard.jsx";
import PaginationControls from "../PaginationControls/PaginationControls.jsx";

export default function MovieList({ movies, scrollRef, page, setPage, hasNextPage }) {
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
        hasMore={hasNextPage !== undefined ? !hasNextPage : movies.length < 20}
      />
    </section>
  );
}
