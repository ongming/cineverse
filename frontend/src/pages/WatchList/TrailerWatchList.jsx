import { memo } from "react";
import { Link } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";

function TrailerWatchList({
  processedMovies = [],
  handleRemoveMovie,
  searchQuery = "",
  onClearSearch,
  suggestedMovies = [],
  page,
  setPage,
  hasNextPage,
}) {
  return (
    <div className="max-w-7xl mx-auto">
      {processedMovies.length > 0 ? (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {processedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={(movieItem, e) => handleRemoveMovie(movieItem, e)}
            />
          ))}
        </div>
      ) : (
        /* Empty State Section - Exactly Matching Screenshot */
        <div className="space-y-12 py-2">
          {/* Main Empty Box with 3D Slanted Card Background Tiles */}
          <div className="relative overflow-hidden py-20 px-6 text-center">
            {/* Background 3D Angled Movie Card Tiles Pattern (Matching Picture!) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden select-none flex items-center justify-center">
              <div className="flex gap-3 rotate-6 scale-140 -translate-y-4">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className="w-44 h-64 rounded-lg bg-gradient-to-b from-white/10 to-white/2 shadow-2xl backdrop-blur-sm"
                  />
                ))}
              </div>
            </div>

            {/* Center Motif Emblem (Clapperboard with pencil icon) */}
            <div className="relative z-10 mb-5 flex justify-center">
              <div className="relative">
                <Clapperboard className="w-24 h-24 text-gray-400/30 stroke-[1.2]" />
              </div>
            </div>

            {/* Empty State Text */}
            <div className="relative z-10 max-w-md mx-auto space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-sans">
                {searchQuery
                  ? "Không tìm thấy phim phù hợp!"
                  : "Danh sách của bạn đang trống"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-normal">
                {searchQuery
                  ? `Không tìm thấy bộ phim nào matching với từ khóa "${searchQuery}".`
                  : "Bắt đầu xây dựng bộ sưu tập điện ảnh của riêng bạn bằng cách thêm những bộ phim yêu thích."}
              </p>

              {/* Cyan Rounded Pill Button (Matching Picture) */}
              <div className="pt-4">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => onClearSearch()}
                    className="px-6 py-2.5 bg-[#171a26] hover:bg-[#202536] text-cyan-400 font-bold text-xs rounded-full border border-cyan-400/40 transition-all cursor-pointer shadow-lg active:scale-95 font-sans"
                  >
                    Xóa từ khóa tìm kiếm
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#38e8d8] hover:bg-[#2dd4c4] text-black font-extrabold text-sm rounded-full transition-all shadow-[0_0_25px_rgba(56,232,216,0.4)] hover:scale-105 active:scale-95 no-underline font-sans"
                  >
                    Khám Phá Phim Ngay
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Suggested Movies Section (Matching Picture Exactly!) */}
          {!searchQuery && (
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-wide font-sans">
                  Gợi Ý Cho Bạn
                </h3>
              </div>

              {/* 4 Vertical Movie Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {suggestedMovies?.slice(0, 4).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onRemove={null} // No remove button for suggested movies
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <PaginationControls
        page={page}
        setPage={setPage}
        hasMore={!hasNextPage}
        isPaged={processedMovies.length}
      />
    </div>
  );
}

export default memo(TrailerWatchList);
