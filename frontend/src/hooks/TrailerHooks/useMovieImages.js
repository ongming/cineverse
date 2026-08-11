// hooks/useMovieImages.js
import { useState, useMemo, useRef } from "react";
import { movieImages } from "../../data/movieImages.js";

export const useMovieImages = (movieId) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Thumbnail Sliding Window State (1-by-1 slide)
  const [thumbStartIndex, setThumbStartIndex] = useState(0);

  // Drag Gesture States
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlinging, setIsFlinging] = useState(false);
  const pointerStartRef = useRef(0);

  // Filter images for current movie
  const images = useMemo(() => {
    const numericId = Number(movieId);
    const movieImgs = movieImages.filter((img) => img.movie_id === numericId);

    // If no specific images for this ID, return default fallback set
    if (movieImgs.length === 0) {
      return movieImages.filter((img) => img.movie_id === 1);
    }
    return movieImgs;
  }, [movieId]);

  // Active highlighted image
  const activeImage = useMemo(() => {
    if (images.length === 0) return null;
    return images[selectedIndex] || images[0];
  }, [images, selectedIndex]);

  // Next / Previous Hero Image Navigation (Top Image)
  const handleNextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Thumbnail Strip Sliding Window Handlers (1-by-1 horizontal slide WITHOUT changing top hero image)
  const THUMB_WIDTH = 66; // 56px thumbnail width + 8px gap
  const isMobile = window.innerWidth < 640;
  const visualCount = isMobile ? 3 : 6;

  const handleNextThumbStrip = () => {
    if (thumbStartIndex < images.length - visualCount) {
      setThumbStartIndex((prev) => prev + 1);
    }
  };

  const handlePrevThumbStrip = () => {
    if (thumbStartIndex > 0) {
      setThumbStartIndex((prev) => prev - 1);
    }
  };

  const thumbStripStyle = {
    transform: `translateX(-${thumbStartIndex * THUMB_WIDTH}px)`,
    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  // Pointer Drag Gesture Handlers
  const handlePointerDown = (e) => {
    if (isFlinging) return;
    e.target.setPointerCapture(e.pointerId);
    pointerStartRef.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || isFlinging) return;
    const currentX = e.clientX;
    const delta = currentX - pointerStartRef.current;
    setDragDeltaX(delta);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      e.target.releasePointerCapture(e.pointerId);
    } catch (_) {
      // Ignore if pointer capture already released
    }

    const threshold = 100; // 100px threshold for fling

    if (dragDeltaX > threshold) {
      // Dragged right past 100px -> Fling right off-screen, then show PREVIOUS image
      setIsFlinging(true);
      setDragDeltaX(500);
      setTimeout(() => {
        handlePrevImage();
        setDragDeltaX(0);
        setIsFlinging(false);
      }, 250);
    } else if (dragDeltaX < -threshold) {
      // Dragged left past -100px -> Fling left off-screen, then show NEXT image
      setIsFlinging(true);
      setDragDeltaX(-500);
      setTimeout(() => {
        handleNextImage();
        setDragDeltaX(0);
        setIsFlinging(false);
      }, 250);
    } else {
      // Released under threshold -> Spring back to center (0px) with cubic-bezier
      setDragDeltaX(0);
    }
  };

  // Drag Transform & Opacity Styles
  const dragStyle = {
    transform: `translateX(${dragDeltaX}px) rotate(${dragDeltaX * 0.04}deg)`,
    opacity: Math.max(0.15, 1 - Math.abs(dragDeltaX) / 400),
    transition: isDragging
      ? "none"
      : "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
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
    handleNextThumbStrip,
    handlePrevThumbStrip,
    thumbStripStyle,
    // Pointer Drag Exports
    dragDeltaX,
    isDragging,
    dragStyle,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};
