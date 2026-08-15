import { useState } from "react";
import { Link } from "react-router-dom";
import useRevenueAnalytics from "../../hooks/analytics/useRevenueAnalytics.js";
import { useRevenueData } from "../../hooks/data/useRevenueData.js";
import SortBar from "../../components/SortBar/SortBar.jsx";
import FinancialDataTable from "./FinancialDataTable.jsx";
import StatCard from "./StatCard.jsx";
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
    handleYearChange,
    selectedGenre,
    handleGenreChange,
    isLoading,
    isError,
    uniqueYears,
    uniqueGenres,
    revenueMovies,
    maxRevenue,
    avg_profit,
    topMovieInFilter,
    top_genre,
    profit_kings,
    box_office_flops,
    handleExportCSV,
    page,
    setPage,
    top_5_movies,
    total_movies,
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
            setSortBy={handleYearChange}
            Icon={<Calendar className="w-4 h-4 text-amber-400" />}
          />

          {/* Genre Filter Pills */}
          <SortBar
            isSortOpen={isSortGenreOpen}
            setIsSortOpen={setIsSortGenreOpen}
            sortOptions={uniqueGenres}
            sortBy={selectedGenre}
            setSortBy={handleGenreChange}
            Icon={<Layers className="w-4 h-4 text-amber-400" />}
          />
        </div>
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
              {top_5_movies.map((movie, idx) => {
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
                          {movie.title}
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
            Hiển thị Top 5 / Tổng số {total_movies} bộ phim
          </div>
        </div>

        {/* Right Column: 3 Analytics Summary Cards */}
        <div className=" gap-6 flex flex-col justify-between">
          {/* Card 1 */}
          <StatCard
            label="THỂ LOẠI HÁI RA TIỀN NHẤT (IN DB)"
            description="Dẫn đầu tổng doanh thu trong kho dữ liệu phim CINEVERSE."
          >
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight uppercase">
              {top_genre}
            </div>
          </StatCard>

          {/* Card 2 */}
          <StatCard
            label="TỶ LỆ SINH LỜI TRUNG BÌNH"
            description="Số liệu trung bình của toàn bộ danh mục phim hiện có."
          >
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {formatUSDExact(avg_profit)}
            </div>
          </StatCard>

          {/* Card 3 */}
          <StatCard
            label={`PHIM DOANH THU CAO NHẤT ${
              selectedYear === "ALL" ? "TOÀN BỘ" : `NĂM ${selectedYear}`
            }`}
          >
            {top_5_movies[0] ? (
              <div>
                <div className="text-lg font-black text-white font-mono uppercase line-clamp-1">
                  {top_5_movies[0].title}
                </div>
                <div className="text-amber-400 font-mono font-bold text-md mt-0.5">
                  {formatUSDExact(top_5_movies[0].revenue)}
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
            {profit_kings.map((movie) => (
              <Link
                to={`/trailer/${movie.id}`}
                key={movie.id}
                className="bg-[#0e1017] border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-mono uppercase line-clamp-1">
                      {movie.title}
                    </h4>
                    <span className="text-xs font-mono text-gray-400">
                      Kinh phí: {formatUSDExact(movie.budget)}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1 mb-1">
                    <ArrowUpRight className="w-3 h-3" /> SUPER PROFIT
                  </span>
                  <div className="text-emerald-400 font-mono font-black text-sm">
                    {formatUSDExact(movie.net_profit)}
                  </div>
                </div>
              </Link>
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

          {box_office_flops?.length === 0 ? (
            <div className="text-md md:text-lg text-gray-500 font-m ono">
              Không có dữ liệu thua lỗ phòng vé trong năm nay.
            </div>
          ) : (
            <div className="space-y-4">
              {box_office_flops.map((movie) => (
                <Link
                  to={`/trailer/${movie.id}`}
                  key={movie.id}
                  className="bg-[#0e1017] border border-red-500/20 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-red-500/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={movie.poster_path}
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono uppercase line-clamp-1">
                        {movie.title}
                      </h4>
                      <span className="text-xs font-mono text-gray-400">
                        Kinh phí: {formatUSDExact(movie.budget)}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-0.5 rounded-md bg-red-500/10 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1 mb-1">
                      <ArrowDownRight className="w-3 h-3" /> FLOP / LOSS
                    </span>
                    <div className="text-red-400 font-mono font-black text-sm">
                      Lỗ: -{formatUSDExact(movie.loss_amount)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Detailed Financial Data Table */}
      <FinancialDataTable
        rankedMovies={revenueMovies}
        page={page}
        setPage={setPage}
        total_movies={total_movies}
      />
    </div>
  );
}
