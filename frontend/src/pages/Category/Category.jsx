import { useParams } from "react-router-dom";
import { movies } from "../../data/movies.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import "./Category.css";

function Category() {
  const { name } = useParams();
  const filteredMovies = movies.filter((movie) => movie.genre.includes(name));
  return (
    <div className="category-page">
      <h2 className="category-page-title">Phim {name} mới</h2>
      <MovieList movies={filteredMovies} />
    </div>
  );
}
export default Category;
