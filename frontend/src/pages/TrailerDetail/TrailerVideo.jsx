// pages/TrailerDetail/trailerVideo.jsx
import {
  useTrailerVideo,
  formatTime,
} from "../../hooks/TrailerHooks/useTrailerVideo.js";
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
      className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 text-left font-mono select-none"
    >
      {/* Centered Floating Modal Card Container */}
      <div
        ref={modalCardRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0f121a] border border-[#22283a] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* 1. MODAL HEADER BAR */}
        <div className="p-4 border-b border-[#1f2638] flex items-center justify-between bg-[#090b12]">
          <div className="flex items-center gap-3">
            <span className="w-1 h-6 bg-cyan-400 rounded-sm shadow-sm shadow-cyan-400/50" />
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide m-0">
                TRAILER: {movieTitle || "CINEVERSE PREVIEW"}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Fullscreen Toggle Button */}

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-3 bg-white/10 hover:bg-red-500 hover:text-white text-white text-xs font-mono font-bold rounded-xl transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. VIDEO PLAYER VIEWPORT (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black overflow-hidden flex-1">
          <div
            id="yt-player-modal-frame"
            className="w-full h-full object-cover"
          />

          {!isReady && (
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-3 font-mono text-xs text-cyan-400">
              <div className="w-8 h-8 border-3 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              <span>ĐANG TẢI...</span>
            </div>
          )}
        </div>

        {/* 3. CUSTOM BOTTOM CONTROL BAR & CYAN-NEON TIMELINE SCRUBBER */}
        <div className="p-4 bg-[#090b12] border-t border-[#1f2638] flex flex-col gap-3">
          {/* Cyan-Neon Timeline Progress Bar with Hover Timestamp Tooltip */}
          <div
            ref={timelineRef}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={handleTimelineMouseLeave}
            className="relative w-full flex items-center py-2 group cursor-pointer"
          >
            {/* Floating Cyan-Neon Timestamp Tooltip Badge */}
            {isHoveringTimeline && (
              <div
                style={{ left: `${hoverPosPercent}%` }}
                className="absolute -top-7 -translate-x-1/2 px-2 py-0.5 bg-cyan-400 text-black font-mono font-extrabold text-[10px] rounded-md shadow-xl border border-black/20 pointer-events-none z-30 animate-fade-in shadow-cyan-400/30"
              >
                {formatTime(hoverTime)}
              </div>
            )}

            {/* Cyan-Neon Visual Played Progress Highlight Track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 group-hover:h-2.5 bg-cyan-400 rounded-l-lg pointer-events-none transition-all shadow-md shadow-cyan-400/50"
              style={{ width: `${progressPercent}%` }}
            />

            {/* Input Range Slider */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progressPercent || 0}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-[#1a2030] accent-cyan-400 rounded-lg cursor-pointer group-hover:h-2.5 transition-all z-10 opacity-90 hover:opacity-100"
            />
          </div>

          {/* Essential Control Buttons Toolbar */}
          <div className="flex items-center justify-between gap-4 text-xs font-mono">
            {/* Left Controls: Play/Pause & Time Display */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="p-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold rounded-xl transition-transform active:scale-95 cursor-pointer shadow-lg shadow-cyan-400/25 flex items-center justify-center"
                title={isPlaying ? "Tạm dừng (Space)" : "Phát video (Space)"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-black text-black" />
                ) : (
                  <Play className="w-4 h-4 fill-black text-black" />
                )}
              </button>

              {/* Time Counter */}
              <div className="text-gray-300 font-bold text-xs">
                <span className="text-cyan-400 font-mono">
                  {formatTime(currentTime)}
                </span>{" "}
                /{" "}
                <span className="text-gray-500 font-mono">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Right Controls: Speed Selector, Volume Slider, Fullscreen */}
            <div className="flex items-center gap-3 relative">
              {/* Speed Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSpeedMenu((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#171a26] border border-[#252c40] hover:border-cyan-400 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  title="Tốc độ phát"
                >
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{playbackRate}x</span>
                </button>

                {showSpeedMenu && (
                  <div className="absolute bottom-10 right-0 bg-[#171a26] border border-[#252c40] rounded-xl p-1 shadow-2xl flex flex-col gap-1 z-50 min-w-[95px]">
                    {speedOptions.map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => {
                          setSpeed(rate);
                          setShowSpeedMenu(false);
                        }}
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-lg text-left transition-colors cursor-pointer ${
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

              {/* Mute & Volume Slider Group */}
              <div className="flex items-center gap-2 bg-[#171a26] border border-[#252c40] px-2.5 py-1 rounded-xl">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="text-cyan-400 hover:text-white transition-colors cursor-pointer"
                  title={isMuted ? "Bật âm thanh (M)" : "Tắt âm thanh (M)"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-red-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-[#252c40] accent-cyan-400 rounded-lg cursor-pointer"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 bg-[#171a26] border border-[#252c40] hover:border-cyan-400 text-cyan-400 hover:text-white rounded-xl transition-all cursor-pointer"
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
