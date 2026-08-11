import { getAgeBadgeStyle } from "../../components/utils/getAgeBadgeStyle.js";
import { Calendar, Play, Star, Clock, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrailerCard({
  filteredMovies = [],
  dateList = [],
  formatReleaseDate,
}) {
  return filteredMovies.map((movie) => (
    <div
      key={movie.id}
      className="bg-[#12141a] border border-[#222222] hover:border-cyan-neon/60 rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row group transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,229,229,0.22)]"
    >
      {/* Poster Column with Interactive Spring Overlay */}
      <div className="relative sm:w-[200px] xl:w-[220px] shrink-0 overflow-hidden bg-[#0a0b0e]">
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full min-h-[280px] sm:min-h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Age Rating Badge (C18 / T16 / T13 / P) */}
        <div
          className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-black font-mono border backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-105 ${getAgeBadgeStyle(
            movie.ageRating,
          )}`}
        >
          {movie.ageRating || "P"}
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-400/40 text-amber-400 text-xs font-bold flex items-center gap-1 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{movie.rating}</span>
        </div>

        {/* Spring Animated Play Overlay */}
        <Link
          to={`/trailer/${movie.id}`}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-cyan-neon text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,229,229,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </Link>
      </div>

      {/* Movie Details Column */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Title & Metadata */}
          <h3 className="text-xl font-black text-white group-hover:text-cyan-neon transition-colors duration-300 mb-2 tracking-wide uppercase font-mono">
            {movie.name}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {movie.duration}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              {movie.country}
            </span>
            <span>•</span>
            <span className="text-gray-300 font-semibold">{movie.year}</span>
          </div>

          {/* Genres Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {movie.genre?.map((g) => (
              <span
                key={g}
                className="px-2.5 py-0.5 rounded-md bg-[#1d212d] text-gray-300 text-xs font-medium border border-[#2b3042] transition-colors duration-200 group-hover:border-cyan-neon/30"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Release Status Banner */}
          <div className="bg-[#181c27] border border-[#2a3045] rounded-xl p-3 mb-4 transition-colors duration-300 group-hover:border-cyan-neon/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-neon">
              {movie.releaseDate <= dateList[0]?.fullFormatted ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-400">
                    Đã khởi chiếu ngày {formatReleaseDate(movie.releaseDate)}
                  </span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-cyan-neon shrink-0" />
                  <span>
                    Khởi chiếu ngày: {formatReleaseDate(movie.releaseDate)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed font-mono">
            {movie.description}
          </p>
        </div>

        {/* Action Button with Spring Feedback Animation */}
        <div className="pt-2 border-t border-[#1f222e] flex items-center justify-end">
          <Link
            to={`/trailer/${movie.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-neon/10 hover:bg-cyan-neon text-cyan-neon hover:text-black font-bold text-xs rounded-xl border border-cyan-neon/40 hover:border-cyan-neon transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Xem Chi Tiết & Trailer</span>
          </Link>
        </div>
      </div>
    </div>
  ));
}
