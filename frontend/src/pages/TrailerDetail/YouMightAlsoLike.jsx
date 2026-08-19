import MovieCardHover from "../Home/MovieCardHover.jsx";
import useSlideTrailers from "../../hooks/ui/useSlideTrailers.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function YouMightAlsoLike({ trailers = [] }) {
  return (
    <div className="max-w-7xl mx-auto mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-5 bg-amber-400 rounded-sm" />
          PHIM TƯƠNG TỰ ĐỀ XUẤT
        </h2>
       
      </div>
      <div className="max-w-full">
        <Swiper
          modules={[Navigation]}
          slidesPerView={2.2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 5.2, spaceBetween: 24 },
            1280: { slidesPerView: 6.2, spaceBetween: 24 },
          }}
        >
          {trailers.map((trailer) => (
            <SwiperSlide key={trailer.id}>
              <MovieCardHover movie={trailer} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
