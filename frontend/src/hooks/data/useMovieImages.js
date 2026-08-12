// hooks/data/useMovieImages.js
import { useState, useMemo, useRef } from "react";
import { movieImages } from "../../data/movieImages.js";

export const useMovieImages = (movieId) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Thumbnail Sliding Window State (1-by-1 slide)
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const visibleThumbCount = 5;
  // Filter photos for this movie
  const images = useMemo(() => {
    const numericId = parseInt(movieId, 10);
    const filtered = movieImages.filter((img) => img.movie_id === numericId);
    if (filtered.length > 0) return filtered;

    // Fallback sample album if no specific images found
    return [
      {
        id: 101,
        movie_id: numericId,
        type: "backdrop",
        file_path:
          "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80",
        title: "Cảnh phim 1",
        caption: "Không gian rạp chiếu phim Cineverse",
      },
      {
        id: 102,
        movie_id: numericId,
        type: "still",
        file_path:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
        title: "Cảnh phim 2",
        caption: "Màn ảnh rộng sắc nét 4K",
      },
      {
        id: 103,
        movie_id: numericId,
        type: "poster",
        file_path:
          "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
        title: "Cảnh phim 3",
        caption: "Trải nghiệm âm thanh vòm sống động",
      },
    ];
  }, [movieId]);

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
