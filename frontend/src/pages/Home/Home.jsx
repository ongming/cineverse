import MovieList from "../../components/MovieList/MovieList.jsx";
import { movies } from "../../data/movies.js";
import { useState } from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <h2 className="movie-content-title">Danh sách Trailer phim</h2>
      <MovieList movies={movies} />
    </div>
  );
}
export default Home;
