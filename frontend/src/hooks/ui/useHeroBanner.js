import { useState, useEffect, useRef } from "react";
import { useToggleWatchlist } from "../data/useToggleWatchlist.js";

export function useHeroBanner(movies = []) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { handleToggle, isBookmarked } = useToggleWatchlist();
  const hoverTimerRef = useRef(null);

  // Auto switch banner slide every 7 seconds (if not actively playing trailer on hover)
  useEffect(() => {
    if (!movies || movies.length === 0 || isPlayingTrailer) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [movies, isPlayingTrailer]);

  // Restart trailer autoplay when slide changes IF the mouse is currently resting over the banner
  useEffect(() => {
    setIsPlayingTrailer(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    if (isMouseOver) {
      hoverTimerRef.current = setTimeout(() => {
        setIsPlayingTrailer(true);
      }, 300);
    }
  }, [currentIndex, isMouseOver]);

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setIsPlayingTrailer(false);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const currentMovie = movies[currentIndex] || null;
  const startSeconds = 5;

  return {
    currentIndex,
    setCurrentIndex,
    isPlayingTrailer,
    isMuted,
    setIsMuted,
    currentMovie,
    startSeconds,
    handleMouseEnter,
    handleMouseLeave,
    handleToggle,
    isBookmarked,
  };
}
