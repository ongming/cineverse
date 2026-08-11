import { Link } from "react-router-dom";
import { X, Star, Film, Play, Clock } from "lucide-react";
import { getAgeBadgeStyle } from "../../components/utils/getAgeBadgeStyle.js";

export default function TrailerWatchList({
  processedMovies,
  handleRemoveMovie,
  searchQuery,
  onClearSearch,
}) {
  return (
    <div className="max-w-7xl mx-auto">
      {processedMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {processedMovies.map((movie) => (
            <div key={movie.id} className="flex flex-col group">
              {/* Poster Card Container */}
              <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#0d0e12] border border-[#222533] hover:border-amber-400/60 shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(255,184,0,0.2)]">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Age Rating Badge (Top-Left) */}
                <div
                  className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-black font-mono border backdrop-blur-md shadow-md ${getAgeBadgeStyle(
                    movie.ageRating,
                  )}`}
                >
                  {movie.ageRating || "P"}
                </div>

                {/* Delete X Button (Top-Right) */}
                <button
                  type="button"
                  onClick={(e) => handleRemoveMovie(movie.id, e)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-gray-300 hover:text-white border border-white/10 hover:border-red-500 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-110 z-10"
                  title="Xóa khỏi danh sách"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* IMDb Rating Badge (Bottom-Right) */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-amber-400/40 text-amber-400 text-[11px] font-black font-mono flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{movie.rating}</span>
                </div>

                {/* Play Overlay Button */}
                <Link
                  to={`/trailer/${movie.id}`}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,184,0,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </Link>
              </div>

              {/* Movie Details Info */}
              <div className="mt-3 text-left">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors duration-200 line-clamp-1 uppercase font-mono tracking-wide">
                  {movie.name}
                </h3>

                <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono mt-1">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-500" />
                    {movie.duration}
                  </span>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genre?.slice(0, 2).map((g) => (
                    <span
                      key={g}
                      className="px-2 py-0.5 rounded bg-[#181b26] text-gray-300 text-[10px] font-mono border border-[#272c3d]"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State Section */
        <div className="text-center py-20 px-4 ">
          <h3 className="text-xl font-bold text-white mb-2">
            Danh sách theo dõi trống!
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
            {searchQuery
              ? `Không tìm thấy phim nào khớp với từ khóa "${searchQuery}".`
              : "Bạn chưa lưu bộ phim nào. Hãy khám phá kho phim bom tấn phong phú tại CINEVERSE và nhấn lưu để xem sau."}
          </p>
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onClearSearch()}
              className="px-5 py-2.5 bg-[#1e2230] hover:bg-[#282d40] text-amber-400 font-bold text-xs rounded-xl border border-amber-400/40 transition-colors"
            >
              Xóa từ khóa tìm kiếm
            </button>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-yellow-400 text-black font-black text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:scale-105"
            >
              <Film className="w-4 h-4" />
              <span>Khám Phá Phim Ngay</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
