import { useState, useMemo } from "react";
import { useHomeData } from "../../hooks/data/useHomeData.js";
import { formatReleaseDate } from "../../utils/revenueUtils.js";

export default function useScheduleData() {
  const [selectedDateIndex, setSelectedDateIndex] = useState("ALL");
  const [customDate, setCustomDate] = useState("");
  const { data, isLoading, isError, page, setPage } = useHomeData();

  const { nowPlaying, upcoming, hasNextPage } = data || { nowPlaying: [], upcoming: [], hasNextPage: false };

  // Dynamic Date List (Hôm nay, Ngày mai, T6, T7, CN, T2, T3)
  const dateList = useMemo(() => {
    const days = [];
    const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const dayNum = String(d.getDate()).padStart(2, "0");
      const monthNum = String(d.getMonth() + 1).padStart(2, "0");
      const yearNum = String(d.getFullYear());
      const formatted = `${dayNum}/${monthNum}`;
      const fullFormatted = `${yearNum}-${monthNum}-${dayNum}`;
      const dayOfWeek = dayNames[d.getDay()];

      let badge = "";
      if (i === 0) badge = "Hôm nay";
      else badge = dayOfWeek;

      days.push({
        index: i,
        badge,
        dayOfWeek,
        formatted,
        fullFormatted,
      });
    }
    return days;
  }, []);
  // Filter movies by Selected Date & Filter Category
  const filteredMovies = useMemo(() => {
    let result = [...upcoming];
    if (selectedDateIndex !== "ALL" && selectedDateIndex !== "CUSTOM") {
      return result.filter(
        (m) => m.release_date === dateList[selectedDateIndex].fullFormatted,
      );
    } else if (selectedDateIndex === "CUSTOM" && customDate) {
      return result.filter(
        (m) => formatReleaseDate(m.release_date) === customDate,
      );
    }
    return [...nowPlaying];
  }, [selectedDateIndex, customDate, upcoming, nowPlaying, dateList]);

  return {
    selectedDateIndex,
    setSelectedDateIndex,
    customDate,
    setCustomDate,
    dateList,
    filteredMovies,
    isLoading,
    isError,
    nowPlaying,
    upcoming,
    hasNextPage,
    page,
    setPage,
  }
}
