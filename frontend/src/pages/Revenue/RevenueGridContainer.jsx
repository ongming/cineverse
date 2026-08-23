import { useState } from "react";
import { Link } from "react-router-dom";
import useRevenueAnalytics from "../../hooks/analytics/useRevenueAnalytics.js";
import SortBar from "../../components/SortBar/SortBar.jsx";
import FinancialDataTable from "./FinancialDataTable.jsx";
import StatCard from "./StatCard.jsx";
import { formatUSDExact } from "../../utils/revenueUtils.js";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import ErrorState from "../../components/Common/ErrorState.jsx";

export default function RevenueGridContainer() {
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
    hasNextPage,
    maxRevenue,
    avg_profit,
    top_genre,
    profit_kings,
    box_office_flops,
    page,
    setPage,
    top_5_movies,
    total_movies,
  } = useRevenueAnalytics();

  return (
    <>
      {/* 🟢 LEVEL 1: Filter Toolbar (ALWAYS STAYS PERMANENTLY MOUNTED ON SCREEN!) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-8 bg-[#12141a] border border-[#222533] rounded-2xl p-4 sm:p-6 grid sm:flex grid-cols-1 sm:flex-wrap items-center justify-between gap-4 shadow-2xl"
      >
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
      </motion.div>

      {/* 🟢 LEVEL 2: Dynamic Charts & Analytics Section */}
      {isError ? (
        <ErrorState
          title="Có lỗi xảy ra khi nạp dữ liệu doanh thu!"
          message="Vui lòng kiểm tra kết nối mạng và thử lại sau."
          fullScreen={false}
        />
      ) : (
        <>
          {/* Main Grid Section: Top Revenue + Summary Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column: Top Doanh Thu (2 Cols) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-row w-full justify-between gap-2.5">
                    <div className="flex items-center gap-1">
                      <BarChart3 className="w-5 h-5 text-amber-400" />
                      <h2 className="text-xs md:text-lg font-bold text-white font-mono uppercase tracking-wide">
                        Top Doanh Thu Phòng Vé
                      </h2>
                    </div>
                    <div className="pt-4 mt-6 text-[10px] sm:text-xs font-mono text-gray-400 text-right">
                      Hiển thị Top 5 / Tổng số {total_movies || 0} bộ phim
                    </div>
                  </div>
                </div>

                {/* Single Full Color Revenue Bar Chart */}
                <div className="space-y-15">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, idx) => (
                        <div key={idx} className="ml-10 space-y-2 animate-pulse">
                          <div className="h-4 bg-[#1a1d29] rounded w-1/2" />
                          <div className="h-3 bg-[#1a1d29] rounded w-full" />
                        </div>
                      ))
                    : top_5_movies?.map((movie, idx) => {
                        const percent = Math.round(
                          ((movie.revenue || 0) / maxRevenue) * 100
                        );
                        const rankNum = idx + 1;
                        return (
                          <div
                            key={movie.id}
                            className="ml-10 relative z-10 space-y-7 group"
                          >
                            <span
                              className={`absolute top-[-110%] z-[-99] right-[97%] aria-hidden:true text-[100px] font-bold leading-none  ${
                                rankNum === 1
                                  ? " text-amber-400 font-black opacity-40"
                                  : " text-gray-400 opacity-20"
                              }`}
                            >
                              {rankNum}
                            </span>
                            <div className="flex flex-col w-full gap-1">
                              <div className=" flex items-center justify-between text-xs font-mono">
                                <div className=" flex items-center gap-2">
                                  <Link
                                    to={`/trailer/${movie.id}`}
                                    className="text-white group-hover:text-amber-400 font-semibold uppercase tracking-wide transition-colors line-clamp-1 max-w-[200px] sm:max-w-[280px]"
                                  >
                                    {movie.title}
                                  </Link>
                                </div>
                                <span className="font-bold text-cyan-neon">
                                  {formatUSDExact(movie.revenue)}
                                </span>
                              </div>
                              {/* Single Color Gold Bar */}
                              <div className="w-full bg-[#1a1d29] h-3 rounded-sm overflow-hidden p-0.5 border border-[#252a3b]">
                                <div
                                  className="bg-cyan-neon h-full rounded-sm transition-all duration-700 ease-out group-hover:brightness-125 shadow-[0_0_10px_rgba(255,184,0,0.4)]"
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3 Analytics Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className=" gap-6 flex flex-col justify-between"
            >
              {/* Card 1 */}
              <StatCard
                label={
                  selectedGenre === "ALL"
                    ? "THỂ LOẠI HÁI RA TIỀN NHẤT (IN DB)"
                    : "THỂ LOẠI ĐANG CHỌN"
                }
                description={
                  selectedGenre === "ALL"
                    ? "Dẫn đầu tổng doanh thu trong kho dữ liệu phim CINEVERSE."
                    : "Thể loại đang được áp dụng từ bộ lọc."
                }
              >
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight uppercase">
                  {selectedGenre === "ALL"
                    ? top_genre || "—"
                    : uniqueGenres.find((g) => String(g.value) === String(selectedGenre))?.label || "—"}
                </div>
              </StatCard>

              {/* Card 2 */}
              <StatCard
                label="TỶ LỆ SINH LỜI TRUNG BÌNH"
                description="Số liệu trung bình của toàn bộ danh mục phim hiện có."
              >
                <div className="text-3xl font-black text-green-600 font-mono">
                  {formatUSDExact(avg_profit || 0)}
                </div>
              </StatCard>

              {/* Card 3 */}
              <StatCard
                label={`PHIM DOANH THU CAO NHẤT ${
                  selectedYear === "ALL" ? "TOÀN BỘ" : `NĂM ${selectedYear}`
                }`}
              >
                {top_5_movies && top_5_movies[0] ? (
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
            </motion.div>
          </div>

          {/* ROI Profit Kings & Flops Section */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 pb-10 border-b-1 border-[#222533]">
            {/* Vua Lợi Nhuận (Highest ROI) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-5 sm:p-6 border-l-4 border-green-700"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <h3 className="text-lg font-bold text-green-600 font-mono uppercase tracking-wide">
                  Vua Lợi Nhuận
                </h3>
              </div>

              <div className="space-y-4">
                {profit_kings?.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-4 flex items-center justify-between gap-4 hover:border-emerald-500/50 transition-all"
                  >
                    <Link
                      to={`/trailer/${movie.id}`}
                      className="flex items-center gap-3 hover:scale-110 transition-transform duration-300"
                    >
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
                    </Link>

                    <div className="flex flex-row items-center gap-1 text-right shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                      <div className="text-green-600 font-mono font-black text-sm md:text-lg">
                        {formatUSDExact(movie.net_profit)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Thua Lỗ Phòng Vé (Box Office Flops) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="p-5 sm:p-6 border-l-4 border-red-700"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <h3 className="text-lg font-bold text-red-700 font-mono uppercase tracking-wide">
                  Thua Lỗ Phòng Vé
                </h3>
              </div>

              {box_office_flops?.length === 0 ? (
                <div className="text-md md:text-lg text-gray-500 font-mono">
                  Không có dữ liệu thua lỗ phòng vé trong năm nay.
                </div>
              ) : (
                <div className="space-y-4">
                  {box_office_flops?.map((movie) => (
                    <Link
                      to={`/trailer/${movie.id}`}
                      key={movie.id}
                      className="p-4 flex items-center justify-between gap-4 hover:border-red-500/50 transition-all"
                    >
                      <div className="flex items-center gap-3 hover:scale-110 transition-transform duration-300">
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

                      <div className="flex flex-row items-center text-right gap-1 shrink-0">
                        <ArrowDownRight className="w-6 h-6 text-red-700" />
                        <div className="text-red-700 font-mono font-black text-sm md:text-lg">
                          {formatUSDExact(movie.loss_amount)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}

      {/* 🟢 LEVEL 3: Detailed Financial Data Table (ALWAYS PERMANENTLY MOUNTED AT SAME LEVEL!) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FinancialDataTable
          rankedMovies={revenueMovies}
          page={page}
          setPage={setPage}
          total_movies={total_movies}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
        />
      </motion.div>
    </>
  );
}
