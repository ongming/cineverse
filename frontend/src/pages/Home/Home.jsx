import MovieList from "../../components/MovieList/MovieList.jsx";
import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies.jsx";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const { data: movies, isLoading, isError } = useMovies();

  useEffect(() => {
    if (movies) {
      setMovieList(movies);
    }
  }, [movies]);

  if (isLoading) {
    return (
      <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border mt-0 font-mono text-xl font-bold flex items-center justify-center">
        Đang lấy dữ liệu Trailer...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border mt-0 font-mono text-xl font-bold flex items-center justify-center">
        Lỗi khi lấy dữ liệu Trailer. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border mt-0 font-mono">
      <h2 className="mb-5 mt-0 text-[30px] font-bold">
        Danh sách Trailer phim
      </h2>
      <MovieList movies={movieList} />
    </div>
  );
}

export default Home;
