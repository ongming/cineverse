import MovieList from "../../components/MovieList/MovieList.jsx";
import { useSearchData } from "../../hooks/data/useSearchData.js";

function Search() {
  const {
    searchTerm,
    movies: searchMovies,
    hasNextPage,
    isLoading,
    isError,
    page,
    setPage,
  } = useSearchData();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center font-mono">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse mt-4">
          ĐANG TẢI KẾT QUẢ TÌM KIẾM CINEVERSE...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center font-mono">
        <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wider">
          LỖI KHI TẢI KẾT QUẢ TÌM KIẾM
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Vui lòng kiểm tra kết nối và thử lại sau.
        </p>
      </div>
    );
  }

  return (
    <div className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen font-mono text-left box-border">
      <h2 className="mb-5 mt-0 text-[30px] font-bold">
        Kết quả tìm kiếm cho: {searchTerm}
      </h2>
      <MovieList
        movies={searchMovies}
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}

export default Search;
