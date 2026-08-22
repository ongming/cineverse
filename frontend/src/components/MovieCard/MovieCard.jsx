import { Link } from "react-router-dom";
import { X, Star, Play, Clock } from "lucide-react";

export default function MovieCard({ movie, onRemove = null }) {
  return (
    <div>
      <div key={movie.id} className="flex flex-col group">
        <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#0d0e12] border border-[#222533] hover:border-cyan-400/60 shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_30px_rgba(34,211,238,0.2)]">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Delete X Button */}
          {onRemove && (
            <button
              type="button"
              onClick={(e) => onRemove(movie, e)}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-gray-300 hover:text-white border border-white/10 hover:border-red-500 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:scale-110 z-10"
              title="Xóa khỏi danh sách"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {/* Rating Badge */}
          <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded-lg border border-amber-400/40 text-amber-400 text-[11px] font-black font-mono flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{movie.vote_average || "N/A"}</span>
          </div>
          {/* Play Link Overlay */}
          <Link
            to={`/trailer/${movie.id}`}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </Link>
        </div>
        <div className="mt-3 text-left">
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-1 uppercase font-mono tracking-wide">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono mt-1">
            <span>
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "2024"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500" />
              {movie.runtime ? `${movie.runtime} Phút` : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
