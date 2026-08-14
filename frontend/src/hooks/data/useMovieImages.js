// hooks/data/useMovieImages.js
import { useState, useMemo, useRef } from "react";
import { movieImages } from "../../data/movieImages.js";

export const useMovieImages = (images) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Thumbnail Sliding Window State (1-by-1 slide)
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const visibleThumbCount = 5;
  // Active highlighted photo
  const activeImage = useMemo(() => {
    return images[selectedIndex] || images[0] || null;
  }, [images, selectedIndex]);

  // Photo Lightbox Controls
  const handleNextImage = () => {
    if (images.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    if (images.length === 0) return;
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Thumbnail Sliding Window Handlers (1-by-1 step)
  const handleNextThumbStrip = () => {
    if (thumbStartIndex + visibleThumbCount < images.length) {
      setThumbStartIndex((prev) => prev + 1);
    }
  };

  const handlePrevThumbStrip = () => {
    if (thumbStartIndex > 0) {
      setThumbStartIndex((prev) => prev - 1);
    }
  };

  // Dynamic CSS translation style for thumbnail container
  const thumbStripStyle = {
    transform: `translateX(-${thumbStartIndex * (100 / visibleThumbCount)}%)`,
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return {
    selectedIndex,
    setSelectedIndex,
    images,
    activeImage,
    isLightboxOpen,
    setIsLightboxOpen,
    handleNextImage,
    handlePrevImage,
    // Thumbnail Sliding Window Exports
    thumbStartIndex,
    visibleThumbCount,
    handleNextThumbStrip,
    handlePrevThumbStrip,
    thumbStripStyle,
  };
};
