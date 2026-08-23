import { Calendar, History, ChevronRight } from "lucide-react";
import CustomDatePicker from "../../components/DatePicker/CustomDatePicker.jsx";
import TrailerCard from "./TrailerCard.jsx";
import { handleSelectCustomDate } from "../../utils/revenueUtils.js";
import useScheduleData from "../../hooks/data/useScheduleData.js";
import { motion } from "framer-motion";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx";
import LoadingState from "../../components/Common/LoadingState.jsx";
import ErrorState from "../../components/Common/ErrorState.jsx";

export default function Schedule() {
  const {
    selectedDateIndex,
    setSelectedDateIndex,
    customDate,
    setCustomDate,
    dateList,
    filteredMovies,
    isLoading,
    isError,
    page,
    setPage,
  } = useScheduleData();

  if (isLoading) {
    return <LoadingState message="ĐANG TẢI GIAO DIỆN LỊCH KHỞI CHIẾU CINEVERSE..." />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Không thể tải dữ liệu Lịch chiếu!"
        message="Vui lòng kiểm tra kết nối mạng và thử lại sau."
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-12 px-4 sm:px-8 xl:px-16 selection:bg-cyan-400 selection:text-black font-mono text-left">
      <div className="max-w-7xl mx-auto">
        {/* HEADER AREA MATCHING PICTURE */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-white/10 pb-8 mb-12 gap-6"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 font-mono">
            LỊCH PHIM RA MẮT
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-mono">
            Khám phá các tựa phim đang và sắp chiếu. Đặt vé ngay hôm nay.
          </p>
        </motion.header>

        {/* TIMELINE METAPHOR SECTION */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* SECTION SUB-HEADER */}
          <div className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-8 flex items-center gap-2">
            <span>DÒNG THỜI GIAN</span>
          </div>

          {/* TIMELINE CONTAINER (BOOKENDS + TIMELINE SPINE) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 ">
            {/* LEFT BOOKEND: PHIM ĐÃ RA MẮT */}
            <button
              type="button"
              onClick={() => {
                setSelectedDateIndex("ALL");
                setCustomDate("");
              }}
              className={`shrink-0 flex items-center gap-2 px-3 py-2 text-xs font-mono cursor-pointer ${
                selectedDateIndex === "ALL"
                  ? "text-cyan-400 font-extrabold scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,229,229,0.9)]"
                  : "text-gray-400 hover:text-white border border-transparent hover:scale-110 transition-transform duration-300"
              }`}
            >
              <History className="w-3.5 h-3." />
              <span>Phim đã ra mắt</span>
            </button>

            {/* MIDDLE HORIZONTAL TIMELINE SPINE */}
            <div className="flex-1 w-full relative px-4 py-6">
              {/* TIMELINE CONNECTING LINE */}
              <div className="relative  h-[2px] bg-white/10 -translate-y-1/2 z-0" />

              {/* TIMELINE NODES GRID */}
              <div className="absolute z-10 top-[33%] left-0 right-0 flex items-center justify-between w-full">
                {dateList.map((item) => {
                  const isSelected = selectedDateIndex === item.index;
                  const isToday = item.index === 0;

                  return (
                    <div
                      key={item.formatted}
                      className="relative flex flex-col items-center group cursor-pointer"
                      onClick={() => {
                        setSelectedDateIndex(item.index);
                        setCustomDate("");
                      }}
                    >
                      {/* PERMANENT "Hôm nay" TAG ABOVE NODE */}
                      {isToday ? (
                        <span className="absolute -top-6 text-[10px] md:text-[12px] lg:text-[15px] font-mono text-cyan-400 font-bold tracking-tight whitespace-nowrap animate-pulse">
                          Hôm nay
                        </span>
                      ) : (
                        <span className="absolute -top-6 text-[10px] md:text-[12px] lg:text-[15px] font-mono text-gray-400 font-medium tracking-tight whitespace-nowrap">
                          {item.dayOfWeek}
                        </span>
                      )}

                      {/* TIMELINE TICK / DOT ON THE SPINE */}
                      <div
                        className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                          isSelected
                            ? "w-4 h-4 bg-cyan-400 drop-shadow-[0_0_8px_rgba(0,229,229,0.9)] scale-125 z-20"
                            : isToday
                              ? "w-3 h-3 bg-gray-600 border border-white/50 z-10"
                              : "w-2.5 h-2.5 bg-gray-600 group-hover:bg-cyan-400/70 group-hover:scale-110 z-10"
                        }`}
                      />

                      {/* DATE LABEL BELOW TICK */}
                      <span
                        className={`mt-3 text-xs font-mono transition-all duration-300 ${
                          isSelected
                            ? "text-white font-black scale-105"
                            : "text-white/50 group-hover:text-white/90 font-medium"
                        }`}
                      >
                        {item.formatted}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT BOOKEND: CUSTOM DATE PICKER */}
            <div className="shrink-0">
              <CustomDatePicker
                selectedDate={customDate}
                onSelectDate={handleSelectCustomDate}
                isActive={selectedDateIndex === "CUSTOM"}
                setCustomDate={setCustomDate}
                setSelectedDateIndex={setSelectedDateIndex}
              />
            </div>
          </div>
        </motion.section>

        {/* CUSTOM DATE DISPLAY INDICATOR */}
        {selectedDateIndex === "CUSTOM" && customDate && (
          <div className="max-w-7xl mx-auto mb-6 text-center">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-4 py-1.5 rounded-full border border-cyan-400/30">
              Đang xem lịch ngày: {customDate}
            </span>
          </div>
        )}

        {/* MOVIES GRID SECTION */}
        <motion.main
          key={selectedDateIndex + customDate}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 xl:gap-8">
            <TrailerCard filteredMovies={filteredMovies} dateList={dateList} />
          </div>
          <PaginationControls
            page={page}
            setPage={setPage}
            hasMore={filteredMovies.length < 18}
            isPaged={filteredMovies.length}
          />
        </motion.main>
      </div>
    </div>
  );
}
