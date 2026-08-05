import { useAuth } from "../../context/AuthContext.jsx";
import { movies } from "../../data/movies.js";
import { Link } from "react-router-dom";
import { Film, Play, Star } from "lucide-react";

export default function WatchList() {
  const { user } = useAuth();
  const savedMovies = movies.slice(0, 3);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-[40px] min-h-[calc(100vh-160px)] text-white">
      <div className="mb-9 text-left">
        <h1 className="text-3xl font-extrabold mb-2 flex items-center gap-2">
          <Film className="w-8 h-8 text-amber-400" />
          Danh Sách Xem Của <span className="text-amber-400">{user?.username || "Bạn"}</span>
        </h1>
        <p className="text-[#8a90a2] text-sm">
          Các bộ phim và trailer bạn đã lưu để xem lại sau.
        </p>
      </div>

      {savedMovies.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {savedMovies.map((movie) => (
            <div key={movie.id} className="group bg-[#12141a]/80 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-amber-400/40">
              <div className="relative w-full pt-[140%] overflow-hidden">
                <img className="absolute top-0 left-0 w-full h-full object-cover" src={movie.image} alt={movie.name} />
                <Link
                  to={`/trailer/${movie.id}`}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 bg-gradient-to-r from-amber-400 to-yellow-400 text-black px-4.5 py-2.5 rounded-full font-bold text-xs no-underline opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_15px_rgba(255,184,0,0.5)] flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Xem Ngay
                </Link>
              </div>
              <div className="p-3.5 text-left">
                <h3 className="text-sm font-bold m-0 text-white">{movie.name}</h3>
                <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                  <span>{movie.year}</span> • <Star className="w-3 h-3 fill-amber-400 inline" /> <span>{movie.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-15 bg-[#12141a]/50 rounded-2xl border border-dashed border-white/10">
          <p className="text-[#8a90a2] text-base mb-5">Danh sách của bạn đang trống!</p>
          <Link to="/" className="inline-block px-6 py-2.5 bg-amber-400 text-black font-bold rounded-lg no-underline hover:bg-yellow-400 transition-colors">
            Khám phá phim ngay
          </Link>
        </div>
      )}
    </div>
  );
}
