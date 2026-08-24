// pages/TrailerDetail/TrailerVideo.jsx
import {
  useTrailerVideo,
  formatTime,
} from "../../hooks/ui/useTrailerVideo.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Gauge,
  Maximize2,
  Minimize2,
} from "lucide-react";

export default function TrailerVideo({
  isOpen,
  onClose,
  videoKey,
  movieTitle,
}) {
  const {
    modalCardRef,
    timelineRef,
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    progressPercent,
    showSpeedMenu,
    setShowSpeedMenu,
    isFullscreen,
    hoverTime,
    hoverPosPercent,
    isHoveringTimeline,
    speedOptions,
    togglePlay,
    handleSeekChange,
    handleTimelineMouseMove,
    handleTimelineMouseLeave,
    handleVolumeChange,
    toggleMute,
    setSpeed,
    toggleFullscreen,
  } = useTrailerVideo(isOpen, onClose, videoKey);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-4 text-left font-mono select-none"
    >
      {/* CINEMATIC MODAL CONTAINER (Fix #2: Sharp/subtle corners, no generic card border) */}
      <div
        ref={modalCardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-black border-0 rounded-none sm:rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.95)] flex flex-col group"
      >
        {/* 1. OVERLAID MODAL HEADER BAR (Fix: Always visible on mobile, hover-fade on desktop) */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-30 flex items-center justify-between opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider m-0 drop-shadow-md">
            TRAILER: {movieTitle || "CINEVERSE PREVIEW"}
          </h3>

          <div className="flex items-center gap-2">
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-black/60 backdrop-blur-md border border-white/30 hover:bg-red-500 hover:border-red-500 text-white rounded-full transition-all cursor-pointer shadow-lg active:scale-95"
              title="Đóng video"
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* 2. VIDEO PLAYER VIEWPORT (Fix #1: Strict 16:9 Aspect Ratio with edge-to-edge iframe stretch) */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex-1">
          <div
            id="yt-player-modal-frame"
            className="w-full h-full object-cover [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
          />

          {!isReady && (
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 font-mono text-xs text-cyan-400">
              <div className="w-8 h-8 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              <span>ĐANG TẢI VIDEO...</span>
            </div>
          )}
        </div>

        {/* 3. OVERLAID BOTTOM CONTROL BAR & SCRUBBER (Fix: Always visible on mobile, hover-fade on desktop) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent z-30 flex flex-col gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar Track (Fix #5: Primary control - thicker track with glowing cyan highlight) */}
          <div
            ref={timelineRef}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={handleTimelineMouseLeave}
            className="relative w-full flex items-center py-2 group/timeline cursor-pointer"
          >
            {/* Hover Timestamp Badge */}
            {isHoveringTimeline && (
              <div
                style={{ left: `${hoverPosPercent}%` }}
                className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 bg-cyan-400 text-black font-mono font-extrabold text-[10px] rounded shadow-xl pointer-events-none z-30"
              >
                {formatTime(hoverTime)}
              </div>
            )}

            {/* Cyan Played Highlight Track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-2 group-hover/timeline:h-2.5 bg-cyan-400 rounded-l-full pointer-events-none transition-all shadow-[0_0_10px_rgba(0,229,229,0.8)]"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Input Scrubber Range */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent || 0}
              onChange={handleSeekChange}
              className="w-full h-2 bg-white/20 accent-cyan-400 rounded-full cursor-pointer group-hover/timeline:h-2.5 transition-all z-10 opacity-90 hover:opacity-100"
            />
          </div>

          {/* Controls Toolbar */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono">
            {/* Left Controls: Primary Play/Pause Button & Time Counter */}
            <div className="flex items-center gap-4">
              {/* Play/Pause Button (Fix #4: Prominent primary CTA) */}
              <button
                type="button"
                onClick={togglePlay}
                className="p-3 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold rounded-full transition-transform active:scale-95 cursor-pointer shadow-lg shadow-cyan-400/30 flex items-center justify-center"
                title={isPlaying ? "Tạm dừng (Space)" : "Phát video (Space)"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black text-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                )}
              </button>

              {/* Time Counter */}
              <div className="text-gray-300 font-bold text-xs">
                <span className="text-white font-mono">
                  {formatTime(currentTime)}
                </span>{" "}
                <span className="text-gray-500 font-mono">/</span>{" "}
                <span className="text-gray-400 font-mono">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Controls (Fix #4: Secondary controls with minimal weight, no heavy background pills) */}
            <div className="flex items-center gap-4 relative">
              {/* Speed Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpeedMenu((prev) => !prev)}
                  className="flex items-center gap-1.5 text-gray-300 hover:text-white text-xs font-bold transition-colors cursor-pointer bg-transparent border-0 p-1"
                  title="Tốc độ phát"
                >
                  <Gauge className="w-4 h-4 text-gray-400" />
                  <span>{playbackRate}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-10 right-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg p-1 shadow-2xl flex flex-col gap-1 z-50 min-w-[95px]">
                    {speedOptions.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => {
                          setSpeed(rate);
                          setShowSpeedMenu(false);
                        }}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded text-left transition-colors cursor-pointer ${
                          playbackRate === rate
                            ? "bg-cyan-400 text-black font-extrabold"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        {rate}x {rate === 1.0 && "(Chuẩn)"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mute & Volume Slider (Fix #5: Secondary muted volume slider track) */}
              <div className="flex items-center gap-2 bg-transparent border-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer p-1"
                  title={isMuted ? "Bật âm thanh (M)" : "Tắt âm thanh (M)"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-gray-300" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 sm:w-16 h-1 bg-white/20 accent-cyan-400 rounded-full cursor-pointer"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer p-1 bg-transparent border-0"
                title={
                  isFullscreen ? "Thoát toàn màn hình (F)" : "Toàn màn hình (F)"
                }
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
