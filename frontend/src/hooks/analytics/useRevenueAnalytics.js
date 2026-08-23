// hooks/analytics/useRevenueAnalytics.js
import { useState, useMemo } from "react";
import { useCategory } from "../data/useCategory.js";
import { useRevenueData } from "../../hooks/data/useRevenueData.js";
import { useRevenueStats } from "../../hooks/data/useRevenueStats.js";

export default function useRevenueAnalytics() {
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedGenre, setSelectedGenre] = useState("ALL");
  const [page, setPage] = useState(1);

  const { data: categories = [] } = useCategory();

  // 🟢 Destructure movies and hasNextPage from backend revenue response
  const {
    data: revenueResponse = {},
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useRevenueData({
    year: selectedYear === "ALL" ? undefined : selectedYear,
    genreId: selectedGenre === "ALL" ? undefined : selectedGenre,
    page: page,
  });

  const { movies: revenueMovies = [], hasNextPage = false } = revenueResponse || {};

  const {
    data: revenueStats = {},
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useRevenueStats({
    year: selectedYear === "ALL" ? undefined : selectedYear,
    genreId: selectedGenre === "ALL" ? undefined : selectedGenre,
  });

  const {
    total_revenue = 0,
    total_budget = 0,
    total_movies = 0,
    avg_profit = 0,
    avg_roi = 0,
    top_genre = selectedGenre === "ALL" ? "N/A" : categories.find((c) => c.id === selectedGenre)?.name || "N/A",
    available_years = [],
    top_5_movies = [],
    profit_kings = [],
    box_office_flops = [],
  } = revenueStats || {};

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setPage(1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  const uniqueYears = useMemo(() => {
    if (!available_years || available_years.length === 0) {
      return [{ value: "ALL", label: "Tất cả" }];
    }
    const formattedYears = available_years.map((y) => ({
      value: String(y),
      label: `Năm ${y}`,
    }));
    return [{ value: "ALL", label: "Tất cả" }, ...formattedYears];
  }, [available_years]);

  const uniqueGenres = useMemo(() => {
    const categoryNames = categories.map((c) => ({
      value: c.id,
      label: c.name,
    }));
    return [{ value: "ALL", label: "Tất cả" }, ...categoryNames];
  }, [categories]);

  const maxRevenue = useMemo(() => {
    if (top_5_movies.length === 0) return 1;
    return Math.max(...top_5_movies.map((m) => Number(m.revenue) || 0));
  }, [top_5_movies]);

  return {
    selectedYear,
    handleYearChange,
    selectedGenre,
    handleGenreChange,
    isLoading: isMoviesLoading || isStatsLoading,
    isError: isMoviesError || isStatsError,
    uniqueYears,
    uniqueGenres,
    revenueMovies,
    hasNextPage,
    maxRevenue,
    total_revenue,
    total_budget,
    total_movies,
    avg_profit,
    avg_roi,
    top_genre,
    top_5_movies,
    profit_kings,
    box_office_flops,
    page,
    setPage,
  };
}
