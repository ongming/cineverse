import { useMovieImages } from "../../hooks/data/useMovieImages.js";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
export default function TrailerImages({ imageData = [] }) {
  const {
    selectedIndex,
    setSelectedIndex,
    images,
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    handleNextImage,
    handlePrevImage,
    // Thumbnail Sliding Window Exports
    handleNextThumbStrip,
    handlePrevThumbStrip,
    thumbStripStyle,
    // Pointer Drag Gesture Export
  } = useMovieImages(imageData);
  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Main Hero Image Viewport with Drag Gesture */}
      <div className="relative w-full aspect-[16/9] bg-[#12141a] border border-[#222533] rounded-2xl overflow-hidden shadow-2xl group select-none">
        {activeImage && (
          <img
            src={activeImage}
            className="w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 pointer-events-none" />

        {/* Top Badges: Type, Rating & Drag Hint */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-xs pointer-events-none">
          {/* Lightbox Zoom Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="p-2 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-xl text-white hover:text-amber-400 transition-all cursor-pointer pointer-events-auto"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 rounded-full text-white hover:text-amber-400 transition-all cursor-pointer z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Gallery Controls & Thumbnails Strip with 1-by-1 Smooth Slide */}
      <div className="flex justify-center items-center gap-2 p-3">
        {/* Left Arrow Button (Slide 1 thumbnail left) */}
        <button
          type="button"
          onClick={handlePrevThumbStrip}
          className="p-2  hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
          title="Trượt ảnh trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Viewport Window Container (Clipped Viewport for 6 thumbnails) */}
        <div className="overflow-hidden w-[248px] sm:w-[390px]">
          {/* Inner Sliding Track with transform translateX */}
          <div
            className="flex items-center gap-2 mx-1.5"
            style={thumbStripStyle}
          >
            {imageData.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedIndex(idx);
                }}
                className={`relative w-14 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  selectedIndex === idx
                    ? "border-amber-400 scale-105 shadow-md shadow-amber-400/30"
                    : "border-white/10 opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow Button (Slide 1 thumbnail right) */}
        <button
          type="button"
          onClick={handleNextThumbStrip}
          className="p-2  hover:border-amber-400 text-gray-300 hover:text-amber-400 rounded-xl transition-all cursor-pointer shrink-0 z-10"
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
