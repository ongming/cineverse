import { useSearchParams } from "react-router-dom";
import { movies } from "../../data/movies.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

function Search() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const searchMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border font-mono text-left">
      <h2 className="mb-5 mt-0 text-[30px] font-bold">Kết quả tìm kiếm cho: {searchTerm}</h2>
      <MovieList movies={searchMovies} />
    </div>
  );
}

export default Search;
