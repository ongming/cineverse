import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useMovieImages } from "../../hooks/data/useMovieImages.js";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

export default function TrailerImages({ imageData = [] }) {
  const {
    selectedIndex,
    setSelectedIndex,
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    handleNextImage,
    handlePrevImage,
  } = useMovieImages(imageData);

  const swiperRef = useRef(null);

  const handleMainDragEnd = (event, info) => {
    const threshold = 30;
    if (info.offset.x < -threshold || info.velocity.x < -300) {
      handleNextImage();
    } else if (info.offset.x > threshold || info.velocity.x > 300) {
      handlePrevImage();
    }
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Main Hero Image Viewport with Touch & Mouse Drag Gesture */}
      <div className="relative w-full aspect-[16/9] bg-[#12141a] border border-[#222533] rounded-2xl overflow-hidden shadow-2xl group select-none touch-pan-y">
        <AnimatePresence mode="wait">
          {activeImage && (
            <motion.img
              key={selectedIndex}
              src={activeImage}
              alt="Movie Backdrop"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleMainDragEnd}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
            />
          )}
        </AnimatePresence>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 pointer-events-none" />

        {/* Top Lightbox Zoom Button */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-xs pointer-events-none">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="p-2 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-xl text-white hover:text-amber-400 transition-all cursor-pointer pointer-events-auto shadow-lg active:scale-95"
            title="Xem ảnh phóng to"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {imageData.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Gallery Controls & Swiper Thumbnails Bar */}
      <div className="flex justify-center items-center gap-2 p-3 w-full max-w-2xl mx-auto">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          className="p-2 hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
          title="Trượt ảnh trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Swiper Viewport Window Container */}
        <div className="overflow-hidden w-full max-w-[248px] sm:max-w-[390px]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={10}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 5, spaceBetween: 12 },
              1024: { slidesPerView: 6, spaceBetween: 12 },
            }}
            className="w-full"
          >
            {imageData.map((img, idx) => (
              <SwiperSlide key={idx}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative w-14 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedIndex === idx
                      ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                      : "border-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          className="p-2 hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
          title="Trượt ảnh tiếp"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {isLightboxOpen && activeImage && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={activeImage}
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl border border-white/20"
          />
        </div>
      )}
    </div>
  );
}
