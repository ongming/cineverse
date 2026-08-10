// hooks/useRevenueAnalytics.js
import { useState, useMemo } from "react";
import { useMovies } from "./useMovies.js";

export default function useRevenueAnalytics() {
  const [selectedYear, setSelectedYear] = useState("ALL");
  const [selectedGenre, setSelectedGenre] = useState("ALL");

  const { data: movies = [], isLoading, isError } = useMovies();

  const uniqueYears = useMemo(() => {
    if (!movies) return [{ value: "ALL", label: "Tất cả" }];
    const years = movies.map((m) => m.year);
    const sortedYears = [...new Set(years)]
      .sort((a, b) => b - a)
      .map((y) => ({ value: y, label: `Năm ${y}` }));
    return [{ value: "ALL", label: "Tất cả" }, ...sortedYears];
  }, [movies]);

  const uniqueGenres = useMemo(() => {
    if (!movies) return [{ value: "ALL", label: "Tất cả" }];
    const genres = movies.flatMap((m) => m.genre || []);
    const sortedGenres = [...new Set(genres)].sort().map((g) => ({
      value: g,
      label: g,
    }));
    return [{ value: "ALL", label: "Tất cả" }, ...sortedGenres];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return movies.filter((movie) => {
      const matchesYear =
        selectedYear === "ALL" || movie.year === Number(selectedYear);
      const matchesGenre =
        selectedGenre === "ALL" || movie.genre?.includes(selectedGenre);
      return matchesYear && matchesGenre;
    });
  }, [selectedYear, selectedGenre, movies]);

  const rankedMovies = useMemo(() => {
    return [...filteredMovies].sort(
      (a, b) => (b.revenue || 0) - (a.revenue || 0),
    );
  }, [filteredMovies]);

  const maxRevenue = useMemo(() => {
    if (rankedMovies.length === 0) return 1;
    return Math.max(...rankedMovies.map((m) => m.revenue || 0));
  }, [rankedMovies]);

  const avgROI = useMemo(() => {
    if (!filteredMovies.length) return 0;
    const totalROI = filteredMovies.reduce((acc, m) => {
      if (!m.budget) return acc;
      return acc + m.revenue;
    }, 0);
    return Math.round(totalROI / filteredMovies.length);
  }, [filteredMovies]);

  const topMovieInFilter = useMemo(() => {
    return rankedMovies.length ? rankedMovies[0] : null;
  }, [rankedMovies]);

  const topGenreInDB = useMemo(() => {
    if (!movies.length) return "Khoa Học Viễn Tưởng";
    const genreRev = {};
    movies.forEach((m) => {
      m.genre?.forEach((g) => {
        genreRev[g] = (genreRev[g] || 0) + (m.revenue || 0);
      });
    });
    const sorted = Object.entries(genreRev).sort((a, b) => b[1] - a[1]);
    return sorted.length ? sorted[0][0] : "Khoa Học Viễn Tưởng";
  }, [movies]);

  const profitKings = useMemo(() => {
    return [...filteredMovies]
      .filter((m) => m.budget && m.revenue && m.revenue > m.budget)
      .map((m) => ({
        ...m,
        roi: Math.round(((m.revenue - m.budget) / m.budget) * 100),
        netProfit: m.revenue - m.budget,
      }))
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 2);
  }, [filteredMovies]);

  const boxOfficeFlops = useMemo(() => {
    return [...filteredMovies]
      .filter((m) => m.budget && m.revenue && m.revenue < m.budget)
      .map((m) => ({
        ...m,
        lossAmount: m.budget - m.revenue,
        roi: Math.round(((m.revenue - m.budget) / m.budget) * 100),
      }))
      .sort((a, b) => a.roi - b.roi)
      .slice(0, 2);
  }, [filteredMovies]);

  const handleExportCSV = () => {
    const headers = [
      "Xếp hạng,Tên Phim,Năm,Kinh Phí (Budget),Doanh Thu (Revenue),Tỷ Lệ ROI",
    ];
    const rows = rankedMovies.map((m, index) => {
      const roi = m.budget
        ? Math.round(((m.revenue - m.budget) / m.budget) * 100)
        : 0;
      return `"${index + 1}","${m.name}",${m.year},"${m.budget}","${m.revenue}","${roi}%"`;
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
    setSelectedYear,
    selectedGenre,
    setSelectedGenre,
    isLoading,
    isError,
    uniqueYears,
    uniqueGenres,
    rankedMovies,
    maxRevenue,
    avgROI,
    topMovieInFilter,
    topGenreInDB,
    profitKings,
    boxOfficeFlops,
    handleExportCSV,
  };
}