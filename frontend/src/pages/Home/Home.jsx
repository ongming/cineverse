import MovieList from "../../components/MovieList/MovieList.jsx";
import { movies } from "../../data/movies.js";
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMovieList(movies);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Đang lấy dữ liệu Trailer</div>;
  }

  return (
    <div className="home-container">
      <h2 className="movie-content-title">Danh sách Trailer phim</h2>
      <MovieList movies={movieList} />
    </div>
  );
}
export default Home;
