// pages/Home/MovieCardHover.jsx
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Play } from "lucide-react";

export default function MovieCardHover({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const hoverTimerRef = useRef(null);

  return (
    <div className="group relative w-full aspect-[2/3] bg-[#12141a] border border-[#222533] hover:border-amber-400 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between select-none cursor-pointer">
      <Link
        to={`/trailer/${movie.id}`}
        className="w-full h-full block relative"
      >
        <img
          src={movie.poster_path}
          alt={movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-md border border-white/10 text-amber-400 text-[10px] font-mono font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400" />
          {movie.vote_average ? movie.vote_average: "N/A"}
        </div>

        <div
          className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent z-20 transition-opacity ${
            showTrailer ? "opacity-0" : "opacity-100"
          }`}
        >
          <h3 className="text-xs font-bold text-white font-mono uppercase line-clamp-1 group-hover:text-amber-400 transition-colors m-0">
            {movie.name}
          </h3>
          <p className="text-[10px] font-mono text-gray-400 m-0 mt-0.5">
            {movie.year} • {movie.duration || "Phim điện ảnh"}
          </p>
        </div>
      </Link>
    </div>
  );
}
