// pages/Home/MovieRow.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import MovieCardHover from "./MovieCardHover.jsx";
import { ChevronRight } from "lucide-react";

export default function MovieRow({ title, movies = [], viewAllLink = null }) {
  if (!movies || movies.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 text-left font-mono"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-white font-mono uppercase tracking-wide flex items-center gap-2 m-0">
          <span className="w-2 h-5 bg-cyan-400 rounded-sm" />
          {title}
        </h2>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline uppercase font-bold no-underline"
          >
            <span>XEM TẤT CẢ</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Swiper Horizontal Carousel */}
      <div className="relative  w-full overflow-visible ">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={2.2}
          spaceBetween={16}
          autoplay={{
            delay: 1, // 🟢 3000ms = slides every 3 seconds
            disableOnInteraction: false, // 🟢 Keeps autoplay running even after user swipes!
            pauseOnMouseEnter: true, // 🟢 Pauses sliding when mouse hovers over a movie card!
          }}
          loop={true}
          speed={3000} // 🟢 6000ms = 6-second ultra-slow gliding speed!
          breakpoints={{
            640: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 5.2, spaceBetween: 24 },
            1280: { slidesPerView: 6.2, spaceBetween: 24 },
            1600: { slidesPerView: 10.2, spaceBetween: 24 },
          }}
          className="pb-4 !overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCardHover movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  );
}
