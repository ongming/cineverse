import { Link } from "react-router-dom";
import { useActorDetail } from "../../hooks/data/useActorDetail.js";
import MovieCard from "../../components/MovieCard/MovieCard.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";
import {
  ArrowLeft,
  ExternalLink,
  Film,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function ActorDetail() {
  const {
    actorData,
    age,
    isLightboxOpen,
    setIsLightboxOpen,
    selectedPhotoIndex,
    handleOpenPhoto,
    handleNextPhoto,
    handlePrevPhoto,
    navigate,
  } = useActorDetail();

  if (!actorData) {
    return (
      <ErrorState
        title="Không tìm thấy thông tin diễn viên!"
        message="Thông tin diễn viên này không tồn tại hoặc đã bị gỡ khỏi hệ thống."
        backLink="/"
        backText="QUAY LẠI TRANG CHỦ"
      />
    );
  }

  // Calculate remaining photos count for 1-row limit (5 thumbnails + 1 count card)
  const galleryList = actorData.images || [];
  const maxVisiblePhotos = 5;
  const visiblePhotos = galleryList.slice(0, maxVisiblePhotos);
  const remainingCount = Math.max(0, galleryList.length - maxVisiblePhotos);

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-mono text-left">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> QUAY LẠI
        </button>
        <div className="w-16" />
      </div>

      {/* SECTION 1: HERO PROFILE CARD */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Actor Portrait Photo Frame (4 Cols) */}
        <div className="md:col-span-4 lg:col-span-3 p-10 sm:p-20 md:p-1">
          <div className="relative w-full aspect-[2/3] bg-[#12141a] border border-[#222533] rounded-2xl overflow-hidden shadow-2xl p-2 group">
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <img
                src={actorData.profile_path}
                alt={actorData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Actor Metadata & Biography (8 Cols) */}
        <div className="md:col-span-8 flex flex-col justify-between">
          <div className="flex flex-col gap-3 lg:gap-6">
            {/* Name & Popularity Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono uppercase tracking-tight">
                {actorData.name}
              </h1>
            </div>

            {/* 2-Column Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 font-mono text-xs border-y border-[#1f2332] py-6">
              <div>
                <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                  Vai Trò
                </span>
                <span className="text-white font-bold font-mono text-sm">
                  {actorData.known_for_department || "Acting"}
                </span>
              </div>

              <div>
                <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                  Ngày Sinh
                </span>
                <span className="text-white font-bold font-mono text-sm">
                  {actorData.birthday || "N/A"}{" "}
                  {age !== null && (
                    <span className="text-gray-400 font-normal">
                      ({age} tuổi)
                    </span>
                  )}
                </span>
              </div>

              <div>
                <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                  Nơi Sinh
                </span>
                <span className="text-white font-bold font-mono text-sm">
                  {actorData.place_of_birth || "N/A"}
                </span>
              </div>

              <div>
                <span className="block text-gray-500 text-[11px] uppercase tracking-wider mb-1">
                  Được Biết Đến Như
                </span>
                <span className="text-white font-bold font-mono text-sm">
                  {actorData.also_known_as?.length > 0
                    ? actorData.also_known_as.join(", ")
                    : actorData.name}
                </span>
              </div>
            </div>

            {/* Biography Paragraph */}
            <div className="mb-6">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-mono">
                {actorData.biography}
              </p>
            </div>

            {/* Primary Action Button: XEM TRÊN IMDb */}
            {actorData.imdb_id && (
              <div>
                <a
                  href={`https://www.imdb.com/name/${actorData.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 bg-amber-400 hover:bg-yellow-400 text-black font-extrabold text-xs sm:text-sm font-mono uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 no-underline"
                >
                  <span>XEM TRÊN IMDb</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: PHOTO GALLERY ALBUM */}
      {galleryList.length > 0 && (
        <div className="max-w-7xl mx-auto mb-12 p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide m-0">
                ALBUM ẢNH & SỰ KIỆN
              </h2>
            </div>
            <span className="text-xs font-mono text-gray-400">
              {galleryList.length} HÌNH ẢNH
            </span>
          </div>

          {/* 1 Single Row Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {visiblePhotos.map((photoUrl, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenPhoto(idx)}
                className="relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-amber-400 cursor-pointer group transition-all shadow-md"
              >
                <img
                  src={photoUrl}
                  alt={`gallery-${idx}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-2 py-1 bg-amber-400 text-black text-[10px] font-mono font-bold rounded">
                    Phóng to
                  </span>
                </div>
              </div>
            ))}

            {/* Remaining Count Card */}
            {remainingCount > 0 ? (
              <div
                onClick={() => handleOpenPhoto(maxVisiblePhotos)}
                className="relative aspect-square rounded-xl overflow-hidden border border-[#252a3b] hover:border-amber-400 bg-[#181a24] cursor-pointer group transition-all flex flex-col items-center justify-center p-3 text-center shadow-md hover:bg-[#1e2230]"
              >
                <ImageIcon className="w-6 h-6 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-extrabold text-white font-mono uppercase tracking-wider">
                  +{remainingCount}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase mt-0.5">
                  HÌNH ẢNH
                </span>
              </div>
            ) : (
              galleryList.length > 5 && (
                <div
                  onClick={() => handleOpenPhoto(0)}
                  className="relative aspect-square rounded-xl overflow-hidden border border-[#252a3b] hover:border-amber-400 bg-[#181a24] cursor-pointer group transition-all flex flex-col items-center justify-center p-3 text-center shadow-md"
                >
                  <ImageIcon className="w-6 h-6 text-amber-400 mb-1" />
                  <span className="text-xs font-bold text-white font-mono uppercase">
                    XEM TẤT CẢ
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: FILMOGRAPHY */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Film className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono uppercase tracking-wide">
            CÁC BỘ PHIM ĐÃ THAM GIA
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {actorData.movies?.map((movieItem) => (
            <MovieCard
              className="realtive"
              key={movieItem.id}
              movie={movieItem}
            />
          ))}
        </div>
      </div>

      {/* IMDb-STYLE FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && galleryList.length > 0 && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 text-left font-mono">
          <div className="w-full flex items-center justify-between z-30 pb-4 border-b border-white/10">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="flex items-center gap-2 px-2 py-2 bg-white/10 hover:bg-amber-400 hover:text-black text-white text-xs font-mono font-bold rounded-full transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 text-xs font-mono text-gray-300">
              <span className="px-3 py-1 font-bold text-white">
                {selectedPhotoIndex + 1} của {galleryList.length} Ảnh
              </span>
            </div>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2 sm:left-6 p-3 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 text-white hover:text-amber-400 rounded-full transition-all cursor-pointer z-30 shadow-2xl"
              title="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={galleryList[selectedPhotoIndex]}
              alt={`photo-${selectedPhotoIndex}`}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10 transition-transform duration-300"
            />

            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2 sm:right-6 p-3 bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400 text-white hover:text-amber-400 rounded-full transition-all cursor-pointer z-30 shadow-2xl"
              title="Ảnh tiếp"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full backdrop-blur-md p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-30">
            <div>
              <h4 className="text-sm font-bold text-amber-400 font-mono uppercase m-0">
                {actorData.name}
              </h4>
              <p className="text-xs text-gray-300 font-mono m-0 mt-1 line-clamp-1">
                Bộ ảnh lấy từ TMDb ({selectedPhotoIndex + 1}/{galleryList.length})
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-gray-400 shrink-0">
              <span>
                Nghệ danh:{" "}
                <strong className="text-white">
                  {actorData.also_known_as?.[0] || actorData.name}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
