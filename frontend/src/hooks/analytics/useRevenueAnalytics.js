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

  const {
    data: revenueMovies = [],
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useRevenueData({
    year: selectedYear === "ALL" ? undefined : selectedYear,
    genre: selectedGenre === "ALL" ? undefined : selectedGenre,
    page: page,
  });

  const {
    data: revenueStats = {},
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useRevenueStats({
    year: selectedYear === "ALL" ? undefined : selectedYear,
    genre: selectedGenre === "ALL" ? undefined : selectedGenre,
  });

  const {
    total_revenue = 0,
    total_budget = 0,
    total_movies = 0,
    avg_profit = 0,
    avg_roi = 0,
    top_genre = "Phim Phiêu Lưu",
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

  const handleExportCSV = () => {
    if (!revenueMovies.length) return;
    const headers = [
      "Xếp hạng,Tên Phim,Năm,Kinh Phí (Budget),Doanh Thu (Revenue)",
    ];
    const rows = revenueMovies.map((m, index) => {
      return `"${index + 1}","${m.title}",${m.release_date ? m.release_date.slice(0, 4) : ""},"${m.budget}","${m.revenue}"`;
    });

    const csvString = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `cineverse_revenue_report_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
    handleExportCSV,
  };
}
