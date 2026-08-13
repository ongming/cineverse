// pages/Home/BentoGrid.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Award, ChevronRight } from "lucide-react";

export default function BentoGrid({ movies}) {

  const mainMovie = movies[0];
  const sideMovies = movies.slice(1, 5);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-mono text-left"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-white font-mono uppercase tracking-wide flex items-center gap-2 m-0">
          <Award className="w-5 h-5 text-amber-400" />
          ĐÁNH GIÁ CAO NHẤT
        </h2>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[500px]">
        {/* Large Featured Card (Span 2x2) */}
        {mainMovie && (
          <Link
            to={`/trailer/${mainMovie.id}`}
            className="col-span-2 row-span-2 relative rounded-lg overflow-hidden border border-[#222533] hover:border-amber-400 group transition-all shadow-2xl block aspect-[16/9] md:aspect-auto"
          >
            <img
              src={mainMovie.banner }
              alt={mainMovie.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-400 text-black font-extrabold text-xs rounded-full flex items-center gap-1 shadow-lg">
              <Star className="w-3.5 h-3.5 fill-black" />
              TOP 1 • {mainMovie.vote_average || "N/A"} TMDb
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6">
              <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase line-clamp-1 group-hover:text-amber-400 transition-colors m-0">
                {mainMovie.name}
              </h3>
              <p className="text-xs text-gray-300 font-mono line-clamp-2 mt-1 m-0">
                {mainMovie.description}
              </p>
            </div>
          </Link>
        )}

        {/* 4 Small Side Cards (1x1 each) */}
        {sideMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/trailer/${movie.id}`}
            className="col-span-1 row-span-1 relative rounded-lg overflow-hidden border border-[#222533] hover:border-amber-400 group transition-all shadow-xl block aspect-[2/3] md:aspect-auto"
          >
            <img
              src={movie.image || movie.banner}
              alt={movie.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {movie.vote_average || "N/A"} TMDb
              </div>
              <h4 className="text-xs font-bold text-white font-mono uppercase line-clamp-1 m-0">
                {movie.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
