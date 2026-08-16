import MovieCard from "../MovieCard/MovieCard.jsx";

export default function MovieList({ movies }) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[20px] w-full mb-[80px] font-mono">
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
}
