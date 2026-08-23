import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useCategoryMovies } from "../../hooks/data/useCategory.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";

export default function Category() {
  const { name } = useParams();
  const decodedName = name ? decodeURIComponent(name) : "";

  const [page, setPage] = useState(1);
  const TopRef = useRef(null);

  // 🟢 Reset page to 1 whenever category URL name changes
  useEffect(() => {
    setPage(1);
  }, [name]);

  // 🟢 Smoothly scroll to top of Category page when `page` changes
  useEffect(() => {
    if (page > 1) {
      TopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [page]);

  // 🟢 Fetch real movies by Category/Genre with pagination from PostgreSQL
  const { data: categoryData, isLoading, isError, refetch } = useCategoryMovies({
    genreName: decodedName,
    page: page,
  });

  const { movies = [], hasNextPage = false } = categoryData || {};

  // 🟢 Sanitize Title: Prevents duplication
  const displayTitle = decodedName.startsWith("Phim ")
    ? `${decodedName} mới`
    : `Phim ${decodedName} mới`;

  if (isLoading) {
    return <LoadingState message={`ĐANG TẢI DANH SÁCH ${displayTitle.toUpperCase()}...`} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Lỗi tải thể loại phim!"
        message={`Có lỗi xảy ra khi tải danh sách phim ${displayTitle}.`}
        onRetry={refetch}
      />
    );
  }

  return (
    <div
      ref={TopRef}
      className="px-[clamp(10px,5vw,100px)] pt-5 pb-[50px] bg-[#080808] text-white min-h-screen box-border font-mono text-left"
    >
      <h2 className="mb-5 mt-0 text-[30px] font-bold tracking-tight uppercase font-mono">
        {displayTitle}
      </h2>

      {movies.length === 0 ? (
        <div className="w-full min-h-[300px] text-gray-400 font-mono text-sm flex items-center justify-center">
          Chưa có phim nào thuộc thể loại này trong hệ thống.
        </div>
      ) : (
        <>
          <MovieList movies={movies} />
          {/* 🟢 Pagination Controls for Category Page */}
          <PaginationControls
            scrollRef={TopRef}
            page={page}
            setPage={setPage}
            hasMore={!hasNextPage}
          />
        </>
      )}
    </div>
  );
}
