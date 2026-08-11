// pages/Home/FeaturedBanner.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Star, Sparkles } from "lucide-react";

export default function FeaturedBanner({ movie }) {
  if (!movie) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-mono text-left"
    >
      <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-[#222533] group select-none">
        {/* Background Image with Hover Scale Zoom */}
        <img
          src={movie.banner || movie.image}
          alt={movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent w-full sm:w-2/3" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content Details */}
        <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center items-start max-w-xl z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-400 text-black font-extrabold text-[11px] font-mono rounded-full uppercase flex items-center gap-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-black" /> ĐANG HOT TUẦN NÀY
            </span>
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 font-bold text-xs rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {movie.rating} TMDb
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white font-mono uppercase tracking-tight mb-2 line-clamp-1 drop-shadow-lg">
            {movie.name}
          </h2>

          <p className="text-xs text-gray-300 font-mono leading-relaxed line-clamp-2 mb-6">
            {movie.description}
          </p>

          <Link
            to={`/trailer/${movie.id}`}
            className="py-3 px-6 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-cyan-400/20 active:scale-95 no-underline"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>XEM TRAILER NGAY</span>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
