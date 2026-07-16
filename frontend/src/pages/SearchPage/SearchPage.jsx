import { useSearchParams } from "react-router-dom";
import { movies } from "../../data/movies.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const searchMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm),
  );
  return (
    <div className="search-page">
      <h2 className="search-page-title">Kết quả tìm kiếm cho: {searchTerm}</h2>
      <MovieList movies={searchMovies} />
    </div>
  );
}

export default SearchPage;
