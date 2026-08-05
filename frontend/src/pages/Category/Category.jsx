import { useParams } from "react-router-dom";
import { movies } from "../../data/movies.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

function Category() {
  const { name } = useParams();
  const filteredMovies = movies.filter((movie) => movie.genre.includes(name));
  return (
    <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border font-mono text-left">
      <h2 className="mb-5 mt-0 text-[30px] font-bold">Phim {name} mới</h2>
      <MovieList movies={filteredMovies} />
    </div>
  );
}
export default Category;
