// hooks/ui/useTrailerVideo.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useVideoPlayer } from "./useVideoPlayer.js";

export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function useTrailerVideo(isOpen, onClose, videoKey) {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [hoverPosPercent, setHoverPosPercent] = useState(0);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);

  const modalCardRef = useRef(null);
  const timelineRef = useRef(null);

  const {
    isReady,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    setSpeed,
  } = useVideoPlayer(isOpen ? videoKey : null, "yt-player-modal-frame");

  // Toggle Browser Native Fullscreen API
  const toggleFullscreen = useCallback(() => {
    if (!modalCardRef.current) return;

    if (!document.fullscreenElement) {
      if (modalCardRef.current.requestFullscreen) {
        modalCardRef.current.requestFullscreen();
      } else if (modalCardRef.current.webkitRequestFullscreen) {
        modalCardRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, []);

  // Sync fullscreen state on browser change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Keyboard Shortcuts Listener (Space = Play/Pause, Esc = Close, M = Mute, F = Fullscreen, ← / → = Seek 5s)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "Escape") {
        if (!document.fullscreenElement) {
          onClose();
        }
      } else if (e.code === "KeyM") {
        toggleMute();
      } else if (e.code === "KeyF") {
        toggleFullscreen();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        seekTo(Math.max(0, currentTime - 5));
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        seekTo(Math.min(duration, currentTime + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, togglePlay, toggleMute, toggleFullscreen, seekTo, currentTime, duration, onClose]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    seekTo(newTime);
  };

  const handleTimelineMouseMove = (e) => {
    if (!timelineRef.current || !duration) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (offsetX / rect.width) * 100;
    const timeAtPos = (percent / 100) * duration;

    setHoverPosPercent(percent);
    setHoverTime(timeAtPos);
    setIsHoveringTimeline(true);
  };

  const handleTimelineMouseLeave = () => {
    setIsHoveringTimeline(false);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value, 10));
  };

  const speedOptions = [0.5, 1.0, 1.25, 1.5, 2.0];

  return {
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
  };
}
