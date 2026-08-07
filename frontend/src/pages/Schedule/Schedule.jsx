import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../data/movies.js";
import { Calendar, Play, Star, Clock, Globe, Sparkles } from "lucide-react";

export default function Schedule() {
  const [selectedDateIndex, setSelectedDateIndex] = useState("ALL");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Dynamic Date List (Hôm nay, Mới, T6, T7, CN, T2, T3)
  const dateList = useMemo(() => {
    const days = [];
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const dayNum = String(d.getDate()).padStart(2, "0");
      const monthNum = String(d.getMonth() + 1).padStart(2, "0");
      const formatted = `${dayNum}/${monthNum}`;
      const dayOfWeek = dayNames[d.getDay()];

      let badge = "";
      if (i === 0) badge = "Hôm nay";
      else if (i === 1) badge = "Mới";
      else badge = dayOfWeek;

      days.push({
        index: i,
        badge,
        dayOfWeek,
        formatted,
      });
    }
    return days;
  }, []);

  // Format age rating badge color
  const getAgeBadgeStyle = (ageRating) => {
    switch (ageRating) {
      case "T18":
      case "C18":
        return "bg-red-950/80 text-red-400 border-red-500/60";
      case "T16":
      case "C16":
        return "bg-amber-950/80 text-amber-400 border-amber-500/60";
      case "T13":
      case "C13":
        return "bg-yellow-950/80 text-yellow-300 border-yellow-500/60";
      default:
        return "bg-cyan-950/80 text-cyan-300 border-cyan-500/60";
    }
  };

  // Filter movies by Selected Date & Filter Category
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (activeFilter === "NOW_SHOWING") {
      result = result.filter((m) => m.year >= 2022);
    } else if (activeFilter === "UPCOMING") {
      result = result.filter((m) => m.year >= 2024 || m.rating >= 8.8);
    } else if (activeFilter === "TOP_RATED") {
      result = result.filter((m) => m.rating >= 8.5);
    }

    if (selectedDateIndex !== "ALL") {
      // Pick a deterministic subset per date index for realistic schedule feel
      result = result.filter((m) => (m.id + selectedDateIndex) % 2 === 0);
    }

    return result;
  }, [activeFilter, selectedDateIndex]);

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-cyan-neon/10 rounded-xl border border-cyan-neon/30 text-cyan-neon">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-cyan-neon text-sm font-semibold tracking-wider uppercase font-mono">
            CINEVERSE CALENDAR
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white mb-3 font-sans">
          Lịch Khởi Chiếu Phim
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-sans">
          Cập nhật danh sách phim bom tấn mới nhất sắp khởi chiếu & đang công chiếu với chất lượng điện ảnh đỉnh cao tại CINEVERSE.
        </p>
      </div>

      {/* Date Picker Component (CHỌN NGÀY) */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-[#12141a] border border-[#222222] rounded-2xl p-5 shadow-2xl">
          <div className="text-xs font-bold text-cyan-neon uppercase tracking-widest mb-4 font-mono">
            CHỌN NGÀY CHIẾU
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {/* Tất Cả */}
            <button
              type="button"
              onClick={() => setSelectedDateIndex("ALL")}
              className={`min-w-[100px] py-3 px-4 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 ${
                selectedDateIndex === "ALL"
                  ? "bg-cyan-neon/15 border-cyan-neon text-cyan-neon shadow-[0_0_15px_rgba(0,229,229,0.3)] scale-105"
                  : "bg-[#181a22] border-[#292d3e] text-gray-300 hover:bg-[#222533] hover:text-white"
              }`}
            >
              <span className="text-[11px] font-semibold text-gray-400 mb-0.5">
                Tất cả
              </span>
              <span className="text-sm font-black font-mono">LỊCH PHIM</span>
            </button>

            {/* Dynamic Date Buttons */}
            {dateList.map((item) => {
              const isSelected = selectedDateIndex === item.index;
              return (
                <button
                  key={item.formatted}
                  type="button"
                  onClick={() => setSelectedDateIndex(item.index)}
                  className={`min-w-[110px] py-3 px-4 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-cyan-neon/15 border-cyan-neon text-cyan-neon shadow-[0_0_15px_rgba(0,229,229,0.3)] scale-105"
                      : "bg-[#181a22] border-[#292d3e] text-gray-400 hover:bg-[#222533] hover:text-white"
                  }`}
                >
                  <span className="text-[11px] font-semibold text-gray-400 mb-0.5">
                    {item.badge}
                  </span>
                  <span className="text-sm font-black font-mono tracking-tight text-white">
                    {item.index > 1 ? `${item.dayOfWeek} ${item.formatted}` : item.formatted}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveFilter("ALL")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeFilter === "ALL"
                ? "bg-cyan-neon text-black shadow-[0_0_15px_rgba(0,229,229,0.4)] scale-105"
                : "bg-[#1f222e] text-gray-300 hover:bg-[#2a2e3f] hover:text-white border border-[#2e3346]"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Tất Cả Phim
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("NOW_SHOWING")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeFilter === "NOW_SHOWING"
                ? "bg-cyan-neon text-black shadow-[0_0_15px_rgba(0,229,229,0.4)] scale-105"
                : "bg-[#1f222e] text-gray-300 hover:bg-[#2a2e3f] hover:text-white border border-[#2e3346]"
            }`}
          >
            🔥 Đang Công Chiếu
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("UPCOMING")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeFilter === "UPCOMING"
                ? "bg-cyan-neon text-black shadow-[0_0_15px_rgba(0,229,229,0.4)] scale-105"
                : "bg-[#1f222e] text-gray-300 hover:bg-[#2a2e3f] hover:text-white border border-[#2e3346]"
            }`}
          >
            🗓️ Phim Mới & Sắp Chiếu
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter("TOP_RATED")}
            className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              activeFilter === "TOP_RATED"
                ? "bg-cyan-neon text-black shadow-[0_0_15px_rgba(0,229,229,0.4)] scale-105"
                : "bg-[#1f222e] text-gray-300 hover:bg-[#2a2e3f] hover:text-white border border-[#2e3346]"
            }`}
          >
            ⭐ Đánh Giá Cao (IMDb 8.5+)
          </button>
        </div>
      </div>

      {/* Movies Grid Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-[#12141a] border border-[#222222] hover:border-cyan-neon/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,229,229,0.15)]"
            >
              {/* Poster Column with Age Rating Badge */}
              <div className="relative sm:w-[200px] xl:w-[220px] shrink-0 overflow-hidden bg-[#0a0b0e]">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full min-h-[280px] sm:min-h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Age Rating Badge (C18 / T16 / T13 / P) */}
                <div
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-black font-mono border backdrop-blur-md shadow-lg ${getAgeBadgeStyle(
                    movie.ageRating
                  )}`}
                >
                  {movie.ageRating || "P"}
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/40 text-amber-400 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              {/* Movie Details Column */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Title & Metadata */}
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-neon transition-colors duration-300 mb-2 tracking-wide uppercase font-sans">
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
                    {movie.genre.map((g) => (
                      <span
                        key={g}
                        className="px-2.5 py-0.5 rounded-md bg-[#1d212d] text-gray-300 text-xs font-medium border border-[#2b3042]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Release Status Banner */}
                  <div className="bg-[#181c27] border border-[#2a3045] rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-neon">
                      {movie.year >= 2024 ? (
                        <>
                          <Calendar className="w-4 h-4 text-cyan-neon shrink-0" />
                          <span>🗓️ Khởi chiếu: Tháng {movie.id % 12 + 1}/2026</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="text-amber-400">🔥 Đang công chiếu tại CINEVERSE</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed font-sans">
                    {movie.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-2 border-t border-[#1f222e] flex items-center justify-end">
                  <Link
                    to={`/trailer/${movie.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-neon/10 hover:bg-cyan-neon text-cyan-neon hover:text-black font-bold text-xs rounded-xl border border-cyan-neon/40 hover:border-cyan-neon transition-all duration-300 group/btn shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Xem Chi Tiết & Trailer</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
