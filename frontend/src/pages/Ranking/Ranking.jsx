import { useState } from "react";
import { Link } from "react-router-dom";
import { movies } from "../../data/movies.js";
import { Clock, Star, Bookmark, Info, Grid } from "lucide-react";

export default function Ranking() {
  const [activeGenre, setActiveGenre] = useState("");

  const uniqueGenres = [...new Set(movies.map((movie) => movie.genre).flat())];

  const filteredMovies =
    activeGenre === ""
      ? movies
      : movies.filter((movie) => movie.genre.includes(activeGenre));

  const rankedMovies = [...filteredMovies].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-10 text-white font-mono text-left">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-white mb-2">Bảng xếp hạng chung</h1>
          <p className="text-[#8a90a2] text-sm mb-8 flex items-center gap-2">
            Danh sách các phim được đánh giá cao nhất
            <span className="text-amber-400 font-semibold flex items-center gap-1 ml-2">
              <Clock className="w-3.5 h-3.5 inline" /> Updated: 24m ago
            </span>
          </p>

          <div className="flex flex-col gap-4">
            {rankedMovies.map((movie, index) => {
              const rank = index + 1;
              return (
                <div key={movie.id} className="block">
                  <Link
                    to={`/trailer/${movie.id}`}
                    className="flex items-center gap-4 bg-[#12141a] border border-white/10 rounded-xl p-4 no-underline text-inherit transition-all hover:border-amber-400 hover:-translate-y-0.5 shadow-lg group"
                  >
                    {/* Rank Badge */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 ${
                      rank === 1 ? "bg-amber-400 text-black shadow-lg shadow-amber-400/40" :
                      rank === 2 ? "bg-zinc-300 text-black" :
                      rank === 3 ? "bg-amber-700 text-white" : "bg-zinc-800 text-zinc-400"
                    }`}>
                      #{rank}
                    </div>

                    {/* Poster */}
                    <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <img src={movie.image} alt={movie.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white m-0 truncate group-hover:text-amber-400 transition-colors">{movie.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-[#8c8c8c] mt-1">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 text-white rounded text-[10px] font-bold">{movie.ageRating}</span>
                      </div>
                      <div className="text-amber-400 font-bold text-sm mt-2 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                        {movie.rating} <span className="text-zinc-600 text-xs font-normal">/ 10</span>
                      </div>
                    </div>

                    {/* Watched Action */}
                    <div
                      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white hover:bg-amber-400 hover:text-black transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Đã đánh dấu đã xem phim: ${movie.name}`);
                      }}
                    >
                      <Bookmark className="w-3.5 h-3.5" /> Lưu
                    </div>

                    <div className="text-zinc-500">
                      <Info className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
            Tải thêm xếp hạng
          </button>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-[#12141a] border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold text-sm">
              <Grid className="w-4 h-4" />
              <h3 className="m-0 text-white text-base">Thể loại</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  activeGenre === "" ? "bg-amber-400 border-amber-400 text-black" : "bg-white/5 border-white/10 text-white hover:border-amber-400"
                }`}
                onClick={() => setActiveGenre("")}
              >
                Tất Cả
              </button>
              {uniqueGenres.map((g) => (
                <button
                  key={g}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    activeGenre === g ? "bg-amber-400 border-amber-400 text-black" : "bg-white/5 border-white/10 text-white hover:border-amber-400"
                  }`}
                  onClick={() => setActiveGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
