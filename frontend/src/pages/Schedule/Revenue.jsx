import { useState } from "react";
import { Link } from "react-router-dom";
import useRevenueAnalytics from "../../hooks/analytics/useRevenueAnalytics.js";
import { useMovies } from "../../hooks/data/useMovies.js";
import SortBar from "../../components/SortBar/SortBar.jsx";
import FinancialDataTable from "../Revenue/FinancialDataTable.jsx";
import StatCard from "../Revenue/StatCard.jsx";
import { formatUSDExact, formatUSD } from "../../utils/revenueUtils.js";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Award,
  Sparkles,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function Revenue() {
  const [isSortYearOpen, setIsSortYearOpen] = useState(false);
  const [isSortGenreOpen, setIsSortGenreOpen] = useState(false);

  const {
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
  } = useRevenueAnalytics();

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] bg-[#080808] text-amber-400 font-mono text-base font-bold flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
        <span>Đang nạp dữ liệu phân tích doanh thu phòng vé...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-[60vh] bg-[#080808] text-red-400 font-mono text-base font-bold flex items-center justify-center">
        ❌ Có lỗi xảy ra khi nạp dữ liệu doanh thu. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16 font-mono">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-400/10 rounded-xl border border-amber-400/30 text-amber-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase font-mono">
              CINEVERSE FINANCIAL ANALYTICS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white font-mono">
            Phân Tích Doanh Thu Toàn Cầu
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm max-w-xl font-mono mt-2">
            Thống kê doanh thu phòng vé, tỷ lệ sinh lời ROI và hiệu quả đầu tư
            các tác phẩm điện ảnh.
          </p>
        </div>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-3 font-mono text-xs text-gray-400 bg-dark-bg px-4 py-2.5 rounded-xl shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            Cập nhật lần cuối:{" "}
            <strong className="text-white">09/08/2026</strong>
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="max-w-7xl mx-auto mb-8 bg-[#12141a] border border-[#222533] rounded-2xl p-4 sm:p-5 grid sm:flex grid-cols-1 sm:flex-wrap items-center justify-between gap-4 shadow-2xl">
        {/* Year & Genre Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* Year Dropdown Filter */}
          <SortBar
            isSortOpen={isSortYearOpen}
            setIsSortOpen={setIsSortYearOpen}
            sortOptions={uniqueYears}
            sortBy={selectedYear}
            setSortBy={setSelectedYear}
            Icon={<Calendar className="w-4 h-4 text-amber-400" />}
          />

          {/* Genre Filter Pills */}
          <SortBar
            isSortOpen={isSortGenreOpen}
            setIsSortOpen={setIsSortGenreOpen}
            sortOptions={uniqueGenres}
            sortBy={selectedGenre}
            setSortBy={setSelectedGenre}
            Icon={<Layers className="w-4 h-4 text-amber-400" />}
          />
        </div>

        {/* Export CSV Action Button */}
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-400/10 hover:bg-amber-400 text-amber-400 hover:text-black font-bold text-xs rounded-xl border border-amber-400/40 transition-all cursor-pointer font-mono shadow-md"
        >
          <Download className="w-4 h-4" />
          <span>XUẤT CSV</span>
        </button>
      </div>

      {/* Main Grid Section: Top Revenue + Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column: Top Doanh Thu (2 Cols) */}
        <div className="lg:col-span-2 bg-[#12141a] border border-[#222533] rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                  Top Doanh Thu Phòng Vé
                </h2>
              </div>
            </div>

            {/* Single Full Color Revenue Bar Chart */}
            <div className="space-y-4">
              {rankedMovies.slice(0, 5).map((movie, idx) => {
                const percent = Math.round(
                  ((movie.revenue || 0) / maxRevenue) * 100,
                );
                const rankNum = idx + 1;
                return (
                  <div key={movie.id} className="space-y-1.5 group">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-sm flex items-center justify-center font-bold text-[10px] ${
                            rankNum === 1
                              ? "bg-amber-400 text-black font-black"
                              : "bg-[#1f2333] text-gray-400"
                          }`}
                        >
                          {rankNum}
                        </span>
                        <Link
                          to={`/trailer/${movie.id}`}
                          className="text-white group-hover:text-amber-400 font-semibold uppercase tracking-wide transition-colors line-clamp-1 max-w-[200px] sm:max-w-[280px]"
                        >
                          {movie.name}
                        </Link>
                      </div>
                      <span className="font-bold text-amber-400">
                        {formatUSD(movie.revenue)}
                      </span>
                    </div>

                    {/* Single Color Gold Bar */}
                    <div className="w-full bg-[#1a1d29] h-4 rounded-sm overflow-hidden p-0.5 border border-[#252a3b]">
                      <div
                        className="bg-amber-400 h-full rounded-sm transition-all duration-700 ease-out group-hover:brightness-125 shadow-[0_0_10px_rgba(255,184,0,0.4)]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-[#1f2332] text-xs font-mono text-gray-400 text-right">
            Hiển thị Top 5 / Tổng số {rankedMovies.length} bộ phim
          </div>
        </div>

        {/* Right Column: 3 Analytics Summary Cards */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Card 1 */}
          <StatCard
            label="THỂ LOẠI HÁI RA TIỀN NHẤT (IN DB)"
            description="Dẫn đầu tổng doanh thu trong kho dữ liệu phim CINEVERSE."
          >
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight uppercase">
              {topGenreInDB}
            </div>
          </StatCard>

          {/* Card 2 */}
          <StatCard
            label="TỶ LỆ SINH LỜI TRUNG BÌNH (AVG ROI)"
            description="Số liệu trung bình của toàn bộ danh mục phim hiện có."
          >
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {formatUSDExact(avgROI)}
            </div>
          </StatCard>

          {/* Card 3 */}
          <StatCard
            label={`PHIM DOANH THU CAO NHẤT ${
              selectedYear === "ALL" ? "TOÀN BỘ" : `NĂM ${selectedYear}`
            }`}
          >
            {topMovieInFilter ? (
              <div>
                <div className="text-lg font-black text-white font-mono uppercase line-clamp-1">
                  {topMovieInFilter.name}
                </div>
                <div className="text-amber-400 font-mono font-bold text-sm mt-0.5">
                  {formatUSD(topMovieInFilter.revenue)}
                </div>
              </div>
            ) : (
              <span className="text-xs text-gray-500 font-mono">
                Chưa có dữ liệu
              </span>
            )}
          </StatCard>
        </div>
      </div>

      {/* ROI Profit Kings & Flops Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Vua Lợi Nhuận (Highest ROI) */}
        <div className="bg-[#12141a] border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
              Vua Lợi Nhuận (Super Profit)
            </h3>
          </div>

          <div className="space-y-4">
            {profitKings.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#0e1017] border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase line-clamp-1">
                      {movie.name}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      Kinh phí: {formatUSD(movie.budget)}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1 mb-1">
                    <ArrowUpRight className="w-3 h-3" /> SUPER PROFIT
                  </span>
                  <div className="text-emerald-400 font-mono font-black text-sm">
                    ROI: +{movie.roi}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thua Lỗ Phòng Vé (Box Office Flops) */}
        <div className="bg-[#12141a] border border-red-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-red-500/10 rounded-xl text-red-400 border border-red-500/30">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
              Thua Lỗ Phòng Vé (Box Office Flop)
            </h3>
          </div>

          <div className="space-y-4">
            {boxOfficeFlops.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#0e1017] border border-red-500/20 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-red-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase line-clamp-1">
                      {movie.name}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      Kinh phí: {formatUSD(movie.budget)}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1 mb-1">
                    <ArrowDownRight className="w-3 h-3" /> FLOP / LOSS
                  </span>
                  <div className="text-red-400 font-mono font-black text-sm">
                    Lỗ: -{formatUSD(movie.lossAmount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Detailed Financial Data Table */}
      <FinancialDataTable rankedMovies={rankedMovies} />
    </div>
  );
}
