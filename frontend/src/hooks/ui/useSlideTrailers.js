import { useState } from "react";

export default function useSlideTrailers({ trailers }) {
  // 1. Current starting index state (0 = first movie)
  const [startIndex, setStartIndex] = useState(0);
  // 2. Visible items per view (5 items on desktop)
  const VISIBLE_COUNT = 5;
  // 3. Calculate max scroll index boundary
  const maxIndex = Math.max(0, trailers.length - VISIBLE_COUNT);
  // 4. Navigation Handlers
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };
  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  // 5. Disabled Button States
  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex < maxIndex;

  return {
    startIndex,
    handlePrev,
    handleNext,
    canScrollLeft,
    canScrollRight,
  };
}
